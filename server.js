import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ewaste';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- Schemas ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  avatar: { type: String }
});
const User = mongoose.model('User', userSchema);

const requestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  refId: { type: String, required: true, unique: true },
  device: { type: String, required: true },
  specs: { type: String, required: true },
  condition: { type: String, required: true },
  status: { type: String, default: 'Pending Review' },
  estimate: { type: String, default: 'TBD' },
  address: { type: String, required: true },
  customer: { type: String, required: true },
  email: { type: String, required: true },
  upiId: { type: String },
  phoneNo: { type: String },
  createdAt: { type: Date, default: Date.now }
});
const SellRequest = mongoose.model('SellRequest', requestSchema);

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: { type: String, default: 'info' }, // 'info', 'decline', 'success'
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const Notification = mongoose.model('Notification', notificationSchema);

// --- Auth Routes ---

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, error: 'User already exists' });

    const avatar = name[0].toUpperCase() + (name.split(' ')[1]?.[0]?.toUpperCase() || '');
    const newUser = new User({ name, email, password, avatar });
    await newUser.save();

    res.json({ success: true, user: { id: newUser._id, name, email, role: 'user', avatar } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Admin hardcoded for now
    if (email === 'admin@phonezone.in' && password === 'admin123') {
      return res.json({ success: true, user: { id: 'admin-pz-01', name: 'Alex ReTech', email, role: 'admin', avatar: 'AR' } });
    }

    // Delivery Partner hardcoded for now
    if (email === 'delivery@phonezone.in' && password === 'delivery123') {
      return res.json({ success: true, user: { id: 'delivery-pz-01', name: 'Pickup Partner', email, role: 'delivery', avatar: 'DP' } });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, error: 'Account not found' });
    if (user.password !== password) return res.status(400).json({ success: false, error: 'Invalid password' });

    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// --- Sell Request Routes ---

app.post('/api/requests', async (req, res) => {
  try {
    const { userId, device, specs, condition, address, customer, email } = req.body;
    const refId = 'RE-' + Math.floor(10000 + Math.random() * 90000);
    
    const newRequest = new SellRequest({
      userId, refId, device, specs, condition, address, customer, email,
      estimate: 'TBD'
    });
    
    await newRequest.save();
    res.json({ success: true, refId });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to submit request' });
  }
});

app.get('/api/requests/:userId', async (req, res) => {
  try {
    const requests = await SellRequest.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch requests' });
  }
});

app.post('/api/requests/:id/reply', async (req, res) => {
  try {
    const { action, upiId, phoneNo } = req.body; // 'accept' or 'decline'
    const request = await SellRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: 'Request not found' });

    if (action === 'accept') {
      request.status = 'Pickup scheduled';
      if (upiId) request.upiId = upiId;
      if (phoneNo) request.phoneNo = phoneNo;
      await request.save();
      return res.json({ success: true, message: 'Offer accepted! Pickup scheduled.' });
    } else {
      request.status = 'Declined';
      await request.save();
      return res.json({ success: true, message: 'Offer declined.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: 'Action failed' });
  }
});

app.get('/api/admin/requests', async (req, res) => {
  try {
    const requests = await SellRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch admin requests' });
  }
});

app.post('/api/admin/requests/:id/decline', async (req, res) => {
  try {
    const request = await SellRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: 'Request not found' });

    request.status = 'Declined';
    await request.save();

    // Create Notification
    const newNotification = new Notification({
      userId: request.userId,
      message: `Your request for ${request.device} (#${request.refId}) was declined by the vendor.`,
      type: 'decline'
    });
    await newNotification.save();

    res.json({ success: true, message: 'Request declined and user notified' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to decline request' });
  }
});

app.get('/api/admin/requests/:id', async (req, res) => {
  try {
    const request = await SellRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: 'Request not found' });
    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch request' });
  }
});

app.post('/api/admin/requests/:id/accept', async (req, res) => {
  try {
    const { price } = req.body;
    const request = await SellRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: 'Request not found' });

    request.status = 'Accepted';
    if (price) request.estimate = price;
    await request.save();

    const newNotification = new Notification({
      userId: request.userId,
      message: `Your request for ${request.device} (#${request.refId}) was accepted. Estimate: ₹${price}`,
      type: 'success'
    });
    await newNotification.save();

    res.json({ success: true, message: 'Request accepted' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to accept request' });
  }
});

app.post('/api/admin/requests/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const request = await SellRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: 'Request not found' });

    request.status = status;
    await request.save();

    const newNotification = new Notification({
      userId: request.userId,
      message: `The status of your request for ${request.device} (#${request.refId}) has been updated to: ${status}`,
      type: 'info'
    });
    await newNotification.save();

    res.json({ success: true, message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
});

app.post('/api/admin/requests/:id/shiprocket', async (req, res) => {
  try {
    const request = await SellRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: 'Request not found' });

    // Simulate Shiprocket API connection & latency
    await new Promise(resolve => setTimeout(resolve, 800));

    const generatedAwb = 'SR' + Math.floor(10000000 + Math.random() * 90000000);
    request.status = 'Pickup scheduled';
    await request.save();

    const newNotification = new Notification({
      userId: request.userId,
      message: `Logistics routed via Shiprocket! Tracking AWB: ${generatedAwb}`,
      type: 'info'
    });
    await newNotification.save();

    res.json({ success: true, awb: generatedAwb, message: `Shiprocket Logistics Order Created! AWB: ${generatedAwb}` });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Shiprocket Integration Error' });
  }
});

app.get('/api/notifications/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch notifications' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
