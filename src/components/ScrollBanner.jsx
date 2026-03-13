// components/ScrollBanner.js
import React from 'react';

const ScrollBanner = ({ items, title }) => {
  return (
    <div className="recommend scroll-banner">
      <div className="recommend-title">
        <h2>{title}</h2>
      </div>
      
      <div className="recommend-bg">
        <div className="recommend-main">
          {items.map(item => (
            <div key={item.id} className="recommend-card">
              <a>
                <img fetchpriority="high" alt={`image_${item.id}`} src={item.image} loading="lazy" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollBanner;