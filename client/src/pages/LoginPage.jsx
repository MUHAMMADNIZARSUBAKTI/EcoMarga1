import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle, LogIn, Zap } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);

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
      backgroundColor: '#f8fafc',
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
          padding: '2rem'
        }}>
          <div style={{
            backgroundColor: '#1e40af',
            borderRadius: '1rem',
            padding: '3rem',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>
              🔐
            </div>
            
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              margin: 0
            }}>
              Selamat Datang
            </h1>
            
            <p style={{
              fontSize: '1.125rem',
              marginBottom: '2rem',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              Masuk ke akun EcoMarga Anda dan mulai berkontribusi 
              untuk lingkungan yang lebih bersih dan berkelanjutan.
            </p>

            {/* Features */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '2rem',
              textAlign: 'left'
            }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '1rem',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '1.5rem' }}>📊</div>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    Dashboard Personal
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    Pantau progres dan pencapaian Anda
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '1rem',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '1.5rem' }}>💰</div>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    Kelola Penghasilan
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    Lacak pendapatan dari sampah yang dikumpulkan
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '1rem',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '1.5rem' }}>🌱</div>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    Dampak Lingkungan
                  </div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    Lihat kontribusi Anda untuk planet ini
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1,294+</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Pengguna Aktif</div>
              </div>
              
              <div style={{
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>5.2 Ton</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Sampah Terkumpul</div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '0.5rem',
              padding: '1rem',
              fontSize: '0.875rem',
              opacity: 0.8
            }}>
              "Setiap sampah yang Anda kelola dengan bijak adalah 
              langkah kecil menuju perubahan besar untuk bumi."
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Masuk ke EcoMarga
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1rem'
            }}>
              Selamat datang kembali! Silakan masuk ke akun Anda
            </p>
          </div>

          {/* Demo Login Section */}
          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: showDemo ? '1rem' : 0
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Zap size={16} style={{ color: '#f59e0b' }} />
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#92400e'
                }}>
                  Demo Mode Tersedia
                </span>
              </div>
              
              <button
                onClick={() => setShowDemo(!showDemo)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#f59e0b',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
                disabled={isLoading}
              >
                {showDemo ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>

            {showDemo && (
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
                      backgroundColor: 'white',
                      border: '1px solid #f59e0b',
                      borderRadius: '0.375rem',
                      padding: '0.75rem',
                      fontSize: '0.875rem',
                      color: '#92400e',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#fef3c7')}
                    onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = 'white')}
                  >
                    <strong>{account.role}:</strong> {account.email}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <AlertCircle size={20} style={{ color: '#dc2626' }} />
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
                <Mail 
                  size={18} 
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280'
                  }} 
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan email Anda"
                  style={{
                    width: '100%',
                    padding: '0.875rem 0.875rem 0.875rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease'
                  }}
                  required
                  disabled={isLoading}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
                <Lock 
                  size={18} 
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280'
                  }} 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password Anda"
                  style={{
                    width: '100%',
                    padding: '0.875rem 3rem 0.875rem 3rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease'
                  }}
                  required
                  disabled={isLoading}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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

            {/* Submit Button */}
            <button 
              type="submit" 
              style={{
                width: '100%',
                backgroundColor: isLoading ? '#6b7280' : '#1e40af',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.875rem 1.5rem',
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
              disabled={isLoading}
              onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#1d4ed8')}
              onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#1e40af')}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
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
                    color: '#1e40af',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  Daftar di sini
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Add keyframes for loading animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;