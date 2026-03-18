import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      let result;
      if (isLogin) {
        result = login(email, password);
      } else {
        result = register(name, email, password);
      }

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

      <div className="auth-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1.5rem' }}>
        <div className="auth-card">
          <h2>{isLogin ? 'Welcome back' : 'Welcome'}</h2>
          <p className="subtitle">{isLogin ? 'Access your curated refurbished tech deals' : 'Join our premium trade-in community'}</p>

          <div className="auth-tabs">
            <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError(''); }}>Sign In</button>
            <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError(''); }}>Create Account</button>
          </div>

          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', color: '#ef4444', fontSize: '0.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>person</span>
                    Full Name
                  </div>
                </label>
                <div className="form-input-wrap">
                  <input type="text" className="form-input" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required 
                    style={{ paddingLeft: '1rem' }} />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>mail</span>
                  Email Address
                </div>
              </label>
              <div className="form-input-wrap">
                <input type="email" className="form-input" placeholder="name@company.com"
                  value={email} onChange={e => setEmail(e.target.value)} required 
                  style={{ paddingLeft: '1rem' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>lock</span>
                  Password
                </div>
                {isLogin && <a href="#" onClick={e => e.preventDefault()} style={{ marginLeft: 'auto' }}>Forgot?</a>}
              </label>
              <div className="form-input-wrap" style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: '1rem', paddingRight: '3.5rem' }}
                />
                <button type="button" 
                  style={{ 
                    position: 'absolute', 
                    right: '0.75rem', 
                    top: '50.5%', 
                    transform: 'translateY(-50%)', 
                    color: '#94a3b8', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                  }}
                  onClick={() => setShowPassword(!showPassword)}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary-full" disabled={loading}
              style={{ opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              {loading && <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />}
              {isLogin ? 'Sign In to Dashboard' : 'Create Account'}
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </button>
          </form>

          <div className="auth-divider">
            <span>Or continue with</span>
          </div>

          <button type="button" className="social-btn" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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

      <footer style={{ borderTop: '1px solid var(--border-dark)', padding: '1.25rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: '#1a2730' }}>
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
