import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AdminProtectedRoute({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        localStorage.setItem('admin_preview_logged_in', 'true');
      } else {
        localStorage.removeItem('admin_preview_logged_in');
        localStorage.removeItem('adminToken');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        fontSize: '1rem',
        color: '#475569'
      }}>
        प्रतीक्षा करा... (Checking authorization...)
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
