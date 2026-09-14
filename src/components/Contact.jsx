import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, PhoneCall } from 'lucide-react';
import { businessConfig } from '../config/business';

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">संपर्क (Contact Us)</div>
          <h2 className="section-title">आमच्याशी संपर्क साधा</h2>
          <p className="section-subtitle">
            कोणत्याही सेवेबाबत अधिक माहितीसाठी किंवा कागदपत्रांच्या शंकांचे निरसन करण्यासाठी आमच्याशी संपर्क साधा.
          </p>
        </div>

        {/* Contact Information Cards Grid */}
        <div className="contact-cards-grid">
          {/* Card 1: Address */}
          <div className="contact-info-card">
            <div className="contact-icon-bubble bubble-red">
              <MapPin size={26} />
            </div>
            <h3 className="contact-card-title">📍 पत्ता (Address)</h3>
            <p className="contact-card-text" style={{ fontWeight: 700, color: 'var(--text-dark)' }}>
              {businessConfig.shortName}
            </p>
            <p className="contact-card-text" style={{ marginTop: '0.25rem', color: 'var(--text-muted)' }}>
              {businessConfig.address}
            </p>
          </div>

          {/* Card 2: Mobile & Phone */}
          <div className="contact-info-card">
            <div className="contact-icon-bubble bubble-red">
              <Phone size={26} />
            </div>
            <h3 className="contact-card-title">📞 मोबाईल (Mobile)</h3>
            <p className="contact-card-text">
              <a 
                href={`tel:${businessConfig.phoneRaw}`} 
                style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-blue)' }}
              >
                {businessConfig.phone}
              </a>
            </p>
            <p className="contact-card-text" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              (थेट कॉल करण्यासाठी क्लिक करा)
            </p>
          </div>

          {/* Card 3: Email & Timings */}
          <div className="contact-info-card">
            <div className="contact-icon-bubble bubble-yellow">
              <Mail size={26} />
            </div>
            <h3 className="contact-card-title">✉️ ई-मेल <span className="desktop-only">व 🕘 वेळ</span> (Email)</h3>
            <p className="contact-card-text desktop-only">
              वेळ: <strong>{businessConfig.timing.todayTimingText}</strong>
            </p>
            <p className="contact-card-text" style={{ fontSize: '0.9rem', color: 'var(--primary-blue)', marginTop: '0.4rem' }}>
              <a href={`mailto:${businessConfig.email}`}>✉️ {businessConfig.email}</a>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="contact-actions" style={{ marginBottom: '1rem' }}>
          <a href={`tel:${businessConfig.phoneRaw}`} className="btn-primary">
            <PhoneCall size={20} />
            <span>📞 कॉल करा</span>
          </a>

          <a 
            href={businessConfig.directMapLink} 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <MapPin size={20} />
            <span>📍 नकाशावर शोधा (Find on Map)</span>
            <ExternalLink size={16} style={{ marginLeft: '4px' }} />
          </a>
        </div>
      </div>
    </section>
  );
}
