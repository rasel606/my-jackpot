// // components/PersonalInfoPage.js
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../../contexts/AuthContext";

// const PersonalInfoPage = ({
//   showError,
//   showSuccess,
//   showWarning,
//   showInfo,
// }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, setUser } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);

//   const closeModal = () => {
//     if (location.state?.background) {
//       navigate(-1);
//     } else {
//       navigate("/");
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "Not set";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit'
//     });
//   };

//   const formatPhoneNumber = (phone) => {
//     if (!phone) return "";
//     return `${phone.countryCode} ${phone.number}`;
//   };

//   const handleMyVipClick = () => {
//     navigate("/vip-points-exchange", {
//       state: { background: location },
//     });
//   };

//   const handleAddPhone = () => {
//     navigate("/add_phone_number", {
//       state: { background: location },
//     });
//   };

//   const handleAddEmail = () => {
//     navigate("/add-email", {
//       state: { background: location },
//     });
//   };

//   const handleAddName = () => {
//     navigate("/update-name", {
//       state: { background: location },
//     });
//   };

//   const handleAddBirthday = () => {
//     navigate("/update-birthday", {
//       state: { background: location },
//     });
//   };

//   const handleContactCustomerService = () => {
//     navigate("/live-chat", {
//       state: { background: location },
//     });
//   };

//   const handleVerifyPhone = async (phoneNumber) => {
//     try {
//       setIsLoading(true);
//       // This would call your backend API to send verification code
//       showInfo("Verification code sent to your phone");
//     } catch (error) {
//       showError("Failed to send verification code");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSetDefaultPhone = async (phoneNumber) => {
//     try {
//       setIsLoading(true);
//       // This would call your backend API to set default phone
//       showSuccess("Default phone number updated");
//     } catch (error) {
//       showError("Failed to update default phone number");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="popup-page-wrapper active">
//         <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
//           <div className="popup-page__backdrop" onClick={closeModal}></div>
//           <div className="popup-page__main popup-page-main popup-page-main--show">
//             <div className="popup-page-main__container">
//               <div className="content mcd-style new-profile player-content">
//                 <div className="loading-message">Loading user information...</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="popup-page-wrapper active">
//       <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
//         <div className="popup-page__backdrop" onClick={closeModal}></div>
//         <div className="popup-page__main popup-page-main popup-page-main--show">
//           {/* Header */}
//           <div className="popup-page-main__header">
//             <div className="popup-page-main__title">Personal Info</div>
//             <div
//               className="popup-page-main__close ng-star-inserted"
//               onClick={closeModal}
//             >
//               ✕
//             </div>
//           </div>

//           {/* Content */}
//           <div className="popup-page-main__container">
//             <div className="content mcd-style new-profile player-content third-party-login">
//               {/* VIP Card Section */}
//               <div className="player-vip-lv1 ng-star-inserted">
//                 <div
//                   className="player-info-vip"
//                   style={{
//                     backgroundImage:
//                       'url("https://img.s628b.com/sb/h5/assets/images/player/vip/vip-card-bg-1.jpg?v=1760412521693")',
//                   }}
//                 >
//                   <div className="member-pic">
//                     <span
//                       className="item-icon ng-star-inserted"
//                       style={{
//                         backgroundImage:
//                           'url("https://img.s628b.com/sb/h5/assets/images/player/vip/memberpic-lv1.svg?v=1760412521693")',
//                       }}
//                     ></span>
//                   </div>
//                 </div>

//                 <div className="membername-wrap">
//                   <div className="membername">{user.userId}</div>
//                   <div className="level ng-star-inserted">
//                     {user.role === 'admin' ? 'Admin' : `VIP ${user.vipPoints || 0}`}
//                   </div>
//                   <br />
//                   <div className="register-date">
//                     Date Registered : <i>{formatDate(user.timestamp)}</i>
//                   </div>
//                 </div>
//               </div>

