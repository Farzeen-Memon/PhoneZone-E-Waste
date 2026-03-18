import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/pz-admin-panel';
  if (isDashboard) return null;

  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* Mobile: back arrow on non-home pages */}
        <div className="navbar-left">
          {!isHome && (
            <button
              className="mobile-back-btn"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          )}
          <Link to="/" className="navbar-logo" style={{ gap: '0.4rem' }}>
            <h1 className="navbar-logo-text">
              Phone Zone <span>ReTech</span>
            </h1>
          </Link>
        </div>

        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/sell">Sell</Link>
          <a href="/#how-it-works">Business</a>
          <a href="/#categories">Support</a>
        </nav>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted-dark)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', color: '#112118', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>
                  {user?.avatar || user?.name?.[0] || 'U'}
                </div>
              </Link>
              <button onClick={handleLogout} style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="btn-login">Login</Link>
              {/* Signup button only on landing page */}
              {isHome && <Link to="/auth" className="btn-signup">Signup</Link>}
            </>
          )}

          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link to="/sell" onClick={() => setMobileOpen(false)}>Sell Device</Link>
        <Link to="/track" onClick={() => setMobileOpen(false)}>Track Pickup</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" onClick={() => setMobileOpen(false)}>My Dashboard</Link>
            <button onClick={handleLogout} style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#ef4444', fontWeight: 600, fontSize: '0.9rem', width: '100%' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth" onClick={() => setMobileOpen(false)} className="btn-signup" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            Sign In / Sign Up
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
