import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/requests');
        const data = await res.json();
        if (data.success) setRequests(data.requests);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const pendingCount = requests.filter(r => r.status === 'Pending Review').length;
  const acceptedCount = requests.filter(r => r.status === 'Accepted' || r.status === 'Pickup scheduled' || r.status === 'Received').length;
  const completedCount = requests.filter(r => r.status === 'Paid' || r.status === 'Completed').length;

  return (
    <div className="admin-body-wrap">
      <header className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: '#1e2a31', border: '1px solid #334149', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#f1f5f9' }}>{user?.avatar || 'AD'}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 className="admin-header-title">Midnight Obsidian</h1>
            <span className="admin-header-subtitle">Admin Dashboard</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer' }}>
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <main className="admin-main">
        <section style={{ marginBottom: '2rem' }}>
          <h2 className="admin-page-title">Manage sell requests</h2>
          <p className="admin-page-desc">Real-time secondary electronics market overview</p>
        </section>

        <section className="admin-stats-container">
          <div className="admin-stat-card">
            <div className="admin-stat-title">Total Requests</div>
            <div className="admin-stat-value">{requests.length}</div>
            <div className="admin-stat-footer success">
               +12.4% <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>trending_up</span>
            </div>
          </div>
          <div className="admin-stat-card highlight">
            <div className="admin-stat-title highlight">Pending</div>
            <div className="admin-stat-value">{pendingCount}</div>
            <div className="admin-stat-footer highlight timeline-pulse" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.1rem 0.25rem', borderRadius: '999px', background: 'rgba(33, 196, 93, 0.1)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#21c45d', marginRight: 4 }}></span> Immediate Action
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-title">Accepted</div>
            <div className="admin-stat-value">{acceptedCount}</div>
            <div className="admin-stat-footer">In Processing</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-title">Completed</div>
            <div className="admin-stat-value">{completedCount}</div>
            <div className="admin-stat-footer success">Historical Total</div>
          </div>
        </section>

        <section className="admin-search-area">
          <div className="admin-search-input-wrap">
            <span className="material-symbols-outlined admin-search-icon">search</span>
            <input type="text" className="admin-search-input" placeholder="Search by Request ID (#RE-0000)..." />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="admin-filter-btn">
              <span>Status</span>
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="admin-add-btn">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </section>

        <section className="admin-grid">
          {loading ? (
             <p style={{ color: '#94a3b8' }}>Loading requests...</p>
          ) : requests.length === 0 ? (
             <p style={{ color: '#94a3b8' }}>No requests found.</p>
          ) : requests.map((r, i) => (
            <div key={i} className={`admin-item-card ${r.status === 'Pending Review' ? 'highlight' : r.status === 'Completed' || r.status === 'Paid' || r.status === 'Declined' ? 'completed' : ''}`}>
              <div className={`admin-status-badge ${r.status}`}><span>{r.status}</span></div>
              
              <div className="admin-item-header">
                <div className={`admin-item-icon ${r.status}`}>
                  <span className="material-symbols-outlined">{getDeviceIcon(r.device)}</span>
                </div>
                <div>
                  <div className="admin-item-id">ID #{r.refId}</div>
                  <h3 className="admin-item-title">{r.device}</h3>
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
                {r.status === 'Completed' || r.status === 'Paid' || r.status === 'Declined' ? 'Archive' : 'View Details'}
              </button>
            </div>
          ))}
        </section>
      </main>

      <nav className="admin-bottom-nav">
        <button className="admin-nav-item active">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="text">Dashboard</span>
        </button>
        <button className="admin-nav-item">
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="text">Requests</span>
        </button>
        <button className="admin-nav-item">
          <span className="material-symbols-outlined">payments</span>
          <span className="text">Payments</span>
        </button>
        <button className="admin-nav-item" onClick={handleLogout}>
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default VendorDashboard;
