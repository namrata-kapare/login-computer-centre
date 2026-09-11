import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import OfficeTiming from '../components/OfficeTiming';
import ServiceGrid from '../components/ServiceGrid';
import ServiceDetails from '../components/ServiceDetails';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const [selectedService, setSelectedService] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-main-layout">
      {/* Sticky Navigation Bar */}
      <Navbar onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Hero Section */}
      <Hero onExploreClick={() => scrollToSection('services')} />

      {/* Office Timing Section (Placed BEFORE Services Section) */}
      <OfficeTiming />

      {/* Main Services Grid Section */}
      <ServiceGrid onSelectService={(service) => setSelectedService(service)} />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

      {/* Footer Section */}
      <Footer onNavigate={scrollToSection} />

      {/* Dedicated Service Detail Modal Popup */}
      {selectedService && (
        <ServiceDetails
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onContactClick={() => scrollToSection('contact')}
        />
      )}
    </div>
  );
}
