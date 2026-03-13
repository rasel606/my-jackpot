import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function PopupLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => {
    navigate(-1);
  };

  // Get title based on current path
  const getTitle = () => {
    const path = location.pathname;
    if (path.includes('/login')) return 'Login';
    if (path.includes('/register')) return 'Register';
    if (path.includes('/deposit')) return 'Deposit';
    return '';
  };

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page popup-page--active popup-page--align-top">
        <div 
          className="popup-page__backdrop" 
          onClick={closeModal}
        ></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header new-login-tab">
            <div className="popup-page-main__title">{getTitle()}</div>
            <div 
              className="popup-page-main__close" 
              onClick={closeModal}
            >
              ✕
            </div>
          </div>
          <div className="popup-page-main__container">
            <div className="content mcd-style">
              {/* Outlet will render LoginPage, RegisterPage, DepositPage etc */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}