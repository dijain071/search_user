import React, { useState } from "react";
import './App.css';

function SearchBox({ searchQuery, setSearchQuery }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery(""); // Clear the search input
  };
  
  return (
    <div className={`searchBox ${isHovered ? 'hovered' : ''}`}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search users by name"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {searchQuery && ( 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="clear-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={handleClearSearch}
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
    </div>
  );
}

export default SearchBox;
