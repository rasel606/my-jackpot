// components/pages/RegisterPage.jsx
import React from 'react';
import SignupPopup from '../Auth/Registar/SignupPopup';

const RegisterPage = ({ showError, showSuccess, showWarning, showInfo }) => {
  const handleRegisterSuccess = (userData) => {
    showSuccess('Registration successful! Welcome to our platform.');
    // You can add additional logic here like auto-login or redirect
  };

  const handleRegisterError = (error) => {
    showError(error.message || 'Registration failed. Please try again.');
  };

  return (
    <div className="register-page-container">
      <SignupPopup 
        onRegisterSuccess={handleRegisterSuccess}
        onRegisterError={handleRegisterError}
        showSuccess={showSuccess}
        showError={showError}
        showWarning={showWarning}
        showInfo={showInfo}
      />
    </div>
  );
};

export default RegisterPage;