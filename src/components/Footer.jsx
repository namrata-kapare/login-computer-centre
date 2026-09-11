import React from 'react';
import { Monitor } from 'lucide-react';
import { businessConfig } from '../config/business';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Monitor size={24} style={{ color: 'var(--primary-blue)' }} />
              <h3 className="footer-title">{businessConfig.fullBusinessNameMarathi}</h3>
            </div>
            <p className="footer-sub">
              "आपल्या विविध ऑनलाइन व डिजिटल सेवा एकाच ठिकाणी."
            </p>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
              स्थान: {businessConfig.location}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">त्वरित लिंक्स (Quick Links)</h4>
            <ul className="footer-links">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>मुख्यपृष्ठ (Home)</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>आमच्या सेवा (Services)</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>आमच्याबद्दल (About Us)</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>संपर्क (Contact Us)</a>
              </li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="footer-heading">कार्यालयीन माहिती</h4>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.6' }}>
              कार्यालयीन वेळ:<br />
              <strong>{businessConfig.timing.todayTimingText}</strong>
            </p>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              📞 मोबाईल: <a href={`tel:${businessConfig.phoneRaw}`} style={{ color: '#ffffff' }}>{businessConfig.phone}</a><br />
              ✉️ ई-मेल: <a href={`mailto:${businessConfig.email}`} style={{ color: '#ffffff' }}>{businessConfig.email}</a>
            </p>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.4rem' }}>
              📍 {businessConfig.address}
            </p>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="footer-bottom">
          <p>© {currentYear} {businessConfig.fullBusinessNameMarathi}. सर्व हक्क राखीव.</p>
        </div>
      </div>
    </footer>
  );
}
