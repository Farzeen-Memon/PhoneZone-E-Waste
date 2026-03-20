import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHome = location.pathname === '/';
  const isDashboard = location.pathname === '/dashboard';
  const isAuthPage = location.pathname === '/auth';
  
  const isMainSection = ['/', '/dashboard', '/pz-admin-panel'].includes(location.pathname);
  const showBackButton = !isMainSection && !isAuthPage && !isDashboard;

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
  };

  if (isAuthPage) return null;

  const sellStep = parseInt(searchParams.get('step')) || 1;
  const showProgress = location.pathname === '/sell';

  return (
    <header className="navbar" style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)' }}>
      {showProgress && (
        <div className="navbar-progress-bar" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', background: 'rgba(255,255,255,0.05)' }}>
          <div 
            style={{ 
              width: `${(sellStep / 4) * 100}%`, 
              height: '100%', 
              background: 'var(--primary)', 
              boxShadow: '0 0 10px var(--primary-glow)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
            }}
          />
        </div>
      )}
      <div className="navbar-inner" style={{ height: 60, padding: '0 1.25rem' }}>
        
        {/* Left Side: Profile Avatar AND optionally Back button */}
        <div className="navbar-left" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isLoggedIn ? (
            <div className="profile-dropdown-container" ref={dropdownRef}>
              <button 
                className="profile-avatar-btn" 
                onClick={() => setProfileOpen(!profileOpen)}
                style={{ width: 34, height: 34, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem' }}
              >
                {user?.avatar || (user?.name?.[0] || 'U')}
              </button>
              <div className={`profile-dropdown ${profileOpen ? 'open' : ''}`} style={{ left: 0, right: 'auto' }}>
                <div className="dropdown-user-info">
                  <span className="name" style={{ fontSize: '0.85rem' }}>{user?.name || 'User'}</span>
                  <span className="email" style={{ fontSize: '0.7rem' }}>{user?.email}</span>
                </div>
                <Link to="/dashboard" className="dropdown-item" onClick={() => setProfileOpen(false)}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>dashboard</span>
                  User Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/pz-admin-panel" className="dropdown-item" onClick={() => setProfileOpen(false)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>admin_panel_settings</span>
                    Vendor Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="dropdown-item logout">
                  <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>logout</span>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/" className="navbar-logo-text" style={{ fontSize: '0.9rem' }}>
              PZ <span>ReTech</span>
            </Link>
          )}

          {showBackButton && (
            <button className="mobile-back-btn" onClick={() => navigate(-1)} style={{ background: 'transparent', border: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_back</span>
            </button>
          )}
        </div>

        {/* Center: App Name (Title) */}
        <div className="navbar-center" style={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
          <Link to="/" className="navbar-logo" style={{ textAlign: 'center' }}>
            <h1 className="navbar-logo-text" style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}>
              Phone Zone <span style={{ fontSize: '0.6rem', opacity: 0.8 }}>ReTech</span>
            </h1>
          </Link>
        </div>

        {/* Right Side: Notifications */}
        <div className="navbar-actions" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {isLoggedIn ? (
            <button className="notification-btn" style={{ position: 'relative' }}>
              <span className="material-symbols-outlined">notifications</span>
              <div className="notification-dot" style={{ top: 2, right: 2 }}></div>
            </button>
          ) : (
            <Link to="/auth" className="btn-signup" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', borderRadius: '8px' }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
