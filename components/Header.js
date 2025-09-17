"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en"); // 'en' or 'ar'
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const router = useRouter();

  // Update document direction based on language
  useEffect(() => {
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if admin is logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        setIsAdminLoggedIn(true);
      } else {
        setIsAdminLoggedIn(false);
      }
    };

    // Check on mount
    checkAuthStatus();

    // Listen for storage changes (when login/logout happens in other tabs)
    window.addEventListener('storage', checkAuthStatus);

    // Listen for custom events (when login/logout happens in same tab)
    window.addEventListener('adminLogin', checkAuthStatus);
    window.addEventListener('adminLogout', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener('adminLogin', checkAuthStatus);
      window.removeEventListener('adminLogout', checkAuthStatus);
    };
  }, []);

  // Handle mobile navigation body class
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.classList.add('mobile-nav-active');
    } else {
      document.body.classList.remove('mobile-nav-active');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mobile-nav-active');
    };
  }, [isMobileNavOpen]);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const selectLanguage = (lang) => {
    setCurrentLanguage(lang);
    setIsLanguageOpen(false);
    i18n.changeLanguage(lang);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn(false);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('adminLogout'));
    router.push("/");
  };

  return (
    <header
      id="header"
      className={`header d-flex align-items-center fixed-top ${
        isScrolled ? "sticked" : ""
      }`}
    >
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link href="/" className={`logo d-flex align-items-center ${currentLanguage === 'ar' ? 'ms-auto' : 'me-auto'}`}>
          <Image
            src="/img/logo.jpg" // مسار الصورة داخل مجلد public
            alt="Logo"
            width={250}
            height={135}
            priority
          />
        </Link>

        <nav
          id="navmenu"
          className={`navmenu ${isMobileNavOpen ? "navbar-mobile" : ""}`}
        >
          <ul>
            <li>
              <Link href="/#hero" className="active no-underline">
                {t('navigation.home')}
              </Link>
            </li>
            <li>
              <Link href="/#about" className="no-underline">
                {t('navigation.about')}
              </Link>
            </li>
            <li>
              <Link href="/#services" className="no-underline">
                {t('navigation.services')}
              </Link>
            </li>
            <li>
              <Link href="/#projects" className="no-underline">
                {t('navigation.portfolio')}
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="no-underline">
                {t('navigation.contact')}
              </Link>
            </li>
            {isAdminLoggedIn && (
              <li>
                <Link href="/admin" className="no-underline" style={{
                  background: 'linear-gradient(135deg, #9333ea, #ec4899)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: '500',
                  transition: 'all 0.3s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 4px 15px rgba(147, 51, 234, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  {t('navigation.dashboard')}
                </Link>
              </li>
            )}
            {isAdminLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontWeight: '500',
                    transition: 'all 0.3s',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {t('navigation.logout')}
                </button>
              </li>
            )}
            {/* Language Selector for Mobile */}
            <li className="mobile-language-selector d-xl-none">
              <div className="language-dropdown-mobile">
                <button
                  className="language-toggle-mobile"
                  onClick={toggleLanguage}
                >
                  <i className="bi bi-globe me-2"></i>
                  <span>{currentLanguage === "en" ? t('language.english') : t('language.arabic')}</span>
                  <i className="bi bi-chevron-down ms-2"></i>
                </button>
                {isLanguageOpen && (
                  <ul className="language-options-mobile">
                    <li>
                      <button
                        className={`language-option ${
                          currentLanguage === "en" ? "active" : ""
                        }`}
                        onClick={() => selectLanguage("en")}
                      >
                        {t('language.english')}
                      </button>
                    </li>
                    <li>
                      <button
                        className={`language-option ${
                          currentLanguage === "ar" ? "active" : ""
                        }`}
                        onClick={() => selectLanguage("ar")}
                      >
                        {t('language.arabic')}
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
          <i
            className={`mobile-nav-toggle d-xl-none ${
              isMobileNavOpen ? "bi-x" : "bi-list"
            }`}
            onClick={toggleMobileNav}
          ></i>
        </nav>

        {/* Language Selector - Desktop Only */}
        <div
          className={`language-selector dropdown mx-3 d-none d-xl-block ${currentLanguage === 'ar' ? 'order-first' : ''}`}
          style={{ position: "relative" }}
        >
          <button
            className="btn btn-link text-dark d-flex align-items-center"
            onClick={toggleLanguage}
            style={{
              textDecoration: "none",
              padding: "8px 15px",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            <i className="bi bi-globe me-1"></i>
            <span>{currentLanguage === "en" ? t('language.english') : t('language.arabic')}</span>
            <i className="bi bi-chevron-down ms-1"></i>
          </button>
          {isLanguageOpen && (
            <ul
              className="dropdown-menu show"
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                minWidth: "120px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
                borderRadius: "4px",
                padding: "0.5rem 0",
                zIndex: 1000,
                marginTop: "5px",
              }}
            >
              <li>
                <button
                  className={`dropdown-item ${
                    currentLanguage === "en" ? "active" : ""
                  }`}
                  onClick={() => selectLanguage("en")}
                  style={{
                    padding: "8px 15px",
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  {t('language.english')}
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item ${
                    currentLanguage === "ar" ? "active" : ""
                  }`}
                  onClick={() => selectLanguage("ar")}
                  style={{
                    padding: "8px 15px",
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  {t('language.arabic')}
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
