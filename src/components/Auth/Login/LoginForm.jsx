import React, { useState } from 'react';

const LoginForm = ({ 
  formData, 
  formErrors, 
  loginError,
  onInputChange, 
  onSubmit, 
  isFormValid, 
  isSubmitting,
  onForgotPassword 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && !isSubmitting) {
      onSubmit(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClearField = (field) => {
    onInputChange(field, '');
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className={isFormValid ? 'valid' : 'invalid'}>
        <div className="menu-box">
          {/* Username Field */}
          <div className="input-group third-party-input-group-title">
            <label htmlFor="userId">Username</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.username}
              onChange={(e) => onInputChange('username', e.target.value.replace(/\s/g, ''))}
              className={`input ${formErrors.username ? 'error' : ''}`}
              placeholder="4-15 char, allow number"
            />
            {formData.username && (
              <input 
                type="button" 
                className="clear active" 
                onClick={() => handleClearField('username')}
              />
            )}
            {formErrors.username && (
              <div className="error-message">{formErrors.username}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="input-group password third-party-input-group-title">
            <div 
              className={`eyes ${showPassword ? 'show' : 'hide'}`}
              onClick={togglePasswordVisibility}
            ></div>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => onInputChange('password', e.target.value)}
              className={`input ${formErrors.password ? 'error' : ''}`}
              placeholder="6-20 characters and numbers"
            />
            {formData.password && (
              <input 
                type="button" 
                className="clear active" 
                onClick={() => handleClearField('password')}
              />
            )}
            {formErrors.password && (
              <div className="error-message">{formErrors.password}</div>
            )}
          </div>

          {/* Login Info Box */}
          <div className="login-info-box">
            {/* Error Message Box */}
            <div className="member-error-box">
              {loginError && (
                <div className="error-message">{loginError}</div>
              )}
            </div>
            
            {/* Forgot Password Link */}
            <div className="forgetpassword-buttn">
              <a href="#" onClick={onForgotPassword}>
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </form>

      {/* Login Button */}
      <div 
        className={`button ${isFormValid && !isSubmitting ? 'btn-active' : 'btn-disabled'}`}
        onClick={handleSubmit}
      >
        <a>{isSubmitting ? 'Logging in...' : 'Login'}</a>
        <div></div>
      </div>
    </>
  );
};

export default LoginForm;