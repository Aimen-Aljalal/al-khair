'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    
    const AOS = require('aos')
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    
    console.log('Search query:', searchQuery)
  }

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="container">
          <nav className="breadcrumbs">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li className="current">404</li>
            </ol>
          </nav>
          <h1>404</h1>
        </div>
      </div>

      {/* Error 404 Section */}
      <section id="error-404" className="error-404 section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="text-center">
            <div className="error-icon mb-4" data-aos="zoom-in" data-aos-delay="200">
              <i className="bi bi-exclamation-circle"></i>
            </div>

            <h1 className="error-code mb-4" data-aos="fade-up" data-aos-delay="300">404</h1>

            <h2 className="error-title mb-3" data-aos="fade-up" data-aos-delay="400">
              Oops! Page Not Found
            </h2>

            <p className="error-text mb-4" data-aos="fade-up" data-aos-delay="500">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <div className="search-box mb-4" data-aos="fade-up" data-aos-delay="600">
              <form onSubmit={handleSearch} className="search-form">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for pages..."
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn search-btn" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>

            <div className="error-action" data-aos="fade-up" data-aos-delay="700">
              <Link href="/" className="btn btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

