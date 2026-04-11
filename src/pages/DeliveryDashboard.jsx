import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

const DEVICE_ICONS = { 'iPhone': 'smartphone', 'Samsung': 'smartphone', 'Google': 'smartphone', 'Mac': 'laptop_mac', 'Apple Watch': 'watch', 'iPad': 'tablet' };
const getDeviceIcon = (name) => {
  if (!name) return 'devices';
  for (const k in DEVICE_ICONS) if (name.includes(k)) return DEVICE_ICONS[k];
  return 'devices';
};

const DeliveryDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/requests`);
      const data = await res.json();
      if (data.success) {
        setRequests(data.requests.filter(r => ['Accepted', 'Pickup scheduled'].includes(r.status)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleStatusUpdate = async (id, status) => {
    if (!window.confirm(`Are you sure you want to change status to ${status}?`)) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/requests/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        fetchRequests();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-body-wrap">
      <header className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: '#1e2a31', border: '1px solid #334149', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#f1f5f9' }}>{user?.avatar || 'DP'}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 className="admin-header-title">Logistics Partner</h1>
            <span className="admin-header-subtitle">Pickup Dashboard</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={handleLogout} title="Logout">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </header>

      <main className="admin-main">
        <section style={{ marginBottom: '2rem' }}>
          <h2 className="admin-page-title">Assigned Pickups</h2>
          <p className="admin-page-desc">Generate routing and manage inbound device logistics.</p>
        </section>

        <section className="admin-grid">
          {loading ? (
             <p style={{ color: '#94a3b8' }}>Loading assignments...</p>
          ) : requests.length === 0 ? (
             <p style={{ color: '#94a3b8', background: '#10171d', padding: '2rem', borderRadius: '1rem', border: '1px dashed #334149', textAlign: 'center' }}>No assigned pickups found right now.</p>
          ) : requests.map((r, i) => (
            <div key={i} className="admin-item-card highlight">
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

              <div className="admin-item-details-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-detail-box" style={{ gridColumn: 'span 2' }}>
                  <span className="admin-detail-label">Location</span>
                  <span className="admin-detail-val" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'normal', lineHeight: '1.4' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#38bdf8' }}>location_on</span>
                    {r.address}
                  </span>
                </div>
                <div className="admin-detail-box">
                  <span className="admin-detail-label">Customer</span>
                  <span className="admin-detail-val">{r.customer}</span>
                </div>
                <div className="admin-detail-box">
                  <span className="admin-detail-label">Contact</span>
                  <span className="admin-detail-val">{r.email}</span>
                </div>
              </div>

              {r.status === 'Accepted' && (
                <button 
                  className="admin-btn-primary"
                  onClick={() => handleStatusUpdate(r._id, 'Pickup scheduled')}
                >
                  Generate Pickup ID
                </button>
              )}
              {r.status === 'Pickup scheduled' && (
                <button 
                  className="admin-btn-primary"
                  style={{ background: 'rgba(33, 196, 93, 0.1)', color: '#21c45d', border: '1px solid rgba(33, 196, 93, 0.2)' }}
                  onClick={() => handleStatusUpdate(r._id, 'Received')}
                >
                  Mark Device as Picked Up
                </button>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default DeliveryDashboard;
