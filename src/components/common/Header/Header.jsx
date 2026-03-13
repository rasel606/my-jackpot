

// import React from 'react';
// import { useAuth } from '../../../contexts/AuthContext';
// import { useApp } from '../../../contexts/AppContext';
// import { usePopup } from '../../layouts/PopupManager';
// import SideMenu from '../SideMenu/SideMenu';
// import ChatApp from '../ChatApp/ChatApp';


// const Header = ({ type = 'normal', title, onBack }) => {
//   const { user, isAuthenticated } = useAuth();
//   const { openPopup, closePopup } = usePopup();
//   const { walletBalance } = useApp();

//   const handleOpenMenu = () => {
//     openPopup(
//       <SideMenu onClose={closePopup} />,
//       {
//         contentClass: "menu", // Fixed: changed from "manu" to "memu"
//         size: "fullscreen",
//         position: "left",
//         closeOnBackdrop: true,
//         closeOnEscape: true,
//         showBackdrop: true
//       }
//     );
//   };


//   // Example of opening chat support programmatically
// // const { openPopup } = usePopup();

// const handleOpenSupport = () => {
//   openPopup(<ChatApp />, {
//     contentClass: 'support-chat',
//     size: 'medium'
//   });
// };

//   console.log("walletBalance", openPopup, closePopup, walletBalance);

//   if (type === 'promotion') {
//     return (
//       <header className="header-inner-promotion">
//         <div className="header-left-btn-group promotion">
//           <div className="page-main-close" onClick={onBack}></div>
//           <div className="header-title">
//             <p>{title}</p>
//           </div>
//         </div>
        
//         {isAuthenticated && (
//           <div className="header-wallet-info">
//             <span>ব্যালেন্স: ৳{walletBalance.main.toFixed(2)}</span>
//           </div>
//         )}
//       </header>
//     );
//   }

//   return (
//     <header className="header normal"  >
//       <div className="header-left-btn-group" onClick={handleOpenMenu}>
//         {/* <div className="back-btn" onClick={onBack}></div> */}
//         <div className="menu-btn">
//           <ul>
//             <li></li>
//             <li></li>
//             <li></li>
//           </ul>
//         </div>
//       </div>
      
//       <div className="logo" tabIndex="0">
//         {isAuthenticated && user && (
//           <div className="user-welcome">
//             <span>স্বাগতম, {user.fullName}</span>
//           </div>
//         )}
//       </div>
      
//       <div className="header-right-btn-group">
//         <a className="app-download" href="/bd/bn/app-download" target="_blank" rel="noopener noreferrer">
//           <span className="item-icon app-download-icon"></span>
//           <p>App</p>
//         </a>
        
//         <a className="service-btn" name="liveChatBtn" onClick={handleOpenSupport}>
//           <span className="item-icon customer-icon"></span>
//           <p>লাইভ চ্যাট</p>
//         </a>
        
//         {/* {isAuthenticated && (
//           <div className="wallet-balance">
//             <span>৳{walletBalance.main.toFixed(2)}</span>
//           </div>
//         )} */}
//       </div>
//     </header>
//   );
// };

// export default Header;



// components/Header/Header.js
import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useApp } from '../../../contexts/AppContext';
import { usePopup } from '../../layouts/PopupManager';
import SideMenu from '../SideMenu/SideMenu';
import ChatApp from '../ChatApp/ChatApp';

const Header = ({ type = 'normal', title, onBack }) => {
  const { user, isAuthenticated } = useAuth();
  const { openPopup, closePopup } = usePopup();
  const { walletBalance } = useApp();

  const handleOpenMenu = () => {
    openPopup(
      <SideMenu onClose={closePopup} />,
      {
        contentClass: "menu",
        size: "fullscreen",
        position: "left",
        closeOnBackdrop: true,
        closeOnEscape: true,
        showBackdrop: true
      }
    );
  };

  const handleOpenSupport = () => {
    openPopup(<ChatApp />, {
      contentClass: 'support-chat',
      size: 'medium'
    });
  };

  if (type === 'promotion') {
    return (
      <header className="header-inner-promotion">
        <div className="header-left-btn-group promotion">
          <div className="page-main-close" onClick={onBack}></div>
          <div className="header-title">
            <p>{title}</p>
          </div>
        </div>
        
        {isAuthenticated && (
          <div className="header-wallet-info">
            <span>ব্যালেন্স: ৳{walletBalance.main.toFixed(2)}</span>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="header normal">
      <div className="header-left-btn-group" onClick={handleOpenMenu}>
        <div className="menu-btn">
          <ul
  
          >
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      
      <div className="logo" tabIndex="0"
               style={{ 
                            backgroundImage: 'url("https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png")' 
                          }}
      >
        {isAuthenticated && user && (
          <div className="user-welcome">
            <span>স্বাগতম, {user.fullName}</span>
          </div>
        )}
      </div>
      
      <div className="header-right-btn-group">
        <a className="app-download" href="/bd/bn/app-download" target="_blank" rel="noopener noreferrer">
          <span className="item-icon app-download-icon"
          style={{maskImagea:"url(https://img.s628b.com/sb/h5/assets/images/icon-set/index-theme-icon/header-appdownload-icon.svg?v=1763700584552)",
          WebkitMaskImage:"url(https://img.s628b.com/sb/h5/assets/images/icon-set/index-theme-icon/header-appdownload-icon.svg?v=1763700584552)"}}
          
          ></span>
          <p>App</p>
        </a>
        
        <a className="service-btn"
        
         name="liveChatBtn" 
        onClick={handleOpenSupport}
        >
          <span className="item-icon customer-icon" 
          style={{maskImagea:"url(https://img.s628b.com/sb/h5/assets/images/icon-set/index-theme-icon/header-customer-icon.svg)",
          WebkitMaskImage:"url(https://img.s628b.com/sb/h5/assets/images/icon-set/index-theme-icon/header-customer-icon.svg)"}}
          ></span>
          <p>লাইভ চ্যাট</p>
        </a>
      </div>
    </header>
  );
};

export default Header;