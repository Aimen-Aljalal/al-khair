"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Replace with your actual newsletter API endpoint
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Your subscription request has been sent. Thank you!",
        });
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer id="footer" className="footer">
      <div className="footer-newsletter">
        <div className="container">
          <div className="row justify-content-center text-center"></div>
        </div>
      </div>

      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <Link href="/" className="d-flex align-items-center">
              <span className="sitename">Al-Khair</span>
            </Link>
            <div className="footer-contact pt-3">
              <p>somwhere</p>
              <p>somwhere</p>
              <p className="mt-3">
                <strong>Phone:</strong> <span>+967 777 733 340</span>
              </p>
              <p>
                <strong>Email:</strong> <span>Adelmosleh66@gmail.com</span>
              </p>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <Link href="/">Home</Link>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <Link href="/#about">About us</Link>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <Link href="/#services">Services</Link>
              </li>
              <li>
                <i className="bi bi-chevron-right"></i>{" "}
                <Link href="/#contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <i className="bi bi-chevron-right"></i> General Contracting
              </li>
              <li>
                <i className="bi bi-chevron-right"></i> Supply of Materials &
                Equipment
              </li>
              <li>
                <i className="bi bi-chevron-right"></i> Project Financing
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12">
            <h4>Follow Us</h4>
            <p>
              Connect with us on social media for the latest updates and news
            </p>
            <div className="social-links d-flex">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span>{" "}
          <strong className="px-1 sitename">Al-Khair</strong>{" "}
          <span>All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );
}
