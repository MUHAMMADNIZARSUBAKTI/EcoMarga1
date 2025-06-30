import React from 'react';
import { MapPin, Phone, Clock, Star } from 'lucide-react';

const BankSampahPage = () => {
  const bankSampahList = [
    {
      id: 1,
      nama: 'Bank Sampah Melati',
      alamat: 'Jl. Raya Semarang No. 123, Tembalang',
      telepon: '0856-1234-5678',
      jam_operasional: 'Senin-Sabtu: 08:00 - 16:00',
      rating: 4.5,
      jarak: '2.3 km'
    },
    {
      id: 2,
      nama: 'Bank Sampah Mawar',
      alamat: 'Jl. Pandanaran No. 456, Candisari',
      telepon: '0857-9876-5432',
      jam_operasional: 'Senin-Jumat: 09:00 - 17:00',
      rating: 4.2,
      jarak: '1.8 km'
    },
    {
      id: 3,
      nama: 'Bank Sampah Kenanga',
      alamat: 'Jl. Gajah Mada No. 789, Gayamsari',
      telepon: '0858-1111-2222',
      jam_operasional: 'Selasa-Minggu: 07:00 - 15:00',
      rating: 4.8,
      jarak: '3.1 km'
    }
  ];

  return (
    <div style={{padding: '2rem 0', minHeight: '80vh'}}>
      <div className="container">
        <div style={{marginBottom: '2rem'}}>
          <h1>Bank Sampah Terdekat</h1>
          <p style={{color: 'var(--text-light)'}}>
            Temukan bank sampah mitra EcoMarga di sekitar Anda
          </p>
        </div>

        <div className="grid">
          {bankSampahList.map(bank => (
            <div key={bank.id} className="card">
              <div style={{marginBottom: '1rem'}}>
                <h3 style={{marginBottom: '0.5rem'}}>{bank.nama}</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                  <Star size={16} style={{color: '#fbbf24'}} />
                  <span>{bank.rating}</span>
                  <span style={{color: 'var(--text-light)'}}>• {bank.jarak}</span>
                </div>
              </div>

              <div style={{space: 'y-2'}}>
                <div style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem'}}>
                  <MapPin size={16} style={{color: 'var(--text-light)', marginTop: '2px'}} />
                  <span style={{fontSize: '0.9rem'}}>{bank.alamat}</span>
                </div>

                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                  <Phone size={16} style={{color: 'var(--text-light)'}} />
                  <span style={{fontSize: '0.9rem'}}>{bank.telepon}</span>
                </div>

                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
                  <Clock size={16} style={{color: 'var(--text-light)'}} />
                  <span style={{fontSize: '0.9rem'}}>{bank.jam_operasional}</span>
                </div>
              </div>

              <div style={{display: 'flex', gap: '0.5rem'}}>
                <button className="btn btn-primary" style={{flex: 1}}>
                  Lihat Detail
                </button>
                <button className="btn btn-outline">
                  Rute
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankSampahPage;