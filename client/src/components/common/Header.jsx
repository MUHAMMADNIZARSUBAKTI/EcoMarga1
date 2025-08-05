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
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.header') && !event.target.closest('.mobile-menu-overlay')) {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Navigation links configuration
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

  // Get appropriate navigation links
  const getNavLinks = () => {
    if (!isAuthenticated) return publicNavLinks;
    if (user?.role === 'admin') return adminNavLinks;
    return userNavLinks;
  };

  const navLinks = getNavLinks();

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsUserMenuOpen(false);
  };

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const handleLinkClick = (path) => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-container">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="logo"
            onClick={() => handleLinkClick('/')}
          >
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}>
              ♻️
            </div>
            <span style={{
              background: 'linear-gradient(135deg, #065f46, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              EcoMarga
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="nav-links">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => handleLinkClick(link.path)}
                >
                  <span style={{ marginRight: '0.5rem' }}>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Auth Section */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {isAuthenticated ? (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={toggleUserMenu}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      background: 'transparent',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      color: '#374151',
                      fontWeight: '500'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span>{user?.name || 'User'}</span>
                    <ChevronDown 
                      size={16} 
                      style={{ 
                        transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }} 
                    />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '0.5rem',
                      background: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.1)',
                      minWidth: '200px',
                      overflow: 'hidden',
                      zIndex: 1000
                    }}>
                      <div style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{user?.name}</div>
                        <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{user?.email}</div>
                      </div>
                      
                      <div style={{ padding: '0.5rem' }}>
                        <Link
                          to="/profile"
                          onClick={() => handleLinkClick('/profile')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: '#374151',
                            transition: 'all 0.3s ease',
                            fontSize: '0.875rem'
                          }}
                          onMouseEnter={(e) => e.target.style.background = '#f9fafb'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                          <User size={16} />
                          <span>Profile</span>
                        </Link>
                        
                        <Link
                          to="/settings"
                          onClick={() => handleLinkClick('/settings')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            color: '#374151',
                            transition: 'all 0.3s ease',
                            fontSize: '0.875rem'
                          }}
                          onMouseEnter={(e) => e.target.style.background = '#f9fafb'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                          <Settings size={16} />
                          <span>Pengaturan</span>
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            background: 'transparent',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '0.875rem',
                            width: '100%',
                            textAlign: 'left'
                          }}
                          onMouseEnter={(e) => e.target.style.background = '#fef2f2'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                          <LogOut size={16} />
                          <span>Keluar</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Link
                    to="/login"
                    className="btn btn-secondary"
                  >
                    🔐 Masuk
                  </Link>
                  
                  <Link
                    to="/register"
                    className="btn btn-primary"
                  >
                    ✨ Daftar
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button 
              onClick={toggleMobileMenu}
              className="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && isMobile && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu">
            
            {/* Mobile Navigation Links */}
            <div style={{ marginBottom: '2rem' }}>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Auth Section */}
            {isAuthenticated ? (
              <div>
                {/* User Info */}
                <div style={{
                  padding: '1rem',
                  background: 'rgba(16, 185, 129, 0.05)',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  border: '1px solid rgba(16, 185, 129, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}>
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '1rem' }}>{user?.name}</div>
                      <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{user?.email}</div>
                    </div>
                  </div>
                </div>

                {/* User Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link
                    to="/profile"
                    onClick={() => handleLinkClick('/profile')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: '#374151',
                      background: 'transparent',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s ease',
                      fontWeight: '500'
                    }}
                  >
                    <User size={20} />
                    <span>Profile</span>
                  </Link>
                  
                  <Link
                    to="/settings"
                    onClick={() => handleLinkClick('/settings')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: '#374151',
                      background: 'transparent',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.3s ease',
                      fontWeight: '500'
                    }}
                  >
                    <Settings size={20} />
                    <span>Pengaturan</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      borderRadius: '12px',
                      background: 'transparent',
                      border: '1px solid #fecaca',
                      color: '#ef4444',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontWeight: '500',
                      width: '100%'
                    }}
                  >
                    <LogOut size={20} />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link
                  to="/login"
                  onClick={() => handleLinkClick('/login')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    color: '#10b981',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  🔐 Masuk
                </Link>
                
                <Link
                  to="/register"
                  onClick={() => handleLinkClick('/register')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    color: 'white',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ✨ Daftar
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