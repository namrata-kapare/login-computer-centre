import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, KeyRound, Eye, EyeOff, AlertCircle, Monitor, ArrowLeft } from 'lucide-react';
import { loginAdmin, getAdminMe } from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect straight to /admin
    async function verify() {
      const data = await getAdminMe();
      if (data && data.admin) {
        navigate('/admin', { replace: true });
      }
    }
    verify();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('कृपया ई-मेल/वापरकर्तानाव व पासवर्ड टाका.');
      return;
    }

    setLoading(true);
    try {
      await loginAdmin(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'वापरकर्तानाव किंवा पासवर्ड चुकीचा आहे.');
    } finally {
      setLoading(false);
    }
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
            <span>मुख्य वेबसाइटवर जा</span>
          </button>
        </div>

        <div className="admin-login-card">
          {/* Header */}
          <div className="admin-login-header">
            <div className="admin-logo-bubble">
              <Lock size={28} />
            </div>
            <h1 className="admin-title">प्रशासक लॉगिन</h1>
            <p className="admin-subtitle">
              आपल्या वेबसाइटची माहिती व्यवस्थापित करण्यासाठी लॉगिन करा.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="admin-error-banner">
              <AlertCircle size={20} flexShrink={0} />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label className="form-label">
                <Mail size={16} />
                <span>ई-मेल / वापरकर्तानाव</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="उदा. admin@loginjejuri.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <KeyRound size={16} />
                <span>पासवर्ड</span>
              </label>
              <div className="password-input-wrapper" style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="आपला पासवर्ड टाका"
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
                  aria-label="पासवर्ड दाखवा/लपवा"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-admin-submit"
              disabled={loading}
            >
              {loading ? (
                <span>लॉगिन होत आहे...</span>
              ) : (
                <span>लॉगिन करा</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
