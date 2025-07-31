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
  X
} from 'lucide-react';
import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';

const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Counter animation for stats
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
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
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current).toLocaleString();
              }
            }, 30);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

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
    setIsMenuOpen(false);
  };

  const features = [
    {
      icon: Smartphone,
      title: 'Mudah Digunakan',
      description: 'Interface yang intuitif membuat siapa saja bisa langsung menggunakan aplikasi tanpa perlu tutorial panjang.'
    },
    {
      icon: Truck,
      title: 'Jemput Langsung',
      description: 'Tim kami akan menjemput sampah langsung ke rumah Anda sesuai jadwal yang telah disepakati.'
    },
    {
      icon: CreditCard,
      title: 'Pembayaran Instan',
      description: 'Terima pembayaran langsung ke e-wallet atau rekening bank setelah sampah berhasil diverifikasi.'
    },
    {
      icon: Leaf,
      title: 'Ramah Lingkungan',
      description: 'Kontribusi nyata untuk lingkungan dengan memastikan sampah didaur ulang dengan benar.'
    },
    {
      icon: BarChart3,
      title: 'Tracking Real-time',
      description: 'Pantau status pengajuan sampah dan riwayat transaksi secara real-time melalui dashboard.'
    },
    {
      icon: Trophy,
      title: 'Reward System',
      description: 'Dapatkan poin bonus dan reward menarik untuk setiap kontribusi yang Anda berikan.'
    }
  ];

  const steps = [
    {
      number: 1,
      icon: ClipboardList,
      title: 'Daftarkan Sampah',
      description: 'Pilih jenis sampah, masukkan berat estimasi, dan jadwalkan penjemputan melalui aplikasi.'
    },
    {
      number: 2,
      icon: Truck,
      title: 'Penjemputan',
      description: 'Tim EcoMarga akan datang sesuai jadwal untuk mengambil dan menimbang sampah Anda.'
    },
    {
      number: 3,
      icon: Scale,
      title: 'Verifikasi & Hitung',
      description: 'Sampah akan diverifikasi dan dihitung nilainya berdasarkan berat dan jenis sampah.'
    },
    {
      number: 4,
      icon: DollarSign,
      title: 'Terima Pembayaran',
      description: 'Uang langsung masuk ke akun Anda dalam hitungan menit setelah verifikasi selesai.'
    }
  ];

  const stats = [
    { number: 5000, label: 'Pengguna Aktif', suffix: '+' },
    { number: 150, label: 'Bank Sampah Mitra', suffix: '+' },
    { number: 50, label: 'Sampah Terkumpul', suffix: ' Ton' },
    { number: 2500000, label: 'Total Transaksi', prefix: 'Rp ' }
  ];

  return (
    <div className="home-page">
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="nav">
          <div className="logo" onClick={() => navigate(ROUTES.HOME)}>
            ♻️ EcoMarga
          </div>
          
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li><a onClick={() => scrollToSection('fitur')}>Fitur</a></li>
            <li><a onClick={() => scrollToSection('cara-kerja')}>Cara Kerja</a></li>
            <li><a onClick={() => scrollToSection('tentang')}>Tentang</a></li>
            <li><a onClick={() => scrollToSection('kontak')}>Kontak</a></li>
          </ul>
          
          <div className="nav-buttons">
            <Button variant="outline" onClick={handleLogin}>
              Masuk
            </Button>
            <Button variant="primary" onClick={handleGetStarted}>
              Daftar
            </Button>
          </div>
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Kelola Sampah Jadi Rupiah dengan EcoMarga</h1>
            <p>
              Platform digital terpercaya untuk mengubah sampah rumah tangga menjadi sumber penghasilan. 
              Bergabunglah dengan ribuan pengguna yang sudah merasakan manfaatnya.
            </p>
            <div className="hero-buttons">
              <Button variant="primary" size="lg" onClick={handleGetStarted}>
                Mulai Sekarang
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection('cara-kerja')}>
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-inner">
                <div className="hero-icon">💰</div>
                <h3>Rp 1.2M+</h3>
                <p>Total pendapatan pengguna bulan ini</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3 className="stat-number" data-target={stat.number}>
                {stat.prefix || ''}0{stat.suffix || ''}
              </h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="fitur">
        <div className="features-container">
          <div className="section-header">
            <h2>Kenapa Memilih EcoMarga?</h2>
            <p>
              Solusi lengkap untuk mengelola sampah rumah tangga dengan mudah, 
              menguntungkan, dan ramah lingkungan.
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <feature.icon size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="cara-kerja">
        <div className="steps-container">
          <div className="section-header">
            <h2>Cara Kerja EcoMarga</h2>
            <p>Hanya dalam 4 langkah mudah, sampah Anda sudah bisa menjadi uang</p>
          </div>
          
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  <step.icon size={32} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta" id="tentang">
        <div className="cta-container">
          <h2>Mulai Perjalanan Eco-Friendly Anda</h2>
          <p>
            Bergabunglah dengan komunitas EcoMarga dan rasakan manfaat mengubah sampah 
            menjadi penghasilan sambil menjaga lingkungan.
          </p>
          <div className="cta-buttons">
            <Button variant="primary" size="lg" onClick={handleGetStarted}>
              Daftar Sekarang
            </Button>
            <Button variant="outline" size="lg">
              Download App
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="kontak">
        <div className="footer-container">
          <div className="footer-section">
            <h3>EcoMarga</h3>
            <p>Platform digital terdepan untuk pengelolaan sampah berkelanjutan di Indonesia.</p>
          </div>
          
          <div className="footer-section">
            <h3>Layanan</h3>
            <ul>
              <li><a href="#jemput">Jemput Sampah</a></li>
              <li><a href="#bank-sampah">Bank Sampah</a></li>
              <li><a href="#edukasi">Edukasi Lingkungan</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Perusahaan</h3>
            <ul>
              <li><a href="#tentang">Tentang Kami</a></li>
              <li><a href="#karir">Karir</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Kontak</h3>
            <ul>
              <li>📧 support@ecomarga.com</li>
              <li>📞 +62 812-3456-7890</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 EcoMarga. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;