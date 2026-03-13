// components/layouts/Notification.jsx
import React, { useEffect } from 'react';
import McdPopupPage from '../../layouts/McdPopupPage';

const Notification = ({
  isOpen = false,
  onClose,
  title = "Notification",
  message,
  type = "info",
  autoClose = true,
  autoCloseDuration = 5000,
  position = "center"
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDuration, onClose]);

  const getIcon = () => {
    const icons = {
      info: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-info-type01.svg",
      success: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-success-type01.svg",
      warning: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-warning-type01.svg",
      error: "https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg"
    };
    return icons[type] || icons.info;
  };

  return (
    <McdPopupPage
      show={isOpen}
      onClose={onClose}
      position={position}
      size="popup-large"
      closeOnBackdrop={true}
      closeOnEscape={true}
    >
      <button 
        className="btn-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        <span 
          className="item-icon"
          style={{ 
            backgroundImage: `url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1760412521693")` 
          }}
        ></span>
      </button>
      
      <div className="pop-title">
        <h3>{title}</h3>
      </div>
      
      <div className="pop-inner content-style" style={{ textAlign: 'center', padding: '20px 0' }}>
        <div style={{ marginBottom: '16px' }}>
          <img 
            src={getIcon()} 
            alt={type}
            style={{ width: '48px', height: '48px' }}
          />
        </div>
        <p style={{ fontSize: '16px', color: '#333', margin: 0 }}>
          {message}
        </p>
      </div>
    </McdPopupPage>
  );
};

export default Notification;