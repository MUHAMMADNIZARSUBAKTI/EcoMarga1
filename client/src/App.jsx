import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboarPage";
import SubmitWastePage from "./pages/SubmitWastePage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import BankSampah from "./pages/BankSampah";
import AdminDashboard from "./pages/AdminDashboard";

// Context Providers
import AuthProvider from "./context/AuthContext";
import UserProvider from "./context/UserContext";

// Styles
import "./index.css";

// Conditional Header Component
const ConditionalHeader = () => {
  const location = useLocation();
  
  // Halaman yang tidak memerlukan header
  const noHeaderRoutes = ['/login', '/register'];
  
  if (noHeaderRoutes.includes(location.pathname)) {
    return null;
  }
  
  return <Header />;
};

// Conditional Footer Component  
const ConditionalFooter = () => {
  const location = useLocation();
  
  // Halaman yang tidak memerlukan footer
  const noFooterRoutes = ['/login', '/register', '/dashboard', '/submit', '/history', '/profile'];
  
  if (noFooterRoutes.some(route => location.pathname.startsWith(route))) {
    return null;
  }
  
  return <Footer />;
};

// 404 Not Found Component
const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
      textAlign: 'center'
    }}>
      <div>
        <div style={{ fontSize: '6rem', marginBottom: '2rem', opacity: 0.7 }}>🔍</div>
        <h1 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '1rem', fontWeight: 700 }}>
          404 - Halaman Tidak Ditemukan
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
          Halaman yang Anda cari tidak dapat ditemukan.
        </p>
        <a 
          href="/" 
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'all 0.3s ease'
          }}
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="app" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            width: '100%',
            margin: 0,
            padding: 0
          }}>
            {/* Header - Conditional */}
            <ConditionalHeader />
            
            {/* Main Content - No Sidebar */}
            <main className="main-content" style={{ 
              flex: 1, 
              width: '100%',
              marginLeft: 0,
              paddingLeft: 0
            }}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/bank-sampah" element={<BankSampah />} />

                {/* Protected User Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/submit" 
                  element={
                    <ProtectedRoute>
                      <SubmitWastePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/history" 
                  element={
                    <ProtectedRoute>
                      <HistoryPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />

                {/* Protected Admin Routes */}
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer - Conditional */}
            <ConditionalFooter />
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;