import React, { useState } from 'react';
import { Monitor, Menu, X } from 'lucide-react';
import { businessConfig } from '../config/business';

export default function Navbar({ onNavigate, activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* LEFT SIDE: Navigation Links */}
        <nav className="nav-left">
          <ul className="nav-links">
            <li>
              <a 
                href="#home" 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              >
                मुख्यपृष्ठ (Home)
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
              >
                आमच्या सेवा (Services)
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
              >
                आमच्याबद्दल (About Us)
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
              >
                संपर्क (Contact Us)
              </a>
            </li>
          </ul>
        </nav>

        {/* RIGHT SIDE: Business Logo + Marathi Business Name */}
        <div className="nav-right">
          <a href="#home" onClick={() => handleNavClick('home')} className="brand-logo">
            <div className="logo-icon">
              <Monitor size={22} />
            </div>
            <div className="brand-titles">
              <span className="brand-name">{businessConfig.businessNameMarathi}</span>
            </div>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="नेव्हिगेशन मेनू उघडा"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <ul className="mobile-nav">
          <li>
            <a href="#home" className="mobile-nav-link" onClick={() => handleNavClick('home')}>
              मुख्यपृष्ठ (Home)
            </a>
          </li>
          <li>
            <a href="#services" className="mobile-nav-link" onClick={() => handleNavClick('services')}>
              आमच्या सेवा (Services)
            </a>
          </li>
          <li>
            <a href="#about" className="mobile-nav-link" onClick={() => handleNavClick('about')}>
              आमच्याबद्दल (About Us)
            </a>
          </li>
          <li>
            <a href="#contact" className="mobile-nav-link" onClick={() => handleNavClick('contact')}>
              संपर्क (Contact Us)
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
