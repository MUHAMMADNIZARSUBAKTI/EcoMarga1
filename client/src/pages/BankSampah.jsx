import React, { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Star, Navigation } from "lucide-react";

// Data bank sampah langsung di dalam file untuk menghindari import error
const bankSampahList = [
  {
    id: 1,
    nama: 'Bank Sampah Melati',
    alamat: 'Jl. Raya Semarang No. 123, Tembalang',
    telepon: '0856-1234-5678',
    jam_operasional: 'Senin-Sabtu: 08:00 - 16:00',
    rating: 4.5,
    jarak: '2.3 km',
    koordinat: {
      lat: -7.0519,
      lng: 110.4386
    },
    kategori: ['Plastik', 'Kertas', 'Logam'],
    foto: '/images/bank-sampah-1.jpg'
  },
  {
    id: 2,
    nama: 'Bank Sampah Mawar',
    alamat: 'Jl. Pandanaran No. 456, Candisari',
    telepon: '0857-9876-5432',
    jam_operasional: 'Senin-Jumat: 09:00 - 17:00',
    rating: 4.2,
    jarak: '1.8 km',
    koordinat: {
      lat: -7.0611,
      lng: 110.4203
    },
    kategori: ['Plastik', 'Kertas', 'Elektronik'],
    foto: '/images/bank-sampah-2.jpg'
  },
  {
    id: 3,
    nama: 'Bank Sampah Kenanga',
    alamat: 'Jl. Gajah Mada No. 789, Gayamsari',
    telepon: '0858-1111-2222',
    jam_operasional: 'Selasa-Minggu: 07:00 - 15:00',
    rating: 4.8,
    jarak: '3.1 km',
    koordinat: {
      lat: -7.0066,
      lng: 110.4381
    },
    kategori: ['Plastik', 'Logam', 'Kaca'],
    foto: '/images/bank-sampah-3.jpg'
  },
  {
    id: 4,
    nama: 'Bank Sampah Cempaka',
    alamat: 'Jl. Ahmad Yani No. 321, Pedurungan',
    telepon: '0859-3333-4444',
    jam_operasional: 'Senin-Sabtu: 08:30 - 16:30',
    rating: 4.4,
    jarak: '4.2 km',
    koordinat: {
      lat: -7.0197,
      lng: 110.4658
    },
    kategori: ['Kertas', 'Kardus', 'Plastik'],
    foto: '/images/bank-sampah-4.jpg'
  },
  {
    id: 5,
    nama: 'Bank Sampah Anggrek',
    alamat: 'Jl. Diponegoro No. 567, Semarang Tengah',
    telepon: '0851-5555-6666',
    jam_operasional: 'Senin-Jumat: 08:00 - 16:00',
    rating: 4.6,
    jarak: '5.1 km',
    koordinat: {
      lat: -6.9899,
      lng: 110.4203
    },
    kategori: ['Semua Jenis', 'Organik'],
    foto: '/images/bank-sampah-5.jpg'
  }
];

// Kategori sampah
const wasteCategories = ['Plastik', 'Kertas', 'Logam', 'Kaca', 'Elektronik', 'Organik'];

// Function untuk mencari bank sampah terdekat
const findNearestBankSampah = (userLocation) => {
  return [...bankSampahList].sort((a, b) => {
    const distanceA = Math.sqrt(
      Math.pow(a.koordinat.lat - userLocation.lat, 2) +
      Math.pow(a.koordinat.lng - userLocation.lng, 2)
    );
    const distanceB = Math.sqrt(
      Math.pow(b.koordinat.lat - userLocation.lat, 2) +
      Math.pow(b.koordinat.lng - userLocation.lng, 2)
    );
    return distanceA - distanceB;
  });
};

// Function untuk filter bank sampah berdasarkan kategori
const filterBankSampahByCategory = (category) => {
  return bankSampahList.filter(bank => 
    bank.kategori.includes(category) || bank.kategori.includes('Semua Jenis')
  );
};

