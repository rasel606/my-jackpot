// components/layouts/PopupManager.jsx
import React, { useState, createContext, useContext, useCallback } from "react";
import McdPopupPage from "./McdPopupPage";

// Create Popup Context
const PopupContext = createContext();

// Custom hook to use popup
export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};

// Popup Provider Component
export const PopupProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [popupConfig, setPopupConfig] = useState({
    contentClass: "popCheck",
    size: "medium",
    position: "bottom",
  });

  const openPopup = useCallback((content, config = {}) => {
    setPopupContent(content);
    setShowPopup(true);
    setPopupConfig((prev) => ({ ...prev, ...config }));
    console.log("Popup opened", content, config);
    document.body.style.overflow = "hidden";
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
    setPopupContent(null);
    document.body.style.overflow = "unset";
  }, []);

  const value = {
    openPopup,
    closePopup,
    showPopup,
    popupContent,
    popupConfig,
  };

  return (
    <PopupContext.Provider value={value}>
      {children}
      <McdPopupPage
        show={showPopup}
        onClose={closePopup}
        size={popupConfig.size}
        position={popupConfig.position}
        closeOnBackdrop={showPopup ? true : false}
        closeOnEscape={showPopup ? true : false}
        showBackdrop={showPopup ? true : false}
        contentClass={popupConfig.contentClass}
      >
        {popupContent}
      </McdPopupPage>
    </PopupContext.Provider>
  );
};

// Standalone PopupManager Component (Alternative approach)
const PopupManager = () => {
  const { showPopup, popupContent, closePopup, popupConfig } = usePopup();

  return (
    <McdPopupPage
      show={showPopup}
      onClose={closePopup}
      size={popupConfig.size}
      position={popupConfig.position}
      closeOnBackdrop={showPopup ? true : false}
      closeOnEscape={showPopup ? true : false}
      showBackdrop={showPopup ? true : false}
      contentClass={popupConfig.contentClass}
    >
      {popupContent}
    </McdPopupPage>
  );
};

export default PopupManager;
