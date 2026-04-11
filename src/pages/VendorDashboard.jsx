import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Admin.css';

const DEVICE_ICONS = { 'iPhone': 'smartphone', 'Samsung': 'smartphone', 'Google': 'smartphone', 'Mac': 'laptop_mac', 'Apple Watch': 'watch', 'iPad': 'tablet' };
const getDeviceIcon = (name) => {
  for (const k in DEVICE_ICONS) if (name.includes(k)) return DEVICE_ICONS[k];
  return 'devices';
};

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('requests');
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;
  const TABS = ['dashboard', 'requests', 'payments', 'settings'];

  const handleTabChange = (newTab) => {
    const currentIndex = TABS.indexOf(activeTab);
    const nextIndex = TABS.indexOf(newTab);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveTab(newTab);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isForwardSwipe = distance < -minSwipeDistance; // Right swipe
    const isBackwardSwipe = distance > minSwipeDistance; // Left swipe
    if (isForwardSwipe || isBackwardSwipe) {
      const currentIndex = TABS.indexOf(activeTab);
      let nextIndex;
      if (isForwardSwipe) {
        setDirection(1);
        nextIndex = (currentIndex + 1) % TABS.length;
      } else if (isBackwardSwipe) {
        setDirection(-1);
        nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
      }
      setActiveTab(TABS[nextIndex]);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: 'easeIn' }
    })
  };

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/requests`);
      const data = await res.json();
      if (data.success) setRequests(data.requests);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const pendingCount = requests.filter(r => r.status === 'Pending Review').length;
  const acceptedCount = requests.filter(r => ['Accepted', 'Pickup scheduled', 'Received'].includes(r.status)).length;
  const completedCount = requests.filter(r => ['Paid', 'Completed'].includes(r.status)).length;

  const filteredRequests = requests.filter(r => {
    if (searchQuery && r.refId && !r.refId.toLowerCase().includes(searchQuery.toLowerCase()) && !(r.device && r.device.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    if (filter === 'Pending') return r.status === 'Pending Review';
    if (filter === 'Accepted') return ['Accepted', 'Pickup scheduled', 'Received'].includes(r.status);
    if (filter === 'Completed') return ['Paid', 'Completed'].includes(r.status);
    return true; // All
  });

  return (
    <div className="admin-body-wrap" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEndHandler}>
      <header className="admin-header">
        {/* Left: Profile Circle */}
        <div style={{ display: 'flex', alignItems: 'center', minWidth: '120px' }}>
          <div 
            className="admin-profile-circle"
          >
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#052e16', letterSpacing: '-0.02em' }}>{user?.avatar || 'AD'}</span>
          </div>
        </div>

        {/* Center: Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
          <h1 className="admin-header-title" style={{ fontSize: '1.4rem' }}>PhoneZone</h1>
          <span className="admin-header-subtitle">Admin Dashboard</span>
        </div>

        {/* Right Actions: back arrow + notifications + logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end', minWidth: '120px' }}>
          <button style={{ width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', background: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#f1f5f9'}
            onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.3rem' }}>notifications</span>
          </button>
          
          <button 
            style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.4rem', borderRadius: '50%', transition: 'all 0.2s' }} 
            onMouseOver={(e) => e.currentTarget.style.color = '#21c45d'}
            onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
            onClick={() => navigate('/')}
            title="Back to Site"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>arrow_back</span>
          </button>

          <button style={{ background: 'transparent', border: 'none', color: 'rgba(239, 68, 68, 0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#ef4444'}
            onMouseOut={(e) => e.currentTarget.style.color = 'rgba(239, 68, 68, 0.6)'}
            onClick={handleLogout} title="Logout"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.3rem' }}>logout</span>
          </button>
        </div>
      </header>

      <main className="admin-main">
        <section style={{ marginBottom: '2rem' }}>
          <h2 className="admin-page-title">{activeTab === 'dashboard' ? 'Overview' : activeTab === 'requests' ? 'Manage sell requests' : activeTab === 'payments' ? 'Vendor Payouts' : 'Settings'}</h2>
          <p className="admin-page-desc">{activeTab === 'dashboard' ? 'Business metrics and performance' : activeTab === 'requests' ? 'Real-time secondary electronics market overview' : activeTab === 'payments' ? 'Manage vendor earnings and UPI transactions' : 'Application configuration'}</p>
        </section>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ width: '100%' }}
            >
              {activeTab === 'dashboard' && (
              <section className="admin-stats-container">
                <div className={`admin-stat-card ${filter === 'All' ? 'highlight' : ''}`} onClick={() => { setFilter('All'); handleTabChange('requests'); }} style={{ cursor: 'pointer' }}>
                  <div className={`admin-stat-title ${filter === 'All' ? 'highlight' : ''}`}>Total Requests</div>
                  <div className="admin-stat-value">{requests.length}</div>
                  <div className="admin-stat-footer success">
                     +12.4%
                  </div>
                </div>
                <div className={`admin-stat-card ${filter === 'Pending' ? 'highlight' : ''}`} onClick={() => { setFilter('Pending'); handleTabChange('requests'); }} style={{ cursor: 'pointer' }}>
                  <div className={`admin-stat-title ${filter === 'Pending' ? 'highlight' : ''}`}>Pending</div>
                  <div className="admin-stat-value">{pendingCount}</div>
                  <div className="admin-stat-footer highlight timeline-pulse" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.1rem 0.25rem', borderRadius: '999px', background: 'rgba(33, 196, 93, 0.1)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#21c45d', marginRight: 4 }}></span> Immediate Action
                  </div>
                </div>
                <div className={`admin-stat-card ${filter === 'Accepted' ? 'highlight' : ''}`} onClick={() => { setFilter('Accepted'); handleTabChange('requests'); }} style={{ cursor: 'pointer' }}>
                  <div className={`admin-stat-title ${filter === 'Accepted' ? 'highlight' : ''}`}>Accepted</div>
                  <div className="admin-stat-value">{acceptedCount}</div>
                  <div className="admin-stat-footer">In Processing</div>
                </div>
                <div className={`admin-stat-card ${filter === 'Completed' ? 'highlight' : ''}`} onClick={() => { setFilter('Completed'); handleTabChange('requests'); }} style={{ cursor: 'pointer' }}>
                  <div className={`admin-stat-title ${filter === 'Completed' ? 'highlight' : ''}`}>Completed</div>
                  <div className="admin-stat-value">{completedCount}</div>
                  <div className="admin-stat-footer success">Historical Total</div>
                </div>
              </section>
              )}

              {activeTab === 'requests' && (
                <>
                <section className="admin-search-area">
                  <div className="admin-search-input-wrap">
                    <span className="material-symbols-outlined admin-search-icon">search</span>
                    <input 
                      type="text" 
                      className="admin-search-input" 
                      placeholder="Search by Request ID (#RE-0000) or device..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </section>

                <section className="admin-filter-chips">
                  {['All', 'Pending', 'Accepted', 'Completed'].map(chip => (
                    <button key={chip} className={`admin-chip ${filter === chip ? 'active' : ''}`} onClick={() => setFilter(chip)}>
                      {chip}
                    </button>
                  ))}
                </section>

              <section className="admin-grid">
                {loading ? (
                   <p style={{ color: '#94a3b8' }}>Loading requests...</p>
                ) : filteredRequests.length === 0 ? (
                   <p style={{ color: '#94a3b8' }}>No requests found for this filter.</p>
                ) : filteredRequests.map((r, i) => (
                  <div key={i} className={`admin-item-card ${r.status === 'Pending Review' ? 'highlight' : r.status === 'Completed' || r.status === 'Paid' || r.status === 'Declined' ? 'completed' : ''}`}>
                    <div className={`admin-status-badge ${r.status}`}><span>{r.status}</span></div>
                    
                    <div className="admin-item-header">
                      <div className={`admin-item-icon ${r.status}`}>
                        <span className="material-symbols-outlined">{getDeviceIcon(r.device)}</span>
                      </div>
                      <div>
                        <div className="admin-item-id">ID #{r.refId}</div>
                        <h3 className="admin-item-title">{r.device || 'Unspecified Device'}</h3>
                      </div>
                    </div>

                    <div className="admin-item-details-grid">
                      <div className="admin-detail-box">
                        <span className="admin-detail-label">Condition</span>
                        <span className="admin-detail-val">
                          <span className="admin-dot" style={{ background: r.condition === 'Flawless' ? '#38bdf8' : r.condition === 'Good' ? '#21c45d' : '#f59e0b' }}></span>
                          {r.condition}
                        </span>
                      </div>
                      <div className="admin-detail-box">
                        <span className="admin-detail-label">Date</span>
                        <span className="admin-detail-val">{new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>

                    <button 
                      className={r.status === 'Completed' || r.status === 'Paid' || r.status === 'Declined' ? 'admin-btn-secondary' : 'admin-btn-primary'}
                      onClick={() => navigate(`/pz-admin-panel/request/${r._id}`)}
                    >
                      {r.status === 'Completed' || r.status === 'Paid' || r.status === 'Declined' ? 'Archive' : 'Review Request'}
                    </button>
                  </div>
                ))}
              </section>
              </>
              )}

              {activeTab === 'payments' && (
                <section className="admin-grid" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
                  <h2 className="admin-page-title" style={{ marginTop: '0.5rem', marginBottom: '1.5rem', gridColumn: '1 / -1' }}>Vendor UPI Payouts</h2>
                  
                  {requests.filter(r => r.status === 'Received').length === 0 ? (
                     <p style={{ color: '#94a3b8' }}>No pending vendor payouts at this time.</p>
                  ) : requests.filter(r => r.status === 'Received').map((r, i) => (
                    <div key={`pay-${i}`} className="admin-item-card highlight" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#0b1215', border: '1px solid #16c55f' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h3 className="admin-item-title" style={{ fontSize: '1.5rem', color: '#f1f5f9' }}>{r.customer}</h3>
                          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>{r.device} | ID #{r.refId}</p>
                        </div>
                        <div className={`admin-status-badge Received`}><span>Awaiting Payout</span></div>
                      </div>

                      <div className="admin-item-details-grid" style={{ background: 'rgba(33, 196, 93, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(33, 196, 93, 0.2)' }}>
                        <div className="admin-detail-box" style={{ gridColumn: 'span 2' }}>
                          <span className="admin-detail-label">UPI ID</span>
                          <span className="admin-detail-val" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '1.1rem' }}>
                            <span className="material-symbols-outlined">account_balance</span>
                            {r.upiId || 'Not provided'}
                          </span>
                        </div>
                        <div className="admin-detail-box">
                          <span className="admin-detail-label">Phone</span>
                          <span className="admin-detail-val" style={{ color: '#f1f5f9' }}>{r.phoneNo || r.email || 'N/A'}</span>
                        </div>
                        <div className="admin-detail-box">
                          <span className="admin-detail-label" style={{ color: '#21c45d' }}>Payout Amount</span>
                          <span className="admin-detail-val" style={{ fontSize: '1.75rem', color: '#21c45d', fontWeight: 800 }}>₹{r.estimate}</span>
                        </div>
                      </div>

                      <button 
                        className="admin-btn-primary"
                        onClick={async () => {
                          if(!window.confirm(`Initiate RazorpayX Test Payout of ₹${r.estimate} to ${r.upiId}?`)) return;
                          try {
                            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/requests/${r._id}/payout`, { method: 'POST' });
                            const data = await res.json();
                            if (data.success) { alert(data.message); fetchRequests(); }
                            else alert(data.error);
                          } catch (e) {
                            alert('UPI Developer Network connection failed.');
                          }
                        }}
                        disabled={!r.upiId}
                        style={{ opacity: !r.upiId ? 0.5 : 1, display: 'flex', justifyContent: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.2)' }}
                      >
                        <span className="material-symbols-outlined">account_balance</span>
                        Process UPI Payout (Test Mode)
                      </button>
                    </div>
                  ))}

                  <h3 style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.2rem', color: '#94a3b8' }}>Processed Payouts</h3>
                  {requests.filter(r => r.status === 'Paid' || r.status === 'Completed').length === 0 ? (
                     <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No recent completed payouts.</p>
                  ) : requests.filter(r => r.status === 'Paid' || r.status === 'Completed').map((r, i) => (
                     <div key={`paid-${i}`} className="admin-item-card completed" style={{ padding: '1rem', opacity: 0.7, gridColumn: '1 / -1' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div>
                           <h4 style={{ color: '#f1f5f9', fontSize: '1.1rem', marginBottom: '0.2rem' }}>{r.customer}</h4>
                           <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>UPI: {r.upiId || 'N/A'} • #{r.refId}</p>
                         </div>
                         <div style={{ textAlign: 'right' }}>
                           <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>₹{r.estimate}</span>
                           <p style={{ fontSize: '0.75rem', color: '#21c45d', marginTop: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.2rem' }}><span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>done_all</span> Settled</p>
                         </div>
                       </div>
                     </div>
                  ))}
                </section>
              )}

              {activeTab === 'settings' && (
                <section className="admin-grid" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
                  <h2 className="admin-page-title" style={{ marginTop: '0.5rem', marginBottom: '1.5rem', gridColumn: '1 / -1' }}>System Settings</h2>
                  <div className="admin-item-card" style={{ padding: '2rem', textAlign: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#94a3b8', marginBottom: '1rem' }}>settings_suggest</span>
                    <p style={{ color: '#94a3b8' }}>Configuration panels will appear here.</p>
                  </div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <nav className="admin-bottom-nav">
        <button className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => handleTabChange('dashboard')}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'dashboard' ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
          <span className="text">Dashboard</span>
        </button>
        <button className={`admin-nav-item ${activeTab === 'requests' ? 'active' : ''}`} onClick={() => handleTabChange('requests')}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'requests' ? "'FILL' 1" : "'FILL' 0" }}>receipt_long</span>
          <span className="text">Requests</span>
        </button>
        <button className={`admin-nav-item ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => handleTabChange('payments')}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'payments' ? "'FILL' 1" : "'FILL' 0" }}>payments</span>
          <span className="text">Payments</span>
        </button>
        <button className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => handleTabChange('settings')}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'settings' ? "'FILL' 1" : "'FILL' 0" }}>settings</span>
          <span className="text">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default VendorDashboard;
