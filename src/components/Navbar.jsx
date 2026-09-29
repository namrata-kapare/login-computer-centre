import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Layers, Info, PhoneCall, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/login logo1.jpeg';

export default function Navbar({ onNavigate, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on ESC key and lock body scroll when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
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
        {/* LEFT SIDE: Business Logo + Business Name ONLY */}
        <div className="nav-left">
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} 
            className="brand-logo"
          >
            <img 
              src={logoImg} 
              alt="लॉगिन कॉम्प्युटर सेंटर" 
              className="brand-logo-img" 
            />
            <div className="brand-titles">
              <span className="brand-name">लॉगिन कॉम्प्युटर सेंटर</span>
            </div>
          </a>
        </div>

        {/* RIGHT SIDE (Laptop / Desktop): Direct Navigation Options */}
        <nav className="nav-desktop-menu" aria-label="Main Navigation">
          <ul className="nav-desktop-links">
            <li>
              <a 
                href="#home" 
                className={`nav-desktop-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                className={`nav-desktop-link ${activeSection === 'services' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-desktop-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`nav-desktop-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
              >
                Contact
              </a>
            </li>
            <li>
              <Link 
                to="/admin/login" 
                className="nav-desktop-admin-btn"
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile / Tablet: Hamburger Menu Button */}
        <div className="nav-mobile-toggle">
          <button 
            className={`nav-hamburger-btn ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "मेनू बंद करा" : "मेनू उघडा"}
            aria-expanded={menuOpen}
            title={menuOpen ? "Close Menu" : "Open Menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Backdrop Overlay (Mobile/Tablet) */}
      <div 
        className={`navbar-drawer-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      {/* Slide Navigation Menu (Mobile/Tablet) */}
      <aside 
        className={`navbar-drawer ${menuOpen ? 'open' : ''}`}
        aria-label="Website Navigation Menu"
      >
        <div className="navbar-drawer-header">
          <div className="navbar-drawer-brand">
            <img 
              src={logoImg} 
              alt="लॉगिन कॉम्प्युटर सेंटर" 
              className="drawer-logo-img" 
            />
            <span className="drawer-brand-name">लॉगिन कॉम्प्युटर सेंटर</span>
          </div>
          <button 
            className="navbar-drawer-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="मेनू बंद करा"
            title="Close Menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="navbar-drawer-nav">
          <ul className="navbar-drawer-links">
            <li>
              <a 
                href="#home" 
                className={`navbar-drawer-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              >
                <Home size={18} />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                className={`navbar-drawer-link ${activeSection === 'services' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
              >
                <Layers size={18} />
                <span>Services</span>
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`navbar-drawer-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
              >
                <Info size={18} />
                <span>About</span>
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`navbar-drawer-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
              >
                <PhoneCall size={18} />
                <span>Contact</span>
              </a>
            </li>
            <li className="navbar-drawer-divider" />
            <li>
              <Link 
                to="/admin/login" 
                className="navbar-drawer-link admin-link"
                onClick={() => setMenuOpen(false)}
              >
                <ShieldCheck size={18} />
                <span>Admin Login</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </header>
  );
}
