"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminData", JSON.stringify(data.admin));

        window.dispatchEvent(new CustomEvent("adminLogin"));

        router.push("/admin");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0",
          margin: "0",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "448px", width: "100%" }}>
          {/* Login Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
              padding: "32px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div
                style={{
                  margin: "0 auto",
                  height: "64px",
                  width: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #a855f7, #ec4899)",
                  boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)",
                  marginBottom: "24px",
                }}
              >
                <svg
                  style={{ height: "32px", width: "32px", color: "white" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2
                style={{
                  marginTop: "24px",
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "white",
                  margin: "0 0 8px 0",
                }}
              >
                Admin Portal
              </h2>
              <p
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "#d1d5db",
                  margin: "0",
                }}
              >
                Sign in to access the admin dashboard
              </p>
            </div>

            {/* Form */}
            <form
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
              onSubmit={handleSubmit}
            >
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#e5e7eb",
                    marginBottom: "8px",
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "12px",
                      transform: "translateY(-50%)",
                      display: "flex",
                      alignItems: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <svg
                      style={{
                        height: "20px",
                        width: "20px",
                        color: "#9ca3af",
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    style={{
                      display: "block",
                      width: "100%",
                      paddingLeft: "40px",
                      paddingRight: "12px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      border: "1px solid rgba(156, 163, 175, 0.3)",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.2s",
                    }}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#a855f7";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(168, 85, 247, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(156, 163, 175, 0.3)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#e5e7eb",
                    marginBottom: "8px",
                  }}
                >
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "12px",
                      transform: "translateY(-50%)",
                      display: "flex",
                      alignItems: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <svg
                      style={{
                        height: "20px",
                        width: "20px",
                        color: "#9ca3af",
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    style={{
                      display: "block",
                      width: "100%",
                      paddingLeft: "40px",
                      paddingRight: "48px",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      border: "1px solid rgba(156, 163, 175, 0.3)",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "white",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.2s",
                    }}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#a855f7";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(168, 85, 247, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(156, 163, 175, 0.3)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "12px",
                      transform: "translateY(-50%)",
                      display: "flex",
                      alignItems: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        style={{
                          height: "20px",
                          width: "20px",
                          color: "#9ca3af",
                        }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        style={{
                          height: "20px",
                          width: "20px",
                          color: "#9ca3af",
                        }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  style={{
                    background: "rgba(239, 68, 68, 0.2)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#fecaca",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "8px",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: "12px 16px",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "white",
                    background: loading
                      ? "rgba(168, 85, 247, 0.7)"
                      : "linear-gradient(135deg, #9333ea, #ec4899)",
                    cursor: loading ? "not-allowed" : "pointer",
                    outline: "none",
                    transition: "all 0.2s",
                    transform: loading ? "none" : "scale(1)",
                    opacity: loading ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.transform = "scale(1.05)";
                      e.target.style.background =
                        "linear-gradient(135deg, #7c3aed, #db2777)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.transform = "scale(1)";
                      e.target.style.background =
                        "linear-gradient(135deg, #9333ea, #ec4899)";
                    }
                  }}
                >
                  {loading ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <svg
                        className="animate-spin"
                        style={{
                          marginRight: "12px",
                          height: "20px",
                          width: "20px",
                          color: "white",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          style={{ opacity: 0.25 }}
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          style={{ opacity: 0.75 }}
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <svg
                        style={{
                          height: "20px",
                          width: "20px",
                          marginRight: "8px",
                        }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign In
                    </div>
                  )}
                </button>
              </div>

              {/* Back to Home */}
              <div style={{ textAlign: "center" }}>
                <Link
                  href="/"
                  style={{
                    color: "#d1d5db",
                    fontSize: "14px",
                    fontWeight: "500",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#d1d5db";
                  }}
                >
                  <svg
                    style={{
                      height: "16px",
                      width: "16px",
                      marginRight: "8px",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "14px",
                margin: "0",
              }}
            >
              © 2024 Al-Khair Admin Portal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
