// import React, { useEffect } from "react";

// const McdPopupPage = ({
//   children,
//   show = false,
//   onClose,
//   position = "center",
//   size = "medium",
//   closeOnBackdrop = false,
//   closeOnEscape = true,
//   showBackdrop = false,
//   backdropClass = "dialog-backdrop",
//   overlayClass = "",
//   popupClass = "",
//   animation = true,
//   contentClass = "",
// }) => {
//   useEffect(() => {
//     const handleEscapeKey = (event) => {
//       if (closeOnEscape && event.keyCode === 27 && onClose) {
//         onClose();
//       }
//     };

//     if (show) {
//       document.body.style.overflow = "hidden";
//       if (closeOnEscape) {
//         document.addEventListener("keydown", handleEscapeKey);
//       }
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//       if (closeOnEscape) {
//         document.removeEventListener("keydown", handleEscapeKey);
//       }
//     };
//   }, [show, closeOnEscape, onClose]);

//   // const handleBackdropClick = (e) => {
//   //   if (closeOnBackdrop && e.target === e.currentTarget && onClose) {
//   //     onClose();
//   //   }
//   // };

//   const getSizeClass = () => {
//     const sizes = {
//       small: "popup-small",
//       medium: "popup-medium",
//       large: "popup-large",
//       fullscreen: "popup-fullscreen",
//       auto: "popup-auto",
//     };
//     return sizes[size] || "popup-medium";
//   };

//   // const popupContentClass = () => {
//   //   const ContentClasses = {
//   //     popCheck: `pop-wrap pop-check ${show ? "show" : ""} ani`,
//   //     manu: `manu ${show ? "active" : ""}`,
//   //     referralRewardBonus: `pop-wrap referral-reward-bonus ani ${show ? "show" : ""}`,
//   //     popInbox: `pop-wrap pop-inbox ani ${show ? "show" : ""}`,
//   //     promotionPop: `pop-wrap promotion-pop new ani ${show ? "show" : ""}`,
//   //   };
//   //   return ContentClasses[contentClass] || manu ? ContentClasses.manu : ContentClasses.popCheck;
//   // };
//   const popupContentClass = () => {
//     const ContentClasses = {
//       popCheck: `pop-wrap pop-check ${show ? "show" : ""} ani`,
//       menu: `menu ${show ? "active" : ""}`, // Changed from 'manu' to 'memu' to match your usage
//       referralRewardBonus: `pop-wrap referral-reward-bonus ani ${
//         show ? "show" : ""
//       }`,
//       popInbox: `pop-wrap pop-inbox ani ${show ? "show" : ""}`,
//       promotionPop: `pop-wrap promotion-pop new ani ${show ? "show" : ""}`,
//     };
//     return ContentClasses[contentClass] || ContentClasses.popCheck;
//   };
//   const getPositionStyle = () => {
//     const positions = {
//       center: { justifyContent: "center", alignItems: "center" },
//       top: {
//         justifyContent: "center",
//         alignItems: "flex-start",
//         // paddingTop: "20px",
//       },
//       bottom: {
//         justifyContent: "center",
//         alignItems: "flex-end",
//         paddingBottom: "20px",
//       },
//       left: {
//         justifyContent: "flex-start",
//         alignItems: "center",
//         // paddingLeft: "20px",
//       },
//       right: {
//         justifyContent: "flex-end",
//         alignItems: "center",
//         paddingRight: "20px",
//       },
//     };
//     return positions[position] || positions.center;
//   };

//   // const handleBackdropClick = (e) => {
//   //   if (closeOnBackdrop && e.target === e.currentTarget && onClose) {
//   //     onClose();
//   //   }
//   // };

//   if (!show) return null;

//   return (
//     <div className="cdk-overlay-container" onClick={() => onClose()}>
//       {/* Backdrop */}
//       {/* {showBackdrop && ( */}
//       <div
//         className={`cdk-overlay-backdrop ${
//           showBackdrop === true ? "dialog-backdrop" : ""
//         } cdk-overlay-backdrop-showing`}
//         onClick={(e) => onClose()}
//       ></div>
//       {/* )} */}

