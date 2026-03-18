import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sell = () => {
  const navigate = useNavigate();
  const [condition, setCondition] = useState('LIKE NEW');
  const [category, setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/dashboard'), 3000);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(22,197,95,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: '#16c55f' }}>check_circle</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.75rem' }}>Request Submitted! ♻️</h2>
          <p style={{ color: 'var(--text-muted-light)', marginBottom: '1.5rem' }}>
            Your request <strong>#PZ-8942</strong> has been received. Our team will contact you within 2 hours.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16c55f', animation: 'pulse 1.5s infinite' }} />
            Redirecting to your dashboard...
          </div>
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', padding: '2rem 0 4rem', minHeight: '100vh', background: 'var(--bg-light)' }}>
      <div className="container-sm">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted-light)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '2rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_back</span>
          Back
        </button>

        <div className="sell-header">
          <h1>Sell Your Device</h1>
          <p>Get an instant quote and turn your old tech into cash today.</p>
          <div className="progress-bar-section">
            <div className="progress-info">
              <span className="step-label">Step 2 of 3: Device Details</span>
              <span className="percent">65% Complete</span>
            </div>
            <div className="progress-track">
              <div className="progress-track-fill" style={{ width: '65%' }} />
            </div>
          </div>
        </div>

        <div className="sell-form-card">
          <form onSubmit={handleSubmit}>
            <div className="sell-form-body">
              {/* Device Type + Condition */}
              <div className="form-row">
                <div>
                  <label className="sell-form-label">Item Type</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      className="sell-select"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="smartphone">Smartphone</option>
                      <option value="tablet">Tablet</option>
                      <option value="laptop">Laptop</option>
                      <option value="smartwatch">Smartwatch</option>
                      <option value="computer">Computer / iMac</option>
                      <option value="other">Other Electronics</option>
                    </select>
                    <span className="material-symbols-outlined" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }}>expand_more</span>
                  </div>
                </div>

                <div>
                  <label className="sell-form-label">Device Condition</label>
                  <div className="condition-btns">
                    {['LIKE NEW', 'GOOD', 'FAIR', 'BROKEN'].map(c => (
                      <button
                        type="button"
                        key={c}
                        className={`condition-btn ${condition === c ? 'active' : ''}`}
                        onClick={() => setCondition(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upload */}
              <div style={{ marginTop: '1.5rem' }}>
                <label className="sell-form-label">Device Photos</label>
                <label className="upload-area">
                  <input type="file" accept="image/*" multiple style={{ display: 'none' }} />
                  <div className="upload-icon">
                    <span className="material-symbols-outlined">cloud_upload</span>
                  </div>
                  <h5>Click to upload or drag and drop</h5>
                  <p>PNG, JPG or WEBP (max. 10MB)</p>
                </label>
              </div>

              {/* Address */}
              <div style={{ marginTop: '1.5rem' }}>
                <label className="sell-form-label">Pickup Address</label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: 14, color: '#94a3b8', fontSize: '1.125rem' }}>location_on</span>
                  <input
                    type="text"
                    className="sell-select"
                    placeholder="Enter your full street address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              {/* Details */}
              <div style={{ marginTop: '1.5rem' }}>
                <label className="sell-form-label">Additional Details</label>
                <textarea
                  className="sell-select"
                  placeholder="Mention any cracks, battery issues, or accessories included..."
                  rows={4}
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  style={{ resize: 'none' }}
                />
              </div>

              <div className="info-banner">
                <span className="material-symbols-outlined">info</span>
                <p>Our technicians will verify the condition upon receipt. Providing accurate descriptions helps ensure you get paid the full amount quoted.</p>
              </div>
            </div>

            {/* Footer */}
            <div className="sell-form-footer">
              <button type="button" className="btn-back" onClick={() => navigate(-1)}>
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
              <button type="submit" className="btn-submit">
                Submit Request
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </form>
        </div>

        {/* Trust badges */}
        <div className="trust-badges">
          {[
            { icon: 'verified_user', label: 'Secure Process' },
            { icon: 'bolt', label: 'Fast Payments' },
            { icon: 'recycling', label: 'Eco Friendly' },
            { icon: 'thumb_up', label: 'Top Rated' },
          ].map(b => (
            <div className="trust-badge" key={b.icon}>
              <span className="material-symbols-outlined">{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sell;
