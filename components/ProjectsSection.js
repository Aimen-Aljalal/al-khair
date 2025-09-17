"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';

export default function ProjectsSection() {
  const { t } = useTranslation('common');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [displayCount, setDisplayCount] = useState(6);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects/public");
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

  const toggleDescription = (projectId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const truncateDescription = (description, maxLength = 120) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 6, projects.length));
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">{t('projects.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-info" role="alert">
          {t('projects.noProjects')}
        </div>
      </div>
    );
  }

  const displayedProjects = projects.slice(0, displayCount);
  const hasMore = displayCount < projects.length;

  return (
    <>
      <div className="row gy-4">
        {displayedProjects.map((project, index) => (
          <div
            key={project._id}
            className="col-xl-4 col-md-6"
            data-aos="fade-up"
            data-aos-delay={100 * (index + 1)}
          >
            <div
              className="project-item position-relative"
              style={{
                background: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
              }}
            >
              {/* Project Image */}
              {project.image && (
                <div
                  style={{
                    height: "250px",
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative"
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      background: "rgba(0, 0, 0, 0.7)",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}
                  >
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              )}

              {/* Project Content */}
              <div style={{ padding: "25px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h4
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "600",
                    marginBottom: "15px",
                    color: "#333",
                    fontSize: "1.25rem"
                  }}
                >
                  {project.name}
                </h4>

                <p
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    color: "#666",
                    marginBottom: "20px",
                    flex: 1
                  }}
                >
                  {expandedDescriptions[project._id] 
                    ? project.description 
                    : truncateDescription(project.description)
                  }
                </p>

                {/* View More Button */}
                <div style={{ marginTop: "auto" }}>
                  <Link
                    href={`/${project._id}/project`}
                    style={{
                      background: "linear-gradient(135deg, #28a745, #20c997)",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "25px",
                      fontSize: "14px",
                      fontWeight: "500",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 15px rgba(40, 167, 69, 0.3)"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #20c997, #17a2b8)";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "linear-gradient(135deg, #28a745, #20c997)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <i className="bi bi-eye"></i>
                    {t('projects.viewDetails')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-5" data-aos="fade-up">
          <button
            onClick={loadMore}
            style={{
              background: "linear-gradient(135deg, #007bff, #0056b3)",
              color: "white",
              padding: "12px 30px",
              borderRadius: "25px",
              fontSize: "16px",
              fontWeight: "500",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(135deg, #0056b3, #004085)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "linear-gradient(135deg, #007bff, #0056b3)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="bi bi-arrow-down-circle me-2"></i>
            {t('projects.loadMore')} ({projects.length - displayCount} {t('projects.remaining')})
          </button>
        </div>
      )}
    </>
  );
}
