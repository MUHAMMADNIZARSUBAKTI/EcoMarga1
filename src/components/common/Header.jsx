import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation links
  const navLinks = [
    { path: '/', label: 'Beranda', icon: '🏠' },
    { path: '/bank-sampah', label: 'Bank Sampah', icon: '🏪' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/submit', label: 'Submit', icon: '📱' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-icon">🌱</span>
            <span className="logo-text">EcoMarga</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-links">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    <span className="nav-icon">{link.icon}</span>
                    <span className="nav-label">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Auth Buttons */}
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-outline">
              🔐 Masuk
            </Link>
            <Link to="/register" className="btn btn-primary">
              ✨ Daftar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger">☰</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="nav-mobile">
            <ul className="mobile-nav-links">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="nav-icon">{link.icon}</span>
                    <span className="nav-label">{link.label}</span>
                  </Link>
                </li>
              ))}
              
              {/* Mobile Auth Links */}
              <li className="mobile-auth-divider"></li>
              <li>
                <Link 
                  to="/login" 
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🔐 Masuk
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="mobile-nav-link primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ✨ Daftar
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        .header {
          background: var(--card-background, #ffffff);
          box-shadow: var(--shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: bold;
          color: var(--primary-color, #10b981);
          text-decoration: none;
          transition: transform 0.2s ease;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          font-size: 1.5rem;
        }

        .nav-desktop {
          display: flex;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-color, #1f2937);
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: var(--primary-color, #10b981);
          background-color: var(--secondary-color, #f3f4f6);
        }

        .nav-link.active {
          color: var(--primary-color, #10b981);
          background-color: var(--secondary-color, #f3f4f6);
        }

        .nav-icon {
          font-size: 1rem;
        }

        .auth-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .btn-primary {
          background-color: var(--primary-color, #10b981);
          color: white;
        }

        .btn-primary:hover {
          background-color: var(--primary-dark, #059669);
          transform: translateY(-1px);
        }

        .btn-outline {
          background-color: transparent;
          color: var(--primary-color, #10b981);
          border: 2px solid var(--primary-color, #10b981);
        }

        .btn-outline:hover {
          background-color: var(--primary-color, #10b981);
          color: white;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          color: var(--text-color, #1f2937);
        }

        .nav-mobile {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--card-background, #ffffff);
          box-shadow: var(--shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
          border-top: 1px solid var(--border-color, #e5e7eb);
        }

        .mobile-nav-links {
          list-style: none;
          margin: 0;
          padding: 1rem 0;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-color, #1f2937);
          text-decoration: none;
          font-weight: 500;
          padding: 1rem 1.5rem;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: var(--primary-color, #10b981);
          background-color: var(--secondary-color, #f3f4f6);
        }

        .mobile-nav-link.primary {
          color: var(--primary-color, #10b981);
          font-weight: 600;
        }

        .mobile-auth-divider {
          border-top: 1px solid var(--border-color, #e5e7eb);
          margin: 0.5rem 0;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .nav-desktop {
            display: none;
          }

          .auth-buttons {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .nav-mobile {
            display: block;
          }

          .btn {
            padding: 0.625rem 1rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .logo {
            font-size: 1.1rem;
          }

          .logo-text {
            display: none;
          }

          .container {
            padding: 0 0.5rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;