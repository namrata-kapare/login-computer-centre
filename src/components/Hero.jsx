import React from 'react';
import { ArrowDownCircle } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <div className="hero-left-content">
          {/* Main Large Heading in White */}
          <h1 className="hero-heading">
            लॉगिन कॉम्प्युटर सेंटर
          </h1>

          {/* Description in Clean Lines */}
          <p className="hero-description">
            जेजुरी परिसरातील विविध ऑनलाइन आणि डिजिटल सेवांसाठी<br />
            सोपे व विश्वासार्ह मार्गदर्शन.
          </p>

          {/* Premium White CTA Button */}
          <div className="hero-actions">
            <button onClick={onExploreClick} className="btn-hero-white">
              <span>आमच्या सेवा पहा</span>
              <ArrowDownCircle size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
