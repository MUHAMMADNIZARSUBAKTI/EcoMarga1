import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{padding: '4rem 0', minHeight: '80vh', display: 'flex', alignItems: 'center'}}>
      <div className="container">
        <div style={{maxWidth: '400px', margin: '0 auto'}}>
          <div className="card">
            <div className="text-center mb-4">
              <h1>Daftar EcoMarga</h1>
              <p style={{color: 'var(--text-light)'}}>
                Bergabunglah dan mulai kelola sampah dengan bijak
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                  Nama Lengkap
                </label>
                <div style={{position: 'relative'}}>
                  <User size={16} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)'}} />
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>
              </div>

              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                  Email
                </label>
                <div style={{position: 'relative'}}>
                  <Mail size={16} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)'}} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Masukkan email Anda"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>
              </div>

              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                  Password
                </label>
                <div style={{position: 'relative'}}>
                  <Lock size={16} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)'}} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-light)'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                  Konfirmasi Password
                </label>
                <div style={{position: 'relative'}}>
                  <Lock size={16} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)'}} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Konfirmasi password"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{width: '100%', marginBottom: '1rem'}}>
                Daftar Sekarang
              </button>

              <div className="text-center">
                <p style={{color: 'var(--text-light)'}}>
                  Sudah punya akun?{' '}
                  <Link to="/login" style={{color: 'var(--primary-color)', textDecoration: 'none'}}>
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;