import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login data:', formData);
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
              <h1>Masuk ke EcoMarga</h1>
              <p style={{color: 'var(--text-light)'}}>
                Selamat datang kembali! Silakan masuk ke akun Anda
              </p>
            </div>

            <form onSubmit={handleSubmit}>
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

              <div style={{marginBottom: '1.5rem'}}>
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
                    placeholder="Masukkan password Anda"
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

              <button type="submit" className="btn btn-primary" style={{width: '100%', marginBottom: '1rem'}}>
                Masuk
              </button>

              <div className="text-center">
                <p style={{color: 'var(--text-light)'}}>
                  Belum punya akun?{' '}
                  <Link to="/register" style={{color: 'var(--primary-color)', textDecoration: 'none'}}>
                    Daftar di sini
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

export default LoginPage;