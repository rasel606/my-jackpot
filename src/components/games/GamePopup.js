import React from 'react';

const GamePopup = ({ showPopup, playGameData, onClose, title = "KingBaji" }) => {
  if (!showPopup || !playGameData?.gameUrl) return null;

  return (
    <div className="popup-page-wrapper active" onClick={onClose}>
      <div 
        className="popup-page show-toolbar popup-page--active popup-page--align-top" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">{title}</div>
            <div className="popup-page-main__close" onClick={onClose} />
          </div>
          <div className="popup-page-main__container">
            <iframe
              src={playGameData.gameUrl}
              title="Game"
              width="100%"
              height="100%"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePopup;