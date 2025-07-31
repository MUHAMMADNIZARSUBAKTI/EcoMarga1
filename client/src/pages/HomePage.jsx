import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Smartphone,
  Truck,
  CreditCard,
  Leaf,
  BarChart3,
  Trophy,
  ClipboardList,
  Scale,
  DollarSign,
  Menu,
  X,
  ArrowRight,
  Star,
  Users,
  Recycle,
  TreePine,
} from 'lucide-react';

// Jika Anda memiliki komponen Button terpisah, pastikan path-nya benar
// import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';

const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- Data untuk Konten Halaman ---

  const stats = [
    {
      number: 5000,
      label: 'Pengguna Aktif',
      prefix: '',
      suffix: '',
      icon: '👥',
    },
    {
      number: 150,
      label: 'Bank Sampah Mitra',
      prefix: '',
      suffix: '',
      icon: '🏪',
    },
    {
      number: 2500,
      label: 'Sampah Terkumpul (Ton)',
      prefix: '',
      suffix: '',
      icon: '♻️',
    },
    {
      number: 1200000,
      label: 'Total Pendapatan Pengguna',
      prefix: 'Rp ',
      suffix: '+',
      icon: '💰',
    },
  ];

  const features = [
    {
      icon: Smartphone,
      title: 'Mudah Digunakan',
      description: 'Interface yang intuitif membuat siapa saja bisa langsung menggunakan aplikasi tanpa perlu tutorial panjang.',
    },
    {
      icon: Truck,
      title: 'Jemput Langsung',
      description: 'Tim kami akan menjemput sampah langsung ke rumah Anda sesuai jadwal yang telah disepakati.',
    },
    {
      icon: CreditCard,
      title: 'Pembayaran Instan',
      description: 'Terima pembayaran langsung ke e-wallet atau rekening bank setelah sampah berhasil diverifikasi.',
    },
    {
      icon: Leaf,
      title: 'Ramah Lingkungan',
      description: 'Berkontribusi langsung untuk kelestarian lingkungan dengan mengurangi limbah dan meningkatkan daur ulang.',
    },
  ];

  const howItWorksSteps = [ // Mengganti nama 'steps' menjadi 'howItWorksSteps' agar lebih deskriptif
    {
      number: 1,
      icon: ClipboardList,
      title: 'Submit Sampah',
      description: 'Foto dan kategorikan sampah yang ingin Anda jual melalui aplikasi.',
    },
    {
      number: 2,
      icon: Scale,
      title: 'Verifikasi & Timbang',
      description: 'Tim kami akan memverifikasi dan menimbang sampah sesuai kategori.',
    },
    {
      number: 3,
      icon: DollarSign,
      title: 'Terima Pembayaran',
      description: 'Dapatkan pembayaran langsung ke e-wallet atau rekening bank Anda.',
    },
  ];

  // --- Efek Samping (useEffect) ---

  // Efek untuk menangani perubahan scroll (Header)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efek untuk animasi counter statistik
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.stat-number');
          counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                const prefix = counter.dataset.prefix || '';
                const suffix = counter.dataset.suffix || '';
                counter.textContent = prefix + target.toLocaleString() + suffix;
                clearInterval(timer);
              } else {
                const prefix = counter.dataset.prefix || '';
                const suffix = counter.dataset.suffix || '';
                counter.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
              }
            }, 30);
          });
          observer.unobserve(entry.target); // Hentikan observasi setelah animasi
        }
      });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect(); // Membersihkan observer saat komponen unmount
  }, []);

  // --- Penangan Event (Event Handlers) ---

  const handleGetStarted = () => {
    navigate(ROUTES.REGISTER);
  };

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Tutup menu jika dibuka
  };

  // --- Objek Styling (untuk kerapian) ---
  // Sebaiknya dipindahkan ke file CSS terpisah atau menggunakan library styling

  const styles = {
    pageContainer: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: '1.6',
    },
    header: {
      position: 'fixed',
      top: 0,
      width: '100%',
      background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(229, 231, 235, 0.3)',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 3rem',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      cursor: 'pointer',
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#10b981',
    },
    logoIcon: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      borderRadius: '12px',
      padding: '8px',
      color: 'white',
    },
    navbarNav: {
      display: 'flex',
      gap: '3rem',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      alignItems: 'center',
    },
    navLink: {
      color: '#4b5563',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
      fontSize: '1rem',
      textDecoration: 'none',
    },
    authButtonsContainer: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
    },
    loginButton: {
      background: 'transparent',
      color: '#4b5563',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      padding: '12px 24px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    registerButton: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 32px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
    },
    heroSection: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 30%, #dcfce7 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 3rem',
      position: 'relative',
      overflow: 'hidden',
      marginTop: '80px', // Sesuaikan dengan tinggi header
    },
    heroContentGrid: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr',
      gap: '6rem',
      alignItems: 'center',
      position: 'relative',
      zIndex: 2,
      width: '100%',
    },
    badge: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
      border: '1px solid #10b981',
      borderRadius: '50px',
      padding: '8px 20px',
      marginBottom: '2rem',
      fontSize: '0.95rem',
      color: '#065f46',
      fontWeight: '600',
    },
    heroTitle: {
      fontSize: '4.5rem',
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '2rem',
      background: 'linear-gradient(135deg, #065f46, #10b981)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    heroSubtitle: {
      fontSize: '1.4rem',
      color: '#6b7280',
      marginBottom: '3rem',
      lineHeight: '1.7',
      maxWidth: '600px',
    },
    heroCtaButtons: {
      display: 'flex',
      gap: '1.5rem',
      marginBottom: '3rem',
    },
    primaryCtaButton: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      border: 'none',
      borderRadius: '16px',
      padding: '18px 36px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    secondaryCtaButton: {
      background: 'rgba(255, 255, 255, 0.9)',
      color: '#10b981',
      border: '2px solid #10b981',
      borderRadius: '16px',
      padding: '18px 36px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
    },
    trustIndicators: {
      display: 'flex',
      alignItems: 'center',
      gap: '3rem',
      fontSize: '1rem',
      color: '#6b7280',
    },
    trustIndicatorItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    heroVisualCard: {
      background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
      borderRadius: '2rem',
      padding: '3rem',
      boxShadow: '0 25px 50px rgba(16, 185, 129, 0.15)',
      transform: 'rotate(-5deg)',
      animation: 'float 6s ease-in-out infinite',
      border: '1px solid rgba(16, 185, 129, 0.1)',
      maxWidth: '400px',
    },
    heroVisualIcon: {
      width: '5rem',
      height: '5rem',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      borderRadius: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      color: 'white',
      fontSize: '2rem',
      boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
    },
    statsSection: {
      padding: '8rem 3rem',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: '3.5rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: '#1f2937', // Default for white background sections
    },
    statsSectionTitle: {
      fontSize: '3.5rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    sectionSubtitle: {
      fontSize: '1.3rem',
      color: '#6b7280', // Default for white background sections
      maxWidth: '700px',
      margin: '0 auto',
    },
    statsSectionSubtitle: {
      fontSize: '1.3rem',
      opacity: 0.9,
      maxWidth: '700px',
      margin: '0 auto',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '3rem',
      marginBottom: '4rem',
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '2rem',
      padding: '3rem 2rem',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    statIcon: {
      fontSize: '4rem',
      marginBottom: '1.5rem',
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: '800',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    featureSection: {
      padding: '8rem 3rem',
      background: 'white',
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '3rem',
    },
    featureCard: {
      textAlign: 'center',
      position: 'relative',
    },
    featureIconContainer: {
      width: '5rem',
      height: '5rem',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      borderRadius: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 2rem',
      color: 'white',
      position: 'relative',
      boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
    },
    featureTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#1f2937',
    },
    featureDescription: {
      color: '#6b7280',
      lineHeight: '1.6',
      fontSize: '1rem',
    },
    howItWorksSection: {
      padding: '8rem 3rem',
      background: '#f8fafc',
    },
    howItWorksGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '3rem',
      marginTop: '5rem',
    },
    stepCard: {
      textAlign: 'center',
      position: 'relative',
      padding: '2.5rem',
      background: 'white',
      borderRadius: '2rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      border: '1px solid #e2e8f0',
    },
    stepNumberBadge: {
      position: 'absolute',
      top: '-1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '3.5rem',
      height: '3.5rem',
      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '700',
      fontSize: '1.25rem',
      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
      border: '3px solid white',
    },
    stepIconContainer: {
      width: '4.5rem',
      height: '4.5rem',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      borderRadius: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '2rem auto 2rem', // Adjusted margin
      color: 'white',
      boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
    },
    stepTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '1rem',
      color: '#1f2937',
    },
    stepDescription: {
      color: '#6b7280',
      lineHeight: '1.6',
      fontSize: '1.1rem',
    },
    connectorLine: {
      position: 'absolute',
      top: '50%',
      left: 'calc(100% + 1.5rem)', // Posisi di antara kartu
      width: '3rem', // Panjang garis penghubung
      height: '2px',
      background: '#d1fae5',
      zIndex: 0,
    },
    aboutSection: {
      padding: '8rem 3rem',
      background: 'white',
    },
    aboutGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '6rem',
      alignItems: 'center',
    },
    aboutSubtitle: {
      fontSize: '1.2rem',
      color: '#6b7280',
      lineHeight: '1.7',
      marginBottom: '2rem',
    },
    aboutBulletPoints: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    bulletPointItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '1.1rem',
      fontWeight: '500',
      color: '#1f2937',
    },
    environmentalImpactCard: {
      background: 'linear-gradient(145deg, #ecfdf5, #f0fdf4)',
      borderRadius: '2rem',
      padding: '3rem',
      border: '1px solid #10b981',
      textAlign: 'center',
    },
    impactTitle: {
      fontSize: '2rem',
      fontWeight: '600',
      marginBottom: '2rem',
      color: '#065f46',
    },
    impactGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
    },
    impactMetric: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#10b981',
      marginBottom: '0.5rem',
    },
    impactLabel: {
      color: '#065f46',
      fontSize: '0.9rem',
    },
    ctaSection: {
      padding: '8rem 3rem',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      textAlign: 'center',
    },
    footer: {
      background: '#1f2937',
      color: '#d1d5db',
      padding: '4rem 3rem',
      fontSize: '0.9rem',
    },
    footerGrid: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
      gap: '3rem',
      alignItems: 'flex-start',
    },
    footerLogo: {
      fontSize: '1.75rem',
      fontWeight: '700',
      color: '#10b981',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    footerText: {
      lineHeight: '1.7',
      marginBottom: '1.5rem',
    },
    socialIcons: {
      display: 'flex',
      gap: '1rem',
    },
    socialIcon: {
      color: '#9ca3af',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
    },
    footerHeading: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '1.5rem',
    },
    footerList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    footerListItem: {
      marginBottom: '0.75rem',
    },
    footerLink: {
      color: '#9ca3af',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
    },
    copyright: {
      textAlign: 'center',
      marginTop: '4rem',
      borderTop: '1px solid #374151',
      paddingTop: '2rem',
      color: '#6b7280',
    },
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <header style={styles.header}>
        <nav style={styles.navbar}>
          <div style={styles.logoContainer} onClick={() => navigate(ROUTES.HOME)}>
            <div style={styles.logoIcon}>♻️</div>
            EcoMarga
          </div>

          <ul style={styles.navbarNav}>
            <li>
              <a
                onClick={() => scrollToSection('fitur')}
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = '#10b981')}
                onMouseLeave={(e) => (e.target.style.color = '#4b5563')}
              >
                Fitur
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection('cara-kerja')}
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = '#10b981')}
                onMouseLeave={(e) => (e.target.style.color = '#4b5563')}
              >
                Cara Kerja
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection('tentang')}
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = '#10b981')}
                onMouseLeave={(e) => (e.target.style.color = '#4b5563')}
              >
                Tentang
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection('kontak')}
                style={styles.navLink}
                onMouseEnter={(e) => (e.target.style.color = '#10b981')}
                onMouseLeave={(e) => (e.target.style.color = '#4b5563')}
              >
                Kontak
              </a>
            </li>
          </ul>

          <div style={styles.authButtonsContainer}>
            <button
              onClick={handleLogin}
              style={styles.loginButton}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#10b981';
                e.target.style.color = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.color = '#4b5563';
              }}
            >
              Masuk
            </button>
            <button
              onClick={handleGetStarted}
              style={styles.registerButton}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
              }}
            >
              Daftar
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        {/* Background Decorations */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '30%',
            height: '120%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
            transform: 'rotate(15deg)',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '25%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
            transform: 'rotate(-20deg)',
          }}
        ></div>

        <div style={styles.heroContentGrid}>
          <div>
            {/* Badge */}
            <div style={styles.badge}>🌱 Platform #1 untuk Pengelolaan Sampah Berkelanjutan</div>

            <h1 style={styles.heroTitle}>Kelola Sampah Jadi Rupiah dengan EcoMarga</h1>

            <p style={styles.heroSubtitle}>
              Platform digital terpercaya untuk mengubah sampah rumah tangga menjadi sumber penghasilan. Bergabunglah dengan
              ribuan pengguna yang sudah merasakan manfaatnya.
            </p>

            <div style={styles.heroCtaButtons}>
              <button
                onClick={handleGetStarted}
                style={styles.primaryCtaButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
                }}
              >
                Mulai Sekarang
                <ArrowRight size={20} />
              </button>

              <button
                onClick={() => scrollToSection('cara-kerja')}
                style={styles.secondaryCtaButton}
                onMouseEnter={(e) => {
                  e.target.style.background = '#10b981';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.color = '#10b981';
                }}
              >
                📖 Pelajari Lebih Lanjut
              </button>
            </div>

            {/* Trust Indicators */}
            <div style={styles.trustIndicators}>
              <div style={styles.trustIndicatorItem}>
                <div style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</div>
                <span>100% Aman & Terpercaya</span>
              </div>
              <div style={styles.trustIndicatorItem}>
                <div style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</div>
                <span>Pembayaran Instan</span>
              </div>
              <div style={styles.trustIndicatorItem}>
                <div style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</div>
                <span>Ramah Lingkungan</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={styles.heroVisualCard}>
              <div style={{ textAlign: 'center', transform: 'rotate(5deg)' }}>
                <div style={styles.heroVisualIcon}>💰</div>
                <h3
                  style={{
                    color: '#1f2937',
                    fontWeight: '700',
                    fontSize: '2rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  Rp 1.2M+
                </h3>
                <p
                  style={{
                    color: '#6b7280',
                    margin: '0 0 1.5rem 0',
                    fontSize: '1.1rem',
                  }}
                >
                  Total pendapatan pengguna bulan ini
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    color: '#10b981',
                    fontWeight: '600',
                  }}
                >
                  <span>📈 +25% dari bulan lalu</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keyframes for float animation, ideally in a CSS file */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: rotate(-5deg) translateY(0px); }
            50% { transform: rotate(-5deg) translateY(-25px); }
          }
        `}</style>
      </section>

      {/* Stats Section */}
      <section className="stats-section" style={styles.statsSection}>
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={styles.statsSectionTitle}>🚀 Pencapaian Platform EcoMarga</h2>
            <p style={styles.statsSectionSubtitle}>
              Bersama menciptakan dampak positif untuk lingkungan dan ekonomi berkelanjutan
            </p>
          </div>

          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={styles.statCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={styles.statIcon}>{stat.icon}</div>
                <h3
                  className="stat-number"
                  data-target={stat.number}
                  data-prefix={stat.prefix}
                  data-suffix={stat.suffix}
                  style={styles.statNumber}
                >
                  {stat.prefix || ''}0{stat.suffix || ''}
                </h3>
                <p style={{ ...styles.featureDescription, opacity: 0.9, fontWeight: '500', color: 'white' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" style={styles.featureSection}>
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={styles.sectionTitle}>Kenapa Memilih EcoMarga?</h2>
            <p style={styles.sectionSubtitle}>
              Solusi lengkap untuk mengelola sampah rumah tangga dengan mudah, menguntungkan, dan ramah lingkungan.
            </p>
          </div>
          <div style={styles.featureGrid}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon; // Menggunakan feature.icon
              return (
                <div key={index} style={styles.featureCard}>
                  <div style={styles.featureIconContainer}>
                    <IconComponent size={32} />
                  </div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="cara-kerja" style={styles.howItWorksSection}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={styles.sectionTitle}>Bagaimana EcoMarga Bekerja?</h2>
            <p style={styles.sectionSubtitle}>
              Proses mudah dan transparan untuk mengubah sampah Anda menjadi nilai ekonomi.
            </p>
          </div>
          <div style={styles.howItWorksGrid}>
            {howItWorksSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  style={styles.stepCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                  }}
                >
                  <div style={styles.stepNumberBadge}>{step.number}</div>
                  <div style={styles.stepIconContainer}>
                    <IconComponent size={32} />
                  </div>
                  <h3 style={styles.stepTitle}>{step.title}</h3>
                  <p style={styles.stepDescription}>{step.description}</p>
                  {/* Connector Line, only for steps before the last one */}
                  {index < howItWorksSteps.length - 1 && (
                    <div
                      style={{
                        ...styles.connectorLine,
                        // Media query for desktop, adjust based on your grid-gap
                        '@media (min-width: 768px)': {
                          width: 'calc(100% + 6rem)', // Example, adjust based on gap
                        },
                      }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" style={styles.aboutSection}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={styles.aboutGrid}>
            <div>
              <h2 style={styles.sectionTitle}>Tentang EcoMarga</h2>
              <p style={styles.aboutSubtitle}>
                EcoMarga adalah platform digital inovatif yang menghubungkan masyarakat dengan sistem pengelolaan sampah
                berkelanjutan. Kami percaya bahwa setiap sampah memiliki nilai dan dapat memberikan manfaat ekonomi sambil
                menjaga kelestarian lingkungan.
              </p>
              <p style={{ ...styles.aboutSubtitle, marginBottom: '3rem' }}>
                Dengan teknologi terdepan dan jaringan bank sampah terpercaya, kami memudahkan Anda untuk mengubah sampah
                rumah tangga menjadi penghasilan tambahan yang konsisten.
              </p>
              <div style={styles.aboutBulletPoints}>
                <div style={styles.bulletPointItem}>
                  <BarChart3 size={24} style={{ color: '#10b981' }} />
                  <span>Transparansi Harga Real-time</span>
                </div>
                <div style={styles.bulletPointItem}>
                  <Trophy size={24} style={{ color: '#10b981' }} />
                  <span>Sistem Reward Terpercaya</span>
                </div>
                <div style={styles.bulletPointItem}>
                  <Recycle size={24} style={{ color: '#10b981' }} /> {/* Changed Leaf to Recycle for direct relevance */}
                  <span>Dampak Lingkungan Terukur</span>
                </div>
              </div>
            </div>
            <div style={styles.environmentalImpactCard}>
              <h3 style={styles.impactTitle}>🌍 Dampak Lingkungan</h3>
              <div style={styles.impactGrid}>
                <div style={{ textAlign: 'center' }}>
                  <div style={styles.impactMetric}>5.2 Ton</div>
                  <span style={styles.impactLabel}>CO₂ Berkurang</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={styles.impactMetric}>52 Pohon</div>
                  <span style={styles.impactLabel}>Setara Pohon</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={styles.impactMetric}>125k L</div>
                  <span style={styles.impactLabel}>Air Dihemat</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={styles.impactMetric}>85 kWh</div>
                  <span style={styles.impactLabel}>Energi Dihemat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={styles.ctaSection}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ ...styles.sectionTitle, color: 'white' }}>Mulai Perjalanan Eco Anda Hari Ini!</h2>
          <p style={{ ...styles.sectionSubtitle, color: 'white', opacity: 0.9, marginBottom: '3rem' }}>
            Transformasikan sampah Anda menjadi aset berharga dan berkontribusi untuk planet yang lebih hijau.
          </p>
          <button
            onClick={handleGetStarted}
            style={{
              ...styles.primaryCtaButton, // Reusing primary CTA button style
              padding: '18px 48px',
              fontSize: '1.25rem',
              borderRadius: '20px',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 18px 40px rgba(16, 185, 129, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
            }}
          >
            Gabung EcoMarga Sekarang!
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <div style={styles.footerLogo}>
              <div style={styles.logoIcon}>♻️</div>
              EcoMarga
            </div>
            <p style={styles.footerText}>
              Platform terdepan untuk pengelolaan sampah yang bertanggung jawab dan menguntungkan.
            </p>
            <p style={styles.footerText}>Kontak: info@ecomarga.com</p>
            <div style={styles.socialIcons}>
              {/* Anda bisa menambahkan link ke media sosial di sini */}
              <a href="#" style={styles.socialIcon} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                <Users size={20} /> {/* Example icon, replace with actual social media icons */}
              </a>
              <a href="#" style={styles.socialIcon} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                <Recycle size={20} />
              </a>
              <a href="#" style={styles.socialIcon} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                <TreePine size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 style={styles.footerHeading}>Produk</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                  Aplikasi Mobile
                </a>
              </li>
              <li style={styles.footerListItem}>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                  Bank Sampah Mitra
                </a>
              </li>
              <li style={styles.footerListItem}>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                  Daur Ulang Korporat
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={styles.footerHeading}>Perusahaan</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                  Tentang Kami
                </a>
              </li>
              <li style={styles.footerListItem}>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                  Karir
                </a>
              </li>
              <li style={styles.footerListItem}>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                  Berita
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={styles.footerHeading}>Dukungan</h4>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                  FAQ
                </a>
              </li>
              <li style={styles.footerListItem}>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                  Kebijakan Privasi
                </a>
              </li>
              <li style={styles.footerListItem}>
                <a href="#" style={styles.footerLink} onMouseEnter={(e) => e.target.style.color = '#ffffff'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div style={styles.copyright}>
          &copy; {new Date().getFullYear()} EcoMarga. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;