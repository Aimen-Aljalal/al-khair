"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/projects", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      } else {
        setError(data.message || "Failed to fetch projects");
      }
    } catch (error) {
      console.error("Fetch projects error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setProjects(projects.filter(project => project._id !== projectId));
      } else {
        alert(data.message || "Failed to delete project");
      }
    } catch (error) {
      console.error("Delete project error:", error);
      alert("Network error. Please try again.");
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setEditFormData({
      name: project.name,
      description: project.description,
      image: null
    });
    setImagePreview(project.image);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormData({
        ...editFormData,
        image: file
      });
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("adminToken");
      let imageUrl = editingProject.image;

      
      if (editFormData.image) {
        const imageFormData = new FormData();
        imageFormData.append("image", editFormData.image);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          imageUrl = uploadData.imageUrl;
        }
      }

      const projectData = {
        name: editFormData.name,
        description: editFormData.description,
        image: imageUrl
      };

      const response = await fetch(`/api/projects/${editingProject._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (data.success) {
        
        setProjects(projects.map(project => 
          project._id === editingProject._id 
            ? { ...project, ...data.project }
            : project
        ));
        setEditingProject(null);
        setEditFormData({ name: "", description: "", image: null });
        setImagePreview(null);
      } else {
        alert(data.message || "Failed to update project");
      }
    } catch (error) {
      console.error("Update project error:", error);
      alert("Network error. Please try again.");
    }
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setEditFormData({ name: "", description: "", image: null });
    setImagePreview(null);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #9333ea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#6b7280', fontSize: '18px' }}>Loading projects...</p>
        </div>
      </div>
    );
  }

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
                  All Projects
                </h1>
              </div>
              
              <Link 
                href="/admin/Projects/add-projects"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
                }}
              >
                <svg style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Project
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#dc2626',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <svg style={{ height: '20px', width: '20px', marginRight: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {projects.length === 0 ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '60px 40px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <svg style={{ height: '40px', width: '40px', color: '#9ca3af' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '12px'
              }}>
                No Projects Found
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                marginBottom: '24px'
              }}>
                Start by adding your first project
              </p>
              <Link 
                href="/admin/Projects/add-projects"
                style={{
                  background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 25px rgba(147, 51, 234, 0.3)'
                }}
              >
                <svg style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add First Project
              </Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '24px'
            }}>
              {projects.map((project) => (
                <div key={project._id} style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                }}
                >
                  {/* Project Image */}
                  {project.image && (
                    <div style={{
                      height: '200px',
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {new Date(project.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Project Content */}
                  <div style={{ padding: '24px' }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#111827',
                      marginBottom: '12px',
                      lineHeight: '1.4'
                    }}>
                      {project.name}
                    </h3>
                    
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      lineHeight: '1.6',
                      marginBottom: '20px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {project.description}
                    </p>
                    
                    {/* Actions */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'flex-end'
                    }}>
                      <button
                        onClick={() => handleEditProject(project)}
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.2s',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                        }}
                      >
                        <svg style={{ height: '16px', width: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        style={{
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.2s',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                        }}
                      >
                        <svg style={{ height: '16px', width: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Edit Project Modal */}
        {editingProject && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                Edit Project
              </h2>

              <form onSubmit={handleUpdateProject} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Project Name */}
                <div>
                  <label htmlFor="edit-name" style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Project Name *
                  </label>
                  <input
                    id="edit-name"
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
                      transition: 'all 0.2s'
                    }}
                    placeholder="Enter project name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                  />
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="edit-description" style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Project Description *
                  </label>
                  <textarea
                    id="edit-description"
                    name="description"
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      resize: 'vertical'
                    }}
                    placeholder="Enter project description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                  />
                </div>

                {/* Project Image */}
                <div>
                  <label htmlFor="edit-image" style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Project Image
                  </label>
                  <input
                    id="edit-image"
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
                      transition: 'all 0.2s'
                    }}
                    onChange={handleEditImageChange}
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

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    style={{
                      background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'all 0.2s',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'all 0.2s',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(147, 51, 234, 0.3)'
                    }}
                  >
                    Update Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

