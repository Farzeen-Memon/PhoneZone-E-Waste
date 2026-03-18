import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const REQUESTS = [
  { id: '#8842', device: 'iPhone 13 Pro', specs: '128GB • Sierra Blue', customer: 'John Doe', email: 'john.d@example.com', status: 'Pending Review', estimate: '₹37,500', statusColor: '#f59e0b', statusBg: '#fef3c7' },
  { id: '#8841', device: 'Samsung S22', specs: '256GB • Phantom Black', customer: 'Jane Smith', email: 'jane.smith@email.com', status: 'Picked', estimate: '₹26,700', statusColor: '#2563eb', statusBg: '#dbeafe' },
  { id: '#8840', device: 'Google Pixel 7', specs: '128GB • Obsidian', customer: 'Mike Ross', email: 'mross@legal.com', status: 'Evaluated', estimate: '₹23,800', statusColor: '#7c3aed', statusBg: '#ede9fe' },
  { id: '#8839', device: 'iPhone 14', specs: '256GB • Purple', customer: 'Sarah Chen', email: 'sarahc@tech.com', status: 'Paid', estimate: '₹70,900', statusColor: '#16c55f', statusBg: '#dcfce7' },
];

const DEVICE_ICONS = { 'iPhone': 'smartphone', 'Samsung': 'smartphone', 'Google': 'smartphone', 'Mac': 'laptop_mac', 'Apple Watch': 'watch' };
const getDeviceIcon = (name) => {
  for (const k in DEVICE_ICONS) if (name.includes(k)) return DEVICE_ICONS[k];
  return 'devices';
};

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'requests', label: 'All Requests', icon: 'receipt_long' },
    { id: 'customers', label: 'Customers', icon: 'group' },
    { id: 'reports', label: 'Reports', icon: 'bar_chart' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-light)', width: '100vw' }}>
      {/* ===== SIDEBAR ===== */}
      <aside style={{
        width: 210,
        minWidth: 210,
        background: 'var(--surface-light)',
        borderRight: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
      }}>
        <div style={{ padding: '1.25rem 1.25rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem' }}>
          <div style={{ background: '#16c55f', borderRadius: 10, padding: '6px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#112118', fontSize: '1.25rem' }}>cell_tower</span>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>Phone Zone</div>
            <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#16c55f', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Admin Panel</div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {sidebarLinks.map(l => (
            <button
              key={l.id}
              onClick={() => setActiveLink(l.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.875rem', borderRadius: '0.625rem',
                fontWeight: 600, fontSize: '0.85rem', width: '100%', textAlign: 'left',
                background: activeLink === l.id ? 'rgba(22,197,95,0.1)' : 'transparent',
                color: activeLink === l.id ? '#16c55f' : 'var(--text-muted-light)',
                border: 'none', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>{l.icon}</span>
              {l.label}
            </button>
          ))}
        </nav>

        {/* User card at bottom */}
        <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#16c55f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>
              {user?.avatar || 'AR'}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'Alex ReTech'}</div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 500 }}>Super Admin</div>
            </div>
            <button onClick={handleLogout} title="Logout" style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main style={{ flex: 1, marginLeft: 210, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          height: 64, background: 'var(--surface-light)', borderBottom: '1px solid var(--border-light)',
          padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 10
        }}>
          <div style={{ position: 'relative', maxWidth: 460, width: '100%' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '1.125rem' }}>search</span>
            <input
              type="text"
              placeholder="Search requests, devices or customers..."
              style={{ width: '100%', background: '#f1f5f9', border: 'none', borderRadius: '0.75rem', padding: '0.625rem 1rem 0.625rem 2.5rem', fontSize: '0.8rem', color: 'var(--text-light)' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ position: 'relative', padding: '0.5rem', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}>
              <span className="material-symbols-outlined">notifications</span>
              <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid white' }} />
            </button>
            <button
              onClick={handleLogout}
              style={{ background: '#16c55f', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.375rem', border: 'none', cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>add</span>
              New Payout
            </button>
          </div>
        </header>

        <div style={{ padding: '2rem', flex: 1 }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { icon: 'receipt_long', label: 'Total Requests', value: '1,284', badge: '+12.5%', badgeColor: '#16c55f', badgeBg: '#dcfce7' },
              { icon: 'pending_actions', label: 'Pending Reviews', value: '42', badge: 'Action Required', badgeColor: '#d97706', badgeBg: '#fef3c7' },
              { icon: 'account_balance_wallet', label: 'Total Payouts', value: '₹10,37,500', badge: 'This Month', badgeColor: '#64748b', badgeBg: '#f1f5f9' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--surface-light)', border: '1px solid var(--border-light)', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '0.75rem', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ color: '#16c55f', fontSize: '1.375rem' }}>{s.icon}</span>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: 9999, background: s.badgeBg, color: s.badgeColor }}>
                    {s.badge}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500, marginBottom: '0.375rem' }}>{s.label}</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Requests table */}
          <div style={{ background: 'var(--surface-light)', border: '1px solid var(--border-light)', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Recent Buyback Requests</h3>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {['Filter', 'Export'].map(t => (
                  <button key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 0.875rem', border: '1px solid var(--border-light)', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted-light)', background: 'white', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>{t === 'Filter' ? 'filter_list' : 'download'}</span>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  {['REQUEST ID', 'DEVICE DETAILS', 'CUSTOMER', 'STATUS', 'ESTIMATE', 'ACTIONS'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 0.75rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REQUESTS.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '1rem 0.75rem', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>{r.id}</td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '0.5rem', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', color: '#64748b' }}>{getDeviceIcon(r.device)}</span>
                        </div>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{r.device}</p>
                          <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{r.specs}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{r.customer}</p>
                      <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{r.email}</p>
                    </td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <span style={{ display: 'inline-flex', padding: '0.25rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.7rem', fontWeight: 700, background: r.statusBg, color: r.statusColor }}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: 700, fontSize: '0.9rem' }}>{r.estimate}</td>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {r.status === 'Evaluated' ? (
                          <button style={{ background: '#16c55f', color: 'white', padding: '0.375rem 0.875rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                            Pay Now
                          </button>
                        ) : r.status === 'Picked' ? (
                          <button style={{ background: 'transparent', border: '1px solid #16c55f', color: '#16c55f', padding: '0.375rem 0.875rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                            Evaluate
                          </button>
                        ) : (
                          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '0.5rem', background: '#f1f5f9', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>visibility</span>
                          </button>
                        )}
                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '0.5rem', background: '#f1f5f9', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>more_horiz</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Showing 1-4 of 1,284</p>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                {['navigate_before', '1', '2', '3', 'navigate_next'].map((p, i) => (
                  <button key={i} style={{
                    width: 32, height: 32, borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: p.length === 1 ? '0.85rem' : '1rem', fontWeight: 700,
                    background: p === '1' ? '#16c55f' : '#f8fafc',
                    color: p === '1' ? 'white' : '#64748b',
                    border: '1px solid ' + (p === '1' ? '#16c55f' : 'var(--border-light)'),
                    cursor: 'pointer'
                  }}>
                    {p.length > 1 ? <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>{p}</span> : p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
