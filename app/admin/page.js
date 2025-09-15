"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem("adminToken");
    const admin = localStorage.getItem("adminData");

    if (!token || !admin) {
      router.push("/login");
      return;
    }

    // Verify token with backend
    verifyToken();
  }, [router]);

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/auth/verify", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setAdminData(data.admin);
      } else {
        // Token is invalid, redirect to login
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        router.push("/login");
      }
    } catch (error) {
      console.error("Token verification error:", error);
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('adminLogout'));
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (!adminData) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      height: '100vh',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                height: '48px',
                width: '48px',
                background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(147, 51, 234, 0.3)'
              }}>
                <svg style={{ height: '24px', width: '24px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 style={{
                  fontSize: '30px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0 0 4px 0'
                }}>
                  Admin Dashboard
                </h1>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: '0'
                }}>Welcome back, {adminData.name}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link 
                href="/" 
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  transform: 'scale(1)',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
                }}
              >
                <svg style={{ height: '16px', width: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </Link>
              
              <button
                onClick={handleLogout}
                style={{
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  transform: 'scale(1)',
                  boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                }}
              >
                <svg style={{ height: '16px', width: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 80px)',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #9333ea, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 16px 0'
          }}>
            Welcome, {adminData.name}!
          </h2>
          
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Manage your projects and system efficiently
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: '16px 24px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s',
              transform: 'scale(1)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.background = 'linear-gradient(135deg, #059669, #047857)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            }}
            >
              <svg style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Project</span>
            </button>
            
            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              padding: '16px 24px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s',
              transform: 'scale(1)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
            }}
            >
              <svg style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <span>Check Projects</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
