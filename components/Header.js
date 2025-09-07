"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en"); // 'en' or 'ar'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const selectLanguage = (lang) => {
    setCurrentLanguage(lang);
    setIsLanguageOpen(false);
    // Here you would typically handle language change in your app
    // For now, we're just updating the state
  };

  return (
    <header
      id="header"
      className={`header d-flex align-items-center fixed-top ${
        isScrolled ? "sticked" : ""
      }`}
    >
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link href="/" className="logo d-flex align-items-center me-auto">
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
                Home
              </Link>
            </li>
            <li>
              <Link href="/#about" className="no-underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/#services" className="no-underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="/#portfolio" className="no-underline">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="no-underline">
                Contact
              </Link>
            </li>
          </ul>
          <i
            className={`mobile-nav-toggle d-xl-none ${
              isMobileNavOpen ? "bi-x" : "bi-list"
            }`}
            onClick={toggleMobileNav}
          ></i>
        </nav>

        {/* Language Selector */}
        <div
          className="language-selector dropdown mx-3"
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
            <span>{currentLanguage === "en" ? "English" : "العربية"}</span>
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
                  English
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
                  العربية
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
