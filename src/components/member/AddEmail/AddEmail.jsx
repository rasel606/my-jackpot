import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { emailVerificationService } from "../../../services/emailVerificationService";

const AddEmail = ({ showError, showSuccess, showWarning, showInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeModal = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      showError("দয়া করে একটি বৈধ ই-মেইল ঠিকানা লিখুন");
      return;
    }

    if (!validateEmail(email)) {
      showError("দয়া করে একটি বৈধ ই-মেইল ফরম্যাট লিখুন");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await emailVerificationService.sendVerificationCode(email);

      if (result.success) {
        showSuccess("যাচাইকরণ কোড আপনার ই-মেইলে পাঠানো হয়েছে");
        // Navigate to verification code page with email
        navigate("/verify_email_code", {
          state: {
            background: location,
            email: email,
          },
        });
      }
    } catch (error) {
      console.error("Send verification code error:", error);

      if (error.code === 400) {
        showError("অবৈধ ই-মেইল ফরম্যাট");
      } else if (error.code === 409) {
        showError("এই ই-মেইলটি ইতিমধ্যে ব্যবহার করা হয়েছে");
      } else if (error.code === 429) {
        showError("অনেকগুলি চেষ্টা। পরে আবার চেষ্টা করুন।");
      } else if (error.code === 500) {
        showError("সার্ভার ত্রুটি। পরে আবার চেষ্টা করুন।");
      } else {
        showError(error.message || "যাচাইকরণ কোড পাঠাতে ব্যর্থ হয়েছে");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearEmail = () => {
    setEmail("");
  };

  const isButtonDisabled =
    !email.trim() || !validateEmail(email) || isSubmitting;

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          {/* Header */}
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">ই-মেইল যোগ করুন</div>
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
                      <label>ই-মেইল</label>
                      <div className="input-wrap email-wrap ng-star-inserted">
                        <input
                          type="email"
                          className={`input ${email ? "has-value" : ""} ${
                            validateEmail(email) ? "valid" : "invalid"
                          }`}
                          placeholder="আপনার ই-মেইল লিখুন।"
                          value={email}
                          onChange={handleEmailChange}
                          disabled={isSubmitting}
                          autoFocus
                        />
                        {email && (
                          <button
                            className="clear ng-star-inserted"
                            type="button"
                            onClick={handleClearEmail}
                            disabled={isSubmitting}
                            aria-label="Clear email"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      {email && !validateEmail(email) && (
                        <div className="error-message">
                          দয়া করে একটি বৈধ ই-মেইল ঠিকানা লিখুন
                        </div>
                      )}
                    </div>
                  </div>
                </form>

                {/* <div className="button-group"> */}
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
                        Sending...
                      </div>
                    ) : (
                      "Send verification code"
                    )}
                  </a>
                </div>
                {/* </div> */}

                <div className="privacy-notice">
                  <p>
                    আপনার গোপনীয়তার জন্য, নিশ্চিতকরণের পরে তথ্য পরিবর্তন করা
                    যাবে না। আপনার যদি সাহায্যের প্রয়োজন হয়, তাহলে অনুগ্রহ করে{" "}
                    <span className="customer-service-link">
                      গ্রাহক পরিষেবাতে
                    </span>{" "}
                    যোগাযোগ করুন।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmail;