//       {/* Popup Container */}
//       <div
//         className="cdk-global-overlay-wrapper"
//         dir="ltr"
//         style={{ justifyContent: "center", alignItems: "center" }}
//       >
//         <div
//           className={`cdk-overlay-pane dialog-panel`}
//           style={{ position: "static" }}
//         >
//           <div class="popup__header"></div>
//           <div className={`popup`}>
//             <div className="popup__content">
//               <div
//                 className={`${popupContentClass()} ng-trigger ng-trigger-popWrapTriggerAni`}
//               >
//                 {console.log(popupContentClass())}
//                 {children}
//               </div>
//               <div
//                 className="pop-bg ng-trigger ng-trigger-popBgTriggerAni ng-tns-c1663769977-14 ng-star-inserted"
//                 style={{ display: "block" }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default McdPopupPage;


import React, { useEffect } from "react";

const McdPopupPage = ({
  children,
  show = false,
  onClose,
  position = "center",
  size = "medium",
  closeOnBackdrop = false,
  closeOnEscape = true,
  showBackdrop = false,
  backdropClass = "dialog-backdrop",
  overlayClass = "",
  popupClass = "",
  animation = true,
  contentClass = "",
}) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (closeOnEscape && event.keyCode === 27 && onClose) {
        onClose();
      }
    };

    if (show) {
      document.body.style.overflow = "hidden";
      if (closeOnEscape) {
        document.addEventListener("keydown", handleEscapeKey);
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      if (closeOnEscape) {
        document.removeEventListener("keydown", handleEscapeKey);
      }
    };
  }, [show, closeOnEscape, onClose]);

  const getSizeClass = () => {
    const sizes = {
      small: "popup-small",
      medium: "popup-medium",
      large: "popup-large",
      fullscreen: "popup-fullscreen",
      auto: "popup-auto",
    };
    return sizes[size] || "popup-medium";
  };

  const popupContentClass = () => {
    const ContentClasses = {
      popCheck: `pop-wrap pop-check ${show ? "show" : ""} ani`,
      menu: `menu ${show ? "active" : ""}`,
      referralRewardBonus: `pop-wrap referral-reward-bonus ani ${show ? "show" : ""}`,
      popInbox: `pop-wrap pop-inbox ani ${show ? "show" : ""}`,
      promotionPop: `pop-wrap promotion-pop new ani ${show ? "show" : ""}`,
    };
    return ContentClasses[contentClass] || ContentClasses.popCheck;
  };

  const getPositionStyle = () => {
    const positions = {
      center: { justifyContent: "center", alignItems: "center" },
      top: {
        justifyContent: "center",
        alignItems: "flex-start",
      },
      bottom: {
        justifyContent: "center",
        alignItems: "flex-end",
        paddingBottom: "20px",
      },
      left: {
        justifyContent: "flex-start",
        alignItems: "center",
      },
      right: {
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: "20px",
      },
    };
    return positions[position] || positions.center;
  };

  // Proper backdrop click handler
  const handleBackdropClick = (e) => {
    // Only close if the backdrop itself is clicked, not its children
    if (e.target === e.currentTarget && closeOnBackdrop && onClose) {
      onClose();
    }
  };

  // Proper container click handler
  const handleContainerClick = (e) => {
    // Only close if the container itself is clicked (not popup content)
    if (e.target === e.currentTarget && closeOnBackdrop && onClose) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div 
      className="cdk-overlay-container" 
      onClick={handleContainerClick} // Fixed: only closes when container is clicked
    >
      {/* Backdrop */}
      {showBackdrop && (
        <div
          className={`cdk-overlay-backdrop ${
            showBackdrop === true ? "dialog-backdrop" : ""
          } cdk-overlay-backdrop-showing`}
          onClick={handleBackdropClick} // Fixed: only closes when backdrop is clicked
        ></div>
      )}

      {/* Popup Container */}
      <div
        className="cdk-global-overlay-wrapper"
        dir="ltr"
        style={getPositionStyle()}
      >
        <div
          className={`cdk-overlay-pane dialog-panel`}
          style={{ position: "static" }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside popup from closing it
        >
          <div className="popup__header">onclose</div>
          <div className="popup">
            <div className="popup__content">
              <div
                className={`${popupContentClass()} ng-trigger ng-trigger-popWrapTriggerAni`}
              >
                {children}
              </div>
              <div
                className="pop-bg ng-trigger ng-trigger-popBgTriggerAni ng-tns-c1663769977-14 ng-star-inserted"
                style={{ display: "block" }}
                onClick={handleBackdropClick}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McdPopupPage;