// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const AddFullName = ({ showError, showSuccess, showWarning, showInfo }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [fullName, setFullName] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   const closeModal = () => {
//     if (location.state?.background) {
//       navigate(-1);
//     } else {
//       navigate("/");
//     }
//   };

//   const handleNameChange = (e) => {
//     setFullName(e.target.value);
//   };

//   const validateName = (name) => {
//     return name.trim().length >= 2 && name.trim().length <= 100;
//   };

//   const handleSubmit = async () => {
//     if (!fullName.trim()) {
//       showError("দয়া করে আপনার সম্পূর্ণ নাম লিখুন");
//       return;
//     }

//     if (!validateName(fullName)) {
//       showError("নামটি ২ থেকে ১০০ অক্ষরের মধ্যে হতে হবে");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Simulate API call - replace with actual service
//       // const result = await profileService.updateFullName(fullName);
      
//       // For demo purposes, simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Show success popup
//       setShowSuccessPopup(true);
      
//       // Hide success popup after 2 seconds and close modal
//       setTimeout(() => {
//         setShowSuccessPopup(false);
//         closeModal();
//       }, 2000);

//     } catch (error) {
//       console.error("Update full name error:", error);
//       showError(error.message || "নাম আপডেট করতে ব্যর্থ হয়েছে");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleClearName = () => {
//     setFullName("");
//   };

//   const isButtonDisabled = !fullName.trim() || !validateName(fullName) || isSubmitting;

//   return (
//     <div className="popup-page-wrapper active">
//       <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
//         <div className="popup-page__backdrop" onClick={closeModal}></div>
//         <div className="popup-page__main popup-page-main popup-page-main--show">
//           {/* Header */}
//           <div className="popup-page-main__header">
//             <div 
//               className="popup-page-main__back ng-star-inserted" 
//               onClick={closeModal}
//               style={{ maskImage: 'url("/assets/images/icon-set/icon-arrow-type01.svg")' }}
//             ></div>
//             <div className="popup-page-main__title">সম্পূর্ণ নাম যোগ করুন</div>
//             <div
//               className="popup-page-main__close ng-star-inserted"
//               onClick={closeModal}
//             >
//               ✕
//             </div>
//           </div>

//           {/* Content */}
//           <div className="popup-page-main__container">
//             <div className="content mcd-style new-profile third-party-login member-content">
//               <div className="content player-content ng-star-inserted">
//                 <form
//                   noValidate
//                   className="ng-untouched ng-pristine ng-invalid"
//                 >
//                   <div className="menu-box">
//                     <div className="input-group">
//                       <label>সম্পূর্ণ নাম</label>
//                       <div className="input-wrap name-wrap ng-star-inserted">
//                         <input
//                           type="text"
//                           className={`input ${fullName ? "has-value" : ""} ${
//                             validateName(fullName) ? "valid" : "invalid"
//                           }`}
//                           placeholder="আপনার সম্পূর্ণ নাম লিখুন..."
//                           value={fullName}
//                           onChange={handleNameChange}
//                           disabled={isSubmitting}
//                           autoFocus
//                         />
//                         {fullName && (
//                           <button
//                             className="clear ng-star-inserted"
//                             type="button"
//                             onClick={handleClearName}
//                             disabled={isSubmitting}
//                             aria-label="Clear name"
//                           >
//                             ✕
//                           </button>
//                         )}
//                       </div>
//                       {fullName && !validateName(fullName) && (
//                         <div className="error-message">
//                           নামটি ২ থেকে ১০০ অক্ষরের মধ্যে হতে হবে
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </form>

//                 <div
//                   className={`button ${
//                     isButtonDisabled ? "btn-disabled" : "btn-active"
//                   }`}
//                   onClick={!isButtonDisabled ? handleSubmit : undefined}
//                 >
//                   <a>
//                     {isSubmitting ? (
//                       <div className="loading-content">
//                         <span className="loading-spinner"></span>
//                         সাবমিট হচ্ছে...
//                       </div>
//                     ) : (
//                       "সাবমিট"
//                     )}
//                   </a>
//                 </div>

