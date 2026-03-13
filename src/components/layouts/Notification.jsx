// components/Notification.jsx
import React, { useEffect } from 'react';


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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="cdk-overlay-container">
      <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing" onClick={onClose}></div>
      
      <div 
        className="cdk-global-overlay-wrapper" 
        dir="ltr" 
        style={{ 
          justifyContent: position === "center" ? "center" : position,
          alignItems: position === "center" ? "center" : position
        }}
      >
        <div className="cdk-overlay-pane dialog-panel" style={{ position: "static" }}>
          <div className="popup" id="dialog-2">
            <div className="popup__header">
              {/* Optional header content */}
            </div>
            <div className="popup__content">
              <div className="pop-wrap ng-tns-c781573790-223 ng-star-inserted show">
                <button 
                  className="btn-close ng-tns-c781573790-223"
                  onClick={onClose}
                  aria-label="Close notification"
                >
                  <span 
                    className="item-icon ng-tns-c781573790-223"
                    style={{ 
                      backgroundImage: `url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type01.svg?v=1760412521693")` 
                    }}
                  ></span>
                </button>
                
                <div className="pop-title ng-tns-c781573790-223">
                  <h3 className="ng-tns-c781573790-223">
                    {title}
                  </h3>
                </div>
                
                <div className="pop-inner content-style ng-tns-c781573790-223">
                  <p className="ng-tns-c781573790-223">
                    {message}
                  </p>
                </div>
              </div>
              
              <div className="pop-bg ng-trigger ng-trigger-popBgTriggerAni ng-tns-c781573790-223 ng-star-inserted"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;