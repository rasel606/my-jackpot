import { useState, useCallback } from 'react';

export const usePopup = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openPopup = useCallback(() => setIsOpen(true), []);
  const closePopup = useCallback(() => setIsOpen(false), []);
  const togglePopup = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    openPopup,
    closePopup,
    togglePopup
  };
};