//               {/* VIP Points Section */}
//               <div id="profile-vip-div" className="menu-box ng-star-inserted">
//                 <div className="vip-area-group">
//                   <div className="left-box">
//                     <div className="item">
//                       <h3>VIP Points (VP)</h3>
//                       <div className="points-number">
//                         {user.vipPoints || 0}
//                       </div>
//                     </div>
//                     <div className="item">
//                       {/* <h3>Balance</h3> */}
//                       <div className="points-number">
//                         ${user.balance?.toFixed(2) || '0.00'}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="right-box">
//                     <a
//                       className="goto-myvip ng-star-inserted"
//                       onClick={handleMyVipClick}
//                     >
//                       <div className="myvip-text">
//                         <span>My VIP</span>
//                         <span
//                           className="item-icon"
//                           style={{
//                             maskImage:
//                               'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/icon-arrow.svg?v=1760412521693")',
//                           }}
//                         ></span>
//                       </div>
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {/* Personal Information Section */}
//               <div className="menu-box unverified-block-personal ng-star-inserted">
//                 {/* Full Name */}
//                 <div className="list-group" name="Full Name">
//                   <div className="icon-block">
//                     <div
//                       className="item-icon"
//                       style={{
//                         maskImage:
//                           'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-username.svg?v=1760412521693")',
//                       }}
//                     ></div>
//                   </div>
//                   <div className="list">
//                     <div className="list-info">
//                       <div className="left">
//                         <div className="info-block">
//                           <div>
//                             <label className="title">Full Name</label>
//                             <label></label>
//                           </div>
//                           <label className="tips ng-star-inserted">
//                             {user.name || "Not set"}
//                           </label>
//                         </div>
//                       </div>
//                       <div className="right">
//                         {!user.name && (
//                           <button
//                             className="button"
//                             onClick={handleAddName}
//                             disabled={isLoading}
//                           >
//                             Add
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Birthday */}
//                 <div className="list-group" name="Birthday">
//                   <div className="icon-block">
//                     <div
//                       className="item-icon"
//                       style={{
//                         maskImage:
//                           'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/icon-birthday.svg?v=1760412521693")',
//                       }}
//                     ></div>
//                   </div>
//                   <div className="list">
//                     <div className="list-info">
//                       <div className="left">
//                         <div className="info-block">
//                           <div>
//                             <label className="title">Birthday</label>
//                             <label></label>
//                           </div>
//                           <label className="tips">
//                             {formatDate(user.birthday)}
//                           </label>
//                         </div>
//                       </div>
//                       <div className="right">
//                         {!user.birthday && (
//                           <button
//                             className="button"
//                             onClick={handleAddBirthday}
//                             disabled={isLoading}
//                           >
//                             Add
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Phone Number */}
//                 <div className="list-group" name="Phone Number">
//                   <div className="icon-block">
//                     <div
//                       className="item-icon"
//                       style={{
//                         maskImage:
//                           'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/icon-phone.svg?v=1760412521693")',
//                       }}
//                     ></div>
//                   </div>
//                   <div className="list phone">
//                     {user.phone && user.phone.map((phone, index) => (
//                       <div key={index} className="list-info ng-star-inserted">
//                         <div className="left">
//                           <div className="info-block">
//                             <div>
//                               <label className="title">
//                                 Phone Number {index > 0 ? `#${index + 1}` : ""}
//                               </label>
//                               {phone.isDefault && (
//                                 <label className="tag ng-star-inserted">
//                                   Default
//                                 </label>
//                               )}
//                             </div>
//                             <label className="tips">
//                               {formatPhoneNumber(phone)}
//                             </label>
//                           </div>
//                         </div>
//                         <div className="right">
//                           <div className={`status ${phone.verified ? 'verified' : 'button'} ng-star-inserted`}>
//                             {phone.verified ? "Verified" : "Verify"}
//                           </div>
//                           {/* {!phone.verified && (
//                             <button
//                               className="button verify-btn"
//                               onClick={() => handleVerifyPhone(phone.number)}
//                               disabled={isLoading}
//                             >
//                               Verify
//                             </button>
//                           )} */}
//                           {!phone.isDefault && (
//                             <button
//                               className="button default-btn"
//                               onClick={() => handleSetDefaultPhone(phone.number)}
//                               disabled={isLoading}
//                             >
//                               Set Default
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                     {(!user.phone || user.phone.length < 3) && (
//                       <a
//                         className="add-phone-btn show"
//                         onClick={handleAddPhone}
//                       >
//                         <div className="icon-add-phone-btn"></div>
//                         <p>Add Phone</p>
//                       </a>
//                     )}
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div id="profile-email" className="list-group" name="E-mail">
//                   <div className="icon-block">
//                     <div
//                       className="item-icon"
//                       style={{
//                         maskImage:
//                           'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/icon-email.svg?v=1760412521693")',
//                       }}
//                     ></div>
//                   </div>
//                   <div className="list">
//                     <div className="list-info ng-star-inserted">
//                       <div className="left">
//                         <div className="info-block">
//                           <div>
//                             <label className="title">Email</label>
//                             {user.isVerified?.email && (
//                               <label className="tag ng-star-inserted">
//                                 Verified
//                               </label>
//                             )}
//                           </div>
//                           <label className="tips">
//                             {user.email || "Not set"}
//                           </label>
//                         </div>
//                       </div>
//                       <div className="right">
//                         {!user.email ? (
//                           <button
//                             className="button"
//                             onClick={handleAddEmail}
//                             disabled={isLoading}
//                           >
//                             Add
//                           </button>
//                         ) : !user.isVerified?.email && (
//                           <button
//                             className="button verify-btn"
//                             disabled={isLoading}
//                           >
//                             Verify
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Country */}
//                 <div className="list-group" name="Country">
//                   <div className="icon-block">
//                     <div
//                       className="item-icon"
//                       style={{
//                         maskImage:
//                           'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/icon-location.svg?v=1760412521693")',
//                       }}
//                     ></div>
//                   </div>
//                   <div className="list">
//                     <div className="list-info">
//                       <div className="left">
//                         <div className="info-block">
//                           <div>
//                             <label className="title">Country</label>
//                           </div>
//                           <label className="tips">
//                             {user.country || "Not set"}
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Footer Note */}
//               <div className="member-menu-point ng-star-inserted">
//                 <i>
//                   <span
//                     className="item-icon"
//                     style={{
//                       backgroundImage:
//                         'url("https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-customer.png?v=1760412521693")',
//                     }}
//                   ></span>
//                 </i>
//                 <p>
//                   For privacy and security, Information can't modified after
//                   confirmation. Please{" "}
//                   <span
//                     name="liveChatBtn"
//                     onClick={handleContactCustomerService}
//                     style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
//                   >
//                     contact customer service
//                   </span>
//                   .
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalInfoPage;

// components/PersonalInfoPage.js
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { phoneVerificationService } from "../../../services/phoneVerificationService"; // Add this import
import ContactCustomer from "../../common/ContactCustomer/ContactCustomer";
import VerificationTips from "../../common/VerificationTips/VerificationTips";

const PersonalInfoPage = ({
  showError,
  showSuccess,
  showWarning,
  showInfo,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [verifyingPhone, setVerifyingPhone] = useState(null); // Track which phone is being verified

  const closeModal = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "/");
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    return `${phone.countryCode} ${phone.number}`;
  };

  const handleMyVipClick = () => {
    navigate("/vip-points-exchange", {
      state: { background: location },
    });
  };

  const handleAddPhone = () => {
    navigate("/add_phone_number", {
      state: { background: location },
    });
  };

  // Fixed handleVerifyPhone function
  const handleVerifyPhone = async (phone) => {
    setVerifyingPhone(phone.number);
    setIsLoading(true);

    try {
      const fullPhoneNumber = `+${phone.countryCode}${phone.number}`;
      const result = await phoneVerificationService.sendVerificationCode(
        phone.number
      );

      if (result.success) {
        // Navigate to verification code page with phone number
        navigate("/verify_code", {
          state: {
            background: location,
            phoneNumber: fullPhoneNumber,
            phoneData: phone, // Pass the entire phone object if needed
          },
        });
      } else {
        showError(result.message || "Failed to send verification code");
      }
    } catch (error) {
      console.error("Send verification code error:", error);
      console.log("Send verification code error:", error);

      if (error.code === 400) {
        showError("Invalid phone number format");
      } else if (error.code === 429) {
        showError("Too many attempts. Please try again later.");
      } else if (error.code === 500) {
        showError("Server error. Please try again later.");
      } else {
        showError(error.message || "Failed to send verification code");
      }
    } finally {
      setIsLoading(false);
      setVerifyingPhone(null);
    }
  };

  const handleAddEmail = () => {
    navigate("/add-email", {
      state: { background: location },
    });
  };

  const handleAddName = () => {
    navigate("/update-name", {
      state: { background: location },
    });
  };

  const handleAddBirthday = () => {
    navigate("/update-birthday", {
      state: { background: location },
    });
  };

  const handleContactCustomerService = () => {
    navigate("/live-chat", {
      state: { background: location },
    });
  };

  const handleSetDefaultPhone = async (phoneNumber) => {
    try {
      setIsLoading(true);
      // This would call your backend API to set default phone
      showSuccess("Default phone number updated");
    } catch (error) {
      showError("Failed to update default phone number");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="popup-page-wrapper active">
        <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
          <div className="popup-page__backdrop" onClick={closeModal}></div>
          <div className="popup-page__main popup-page-main popup-page-main--show">
            <div className="popup-page-main__container">
              <div className="content mcd-style new-profile player-content">
                <div className="loading-message">
                  Loading user information...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (

            <div className="content mcd-style new-profile player-content third-party-login">
              {/* VIP Card Section */}
              <div className="player-vip-lv1 ng-star-inserted">
                <div
                  className="player-info-vip"
                  style={{
                    backgroundImage:
                      'url("https://img.s628b.com/sb/h5/assets/images/player/vip/vip-card-bg-1.jpg?v=1761636564965")',
                  }}
                >
                  <div className="member-pic">
                    <span
                      className="item-icon ng-star-inserted"
                      style={{
                        backgroundImage:
                          'url("https://img.s628b.com/sb/h5/assets/images/player/vip/memberpic-lv1.svg?v=1761636564965")',
                      }}
                    ></span>
                  </div>
                </div>

                <div className="membername-wrap">
                  <div className="membername">{user.userId}</div>
                  <div className="level ng-star-inserted">
                    {user.role === "admin"
                      ? "Admin"
                      : user.vipLevel || "Copper"}
                  </div>
                  <br />
                  <div className="register-date">
                    রেজিস্ট্রেশনের তারিখ : <i>{formatDate(user.timestamp)}</i>
                  </div>
                </div>
              </div>
              {/* VIP Points Section */}
              <div id="profile-vip-div" className="menu-box ng-star-inserted">
                <div className="vip-area-group">
                  <div className="left-box">
                    <div className="item">
                      <h3>ভিআইপি পয়েন্টস (VP)</h3>
                      <div className="points-number">{user.vipPoints || 0}</div>
                    </div>
                  </div>
                  <div className="right-box">
                    <a
                      className="goto-myvip ng-star-inserted"
                      onClick={handleMyVipClick}
                    >
                      <div className="myvip-text">
                        <span>মাই ভিআইপি</span>
                        <span
                          className="item-icon"
                          style={{
                            maskImage:
                              'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/icon-arrow.svg?v=1761636564965")',
                          }}
                        ></span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              {/* Verification Tips Box for Deposit */}

              {/* Reusable Verification Tips */}
              <VerificationTips user={user} type="both" />

              {/* Personal Information Section */}
              <div className="menu-box unverified-block-personal ng-star-inserted">
                {/* Full Name */}
                <div className="list-group" name="সম্পূর্ণ নাম">
                  <div className="icon-block">
                    <div
                      className="item-icon"
                      style={{
                        maskImage:
                          'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-username.svg?v=1761636564965")',
                      }}
                    ></div>
                  </div>
                  <div className="list">
                    <div className="list-info">
                      <div className="left">
                        <div className="info-block">
                          <div>
                            <label className="title">সম্পূর্ণ নাম</label>
                            <label></label>
                          </div>
                          <label className="tips ng-star-inserted">
                            {user.name || ""}
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        {!user.name && (
                          <button
                            className="button"
                            onClick={handleAddName}
                            disabled={isLoading}
                          >
                            অ্যাড
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Birthday */}
                <div className="list-group" name="জন্মদিন">
                  <div className="icon-block">
                    <div
                      className="item-icon"
                      style={{
                        maskImage:
                          'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/icon-birthday.svg?v=1761636564965")',
                      }}
                    ></div>
                  </div>
                  <div className="list">
                    <div className="list-info">
                      <div className="left">
                        <div className="info-block">
                          <div>
                            <label className="title">জন্মদিন</label>
                            <label></label>
                          </div>
                          <label className="tips">
                            {formatDate(user.birthday)}
                          </label>
                        </div>
                      </div>
                      <div className="right">
                        {!user.birthday && (
                          <button
                            className="button"
                            onClick={handleAddBirthday}
                            disabled={isLoading}
                          >
                            অ্যাড
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Phone Number */}
                <div className="list-group" name="ফোন নাম্বার">
                  <div className="icon-block">
                    <div
                      className="item-icon"
                      style={{
                        maskImage:
                          'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/icon-phone.svg?v=1761636564965")',
                      }}
                    ></div>
                  </div>
                  <div className="list phone">
                    {user.phone &&
                      user.phone.map((phone, index) => (
                        <div key={index} className="list-info ng-star-inserted">
                          <div className="left">
                            <div className="info-block">
                              <div>
                                <label className="title">
                                  ফোন নাম্বার {index > 0 ? `#${index + 1}` : ""}
                                </label>
                                {phone.isDefault && (
                                  <label className="tag ng-star-inserted">
                                    Default
                                  </label>
                                )}
                              </div>
                              <label className="tips">
                                {formatPhoneNumber(phone)}
                              </label>
                              {user.phone && user.phone.length !== 0 &&
                                (<a  class="add-phone-btn ng-tns-c1015751608-28 show"  onClick={handleAddPhone}>
                                  <div class="icon-add-phone-btn ng-tns-c1015751608-28">
                                    </div>
                                    <p  class="ng-tns-c1015751608-28">Add</p>
                                    </a>)
                              }
                            </div>
                          </div>
                          <div className="right">
                            {phone.verified ? (
                              <div className="status verified ng-star-inserted">
                                Verified
                              </div>
                            ) : (
                              <div
                                className={`status unconfirm-btn ng-star-inserted ${
                                  verifyingPhone === phone.number
                                    ? "verifying"
                                    : ""
                                }`}
                                onClick={() => handleVerifyPhone(phone)}
                                style={{
                                  cursor:
                                    verifyingPhone === phone.number
                                      ? "default"
                                      : "pointer",
                                  textDecoration: "underline",
                                }}
                              >
                                {verifyingPhone === phone.number
                                  ? "Sending..."
                                  : "যাচাই করা হয়নি"}
                              </div>
                            )}
                            {!phone.isDefault && (
                              <button
                                className="button default-btn"
                                onClick={() =>
                                  handleSetDefaultPhone(phone.number)
                                }
                                disabled={isLoading}
                              >
                                Set Default
                              </button>
                            )}
                          </div>
                          {/* {user.phone.number &&
                            user.phone.number.length !== 0 && (
                              <a
                                className="add-phone-btn"
                                onClick={handleAddPhone}
                              >
                                <div className="icon-add-phone-btn"></div>
                                <p>অ্যাড</p>
                              </a>
                            )} */}
                        </div>
                      ))}
                  </div>
                </div>
                {/* Email */}
                <div id="profile-email" className="list-group" name="ই-মেইল">
                  <div className="icon-block">
                    <div
                      className="item-icon"
                      style={{
                        maskImage:
                          'url("https://img.s628b.com/sb/h5/assets/images/icon-set/player/icon-email.svg?v=1761636564965")',
                      }}
                    ></div>
                  </div>
                  <div className="list">
                    <div className="list-info ng-star-inserted">
                      <div className="left">
                        <div className="info-block">
                          <div>
                            <label className="title">ই-মেইল</label>
                            {user.isVerified?.email && (
                              <label className="tag ng-star-inserted">
                                Verified
                              </label>
                            )}
                          </div>
                          <label className="tips">{user.email || ""}</label>
                        </div>
                      </div>
                      <div className="right">
                        {!user.email ? (
                          <button
                            className="button"
                            onClick={handleAddEmail}
                            disabled={isLoading}
                          >
                            অ্যাড
                          </button>
                        ) : (
                          !user.isVerified?.email && (
                            <button
                              className="button verify-btn"
                              disabled={isLoading}
                            >
                              Verify
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Footer Note */}
              <ContactCustomer />
            </div>

  );
};

export default PersonalInfoPage;
