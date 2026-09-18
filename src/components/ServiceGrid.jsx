import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ServiceCard from './ServiceCard';
import { servicesData as fallbackServices } from '../data/services';
import { getServices } from '../services/api';
import { SearchX } from 'lucide-react';

export default function ServiceGrid({ onSelectService }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('सर्व सेवा');
  const [services, setServices] = useState(fallbackServices.filter(s => s.isActive !== false));

  useEffect(() => {
    async function loadActiveServices() {
      const data = await getServices(false);
      if (Array.isArray(data) && data.length > 0) {
        setServices(data);
      }
    }
    loadActiveServices();
  }, []);

  // Filter services based on isActive flag, category, and search query
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // 1. Seasonal / Active filter control
      if (service.isActive === false) return false;

      // 2. Category filter match
      const categoryMatch = 
        selectedCategory === 'सर्व सेवा' || service.category === selectedCategory;

      if (!categoryMatch) return false;

      // 3. Search query match
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const marathiMatch = service.marathiName?.toLowerCase().includes(q);
      const englishMatch = service.englishName?.toLowerCase().includes(q);
      const descMatch = service.shortDescription?.toLowerCase().includes(q);
      const keywordMatch = service.keywords?.some((k) => k.toLowerCase().includes(q));

      return marathiMatch || englishMatch || descMatch || keywordMatch;
    });
  }, [services, searchQuery, selectedCategory]);

  return (
    <section id="services" className="services-section">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <h2 className="section-title">आमच्याकडे उपलब्ध सेवा</h2>
          <p className="section-subtitle">
            आपल्या आवश्यकतेनुसार सेवा निवडा आणि लागणारी सर्व कागदपत्रे जाणून घ्या.
          </p>
        </div>

        {/* Live Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Category Filter Chips */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Search Results Counter */}
        <div className="results-count">
          {searchQuery ? (
            <span>शोधाचे निकाल: <strong>{filteredServices.length}</strong> सेवा सापडल्या</span>
          ) : (
            <span>एकूण उपलब्ध सेवा: <strong>{filteredServices.length}</strong></span>
          )}
        </div>

        {/* Service Cards Grid */}
        {filteredServices.length > 0 ? (
          <div className="services-grid">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                onSelectService={onSelectService}
              />
            ))}
          </div>
        ) : (
          /* Empty State when Search produces 0 results */
          <div className="no-results">
            <div className="no-results-icon">
              <SearchX size={36} />
            </div>
            <h3 className="no-results-title">
              आपल्या शोधाशी संबंधित सेवा सापडली नाही.
            </h3>
            <p className="no-results-text">
              कृपया दुसरा शब्द टाईप करून पहा किंवा सर्व सेवांमधून शोध घ्या.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('सर्व सेवा'); }} 
              className="btn-secondary btn-sm"
            >
              सर्व सेवा दाखवा
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
