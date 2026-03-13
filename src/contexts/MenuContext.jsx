// contexts/MenuContext.jsx
import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState(null);
  const [dialogProps, setDialogProps] = useState({});

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const openDialog = (dialogName, props = {}) => {
    setActiveDialog(dialogName);
    setDialogProps(props);
  };

  const closeDialog = () => {
    setActiveDialog(null);
    setDialogProps({});
  };

  const value = {
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    activeDialog,
    dialogProps,
    openDialog,
    closeDialog
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};