import React from 'react';

const PromoBanner = ({ banners }) => {
  return (
    <div className="recommend scroll-banner">
      <div className="recommend-title">
        <h2>à¦ªà§à¦°à¦¿à¦¯à¦¼</h2>
      </div>
      <div className="recommend-bg">
        <div className="recommend-main">
          {banners.map(banner => (
            <div key={banner.id} className="recommend-card">
              <a>
                <img
                  fetchPriority="high"
                  alt={banner.alt}
                  src={banner.image}
                  loading="lazy"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;



