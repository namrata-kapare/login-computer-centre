import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Zap, Users, Monitor } from 'lucide-react';
import { businessConfig } from '../config/business';

export default function About() {
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
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Text Column */}
          <div className={`about-text-content ${isRevealed ? 'about-content-revealed' : 'about-content-initial'}`}>
            <div className="section-badge">आमच्याबद्दल (About Us)</div>
            <h2 className="section-title about-heading">
              विश्वासार्ह व जलद संगणक सेवा
            </h2>
            <p>
              <strong>{businessConfig.businessName}</strong> हे जेजुरी व परिसरातील नागरिकांसाठी सर्व प्रकारच्या शासकीय, निमशासकीय व डिजिटल सेवा एकाच छताखाली पुरवणारे प्रमुख केंद्र आहे.
            </p>
            <p>
              आमचा मुख्य उद्देश स्थानिक नागरिकांना, शेतकरी बांधवांना व विद्यार्थ्यांना विविध दाखले, प्रमाणपत्रे, ७/१२ उतारे, पॅन कार्ड आणि ऑनलाइन अर्ज प्रक्रिया अतिशय सोप्या व पारदर्शक पद्धतीने उपलब्ध करून देणे हा आहे.
            </p>
            <p>
              कोणत्याही कामासाठी लागणारी अचूक कागदपत्रे आणि योग्य माहिती देऊन आम्ही आपले काम वेळेत पूर्ण करण्यासाठी कटिबद्ध आहोत.
            </p>

            <div className="about-trust-pills">
              <span className="about-pill">✓ १००% अचूक व पारदर्शक</span>
              <span className="about-pill">✓ गतिमान अर्ज प्रक्रिया</span>
              <span className="about-pill">✓ सुलभ मार्गदर्शन</span>
            </div>
          </div>

          {/* Right Visual Information Card */}
          <div className={`about-visual-card ${isRevealed ? 'about-card-revealed' : 'about-card-initial'}`}>
            <div className="about-card-header">
              <div className="about-card-badge">
                <Monitor size={15} />
                <span>{businessConfig.shortName}</span>
              </div>
              <span className="about-card-tag">डिजिटल व ई-सुविधा केंद्र</span>
            </div>

            <div className="about-features-list">
              <div className="about-feature-box about-feature-1">
                <div className="about-feature-icon">
                  <ShieldCheck size={22} />
                </div>
                <div className="about-feature-body">
                  <h4>पारदर्शक व विश्वासार्ह</h4>
                  <p>योग्य मार्गदर्शन व अचूक माहितीसह कामे पूर्ण.</p>
                </div>
              </div>

              <div className="about-feature-box about-feature-2">
                <div className="about-feature-icon">
                  <Zap size={22} />
                </div>
                <div className="about-feature-body">
                  <h4>तत्पर व वेगवान सेवा</h4>
                  <p>नागरिकांच्या वेळेची बचत व गतिमान अर्ज प्रक्रिया.</p>
                </div>
              </div>

              <div className="about-feature-box about-feature-3">
                <div className="about-feature-icon">
                  <Users size={22} />
                </div>
                <div className="about-feature-body">
                  <h4>चांगले मार्गदर्शन</h4>
                  <p>ज्येष्ठ नागरिक, विद्यार्थी व शेतकऱ्यांसाठी सविस्तर मदत.</p>
                </div>
              </div>
            </div>

            <div className="about-card-footer">
              <span>📍 {businessConfig.location} — नागरिकांच्या सेवेसाठी सदैव तत्पर</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
