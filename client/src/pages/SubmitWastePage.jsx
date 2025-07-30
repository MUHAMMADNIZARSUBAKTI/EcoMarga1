import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

// Icon Components (using emoji instead of lucide-react)
const Package = ({ size = 20 }) => <span style={{ fontSize: `${size}px` }}>📦</span>;
const Calculator = ({ size = 20 }) => <span style={{ fontSize: `${size}px` }}>🧮</span>;
const MapPin = ({ size = 20 }) => <span style={{ fontSize: `${size}px` }}>📍</span>;
const Camera = ({ size = 20 }) => <span style={{ fontSize: `${size}px` }}>📷</span>;
const CheckCircle = ({ size = 20 }) => <span style={{ fontSize: `${size}px` }}>✅</span>;
const AlertCircle = ({ size = 20 }) => <span style={{ fontSize: `${size}px` }}>⚠️</span>;

// Mock data untuk jenis sampah
const WASTE_TYPES = [
  {
    id: 1,
    nama: 'Plastik Botol',
    kategori: 'Plastik',
    harga_per_kg: 3000,
    icon: '🥤',
    warna: '#3b82f6',
    deskripsi: 'Botol plastik bekas minuman, detergen, shampo',
    tips: 'Bersihkan dari sisa cairan dan lepas label jika memungkinkan'
  },
  {
    id: 2,
    nama: 'Kertas & Kardus',
    kategori: 'Kertas',
    harga_per_kg: 2500,
    icon: '📄',
    warna: '#f59e0b',
    deskripsi: 'Kertas bekas, koran, majalah, kardus',
    tips: 'Pastikan kertas kering dan tidak tercampur dengan plastik'
  },
  {
    id: 3,
    nama: 'Kaleng Aluminium',
    kategori: 'Logam',
    harga_per_kg: 8000,
    icon: '🥫',
    warna: '#6b7280',
    deskripsi: 'Kaleng minuman, kaleng makanan',
    tips: 'Bersihkan dari sisa makanan dan minuman'
  },
  {
    id: 4,
    nama: 'Besi & Logam',
    kategori: 'Logam',
    harga_per_kg: 5000,
    icon: '🔩',
    warna: '#374151',
    deskripsi: 'Besi bekas, logam, komponen elektronik',
    tips: 'Pisahkan dari bahan non-logam'
  },
  {
    id: 5,
    nama: 'Kaca',
    kategori: 'Kaca',
    harga_per_kg: 1500,
    icon: '🍾',
    warna: '#10b981',
    deskripsi: 'Botol kaca, pecahan kaca (hati-hati)',
    tips: 'Bungkus dengan aman untuk mencegah luka'
  }
];

const SubmitWastePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateUserStats } = useUser();

  // Form state
  const [formData, setFormData] = useState({
    wasteTypeId: '',
    weight: '',
    location: '',
    notes: '',
    photos: []
  });

  // UI state
  const [selectedWasteType, setSelectedWasteType] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate price when waste type or weight changes
  useEffect(() => {
    if (selectedWasteType && formData.weight) {
      const price = selectedWasteType.harga_per_kg * parseFloat(formData.weight);
      setCalculatedPrice(price);
    } else {
      setCalculatedPrice(0);
    }
  }, [selectedWasteType, formData.weight]);

  // Update selected waste type when formData changes
  useEffect(() => {
    if (formData.wasteTypeId) {
      const wasteType = WASTE_TYPES.find(w => w.id === parseInt(formData.wasteTypeId));
      setSelectedWasteType(wasteType || null);
    } else {
      setSelectedWasteType(null);
    }
  }, [formData.wasteTypeId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle photo upload (mock)
  const handlePhotoUpload = (e) => {
    try {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        // Mock photo upload - in real app, you'd upload to server
        const photoUrls = files.map((file, index) => ({
          id: Date.now() + index,
          name: file.name,
          url: URL.createObjectURL(file),
          size: file.size
        }));
        
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, ...photoUrls].slice(0, 3) // Max 3 photos
        }));
      }
    } catch {
      console.error('Error uploading photos');
    }
  };

  // Remove photo
  const removePhoto = (photoId) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.wasteTypeId) {
      newErrors.wasteTypeId = 'Pilih jenis sampah';
    }

    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      newErrors.weight = 'Masukkan berat yang valid';
    } else if (parseFloat(formData.weight) > 100) {
      newErrors.weight = 'Berat maksimal 100 kg per submission';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Masukkan lokasi penjemputan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - replace with real API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful submission
      const submissionData = {
        id: Date.now(),
        user_id: user?.id || 1,
        waste_type_id: parseInt(formData.wasteTypeId),
        waste_type: selectedWasteType,
        weight: parseFloat(formData.weight),
        total_price: calculatedPrice,
        location: formData.location,
        notes: formData.notes,
        photos: formData.photos,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      console.log('Submission data:', submissionData);

      // Update user stats (if available)
      if (updateUserStats && typeof updateUserStats === 'function') {
        try {
          updateUserStats({
            total_earnings: calculatedPrice,
            submission_count: 1,
            total_weight: parseFloat(formData.weight)
          });
        } catch (statsError) {
          console.warn('Failed to update user stats:', statsError);
        }
      }

      setSubmitSuccess(true);

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          wasteTypeId: '',
          weight: '',
          location: '',
          notes: '',
          photos: []
        });
        setSubmitSuccess(false);
      }, 3000);

    } catch {
      console.error('Submission failed');
      setErrors({ submit: 'Gagal mengirim data. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    try {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(amount);
    } catch (error) {
      return `Rp ${amount.toLocaleString()}`;
    }
  };

  // Success message component
  if (submitSuccess) {
    return (
      <div style={{ padding: '4rem 0', minHeight: '60vh' }}>
        <div className="container">
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            textAlign: 'center',
            background: 'white',
            borderRadius: '16px',
            padding: '3rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              color: 'white',
              fontSize: '2rem'
            }}>
              <CheckCircle size={40} />
            </div>
            
            <h2 style={{ color: '#10b981', marginBottom: '1rem' }}>
              Submission Berhasil! 🎉
            </h2>
            
            <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Terima kasih! Data sampah Anda telah berhasil dikirim. 
              Tim kami akan segera menghubungi Anda untuk penjemputan.
            </p>
            
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #10b981',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h4 style={{ color: '#059669', margin: '0 0 1rem' }}>
                Detail Submission:
              </h4>
              <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Jenis:</span>
                  <span style={{ color: '#059669', fontWeight: '500' }}>
                    {selectedWasteType?.nama || 'N/A'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Berat:</span>
                  <span style={{ color: '#059669', fontWeight: '500' }}>
                    {formData.weight} kg
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Estimasi:</span>
                  <span style={{ color: '#059669', fontWeight: '600', fontSize: '1rem' }}>
                    {formatCurrency(calculatedPrice)}
                  </span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => navigate('/history')}
                className="btn btn-primary"
              >
                📋 Lihat Riwayat
              </button>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="btn btn-outline"
              >
                ➕ Submit Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            marginBottom: '0.5rem'
          }}>
            <Package />
            Submit Sampah
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
            Upload data sampah Anda untuk dijemput dan dapatkan reward
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 300px' : '1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Main Form */}
          <div className="card">
            <form onSubmit={handleSubmit}>
              {/* Waste Type Selection */}
              <div className="form-group">
                <label className="form-label">
                  <Package size={16} /> Jenis Sampah *
                </label>
                <select
                  name="wasteTypeId"
                  value={formData.wasteTypeId}
                  onChange={handleInputChange}
                  className={`form-select ${errors.wasteTypeId ? 'error' : ''}`}
                  required
                >
                  <option value="">Pilih jenis sampah</option>
                  {WASTE_TYPES.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.nama} - {formatCurrency(type.harga_per_kg)}/kg
                    </option>
                  ))}
                </select>
                {errors.wasteTypeId && (
                  <div className="form-error">{errors.wasteTypeId}</div>
                )}
              </div>

              {/* Selected Waste Type Info */}
              {selectedWasteType && (
                <div style={{
                  background: 'linear-gradient(145deg, #f0fdf4, #ecfdf5)',
                  border: '1px solid #10b981',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '2rem' }}>{selectedWasteType.icon}</span>
                    <div>
                      <h4 style={{ margin: 0, color: '#1f2937' }}>
                        {selectedWasteType.nama}
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                        {selectedWasteType.deskripsi}
                      </p>
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <div style={{ 
                        fontSize: '1.125rem', 
                        fontWeight: 'bold', 
                        color: '#10b981' 
                      }}>
                        {formatCurrency(selectedWasteType.harga_per_kg)}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        per kg
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    background: '#eff6ff',
                    border: '1px solid #3b82f6',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <AlertCircle size={16} />
                    <div>
                      <p style={{
                        margin: 0,
                        fontSize: '0.75rem',
                        color: '#1e40af',
                        fontWeight: '500'
                      }}>
                        Tips:
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '0.75rem',
                        color: '#1e40af'
                      }}>
                        {selectedWasteType.tips}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Weight Input */}
              <div className="form-group">
                <label className="form-label">
                  <Calculator size={16} /> Berat (kg) *
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Masukkan berat sampah"
                  min="0.1"
                  max="100"
                  step="0.1"
                  className={`form-input ${errors.weight ? 'error' : ''}`}
                  required
                />
                {errors.weight && (
                  <div className="form-error">{errors.weight}</div>
                )}
                <div className="form-help">
                  Minimum 0.1 kg, maksimum 100 kg per submission
                </div>
              </div>

              {/* Location Input */}
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={16} /> Lokasi Penjemputan *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Contoh: Jl. Sudirman No. 123, Semarang"
                  className={`form-input ${errors.location ? 'error' : ''}`}
                  required
                />
                {errors.location && (
                  <div className="form-error">{errors.location}</div>
                )}
                <div className="form-help">
                  Alamat lengkap untuk memudahkan penjemputan
                </div>
              </div>

              {/* Notes */}
              <div className="form-group">
                <label className="form-label">Catatan Tambahan</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Catatan khusus, waktu yang tepat untuk penjemputan, dll."
                  rows="3"
                  className="form-textarea"
                />
              </div>

              {/* Photo Upload */}
              <div className="form-group">
                <label className="form-label">
                  <Camera size={16} /> Foto Sampah (Opsional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '2rem',
                    border: '2px dashed #d1d5db',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: '#6b7280'
                  }}
                >
                  <Camera size={24} />
                  <span>Klik untuk upload foto (max 3)</span>
                </label>
                
                {/* Photo Preview */}
                {formData.photos.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                    gap: '1rem',
                    marginTop: '1rem'
                  }}>
                    {formData.photos.map(photo => (
                      <div key={photo.id} style={{ position: 'relative' }}>
                        <img
                          src={photo.url}
                          alt={photo.name}
                          style={{
                            width: '100%',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ flex: 1 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Submit Sampah
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="btn btn-secondary"
                >
                  Batal
                </button>
              </div>

              {errors.submit && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginTop: '1rem',
                  color: '#dc2626'
                }}>
                  {errors.submit}
                </div>
              )}
            </form>
          </div>

          {/* Price Calculator Sidebar */}
          <div className="card" style={{ position: window.innerWidth > 768 ? 'sticky' : 'static', top: '2rem' }}>
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              color: '#10b981'
            }}>
              <Calculator size={20} />
              Kalkulator Harga
            </h3>

            {selectedWasteType && formData.weight ? (
              <div>
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ color: '#6b7280' }}>Jenis:</span>
                    <span style={{ fontWeight: '500' }}>{selectedWasteType.nama}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ color: '#6b7280' }}>Harga/kg:</span>
                    <span style={{ fontWeight: '500' }}>
                      {formatCurrency(selectedWasteType.harga_per_kg)}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ color: '#6b7280' }}>Berat:</span>
                    <span style={{ fontWeight: '500' }}>{formData.weight} kg</span>
                  </div>
                  <div style={{
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: '600' }}>Total:</span>
                    <span style={{
                      fontWeight: '700',
                      fontSize: '1.25rem',
                      color: '#10b981'
                    }}>
                      {formatCurrency(calculatedPrice)}
                    </span>
                  </div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #ecfdf5, #f0fdf4)',
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
                  <p style={{
                    margin: 0,
                    fontSize: '0.875rem',
                    color: '#059669',
                    fontWeight: '500'
                  }}>
                    Estimasi reward Anda
                  </p>
                </div>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                color: '#6b7280',
                padding: '2rem 1rem'
              }}>
                <Calculator size={48} />
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  Pilih jenis sampah dan masukkan berat untuk melihat estimasi harga
                </p>
              </div>
            )}

            {/* Quick Info */}
            <div style={{
              borderTop: '1px solid #e5e7eb',
              paddingTop: '1rem',
              marginTop: '1rem'
            }}>
              <h4 style={{ fontSize: '0.875rem', marginBottom: '0.75rem', color: '#374151' }}>
                💡 Tips:
              </h4>
              <ul style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                paddingLeft: '1rem',
                margin: 0
              }}>
                <li>Pastikan sampah dalam kondisi bersih</li>
                <li>Pisahkan berdasarkan jenis material</li>
                <li>Foto yang jelas akan mempercepat verifikasi</li>
                <li>Penjemputan gratis untuk area Semarang</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitWastePage;