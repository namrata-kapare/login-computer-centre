import React, { useState, useEffect, useRef } from 'react';
import { businessConfig } from '../config/business';
import phoneIcon from '../assets/contact-phone.png';
import phoneWhiteIcon from '../assets/contact-phone-white.png';
import emailIcon from '../assets/contact-email.png';
import locationIcon from '../assets/contact-location.png';

export default function Contact() {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.28, rootMargin: '0px 0px -100px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`contact-section ${isRevealed ? 'contact-section-revealed' : 'contact-section-initial'}`}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title contact-heading-reveal">आमच्याशी संपर्क</h2>
          <p className="section-subtitle contact-subtitle-reveal">
            अधिक माहितीसाठी आमच्याशी संपर्क साधा
          </p>
        </div>

        {/* Contact Information Cards Grid */}
        <div className={`contact-cards-grid ${isRevealed ? 'contact-cards-revealed' : 'contact-cards-initial'}`}>
          {/* Card 1: Address (Moves from Center toward Left) */}
          <div className="contact-info-card contact-card-address">
            <div className="contact-card-inner">
              <div className="contact-icon-wrapper-clean">
                <img src={locationIcon} alt="पत्ता" className="contact-custom-icon" />
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
          </div>

          {/* Card 2: Mobile & Phone (Center Position) */}
          <div className="contact-info-card contact-card-mobile">
            <div className="contact-card-inner">
              <div className="contact-icon-wrapper-clean">
                <img src={phoneIcon} alt="मोबाईल" className="contact-custom-icon" />
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
            </div>
          </div>

          {/* Card 3: Email (Moves from Center toward Right) */}
          <div className="contact-info-card contact-card-email">
            <div className="contact-card-inner">
              <div className="contact-icon-wrapper-clean">
                <img src={emailIcon} alt="ई-मेल" className="contact-custom-icon" />
              </div>
              <h3 className="contact-card-title">ई-मेल (Email)</h3>
              <p className="contact-card-text" style={{ fontSize: '0.95rem', color: 'var(--primary-blue)', marginTop: '0.5rem' }}>
                <a href={`mailto:${businessConfig.email}`}>{businessConfig.email}</a>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="contact-actions" style={{ marginBottom: '1rem' }}>
          <a href={`tel:${businessConfig.phoneRaw}`} className="btn-contact-call">
            <img src={phoneWhiteIcon} alt="" className="btn-contact-action-icon" />
            <span>कॉल करा</span>
          </a>

          <a
            href={businessConfig.directMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary btn-contact-map"
          >
            <img src={locationIcon} alt="" className="btn-contact-action-icon" />
            <span>नकाशावर शोधा (Find on Map)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
