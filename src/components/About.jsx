import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Zap, Compass } from 'lucide-react';
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
            <h2 className="section-title about-heading">
              आमच्याबद्दल
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
          </div>

          {/* Right Side - Exactly 3 Wide Feature Cards */}
          <div className={`about-cards-container ${isRevealed ? 'about-cards-revealed' : 'about-cards-initial'}`}>
            {/* Card 1: पारदर्शक व विश्वासार्ह */}
            <div className="about-feature-card about-feature-card-1">
              <div className="about-feature-card-inner">
                <div className="about-feature-icon-box">
                  <ShieldCheck size={26} strokeWidth={2.2} />
                </div>
                <h3 className="about-feature-title">पारदर्शक व विश्वासार्ह</h3>
              </div>
            </div>

            {/* Card 2: तत्पर व वेगवान सेवा */}
            <div className="about-feature-card about-feature-card-2">
              <div className="about-feature-card-inner">
                <div className="about-feature-icon-box">
                  <Zap size={26} strokeWidth={2.2} />
                </div>
                <h3 className="about-feature-title">तत्पर व वेगवान सेवा</h3>
              </div>
            </div>

            {/* Card 3: अचूक मार्गदर्शन */}
            <div className="about-feature-card about-feature-card-3">
              <div className="about-feature-card-inner">
                <div className="about-feature-icon-box">
                  <Compass size={26} strokeWidth={2.2} />
                </div>
                <h3 className="about-feature-title">अचूक मार्गदर्शन</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

