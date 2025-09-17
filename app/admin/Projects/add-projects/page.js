"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddProjectPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/login");
        return;
      }

      
      let imageUrl = "";
      if (formData.image) {
        const imageFormData = new FormData();
        imageFormData.append("image", formData.image);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        });

        const uploadData = await uploadResponse.json();
        if (!uploadData.success) {
          throw new Error(uploadData.message || "Image upload failed");
        }
        imageUrl = uploadData.imageUrl;
      }

      
      const projectData = {
        name: formData.name,
        description: formData.description,
        image: imageUrl
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Project added successfully!");
        setFormData({ name: "", description: "", image: null });
        setImagePreview(null);
        
        const fileInput = document.getElementById("image");
        if (fileInput) fileInput.value = "";
      } else {
        setError(data.message || "Failed to add project");
      }
    } catch (error) {
      console.error("Add project error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        padding: '20px'
      }}>
        {/* Header */}
        <header style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
          marginBottom: '30px',
          border: '1px solid rgba(229, 231, 235, 0.5)'
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link 
                  href="/admin"
                  style={{
                    background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg style={{ height: '16px', width: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboard
                </Link>
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0'
                }}>
                  Add New Project
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '40px'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Project Name */}
              <div>
                <label htmlFor="name" style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Project Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    background: 'rgba(255, 255, 255, 0.8)'
                  }}
                  placeholder="Enter project name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#9333ea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="description" style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Project Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    background: 'rgba(255, 255, 255, 0.8)',
                    resize: 'vertical',
                    minHeight: '120px'
                  }}
                  placeholder="Enter project description"
                  value={formData.description}
                  onChange={handleChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#9333ea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Project Image */}
              <div>
                <label htmlFor="image" style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Project Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    background: 'rgba(255, 255, 255, 0.8)'
                  }}
                  onChange={handleImageChange}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#9333ea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                
                {/* Image Preview */}
                {imagePreview && (
                  <div style={{ marginTop: '16px' }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: '200px',
                        maxHeight: '200px',
                        borderRadius: '12px',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#dc2626',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <svg style={{ height: '20px', width: '20px', marginRight: '8px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#059669',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <svg style={{ height: '20px', width: '20px', marginRight: '8px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                <Link 
                  href="/admin"
                  style={{
                    background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  Cancel
                </Link>
                
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? 'rgba(147, 51, 234, 0.7)' : 'linear-gradient(135deg, #9333ea, #ec4899)',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 25px rgba(147, 51, 234, 0.3)'
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" style={{ height: '20px', width: '20px' }} xmlns="http:
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Project
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

