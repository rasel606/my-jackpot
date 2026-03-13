// hooks/useTurnoverPopup.js
import { useState, useCallback } from 'react';

export const useTurnoverPopup = (initialState = false) => {
  const [popupState, setPopupState] = useState({
    isOpen: initialState,
    selectedTurnover: null,
    position: "center",
    size: "popup-large"
  });

  const openPopup = useCallback((turnover, options = {}) => {
    setPopupState(prev => ({
      ...prev,
      isOpen: true,
      selectedTurnover: turnover,
      ...options
    }));
  }, []);

  const closePopup = useCallback(() => {
    setPopupState(prev => ({
      ...prev,
      isOpen: false,
      selectedTurnover: null
    }));
  }, []);

  const updatePopupConfig = useCallback((config) => {
    setPopupState(prev => ({
      ...prev,
      ...config
    }));
  }, []);

  return {
    isOpen: popupState.isOpen,
    selectedTurnover: popupState.selectedTurnover,
    position: popupState.position,
    size: popupState.size,
    openPopup,
    closePopup,
    updatePopupConfig
  };
};