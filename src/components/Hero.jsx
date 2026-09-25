import React from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { businessConfig } from '../config/business';

export default function Hero({ onExploreClick }) {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-content">
        {/* Main Heading in Marathi */}
        <h1 className="hero-heading">
          {businessConfig.businessNameMarathi}
        </h1>

        {/* Subheading */}
        <h2 className="hero-subheading">
          "{businessConfig.tagline}"
        </h2>

        {/* Supporting text */}
        <p className="hero-description">
          {businessConfig.subTagline}
        </p>

        {/* CTA Button */}
        <div className="hero-actions">
          <button onClick={onExploreClick} className="btn-primary">
            <span>आमच्या सेवा पहा</span>
            <ArrowDownCircle size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
