import React from 'react';
import { businessConfig } from '../config/business';

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">आमच्याशी संपर्क</h2>
          <p className="section-subtitle">
            अधिक माहितीसाठी आमच्याशी संपर्क साधा.
          </p>
        </div>

        {/* Contact Information Cards Grid */}
        <div className="contact-cards-grid">
          {/* Card 1: Address */}
          <div className="contact-info-card">
            <div className="contact-icon-bubble bubble-red">
              <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>📍</span>
            </div>
            <h3 className="contact-card-title" style={{ fontWeight: 'normal' }}>
              <strong>पत्ता</strong> (<strong>Address</strong>)
            </h3>
            <p className="contact-card-text" style={{ fontWeight: 'normal', color: 'var(--text-dark)' }}>
              {businessConfig.shortName}
            </p>
            <p className="contact-card-text" style={{ marginTop: '0.25rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>
              {businessConfig.address}
            </p>
          </div>

          {/* Card 2: Mobile & Phone */}
          <div className="contact-info-card">
            <div className="contact-icon-bubble bubble-green">
              <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>📞</span>
            </div>
            <h3 className="contact-card-title">मोबाईल (Mobile)</h3>
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

          {/* Card 3: Email */}
          <div className="contact-info-card">
            <div className="contact-icon-bubble bubble-yellow">
              <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>✉️</span>
            </div>
            <h3 className="contact-card-title">ई-मेल (Email)</h3>
            <p className="contact-card-text" style={{ fontSize: '0.95rem', color: 'var(--primary-blue)', marginTop: '0.5rem' }}>
              <a href={`mailto:${businessConfig.email}`}>{businessConfig.email}</a>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="contact-actions" style={{ marginBottom: '1rem' }}>
          <a href={`tel:${businessConfig.phoneRaw}`} className="btn-primary">
            <span>कॉल करा</span>
          </a>

          <a 
            href={businessConfig.directMapLink} 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <span>नकाशावर शोधा (Find on Map)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
