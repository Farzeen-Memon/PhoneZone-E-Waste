import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  
  const [acceptingReqId, setAcceptingReqId] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user?.id) return;
    try {
      const [reqRes, notifRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/requests/${user.id}`),
        fetch(`${import.meta.env.VITE_API_URL}/api/notifications/${user.id}`)
      ]);
      const reqData = await reqRes.json();
      const notifData = await notifRes.json();
      if (reqData.success) setRequests(reqData.requests.filter(r => r.status !== 'Declined'));
      if (notifData.success) setNotifications(notifData.notifications);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReplyOffer = async (id, action) => {
    try {
      const payload = { action };
      if (action === 'accept') {
        if (!upiId || !phoneNo) return alert('Please provide your UPI ID and Phone Number.');
        payload.upiId = upiId;
        payload.phoneNo = phoneNo;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/requests/${id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setAcceptingReqId(null);
        setUpiId('');
        setPhoneNo('');
        fetchDashboardData(); // Refresh the data to get updated status
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Action failed');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for impact
  const ecoImpact = { recycled: 12, co2Saved: '45kg' };

  return (
    <div style={{ paddingBottom: '120px', background: 'var(--bg-dark)', minHeight: '100vh', color: 'white' }}>
      
      {/* Hero Section */}
      <section className="container-mobile" style={{ paddingTop: '2rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
          Welcome back, <span className="text-primary">{user?.name?.split(' ')[0] || 'Member'}</span>
        </h2>
        <p style={{ color: 'var(--text-muted-dark)', fontSize: '0.95rem', fontWeight: 500 }}>
          You have <span style={{ color: 'white', fontWeight: 700 }}>{requests.filter(r => r.status === 'Pending Review').length} action</span> required today
        </p>

        {notifications.some(n => !n.isRead) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem', borderRadius: '14px', display: 'flex', gap: '0.85rem', alignItems: 'center' }}
          >
             <span className="material-symbols-outlined" style={{ color: '#ef4444' }}>notifications_active</span>
             <p style={{ fontSize: '0.8rem', color: '#ffb3b3', margin: 0 }}>{notifications.find(n => !n.isRead)?.message}</p>
          </motion.div>
        )}
      </section>

      {/* Stats Grid */}
      <section className="container-mobile" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div className="glass-panel stat-card-premium" style={{ gridColumn: 'span 2' }}>
            <div className="stat-card-glow"></div>
            <span className="stat-card-label">Estimated Balance</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span className="stat-card-value">₹{requests.length > 0 ? (requests.length * 8500).toLocaleString() : '12,400'}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 800 }}>+8%</span>
            </div>
          </div>
          <div className="glass-panel stat-card-premium">
            <div className="stat-card-icon">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <span className="stat-card-label">Active</span>
            <span className="stat-card-value" style={{ fontSize: '1.5rem' }}>{requests.length || 0}</span>
          </div>
          <div className="glass-panel stat-card-premium">
            <div className="stat-card-icon" style={{ color: 'var(--accent-blue)' }}>
              <span className="material-symbols-outlined">verified</span>
            </div>
            <span className="stat-card-label">Offers</span>
            <span className="stat-card-value" style={{ fontSize: '1.5rem' }}>2</span>
          </div>
        </div>
      </section>

      {/* Active Sell Requests */}
      <section className="container-mobile" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Active Sell Requests</h3>
          <Link to="/sell" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase' }}>View All</Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ width: 30, height: 30, border: '3px solid rgba(255,255,255,0.05)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.1)', marginBottom: '1rem' }}>auto_delete</span>
            <p style={{ color: 'var(--text-muted-dark)', marginBottom: '1.5rem' }}>No active requests found.</p>
            <Link to="/sell" className="btn-primary-neon" style={{ display: 'inline-block', width: 'auto', padding: '0.875rem 2rem' }}>Start New request</Link>
          </div>
        ) : (
          requests.map((req, i) => (
            <div key={i} className="glass-panel request-card-premium">
              <div className="request-card-header">
                <div>
                  <h4 className="request-device-name">{req.device}</h4>
                  <span className="request-vendor-count">{req.refId} • {req.condition}</span>
                </div>
                <span className="request-price">{req.estimate || '₹8,500'}</span>
              </div>
              
              <div className="step-indicator">
                <div className={`step-point ${req.status ? 'completed' : 'active'}`}></div>
                <div className={`step-point ${req.status === 'Accepted' ? 'active' : ''}`}></div>
                <div className="step-point"></div>
                <div className="step-point"></div>
              </div>
              <div className="step-label-row">
                <span className="step-label active">Req</span>
                <span className="step-label">Picked</span>
                <span className="step-label">Eval</span>
                <span className="step-label">Paid</span>
              </div>

              <div className="request-actions-row">
                {req.status === 'Accepted' ? (
                  acceptingReqId === req._id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Provide payment details to confirm pickup</p>
                      <input type="text" placeholder="UPI ID (e.g., number@upi)" value={upiId} onChange={e => setUpiId(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white' }} />
                      <input type="tel" placeholder="Phone Number" value={phoneNo} onChange={e => setPhoneNo(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white' }} />
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button className="btn-primary-neon" style={{ flex: 1, padding: '0.75rem' }} onClick={() => handleReplyOffer(req._id, 'accept')}>Confirm</button>
                        <button className="btn-secondary-dark" style={{ flex: 1, padding: '0.75rem' }} onClick={() => setAcceptingReqId(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button className="btn-primary-neon" onClick={() => setAcceptingReqId(req._id)}>Accept Offer</button>
                      <button className="btn-secondary-dark" onClick={() => handleReplyOffer(req._id, 'decline')}>Decline</button>
                    </>
                  )
                ) : req.status === 'Pending Review' ? (
                  <button className="btn-secondary-dark" style={{ width: '100%', opacity: 0.5 }} disabled>Evaluating Device...</button>
                ) : (
                  <button className="btn-primary-neon" style={{ width: '100%', background: 'rgba(33, 196, 93, 0.1)', color: '#21c45d', boxShadow: 'none' }} disabled>
                    {req.status}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Eco Impact Tracker */}
      <section className="container-mobile" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel eco-tracker-card">
          <div style={{ flex: 1, paddingRight: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '0.5rem' }}>Eco Impact</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted-dark)', lineHeight: 1.5 }}>
              You've recycled <strong>{ecoImpact.recycled} devices</strong> and saved <strong>{ecoImpact.co2Saved}</strong> of CO2 emissions.
            </p>
          </div>
          <div className="circle-progress-wrap">
            <svg className="circle-progress-svg" width="90" height="90">
              <circle className="circle-progress-bg" cx="45" cy="45" r="38" />
              <circle className="circle-progress-fill" cx="45" cy="45" r="38" strokeDasharray="239" strokeDashoffset="50" />
            </svg>
            <div className="circle-value">82%</div>
          </div>
        </div>
      </section>

      {/* Subtle Logout for Account Section */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
         <button onClick={handleLogout} style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted-dark)', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>
           Sign Out of Account
         </button>
         <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.1)', marginTop: '1rem' }}>PHONE ZONE RETECH V1.0.4</p>
      </div>

    </div>
  );
};

export default UserDashboard;
