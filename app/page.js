"use client";

import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import AOS from "aos";
import ProjectsSection from "../components/ProjectsSection";

export default function Home() {
  const { t, i18n } = useTranslation("common");
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en");

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Tajawal:wght@200;300;400;500;700;800;900&family=Scheherazade+New:wght@400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Pacifico&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  const isotopeRef = useRef(null);
  const swiperRef = useRef(null);
  const [screenSize, setScreenSize] = useState("desktop");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("https://khair-backend-n1g8.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getResponsiveImage = () => {
    if (screenSize === "mobile") {
      return "/img/header-mobile.png";
    } else if (screenSize === "tablet") {
      return "/img/header-tablet.png";
    } else {
      return "/img/header-pc.png";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setScreenSize("mobile");
      } else if (width < 850) {
        setScreenSize("tablet");
      } else if (width < 1100) {
        setScreenSize("medium");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    const initIsotope = async () => {
      if (typeof window !== "undefined") {
        const Isotope = (await import("isotope-layout")).default;
        const imagesLoaded = (await import("imagesloaded")).default;

        const portfolioContainer = document.querySelector(
          ".portfolio .isotope-container"
        );
        if (portfolioContainer && !isotopeRef.current) {
          imagesLoaded(portfolioContainer, function () {
            isotopeRef.current = new Isotope(portfolioContainer, {
              itemSelector: ".isotope-item",
              layoutMode: "masonry",
            });

            document
              .querySelectorAll(".portfolio .isotope-filters li")
              .forEach((button) => {
                button.addEventListener("click", function (e) {
                  e.preventDefault();
                  const filterValue = this.getAttribute("data-filter");

                  document
                    .querySelector(".portfolio .isotope-filters .filter-active")
                    .classList.remove("filter-active");
                  this.classList.add("filter-active");

                  isotopeRef.current.arrange({
                    filter: filterValue,
                  });
                });
              });
          });
        }
      }
    };

    initIsotope();

    return () => {
      window.removeEventListener("resize", handleResize);

      if (swiperRef.current) {
        swiperRef.current.destroy();
        swiperRef.current = null;
      }
      if (isotopeRef.current) {
        isotopeRef.current.destroy();
        isotopeRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="h-screen min-h-screen grid grid-cols-12 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getResponsiveImage()})`,
        }}
      >
        {/* Text Content - Columns 7-12 on desktop, full width on mobile */}
        <div className="col-span-12 md:col-start-7 md:col-end-12 flex items-center justify-center md:justify-end p-4 md:p-8">
          <div
            className="text-center md:text-right text-white"
            style={{
              marginLeft:
                screenSize === "mobile"
                  ? currentLanguage === "ar" ? "50px" : "80px"
                  : screenSize === "tablet"
                  ? currentLanguage === "ar" ? "100px" : "150px"
                  : screenSize === "medium"
                  ? currentLanguage === "ar" ? "200px" : "250px"
                  : currentLanguage === "ar" ? "300px" : "350px",
              marginTop:
                screenSize === "mobile"
                  ? currentLanguage === "ar" ? "0px" : "60px"
                  : screenSize === "tablet"
                  ? currentLanguage === "ar" ? "0px" : "40px"
                  : screenSize === "medium"
                  ? currentLanguage === "ar" ? "0px" : "30px"
                  : "0px",
            }}
          >
            <h1
              className={`font-black leading-tight ${
                currentLanguage === "ar"
                  ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                  : screenSize === "mobile"
                  ? "text-xl sm:text-2xl"
                  : screenSize === "tablet"
                  ? "text-2xl sm:text-3xl md:text-4xl"
                  : screenSize === "medium"
                  ? "text-2xl sm:text-3xl md:text-4xl"
                  : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
              }`}
              style={{
                fontFamily:
                  currentLanguage === "ar"
                    ? "'Noto Naskh Arabic', 'Cairo', 'Tajawal', 'Arial Black', sans-serif"
                    : "'Arial Black', 'Helvetica Neue', sans-serif",
                letterSpacing: "0.5px",
                marginBottom: "50px",
              }}
            >
              <span
                style={{
                  fontFamily:
                    currentLanguage === "ar"
                      ? "'Noto Naskh Arabic', 'Cairo', 'Tajawal', sans-serif"
                      : "'Arial Black', 'Helvetica Neue', sans-serif",
                  fontSize: "1.4em",
                  letterSpacing: currentLanguage === "ar" ? "1.5px" : "0.5px",
                  color: "white",
                }}
              >
                <span
                  style={{
                    fontWeight: "700",
                    letterSpacing: currentLanguage === "ar" ? "0.3em" : "0.2em",
                  }}
                >
                  {t("sections.hero.companyName")}
                </span>{" "}
                <span style={{ fontWeight: "400" }}>
                  {t("sections.hero.companySubtitle")}
                </span>
              </span>
            </h1>
            <p
              className={`leading-relaxed ${
                currentLanguage === "ar"
                  ? "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                  : screenSize === "mobile"
                  ? "text-xs sm:text-sm"
                  : screenSize === "tablet"
                  ? "text-sm sm:text-base md:text-lg"
                  : screenSize === "medium"
                  ? "text-sm sm:text-base md:text-lg"
                  : "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
              }`}
              style={{
                fontFamily:
                  currentLanguage === "ar"
                    ? "'Noto Naskh Arabic', 'Amiri', 'Scheherazade New', 'Times New Roman', serif"
                    : "'Times New Roman', 'Georgia', serif",
                fontWeight: "300",
                letterSpacing: currentLanguage === "ar" ? "0.3px" : "0.5px",
              }}
            >
              {t("sections.hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section
        id="clients"
        className="clients section light-background"
      ></section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{t("sections.about.title")}</h2>
        </div>

        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-6 content"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p style={{ lineHeight: "1.8" }}>
                {t("sections.about.description1")}
              </p>
              <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <i
                    className="bi bi-check2-circle"
                    style={{
                      marginRight: "10px",
                      color: "#28a745",
                      fontSize: "1.2rem",
                    }}
                  ></i>
                  <span>{t("sections.about.features.contracting")}</span>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <i
                    className="bi bi-check2-circle"
                    style={{
                      marginRight: "10px",
                      color: "#28a745",
                      fontSize: "1.2rem",
                    }}
                  ></i>
                  <span>{t("sections.about.features.supplies")}</span>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <i
                    className="bi bi-check2-circle"
                    style={{
                      marginRight: "10px",
                      color: "#28a745",
                      fontSize: "1.2rem",
                    }}
                  ></i>
                  <span>{t("sections.about.features.financing")}</span>
                </li>
              </ul>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <p style={{ lineHeight: "1.8" }}>
                {t("sections.about.description2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services section light-background">
        <div className="container section-title text-center" data-aos="fade-up">
          <h2 style={{ fontFamily: "Arial, sans-serif", fontWeight: "700" }}>
            {t("sections.services.title")}
          </h2>
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "1.05rem",
              lineHeight: "1.6",
            }}
          >
            {t("sections.services.subtitle")}
          </p>
        </div>

        <div className="container">
          <div className="row gy-4">
            {[
              {
                icon: "bi bi-building",
                titleKey: "sections.services.items.contracting.title",
                descriptionKey:
                  "sections.services.items.contracting.description",
              },
              {
                icon: "bi bi-box-seam",
                titleKey: "sections.services.items.supplies.title",
                descriptionKey: "sections.services.items.supplies.description",
              },
              {
                icon: "bi bi-currency-dollar",
                titleKey: "sections.services.items.financing.title",
                descriptionKey: "sections.services.items.financing.description",
              },
              {
                icon: "bi bi-people",
                titleKey: "sections.services.items.support.title",
                descriptionKey: "sections.services.items.support.description",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="col-xl-3 col-md-6 d-flex justify-content-center"
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
              >
                <div
                  className="service-item position-relative text-center"
                  style={{
                    background: "#fff",
                    padding: "30px 20px",
                    borderRadius: "12px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="icon mb-3"
                    style={{
                      fontSize: "2.5rem",
                      color: "#28a745",
                    }}
                  >
                    <i className={service.icon}></i>
                  </div>
                  <h4
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "600",
                      marginBottom: "10px",
                    }}
                  >
                    {t(service.titleKey)}
                  </h4>
                  <p
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {t(service.descriptionKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects section light-background">
        <div className="container section-title text-center" data-aos="fade-up">
          <h2 style={{ fontFamily: "Arial, sans-serif", fontWeight: "700" }}>
            {t("sections.projects.title")}
          </h2>
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "1.05rem",
              lineHeight: "1.6",
            }}
          >
            {t("sections.projects.subtitle")}
          </p>
        </div>

        <div className="container">
          <ProjectsSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{t("sections.contact.title")}</h2>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-5">
              <div className="info-wrap">
                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="bi bi-geo-alt flex-shrink-0"></i>
                  <div>
                    <h3>{t("sections.contact.address")}</h3>
                    <p>{t("sections.contact.addressText")}</p>
                  </div>
                </div>

                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="bi bi-telephone flex-shrink-0"></i>
                  <div>
                    <h3>{t("sections.contact.callUs")}</h3>
                    <p>{t("sections.contact.phone")}</p>
                  </div>
                </div>

                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <i className="bi bi-envelope flex-shrink-0"></i>
                  <div>
                    <h3>{t("sections.contact.emailUs")}</h3>
                    <p>{t("sections.contact.emailAddress")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <form
                className="php-email-form"
                data-aos="fade-up"
                data-aos-delay="200"
                onSubmit={handleSubmit}
              >
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder={t("sections.contact.name")}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder={t("sections.contact.email")}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder={t("sections.contact.subject")}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="6"
                      placeholder={t("sections.contact.message")}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="col-md-12 text-center">
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting
                        ? t("sections.contact.sending")
                        : t("sections.contact.sendMessage")}
                    </button>
                  </div>
                </div>
                {message && (
                  <div
                    className={`mt-3 text-center ${
                      message.type === "success"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {message.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
