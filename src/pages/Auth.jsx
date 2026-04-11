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

  const { login, register, user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  React.useEffect(() => {
    if (isLoggedIn && user) {
      if (user.role === 'admin') {
        navigate('/pz-admin-panel', { replace: true });
      } else {
        navigate(redirectTo, { replace: true });
      }
    }
  }, [isLoggedIn, user, navigate, redirectTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await register(name, email, password);
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
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <button className="auth-back-btn" onClick={() => navigate('/')}>
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      <div className="auth-glass-card">
        <div className="auth-header">
          <div className="auth-logo">
            Phone Zone <span>ReTech</span>
          </div>
          <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
          <p>{isLogin ? 'Welcome back, explorer' : 'Connect with the tech future'}</p>
        </div>

        {error && (
          <div className="auth-error-msg">
            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-input-group">
              <label className="auth-input-label">Full Name</label>
              <input 
                type="text" 
                className="auth-input-field" 
                placeholder="John Doe" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
              />
            </div>
          )}

          <div className="auth-input-group">
            <label className="auth-input-label">Email Address</label>
            <input 
              type="email" 
              className="auth-input-field" 
              placeholder="alex@example.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-input-label">Password</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="auth-input-field"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                style={{ 
                  position: 'absolute', 
                  right: '1rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'rgba(255,255,255,0.25)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-footer-links">
          {isLogin ? (
            <>
              New here? 
              <span onClick={() => { setIsLogin(false); setError(''); }}>Create Account</span>
            </>
          ) : (
            <>
              Already have an account? 
              <span onClick={() => { setIsLogin(true); setError(''); }}>Sign In</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

