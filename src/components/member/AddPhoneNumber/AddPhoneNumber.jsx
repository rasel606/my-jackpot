// // components/member/AddPhoneNumber/AddPhoneNumber.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AddPhoneNumber = ({ showError, showSuccess, showWarning, showInfo }) => {
//   const navigate = useNavigate();
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [showSuccess, setShowSuccess] = useState(false);

//   const handlePhoneChange = (e) => {
//     const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
//     setPhoneNumber(value);
//   };

//   const handleSubmit = async () => {
//     if (!phoneNumber.trim()) {
//       showError('Please enter a valid phone number');
//       return;
//     }

//     if (phoneNumber.length < 10) {
//       showError('Please enter a valid 10-digit phone number');
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//     //   setShowSuccess(true);
//       showSuccess('Verification code sent successfully!');
      
//       // Auto close after success
//       setTimeout(() => {
//         // setShowSuccess(false);
//         navigate(-1); // Go back to previous page
//       }, 3000);
//     } catch (error) {
//       showError('Failed to send verification code. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

//   const isButtonDisabled = !phoneNumber.trim() || phoneNumber.length < 10 || isSubmitting;

//   return (
//     <div className="content mcd-style new-profile third-party-login member-content">
//       <div className="content player-content ng-star-inserted">
//         <form novalidate className="ng-untouched ng-pristine ng-invalid">
//           <div className="menu-box">
//             <div className="input-group">
//               <label>Phone Number</label>
//               <div className="input-wrap phone-wrap ng-star-inserted">
//                 <div className="phone-area-code">
//                   <div className="lang-select">
//                     <button className="btn-select only" type="button">
//                       <li>
//                         <img 
//                           value="BD" 
//                           alt="BD" 
//                           src="https://img.s628b.com/sb/h5/assets/images/flag/BD.png?v=1760412521693" 
//                           loading="lazy" 
//                         />
//                         <span>+880</span>
//                       </li>
//                     </button>
//                   </div>
//                 </div>
//                 <input 
//                   type="text" 
//                   inputMode="tel"
//                   className={`input ${phoneNumber ? 'ng-dirty' : 'ng-pristine'} ${phoneNumber.length >= 10 ? 'ng-valid' : 'ng-invalid'}`}
//                   placeholder="Enter your phone number."
//                   value={formattedPhoneNumber}
//                   onChange={handlePhoneChange}
//                   maxLength={13} // For formatted number: 012 345 6789
//                   disabled={isSubmitting}
//                 />
//                 {phoneNumber && (
//                   <input 
//                     className="clear" 
//                     type="button"
//                     onClick={() => setPhoneNumber('')}
//                     disabled={isSubmitting}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </form>

//         <div 
//           className={`button ${isButtonDisabled ? 'btn-disabled' : 'btn-active'}`}
//           onClick={!isButtonDisabled ? handleSubmit : undefined}
//         >
//           <a>
//             {isSubmitting ? (
//               <div className="loading-content">
//                 <span className="loading-spinner"></span>
//                 Sending...
//               </div>
//             ) : (
//               'Send verification code'
//             )}
//           </a>
//         </div>

//         <p className="button-tips player">
//           For your privacy, the information cannot be modified after confirmation.If you need help, please contact <i>Customer Service.</i>
//         </p>

//         {/* Success Popup */}
//         {/* {showSuccess && (
//           <div className="pop-wrap pop-success">
//             <div className="register-success-wrap">
//               <div className="register-success-cont">
//                 <div className="register-success-txt top-inner">
//                   <div className="success-checkmark">
//                     <div className="check-icon">
//                       <span className="icon-line line-tip"></span>
//                       <span className="icon-line line-long"></span>
//                       <div className="icon-circle"></div>
//                       <div className="icon-fix"></div>
//                     </div>
//                   </div>
//                   <h4>Success</h4>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default AddPhoneNumber;
// components/member/AddPhoneNumber/AddPhoneNumber.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { phoneVerificationService } from '../../../services/phoneVerificationService';

const AddPhoneNumber = ({ showError, showSuccess, showWarning, showInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setPhoneNumber(value);
  };

  const handleSubmit = async () => {
    if (!phoneNumber.trim()) {
      showError('Please enter a valid phone number');
      return;
    }

    if (phoneNumber.length < 10) {
      showError('Please enter a valid 10-digit phone number');
      return;
    }

    // Format phone number with country code
    const fullPhoneNumber = `+880${phoneNumber}`;

    setIsSubmitting(true);
    
    try {
      const result = await phoneVerificationService.sendVerificationCode(fullPhoneNumber);
      
      if (result.success) {
        // showSuccess(result.message);
        
        // Navigate to verification code page with phone number
        navigate('/verify_code', { 
          state: { 
            background: location,
            phoneNumber: fullPhoneNumber 
          } 
        });
      }
    } catch (error) {
      console.error('Send verification code error:', error);
      
      if (error.code === 400) {
        showError('Invalid phone number format');
      } else if (error.code === 429) {
        showError('Too many attempts. Please try again later.');
      } else if (error.code === 500) {
        showError('Server error. Please try again later.');
      } else {
        showError(error.message || 'Failed to send verification code');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  const isButtonDisabled = !phoneNumber.trim() || phoneNumber.length < 10 || isSubmitting;

  return (
    <div className="content mcd-style new-profile third-party-login member-content">
      <div className="content player-content ng-star-inserted">
        <form novalidate className="ng-untouched ng-pristine ng-invalid">
          <div className="menu-box">
            <div className="input-group">
              <label>Phone Number</label>
              <div className="input-wrap phone-wrap ng-star-inserted">
                <div className="phone-area-code">
                  <div className="lang-select">
                    <button className="btn-select only" type="button">
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
                  type="text" 
                  inputMode="tel"
                  className={`input ${phoneNumber ? 'ng-dirty' : 'ng-pristine'} ${phoneNumber.length >= 10 ? 'ng-valid' : 'ng-invalid'}`}
                  placeholder="Enter your phone number."
                  value={formattedPhoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={13}
                  disabled={isSubmitting}
                />
                {phoneNumber && (
                  <input 
                    className="clear" 
                    type="button"
                    onClick={() => setPhoneNumber('')}
                    disabled={isSubmitting}
                  />
                )}
              </div>
            </div>
          </div>
        </form>

        <div 
          className={`button ${isButtonDisabled ? 'btn-disabled' : 'btn-active'}`}
          onClick={!isButtonDisabled ? handleSubmit : undefined}
        >
          <a>
            {isSubmitting ? (
              <div className="loading-content">
                <span className="loading-spinner"></span>
                Sending...
              </div>
            ) : (
              'Send verification code'
            )}
          </a>
        </div>

        <p className="button-tips player">
          For your privacy, the information cannot be modified after confirmation.If you need help, please contact <i>Customer Service.</i>
        </p>
      </div>
    </div>
  );
};

export default AddPhoneNumber;