const BankSampah = () => {
  const [bankSampah, setBankSampah] = useState(bankSampahList);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const categories = ["Semua", ...wasteCategories];

  // Get user location dengan error handling yang lebih baik
  useEffect(() => {
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        setLocationError("Geolocation tidak didukung oleh browser ini");
        // Set default location to Semarang
        setUserLocation({
          lat: -7.0052,
          lng: 110.4381,
        });
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10 minutes
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          let errorMessage = "Tidak dapat mengakses lokasi";
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Akses lokasi ditolak oleh pengguna";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Informasi lokasi tidak tersedia";
              break;
            case error.TIMEOUT:
              errorMessage = "Permintaan lokasi timeout";
              break;
            default:
              errorMessage = "Terjadi kesalahan yang tidak diketahui";
              break;
          }
          
          setLocationError(errorMessage);
          
          // Set default location to Semarang
          setUserLocation({
            lat: -7.0052,
            lng: 110.4381,
          });
        },
        options
      );
    };

    getUserLocation();
  }, []);

  // Filter bank sampah by category
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "Semua") {
      setBankSampah(bankSampahList);
    } else {
      setBankSampah(filterBankSampahByCategory(category));
    }
  };

  // Sort by nearest
  const handleSortByNearest = () => {
    if (userLocation) {
      setLoading(true);
      const sorted = findNearestBankSampah(userLocation);
      setBankSampah(sorted);
      setLoading(false);
    }
  };

  // Open in maps
  const openInMaps = (bank) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${bank.koordinat.lat},${bank.koordinat.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ padding: "2rem 0", minHeight: "80vh" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#1f2937"
          }}>
            🏪 Bank Sampah Mitra
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
            Temukan bank sampah mitra terdekat untuk menyetorkan sampah Anda
          </p>
          
          {/* Location Error Alert */}
          {locationError && (
            <div style={{
              background: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '8px',
              padding: '1rem',
              marginTop: '1rem',
              color: '#92400e'
            }}>
              ⚠️ {locationError}. Menggunakan lokasi default Semarang.
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem", color: "#1f2937" }}>Filter & Urutkan</h3>
          
          {/* Category Filters */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              fontWeight: "500",
              color: "#374151"
            }}>
              Kategori Sampah:
            </label>
            <div style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap"
            }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  style={{
                    padding: "0.5rem 1rem",
                    border: selectedCategory === category 
                      ? "2px solid #10b981" 
                      : "2px solid #d1d5db",
                    background: selectedCategory === category 
                      ? "#10b981" 
                      : "white",
                    color: selectedCategory === category 
                      ? "white" 
                      : "#374151",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontSize: "0.875rem",
                    fontWeight: "500"
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Actions */}
          <div>
            <button
              onClick={handleSortByNearest}
              disabled={!userLocation || loading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: userLocation && !loading ? "#3b82f6" : "#9ca3af",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: userLocation && !loading ? "pointer" : "not-allowed",
                fontSize: "0.875rem",
                fontWeight: "500",
                transition: "all 0.2s ease"
              }}
            >
              <Navigation size={16} />
              {loading ? "Mengurutkan..." : "Urutkan Berdasarkan Jarak"}
            </button>
          </div>
        </div>

        {/* Bank Sampah List */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem"
        }}>
          {bankSampah.map((bank) => (
            <div key={bank.id} className="card" style={{
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }}>
              {/* Bank Header */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1rem"
              }}>
                <div>
                  <h3 style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "0.25rem"
                  }}>
                    {bank.nama}
                  </h3>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    color: "#f59e0b"
                  }}>
                    <Star size={16} fill="currentColor" />
                    <span style={{ fontWeight: "500" }}>{bank.rating}</span>
                    <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                      • {bank.jarak}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div style={{ marginBottom: "1.5rem" }}>
                {/* Address */}
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  marginBottom: "0.75rem"
                }}>
                  <MapPin size={16} style={{ 
                    marginTop: "0.125rem",
                    color: "#10b981",
                    flexShrink: 0
                  }} />
                  <span style={{ 
                    fontSize: "0.875rem", 
                    color: "#6b7280",
                    lineHeight: "1.4"
                  }}>
                    {bank.alamat}
                  </span>
                </div>

                {/* Phone */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.75rem"
                }}>
                  <Phone size={16} style={{ color: "#3b82f6" }} />
                  <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {bank.telepon}
                  </span>
                </div>

                {/* Operating Hours */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem"
                }}>
                  <Clock size={16} style={{ color: "#f59e0b" }} />
                  <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {bank.jam_operasional}
                  </span>
                </div>

                {/* Categories */}
                <div>
                  <div style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginBottom: "0.5rem",
                    fontWeight: "500"
                  }}>
                    Menerima:
                  </div>
                  <div style={{
                    display: "flex",
                    gap: "0.25rem",
                    flexWrap: "wrap"
                  }}>
                    {bank.kategori.map((kategori, index) => (
                      <span
                        key={index}
                        style={{
                          background: "#ecfdf5",
                          color: "#059669",
                          padding: "0.25rem 0.5rem",
                          fontSize: "0.75rem",
                          borderRadius: "0.25rem",
                          border: "1px solid #10b981"
                        }}
                      >
                        {kategori}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: "flex",
                gap: "0.5rem",
                paddingTop: "1rem",
                borderTop: "1px solid #e5e7eb"
              }}>
                <button
                  onClick={() => openInMaps(bank)}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.75rem",
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#059669";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#10b981";
                  }}
                >
                  <MapPin size={16} />
                  Lihat di Maps
                </button>
                
                <button
                  onClick={() => window.open(`tel:${bank.telepon}`, "_self")}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.75rem",
                    background: "transparent",
                    color: "#3b82f6",
                    border: "1px solid #3b82f6",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#3b82f6";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#3b82f6";
                  }}
                >
                  <Phone size={16} />
                  Hubungi
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bankSampah.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "3rem",
            color: "#6b7280"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏪</div>
            <h3 style={{ marginBottom: "0.5rem", color: "#1f2937" }}>
              Tidak ada bank sampah ditemukan
            </h3>
            <p>
              Coba ubah filter kategori atau hubungi kami untuk menambah bank sampah di area Anda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankSampah;