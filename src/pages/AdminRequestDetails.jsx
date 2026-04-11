import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

const AdminRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/requests/${id}`);
        const data = await res.json();
        if (data.success) setRequest(data.request);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  const handleStatusUpdate = async (status, quotation = null) => {
    try {
      const endpoint = quotation 
        ? `${import.meta.env.VITE_API_URL}/api/admin/requests/${id}/accept`
        : `${import.meta.env.VITE_API_URL}/api/admin/requests/${id}/status`;
      
      const body = quotation ? { price: quotation } : { status };
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.success) {
        setRequest(prev => ({ 
          ...prev, 
          status: status === 'Accepted' && quotation ? 'Accepted' : status,
          estimate: quotation || prev.estimate
        }));
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Action failed');
    }
  };

  const handleShiprocketGenerate = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/requests/${id}/shiprocket`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setRequest(prev => ({ ...prev, status: 'Pickup scheduled' }));
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to Shiprocket sandbox');
    }
  };

  const handleDecline = async () => {
    if (!window.confirm('Are you sure you want to decline?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/requests/${id}/decline`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setRequest(prev => ({ ...prev, status: 'Declined' }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="admin-body-wrap" style={{ display:'flex', alignItems:'center', justifyContent:'center', color:'#94a3b8' }}>Loading...</div>;
  if (!request) return <div className="admin-body-wrap" style={{ display:'flex', alignItems:'center', justifyContent:'center', color:'#94a3b8' }}>Request not found.</div>;

  const STATUS_STEPS = ['Pending Review', 'Accepted', 'Pickup scheduled', 'Received', 'Paid', 'Completed'];
  const currentStepIdx = STATUS_STEPS.indexOf(request.status) === -1 ? 0 : STATUS_STEPS.indexOf(request.status);
  
  const isDeclined = request.status === 'Declined';

  return (
    <div className="admin-body-wrap">
      <header className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/pz-admin-panel')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 className="admin-header-title">Request Details</h1>
            <span className="admin-header-subtitle">Phone Zone ReTech</span>
          </div>
        </div>
      </header>

      <main className="admin-main-details">
        {/* Request Status Header */}
        <section className="admin-item-card" style={{ padding: '1.5rem', position: 'relative' }}>
          <div className="admin-status-badge Pending"><span>{isDeclined ? 'Declined' : 'Active Request'}</span></div>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8', fontWeight: 700, marginBottom: '0.25rem' }}>Request ID</p>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em', color: '#f1f5f9' }}>#{request.refId}</h1>
          
          <div className="admin-tracking-bar">
            {['Sent', 'Review', 'Accepted', 'Pickup', 'Received', 'Paid'].map((step, idx) => {
              const isCompleted = currentStepIdx > idx && !isDeclined;
              const isCurrent = currentStepIdx === idx && !isDeclined;
              
              let icon = 'check_circle';
              if (idx === 1) icon = 'visibility';
              if (idx === 2) icon = 'thumb_up';
              if (idx === 3) icon = 'local_shipping';
              if (idx === 4) icon = 'inventory_2';
              if (idx === 5) icon = 'payments';

              return (
                <div key={idx} className="admin-track-step">
                  <div className={`admin-track-icon-wrap ${isDeclined && idx > 0 ? 'upcoming' : isCompleted ? 'completed' : isCurrent ? 'current timeline-pulse' : 'upcoming'}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <span className={`admin-track-label ${isDeclined && idx > 0 ? 'upcoming' : isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming'}`}>{step}</span>
                  
                  {idx < 5 && <div className={`admin-track-line ${isDeclined ? 'upcoming' : currentStepIdx > idx ? 'completed' : 'upcoming'}`}></div>}
                </div>
              );
            })}
          </div>
        </section>

        <div className="admin-details-bento">
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Details */}
            <div className="admin-item-card">
              <div className="admin-detail-grid-4">
                <div>
                  <p className="admin-detail-label">Device Category</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="material-symbols-outlined" style={{ color: '#21c45d' }}>smartphone</span>
                    <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f1f5f9' }}>Phone</span>
                  </div>
                </div>
                <div>
                  <p className="admin-detail-label">Device Name</p>
                  <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f1f5f9' }}>{request.device}</p>
                </div>
                <div>
                  <p className="admin-detail-label">Condition</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '999px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    <span className="admin-dot" style={{ background: '#f59e0b' }}></span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fbbf24' }}>{request.condition}</span>
                  </div>
                </div>
                <div>
                  <p className="admin-detail-label">Specs</p>
                  <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{request.specs}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="admin-item-card">
              <p className="admin-detail-label" style={{ marginBottom: '1rem' }}>Pickup Address</p>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '0.5rem', background: '#28353d', border: '1px solid #334149', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#21c45d', flexShrink: 0 }}>
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p style={{ color: '#f1f5f9', fontWeight: 500 }}>{request.address || 'Address not provided'}</p>
                  <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>Customer: {request.customer}</p>
                  <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Email: {request.email}</p>
                  {request.phoneNo && <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>Phone: <span style={{ color: '#f1f5f9' }}>{request.phoneNo}</span></p>}
                  {request.upiId && <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>UPI ID: <span style={{ color: '#21c45d', fontWeight: 700 }}>{request.upiId}</span></p>}
                </div>
              </div>
            </div>

            {/* Gallery (Placeholders) */}
            <div className="admin-item-card">
              <p className="admin-detail-label" style={{ marginBottom: '1rem' }}>Uploaded Images (3)</p>
              <div className="admin-image-gallery">
                <div className="admin-image-item">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUEPBTX9hPhHo0VADNkguKI6mJhzHLowQaQ4j8_ezwL4rrtdfs-3xtlEgDOYFZPTG361f5x2uqf7Snb8LI7R31Nne_Er9Q0Df0o0_sshluzHf3Lo6JGvvEgIc4-wC_l-M9LgDzJCuz4w7a6p68Q9wkjkvr7eMMCtisPmFBYGucpwbB8Jowqpsy-OQ_BiOlQyDI2t136sZqtMSD15RBcQcfR8B28APUdYXUAwdKQpHwW2pcBSD_q9hbleWMNSfjCOSzFDexI6C4Nww" alt="front" />
                </div>
                <div className="admin-image-item">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Ub1qecVMZ3YJHyM-xZGWROX5BAnqCQ7fwE36455AiNHEAnivWSpf8prusjRgNFoRKKZ-kjdL6YsZocFNWl-4iaEhsUqt2Bxc-06a_NxF0mBZXCgDtDgxQrVbmsmJmcIjf71BpY1zk7iy10DL_pz6RArbAqNsQgcm-7LruKEj9B6d44KpYfNwUI8W_JVF1pwvLA60a3v0Z2fILebDC6-cviOvl7GwnI9l8Vqp7pXk2OctzmRLokrxX8nktihHWsbZVRpK79_06f8" alt="back" />
                </div>
                <div className="admin-image-item">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY_z6mvWazvsjTvLE1Xtv5AfnMDCVSiwFmTzaS3MGCri30v6dTGR4F6HzUI6cOgzPcxaYs3PN0VOnVdL9dRENFrgadUQYTMp69Z8rNd5GU7LoNq34AopjFKv5xn9cI0YxdR9aWwww2-UrpVD2hoLW1ocvTrHLMtfRpge3BkvmJW3wrQvmCzZsDSv9duDu5gx_f_dn88bHlEZtKZiDijGZtwNIb9bO6w1oiviyvh60V1n--eN3gdqELeAm2v_w_F5m1VwpKs8lY4E4" alt="side" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Quote Action */}
            <div className="admin-quote-box">
              <p className="admin-detail-label" style={{ color: '#21c45d' }}>{request.status === 'Accepted' || currentStepIdx > 1 ? 'Quotation Sent' : 'Send Quotation'}</p>
              
              {currentStepIdx > 1 || request.status === 'Accepted' ? (
                <div style={{ background: '#0b1215', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #334149' }}>
                   <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Accepted Quote</p>
                   <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#21c45d' }}>₹{request.estimate}</p>
                </div>
              ) : (
                <>
                  <div className="admin-quote-input-wrap">
                    <span className="admin-quote-symbol">₹</span>
                    <input 
                      type="number" 
                      className="admin-quote-input" 
                      placeholder="Enter Price" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <button 
                    className="admin-btn-primary" 
                    onClick={() => {
                       if (!price) return alert('Enter a price');
                       handleStatusUpdate('Accepted', price);
                    }}
                    disabled={isDeclined}
                  >
                    Accept Request
                  </button>
                  <button 
                    className="admin-btn-danger" 
                    onClick={handleDecline}
                    disabled={isDeclined}
                  >
                    Reject Request
                  </button>
                </>
              )}
            </div>

            {/* Workflow Actions */}
            <div className="admin-item-card">
              <p className="admin-detail-label" style={{ marginBottom: '1rem' }}>Workflow Actions</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button 
                  className="admin-wk-btn" 
                  onClick={handleShiprocketGenerate} 
                  disabled={currentStepIdx < 1 || currentStepIdx >= 2 || isDeclined}
                  style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.2)' }}
                >
                  Generate Shiprocket AWB <span className="material-symbols-outlined">local_shipping</span>
                </button>
                <button 
                  className="admin-wk-btn" 
                  onClick={() => handleStatusUpdate('Received')} 
                  disabled={currentStepIdx < 2 || currentStepIdx >= 3 || isDeclined}
                >
                  Mark as Received <span className="material-symbols-outlined">inventory_2</span>
                </button>
                <button 
                  className="admin-wk-btn" 
                  onClick={() => handleStatusUpdate('Paid')} 
                  disabled={currentStepIdx < 3 || currentStepIdx >= 4 || isDeclined}
                >
                  Mark Payment Sent <span className="material-symbols-outlined">send_money</span>
                </button>
              </div>
            </div>

            {/* Trust Score */}
            <div className="admin-item-card" style={{ borderStyle: 'dashed' }}>
              <p className="admin-detail-label" style={{ marginBottom: '1rem' }}>Customer Integrity</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Trust Score</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#21c45d' }}>9.8/10</span>
              </div>
              <div className="admin-integrity-bar-wrap">
                <div className="admin-integrity-bar" style={{ width: '98%' }}></div>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
};

export default AdminRequestDetails;
