import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, KeyRound, Eye, EyeOff, AlertCircle, ArrowLeft, Info } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in in demo preview mode, redirect to /admin/dashboard
    const isLoggedIn = localStorage.getItem('admin_preview_logged_in') === 'true';
    if (isLoggedIn) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password');
      return;
    }

    setLoading(true);

    // Frontend-only demo authentication check
    setTimeout(() => {
      if (username.trim() === 'Login' && password === 'Login@123') {
        localStorage.setItem('admin_preview_logged_in', 'true');
        localStorage.setItem('adminToken', 'demo_preview_token');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
        setLoading(false);
      }
    }, 200);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        {/* Back to public site button */}
        <div style={{ marginBottom: '1.25rem' }}>
          <button 
            onClick={() => navigate('/')} 
            className="btn-back-home"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'transparent',
              border: 'none',
              color: '#475569',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={18} />
            <span>मुख्य वेबसाइटवर जा (Back to Website)</span>
          </button>
        </div>

        <div className="admin-login-card">
          {/* Header */}
          <div className="admin-login-header">
            <div className="admin-logo-bubble">
              <Lock size={28} />
            </div>
            <h1 className="admin-title">Admin Login</h1>
            <p className="admin-subtitle">
              वेबसाइट व्यवस्थापनासाठी लॉगिन करा (Frontend Preview Mode)
            </p>
          </div>

          {/* Demo Credentials Notice Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.6rem',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '10px',
            padding: '0.75rem 0.9rem',
            marginBottom: '1.25rem',
            fontSize: '0.86rem',
            color: '#1e40af'
          }}>
            <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '2px' }}>Demo Preview Credentials:</strong>
              <span>Username: <strong>Login</strong> &nbsp;|&nbsp; Password: <strong>Login@123</strong></span>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="admin-error-banner" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.9rem'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label className="form-label">
                <User size={16} />
                <span>Username (वापरकर्तानाव)</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter Username (e.g. Login)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <KeyRound size={16} />
                <span>Password (पासवर्ड)</span>
              </label>
              <div className="password-input-wrapper" style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter Password (e.g. Login@123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-admin-submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem',
                backgroundColor: 'var(--primary-blue, #2563eb)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                marginTop: '0.5rem'
              }}
            >
              {loading ? 'Logging in...' : 'Login (लॉगिन करा)'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
