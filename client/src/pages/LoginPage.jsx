import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle, LogIn, Zap, BarChart3, Shield, Leaf } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Demo accounts
  const demoAccounts = [
    { email: 'admin@example.com', password: 'password123', role: 'Admin' },
    { email: 'john@example.com', password: 'password123', role: 'User' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Email atau password salah');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (error) setError('');
  };

  const loginWithDemo = async (account) => {
    setFormData({ email: account.email, password: account.password });
    setIsLoading(true);
    setError('');

    try {
      const result = await login({ email: account.email, password: account.password });
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError('Demo login gagal');
      }
    } catch (err) {
      setError('Demo login gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'grid',
        gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
        gap: '3rem',
        alignItems: 'center'
      }}>
        
        {/* Left Side - Branding & Features */}
        <div style={{
          display: window.innerWidth <= 768 ? 'none' : 'block',
          color: 'white',
          padding: '2rem'
        }}>
          {/* Welcome Section */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                padding: '1rem',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '2rem' }}>🔐</div>
              </div>
              <div>
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  margin: 0
                }}>
                  Selamat Datang
                </h1>
                <p style={{
                  fontSize: '1.1rem',
                  opacity: 0.9,
                  margin: 0
                }}>
                  Masuk ke akun EcoMarga Anda dan mulai berkontribusi untuk lingkungan yang lebih bersih dan berkelanjutan.
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Preview Cards */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              📊 Dashboard Personal
            </h3>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <BarChart3 size={24} style={{ color: '#10b981' }} />
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    Pantau progres dan pencapaian Anda
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Preview */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              💰 Kelola Penghasilan
            </h3>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem'
                }}>
                  💸
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    Lacak pendapatan dari sampah yang dikumpulkan
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🌱 Dampak Lingkungan
            </h3>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <Leaf size={24} style={{ color: '#10b981' }} />
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    Lihat kontribusi Anda untuk planet ini
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Preview */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '0.75rem',
              padding: '1rem',
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '0.25rem'
              }}>
                1,234+
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                User
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '0.75rem',
              padding: '1rem',
              backdropFilter: 'blur(10px)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#34d399',
                marginBottom: '0.25rem'
              }}>
                5.2 ton
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                Terkumpul
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={{
          background: '#ffffff',
          borderRadius: '1.5rem',
          padding: '3rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                background: '#10b981',
                borderRadius: '1rem',
                padding: '1rem',
                color: 'white'
              }}>
                🌱
              </div>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: 0
              }}>
                Masuk ke EcoMarga
              </h2>
            </div>
            <p style={{
              color: '#6b7280',
              fontSize: '1rem',
              margin: 0
            }}>
              Selamat datang kembali! Silakan masuk ke akun Anda
            </p>
          </div>

          {/* Demo Accounts */}
          <div style={{
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <Zap size={16} style={{ color: '#f59e0b' }} />
              <h4 style={{
                margin: 0,
                fontSize: '0.875rem',
                color: '#92400e',
                fontWeight: '600'
              }}>
                Demo Mode Tersedia
              </h4>
            </div>
            <p style={{
              fontSize: '0.75rem',
              color: '#92400e',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              Coba fitur EcoMarga tanpa perlu mendaftar:
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  onClick={() => loginWithDemo(account)}
                  disabled={isLoading}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #f59e0b',
                    borderRadius: '0.5rem',
                    padding: '0.5rem 1rem',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontSize: '0.75rem',
                    color: '#92400e',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    opacity: isLoading ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.target.style.background = '#fef3c7';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.target.style.background = '#ffffff';
                    }
                  }}
                >
                  {account.role} - {account.email}
                </button>
              ))}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} style={{ color: '#dc2626' }} />
              <span style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                {error}
              </span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280'
                }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rani123@gmail.com"
                  style={{
                    width: '100%',
                    padding: '0.875rem 3rem 0.875rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#10b981';
                    e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.875rem 3rem 0.875rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#10b981';
                    e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280',
                    padding: '4px'
                  }}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: isLoading ? '#9ca3af' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.background = '#059669';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.background = '#10b981';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Masuk...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Masuk
                </>
              )}
            </button>

            {/* Register Link */}
            <div style={{ textAlign: 'center' }}>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                margin: 0
              }}>
                Belum punya akun?{' '}
                <Link
                  to="/register"
                  style={{
                    color: '#10b981',
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                  }}
                >
                  Daftar di sini
                </Link>
              </p>
            </div>
          </form>

          {/* Additional Info */}
          <div style={{
            borderTop: '1px solid #e5e7eb',
            paddingTop: '1.5rem',
            marginTop: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              color: '#6b7280',
              fontSize: '0.75rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Shield size={14} />
                <span>Aman & Terpercaya</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>📞</span>
                <span>info@ecomarga.id</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links - Mobile Only */}
      {window.innerWidth <= 768 && (
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          background: '#10b981',
          borderRadius: '1rem',
          padding: '1rem',
          color: 'white',
          fontSize: '0.75rem',
          zIndex: 1000
        }}>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
            Quick Links
          </div>
          <div>Beranda</div>
          <div>Bank Sampah</div>
          <div>Masuk</div>
          <div>Daftar</div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;