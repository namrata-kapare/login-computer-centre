import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-container">
      <div className="search-box">
        <Search className="search-icon" size={24} />
        <input
          type="text"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="आपल्याला कोणती सेवा हवी आहे ते शोधा... (उदा. पॅन, 7/12, झेरॉक्स, अधिवास, उद्योग)"
          aria-label="सेवा शोधा"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')} 
            className="search-clear"
            title="शोध साफ करा"
            aria-label="शोध मजकूर पुसा"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
