// components/layouts/GameLaunchPopup.jsx
import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';

const GameLaunchPopup = ({
  show = false,
  onClose,
  gameUrl,
//   providerLogo,
//   providerName,

  userName,
//   userIp
}) => {
  // const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const { handleRefresh, loading, setLoading, setGameLaunchState } = useApp();
console.log('Launch game API response:', gameUrl);
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      // Simulate loading completion after 2 seconds
      // const timer = setTimeout(() => {
      //   setLoading(false);
      // }, 2000);

      return () => {
        // clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [show]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
      handleRefresh();
    }
  };

  const handleIframeLoad = () => {
    // setLoading(false);
  };


  if(loading){
    return <div 
                  className="launch-game-loading" 
                  style={{ display: loading ? 'block' : 'none' }}
                >
                  <div className="loading-bg" style={{ display: 'none' }}></div>
                  <div className="loader-round" style={{ opacity: loading ? 1 : 0 }}>
                    <svg 
                      version="1.2" 
                      baseProfile="tiny" 
                      id="Layer_1" 
                      x="0px" 
                      y="0px" 
                      width="471.197px" 
                      height="471.197px" 
                      viewBox="0 0 471.197 471.197" 
                      overflow="inherit" 
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <linearGradient id="loading-bar-color">
                          <stop 
                            offset="5%" 
                            className="loading-stop-color" 
                            style={{ stopColor: 'rgba(238,199,102, 0.8)' }}
                          ></stop>
                          <stop 
                            offset="100%" 
                            className="loading-end-color" 
                            style={{ stopColor: 'rgba(238,199,102, 1)' }}
                          ></stop>
                        </linearGradient>
                      </defs>
                      <g id="loader">
                        <circle 
                          id="dark" 
                          fill="transparent" 
                          strokeWidth="36" 
                          strokeLinecap="round" 
                          strokeMiterlimit="1" 
                          cx="235.582" 
                          cy="235.114" 
                          r="212.599" 
                          className="circle"
                        ></circle>
                        <circle 
                          id="white" 
                          fill="transparent" 
                          strokeWidth="36" 
                          strokeLinecap="round" 
                          strokeMiterlimit="10" 
                          cx="235.582" 
                          cy="235.114" 
                          r="212.599" 
                          className="circle"
                        ></circle>
                      </g>
                    </svg>
                    <div 
                      className="center-logo-bg" 
                      style={{ 
                        boxShadow: 'linear-gradient(180deg, rgba(5, 5, 5, 0.7) 20%, rgba(238,199,102, 0.8) 100%)' 
                      }}
                    >
                      {/* {providerLogo && (
                        <img 
                          className="center-logo ng-star-inserted" 
                          alt={`provider-${providerName}`}
                          src={providerLogo}
                          loading="lazy"
                        />
                      )} */}
                    </div>
                  </div>
                </div>}



  if (!show) return null;

  return (
    <div className="cdk-overlay-container">
      <div 
        className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing"
        onClick={handleBackdropClick}
      ></div>
      
      <div className="cdk-global-overlay-wrapper" dir="ltr" style={{ justifyContent: "center", alignItems: "center" }}>
        <div className="cdk-overlay-pane dialog-panel" style={{ position: "static" }}>
          <div className="popup" id="dialog-5">
            <div className="popup__header"></div>
            <div className="popup__content">
              <div className="launch-game-content ng-star-inserted">
                
                {/* Loading Section */}


                <div 
                  className="launch-game-page" 
                  style={{ display: loading ? 'none' : 'block' }}
                >
                  {/* Top Menu Bar */}
                  <div className="site-top" style={{ display: 'block' }}>
                    <div className="site-menu no-deposit">
                      
                      {/* Close Button */}
                      <div 
                        className="btn" 
                        style={{ transform: 'translate(0px, 0px)', opacity: 1 }}
                        onClick={onClose}
                      >
                        <div className="btn-cross"></div>
                      </div>

                      {/* User Info */}
                      <div 
                        className="info-wrap" 
                        style={{ 
                          display: showMenu ? 'block' : 'none', 
                          opacity: 1, 
                          transform: 'skew(-10.0002deg, 0deg)' 
                        }}
                      >
                        <div className="info-block">
                          <div className="info-title">USER</div>
                          <div className="info-value">
                            <span className="info-value-sub ng-star-inserted">
                              {/* {userIp ? ` - ${userIp}` : ''} */}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Logo */}
                      <div 
                        className="f-logo-bg" 
                        style={{ transform: 'translate(0px, 0px)', opacity: 1 }}
                      >
                        <div 
                          className="f-logo logo-image" 
                          style={{ 
                            backgroundImage: 'url("https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png")' 
                          }}
                        ></div>
                        <div 
                          className="light-ring" 
                          style={{ 
                            backgroundImage: 'url("https://i.ibb.co.com/KLDFxr7/Whats-App-Image-2025-01-06-at-11-56-01-74a47a32-removebg-preview.png")', 
                            transform: 'translate(0px, 0px)', 
                            opacity: 1 
                          }}
                        ></div>
                      </div>

                      {/* Deposit Button */}
                      <div 
                        className="btn" 
                        style={{ transform: 'translate(0px, 0px)', opacity: 1 }}
                      >
                        <div 
                          className="btn-deposit" 
                          style={{ 
                            maskImage: 'url("/assets/images/launch-game/icon-deposit.svg")' 
                          }}
                        ></div>
                        <div 
                          className="light-ring" 
                          style={{ 
                            backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/launch-game/icon-light-ring.svg?v=1761024116679")', 
                            transform: 'translate(0px, 0px)', 
                            opacity: 1 
                          }}
                        ></div>
                      </div>

                      {/* Menu Background */}
                      <div 
                        className="menu-bg" 
                        style={{ opacity: 1, height: '100%', width: '100%' }}
                      >
                        <div 
                          className="highlight" 
                          style={{ 
                            boxShadow: 'inset 0 -1.5px 2.5px 0 rgba(238,199,102, 1), inset 0 1px 3px 0 rgba(255,255,255,.5)',
                            backgroundImage: 'inset 0 -1.5px 2.5px 0 rgba(238,199,102, 1), inset 0 1px 3px 0 rgba(255,255,255,.5)'
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div 
                      className="top-bg" 
                      style={{ transform: 'translate(0px, -100px)' }}
                    ></div>
                  </div>

                  {/* Background Gradient */}
                  <div 
                    className="site-bg" 
                    style={{ 
                      background: 'linear-gradient(rgba(5, 5, 5, 0.7) 20%, rgba(238, 199, 102, 0.8) 100%)', 
                      transform: 'translate(0px, 0px)' 
                    }}
                  ></div>

                  {/* Game Iframe */}
                  <div 
                    className="launch-game-wrap show" 
                    style={{ transform: 'translate(0px, 0px)' }}
                  >
                    <iframe 
                      name="myiFrame" 
                      marginHeight="0" 
                      marginWidth="0" 
                      height="603" 
                      width="375" 
                      allowFullScreen 
                      className="launch-game-iframe" 
                      style={{ border: '0px #ffffff none' }} 
                      scrolling="yes" 
                      src={gameUrl}
                      onLoad={handleIframeLoad}
                      title="Game"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLaunchPopup;