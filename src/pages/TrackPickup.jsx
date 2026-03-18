import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Phone, User, CheckCircle, Clock, ShieldCheck, ArrowLeft, MoreHorizontal, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrackPickup = () => {
  const trackingData = {
    id: 'PZ-8942',
    status: 'In Transit',
    courier: { name: 'Rahul Sharma', rating: '4.8', phone: '+91 98765 43210' },
    estimatedTime: '12 mins away',
    steps: [
      { title: 'Request Accepted', time: '10:00 AM', completed: true, desc: 'Your request has been verified and assigned to a runner.' },
      { title: 'Courier Assigned', time: '10:15 AM', completed: true, desc: 'Rahul Sharma has been assigned to pick up your device.' },
      { title: 'Courier in Transit', time: '10:20 AM', current: true, desc: 'Rahul is currently 2.4km away from your location.' },
      { title: 'Device Evaluation', time: '--:--', completed: false, desc: 'Quick check of your device condition at your doorstep.' },
      { title: 'Payment Released', time: '--:--', completed: false, desc: 'Instant transfer to your chosen payment method.' },
    ]
  };

  return (
    <div className="track-page min-h-screen bg-slate-50 py-20 overflow-hidden">
      <div className="container max-w-5xl">
        <header className="mb-12 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-all font-bold text-sm">
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
          <div className="text-right">
            <h1 className="text-3xl font-black mb-1">Track Pickup 📦</h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Order ID: {trackingData.id}</p>
          </div>
        </header>

        <div className="grid grid-cols-5 gap-10">
          {/* Tracking List */}
          <div className="col-span-3 space-y-8">
            <div className="glass p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
              
              <div className="space-y-12 relative">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-6 bottom-6 w-px bg-slate-100 border-l-2 border-dashed border-slate-200"></div>
                
                {trackingData.steps.map((step, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-10 relative"
                  >
                    {/* Circle Indicator */}
                    <div className={`w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10 
                      ${step.completed ? 'bg-primary text-white' : step.current ? 'bg-blue-500 text-white animate-pulse' : 'bg-slate-200 text-transparent'}`}>
                      {step.completed && <CheckCircle size={14} />}
                      {step.current && <Truck size={14} />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-bold text-lg ${step.completed || step.current ? 'text-slate-900' : 'text-slate-300'}`}>{step.title}</h3>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{step.time}</span>
                      </div>
                      <p className={`text-sm leading-relaxed ${step.completed || step.current ? 'text-slate-500' : 'text-slate-300'}`}>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-slate-900 rounded-3xl text-white flex items-center justify-between shadow-2xl shadow-slate-200">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/10 rounded-2xl">
                  <ShieldCheck size={28} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Contactless Evaluation</h4>
                  <p className="text-xs text-slate-400">Your safety is our priority ♻️</p>
                </div>
              </div>
              <button className="text-xs font-bold uppercase tracking-widest border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">Safety Protocol</button>
            </div>
          </div>

          {/* Courier Card & Action */}
          <div className="col-span-2 space-y-8">
            <div className="glass p-8 bg-white border-none shadow-2xl shadow-green-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Pickup Professional</h4>
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/20">
                    <img src="https://i.pravatar.cc/80?img=12" alt="Courier" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-lg border-2 border-white">
                    {trackingData.courier.rating} ★
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{trackingData.courier.name}</h3>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">Verified Runner</p>
                  <p className="text-sm text-slate-500 mt-2 font-medium">{trackingData.estimatedTime}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="flex-1 btn-secondary py-3 text-sm flex items-center justify-center gap-2">
                  <Phone size={16} /> Call
                </button>
                <button className="flex-1 btn-outline py-3 text-sm flex items-center justify-center gap-2">
                  <MessageSquare size={16} /> Message
                </button>
              </div>
            </div>

            <div className="glass p-8 h-[300px] flex flex-col items-center justify-center text-center gap-4 bg-slate-200 overflow-hidden relative">
              {/* Mock Map Background */}
              <div className="absolute inset-0 opacity-40">
                <img src="https://img.freepik.com/free-vector/city-map-navigation-interface-design_23-2148293988.jpg" className="w-full h-full object-cover" alt="Map" />
              </div>
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                  <Truck size={24} />
                </div>
                {/* Visual pulsating ring */}
                <div className="absolute w-24 h-24 border-4 border-primary/20 rounded-full animate-ping"></div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-xl border border-white/40">
                <p className="text-xs font-bold text-slate-800 flex items-center justify-center gap-2">
                  <MapPin size={12} className="text-red-500" /> Live Tracking Enabled
                </p>
              </div>
            </div>
            
            <div className="glass p-6 text-center">
                <p className="text-xs font-bold text-slate-400 mb-2">NEED HELP?</p>
                <button className="text-sm font-bold text-primary hover:underline">Support Ticket PZ-8942-S</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackPickup;
