import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        if (result.role === 'admin') {
          navigate('/pz-admin-panel');
        } else {
          navigate(redirectTo);
        }
      } else {
        setError(result.error);
      }
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-light)' }}
      className="auth-page">

      {/* Header */}
      <header className="navbar">
        <div className="navbar-inner" style={{ maxWidth: '100%', padding: '0 2.5rem' }}>
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', fontWeight: 700 }}>devices</span>
            </div>
            <h1 className="navbar-logo-text">Phone Zone <span>ReTech</span></h1>
          </Link>
          <nav className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/sell">Sell</Link>
            <a href="#">About</a>
          </nav>
        </div>
      </header>

      {/* Main auth area */}
      <div className="auth-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ alignSelf: 'flex-start', maxWidth: '500px', width: '100%', margin: '0 auto 1rem' }}>
          <button
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted-light)', fontWeight: 600, fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_back</span>
            Back
          </button>
        </div>
        <div className="auth-card">
          <h2>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
          <p className="subtitle">{isLogin ? 'Access your curated refurbished tech deals' : 'Join our premium trade-in community'}</p>

          {/* Admin hint */}
          <div style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem', background: 'rgba(22,197,95,0.06)', border: '1px solid rgba(22,197,95,0.15)', borderRadius: '10px', fontSize: '0.7rem', color: '#64748b', textAlign: 'center' }}>
            💡 Admin? Use <strong>admin@phonezone.in</strong> / <strong>admin123</strong>
          </div>

          <div className="auth-tabs">
            <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError(''); }}>Sign In</button>
            <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError(''); }}>Create Account</button>
          </div>

          {error && (
            <div style={{ padding: '0.75rem 1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#dc2626', fontSize: '0.8rem', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="form-input-wrap">
                  <span className="material-symbols-outlined">person</span>
                  <input type="text" className="form-input" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="form-input-wrap">
                <span className="material-symbols-outlined">mail</span>
                <input type="email" className="form-input" placeholder="name@company.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Password
                {isLogin && <a href="#" onClick={e => e.preventDefault()}>Forgot?</a>}
              </label>
              <div className="form-input-wrap" style={{ position: 'relative' }}>
                <span className="material-symbols-outlined">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: '3rem' }}
                />
                <button type="button"
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => setShowPassword(!showPassword)}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary-full" disabled={loading}
              style={{ opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {loading && <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />}
              {isLogin ? 'Sign In to Dashboard' : 'Create Account'}
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </button>
          </form>

          <div className="auth-divider">
            <span>Or continue with</span>
          </div>

          {/* Only Google — no GitHub */}
          <button type="button" className="social-btn" style={{ width: '100%' }}>
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" style={{ width: 18, height: 18 }} alt="Google" />
            Continue with Google
          </button>

          <p className="auth-footer-text">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); setError(''); }}>
              {isLogin ? 'Sign up free' : 'Sign in'}
            </a>
          </p>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid var(--border-light)', padding: '1.25rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>© 2026 Phone Zone ReTech. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
            <a key={t} href="#" style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{t}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Auth;
