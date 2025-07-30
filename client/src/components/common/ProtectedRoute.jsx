import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Loading Spinner Component
const LoadingSpinner = ({ message = "Memuat..." }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #e5e7eb',
      borderTop: '4px solid #10b981',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{color: '#6b7280', fontSize: '0.875rem'}}>{message}</p>
    
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner message="Memverifikasi akses..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate 
      to="/login" 
      state={{ from: location }} 
      replace 
    />;
  }

  // Check admin permission if required
  if (requireAdmin && user?.role !== 'admin') {
    return (
      <div style={{
        padding: '4rem 0',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚫</div>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '1rem',
          color: '#ef4444'
        }}>
          Akses Ditolak
        </h2>
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '2rem',
          maxWidth: '400px'
        }}>
          Anda tidak memiliki izin untuk mengakses halaman ini. 
          Halaman ini hanya untuk administrator.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => window.history.back()}
            style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            ← Kembali
          </button>
          <a 
            href="/dashboard" 
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            📊 Dashboard
          </a>
        </div>
      </div>
    );
  }

  // Render protected content
  return children;
};

// Export LoadingSpinner juga untuk digunakan di komponen lain
export { LoadingSpinner };
export default ProtectedRoute;