import React from 'react';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service, onSelectService }) {
  // Pick dynamic icon from Lucide React, unless it's a custom imported image URL
  const isCustomIcon = typeof service.icon === 'string' && (service.icon.startsWith('/') || service.icon.includes('.'));
  const IconComponent = !isCustomIcon && Icons[service.icon] ? Icons[service.icon] : Icons.FileText;

  return (
    <div 
      className="service-card"
      onClick={() => onSelectService(service)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectService(service); }}
    >
      <div className="card-top">
        <div className="card-icon-wrapper">
          {isCustomIcon ? (
            <img src={service.icon} alt={service.marathiName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
