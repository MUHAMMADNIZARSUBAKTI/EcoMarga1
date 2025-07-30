// mockApiService.js
// Mock API Service untuk menggantikan real API calls

// Mock data storage
const mockData = {
  users: [
    { 
      id: 1, 
      nama: "Ahmad Rizki", 
      email: "ahmad@example.com", 
      phone: "+62 812-3456-7890",
      address: "Jl. Merdeka No. 123, Semarang",
      role: "admin", 
      join_date: "2024-01-20",
      ewallet_accounts: {
        dana: "081234567890",
        ovo: "081234567890", 
        gopay: "081234567890"
      },
      created_at: "2025-01-20T10:00:00Z" 
    },
    { 
      id: 2, 
      nama: "Siti Nurhaliza", 
      email: "siti@example.com", 
      phone: "+62 813-7654-3210",
      address: "Jl. Pahlawan No. 456, Semarang",
      role: "user", 
      join_date: "2024-02-15",
      ewallet_accounts: {
        dana: "081376543210",
        ovo: "081376543210",
        gopay: "081376543210"
      },
      created_at: "2025-01-21T14:30:00Z" 
    }
  ],
  
  wasteTypes: [
    { 
      id: 1, 
      name: "Plastik Botol", 
      category: "Plastik", 
      price_per_kg: 2000, 
      description: "Botol plastik bekas minuman",
      environmental_impact: { co2_reduction: 1.2, trees_saved: 0.1 }
    },
    { 
      id: 2, 
      name: "Kertas", 
      category: "Kertas", 
      price_per_kg: 1500, 
      description: "Kertas bekas, koran, majalah",
      environmental_impact: { co2_reduction: 0.8, trees_saved: 0.2 }
    },
    { 
      id: 3, 
      name: "Kaleng Aluminium", 
      category: "Logam", 
      price_per_kg: 5000, 
      description: "Kaleng minuman aluminium",
      environmental_impact: { co2_reduction: 2.5, trees_saved: 0.15 }
    }
  ],
  
  wasteSubmissions: [
    {
      id: 1,
      user_id: 1,
      waste_type_id: 1,
      weight: 2.5,
      total_price: 5000,
      status: "completed",
      pickup_address: "Jl. Merdeka No. 123, Semarang",
      pickup_date: "2025-01-23",
      created_at: "2025-01-23T08:00:00Z"
    },
    {
      id: 2,
      user_id: 2,
      waste_type_id: 2,
      weight: 3.0,
      total_price: 4500,
      status: "pending",
      pickup_address: "Jl. Pahlawan No. 456, Semarang",
      pickup_date: "2025-01-25",
      created_at: "2025-01-24T11:30:00Z"
    }
  ],
  
  bankSampah: [
    {
      id: 1,
      name: "Bank Sampah Bersih",
      address: "Jl. Lingkungan No. 10, Semarang",
      phone: "+62 24 123-4567",
      coordinates: { lat: -7.005145, lng: 110.438125 },
      operating_hours: "08:00 - 16:00",
      status: "active"
    },
    {
      id: 2,
      name: "Bank Sampah Hijau",
      address: "Jl. Pemuda No. 25, Semarang",
      phone: "+62 24 765-4321",
      coordinates: { lat: -7.025145, lng: 110.458125 },
      operating_hours: "09:00 - 17:00",
      status: "active"
    }
  ]
};

// Utility function untuk simulasi delay
const simulateDelay = (min = 300, max = 800) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

// Utility function untuk generate ID
const generateId = (array) => {
  return Math.max(...array.map(item => item.id), 0) + 1;
};

// Mock API Service Class
class MockApiService {
  constructor() {
    this.isEnabled = import.meta.env.VITE_USE_MOCK_API === 'true' || !import.meta.env.VITE_API_BASE_URL;
    console.log('Mock API Service initialized:', this.isEnabled ? 'ENABLED' : 'DISABLED');
  }

  // Auth endpoints
  async login(email, password) {
    await simulateDelay();
    
    const user = mockData.users.find(u => u.email === email);
    if (!user) {
      throw new Error('User tidak ditemukan');
    }
    
    // Simple password validation (in real app, this would be hashed)
    if (password !== 'password123') {
      throw new Error('Password salah');
    }
    
    const token = `mock-jwt-token-${Date.now()}`;
    const response = {
      success: true,
      data: {
        token,
        user: user,
        expires_in: 3600
      },
      message: "Login berhasil"
    };
    
    console.log('Mock API: Login success', { email, user: user.nama });
    return response;
  }

  async register(userData) {
    await simulateDelay();
    
    // Check if email already exists
    const existingUser = mockData.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email sudah terdaftar');
    }
    
    const newUser = {
      id: generateId(mockData.users),
      nama: userData.nama,
      email: userData.email,
      phone: userData.phone || '',
      address: userData.address || '',
      role: 'user',
      join_date: new Date().toISOString().split('T')[0],
      ewallet_accounts: {
        dana: '',
        ovo: '',
        gopay: ''
      },
      created_at: new Date().toISOString()
    };
    
    mockData.users.push(newUser);
    
    const token = `mock-jwt-token-${Date.now()}`;
    const response = {
      success: true,
      data: {
        token,
        user: newUser
      },
      message: "Registrasi berhasil"
    };
    
