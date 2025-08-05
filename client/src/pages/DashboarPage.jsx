// DashboardPage.jsx - Fixed Version
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TrendingUp, Package, DollarSign, Leaf, Bell, Calendar, Award, Send, History, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import AdminDashboard from './AdminDashboard';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { userStats, loadUserData, isLoading } = useUser();
  const [notifications] = useState(3);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Load user data when component mounts
  useEffect(() => {
    if (user?.id) {
      loadUserData(user.id);
    }
  }, [user?.id, loadUserData]);

  // Helper Functions
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat pagi';
    if (hour < 17) return 'Selamat siang';
    return 'Selamat malam';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getUserLevel = (points = 1250) => {
    if (points >= 2000) return 'Eco Master';
    if (points >= 1000) return 'Eco Warrior';
    return 'Eco Beginner';
  };

  // Loading Component
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
      <p style={{color: '#6b7280'}}>{message}</p>
    </div>
  );

  // Show loading while checking authentication
  if (authLoading) {
    return <LoadingSpinner message="Memuat..." />;
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Show Admin Dashboard for admin users
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  // Show loading while loading user data
  if (isLoading) {
    return <LoadingSpinner message="Memuat data dashboard..." />;
  }

  // Default stats if no data loaded yet
  const stats = userStats || {
    total_earnings: 125000,
    submission_count: 8,
    total_weight: 15.5,
    environmental_impact: {
      co2_reduced: 12.5,
      trees_saved: 2,
      water_saved: 12
    }
  };

  const userPoints = user?.points || 1250;
  const userLevel = getUserLevel(userPoints);

  return (
    <div style={{ padding: '1rem' }}>
      {/* Enhanced Header with Inline Styles */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
        borderRadius: '24px',
        padding: '2.5rem',
        margin: '1rem 0 2rem 0',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(16, 185, 129, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Background Pattern */}
        <div style={{
          content: '',
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '50%',
          height: '140%',
          background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        
        {/* Header Top Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2.5rem',
          position: 'relative',
          zIndex: 3,
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          {/* Left Side - User Section */}
          <div style={{
            flex: 1,
            minWidth: '320px',
            maxWidth: '600px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              marginBottom: '1.25rem'
            }}>
              {/* User Avatar */}
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                fontWeight: 'bold',
                border: '3px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                flexShrink: 0
              }}>
                {user?.name?.charAt(0)?.toUpperCase() || user?.nama?.charAt(0)?.toUpperCase() || 'N'}
              </div>
              
              {/* User Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                  fontWeight: '700',
                  margin: '0 0 0.5rem 0',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1.2',
                  letterSpacing: '-0.025em'
                }}>
                  {getCurrentGreeting()}, {user?.name || user?.nama || 'User'}! 👋
                </h1>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '0.375rem 1rem',
                    borderRadius: '16px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Award size={16} />
                    {userLevel}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '0.375rem 1rem',
                    borderRadius: '16px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <TrendingUp size={16} />
                    {userPoints} poin
                  </div>
                </div>
              </div>
            </div>
            
            <p style={{
              margin: '0',
              opacity: '0.92',
              fontSize: '1.05rem',
              lineHeight: '1.6',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.95)'
            }}>
              Berikut ringkasan aktivitas dan pencapaian Anda di EcoMarga
            </p>
          </div>

          {/* Right Side - Quick Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 3
          }}>
            {/* Notifications */}
            <button style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '16px',
              padding: '0.875rem',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
            }}>
              <Bell size={18} />
              {notifications > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: '#ef4444',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid white',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
                }}>
                  {notifications}
                </div>
              )}
            </button>

            {/* Today's Date */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              background: 'rgba(255,255,255,0.15)',
              padding: '0.875rem 1.25rem',
              borderRadius: '16px',
              fontSize: '0.875rem',
              fontWeight: '500',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              whiteSpace: 'nowrap'
            }}>
              <Calendar size={16} />
              <span>
                {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          position: 'relative',
          zIndex: 3,
          marginBottom: '2rem'
        }}>
          {/* Total Penghasilan */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(15px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #34d399, #10b981)',
                borderRadius: '16px',
                padding: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                flexShrink: 0
              }}>
                <DollarSign size={20} />
              </div>
              <div>
                <p style={{
                  margin: '0',
                  fontSize: '0.875rem',
                  opacity: '0.9',
                  fontWeight: '500',
                  position: 'relative',
                  zIndex: 2
                }}>
                  Total Penghasilan
                </p>
              </div>
            </div>
            <p style={{
              margin: '0',
              fontSize: '1.875rem',
              fontWeight: '800',
              lineHeight: '1',
              position: 'relative',
              zIndex: 2,
              letterSpacing: '-0.025em'
            }}>
              {formatCurrency(stats.total_earnings)}
            </p>
          </div>

          {/* Total Submission */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(15px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                borderRadius: '16px',
                padding: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                flexShrink: 0
              }}>
                <Package size={20} />
              </div>
              <div>
                <p style={{
                  margin: '0',
                  fontSize: '0.875rem',
                  opacity: '0.9',
                  fontWeight: '500',
                  position: 'relative',
                  zIndex: 2
                }}>
                  Total Submission
                </p>
              </div>
            </div>
            <p style={{
              margin: '0',
              fontSize: '1.875rem',
              fontWeight: '800',
              lineHeight: '1',
              position: 'relative',
              zIndex: 2,
              letterSpacing: '-0.025em'
            }}>
              {stats.submission_count}
            </p>
          </div>

          {/* Total Berat Sampah */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(15px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                borderRadius: '16px',
                padding: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                flexShrink: 0
              }}>
                <TrendingUp size={20} />
              </div>
              <div>
                <p style={{
                  margin: '0',
                  fontSize: '0.875rem',
                  opacity: '0.9',
                  fontWeight: '500',
                  position: 'relative',
                  zIndex: 2
                }}>
                  Total Berat Sampah
                </p>
              </div>
            </div>
            <p style={{
              margin: '0',
              fontSize: '1.875rem',
              fontWeight: '800',
              lineHeight: '1',
              position: 'relative',
              zIndex: 2,
              letterSpacing: '-0.025em'
            }}>
              {stats.total_weight} kg
            </p>
          </div>

          {/* CO2 Dikurangi */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(15px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #34d399, #10b981)',
                borderRadius: '16px',
                padding: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                flexShrink: 0
              }}>
                <Leaf size={20} />
              </div>
              <div>
                <p style={{
                  margin: '0',
                  fontSize: '0.875rem',
                  opacity: '0.9',
                  fontWeight: '500',
                  position: 'relative',
                  zIndex: 2
                }}>
                  CO2 Dikurangi
                </p>
              </div>
            </div>
            <p style={{
              margin: '0',
              fontSize: '1.875rem',
              fontWeight: '800',
              lineHeight: '1',
              position: 'relative',
              zIndex: 2,
              letterSpacing: '-0.025em'
            }}>
              {stats.environmental_impact?.co2_reduced || 12.5} kg
            </p>
          </div>
        </div>

        {/* Environmental Impact Section */}
        <div style={{
          marginTop: '2.5rem',
          padding: '2rem',
          background: 'rgba(255,255,255,0.12)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(15px)',
          position: 'relative',
          zIndex: 3
        }}>
          <h3 style={{
            margin: '0 0 1.5rem 0',
            fontSize: '1.375rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            🌍 Dampak Lingkungan Anda
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '2.25rem',
                fontWeight: '800',
                marginBottom: '0.5rem',
                letterSpacing: '-0.025em'
              }}>
                {stats.environmental_impact?.co2_reduced || 12.5} kg
              </div>
              <div style={{
                fontSize: '0.875rem',
                opacity: '0.9',
                fontWeight: '500'
              }}>
                🌱 CO2 yang berhasil dikurangi
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '2.25rem',
                fontWeight: '800',
                marginBottom: '0.5rem',
                letterSpacing: '-0.025em'
              }}>
                {stats.environmental_impact?.trees_saved || 2}
              </div>
              <div style={{
                fontSize: '0.875rem',
                opacity: '0.9',
                fontWeight: '500'
              }}>
                🌳 Setara dengan menanam pohon
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '2.25rem',
                fontWeight: '800',
                marginBottom: '0.5rem',
                letterSpacing: '-0.025em'
              }}>
                {stats.environmental_impact?.water_saved || 12} L
              </div>
              <div style={{
                fontSize: '0.875rem',
                opacity: '0.9',
                fontWeight: '500'
              }}>
                💧 Air yang dihemat
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <Link 
          to="/submit" 
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            textDecoration: 'none',
            display: 'block',
            padding: '2rem',
            borderRadius: '20px',
            color: 'white',
            border: 'none',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <Send size={32} />
            <div>
              <h3 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.375rem',
                fontWeight: '700',
                color: 'inherit'
              }}>
                Submit Sampah
              </h3>
              <p style={{
                margin: '0',
                opacity: '0.9',
                fontSize: '0.875rem'
              }}>
                Kirim sampah Anda dan dapatkan poin reward
              </p>
            </div>
          </div>
        </Link>

        <Link 
          to="/history" 
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            textDecoration: 'none',
            display: 'block',
            padding: '2rem',
            borderRadius: '20px',
            color: 'white',
            border: 'none',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <History size={32} />
            <div>
              <h3 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.375rem',
                fontWeight: '700',
                color: 'inherit'
              }}>
                Riwayat
              </h3>
              <p style={{
                margin: '0',
                opacity: '0.9',
                fontSize: '0.875rem'
              }}>
                Lihat riwayat submission dan transaksi
              </p>
            </div>
          </div>
        </Link>

                <Link 
                  to="/bank-sampah" 
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    textDecoration: 'none',
                    display: 'block',
                    padding: '2rem',
                  }}
                >
                  {/* ...rest of your Link content... */}
                </Link>
              </div>
            </div>
          );
        };
        
        export default DashboardPage;