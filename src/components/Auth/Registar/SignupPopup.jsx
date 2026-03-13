// components/Auth/Registar/SignupPopup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Import useLocation

import SignupForm from './SignupForm';
import Carousel from '../../common/Carousel';
import Logo from '../../common/Logo/Logo';
import { useAuth } from '../../../contexts/AuthContext';


const SignupPopup = ({ onRegisterSuccess, onRegisterError, showSuccess, showError }) => {
    const { register } = useAuth();
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    phone: '',
    countryCode: '+880' ,
     referralCode: localStorage.getItem("referralCode") || ''
  });
  console.log("Referral Code:", formData.referralCode);
  
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
    const carouselItems = [
    {
      id: 1,
      messageId: '181278',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_296289.jpg',
      onClick: (item) => console.log('Clicked:', item)
    },
    {
      id: 2,
      messageId: '131120',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_290581.jpg',
      onClick: (item) => console.log('Clicked:', item)
    },
    {
      id: 3,
      messageId: '176066',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_290965.jpg',
      onClick: (item) => console.log('Clicked:', item)
    },
    {
      id: 4,
      messageId: '175525',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_287665.jpg',
      onClick: (item) => console.log('Clicked:', item)
    },
    {
      id: 5,
      messageId: '172273',
      imageUrl: 'https://img.s628b.com/upload/h5Announcement/image_282301.jpg',
      onClick: (item) => console.log('Clicked:', item)
    }
  ];
  // Use useLocation hook instead of global location
  const navigate = useNavigate();
  const location = useLocation(); // Fixed: using useLocation hook

  const validateForm = () => {
    const errors = {};
    
    // Username validation
    if (!formData.userId) {
      errors.userId = 'Username is required';
    } else if (formData.userId.length < 4 || formData.userId.length > 15) {
      errors.userId = 'Username must be 4-15 characters';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.userId)) {
      errors.userId = 'Username can only contain letters and numbers';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6 || formData.password.length > 20) {
      errors.password = 'Password must be 6-20 characters';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one letter and one number';
    }

    // Phone validation
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d+$/.test(formData.phone)) {
      errors.phone = 'Phone number must contain only digits';
    } else if (formData.phone.length < 10) {
      errors.phone = 'Phone number must be at least 10 digits';
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log("Submitting registration with data:", formData);
      // Simulate API call
      const response = await register(formData);
      
      if (response.success) {
        showSuccess('Registration successful! Welcome to our platform.');
        onRegisterSuccess?.(response.user);
        
        // Redirect to login or home page after successful registration
        setTimeout(() => {
          navigate('/login', { 
            state: { background: location.state?.background } // Fixed: using location from useLocation
          });
        }, 1500);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      showError(error.message);
      onRegisterError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock API function - replace with actual API call
  // const mockRegisterAPI = async (userData) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       // Simulate random success/failure for demo
  //       const isSuccess = Math.random() > 0.2;
        
  //       if (isSuccess) {
  //         resolve({
  //           success: true,
  //           user: {
  //             id: Math.random().toString(36).substr(2, 9),
  //             userId: userData.userId,
  //             phone: userData.phone
  //           },
  //           message: 'User registered successfully'
  //         });
  //       } else {
  //         reject(new Error('Username already exists or server error'));
  //       }
  //     }, 1500);
  //   });
  // };

  const handleLoginRedirect = () => {
    navigate('/login', { 
      state: { background: location.state?.background } // Fixed: using location from useLocation
    });
  };

  return (
<div className="content mcd-style member-content third-party-login">
              <div className="register-entry">
                {/* <div className="logo-box" 
                  style={{ 
                    backgroundImage: 'url("https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png")' 
                  }}>
                </div> */}
                <Logo />
      
      <Carousel
           items={carouselItems}
        autoPlay={true}
        delay={5000}
        />
      
      <div className="menu-box"></div>
      
      <div className="entry-outlet">
        <SignupForm 
          formData={formData}
          formErrors={formErrors}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          isSubmitting={isSubmitting}
        />
      </div>
      
      <p className="button-tips">
        <span>Already a member? </span>
        <Link onClick={()=>handleLoginRedirect()}>Log in</Link>
      </p>
      
      <p className="footer-tips">
        <span>Registering means you are over 18 years old, have read and agree to the </span>
        <a href="/terms/conditions">Terms & Conditions</a>
        <span> . </span>
      </p>
    </div>
    </div>
  );
};

export default SignupPopup;