// // import React from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import { Outlet } from 'react-router-dom';

// // export default()=> {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const closeModal = () => {
// //     navigate(-1);
// //   };

// //   // Get title based on current path
// //   const getTitle = () => {
// //     const path = location.pathname;
// //     if (path.includes('/login')) return 'Login';
// //     if (path.includes('/register')) return 'Register';
// //     if (path.includes('/deposit')) return 'Deposit';
// //     return '';
// //   };

// //   return (
// //     <div className="popup-page-wrapper active">
// //       <div className="popup-page popup-page--active popup-page--align-top">
// //         <div
// //           className="popup-page__backdrop"
// //           onClick={closeModal}
// //         ></div>
// //         <div className="popup-page__main popup-page-main popup-page-main--show">
// //           <div className="popup-page-main__header new-login-tab">
// //             <div className="popup-page-main__title">{getTitle()}</div>
// //             <div
// //               className="popup-page-main__close"
// //               onClick={closeModal}
// //             >
// //               ✕
// //             </div>
// //           </div>
// //           <div className="popup-page-main__container">
// //             <div className="content mcd-style">
// //               {/* Outlet will render LoginPage, RegisterPage, DepositPage etc */}
// //               <Outlet />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React from "react";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";

// export default () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const closeModal = () => navigate(-1);

//   const titles = {
//     "/login": "Login",
//     "/register": "Register",
//     "/deposit": "Deposit",
//     "/profile": "My Account",
//   };

//   const getTitle = () => {
//     const path = location.pathname;
//     return Object.keys(titles).find(key => path.includes(key)) ? titles[Object.keys(titles).find(key => path.includes(key))] : "";
//   };

//   return (
//     <div className="popup-page-wrapper active">
//       <div className="popup-page popup-page--active popup-page--align-top">
//         <div className="popup-page__backdrop" onClick={closeModal}></div>
//         <div className="popup-page__main popup-page-main popup-page-main--show">
//           <div className="popup-page-main__header new-login-tab">
//             <div className="popup-page-main__title">{getTitle()}</div>
//             <div className="popup-page-main__close" onClick={closeModal}>✕</div>
//           </div>
//           <div className="popup-page-main__container">
//             <div className="content mcd-style">
//               <Outlet />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PopupLayout = ({ showBackButton, className, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => {
    // যদি background location থাকে, তাহলে পূর্বের location-এ back করবে
    // নাহলে home page-এ navigate করবে
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const titles = {
    "/login": "Login",
    "/register": "Register",
    "/deposit": "Deposit",
    "/withdrawal": "Withdrawal",
    "/profile": "My Account",
    "/add_phone_number": "Add Phone Number",
    "/verify_code": "Verification Code",
    "/change-password": "Change Password",
    "/inbox": "Inbox",
    "/betting-records": "BettingRecords",
  };

  const getTitle = () => {
    const path = location.pathname;
    for (const key in titles) {
      if (path.includes(key)) {
        return titles[key];
      }
    }
    return "";
  };

  const handleBack = () => {
    if (location.state?.background) {
      navigate(-1);
    }
  };

  const isProfile = location.pathname.includes("/account");

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          
          <div className={`popup-page-main__header ${className}`}>
            {showBackButton && (
              <div className={`popup-page-main__back`}
                style={{
                  maskImage:
                    "url('https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type01.svg')",
                }}
                onClick={closeModal}
              >
              </div>
            )}
            <div className="popup-page-main__title">{getTitle()}</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className={`content mcd-style  ${className}`}>{children}</div>
          </div>
        </div>
        {isProfile && <div>{children}</div>}
      </div>
    </div>
  );
};

export default PopupLayout;
