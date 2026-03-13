// components/CarouselBanner.js
import React, { useState, useEffect } from 'react';

const CarouselBanner = ({
 // Image props
  bannerImage = "https://img.s628b.com/upload/footerH5FloatBanner/image_293452.gif",
  bannerAlt = "float-banner",
  width = 250,
  height = 250,
  aspectRatio = "250 / 250",
  
  // Position props
  position = "bottom-right", // 'bottom-right', 'bottom-left', 'top-right', 'top-left', 'center-right', 'center-left'
  
  // Animation props
  animation = "none", // 'none', 'bounce', 'pulse', 'slide-in'
  delay = 0, // Delay in milliseconds before showing
  
  // Behavior props
  showCloseButton = true,
  autoClose = false,
  autoCloseDelay = 5000, // in milliseconds
  onClose,
  onClick,
  
  // Style props
  className = "",
  customStyles = {},
  closeButtonStyles = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  React.useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const handleBannerClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (!isVisible) {
    return null;
  }

  const positionClass = `position-${position}`;
  const animationClass = animation !== 'none' ? `animation-${animation}` : '';

  return (
    <div 
      className={`mcd-float-banner ${positionClass} ${className}`}
      style={customStyles}
    >
      <div className={`float-banner ng-trigger ng-trigger-popWrapTriggerAni ${animationClass}`}>
        {showCloseButton && (
          <a 
            className="close" 
            onClick={handleClose}
            style={{ 
              cursor: 'pointer',
              ...closeButtonStyles
            }}
            aria-label="Close banner"
          ></a>
        )}
        <img 
          className="banner-image"
          alt={bannerAlt}
          src={bannerImage}
          loading="lazy"
          style={{ 
            aspectRatio: aspectRatio,
            width: `${width}px`,
            height: `${height}px`
          }}
          width={width}
          height={height}
          onClick={handleBannerClick}
        />
      </div>
    </div>
  );
};

export default CarouselBanner;