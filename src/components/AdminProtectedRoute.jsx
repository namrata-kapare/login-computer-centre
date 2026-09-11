import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getAdminMe } from '../services/api';
import { Loader2 } from 'lucide-react';

export default function AdminProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const data = await getAdminMe();
      if (data && data.admin) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        gap: '1rem',
        color: '#0f172a'
      }}>
        <Loader2 className="animate-spin" size={40} style={{ color: '#2563eb' }} />
        <p style={{ fontWeight: 600, fontSize: '1rem' }}>प्रशासक लॉगिन तपासत आहे...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
