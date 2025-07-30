import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Footer = () => {
  const { isAuthenticated, user } = useAuth();

  // Footer links berdasarkan status login
  const getFooterLinks = () => {
    if (!isAuthenticated) {
      return [
        { to: '/', label: 'Beranda' },
        { to: '/bank-sampah', label: 'Bank Sampah' },
        { to: '/login', label: 'Masuk' },
        { to: '/register', label: 'Daftar' }
      ];
    }

    if (user?.role === 'admin') {
      return [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/admin/users', label: 'Kelola User' },
        { to: '/admin/transactions', label: 'Transaksi' },
        { to: '/admin/reports', label: 'Laporan' }
      ];
    }

    return [
      { to: '/dashboard', label: 'Dashboard' },
      { to: '/submit', label: 'Submit Sampah' },
      { to: '/history', label: 'Riwayat' },
      { to: '/bank-sampah', label: 'Bank Sampah' }
    ];
  };

  const footerLinks = getFooterLinks();

  return (
    <footer style={{
      background: 'white',
      borderTop: '1px solid #e5e7eb',
      padding: '3rem 0 2rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand Section */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 'bold'
              }}>
                🌿
              </div>
              <h3 style={{ 
                color: '#10b981', 
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: '700'
              }}>
                EcoMarga
              </h3>
            </div>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '0.875rem',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              Platform digital untuk pengelolaan sampah berkelanjutan. 
              Bersama membangun masa depan yang lebih hijau.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <div style={{
                background: '#f0fdf4',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #10b981'
              }}>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '500' }}>
                  📊 1,234+ User
                </span>
              </div>
              <div style={{
                background: '#f0fdf4',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #10b981'
              }}>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '500' }}>
                  ♻️ 5.2 Ton Terkumpul
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              marginBottom: '1rem',
              color: '#1f2937',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              Quick Links
            </h4>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              margin: 0
            }}>
              {footerLinks.map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <Link 
                    to={link.to} 
                    style={{ 
                      color: '#6b7280', 
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#10b981'}
                    onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ 
              marginBottom: '1rem',
              color: '#1f2937',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              Hubungi Kami
            </h4>
            <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <span>📧</span>
                <span>info@ecomarga.id</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <span>📱</span>
                <span>+62 812-3456-7890</span>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem'
              }}>
                <span>📍</span>
                <span>Semarang, Jawa Tengah</span>
              </div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div>
            <h4 style={{ 
              marginBottom: '1rem',
              color: '#1f2937',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              Dampak Lingkungan
            </h4>
            <div style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)',
              border: '1px solid #10b981',
              borderRadius: '12px',
              padding: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '1.25rem' }}>🌍</span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: '#059669',
                  fontWeight: '600'
                }}>
                  CO₂ Berkurang: 1.2 Ton
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.25rem' }}>🌳</span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: '#059669',
                  fontWeight: '600'
                }}>
                  Setara 52 Pohon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            © 2024 EcoMarga. Semua hak dilindungi.
          </div>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            fontSize: '0.875rem'
          }}>
            <a 
              href="#" 
              style={{ 
                color: '#6b7280', 
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#10b981'}
              onMouseLeave={(e) => e.target.style.color = '#6b7280'}
            >
              Kebijakan Privasi
            </a>
            <span style={{ color: '#d1d5db' }}>|</span>
            <a 
              href="#" 
              style={{ 
                color: '#6b7280', 
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#10b981'}
              onMouseLeave={(e) => e.target.style.color = '#6b7280'}
            >
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;