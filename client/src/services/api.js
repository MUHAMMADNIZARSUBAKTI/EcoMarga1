const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || !import.meta.env.VITE_API_BASE_URL;

// DEBUGGING - akan muncul di console
console.log('🚀 API Configuration Loaded:', {
  baseUrl: API_BASE_URL,
  useMockApi: USE_MOCK_API,
  envMockApi: import.meta.env.VITE_USE_MOCK_API,
  envBaseUrl: import.meta.env.VITE_API_BASE_URL,
  allEnvVars: import.meta.env
});

// Mock data storage
const mockData = {
  users: [
    { 
      id: 1, 
      nama: "Ahmad Rizki", 
      email: "admin@demo.com", 
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
      nama: "John Doe", 
      email: "user@demo.com", 
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

// Utility functions
const simulateDelay = (min = 300, max = 800) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

const generateId = (array) => {
  return Math.max(...array.map(item => item.id), 0) + 1;
};

// Mock API functions
const mockLogin = async (email, password) => {
  console.log('🔐 MOCK LOGIN called:', { email, password });
  await simulateDelay();
  
  const user = mockData.users.find(u => u.email === email);
  if (!user) {
    console.log('❌ MOCK LOGIN: User not found');
    throw new Error('User tidak ditemukan');
  }
  
  // Simple password check
  if (password !== 'password123') {
    console.log('❌ MOCK LOGIN: Wrong password');
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
  
  console.log('✅ MOCK LOGIN success:', response);
  return response;
};

const mockRegister = async (userData) => {
  console.log('📝 MOCK REGISTER called:', userData);
  await simulateDelay();
  
  // Check if email already exists
  const existingUser = mockData.users.find(u => u.email === userData.email);
  if (existingUser) {
    console.log('❌ MOCK REGISTER: Email already exists');
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
  
  console.log('✅ MOCK REGISTER success:', response);
  return response;
};

const mockGetWasteHistory = async (userId) => {
  console.log('📋 MOCK GET HISTORY called for user:', userId);
  await simulateDelay();
  
  const userSubmissions = mockData.wasteSubmissions
    .filter(s => s.user_id === parseInt(userId))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
  // Add waste type info to submissions
  const enrichedSubmissions = userSubmissions.map(submission => {
    const wasteType = mockData.wasteTypes.find(w => w.id === submission.waste_type_id);
    return {
      ...submission,
      waste_type: wasteType
    };
  });
  
  console.log('✅ MOCK GET HISTORY success:', enrichedSubmissions);
  return {
    success: true,
    data: enrichedSubmissions,
    message: "Riwayat berhasil diambil"
  };
};

const mockGetUserStats = async (userId) => {
  console.log('📊 MOCK GET STATS called for user:', userId);
  await simulateDelay();
  
  const userSubmissions = mockData.wasteSubmissions.filter(s => s.user_id === parseInt(userId));
  const totalEarnings = userSubmissions.reduce((sum, s) => sum + s.total_price, 0);
  const totalWeight = userSubmissions.reduce((sum, s) => sum + s.weight, 0);
  
  const stats = {
    total_earnings: totalEarnings,
    submission_count: userSubmissions.length,
    total_weight: totalWeight,
    environmental_impact: {
      co2_reduced: totalWeight * 1.2,
      trees_saved: Math.floor(totalWeight * 0.1)
    }
  };
  
  console.log('✅ MOCK GET STATS success:', stats);
  return {
    success: true,
    data: stats,
    message: "Stats berhasil diambil"
  };
};

// Helper function untuk real API request
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    console.log('🌐 REAL API Request:', { url, method: config.method || 'GET' });
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ REAL API Response:', data);
    return data;
  } catch (error) {
    console.error('❌ REAL API Request failed:', error);
    throw error;
  }
};

// Main API object
export const api = {
  // Auth endpoints
  auth: {
    login: async (credentials) => {
      console.log('🔑 API AUTH LOGIN called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        return await mockLogin(credentials.email, credentials.password);
      }
      return apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
    },
    
    register: async (userData) => {
      console.log('📝 API AUTH REGISTER called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        return await mockRegister(userData);
      }
      return apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    },
    
    logout: async () => {
      console.log('🚪 API AUTH LOGOUT called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        console.log('✅ MOCK LOGOUT success');
        return {
          success: true,
          message: "Logout berhasil"
        };
      }
      return apiRequest('/auth/logout', {
        method: 'POST'
      });
    },
    
    verifyToken: async () => {
      console.log('🔍 API AUTH VERIFY TOKEN called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        const token = localStorage.getItem('token');
        console.log('🔍 MOCK VERIFY TOKEN:', { token: token ? 'exists' : 'null' });
        
        if (!token || !token.startsWith('mock-jwt-token')) {
          throw new Error('Token tidak valid');
        }
        
        return {
          success: true,
          data: { valid: true, user: mockData.users[0] },
          message: "Token valid"
        };
      }
      return apiRequest('/auth/verify');
    }
  },

  // User endpoints
  user: {
    getProfile: async (userId) => {
      console.log('👤 API USER GET PROFILE called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        await simulateDelay();
        const user = mockData.users.find(u => u.id === parseInt(userId)) || mockData.users[0];
        console.log('✅ MOCK GET PROFILE success:', user);
        return {
          success: true,
          data: user,
          message: "Profile berhasil diambil"
        };
      }
      return apiRequest('/user/profile');
    },
    
    updateProfile: async (userId, data) => {
      console.log('✏️ API USER UPDATE PROFILE called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        await simulateDelay();
        const userIndex = mockData.users.findIndex(u => u.id === parseInt(userId));
        if (userIndex !== -1) {
          mockData.users[userIndex] = { ...mockData.users[userIndex], ...data };
        }
        console.log('✅ MOCK UPDATE PROFILE success');
        return {
          success: true,
          data: mockData.users[userIndex] || mockData.users[0],
          message: "Profile berhasil diupdate"
        };
      }
      return apiRequest('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    },
    
    getStats: async (userId) => {
      console.log('📊 API USER GET STATS called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        return await mockGetUserStats(userId);
      }
      return apiRequest('/user/stats');
    }
  },

  // Waste endpoints
  waste: {
    getTypes: async () => {
      console.log('🗑️ API WASTE GET TYPES called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        await simulateDelay();
        console.log('✅ MOCK GET WASTE TYPES success:', mockData.wasteTypes);
        return {
          success: true,
          data: mockData.wasteTypes,
          message: "Jenis sampah berhasil diambil"
        };
      }
      return apiRequest('/waste/types');
    },
    
    submitWaste: async (data) => {
      console.log('📤 API WASTE SUBMIT called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        await simulateDelay();
        
        const wasteType = mockData.wasteTypes.find(w => w.id === data.waste_type_id);
        if (!wasteType) {
          throw new Error('Jenis sampah tidak ditemukan');
        }
        
        const totalPrice = data.weight * wasteType.price_per_kg;
        
        const newSubmission = {
          id: generateId(mockData.wasteSubmissions),
          user_id: data.user_id,
          waste_type_id: data.waste_type_id,
          weight: data.weight,
          total_price: totalPrice,
          status: 'pending',
          pickup_address: data.pickup_address,
          pickup_date: data.pickup_date,
          notes: data.notes || '',
          created_at: new Date().toISOString()
        };
        
        mockData.wasteSubmissions.push(newSubmission);
        
        console.log('✅ MOCK SUBMIT WASTE success:', newSubmission);
        return {
          success: true,
          data: newSubmission,
          message: "Sampah berhasil disubmit"
        };
      }
      return apiRequest('/waste/submit', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    
    getHistory: async (userId) => {
      console.log('📋 API WASTE GET HISTORY called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        return await mockGetWasteHistory(userId);
      }
      return apiRequest('/waste/history');
    },
    
    calculatePrice: async (wasteTypeId, weight) => {
      console.log('💰 API WASTE CALCULATE PRICE called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        await simulateDelay(100, 200);
        
        const wasteType = mockData.wasteTypes.find(w => w.id === wasteTypeId);
        if (!wasteType) {
          throw new Error('Jenis sampah tidak ditemukan');
        }
        
        const totalPrice = weight * wasteType.price_per_kg;
        
        const result = {
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
        
        console.log('✅ MOCK CALCULATE PRICE success:', result);
        return result;
      }
      return apiRequest('/waste/calculate', {
        method: 'POST',
        body: JSON.stringify({ wasteTypeId, weight })
      });
    }
  },

  // Bank Sampah endpoints
  bankSampah: {
    getAll: async () => {
      console.log('🏦 API BANK SAMPAH GET ALL called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        await simulateDelay();
        console.log('✅ MOCK GET ALL BANK SAMPAH success:', mockData.bankSampah);
        return {
          success: true,
          data: mockData.bankSampah,
          message: "Bank sampah berhasil diambil"
        };
      }
      return apiRequest('/bank-sampah');
    },
    
    getById: async (id) => {
      console.log('🏦 API BANK SAMPAH GET BY ID called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        await simulateDelay();
        const bankSampah = mockData.bankSampah.find(b => b.id === parseInt(id));
        if (!bankSampah) {
          throw new Error('Bank sampah tidak ditemukan');
        }
        console.log('✅ MOCK GET BANK SAMPAH BY ID success:', bankSampah);
        return {
          success: true,
          data: bankSampah,
          message: "Bank sampah berhasil diambil"
        };
      }
      return apiRequest(`/bank-sampah/${id}`);
    },
    
    findNearest: async (coordinates) => {
      console.log('📍 API BANK SAMPAH FIND NEAREST called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
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
        
        console.log('✅ MOCK FIND NEAREST BANK SAMPAH success:', sortedBanks);
        return {
          success: true,
          data: sortedBanks,
          message: "Bank sampah terdekat berhasil ditemukan"
        };
      }
      return apiRequest('/bank-sampah/nearest', {
        method: 'POST',
        body: JSON.stringify(coordinates)
      });
    }
  }
};

// Export default
export default api;

// Log saat module di-load
console.log('🎯 Mock API Module loaded successfully!');