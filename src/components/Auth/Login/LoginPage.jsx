

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext'; // Adjust the path as needed
import LoginForm from './LoginForm';
import Logo from '../../common/Logo/Logo';
const LoginPage = () => {
  const [isActive, setIsActive] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Get the login function from AuthContext

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Username validation
    if (!formData.username || formData.username.length < 4 || formData.username.length > 15) {
      errors.username = 'Username must be 4-15 characters';
    }
    
    // Password validation
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setLoginError('');
    
    try {
      // Use the login function from AuthContext
      await login(formData.username, formData.password, 'en');
      
      // If login is successful, redirect to the home page or the page they were trying to access
      navigate('/', { replace: true });
      
    } catch (error) {
      setLoginError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    console.log('Navigate to forgot password');
  };

  const handleSignupClick = () => {
    navigate('/register', { 
      state: { background: location.state?.background }
    });
  };

  const isFormValid = formData.username && formData.password && !formErrors.username && !formErrors.password;

  return (
    <div className="popup-page-main__container">
      <div className="content mcd-style member-content third-party-login new-login">
        <div className="quick-login-wrapper">
          {/* <div className="logo-box" 
            style={{ 
              backgroundImage: 'url("https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png")' 
            }}>
          </div> */}
          <Logo/>
          
          <LoginForm 
            formData={formData}
            formErrors={formErrors}
            loginError={loginError}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
            isSubmitting={isSubmitting}
            onForgotPassword={handleForgotPassword}
          />

          <p className="button-tips">
            <span>Do not have an account? </span>
            <a href="#" onClick={handleSignupClick}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;