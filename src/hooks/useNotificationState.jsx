
// hooks/useNotificationState.js
import { useState, useCallback } from 'react';

export const useNotificationState = () => {
  const [notification, setNotification] = useState({
    isOpen: false,
    title: "Notification",
    message: "",
    type: "info",
    autoClose: true,
    autoCloseDuration: 5000,
    position: "center"
  });

  const showNotification = useCallback((options) => {
    setNotification(prev => ({
      ...prev,
      isOpen: true,
      ...options
    }));
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  }, []);

  const showError = useCallback((message, title = "Error") => {
    showNotification({ message, title, type: "error" });
  }, [showNotification]);

  const showSuccess = useCallback((message, title = "Success") => {
    showNotification({ message, title, type: "success" });
  }, [showNotification]);

  const showWarning = useCallback((message, title = "Warning") => {
    showNotification({ message, title, type: "warning" });
  }, [showNotification]);

  const showInfo = useCallback((message, title = "Notification") => {
    showNotification({ message, title, type: "info" });
  }, [showNotification]);

  return {
    notification,
    showNotification,
    hideNotification,
    showError,
    showSuccess,
    showWarning,
    showInfo
  };
};