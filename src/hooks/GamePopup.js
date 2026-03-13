// components/GamePopup.js
import React from 'react';

const GamePopup = ({ 
  gameUrl, 
  onClose, 
  title = "KingBaji",
  showToolbar = true,
  alignTop = true
}) => {
  if (!gameUrl) return null;

  return (
    <div className="popup-page-wrapper active" onClick={onClose}>
      <div
        className={`popup-page ${showToolbar ? 'show-toolbar' : ''} popup-page--active ${alignTop ? 'popup-page--align-top' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header new-login-tab">
            <div className="popup-page-main__title">{title}</div>
            <div
              className="popup-page-main__close"
              onClick={onClose}
            ></div>
          </div>
          <div className="popup-page-main__container">
            <iframe
              src={gameUrl}
              title="Game"
              width="100%"
              height="100%"
              allowFullScreen
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePopup;