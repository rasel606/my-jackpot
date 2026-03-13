// // components/member/ChangePassword/ChangePassword.js
// import React, { useState } from 'react';
// import { useNavigate,Link } from 'react-router-dom';


// const ChangePassword = ({ showError, showSuccess }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [passwordRequirements, setPasswordRequirements] = useState({
//     length: false,
//     alphabet: false,
//     number: false
//   });
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Validate new password requirements
//     if (name === 'newPassword') {
//       setPasswordRequirements({
//         length: value.length >= 6 && value.length <= 20,
//         alphabet: /[a-zA-Z]/.test(value),
//         number: /[0-9]/.test(value)
//       });
//     }
//   };

//   const togglePasswordVisibility = (field) => {
//     switch (field) {
//       case 'current':
//         setShowCurrentPassword(!showCurrentPassword);
//         break;
//       case 'new':
//         setShowNewPassword(!showNewPassword);
//         break;
//       case 'confirm':
//         setShowConfirmPassword(!showConfirmPassword);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!formData.currentPassword) {
//       showError('Error', 'Please enter your current password');
//       return;
//     }

//     if (!formData.newPassword) {
//       showError('Error', 'Please enter a new password');
//       return;
//     }

//     if (!passwordRequirements.length || !passwordRequirements.alphabet || !passwordRequirements.number) {
//       showError('Error', 'New password does not meet the requirements');
//       return;
//     }

//     if (formData.newPassword !== formData.confirmPassword) {
//       showError('Error', 'New password and confirm password do not match');
//       return;
//     }

//     if (formData.currentPassword === formData.newPassword) {
//       showError('Error', 'New password must be different from current password');
//       return;
//     }

//     // Here you would typically make an API call to change the password
//     console.log('Changing password:', formData);
    
//     // Simulate API call
//     setTimeout(() => {
//       showSuccess('Success', 'Password changed successfully');
//       navigate(-1); // Go back to previous page
//     }, 1000);
//   };

//   const getPasswordMessageClass = (isValid) => 
//     `password-message ${isValid ? 'valid' : 'disabled'}`;

//   return (
//     <div className="change-password-page">
//       <form onSubmit={handleSubmit} noValidate>
//         <div className="menu-box">
//           {/* Current Password */}
//           <div className="input-group password">
//             <div 
//               className={`eyes ${showCurrentPassword ? 'show' : ''}`}
//               onClick={() => togglePasswordVisibility('current')}
//             ></div>
//             <label style={{ display: 'block' }}>Current password</label>
//             <input
//               className="input"
//               type={showCurrentPassword ? 'text' : 'password'}
//               placeholder="Current password"
//               name="currentPassword"
//               value={formData.currentPassword}
//               onChange={handleInputChange}
//             />
//             <input className="clear" type="button" />
//           </div>

//           {/* New Password */}
//           <div className="input-group password">
//             <div 
//               className={`eyes ${showNewPassword ? 'show' : ''}`}
//               onClick={() => togglePasswordVisibility('new')}
//             ></div>
//             <label style={{ display: 'block' }}>New password</label>
//             <input
//               className="input"
//               type={showNewPassword ? 'text' : 'password'}
//               placeholder="New password"
//               name="newPassword"
//               value={formData.newPassword}
//               onChange={handleInputChange}
//             />
//             <input className="clear" type="button" />
            
//             {/* Password Requirements */}
//             <div className="password-message-block">
//               <div className={getPasswordMessageClass(passwordRequirements.length)}>
//                 <span 
//                   className="icon" 
//                   style={{ 
//                     maskImage: "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type07.svg?v=1760412521693')" 
//                   }}
//                 ></span>
//                 <span className="message">Between 6~20 characters.</span>
//               </div>
              
//               <div className={getPasswordMessageClass(passwordRequirements.alphabet)}>
//                 <span 
//                   className="icon" 
//                   style={{ 
//                     maskImage: "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type07.svg?v=1760412521693')" 
//                   }}
//                 ></span>
//                 <span className="message">At least one alphabet.</span>
//               </div>
              
//               <div className={getPasswordMessageClass(passwordRequirements.number)}>
//                 <span 
//                   className="icon" 
//                   style={{ 
//                     maskImage: "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-check-type07.svg?v=1760412521693')" 
//                   }}
//                 ></span>
//                 <span className="message">At least one number. (Special character, symbols are allowed)</span>
//               </div>
//             </div>
//           </div>

//           {/* Confirm New Password */}
//           <div className="input-group password">
//             <div 
//               className={`eyes ${showConfirmPassword ? 'show' : ''}`}
//               onClick={() => togglePasswordVisibility('confirm')}
//             ></div>
//             <label style={{ display: 'block' }}>Confirm new password</label>
//             <input
//               className="input"
//               type={showConfirmPassword ? 'text' : 'password'}
//               placeholder="Confirm new password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//             />
//             <input className="clear" type="button" />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="button submit" >
//           <Link type="submit">Confirm</Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from '../../../services/authServices';

