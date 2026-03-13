import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { profileService } from '../services/profileService';

const AddBirthday = ({ showError, showSuccess, showWarning, showInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [birthday, setBirthday] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [birthdayVerificationStatus, setBirthdayVerificationStatus] = useState(null);

  // Check birthday verification status on component mount
  useEffect(() => {
    checkBirthdayVerificationStatus();
  }, []);

  const checkBirthdayVerificationStatus = async () => {
    try {
      const profile = await profileService.getProfile();
      const status = {
        isBirthdayVerified: profile.isBirthdayVerified || false,
        currentBirthday: profile.birthday || ''
      };
      setBirthdayVerificationStatus(status);
      
      // If birthday is already verified, show warning and close modal
      if (status.isBirthdayVerified) {
        showWarning("আপনার জন্মদিন ইতিমধ্যে যাচাই করা হয়েছে। পরিবর্তন করা সম্ভব নয়।");
        setTimeout(() => {
          closeModal();
        }, 3000);
      }
    } catch (error) {
      console.error("Error checking birthday verification status:", error);
    }
  };

  const closeModal = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const validateBirthday = (date) => {
    if (!date) return false;

    const selectedDate = new Date(date);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 100); // 100 years ago
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 18); // Must be at least 18 years old

    return selectedDate >= minDate && selectedDate <= maxDate;
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
  };

  const handleSubmit = async () => {
    if (!birthday) {
      showError("দয়া করে আপনার জন্মদিন নির্বাচন করুন");
      return;
    }

    if (!validateBirthday(birthday)) {
      showError("আপনার বয়স কমপক্ষে ১৮ বছর হতে হবে এবং ১০০ বছরের কম হতে হবে");
      return;
    }

    // Check if birthday is already verified
    if (birthdayVerificationStatus?.isBirthdayVerified) {
      showError("জন্মদিন ইতিমধ্যে যাচাই করা হয়েছে, পরিবর্তন করা সম্ভব নয়");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the actual API
      const result = await profileService.updateBirthday(birthday);
      
      if (result.success) {
        // Show success popup
        setShowSuccessPopup(true);
        
        // Hide success popup after 2 seconds and close modal
        setTimeout(() => {
          setShowSuccessPopup(false);
          closeModal();
          showSuccess("জন্মদিন সফলভাবে সংরক্ষণ করা হয়েছে");
        }, 2000);
      } else {
        showError(result.message || "জন্মদিন আপডেট করতে ব্যর্থ হয়েছে");
      }

    } catch (error) {
      console.error("Update birthday error:", error);
      
      // Handle specific error messages
      if (error.response?.data?.message) {
        showError(error.response.data.message);
      } else if (error.message) {
        showError(error.message);
      } else {
        showError("জন্মদিন আপডেট করতে ব্যর্থ হয়েছে");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearBirthday = () => {
    setBirthday("");
  };

  const calculateAge = (dateString) => {
    if (!dateString) return null;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const isButtonDisabled = !birthday || 
                          !validateBirthday(birthday) || 
                          isSubmitting || 
                          birthdayVerificationStatus?.isBirthdayVerified;

  // If birthday is already verified, show message
  if (birthdayVerificationStatus?.isBirthdayVerified) {
    const verifiedDate = new Date(birthdayVerificationStatus.currentBirthday);
    const formattedDate = verifiedDate.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
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
              <div className="popup-page-main__title">জন্মদিন যাচাইকরণ</div>
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
                  <h4>জন্মদিন ইতিমধ্যে যাচাইকৃত</h4>
                  <p>আপনার জন্মদিন "{formattedDate}" ইতিমধ্যে যাচাই করা হয়েছে এবং পরিবর্তন করা সম্ভব নয়।</p>
                  <p>আপনার যদি সাহায্যের প্রয়োজন হয়, তাহলে অনুগ্রহ করে গ্রাহক পরিষেবাতে যোগাযোগ করুন।</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const age = calculateAge(birthday);

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
            <div className="popup-page-main__title">জন্মদিন যোগ করুন</div>
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
                <form noValidate className="ng-untouched ng-pristine ng-invalid">
                  <div className="menu-box">
                    <div className="input-group">
                      <label>জন্মদিন</label>
                      <div className="input-wrap date-wrap ng-star-inserted">
                        <input
                          type="date"
                          className={`input ${birthday ? "has-value" : ""} ${
                            validateBirthday(birthday) ? "valid" : "invalid"
                          }`}
                          placeholder="YYYY/MM/DD"
                          value={formatDateForDisplay(birthday)}
                          onChange={handleBirthdayChange}
                          disabled={isSubmitting}
                          max={new Date().toISOString().split('T')[0]}
                          min={new Date(new Date().getFullYear() - 100, 0, 1).toISOString().split('T')[0]}
                          autoFocus
                        />
                        {birthday && (
                          <button
                            className="clear ng-star-inserted"
                            type="button"
                            onClick={handleClearBirthday}
                            disabled={isSubmitting}
                            aria-label="Clear birthday"
                            style={{ top: '50%', right: '40px', transform: 'translateY(-50%)' }}
                          >
                            ✕
                          </button>
                        )}
                        <div className="date-picker-toggle">
                          <button
                            type="button"
                            className="date-picker-button"
                            onClick={() => document.querySelector('input[type="date"]').showPicker()}
                            disabled={isSubmitting}
                          >
                            <svg viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor">
                              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Age display */}
                      {birthday && age !== null && (
                        <div className={`age-display ${validateBirthday(birthday) ? 'age-valid' : 'age-invalid'}`}>
                          বয়স: {age} বছর
                          {!validateBirthday(birthday) && age < 18 && (
                            <span className="age-warning"> (ন্যূনতম ১৮ বছর বয়স প্রয়োজন)</span>
                          )}
                        </div>
                      )}
                      
                      {birthday && !validateBirthday(birthday) && (
                        <div className="error-message">
                          আপনার বয়স কমপক্ষে ১৮ বছর হতে হবে এবং ১০০ বছরের কম হতে হবে
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
                          <p>আপনার জন্মদিন সফলভাবে সংরক্ষণ করা হয়েছে</p>
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

export default AddBirthday;