    console.log('Mock API: Register success', { user: newUser.nama });
    return response;
  }

  async verifyToken(token) {
    await simulateDelay(100, 300);
    
    if (!token || !token.startsWith('mock-jwt-token')) {
      throw new Error('Token tidak valid');
    }
    
    // Return a user (in real app, decode token to get user ID)
    return {
      success: true,
      data: { valid: true, user: mockData.users[0] },
      message: "Token valid"
    };
  }

  // User endpoints
  async getUserProfile(userId) {
    await simulateDelay();
    
    const user = mockData.users.find(u => u.id === userId);
    if (!user) {
      throw new Error('User tidak ditemukan');
    }
    
    return {
      success: true,
      data: user,
      message: "Profile berhasil diambil"
    };
  }

  async updateUserProfile(userId, updateData) {
    await simulateDelay();
    
    const userIndex = mockData.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error('User tidak ditemukan');
    }
    
    mockData.users[userIndex] = { ...mockData.users[userIndex], ...updateData };
    
    console.log('Mock API: Profile updated', { userId, updateData });
    return {
      success: true,
      data: mockData.users[userIndex],
      message: "Profile berhasil diupdate"
    };
  }

  async getUserStats(userId) {
    await simulateDelay();
    
    const userSubmissions = mockData.wasteSubmissions.filter(s => s.user_id === userId);
    const totalEarnings = userSubmissions.reduce((sum, s) => sum + s.total_price, 0);
    const totalWeight = userSubmissions.reduce((sum, s) => sum + s.weight, 0);
    
    const stats = {
      total_earnings: totalEarnings,
      submission_count: userSubmissions.length,
      total_weight: totalWeight,
      environmental_impact: {
        co2_reduced: totalWeight * 1.2, // Mock calculation
        trees_saved: Math.floor(totalWeight * 0.1)
      }
    };
    
    return {
      success: true,
      data: stats,
      message: "Stats berhasil diambil"
    };
  }

  // Waste endpoints
  async getWasteTypes() {
    await simulateDelay();
    
    return {
      success: true,
      data: mockData.wasteTypes,
      message: "Jenis sampah berhasil diambil"
    };
  }

  async submitWaste(wasteData) {
    await simulateDelay();
    
    const wasteType = mockData.wasteTypes.find(w => w.id === wasteData.waste_type_id);
    if (!wasteType) {
      throw new Error('Jenis sampah tidak ditemukan');
    }
    
    const totalPrice = wasteData.weight * wasteType.price_per_kg;
    
    const newSubmission = {
      id: generateId(mockData.wasteSubmissions),
      user_id: wasteData.user_id,
      waste_type_id: wasteData.waste_type_id,
      weight: wasteData.weight,
      total_price: totalPrice,
      status: 'pending',
      pickup_address: wasteData.pickup_address,
      pickup_date: wasteData.pickup_date,
      notes: wasteData.notes || '',
      created_at: new Date().toISOString()
    };
    
    mockData.wasteSubmissions.push(newSubmission);
    
    console.log('Mock API: Waste submitted', newSubmission);
    return {
      success: true,
      data: newSubmission,
      message: "Sampah berhasil disubmit"
    };
  }

  async getWasteHistory(userId) {
    await simulateDelay();
    
    const userSubmissions = mockData.wasteSubmissions
      .filter(s => s.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    // Add waste type info to submissions
    const enrichedSubmissions = userSubmissions.map(submission => {
      const wasteType = mockData.wasteTypes.find(w => w.id === submission.waste_type_id);
      return {
        ...submission,
        waste_type: wasteType
      };
    });
    
    return {
      success: true,
      data: enrichedSubmissions,
      message: "Riwayat berhasil diambil"
    };
  }

  async calculatePrice(wasteTypeId, weight) {
    await simulateDelay(100, 200);
    
    const wasteType = mockData.wasteTypes.find(w => w.id === wasteTypeId);
    if (!wasteType) {
      throw new Error('Jenis sampah tidak ditemukan');
    }
    
    const totalPrice = weight * wasteType.price_per_kg;
    
    return {
      success: true,
      data: {
        waste_type: wasteType,
        weight: weight,
        price_per_kg: wasteType.price_per_kg,
        total_price: totalPrice,
        environmental_impact: {
          co2_reduced: weight * wasteType.environmental_impact.co2_reduction,
          trees_saved: weight * wasteType.environmental_impact.trees_saved
        }
      },
      message: "Harga berhasil dikalkulasi"
    };
  }

  // Bank Sampah endpoints
  async getAllBankSampah() {
    await simulateDelay();
    
    return {
      success: true,
      data: mockData.bankSampah,
      message: "Bank sampah berhasil diambil"
    };
  }

  async getBankSampahById(id) {
    await simulateDelay();
    
    const bankSampah = mockData.bankSampah.find(b => b.id === id);
    if (!bankSampah) {
      throw new Error('Bank sampah tidak ditemukan');
    }
    
    return {
      success: true,
      data: bankSampah,
      message: "Bank sampah berhasil diambil"
    };
  }

  async findNearestBankSampah(coordinates) {
    await simulateDelay();
    
    // Simple distance calculation (in real app, use proper geolocation)
    const bankSampahWithDistance = mockData.bankSampah.map(bank => {
      const distance = Math.sqrt(
        Math.pow(bank.coordinates.lat - coordinates.lat, 2) +
        Math.pow(bank.coordinates.lng - coordinates.lng, 2)
      ) * 111; // Rough km conversion
      
      return { ...bank, distance: Math.round(distance * 100) / 100 };
    });
    
    const sortedBanks = bankSampahWithDistance.sort((a, b) => a.distance - b.distance);
    
    return {
      success: true,
      data: sortedBanks,
      message: "Bank sampah terdekat berhasil ditemukan"
    };
  }
}

// Create singleton instance
const mockApiService = new MockApiService();

export default mockApiService;