const ChangePassword = ({ showError, showSuccess, showWarning, showInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false
  });

  const closeModal = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validate new password in real-time
    if (field === 'newPassword') {
      setPasswordValidation({
        length: value.length >= 6 && value.length <= 20,
        uppercase: /[A-Z]/.test(value),
        number: /[0-9]/.test(value)
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.currentPassword) {
      errors.push("বর্তমান পাসওয়ার্ড দিন");
    }

    if (!formData.newPassword) {
      errors.push("নতুন পাসওয়ার্ড দিন");
    } else if (!passwordValidation.length) {
      errors.push("পাসওয়ার্ড ৬~২০ অক্ষরের মধ্যে হতে হবে");
    } else if (!passwordValidation.uppercase) {
      errors.push("পাসওয়ার্ডে অন্তত একটি বড় হাতের বর্ণমালা থাকতে হবে");
    } else if (!passwordValidation.number) {
      errors.push("পাসওয়ার্ডে কমপক্ষে একটি সংখ্যা থাকতে হবে");
    }

    if (!formData.confirmPassword) {
      errors.push("নতুন পাসওয়ার্ড নিশ্চিত করুন");
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.push("পাসওয়ার্ড মেলে না");
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      showError(errors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the API to change password
      const result = await authService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      if (result.success) {
        // Show success popup
        setShowSuccessPopup(true);
        
        // Hide success popup after 2 seconds and close modal
        setTimeout(() => {
          setShowSuccessPopup(false);
          closeModal();
          showSuccess("পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে");
        }, 2000);
      } else {
        showError(result.message || "পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ হয়েছে");
      }

    } catch (error) {
      console.error("Change password error:", error);
      
      // Handle specific error messages
      if (error.response?.data?.message) {
        showError(error.response.data.message);
      } else if (error.message) {
        showError(error.message);
      } else {
        showError("পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ হয়েছে");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: ""
    }));
  };

  // Reusable Password Input Component
  const PasswordInput = ({ 
    label, 
    value, 
    field,
    showPassword,
    error,
    children 
  }) => (
    <div className="input-group password ng-star-inserted">
      <div 
        className={`eyes ${showPassword ? 'eyes-show' : 'eyes-hide'}`}
        onClick={() => togglePasswordVisibility(field)}
      ></div>
      <label style={{ display: 'block' }}>{label}</label>
      <div className="input-wrap password-wrap">
        <input
          className={`input ${value ? "has-value" : ""} ${error ? "invalid" : value ? "valid" : ""}`}
          type={showPassword ? "text" : "password"}
          placeholder={label}
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          disabled={isSubmitting}
        />
        {value && (
          <button className="clear" type="button" onClick={() => handleClearField(field)} disabled={isSubmitting}>
            ✕
          </button>
        )}
      </div>
      {children}
    </div>
  );

  const isFormValid = formData.currentPassword && 
                     formData.newPassword && 
                     formData.confirmPassword &&
                     passwordValidation.length &&
                     passwordValidation.uppercase &&
                     passwordValidation.number &&
                     formData.newPassword === formData.confirmPassword;

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          {/* Header */}
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">পাসওয়ার্ড পরিবর্তন করুন</div>
            <div
              className="popup-page-main__close ng-star-inserted"
              onClick={closeModal}
            >
              ✕
            </div>
          </div>

          {/* Content */}
          <div className="popup-page-main__container">
            <div className="content mcd-style member-content">
              <div className="change-password-page ng-star-inserted">
                <form noValidate className="ng-untouched ng-pristine ng-invalid">
                  <div className="menu-box">
                    
                    {/* Current Password */}
                    <PasswordInput
                      label="বর্তমান পাসওয়ার্ড"
                      value={formData.currentPassword}
                      field="current"
                      showPassword={showPasswords.current}
                    />

                    {/* New Password */}
                    <PasswordInput
                      label="নতুন পাসওয়ার্ড"
                      value={formData.newPassword}
                      field="newPassword"
                      showPassword={showPasswords.new}
                      error={formData.newPassword && (!passwordValidation.length || !passwordValidation.uppercase || !passwordValidation.number)}
                    >
                      <div className="password-message-block">
                        <div className={`password-message ${passwordValidation.length ? 'enabled' : 'disabled'}`}>
                          <span className="icon"></span>
                          <span className="message">৬~২০ অক্ষরের মধ্যে।</span>
                        </div>
                        <div className={`password-message ${passwordValidation.uppercase ? 'enabled' : 'disabled'}`}>
                          <span className="icon"></span>
                          <span className="message">অন্তত একটি বড় হাতের বর্ণমালা।</span>
                        </div>
                        <div className={`password-message ${passwordValidation.number ? 'enabled' : 'disabled'}`}>
                          <span className="icon"></span>
                          <span className="message">কমপক্ষে একটি সংখ্যা। (বিশেষ অক্ষর, যেমন - @#$% প্রতীক অনুমোদিত)</span>
                        </div>
                      </div>
                    </PasswordInput>

                    {/* Confirm Password */}
                    <PasswordInput
                      label="নিশ্চিত করুন নতুন পাসওয়ার্ড"
                      value={formData.confirmPassword}
                      field="confirmPassword"
                      showPassword={showPasswords.confirm}
                      error={formData.confirmPassword && formData.newPassword !== formData.confirmPassword}
                    >
                      {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                        <div className="error-message">
                          পাসওয়ার্ড মেলে না
                        </div>
                      )}
                    </PasswordInput>
                  </div>

                  <div
                    className={`button submit ${isFormValid && !isSubmitting ? 'btn-active' : 'btn-disabled'}`}
                    onClick={isFormValid && !isSubmitting ? handleSubmit : undefined}
                  >
                    <a>
                      {isSubmitting ? (
                        <div className="loading-content">
                          <span className="loading-spinner"></span>
                          পরিবর্তন হচ্ছে...
                        </div>
                      ) : (
                        "নিশ্চিত করুন"
                      )}
                    </a>
                  </div>
                </form>

                {/* Success Popup */}
                {showSuccessPopup && (
                  <div className="pop-wrap pop-success">
                    <div className="register-success-wrap">
                      <div className="register-success-cont">
                        <div className="register-success-txt top-inner">
                          <div className="success-checkmark">
                            <div className="check-icon">
                              <span className="icon-line line-tip"></span>
                              <span className="icon-line line-long"></span>
                              <div className="icon-circle"></div>
                              <div className="icon-fix"></div>
                            </div>
                          </div>
                          <h4>সফল!</h4>
                          <p>পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;