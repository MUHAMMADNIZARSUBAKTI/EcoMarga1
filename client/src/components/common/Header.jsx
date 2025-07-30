import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ChevronDown, Menu, X, User, LogOut, Settings, BarChart3 } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Navigation links - different for user and admin
  const publicNavLinks = [
    { path: '/', label: 'Beranda', icon: '🏠' },
    { path: '/bank-sampah', label: 'Bank Sampah', icon: '🏪' },
  ];

  const userNavLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/submit', label: 'Submit', icon: '📱' },
    { path: '/history', label: 'Riwayat', icon: '📋' },
    { path: '/bank-sampah', label: 'Bank Sampah', icon: '🏪' },
  ];

  const adminNavLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/transactions', label: 'Transaksi', icon: '💳' },
    { path: '/admin/bank-sampah', label: 'Bank Sampah', icon: '🏪' },
    { path: '/admin/reports', label: 'Reports', icon: '📈' },
  ];

  // Determine which navigation to show
  const getNavLinks = () => {
    if (!isAuthenticated) return publicNavLinks;
    if (user?.role === 'admin') return adminNavLinks;
    return userNavLinks;
  };

  const navLinks = getNavLinks();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleLinkClick = (path) => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <header style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '70px'
          }}>
            
            {/* Logo - Enhanced */}
            <Link 
              to="/" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleLinkClick('/')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {/* Logo Icon with gradient background */}
              <div style={{
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.3s ease'
              }}>
                🌱
              </div>
              
              {/* Logo Text */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1
                }}>
                  EcoMarga
                </span>
                {user?.role === 'admin' && (
                  <span style={{
                    fontSize: '0.625rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: '500',
                    marginTop: '2px'
                  }}>
                    ADMIN
                  </span>
                )}
              </div>
            </Link>
            
            {/* Desktop Navigation - Enhanced */}
            <nav style={{
              display: isMobile ? 'none' : 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '0.875rem',
                    color: location.pathname === link.path ? '#10b981' : '#374151',
                    backgroundColor: location.pathname === link.path ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    border: location.pathname === link.path ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid transparent',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== link.path) {
                      e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
                      e.target.style.color = '#10b981';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.path) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#374151';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Auth Section - Enhanced */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              
              {isAuthenticated ? (
                /* User Menu - Enhanced */
                <div style={{ position: 'relative' }}>
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '12px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
                      e.target.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                    }}
                  >
                    {/* User Avatar */}
                    <div style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '10px',
                      background: user?.role === 'admin' 
                        ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
                        : 'linear-gradient(135deg, #10b981, #059669)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                    }}>
                      {user?.name?.charAt(0)?.toUpperCase() || user?.nama?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    
                    {/* User Info - Desktop Only */}
                    {!isMobile && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        textAlign: 'left'
                      }}>
                        <span style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#1f2937',
                          lineHeight: 1
                        }}>
                          {user?.name || user?.nama || 'User'}
                        </span>
                        <span style={{
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          lineHeight: 1
                        }}>
                          {user?.role === 'admin' ? 'Administrator' : 'Member'}
                        </span>
                      </div>
                    )}
                    
                    <ChevronDown 
                      size={16} 
                      style={{
                        color: '#6b7280',
                        transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }} 
                    />
                  </button>

                  {/* Enhanced Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '0.5rem',
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.1)',
                      minWidth: '240px',
                      zIndex: 1000,
                      overflow: 'hidden',
                      backdropFilter: 'blur(20px)'
                    }}>
                      
                      {/* Dropdown Header */}
                      <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
                        background: user?.role === 'admin' 
                          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(29, 78, 216, 0.05))'
                          : 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05))'
                      }}>
                        <div style={{
                          fontWeight: '600', 
                          fontSize: '0.875rem',
                          color: '#1f2937',
                          marginBottom: '0.25rem'
                        }}>
                          {user?.name || user?.nama}
                        </div>
                        <div style={{
                          fontSize: '0.75rem', 
                          color: '#6b7280'
                        }}>
                          {user?.email}
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div style={{ padding: '0.5rem 0' }}>
                        <button
                          onClick={() => handleLinkClick('/profile')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            width: '100%',
                            backgroundColor: 'transparent',
                            border: 'none',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            color: '#374151',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
                            e.target.style.color = '#10b981';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#374151';
                          }}
                        >
                          <User size={16} />
                          Profil Saya
                        </button>
                        
                        {user?.role === 'admin' && (
                          <button
                            onClick={() => handleLinkClick('/admin/settings')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '0.75rem 1rem',
                              width: '100%',
                              backgroundColor: 'transparent',
                              border: 'none',
                              textAlign: 'left',
                              cursor: 'pointer',
                              fontSize: '0.875rem',
                              color: '#374151',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
                              e.target.style.color = '#3b82f6';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = '#374151';
                            }}
                          >
                            <Settings size={16} />
                            Admin Settings
                          </button>
                        )}
                        
                        <div style={{
                          height: '1px',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          margin: '0.5rem 1rem'
                        }}></div>
                        
                        <button
                          onClick={handleLogout}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            width: '100%',
                            backgroundColor: 'transparent',
                            border: 'none',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            color: '#ef4444',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                          }}
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Auth Buttons for non-authenticated users */
                <div style={{
                  display: isMobile ? 'none' : 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <Link
                    to="/login"
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      color: '#10b981',
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    🔐 Masuk
                  </Link>
                  
                  <Link
                    to="/register"
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      color: 'white',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      border: 'none',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                    }}
                  >
                    ✨ Daftar
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMobileMenu}
                style={{
                  display: isMobile ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  color: '#374151',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
                  e.target.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Navigation */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0 0 24px 24px',
            padding: '2rem 1rem',
            margin: '0 1rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto'
          }}>
            
            {/* Mobile Navigation Links */}
            <div style={{ marginBottom: '2rem' }}>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '1rem',
                    color: location.pathname === link.path ? '#10b981' : '#374151',
                    backgroundColor: location.pathname === link.path ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    marginBottom: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Auth Section */}
            {isAuthenticated ? (
              <div style={{
                borderTop: '1px solid rgba(16, 185, 129, 0.1)',
                paddingTop: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  borderRadius: '12px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: user?.role === 'admin' 
                      ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
                      : 'linear-gradient(135deg, #10b981, #059669)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}>
                    {user?.name?.charAt(0)?.toUpperCase() || user?.nama?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1f2937' }}>
                      {user?.name || user?.nama}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {user?.role === 'admin' ? 'Administrator' : 'Member'}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleLinkClick('/profile')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    color: '#374151',
                    marginBottom: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  👤 Profil Saya
                </button>
                
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    color: '#ef4444',
                    cursor: 'pointer'
                  }}
                >
                  🚪 Logout
                </button>
              </div>
            ) : (
              <div style={{
                borderTop: '1px solid rgba(16, 185, 129, 0.1)',
                paddingTop: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <Link
                  to="/login"
                  onClick={() => handleLinkClick('/login')}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '1rem',
                    color: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    textAlign: 'center'
                  }}
                >
                  🔐 Masuk
                </Link>
                
                <Link
                  to="/register"
                  onClick={() => handleLinkClick('/register')}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    color: 'white',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    textAlign: 'center',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  ✨ Daftar Sekarang
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;