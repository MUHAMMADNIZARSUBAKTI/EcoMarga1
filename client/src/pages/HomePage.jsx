import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, TreePine, DollarSign, Users, TrendingUp, MapPin, Star, CheckCircle, Shield, Clock, Zap, Award, Heart, Leaf } from 'lucide-react';

const HomePage = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animated counter for stats
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Rotating stats
  const stats = [
    { number: '1,294+', label: 'Pengguna Aktif', icon: '👥' },
    { number: '5.2 Ton', label: 'Sampah Terkumpul', icon: '♻️' },
    { number: 'Rp 45.2 Jt', label: 'Total Reward', icon: '💰' },
    { number: '89+', label: 'Bank Sampah Mitra', icon: '🏪' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', overflow: 'hidden' }}>
      
      {/* Hero Section - Enhanced */}
      <section style={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 30%, #dcfce7 70%, #bbf7d0 100%)',
        padding: '6rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          fontSize: '4rem',
          opacity: 0.08,
          animation: 'float 8s ease-in-out infinite',
          color: '#10b981'
        }}>🌱</div>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          fontSize: '3rem',
          opacity: 0.08,
          animation: 'float 6s ease-in-out infinite reverse',
          color: '#059669'
        }}>♻️</div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          fontSize: '3.5rem',
          opacity: 0.08,
          animation: 'float 7s ease-in-out infinite',
          color: '#10b981'
        }}>🌳</div>
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '20%',
          fontSize: '2.5rem',
          opacity: 0.08,
          animation: 'float 5s ease-in-out infinite',
          color: '#059669'
        }}>🌿</div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          position: 'relative',
          zIndex: 2
        }}>
          
          {/* Announcement Badge */}
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '3rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
            animation: isVisible ? 'slideInDown 0.8s ease-out' : 'none'
          }}>
            🎉 Platform #1 Bank Sampah Digital di Indonesia
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #1f2937 0%, #10b981 50%, #059669 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
            animation: isVisible ? 'fadeInUp 1s ease-out 0.2s both' : 'none'
          }}>
            Kelola Sampah,<br />
            <span style={{ 
              background: 'linear-gradient(135deg, #10b981, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Raih Manfaat
            </span>
          </h1>
          
          {/* Subheading */}
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            marginBottom: '3rem',
            maxWidth: '750px',
            margin: '0 auto 3rem auto',
            lineHeight: 1.6,
            animation: isVisible ? 'fadeInUp 1s ease-out 0.4s both' : 'none'
          }}>
            Platform digital bank sampah yang memudahkan Anda mengelola sampah 
            dan mendapatkan reward finansial sambil menjaga lingkungan untuk masa depan yang berkelanjutan.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '4rem',
            animation: isVisible ? 'fadeInUp 1s ease-out 0.6s both' : 'none'
          }}>
            <Link 
              to="/register" 
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                padding: '1.25rem 2.5rem',
                borderRadius: '1rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 30px rgba(16, 185, 129, 0.3)',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 30px rgba(16, 185, 129, 0.3)';
              }}
            >
              🚀 Mulai Sekarang <ArrowRight size={20} />
            </Link>
            
            <Link 
              to="/bank-sampah" 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#10b981',
                padding: '1.25rem 2.5rem',
                borderRadius: '1rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.125rem',
                border: '2px solid #10b981',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#10b981';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                e.target.style.color = '#10b981';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <MapPin size={20} /> Cari Bank Sampah
            </Link>
          </div>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            opacity: 0.8,
            animation: isVisible ? 'fadeInUp 1s ease-out 0.8s both' : 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Terpercaya & Aman</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>1000+ Pengguna</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>Pembayaran Instan</span>
            </div>
          </div>

          {/* Rotating Stats Display */}
          <div style={{
            marginTop: '3rem',
            animation: isVisible ? 'fadeInUp 1s ease-out 1s both' : 'none'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: '2rem',
              padding: '2rem 3rem',
              display: 'inline-block',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '0.5rem',
                transition: 'all 0.5s ease'
              }}>
                {stats[currentStat].icon}
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '0.25rem',
                transition: 'all 0.5s ease'
              }}>
                {stats[currentStat].number}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                fontWeight: '500',
                transition: 'all 0.5s ease'
              }}>
                {stats[currentStat].label}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section style={{ padding: '6rem 0', backgroundColor: '#fff' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              padding: '0.5rem 1.5rem',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              border: '1px solid #10b981'
            }}>
              ✨ Fitur Unggulan
            </div>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Mengapa Pilih EcoMarga?
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Bergabunglah dengan revolusi pengelolaan sampah digital yang memberikan dampak nyata untuk bumi dan dompet Anda
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2.5rem'
          }}>
            
            {/* Feature 1 - Enhanced */}
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '3rem',
              borderRadius: '1.5rem',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px) scale(1.02)';
              e.target.style.boxShadow = '0 30px 80px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 20px 60px rgba(16, 185, 129, 0.3)';
            }}
            >
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '100px',
                height: '100px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }}></div>
              
              <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                position: 'relative',
                zIndex: 2
              }}>
                <DollarSign size={50} />
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>
                💰 Reward Instan
              </h3>
              <p style={{
                fontSize: '1.125rem',
                opacity: 0.95,
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                Tukar sampah Anda dengan uang tunai yang langsung masuk ke e-wallet. 
                Semakin banyak sampah, semakin besar keuntungan!
              </p>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                padding: '1rem',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                💡 Rata-rata Rp 50.000/bulan per pengguna
              </div>
            </div>

            {/* Feature 2 - Enhanced */}
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              padding: '3rem',
              borderRadius: '1.5rem',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px) scale(1.02)';
              e.target.style.boxShadow = '0 30px 80px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.3)';
            }}
            >
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                left: '-30px',
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }}></div>
              
              <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                position: 'relative',
                zIndex: 2
              }}>
                <TreePine size={50} />
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>
                🌱 Jaga Lingkungan
              </h3>
              <p style={{
                fontSize: '1.125rem',
                opacity: 0.95,
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                Berkontribusi dalam menjaga kelestarian lingkungan untuk generasi mendatang. 
                Setiap sampah yang dikelola adalah langkah menuju bumi yang lebih hijau.
              </p>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                padding: '1rem',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                🌍 Sudah mengurangi 15.6 ton sampah
              </div>
            </div>

            {/* Feature 3 - Enhanced */}
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              padding: '3rem',
              borderRadius: '1.5rem',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(245, 158, 11, 0.3)',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px) scale(1.02)';
              e.target.style.boxShadow = '0 30px 80px rgba(245, 158, 11, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 20px 60px rgba(245, 158, 11, 0.3)';
            }}
            >
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                bottom: '-40px',
                right: '-40px',
                width: '90px',
                height: '90px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }}></div>
              
              <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                position: 'relative',
                zIndex: 2
              }}>
                <Recycle size={50} />
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>
                📱 Mudah & Praktis
              </h3>
              <p style={{
                fontSize: '1.125rem',
                opacity: 0.95,
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                Submit sampah kapan saja, dimana saja dengan aplikasi yang user-friendly. 
                Proses cepat, transparan, dan dapat dipantau real-time.
              </p>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                padding: '1rem',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                ⚡ Proses verifikasi {'<'} 24 jam
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - More Dynamic */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative'
      }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5
        }}></div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#10b981',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              📊 Dampak Real-Time
            </div>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Dampak Bersama yang Nyata
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Bergabunglah dengan ribuan orang yang telah merasakan manfaat EcoMarga dan berkontribusi untuk planet yang lebih hijau
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem'
          }}>
            
            {/* Enhanced Stats Cards */}
            {[
              { icon: '👥', number: '1,294+', label: 'Pengguna Aktif', color: '#10b981', bg: '#ecfdf5' },
              { icon: '♻️', number: '5.2 Ton', label: 'Sampah Terkumpul', color: '#3b82f6', bg: '#eff6ff' },
              { icon: '💰', number: 'Rp 45.2 Jt', label: 'Total Reward', color: '#f59e0b', bg: '#fef3c7' },
              { icon: '🏪', number: '89+', label: 'Bank Sampah Mitra', color: '#8b5cf6', bg: '#f3e8ff' }
            ].map((stat, index) => (
              <div 
                key={index}
                style={{
                  background: 'white',
                  padding: '3rem 2rem',
                  borderRadius: '1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '100px',
                  height: '100px',
                  backgroundColor: stat.bg,
                  borderRadius: '50%',
                  opacity: 0.3
                }}></div>
                
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: stat.bg,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  fontSize: '2rem',
                  position: 'relative',
                  zIndex: 2
                }}>
                  {stat.icon}
                </div>
                
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: stat.color,
                  marginBottom: '0.5rem',
                  position: 'relative',
                  zIndex: 2
                }}>
                  {stat.number}
                </div>
                
                <div style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  fontWeight: '600',
                  position: 'relative',
                  zIndex: 2
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Impact Metrics */}
          <div style={{
            marginTop: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: '🌱', value: '2,450', label: 'Pohon Diselamatkan' },
              { icon: '💧', value: '1.2 Jt L', label: 'Air Dihemat' },
              { icon: '⚡', value: '850 kWh', label: 'Energi Dihemat' },
              { icon: '🌍', value: '15.8 Ton', label: 'CO₂ Dikurangi' }
            ].map((metric, index) => (
              <div 
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  textAlign: 'center',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{metric.icon}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.25rem' }}>
                  {metric.value}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - More Visual */}
      <section style={{ padding: '6rem 0', backgroundColor: '#fff' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#fef3c7',
              color: '#92400e',
              padding: '0.5rem 1.5rem',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              border: '1px solid #f59e0b'
            }}>
              🚀 Cara Kerja
            </div>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Hanya 3 Langkah Mudah
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Mulai menghasilkan dari sampah Anda dengan proses yang sangat sederhana dan cepat
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            position: 'relative'
          }}>
            
            {/* Connecting Lines - Desktop Only */}
            <div style={{
              position: 'absolute',
              top: '60px',
              left: '25%',
              right: '25%',
              height: '2px',
              background: 'linear-gradient(90deg, #10b981, #3b82f6, #f59e0b)',
              zIndex: 1,
              display: window.innerWidth > 1024 ? 'block' : 'none'
            }}></div>

            {/* Step 1 - Enhanced */}
            <div style={{ 
              textAlign: 'center',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                width: '150px',
                height: '150px',
                background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                border: '4px solid #10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(16, 185, 129, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 15px 50px rgba(16, 185, 129, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 40px rgba(16, 185, 129, 0.2)';
              }}
              >
                <span style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                }}>
                  1
                </span>
                <Users size={60} style={{ color: '#10b981' }} />
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                📝 Daftar & Verifikasi
              </h3>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                Buat akun gratis dan lengkapi profil Anda. 
                Proses verifikasi mudah dan cepat hanya dalam hitungan menit.
              </p>
              <div style={{
                background: '#ecfdf5',
                border: '1px solid #10b981',
                borderRadius: '1rem',
                padding: '1rem',
                fontSize: '0.875rem',
                color: '#059669'
              }}>
                ⏱️ Hanya butuh 2 menit untuk mendaftar
              </div>
            </div>

            {/* Step 2 - Enhanced */}
            <div style={{ 
              textAlign: 'center',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                width: '150px',
                height: '150px',
                background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                border: '4px solid #3b82f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 15px 50px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 40px rgba(59, 130, 246, 0.2)';
              }}
              >
                <span style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                }}>
                  2
                </span>
                <Recycle size={60} style={{ color: '#3b82f6' }} />
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                📦 Kumpulkan & Submit
              </h3>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                Kumpulkan sampah yang dapat didaur ulang, timbang, 
                dan submit melalui aplikasi dengan foto sebagai bukti.
              </p>
              <div style={{
                background: '#eff6ff',
                border: '1px solid #3b82f6',
                borderRadius: '1rem',
                padding: '1rem',
                fontSize: '0.875rem',
                color: '#1e40af'
              }}>
                📸 Upload foto & data otomatis tersimpan
              </div>
            </div>

            {/* Step 3 - Enhanced */}
            <div style={{ 
              textAlign: 'center',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                width: '150px',
                height: '150px',
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                border: '4px solid #f59e0b',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                position: 'relative',
                boxShadow: '0 10px 40px rgba(245, 158, 11, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 15px 50px rgba(245, 158, 11, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 40px rgba(245, 158, 11, 0.2)';
              }}
              >
                <span style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#f59e0b',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
                }}>
                  3
                </span>
                <TrendingUp size={60} style={{ color: '#f59e0b' }} />
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#1f2937'
              }}>
                💰 Terima Reward
              </h3>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                Setelah verifikasi, dapatkan reward langsung ke e-wallet Anda. 
                Pantau progress dan nikmati penghasilan dari sampah!
              </p>
              <div style={{
                background: '#fef3c7',
                border: '1px solid #f59e0b',
                borderRadius: '1rem',
                padding: '1rem',
                fontSize: '0.875rem',
                color: '#92400e'
              }}>
                ⚡ Transfer instan ke DANA, OVO, GoPay
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#eff6ff',
              color: '#1e40af',
              padding: '0.5rem 1.5rem',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              border: '1px solid #3b82f6'
            }}>
              💬 Testimoni
            </div>
            <h2 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#1f2937'
            }}>
              Apa Kata Pengguna Kami?
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Ribuan pengguna telah merasakan manfaatnya dan berbagi pengalaman positif mereka
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2.5rem'
          }}>
            
            {/* Enhanced Testimonials */}
            {[
              {
                name: 'Sari Dewi',
                role: 'Ibu Rumah Tangga',
                avatar: 'S',
                color: '#10b981',
                text: 'EcoMarga benar-benar mengubah cara saya memandang sampah. Sekarang saya bisa dapat penghasilan tambahan Rp 150.000/bulan sambil berkontribusi untuk lingkungan!',
                earnings: 'Rp 150.000/bulan'
              },
              {
                name: 'Ahmad Rizki',
                role: 'Mahasiswa',
                avatar: 'A',
                color: '#3b82f6',
                text: 'Aplikasi yang sangat mudah digunakan. Proses submit sampah cepat, dan pembayaran langsung masuk ke DANA. Recommended banget untuk mahasiswa!',
                earnings: 'Rp 80.000/bulan'
              },
              {
                name: 'Linda Sari',
                role: 'Pegawai Swasta',
                avatar: 'L',
                color: '#f59e0b',
                text: 'Sebagai pegawai kantoran, EcoMarga membantu saya mengelola sampah kantor dan mendapat penghasilan tambahan. Win-win solution!',
                earnings: 'Rp 200.000/bulan'
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                style={{
                  background: 'white',
                  padding: '2.5rem',
                  borderRadius: '1.5rem',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Quote mark */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1.5rem',
                  fontSize: '3rem',
                  color: testimonial.color,
                  opacity: 0.2
                }}>
                  "
                </div>
                
                {/* Stars */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={18} style={{ color: '#f59e0b', fill: '#f59e0b', marginRight: '2px' }} />
                  ))}
                  <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                    5.0
                  </span>
                </div>
                
                {/* Testimonial text */}
                <p style={{
                  fontSize: '1.125rem',
                  color: '#374151',
                  marginBottom: '2rem',
                  lineHeight: 1.7,
                  fontStyle: 'italic'
                }}>
                  "{testimonial.text}"
                </p>
                
                {/* Earnings badge */}
                <div style={{
                  backgroundColor: `${testimonial.color}20`,
                  color: testimonial.color,
                  padding: '0.5rem 1rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  display: 'inline-block',
                  marginBottom: '1.5rem'
                }}>
                  💰 Penghasilan: {testimonial.earnings}
                </div>
                
                {/* User info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: testimonial.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.25rem'
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '1.125rem' }}>
                      {testimonial.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div style={{
            marginTop: '4rem',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '3rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                <CheckCircle size={16} style={{ color: '#10b981' }} />
                Rating 4.9/5 dari 1000+ pengguna
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                <Shield size={16} style={{ color: '#10b981' }} />
                Data aman & terenkripsi
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                <Award size={16} style={{ color: '#10b981' }} />
                Penghargaan Best Green App 2024
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - More Compelling */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #10b981 100%)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background animations */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          fontSize: '4rem',
          opacity: 0.1,
          animation: 'float 8s ease-in-out infinite'
        }}>💰</div>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          fontSize: '3rem',
          opacity: 0.1,
          animation: 'float 6s ease-in-out infinite reverse'
        }}>🌱</div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          fontSize: '3.5rem',
          opacity: 0.1,
          animation: 'float 7s ease-in-out infinite'
        }}>♻️</div>

        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 1rem',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Urgency indicator */}
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            padding: '0.75rem 2rem',
            borderRadius: '2rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            🔥 Bergabung sekarang dan dapatkan bonus Rp 50.000!
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            Siap Mulai Perjalanan<br />
            Ramah Lingkungan?
          </h2>
          
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '3rem',
            opacity: 0.9,
            lineHeight: 1.6,
            maxWidth: '700px',
            margin: '0 auto 3rem auto'
          }}>
            Bergabunglah dengan ribuan orang yang sudah merasakan manfaat EcoMarga. 
            Mulai hari ini dan rasakan perbedaannya untuk dompet dan planet kita!
          </p>
          
          {/* Enhanced CTA buttons */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            <Link 
              to="/register" 
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                padding: '1.25rem 3rem',
                borderRadius: '1rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 30px rgba(16, 185, 129, 0.4)',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 15px 50px rgba(16, 185, 129, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 8px 30px rgba(16, 185, 129, 0.4)';
              }}
            >
              🚀 Daftar Gratis + Bonus Rp 50K
            </Link>
            
            <Link 
              to="/bank-sampah" 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '1.25rem 3rem',
                borderRadius: '1rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.25rem',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🗺️ Jelajahi Bank Sampah
            </Link>
          </div>

          {/* Benefits list */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            {[
              '✅ Gratis selamanya',
              '✅ Tidak ada biaya tersembunyi', 
              '✅ Dukungan 24/7',
              '✅ Pembayaran instan'
            ].map((benefit, index) => (
              <div key={index} style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                padding: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                backdropFilter: 'blur(5px)'
              }}>
                {benefit}
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div style={{
            fontSize: '0.875rem',
            opacity: 0.8
          }}>
            <Heart size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Dipercaya oleh 1,294+ pengguna di seluruh Indonesia
          </div>
        </div>
      </section>

      {/* Floating animations and responsive styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          section {
            padding: 4rem 0 !important;
          }
          
          h1 {
            font-size: 2.5rem !important;
          }
          
          h2 {
            font-size: 2rem !important;
          }
          
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 480px) {
          section {
            padding: 3rem 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;