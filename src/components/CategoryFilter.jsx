import React from 'react';
import { serviceCategories } from '../data/services';

export default function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="category-filter">
      {serviceCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
