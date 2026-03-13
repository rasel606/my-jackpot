// // components/member/VerificationCode/VerificationCode.js
// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { phoneVerificationService } from '../../../services/phoneVerificationService';

// const VerificationCode = ({ showError, showSuccess, showWarning, showInfo }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [code, setCode] = useState(['', '', '', '']);
//   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [showSuccess, setShowSuccess] = useState(false);
//   const [resendTime, setResendTime] = useState(285); // 4:45 in seconds
//   const [canResend, setCanResend] = useState(false);
  
//   const inputRefs = [
//     useRef(null),
//     useRef(null),
//     useRef(null),
//     useRef(null)
//   ];

//   // Get phone number from navigation state
//   const phoneNumber = location.state?.phoneNumber || '+880 13******00';
//   const maskedPhoneNumber = phoneNumber ? phoneNumber.replace(/(\d{4})(\d+)(\d{2})/, '$1******$3') : '+880 13******00';

//   // Timer for resend code
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setResendTime(prev => {
//         if (prev <= 1) {
//           setCanResend(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `(${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')})`;
//   };

//   const handleCodeChange = (index, value) => {
//     const numericValue = value.replace(/\D/g, '').slice(0, 1);
    
//     const newCode = [...code];
//     newCode[index] = numericValue;
//     setCode(newCode);

//     if (numericValue && index < 3) {
//       inputRefs[index + 1].current.focus();
//     }

//     if (newCode.every(digit => digit !== '') && index === 3) {
//       handleSubmit(newCode.join(''));
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !code[index] && index > 0) {
//       inputRefs[index - 1].current.focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text');
//     const numbers = pastedData.replace(/\D/g, '').slice(0, 4);
    
//     const newCode = [...code];
//     numbers.split('').forEach((num, index) => {
//       if (index < 4) {
//         newCode[index] = num;
//       }
//     });
    
//     setCode(newCode);
    
//     const nextEmptyIndex = newCode.findIndex(digit => digit === '');
//     if (nextEmptyIndex !== -1) {
//       inputRefs[nextEmptyIndex].current.focus();
//     } else {
//       inputRefs[3].current.focus();
//     }
//   };

//   const handleSubmit = async (verificationCode = code.join('')) => {
//     if (verificationCode.length !== 4) {
//       showError('Please enter the complete 4-digit verification code');
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       // Verify the code
//       const verifyResult = await phoneVerificationService.verifyCode(phoneNumber, verificationCode);
      
//       if (verifyResult.success) {
//         // Update user's phone number in profile
//         const updateResult = await phoneVerificationService.updatePhoneNumber(phoneNumber);
        
//         if (updateResult.success) {
//         //   setShowSuccess(true);
//           showSuccess('Phone number verified and updated successfully!');
          
//           // Auto navigate back after success
//           setTimeout(() => {
//             // setShowSuccess(false);
//             navigate(-1); // Go back to profile page
//           }, 2000);
//         }
//       }
//     } catch (error) {
//       console.error('Verification error:', error);
      
//       if (error.code === 400) {
//         showError('Invalid verification code');
//       } else if (error.code === 410) {
//         showError('Verification code has expired');
//       } else if (error.code === 429) {
//         showError('Too many attempts. Please try again later.');
//       } else if (error.code === 500) {
//         showError('Server error. Please try again later.');
//       } else {
//         showError(error.message || 'Verification failed');
//       }
      
//       // Clear the code on error
//       setCode(['', '', '', '']);
//       inputRefs[0].current.focus();
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleResendCode = async () => {
//     if (!canResend) return;

//     setResendTime(285); // Reset to 4:45
//     setCanResend(false);
//     setCode(['', '', '', '']);
//     inputRefs[0].current.focus();
    
//     try {
//       const result = await phoneVerificationService.resendVerificationCode(phoneNumber);
      
//       if (result.success) {
//         // showSuccess(result.message);
//       }
//     } catch (error) {
//       console.error('Resend code error:', error);
//       showError(error.message || 'Failed to resend verification code');
//       setCanResend(true); // Allow retry if resend fails
//     }
//   };

//   return (
//     <div className="content mcd-style third-party-login verify-code">
//       <div className="verification-wrap ng-star-inserted">
//         <div className="verification-txt">
//           <p>
//             Please enter the 4-digit code sent to{' '}
//             <span className="player ng-star-inserted">{maskedPhoneNumber}</span>
//           </p>
//         </div>

//         <div className="verification-content">
//           <form 
//             novalidate 
//             name="one-time-code" 
//             className="verification-code ng-untouched ng-pristine ng-valid"
//             onSubmit={(e) => e.preventDefault()}
//           >
//             <fieldset>
//               <label htmlFor="code-1" className="label">Number 1</label>
//               <label htmlFor="code-2" className="label">Number 2</label>
//               <label htmlFor="code-3" className="label">Number 3</label>
//               <label htmlFor="code-4" className="label">Number 4</label>
              
//               <div id="verification-input" className="verification-input">
//                 {code.map((digit, index) => (
//                   <input
//                     key={index}
//                     ref={inputRefs[index]}
//                     type="number"
//                     pattern="[0-9]*"
//                     min="0"
//                     max="9"
//                     maxLength="1"
//                     value={digit}
//                     inputtype="numeric"
//                     id={`code-${index}`}
//                     className={`code-input ${digit ? 'filled' : ''}`}
//                     onChange={(e) => handleCodeChange(index, e.target.value)}
//                     onKeyDown={(e) => handleKeyDown(index, e)}
//                     onPaste={index === 0 ? handlePaste : undefined}
//                     onInput={(e) => {
//                       if (e.target.value.length > 1) {
//                         e.target.value = e.target.value.slice(0, 1);
//                       }
//                     }}
//                     disabled={isSubmitting || showSuccess}
//                     autoFocus={index === 0}
//                   />
//                 ))}
//               </div>
//             </fieldset>
//           </form>
//         </div>

//         <div className="verification-tips">
//           <p>
//             Didn't receive code?{' '}
//             <a 
//               className={`resend-btn ${canResend ? 'active' : 'disabled'}`}
//               onClick={handleResendCode}
//             >
//               Resend{' '}
//               {!canResend && (
//                 <span className="time active">{formatTime(resendTime)}</span>
//               )}
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* Success Popup */}
//       {showSuccess && (
//         <div className="pop-wrap pop-success ng-star-inserted">
//           <div className="register-success-wrap">
//             <div className="register-success-cont">
//               <div className="register-success-txt top-inner">
//                 <div className="success-checkmark">
//                   <div className="check-icon">
//                     <span className="icon-line line-tip"></span>
//                     <span className="icon-line line-long"></span>
//                     <div className="icon-circle"></div>
//                     <div className="icon-fix"></div>
//                   </div>
//                 </div>
//                 <h4>Success</h4>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VerificationCode;


// components/member/VerificationCode/VerificationCode.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { phoneVerificationService } from '../../../services/phoneVerificationService';

const VerificationCode = ({ showError, showSuccess, showWarning, showInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Renamed to avoid conflict with prop
  const [resendTime, setResendTime] = useState(285); // 4:45 in seconds
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Get phone number from navigation state
  const phoneNumber = location.state?.phoneNumber;
  
  // Extract phone number string from phone object
  const getPhoneNumberString = () => {
    if (!phoneNumber) return '+880 13******00';
    
    if (typeof phoneNumber === 'string') {
      return phoneNumber;
    }
    
    // If it's a phone object with countryCode and number properties
    if (phoneNumber.countryCode && phoneNumber.number) {
      return `${phoneNumber.countryCode} ${phoneNumber.number}`;
    }
    
    return '+880 13******00';
  };

  const phoneNumberString = getPhoneNumberString();
  const maskedPhoneNumber = phoneNumberString.replace(/(\d{4})(\d+)(\d{2})/, '$1******$3');

  // Timer for resend code
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTime(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `(${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')})`;
  };

  const handleCodeChange = (index, value) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 1);
    
    const newCode = [...code];
    newCode[index] = numericValue;
    setCode(newCode);

    if (numericValue && index < 3) {
      inputRefs[index + 1].current.focus();
    }

    if (newCode.every(digit => digit !== '') && index === 3) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numbers = pastedData.replace(/\D/g, '').slice(0, 4);
    
    const newCode = [...code];
    numbers.split('').forEach((num, index) => {
      if (index < 4) {
        newCode[index] = num;
      }
    });
    
    setCode(newCode);
    
    const nextEmptyIndex = newCode.findIndex(digit => digit === '');
    if (nextEmptyIndex !== -1) {
      inputRefs[nextEmptyIndex].current.focus();
    } else {
      inputRefs[3].current.focus();
    }
  };

  const handleSubmit = async (verificationCode = code.join('')) => {
    if (verificationCode.length !== 4) {
      showError('Please enter the complete 4-digit verification code');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Verify the code - pass the phone number string
      const verifyResult = await phoneVerificationService.verifyCode(phoneNumberString, verificationCode);
      
      if (verifyResult.success) {
        // Update user's phone number in profile
        const updateResult = await phoneVerificationService.updatePhoneNumber(phoneNumberString);
        
        if (updateResult.success) {
          setShowSuccessPopup(true);
          showSuccess('Phone number verified and updated successfully!');
          
          // Auto navigate back after success
          setTimeout(() => {
            setShowSuccessPopup(false);
            if (location.state?.background) {
              navigate(-1); // Go back to profile page
            } else {
              navigate('/profile');
            }
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Verification error:', error);
      
      // Handle specific error codes
      if (error.code === 400) {
        showError('Invalid verification code');
      } else if (error.code === 410) {
        showError('Verification code has expired');
      } else if (error.code === 429) {
        showError('Too many attempts. Please try again later.');
      } else if (error.code === 500) {
        showError('Server error. Please try again later.');
      } else {
        showError(error.message || 'Verification failed');
      }
      
      // Clear the code on error
      setCode(['', '', '', '']);
      inputRefs[0].current.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setResendTime(285); // Reset to 4:45
    setCanResend(false);
    setCode(['', '', '', '']);
    inputRefs[0].current.focus();
    
    try {
      const result = await phoneVerificationService.resendVerificationCode(phoneNumberString);
      
      if (result.success) {
        showInfo('Verification code has been resent');
      }
    } catch (error) {
      console.error('Resend code error:', error);
      showError(error.message || 'Failed to resend verification code');
      setCanResend(true); // Allow retry if resend fails
    }
  };

  const closeModal = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          {/* Header */}
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Verify Phone Number</div>
            <div
              className="popup-page-main__close ng-star-inserted"
              onClick={closeModal}
            >
              ✕
            </div>
          </div>

          <div className="popup-page-main__container">
            <div className="content mcd-style third-party-login verify-code">
              <div className="verification-wrap ng-star-inserted">
                <div className="verification-txt">
                  <p>
                    Please enter the 4-digit code sent to{' '}
                    <span className="player ng-star-inserted">{maskedPhoneNumber}</span>
                  </p>
                </div>

                <div className="verification-content">
                  <form 
                    noValidate 
                    name="one-time-code" 
                    className="verification-code ng-untouched ng-pristine ng-valid"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <fieldset>
                      <label htmlFor="code-1" className="label">Number 1</label>
                      <label htmlFor="code-2" className="label">Number 2</label>
                      <label htmlFor="code-3" className="label">Number 3</label>
                      <label htmlFor="code-4" className="label">Number 4</label>
                      
                      <div id="verification-input" className="verification-input">
                        {code.map((digit, index) => (
                          <input
                            key={index}
                            ref={inputRefs[index]}
                            type="number"
                            pattern="[0-9]*"
                            min="0"
                            max="9"
                            maxLength="1"
                            value={digit}
                            inputtype="numeric"
                            id={`code-${index}`}
                            className={`code-input ${digit ? 'filled' : ''}`}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            onInput={(e) => {
                              if (e.target.value.length > 1) {
                                e.target.value = e.target.value.slice(0, 1);
                              }
                            }}
                            disabled={isSubmitting || showSuccessPopup}
                            autoFocus={index === 0}
                          />
                        ))}
                      </div>
                    </fieldset>
                  </form>
                </div>

                <div className="verification-tips">
                  <p>
                    Didn't receive code?{' '}
                    <a 
                      className={`resend-btn ${canResend ? 'active' : 'disabled'}`}
                      onClick={handleResendCode}
                      style={{ 
                        cursor: canResend ? 'pointer' : 'not-allowed',
                        opacity: canResend ? 1 : 0.6
                      }}
                    >
                      Resend{' '}
                      {!canResend && (
                        <span className="time active">{formatTime(resendTime)}</span>
                      )}
                    </a>
                  </p>
                </div>
              </div>

              {/* Success Popup */}
              {showSuccessPopup && (
                <div className="pop-wrap pop-success ng-star-inserted">
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
                        <h4>Success</h4>
                        <p>Phone number verified successfully!</p>
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
  );
};

export default VerificationCode;