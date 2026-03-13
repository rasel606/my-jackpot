

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupForm = ({ 
  formData, 
  formErrors, 
  onInputChange, 
  onSubmit, 
  isFormValid, 
  isSubmitting,
  countryCodes 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    alphabet: false,
    number: false
  });

  const validatePassword = (password) => {
    setPasswordValidations({
      length: password.length >= 6 && password.length <= 20,
      alphabet: /[A-Za-z]/.test(password),
      number: /\d/.test(password)
    });
  };

  const handlePasswordChange = (value) => {
    onInputChange('password', value);
    validatePassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && !isSubmitting) {
      onSubmit(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <form  noValidate className={isFormValid ? 'valid' : 'invalid'}>
      <div className="menu-box">
        {/* Username Field */}
        <div className="input-group third-party-input-group-title">
          <label>Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => onInputChange('userId', e.target.value.replace(/\s/g, ''))}
            className={`input ${formErrors.username ? 'error' : ''}`}
            placeholder="4-15 char, allow number"
          />
          {formData.username && (
            <input 
              type="button" 
              className="clear active" 
              onClick={() => onInputChange('userId', '')}
            />
          )}
          {formErrors.userId && (
            <div className="error-message">{formErrors.userId}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="input-group password third-party-input-group-title">
          <div 
            className={`eyes ${showPassword ? 'show' : 'hide'}`}
            onClick={togglePasswordVisibility}
          ></div>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className={`input ${formErrors.password ? 'error' : ''}`}
            placeholder="6-20 characters and numbers"
          />
          {formData.password && (
            <input 
              type="button" 
              className="clear active" 
              onClick={() => handlePasswordChange('')}
            />
          )}
          
          {/* Password Validation Messages */}
          <div className="password-message-block">
            <div className={`password-message ${passwordValidations.length ? 'success' : ''}`}>
              <span 
                className="icon" 
                style={{ 
                  maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type07.svg?v=1760412521693")' 
                }}
              ></span>
              <span className="message">Between 6~20 characters.</span>
            </div>
            
            <div className={`password-message ${passwordValidations.alphabet ? 'success' : ''}`}>
              <span 
                className="icon" 
                style={{ 
                  maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type07.svg?v=1760412521693")' 
                }}
              ></span>
              <span className="message">At least one alphabet.</span>
            </div>
            
            <div className={`password-message ${passwordValidations.number ? 'success' : ''}`}>
              <span 
                className="icon" 
                style={{ 
                  maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type07.svg?v=1760412521693")' 
                }}
              ></span>
              <span className="message">At least one number. (Special character, symbols are allowed)</span>
            </div>
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="input-group phone-number third-party-input-group-title">
          <label>Phone Number</label>
          <div className="input-wrap phone-wrap">
            <div className="phone-area-code">
              <div className="lang-select">
                <button type="button" className="btn-select only">
                  <li>
                    <img 
                      value="BD" 
                      alt="BD" 
                      src="https://img.s628b.com/sb/h5/assets/images/flag/BD.png?v=1760412521693" 
                      loading="lazy" 
                    />
                    <span>+880</span>
                  </li>
                </button>
              </div>
            </div>
            <input
              type="tel"
              inputMode="tel"
              value={formData.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              className={`input ${formErrors.phone ? 'error' : ''}`}
              placeholder="Enter your phone number."
            />
            {formData.phone && (
              <input 
                type="button" 
                className="clear" 
                onClick={() => onInputChange('phone', '')}
              />
            )}
          </div>
          {formErrors.phone && (
            <div className="error-message">{formErrors.phone}</div>
          )}
        </div>

        {/* Cloudflare Turnstile */}
        <div className="turnstile-container">
          {/* Cloudflare Turnstile integration would go here */}
          <div id="turnstile-container">
            {/* Turnstile widget implementation */}
          </div>
        </div>
      </div>

      {/* Submit Button */}
    </form>
    <div className={`button ${isFormValid && !isSubmitting ? 'btn-active' : 'btn-disabled'}`}
        >
      <Link 
        onClick={handleSubmit} 
        type='button'
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Link>
      </div>
      </>
  );
};

export default SignupForm;