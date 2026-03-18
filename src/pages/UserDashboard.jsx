import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PROFILE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQcZ9ffG4oipeRhc4d1D_cZSRnYTc3BUgrqISP0J-bY-j43vhVX-qKslLLNuz63w0Vf5t4_WIumRRD2f_qbgmq_Oo2j9MAOM75SOwNEgClhtKEjg2Fs7hSZAATq_UpXB7GS1VUcJJH6u9FIhN0iPfecnLguOBn4lFK6PXQnpQsi3UOXhFn7YGScq77a5DRgVWLru2EHQ7SNbqxCqdsIXWY2s6rDvrG9IO5IAgrR6q7SvEVR39QpCrNS55QMAUBu4SEXKgOZo9STWo';
const IPHONE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwlypCCy1e2ql5ZcDm3k2jXGwVE1gfh1vzhMeCe_0DFl9PZ5tFjB86Eo74O_nfQRtO5EWaD1BvsiaN4wL_9NlmxwTdfD5Ti4yM6Vsfl69skbKvK6NoOv45GdG1c9vLxzERfC6TfvwT5HPPWEmXf7plf50YEblBktFq8kp7hDVMoGIzRG350IuiT597EeODUp7OlUZcGl-BGzzaLs46t-7I-xifzS8Ynp2DMzlfxR-msb7Gz2g6jf9FDS6Ieasd78v40ggHIHDZOS8';
const SAMSUNG_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxqj6JHV_x2nYnfkbevkRL3TNnhMjjTTxwMWlncKYNmFmUbpSSwRNmMU0nuUuANGTOXyfsQpr1PHvFZIbitQ0A-Ub_I7eFbrLRlJykCjeghWy2wfNzitsDIu5zaZTrSUkkAjMTWJvyZbJrIGbMV18osW0CZnfxz3_dH0nmzyuJ58dIZe3-_PBQfKMosTy3pU88aCmW0SXeCgpbHMNroDcyTKsjbOh50y6D9LpvRtkxJIFZuO99korT2zrT0NyyOSq2Z3m4_eTK_3I';
const WATCH_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEVbHCeTr3eIbOXoB4CWAkFJJu9TXILUA_wQl-CL9OYnMhS97xH6-C0DrBM3vVU-K4oukpE4hHWOe2cnBa1CuHULc0fWJXU7us5ZVZSIrDd6TNyDbj1Wyk82Z0f44ILTotR2mqc21B0BkSG9wYoB1BbY73_gBWXufeExxTnj8pWMOhBYNeVvRrHCkoWL76dHLJSr4qq3EVIomnolJEob2PYDvfbrprOKVL2ZwO2FumY2Goudc5LHlu66MsPdZVfkhFv-Aje1uV3jg';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('dashboard');

  const handleLogout = () => { logout(); navigate('/'); };

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'requests', label: 'My Requests', icon: 'request_quote' },
    { id: 'history', label: 'Trade History', icon: 'history' },
    { id: 'payments', label: 'Payments', icon: 'payments' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-light)', width: '100vw' }}>

      {/* ===== SIDEBAR ===== */}
      <aside style={{
        width: 220, minWidth: 220,
        background: 'var(--surface-light)',
        borderRight: '1px solid var(--border-light)',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50
      }}>
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: '#16c55f', borderRadius: 10, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#112118', fontSize: '1.25rem' }}>cell_tower</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.01em' }}>Phone Zone</h1>
        </div>

        <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {sidebarLinks.map(l => (
            <button key={l.id} onClick={() => setActiveLink(l.id)} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.7rem 1rem', borderRadius: '0.75rem', width: '100%',
              fontWeight: 600, fontSize: '0.875rem', textAlign: 'left',
              background: activeLink === l.id ? 'rgba(22,197,95,0.1)' : 'transparent',
              color: activeLink === l.id ? '#16c55f' : 'var(--text-muted-light)',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>{l.icon}</span>
              {l.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid var(--border-light)' }}>
          <button onClick={() => setActiveLink('settings')} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%',
            padding: '0.7rem 1rem', borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.875rem',
            color: 'var(--text-muted-light)', background: 'none', border: 'none', cursor: 'pointer'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>settings</span>
            Settings
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', marginTop: '0.5rem' }}>
            <img src={PROFILE_IMG} alt="User" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'Alex Smith'}</p>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Verified Seller</p>
            </div>
            <button onClick={handleLogout} title="Logout" style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main style={{ flex: 1, marginLeft: 220, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Top Bar */}
        <header style={{
          height: 72, background: 'var(--surface-light)', borderBottom: '1px solid var(--border-light)',
          padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 10
        }}>
          <div style={{ position: 'relative', maxWidth: 500, width: '100%' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.125rem' }}>search</span>
            <input type="text" placeholder="Search requests, serial numbers..." style={{ width: '100%', background: '#f1f5f9', border: 'none', borderRadius: '0.75rem', padding: '0.625rem 1rem 0.625rem 2.5rem', fontSize: '0.8rem', color: 'var(--text-light)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1.5rem' }}>
            <button style={{ position: 'relative', padding: '0.5rem', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}>
              <span className="material-symbols-outlined">notifications</span>
              <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid white' }} />
            </button>
            <Link to="/sell" style={{ background: '#16c55f', color: 'white', padding: '0.625rem 1.25rem', borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem', textDecoration: 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>add</span>
              New Request
            </Link>
          </div>
        </header>

        <div style={{ padding: '2rem', overflowY: 'auto' }}>
          {/* Welcome */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>User Dashboard</h2>
            <p style={{ color: '#64748b' }}>Welcome back, {user?.name || 'Alex'}. You have 1 action required today.</p>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { label: 'Active Requests', value: '4', change: '+1 this week', changeColor: '#16c55f', iconColor: '#16c55f', iconBg: 'rgba(22,197,95,0.1)', icon: 'pending_actions' },
              { label: 'Pending Offers', value: '1', change: 'Needs Attention', changeColor: '#ea580c', iconColor: '#ea580c', iconBg: '#fff7ed', icon: 'priority_high' },
              { label: 'Total Earned', value: '₹1,03,320', change: '+₹20,850', changeColor: '#16c55f', iconColor: '#16c55f', iconBg: '#dcfce7', icon: 'account_balance_wallet' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--surface-light)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-light)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>{s.label}</span>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: s.iconColor }}>{s.icon}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.875rem', fontWeight: 700 }}>{s.value}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem', color: s.changeColor }}>{s.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Requests heading */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Active Sell Requests</h3>
            <a href="#" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#16c55f' }}>View All History</a>
          </div>

          {/* === REQUEST CARD 1: ACTION REQUIRED === */}
          <div style={{ background: 'var(--surface-light)', borderRadius: '1.5rem', border: '2px solid rgba(22,197,95,0.3)', boxShadow: '0 8px 24px rgba(22,197,95,0.08)', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(22,197,95,0.05)', borderBottom: '1px solid rgba(22,197,95,0.1)', padding: '0.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#16c55f' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>notification_important</span>
                ACTION REQUIRED: Review Price Offer
              </div>
              <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>REF: #RE-49210</span>
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minWidth: 0 }}>
                  <div style={{ width: 96, height: 96, borderRadius: '1rem', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={IPHONE_IMG} alt="iPhone 15" style={{ height: 80, width: 'auto', objectFit: 'contain' }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>iPhone 15 Pro Max</h4>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>Natural Titanium • 256GB • Good Condition</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Vendor Offer:</span>
                      <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>₹70,375</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0, alignSelf: 'center' }}>
                  <button style={{ padding: '0.75rem 2rem', background: '#16c55f', color: 'white', borderRadius: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,197,95,0.2)', transition: 'all 0.2s' }}>Accept Offer</button>
                  <button style={{ padding: '0.75rem 2rem', background: '#f1f5f9', color: '#64748b', borderRadius: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Decline</button>
                </div>
              </div>

              {/* Full status timeline */}
              <div style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 18, left: 0, right: 0, height: 2, background: '#e2e8f0', zIndex: 0 }} />
                  {[
                    { label: 'Requested', done: true },
                    { label: 'Under Review', done: true },
                    { label: 'Price Provided', active: true },
                    { label: 'Accepted', pending: true },
                    { label: 'Picked', pending: true },
                    { label: 'Evaluated', pending: true },
                    { label: 'Paid', pending: true },
                  ].map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 1, opacity: step.pending ? 0.4 : 1 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 0 4px var(--surface-light)',
                        background: step.done ? '#16c55f' : step.active ? 'white' : '#e2e8f0',
                        border: step.active ? '4px solid #16c55f' : 'none',
                        color: step.done ? 'white' : step.active ? '#16c55f' : '#94a3b8'
                      }}>
                        {step.done ? (
                          <span className="material-symbols-outlined" style={{ fontSize: '1rem', fontWeight: 700 }}>check</span>
                        ) : step.active ? (
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16c55f', animation: 'pulse 1.5s infinite' }} />
                        ) : (
                          <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>{idx === 3 ? 'lock' : idx === 4 ? 'local_shipping' : idx === 5 ? 'fact_check' : 'payments'}</span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: step.active ? '#16c55f' : '#94a3b8' }}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* === REQUEST CARD 2: IN TRANSIT === */}
          <div style={{ background: 'var(--surface-light)', borderRadius: '1.5rem', border: '1px solid var(--border-light)', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minWidth: 0 }}>
                  <div style={{ width: 80, height: 80, borderRadius: '1rem', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={SAMSUNG_IMG} alt="Samsung" style={{ height: 64, width: 'auto', objectFit: 'contain' }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Samsung Galaxy S23 Ultra</h4>
                      <span style={{ background: '#dbeafe', color: '#2563eb', fontSize: '0.6rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>In Transit</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Phantom Black • 512GB • Fair Condition</p>
                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>REF: #RE-48102</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Guaranteed Price</p>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹50,840</span>
                </div>
              </div>
              {/* Mini timeline */}
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f8fafc', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, right: 0, height: 2, background: '#f1f5f9' }} />
                  <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: '66%', height: 2, background: '#16c55f' }} />
                  {['filled', 'filled', 'filled', 'filled', 'current', 'empty', 'empty'].map((t, i) => (
                    <div key={i} style={{
                      position: 'relative', zIndex: 1,
                      width: t === 'current' ? 20 : 10,
                      height: t === 'current' ? 20 : 10,
                      borderRadius: '50%',
                      background: t === 'empty' ? '#e2e8f0' : '#16c55f',
                      border: t === 'current' ? '4px solid white' : 'none',
                      boxShadow: t === 'current' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                      flexShrink: 0
                    }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  {['Req', 'Rev', 'Price', 'Acc', 'Picked', 'Eval', 'Paid'].map((l, i) => (
                    <span key={i} style={{ fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', color: i === 4 ? '#16c55f' : '#94a3b8', letterSpacing: '-0.01em' }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* === REQUEST CARD 3: PROCESSING === */}
          <div style={{ background: 'var(--surface-light)', borderRadius: '1.5rem', border: '1px solid var(--border-light)', overflow: 'hidden', opacity: 0.9, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minWidth: 0 }}>
                  <div style={{ width: 80, height: 80, borderRadius: '1rem', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={WATCH_IMG} alt="Apple Watch" style={{ height: 64, width: 'auto', objectFit: 'contain' }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Apple Watch Series 9</h4>
                      <span style={{ background: '#f1f5f9', color: '#64748b', fontSize: '0.6rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 4, textTransform: 'uppercase' }}>Processing</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Silver Aluminum • 45mm • Like New</p>
                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>REF: #RE-47993</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Est. Value</p>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#94a3b8' }}>TBD</span>
                </div>
              </div>
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f8fafc', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, right: 0, height: 2, background: '#f1f5f9' }} />
                  <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: '16%', height: 2, background: '#16c55f' }} />
                  {['filled', 'current', 'empty', 'empty', 'empty', 'empty', 'empty'].map((t, i) => (
                    <div key={i} style={{
                      position: 'relative', zIndex: 1,
                      width: t === 'current' ? 20 : 10,
                      height: t === 'current' ? 20 : 10,
                      borderRadius: '50%',
                      background: t === 'empty' ? '#e2e8f0' : '#16c55f',
                      border: t === 'current' ? '4px solid white' : 'none',
                      boxShadow: t === 'current' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  {['Req', 'Review', 'Price', 'Acc', 'Picked', 'Eval', 'Paid'].map((l, i) => (
                    <span key={i} style={{ fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', color: i === 1 ? '#16c55f' : '#94a3b8', letterSpacing: '-0.01em' }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`@keyframes pulse{ 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
};

export default UserDashboard;
