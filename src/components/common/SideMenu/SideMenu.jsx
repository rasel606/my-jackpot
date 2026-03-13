


// components/SideMenu/SideMenu.js
import React, { useEffect } from "react";
import { useGameData } from "../../../hooks/useGameData";
import { useRefreshBalance } from "../../../hooks/useRefreshBalance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useApp } from "../../../contexts/AppContext";

const SideMenu = ({ onClose }) => {
  const navigate = useNavigate();
  const { gameLaunchState, closeGame, launchGame } = useApp();
  const { balance, refreshing, handleRefresh } = useRefreshBalance();
  const { data, loading, active, activeIndex, handleItemClick, gameData , setActive, setActiveIndex } = useGameData();
  const { userId, isAuthenticated } = useAuth();

  const onRefreshBalance = () => {
    if (userId) {
      handleRefresh(userId);
    }
  };
 useEffect(() => {
    if (data.length > 0 && !active) {
      setActive(data[0]);
      setActiveIndex(0);
    }
  }, [data, active]);
  // Menu data structure
  const menuData = {
    home: {
      id: "home",
      title: "Home",
      icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-home.png?v=1761636564965",
      link: "/",
    },
    promotions: [
      {
        id: "promotions",
        title: "Promotions",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-promotion.png?v=1761636564965",
        link: "/promotion",
      },
      {
        id: "vip-program",
        title: "VIP Program",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-vip.png?v=1761636564965",
        link: "https://sbajisuper.link/en/vip",
        external: true,
      },
      {
        id: "referral",
        title: "Referral",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-referral.png?v=1761636564965",
        link: "#",
        external: true,
      },
      {
        id: "contact-us",
        title: "Contact Us",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-talk.png?v=1761636564965",
        link: "#",
        external: true,
      },
    ],
    support: [
      {
        id: "live-chat",
        title: "Live Chat",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-customer.png?v=1761636564965",
        link: "#",
      },
      {
        id: "telegram",
        title: "Telegram",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-telegram.png?v=1761636564965",
        link: "https://t.me/Superbajibd",
        external: true,
      },
      {
        id: "email",
        title: "Support Email",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-email.png?v=1761636564965",
        link: "mailto:support@superbaji.com",
        external: true,
      },
      {
        id: "facebook",
        title: "Facebook",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-facebook-messenger.png?v=1761636564965",
        link: "https://m.me/superbajibangladesh",
        external: true,
      },
    ],
    referral: [
      {
        id: "refer-bonus",
        title: "Refer Bonus",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/side-sub-nav/icon-referral-bonus.png?v=1761636564965",
        link: "/bd/en/member/common-referral",
      },
      {
        id: "refer-program",
        title: "Refer Program",
        icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/side-sub-nav/icon-referral-program.png?v=1761636564965",
        link: "https://sbajisuper.link/en/referral",
        external: true,
      },
    ],
  };

  // Determine if we should show games or providers
  const shouldShowGames = activeIndex < 2;
  const shouldShowProviders = activeIndex >= 2 && active?.uniqueProviders;

  const handleMenuItemClick = (e, index, item) => {
    e.stopPropagation();
    handleItemClick(index, item, onClose, false); // shouldClose = false
  };

  const handleGameLaunch = async (e, game) => {
    e.stopPropagation();
    if (e.target !== e.currentTarget) onClose();
    // Check authentication before launching game
    // if (!isAuthenticated) {
    //   navigate('/login', { 
    //     state: { 
    //       from: window.location.pathname,
    //       message: "গেম খেলতে লগইন করুন"
    //     } 
    //   });
    //   if (onClose) onClose();
    //   return;
    // }

    const result = await launchGame(game);
    console.log("Game launch result:", result);
    
    if (result !== null  ){
      console.log("Game launched successfully");
      
    } 
    
    // else if (result.requiresLogin) {
    //   navigate('/login', { 
    //     state: { 
    //       from: window.location.pathname,
    //       message: "গেম খেলতে লগইন করুন"
    //     } 
    //   });
    //   if (onClose) onClose();
    // } 
    
    else {
      console.error("Game launch failed:", result.message);
      // You can show error notification here
    }
  };

  const handleProviderClick = (e, category, provider) => {
    e.stopPropagation();
    
    // Navigate to provider page
    navigate(`/gamesProvidersPage/${encodeURIComponent(category.category_name)}/${encodeURIComponent(provider.providercode)}`);
    
    // Close menu
    if (onClose) {
      onClose();
    }
  };

  const handleHomeClick = (e) => {
    e.stopPropagation();
    navigate("/");
    if (onClose) onClose();
  };

  const handlePromotionClick = (e, link, external = false) => {
    e.stopPropagation();
    
    if (external) {
      window.open(link, '_blank');
    } else {
      navigate(link);
    }
    
    if (onClose) onClose();
  };

  const handleSupportClick = (e, link, external = false) => {
    e.stopPropagation();
    
    if (external) {
      window.open(link, '_blank');
    } else {
      // For live chat, you might want to open chat popup instead of navigation
      if (link === "#") {
        // Open live chat popup here
        console.log("Open live chat");
      } else {
        navigate(link);
      }
    }
    
    if (onClose) onClose();
  };

  const handleSecondMenuClick = (e) => {
    e.stopPropagation();
  };

  if (loading) {
    return (
      <div className="side-menu-loading">
        <div className="loading-spinner">লোড হচ্ছে...</div>
      </div>
    );
  }

  return (
    <>
      <div className="menu-first active">
        {/* Home */}
        <ul className="home ng-star-inserted">
          <li data-category="home" onClick={handleHomeClick}>
            <span
              className="item-icon"
              style={{ backgroundImage: `url(${menuData.home.icon})` }}
            ></span>
            <a style={{ cursor: "pointer" }}>{menuData.home.title}</a>
          </li>
        </ul>

        {/* Game Categories */}
        <ul className="vendor ng-star-inserted">
          {data.map((category, index) => (
            <li
              key={category.id || index}
              className={index === activeIndex ? "active" : ""}
              onClick={(e) => handleMenuItemClick(e, index, category)}
              style={{ cursor: "pointer" }}
            >
              <span
                className="item-icon"
                style={{ backgroundImage: `url(${category.image})` }}
              ></span>
              <a>{category.category_name}</a>
            </li>
          ))}
        </ul>

        {/* Promotions Block */}
        <ul className="promotion-block ng-star-inserted">
          {menuData.promotions.map((item) => (
            <li 
              key={item.id} 
              data-category={item.id}
              onClick={(e) => handlePromotionClick(e, item.link, item.external)}
              style={{ cursor: "pointer" }}
            >
              <span
                className="item-icon"
                style={{ backgroundImage: `url(${item.icon})` }}
              ></span>
              <a className={item.external ? "external" : ""}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Support Block */}
        <div className="support-block ng-star-inserted">
          <ul className="menu-second-ul ng-star-inserted">
            {menuData.support.map((item) => (
              <li 
                key={item.id} 
                className={item.id}
                onClick={(e) => handleSupportClick(e, item.link, item.external)}
                style={{ cursor: "pointer" }}
              >
                <a className="item-link" target={item.external ? "_blank" : "_self"}>
                  <span
                    className="item-icon ng-star-inserted"
                    style={{ backgroundImage: `url(${item.icon})` }}
                  ></span>
                  <p className="item-text">{item.title}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Referral Block */}
        <ul className="menu-second-ul ng-star-inserted">
          {menuData.referral.map((item) => (
            <li 
              key={item.id} 
              data-category="refer-composite-entry"
              onClick={(e) => handlePromotionClick(e, item.link, item.external)}
              style={{ cursor: "pointer" }}
            >
              <a className={item.external ? "external" : ""}>
                <span
                  className="item-icon"
                  style={{ backgroundImage: `url(${item.icon})` }}
                ></span>
                <p className="item-text">{item.title}</p>
              </a>
            </li>
          ))}
        </ul>

        {/* Language Selector */}
        <div className="language-select-area ng-star-inserted">
          <div className="language-area active" value="1">
            <img
              alt="GB"
              src="https://img.s628b.com/sb/h5/assets/images/flag/GB.png?v=1761636564965"
              loading="lazy"
            />
            <p>English</p>
          </div>
          <div className="language-area" value="8">
            <img
              alt="BD"
              src="https://img.s628b.com/sb/h5/assets/images/flag/BD.png?v=1761636564965"
              loading="lazy"
            />
            <p>বাংলা</p>
          </div>
        </div>
      </div>

      {/* Second Level Menu */}
      {/* {active && ( */}
        <div className="menu-second" onClick={handleSecondMenuClick}>
          {/* Show games for first 2 categories */}
          {shouldShowGames && (
            <ul className={`menu-second-ul ${active ? "active" : ""}`} onClick={handleSecondMenuClick}>
              {gameData && gameData.length > 0 ? (
                gameData.map((game, index) => (
                  <li key={index} onClick={handleSecondMenuClick}>
                    <a 
                      onClick={(e) => handleGameLaunch(e, game)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={game.image_url}
                        alt={game.gameName}
                        loading="lazy"
                      />
                      <p>{game.gameName}</p>
                    </a>
                  </li>
                ))
              ) : (
                <li onClick={handleSecondMenuClick}>
                  <div className="no-games">কোন গেম পাওয়া যায়নি</div>
                </li>
              )}
            </ul>
          )}

          {/* Show providers for other categories */}
          {shouldShowProviders && (
            <ul className={`menu-second-ul ${active ? "active" : ""}`} onClick={handleSecondMenuClick}>
              {active.uniqueProviders?.map((item, index) => (
                <li key={index} onClick={handleSecondMenuClick}>
                  <a
                    onClick={(e) => handleProviderClick(e, active, item)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={item.image_url} alt={item.company} loading="lazy" />
                    <p>{item.company}</p>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Show message if no content */}
          {!shouldShowGames && !shouldShowProviders && (
            <ul className={`menu-second-ul ${active ? "active" : ""}`} onClick={handleSecondMenuClick}>
              <li onClick={handleSecondMenuClick}>
                <div className="no-games">কোন গেম পাওয়া যায়নি</div>
              </li>
            </ul>
          )}
        </div>
      {/* )} */}

      {/* Menu Mask */}
      <div 
        className="menu-mask ng-trigger ng-trigger-popBgTriggerAni ng-star-inserted"
        onClick={() => {
          
          onClose();
        }}
      ></div>
    </>
  );
};

export default SideMenu;