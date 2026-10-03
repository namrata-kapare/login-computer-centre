import React, { useState, useEffect } from 'react';
import { serviceCategories } from '../data/services';

export default function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('preview_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return Array.from(new Set(['सर्व सेवा', ...serviceCategories.filter(c => c !== 'सर्व सेवा'), ...parsed]));
        }
      }
    } catch (e) {}
    return serviceCategories;
  });

  useEffect(() => {
    const handleStorage = () => {
      try {
        const saved = localStorage.getItem('preview_categories');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCategories(Array.from(new Set(['सर्व सेवा', ...serviceCategories.filter(c => c !== 'सर्व सेवा'), ...parsed])));
          }
        }
      } catch (e) {}
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => setSelectedCategory(cat)}
          className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
