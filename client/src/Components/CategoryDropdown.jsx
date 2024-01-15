// Inside CategoryDropdown.jsx
import React, { useState, useEffect } from 'react';


const CategoryDropdown = ({ categories, onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(''); // Don't pre-select any category
      if (onCategoryChange) {
        onCategoryChange('');
      }
    }
  }, [categories, onCategoryChange, selectedCategory]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <div className="category-dropdown">
      <select value={selectedCategory} onChange={handleCategoryChange} className="custom-dropdown">
        <option value="" disabled>
          Select a Category
        </option>
        {categories.map((category) => (
          <option key={category.category} value={category.category}>
            {category.category}
          </option>
        ))}
      </select>
      <div className="custom-dropdown-arrow"></div>
    </div>
  );
};

export default CategoryDropdown;
