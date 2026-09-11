import React, { useEffect } from 'react';
import * as Icons from 'lucide-react';
import { X, CheckCircle, Info, PhoneCall, AlertTriangle, User } from 'lucide-react';
import { businessConfig } from '../config/business';

export default function ServiceDetails({ service, onClose, onContactClick }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!service) return null;

  const IconComponent = Icons[service.icon] || Icons.FileText;

  const handleContactAction = () => {
    // Open direct mobile dialer using tel:9767696067
    window.location.href = `tel:${businessConfig.phoneRaw}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-icon">
            <IconComponent size={28} />
          </div>
          <div className="modal-title-box">
            <h2 className="modal-marathi-title">{service.marathiName}</h2>
            <span className="modal-english-title">({service.englishName})</span>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="बंद करा">
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Fictional Sample PAN Card Graphic inside Modal */}
          {service.hasSampleVisual && (
            <div className="sample-pan-graphic" style={{ marginBottom: '1.5rem' }}>
              <div className="pan-header-bar">
                <span>आयकर विभाग / INCOME TAX DEPARTMENT</span>
              </div>
              <div className="pan-card-body">
                <div className="pan-photo-placeholder">
                  <User size={24} />
                </div>
                <div className="pan-details">
                  <div className="pan-label">नमूना पॅन कार्ड (SAMPLE VISUAL)</div>
                  <div className="pan-number">ABCDE1234F</div>
                  <div className="pan-holder">उदा. नाव / SAMPLE HOLDER</div>
                </div>
              </div>
            </div>
          )}

          {/* Purpose / Explanation */}
          <div className="modal-section">
            <h3 className="modal-section-heading">
              <Info size={20} />
              <span>ही सेवा कशासाठी आहे?</span>
            </h3>
            <p className="modal-purpose-text">{service.purpose}</p>
          </div>

          {/* Required Document Checklist */}
          <div className="modal-section">
            <h3 className="modal-section-heading">
              <CheckCircle size={20} />
              <span>लागणारी कागदपत्रे:</span>
            </h3>
            <ul className="doc-list">
              {service.documents && service.documents.length > 0 ? (
                service.documents.map((doc, idx) => (
                  <li key={idx} className="doc-item">
                    <CheckCircle className="doc-check-icon" size={18} />
                    <span>{doc}</span>
                  </li>
                ))
              ) : (
                <li className="doc-item">
                  <CheckCircle className="doc-check-icon" size={18} />
                  <span>आवश्यक कागदपत्रे सेवेनुसार बदलू शकतात. कृपया आमच्याशी संपर्क साधा.</span>
                </li>
              )}
            </ul>
          </div>

          {/* Seasonal / Availability Message or General Disclaimer */}
          <div className="notice-box">
            <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>महत्त्वाची सूचना:</strong>
              <p style={{ marginTop: '2px' }}>
                {service.availabilityMessage 
                  ? service.availabilityMessage 
                  : "कागदपत्रांची आवश्यकता व प्रक्रिया सेवेनुसार बदलू शकते. अर्ज करण्यापूर्वी किंवा अधिक माहितीसाठी आमच्याशी थेट संपर्क साधा."}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary btn-sm">
            बंद करा
          </button>
          
          <a
            href={`tel:${businessConfig.phoneRaw}`}
            onClick={handleContactAction}
            className="btn-primary btn-sm"
          >
            <PhoneCall size={18} />
            <span>आमच्याशी संपर्क साधा</span>
          </a>
        </div>
      </div>
    </div>
  );
}
