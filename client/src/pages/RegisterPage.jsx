import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.nama.trim()) {
      errors.nama = "Nama lengkap wajib diisi";
    } else if (formData.nama.length < 2) {
      errors.nama = "Nama minimal 2 karakter";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Format email tidak valid";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password wajib diisi";
    } else if (formData.password.length < 6) {
      errors.password = "Password minimal 6 karakter";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Password dan konfirmasi password tidak sama";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await register(formData);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.error || "Gagal mendaftar. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: "",
      });
    }

    // Clear general error
    if (error) setError("");
  };

  const getInputStyle = (fieldName) => ({
    borderColor: validationErrors[fieldName] ? "#ef4444" : "#e5e7eb",
    boxShadow: validationErrors[fieldName]
      ? "0 0 0 3px rgba(239, 68, 68, 0.1)"
      : "none",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: window.innerWidth > 768 ? "1fr 1fr" : "1fr",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {/* Left Side - Branding & Info */}
        <div
          style={{
            display: window.innerWidth <= 768 ? "none" : "block",
            padding: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#10b981",
              borderRadius: "1rem",
              padding: "3rem",
              color: "white",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                marginBottom: "1rem",
              }}
            >
              🌱
            </div>

            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                margin: 0,
              }}
            >
              EcoMarga
            </h1>

            <p
              style={{
                fontSize: "1.125rem",
                marginBottom: "2rem",
                opacity: 0.9,
                lineHeight: 1.6,
              }}
            >
              Platform digital untuk pengelolaan sampah berkelanjutan. Bersama
              membangun masa depan yang lebih hijau.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  textAlign: "center",
                  minWidth: "100px",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  📊
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  1,294+
                </div>
                <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>User</div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  textAlign: "center",
                  minWidth: "100px",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  ♻️
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  5.2
                </div>
                <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>
                  Ton Terkumpul
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "0.5rem",
                padding: "1rem",
                textAlign: "left",
              }}
            >
              <h3
                style={{
                  margin: "0 0 1rem 0",
                  fontSize: "1.125rem",
                }}
              >
                Quick Links
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <Link
                  to="/"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    opacity: 0.8,
                    fontSize: "0.875rem",
                  }}
                >
                  🏠 Beranda
                </Link>
                <Link
                  to="/bank-sampah"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    opacity: 0.8,
                    fontSize: "0.875rem",
                  }}
                >
                  🏪 Bank Sampah
                </Link>
                <Link
                  to="/login"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    opacity: 0.8,
                    fontSize: "0.875rem",
                  }}
                >
                  🔐 Masuk
                </Link>
              </div>
            </div>

            <div
              style={{
                marginTop: "2rem",
                padding: "1rem",
                fontSize: "0.875rem",
                opacity: 0.7,
              }}
            >
              <p style={{ margin: 0 }}>
                📧 info@ecomarga.id
                <br />
                📞 +62 812-3456-7890
                <br />
                📍 Semarang, Jawa Tengah
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "1rem",
            padding: "2.5rem",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              Daftar EcoMarga
            </h2>
            <p
              style={{
                color: "#6b7280",
                fontSize: "1rem",
              }}
            >
              Bergabunglah dan mulai kelola sampah dengan bijak
            </p>
          </div>

          {/* Demo Mode Info */}
          <div
            style={{
              backgroundColor: "#ecfdf5",
              border: "1px solid #10b981",
              borderRadius: "0.5rem",
              padding: "1rem",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div style={{ color: "#059669", fontSize: "1.25rem" }}>💡</div>
            <p
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#059669",
              }}
            >
              <strong>Demo Mode:</strong> Registrasi akan membuat akun sementara
              di browser Anda
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                backgroundColor: "#fee2e2",
                border: "1px solid #fca5a5",
                borderRadius: "0.5rem",
                padding: "1rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <AlertCircle size={20} style={{ color: "#dc2626" }} />
              <span style={{ color: "#dc2626", fontSize: "0.875rem" }}>
                {error}
              </span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#374151",
                  fontSize: "0.875rem",
                }}
              >
                Nama Lengkap *
              </label>
              <div style={{ position: "relative" }}>
                <User
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6b7280",
                  }}
                />
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  style={{
                    width: "100%",
                    padding: "0.875rem 0.875rem 0.875rem 3rem",
                    border: `2px solid`,
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    ...getInputStyle("nama"),
                  }}
                  required
                  disabled={isLoading}
                />
              </div>
              {validationErrors.nama && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.75rem",
                    marginTop: "0.5rem",
                    marginBottom: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <AlertCircle size={12} />
                  {validationErrors.nama}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#374151",
                  fontSize: "0.875rem",
                }}
              >
                Email *
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6b7280",
                  }}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan email Anda"
                  style={{
                    width: "100%",
                    padding: "0.875rem 0.875rem 0.875rem 3rem",
                    border: `2px solid`,
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    ...getInputStyle("email"),
                  }}
                  required
                  disabled={isLoading}
                />
              </div>
              {validationErrors.email && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.75rem",
                    marginTop: "0.5rem",
                    marginBottom: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <AlertCircle size={12} />
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#374151",
                  fontSize: "0.875rem",
                }}
              >
                Password *
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6b7280",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  style={{
                    width: "100%",
                    padding: "0.875rem 3rem 0.875rem 3rem",
                    border: `2px solid`,
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    ...getInputStyle("password"),
                  }}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b7280",
                    padding: "4px",
                  }}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {validationErrors.password && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.75rem",
                    marginTop: "0.5rem",
                    marginBottom: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <AlertCircle size={12} />
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div style={{ marginBottom: "2rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#374151",
                  fontSize: "0.875rem",
                }}
              >
                Konfirmasi Password *
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6b7280",
                  }}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Konfirmasi password"
                  style={{
                    width: "100%",
                    padding: "0.875rem 3rem 0.875rem 3rem",
                    border: `2px solid`,
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    ...getInputStyle("confirmPassword"),
                  }}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#6b7280",
                    padding: "4px",
                  }}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.75rem",
                    marginTop: "0.5rem",
                    marginBottom: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <AlertCircle size={12} />
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: isLoading ? "#6b7280" : "#10b981",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.875rem 1.5rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
              disabled={isLoading}
              onMouseEnter={(e) =>
                !isLoading && (e.target.style.backgroundColor = "#059669")
              }
              onMouseLeave={(e) =>
                !isLoading && (e.target.style.backgroundColor = "#10b981")
              }
            >
              {isLoading ? (
                <>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid transparent",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                  Mendaftar...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Daftar Sekarang
                </>
              )}
            </button>

            {/* Login Link */}
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  margin: 0,
                }}
              >
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#10b981",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  Masuk di sini
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Add keyframes for loading animation */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