//                 <p className="button-tips player">
//                   আপনার গোপনীয়তার জন্য, নিশ্চিতকরণের পরে তথ্য পরিবর্তন করা যাবে না। আপনার যদি সাহায্যের প্রয়োজন হয়, তাহলে অনুগ্রহ করে{" "}
//                   <span className="customer-service-link">
//                     গ্রাহক পরিষেবাতে
//                   </span>{" "}
//                   যোগাযোগ করুন।
//                 </p>

//                 {/* Success Popup */}
//                 {showSuccessPopup && (
//                   <div className="pop-wrap pop-success">
//                     <div className="register-success-wrap">
//                       <div className="register-success-cont">
//                         <div className="register-success-txt top-inner">
//                           <div className="success-checkmark">
//                             <div className="check-icon">
//                               <span className="icon-line line-tip"></span>
//                               <span className="icon-line line-long"></span>
//                               <div className="icon-circle"></div>
//                               <div className="icon-fix"></div>
//                             </div>
//                           </div>
//                           <h4>সফল!</h4>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddFullName;


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import  { authService }  from '../../../services/authServices';

const AddFullName = ({ showError, showSuccess, showWarning, showInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [nameVerificationStatus, setNameVerificationStatus] = useState(null);

  // Check name verification status on component mount
  useEffect(() => {
    checkNameVerificationStatus();
  }, []);

  const checkNameVerificationStatus = async () => {
    try {
      const status = await authService.checkNameVerificationStatus();
      setNameVerificationStatus(status);
      
      // If name is already verified, show warning and close modal
      if (status.isNameVerified) {
        showWarning("আপনার নাম ইতিমধ্যে যাচাই করা হয়েছে। পরিবর্তন করা সম্ভব নয়।");
        setTimeout(() => {
          closeModal();
        }, 3000);
      }
    } catch (error) {
      console.error("Error checking name verification status:", error);
    }
  };

  const closeModal = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleNameChange = (e) => {
    setFullName(e.target.value);
  };

  const validateName = (name) => {
    const trimmedName = name.trim();
    return trimmedName.length >= 2 && trimmedName.length <= 100;
  };

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      showError("দয়া করে আপনার সম্পূর্ণ নাম লিখুন");
      return;
    }

    if (!validateName(fullName)) {
      showError("নামটি ২ থেকে ১০০ অক্ষরের মধ্যে হতে হবে");
      return;
    }

    // Check if name is already verified
    if (nameVerificationStatus?.isNameVerified) {
      showError("নাম ইতিমধ্যে যাচাই করা হয়েছে, পরিবর্তন করা সম্ভব নয়");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the actual API
      const result = await authService.updateFullName(fullName);
      
      if (result.success) {
        // Show success popup
        setShowSuccessPopup(true);
        
        // Hide success popup after 2 seconds and close modal
        setTimeout(() => {
          setShowSuccessPopup(false);
          closeModal();
          showSuccess("নাম সফলভাবে সংরক্ষণ করা হয়েছে");
        }, 2000);
      } else {
        showError(result.message || "নাম আপডেট করতে ব্যর্থ হয়েছে");
      }

    } catch (error) {
      console.error("Update full name error:", error);
      
      // Handle specific error messages
      if (error.response?.data?.message) {
        showError(error.response.data.message);
      } else if (error.message) {
        showError(error.message);
      } else {
        showError("নাম আপডেট করতে ব্যর্থ হয়েছে");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearName = () => {
    setFullName("");
  };

  const isButtonDisabled = !fullName.trim() || 
                          !validateName(fullName) || 
                          isSubmitting || 
                          nameVerificationStatus?.isNameVerified;

  // If name is already verified, show message
  if (nameVerificationStatus?.isNameVerified) {
    return (
      <div className="popup-page-wrapper active">
        <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
          <div className="popup-page__backdrop" onClick={closeModal}></div>
          <div className="popup-page__main popup-page-main popup-page-main--show">
            <div className="popup-page-main__header">
              <div 
                className="popup-page-main__back ng-star-inserted" 
                onClick={closeModal}
                style={{ maskImage: 'url("/assets/images/icon-set/icon-arrow-type01.svg")' }}
              ></div>
              <div className="popup-page-main__title">নাম যাচাইকরণ</div>
              <div
                className="popup-page-main__close ng-star-inserted"
                onClick={closeModal}
              >
                ✕
              </div>
            </div>
            <div className="popup-page-main__container">
              <div className="content mcd-style new-profile third-party-login member-content">
                <div className="warning-message">
                  <div className="warning-icon">⚠️</div>
                  <h4>নাম ইতিমধ্যে যাচাইকৃত</h4>
                  <p>আপনার নাম "{nameVerificationStatus.currentName}" ইতিমধ্যে যাচাই করা হয়েছে এবং পরিবর্তন করা সম্ভব নয়।</p>
                  <p>আপনার যদি সাহায্যের প্রয়োজন হয়, তাহলে অনুগ্রহ করে গ্রাহক পরিষেবাতে যোগাযোগ করুন।</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          {/* Header */}
          <div className="popup-page-main__header">
            <div 
              className="popup-page-main__back ng-star-inserted" 
              onClick={closeModal}
              style={{ maskImage: 'url("/assets/images/icon-set/icon-arrow-type01.svg")' }}
            ></div>
            <div className="popup-page-main__title">সম্পূর্ণ নাম যোগ করুন</div>
            <div
              className="popup-page-main__close ng-star-inserted"
              onClick={closeModal}
            >
              ✕
            </div>
          </div>

          {/* Content */}
          <div className="popup-page-main__container">
            <div className="content mcd-style new-profile third-party-login member-content">
              <div className="content player-content ng-star-inserted">
                <form
                  noValidate
                  className="ng-untouched ng-pristine ng-invalid"
                >
                  <div className="menu-box">
                    <div className="input-group">
                      <label>সম্পূর্ণ নাম</label>
                      <div className="input-wrap name-wrap ng-star-inserted">
                        <input
                          type="text"
                          className={`input ${fullName ? "has-value" : ""} ${
                            validateName(fullName) ? "valid" : "invalid"
                          }`}
                          placeholder="আপনার সম্পূর্ণ নাম লিখুন..."
                          value={fullName}
                          onChange={handleNameChange}
                          disabled={isSubmitting}
                          autoFocus
                        />
                        {fullName && (
                          <button
                            className="clear ng-star-inserted"
                            type="button"
                            onClick={handleClearName}
                            disabled={isSubmitting}
                            aria-label="Clear name"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      {fullName && !validateName(fullName) && (
                        <div className="error-message">
                          নামটি ২ থেকে ১০০ অক্ষরের মধ্যে হতে হবে
                        </div>
                      )}
                    </div>
                  </div>
                </form>

                <div
                  className={`button ${
                    isButtonDisabled ? "btn-disabled" : "btn-active"
                  }`}
                  onClick={!isButtonDisabled ? handleSubmit : undefined}
                >
                  <a>
                    {isSubmitting ? (
                      <div className="loading-content">
                        <span className="loading-spinner"></span>
                        সাবমিট হচ্ছে...
                      </div>
                    ) : (
                      "সাবমিট"
                    )}
                  </a>
                </div>

                <p className="button-tips player">
                  আপনার গোপনীয়তার জন্য, নিশ্চিতকরণের পরে তথ্য পরিবর্তন করা যাবে না। আপনার যদি সাহায্যের প্রয়োজন হয়, তাহলে অনুগ্রহ করে{" "}
                  <span className="customer-service-link">
                    গ্রাহক পরিষেবাতে
                  </span>{" "}
                  যোগাযোগ করুন।
                </p>

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
                          <p>আপনার নাম সফলভাবে সংরক্ষণ করা হয়েছে</p>
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

export default AddFullName;