"use client";

import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";

import AOS from "aos";

export default function Home() {
  // Add Google Fonts for Arabic text
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Tajawal:wght@200;300;400;500;700;800;900&family=Scheherazade+New:wght@400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Pacifico&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  const isotopeRef = useRef(null);
  const swiperRef = useRef(null);
  const [screenSize, setScreenSize] = useState("desktop");

  // Function to determine screen size and appropriate image
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
    // Function to handle screen size changes
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setScreenSize("mobile");
      } else if (width < 850) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Set initial screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    // Initialize Isotope
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
      // Clean up event listener
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
                   ? "50px"
                   : screenSize === "tablet"
                   ? "100px"
                   : "300px",
             }}
          >
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight"
              style={{
                fontFamily: "'Cairo', 'Tajawal', 'Arial Black', sans-serif",
                textShadow:
                  "4px 4px 8px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,0.7)",
                letterSpacing: "0.5px",
                marginBottom: "50px"
              }}
            >
              <span 
                style={{
                  fontFamily: "'Dancing Script', 'Pacifico', 'Brush Script MT', cursive",
                  fontSize: "1.4em",
                  fontWeight: "700",
                  textShadow: "4px 4px 8px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,0.7)",
                  letterSpacing: "1.5px",
                  color: "rgb(238, 186, 84)",
                  textStroke: "1px rgba(255,255,255,0.2)"
                }}
              >
                شركة الخير
              </span>
              <span style={{ fontSize: "0.8em", opacity: "0.9", marginRight: "8px", color: "white" }}>
                للمقاولات وتوريد وتمويل الشركات
              </span>
            </h1>
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold leading-relaxed"
              style={{
                fontFamily:
                  "'Amiri', 'Scheherazade New', 'Times New Roman', serif",
                textShadow:
                  "3px 3px 6px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.6)",
                letterSpacing: "0.3px",
              }}
            >
              نسعى لبناء سمعة متميزة وحضور قوي عبر بيئة عمل احترافية وهيكل إداري
              مرن
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
          <h2>About Us</h2>
        </div>

        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-6 content"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p style={{ lineHeight: "1.8" }}>
                Al-Khair Contracting, Supplies, and Corporate Financing is a
                leading company providing comprehensive services to businesses
                in contracting, supplies, and financial support. We are
                committed to delivering innovative and effective solutions that
                meet our clients’ needs and support the growth of their
                projects.
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
                  <span>
                    Executing contracting projects with high efficiency and
                    quality.
                  </span>
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
                  <span>
                    Providing the necessary supplies to businesses and
                    organizations at competitive prices.
                  </span>
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
                  <span>
                    Supporting and financing projects to help clients achieve
                    their financial goals.
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <p style={{ lineHeight: "1.8" }}>
                At Al-Khair, we strive to deliver reliable and comprehensive
                services to all our clients through a specialized team with
                extensive experience in contracting, supplies, and financing.
                Our goal is to build long-term partnerships that ensure project
                success and client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services section light-background">
        <div className="container section-title text-center" data-aos="fade-up">
          <h2 style={{ fontFamily: "Arial, sans-serif", fontWeight: "700" }}>
            Services
          </h2>
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "1.05rem",
              lineHeight: "1.6",
            }}
          >
            We provide comprehensive solutions in contracting, supplies, and
            corporate financing to help businesses grow and succeed.
          </p>
        </div>

        <div className="container">
          <div className="row gy-4">
            {[
              {
                icon: "bi bi-building",
                title: "Contracting Projects",
                description:
                  "Executing construction and contracting projects with high efficiency and top-quality standards.",
              },
              {
                icon: "bi bi-box-seam",
                title: "Supplies & Procurement",
                description:
                  "Providing essential supplies and equipment to businesses and organizations at competitive prices.",
              },
              {
                icon: "bi bi-currency-dollar",
                title: "Corporate Financing",
                description:
                  "Offering financing solutions to support projects and help clients achieve their financial objectives.",
              },
              {
                icon: "bi bi-people",
                title: "Business Support",
                description:
                  "Providing expert consultation and long-term business support to ensure project success and client satisfaction.",
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
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
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
                    {/* <Link href="#" className="stretched-link">
                      {service.title}
                    </Link> */}
                  </h4>
                  <p
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: "0.95rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Portfolio</h2>
        </div>

        <div className="container"></div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
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
                    <h3>Address</h3>
                    <p>somwhere, somwhere</p>
                  </div>
                </div>

                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="bi bi-telephone flex-shrink-0"></i>
                  <div>
                    <h3>Call Us</h3>
                    <p>+967 777 733 340</p>
                  </div>
                </div>

                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <i className="bi bi-envelope flex-shrink-0"></i>
                  <div>
                    <h3>Email Us</h3>
                    <p>Adelmosleh66@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <form
                className="php-email-form"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="6"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>
                  <div className="col-md-12 text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
