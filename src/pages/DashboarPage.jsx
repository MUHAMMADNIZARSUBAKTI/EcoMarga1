import React from 'react';
import { TrendingUp, Package, DollarSign, Leaf } from 'lucide-react';

const DashboardPage = () => {
  // Data dummy untuk testing
  const userStats = {
    total_earnings: 125000,
    submission_count: 8,
    total_weight: 15.5,
    environmental_impact: {
      co2_reduced: 12.5,
      trees_saved: 2
    }
  };

  return (
    <div style={{padding: '2rem 0', minHeight: '80vh'}}>
      <div className="container">
        <div style={{marginBottom: '2rem'}}>
          <h1>Dashboard</h1>
          <p style={{color: 'var(--text-light)'}}>
            Selamat datang kembali! Berikut ringkasan aktivitas Anda
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="card">
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{
                background: 'var(--primary-color)', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem'
              }}>
                <DollarSign size={24} />
              </div>
              <div>
                <div className="stat-number">Rp {userStats.total_earnings.toLocaleString()}</div>
                <div className="stat-label">Total Penghasilan</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{
                background: 'var(--accent-color)', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem'
              }}>
                <Package size={24} />
              </div>
              <div>
                <div className="stat-number">{userStats.submission_count}</div>
                <div className="stat-label">Total Submission</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{
                background: 'var(--warning-color)', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem'
              }}>
                <TrendingUp size={24} />
              </div>
              <div>
                <div className="stat-number">{userStats.total_weight} kg</div>
                <div className="stat-label">Total Berat Sampah</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{
                background: 'var(--success-color)', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem'
              }}>
                <Leaf size={24} />
              </div>
              <div>
                <div className="stat-number">{userStats.environmental_impact.co2_reduced} kg</div>
                <div className="stat-label">CO2 Dikurangi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{marginTop: '3rem'}}>
          <h2 style={{marginBottom: '1rem'}}>Aksi Cepat</h2>
          <div className="action-cards">
            <a href="/submit" className="action-card primary">
              <div className="action-icon">📱</div>
              <h3>Submit Sampah</h3>
              <p>Catat sampah Anda dan dapatkan reward</p>
            </a>
            
            <a href="/history" className="action-card secondary">
              <div className="action-icon">📊</div>
              <h3>Riwayat</h3>
              <p>Lihat submission dan transfer Anda</p>
            </a>
            
            <a href="/bank-sampah" className="action-card tertiary">
              <div className="action-icon">🏪</div>
              <h3>Bank Sampah</h3>
              <p>Temukan bank sampah terdekat</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;