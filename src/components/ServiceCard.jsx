import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { getServiceCustomIcon } from '../utils/serviceIcons';

export default function ServiceCard({ service, onSelectService, index = 0 }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef(null);
  const customIconSrc = getServiceCustomIcon(service);
  const IconComponent = !customIconSrc && Icons[service.icon] ? Icons[service.icon] : Icons.FileText;

  useEffect(() => {
    const el = cardRef.current;
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
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const staggerDelay = `${(index % 8) * 40}ms`;

  return (
    <div 
      ref={cardRef}
      className={`service-card ${isRevealed ? 'revealed' : 'reveal-init'}`}
      style={{ transitionDelay: isRevealed ? staggerDelay : '0ms' }}
      onClick={() => onSelectService(service)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectService(service); }}
    >
      <div className="card-top">
        <div className={`card-icon-wrapper ${customIconSrc ? 'has-custom-icon' : ''}`}>
          {customIconSrc ? (
            <img 
              src={customIconSrc} 
              alt={service.marathiName || service.englishName || 'Service Icon'} 
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1px', display: 'block' }} 
            />
          ) : (
            <IconComponent size={24} />
          )}
        </div>
        <h3 className="service-marathi-name">{service.marathiName}</h3>
        <span className="service-english-name">({service.englishName})</span>
        <p className="service-desc">{service.shortDescription}</p>

        {/* Fictional Sample PAN Card Graphic Visual */}
        {service.hasSampleVisual && (
          <div className="sample-pan-graphic">
            <div className="pan-header-bar">
              <span>आयकर विभाग / INCOME TAX DEPT</span>
            </div>
            <div className="pan-card-body">
              <div className="pan-photo-placeholder">
                <Icons.User size={20} />
              </div>
              <div className="pan-details">
                <div className="pan-label">नमूना पॅन कार्ड (SAMPLE)</div>
                <div className="pan-number">ABCDE1234F</div>
                <div className="pan-holder">उदा. नाव / SAMPLE HOLDER</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card-bottom">
        <button className="btn-card-action">
          <span>अधिक माहिती पहा</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
