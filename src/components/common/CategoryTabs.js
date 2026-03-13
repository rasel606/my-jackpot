import React from 'react';

const CategoryTabs = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  className = '' 
}) => {
  return (
    <div className={`search-tab ${className}`}>
      <div className="tab search-tab">
        <ul className="item-ani">
          {categories.map((category, index) => (
            <li
              key={index}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryTabs;



