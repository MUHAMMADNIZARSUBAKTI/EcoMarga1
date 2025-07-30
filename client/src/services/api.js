const USE_MOCK_API = true; // Set to false when backend is ready
const API_BASE_URL = 'http://localhost:3001/api'; // Backend URL

// Utility functions
const simulateDelay = (min = 300, max = 800) => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * (max - min) + min);
  });
};

const generateId = (array) => {
  if (!Array.isArray(array) || array.length === 0) return 1;
  return Math.max(...array.map(item => item.id || 0), 0) + 1;
};

// Improved apiRequest function with better error handling
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
  if (token && !token.startsWith('mock-')) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    console.log('🌐 REAL API Request:', { url, method: config.method || 'GET' });
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ REAL API Response:', data);
    return data;
  } catch (error) {
    console.error('❌ REAL API Request failed:', error);
    // Re-throw with more specific error message
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Gagal terhubung ke server. Periksa koneksi internet Anda.');
    }
    throw error;
  }
};

// Improved mock functions with better error handling
const mockLogin = async (email, password) => {
  console.log('🔐 MOCK LOGIN called:', { email, password });
  
  try {
    await simulateDelay();
    
    if (!email || !password) {
      throw new Error('Email dan password harus diisi');
    }
    
    const user = mockData.users.find(u => u.email === email);
    if (!user) {
      console.log('❌ MOCK LOGIN: User not found');
      throw new Error('Email tidak terdaftar');
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
  } catch (error) {
    console.error('❌ MOCK LOGIN error:', error);
    throw error;
  }
};

const mockRegister = async (userData) => {
  console.log('📝 MOCK REGISTER called:', userData);
  
  try {
    await simulateDelay();
    
    if (!userData.email || !userData.nama) {
      throw new Error('Data tidak lengkap');
    }
    
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
  } catch (error) {
    console.error('❌ MOCK REGISTER error:', error);
    throw error;
  }
};

// Mock data dengan data yang lebih lengkap
const mockData = {
  users: [
    {
      id: 1,
      nama: "John Doe",
      email: "john@example.com",
      phone: "+62 812-3456-7890",
      address: "Jl. Contoh No. 123, Semarang",
      role: "user",
      join_date: "2024-01-01",
      ewallet_accounts: {
        dana: "081234567890",
        ovo: "081234567890", 
        gopay: "081234567890"
      },
      created_at: "2024-01-01T00:00:00Z"
    },
    {
      id: 2,
      nama: "Admin User",
      email: "admin@example.com",
      phone: "+62 812-9999-8888",
      address: "Jl. Admin No. 456, Semarang",
      role: "admin",
      join_date: "2024-01-01",
      ewallet_accounts: {
        dana: "",
        ovo: "",
        gopay: ""
      },
      created_at: "2024-01-01T00:00:00Z"
    }
  ],
  
  wasteTypes: [
    {
      id: 1,
      name: "Plastik",
      price_per_kg: 2000,
      description: "Botol plastik, kemasan plastik, dll",
      category: "plastic"
    },
    {
      id: 2,
      name: "Kertas",
      price_per_kg: 1500,
      description: "Kertas bekas, kardus, koran, dll",
      category: "paper"
    },
    {
      id: 3,
      name: "Logam",
      price_per_kg: 5000,
      description: "Kaleng, aluminium, besi, dll",
      category: "metal"
    }
  ],
  
  wasteSubmissions: [
    {
      id: 1,
      user_id: 1,
      waste_type_id: 1,
      weight: 2.5,
      total_price: 5000,
      location: "Jl. Contoh No. 123, Semarang",
      notes: "Botol plastik bekas",
      photos: [],
      status: "completed",
      pickup_date: "2025-01-20",
      created_at: "2025-01-18T10:00:00Z"
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
    }
  ]
};

// Main API object with improved error handling
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
      }
      return apiRequest('/user/stats');
    }
  },

  // Waste endpoints
  waste: {
    getTypes: async () => {
      console.log('🗂️ API WASTE GET TYPES called, useMock:', USE_MOCK_API);
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
    
    submit: async (submissionData) => {
      console.log('📤 API WASTE SUBMIT called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
        await simulateDelay();
        
        const newSubmission = {
          id: generateId(mockData.wasteSubmissions),
          ...submissionData,
          status: 'pending',
          created_at: new Date().toISOString()
        };
        
        mockData.wasteSubmissions.push(newSubmission);
        
        console.log('✅ MOCK WASTE SUBMIT success:', newSubmission);
        return {
          success: true,
          data: newSubmission,
          message: "Sampah berhasil disubmit"
        };
      }
      return apiRequest('/waste/submit', {
        method: 'POST',
        body: JSON.stringify(submissionData)
      });
    },
    
    getHistory: async (userId) => {
      console.log('📋 API WASTE GET HISTORY called, useMock:', USE_MOCK_API);
      if (USE_MOCK_API) {
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
      }
      return apiRequest(`/waste/history/${userId}`);
    }
  }
};

export default api;