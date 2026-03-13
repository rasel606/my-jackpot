import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";

const MemberMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showBalance, setShowBalance] = useState(true);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const closeModal = () => {
    // যদি background location থাকে, তাহলে পূর্বের location-এ back করবে
    // নাহলে home page-এ navigate করবে
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };
  const { userBalance, handleRefresh,refreshing, setRefreshing } = useApp();
  const handleMenuItemClick = (path, isPopup = true) => {
    if (isPopup) {
      navigate(path, { state: { background: location } });
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  const menuSections = [
    {
      title: "Funds",
      items: [
        {
          key: "deposit",
          label: "Deposit",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-deposit.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/deposit"),
        },
        {
          key: "withdrawal",
          label: "Withdrawal",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-withdrawal.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/withdrawal"),
        },
        {
          key: "wallet",
          label: "My Promotion",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-bonuses.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/my_promotion"),
        },
        {
          key: "real-time-bonus",
          label: "Real-Time Bonus",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-real-time-bonus.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/real-time-bonus"),
        },
      ],
    },
    {
      title: "History",
      items: [
        {
          key: "total",
          label: "Betting Records",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-bet-records.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/betting-records"),
        },
        {
          key: "water",
          label: "Turnover",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-turnover.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/turnover"),
        },
        {
          key: "history",
          label: "Transaction Records",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-records.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/transaction-records"),
        },
      ],
    },
    {
      title: "Profile",
      items: [
        {
          key: "account",
          label: "Personal Info",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-profile.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/profile"),
        },
        {
          key: "changepassword",
          label: "Change Password",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-changepassword.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/change-password"),
        },
        {
          key: "mail",
          label: "Inbox",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-inbox.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/inbox"),
          badge: 122,
        },
        {
          key: "recommendfriend",
          label: "Refer Bonus",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-referral.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/refer-bonus"),
        },
      ],
    },
    {
      title: "Contact Us",
      items: [
        {
          key: "talk",
          label: "Live Chat",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-customer.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/live-chat"),
        },
        {
          key: "telegram",
          label: "Telegram",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-telegram.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/telegram"),
        },
        {
          key: "email",
          label: "Support Email",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-email.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/support-email"),
        },
        {
          key: "facebook-messenger",
          label: "Facebook",
          icon: "https://img.s628b.com/sb/h5/assets/images/icon-set/theme-icon/icon-facebook-messenger.png?v=1760412521693",
          onClick: () => handleMenuItemClick("/facebook"),
        },
      ],
    },
  ];

  return (
    <div className="member-menu-wrapper active">
      <div className="member-menu ng-star-inserted active">
        <div className="close" onClick={closeModal}></div>

        <div className="member-header bonuswallet ng-star-inserted">
          <div className="member-header-content">
            <div className="user-info">
              <div
                className="pic pic-lv1 ng-star-inserted"
                style={{
                  backgroundImage:
                    'url("https://img.s628b.com/sb/h5/assets/images/player/vip/memberpic-lv1.svg?v=1760412521693")',
                }}
              ></div>
              <div className="infor">
                <div className="account">
                  <span className="ng-star-inserted">
                    {user?.username || "Samun"}
                  </span>
                </div>
                <div className="my-id active">
                  ID{" "}
                  <span id="memberMenu_header_userId">
                    {user?.userId || "msaikat125623"}
                  </span>
                </div>
                <div className="vip-points active ng-star-inserted">
                  <p>VIP Points (VP)</p>
                  <span>0</span>
                  <a
                    className="my-vip-btn"
                    title="my-vip"
                    onClick={() =>
                      handleMenuItemClick("/vip-points-exchange")
                    }
                  >
                    My VIP
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Member Menu Content */}
        <div className="member-menu-content bonuswallet ng-star-inserted">
          {/* Balance Box */}
          <div className="member-menu-box balance-box ng-star-inserted">
            <div className="balance">
              
              <div className="text">
                Main Wallet
                <div
                  className={`icon refresh ${refreshing ? "active" : ""}`}
                  onClick={handleRefresh}
 style={{
                    maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-refresh-type01.svg?v=1760412521693")'
                  }}
                  
                ></div>
                <div
                  className="icon eyes"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBalanceVisibility();
                  }}

                  style={{
                    maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-eye-open-type01.svg?v=1760412521693")'
                  }}
                ></div>
              </div>{" "}
              <span className="amount">
                <i className="balance-value">
                  <i id="" style={{ display: "initial", color: "#fff" }}>
                    {showBalance ? `৳ ${userBalance?.toFixed(2)}` : "•••••"}
                  </i>
                </i>
              </span>
            </div>
            <div className="balance">
              <div className="text">
                Bonus Wallet
                <div
                  className="icon refresh"
                  style={{
                    maskImage:
                      'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-refresh-type01.svg?v=1760412521693")',
                  }}
                ></div>
                <div
                  className="icon bonuswallet"
                  style={{
                    maskImage:
                      'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-bonuswallet.svg?v=1760412521693")',
                  }}
                ></div>
              </div>
              <span className="amount">
                <i>৳ {user?.bonus || "0"}</i>
              </span>
            </div>
          </div>

          {/* Menu Sections */}
          {menuSections.map((section, index) => (
            <div
              key={section.title}
              className="member-menu-box member-list ng-star-inserted"
            >
              <div className="title">
                <h2>
                  <span>{section.title}</span>
                </h2>
              </div>
              <ul className={section.title === "History" ? "align-center" : ""}>
                {section.items.map((item) => (
                  <li key={item.key} className={`${item.key} ng-star-inserted`}>
                    <a onClick={item.onClick} className="mcd-neua-click">
                      <span
                        className="item-icon ng-star-inserted"
                        style={{ backgroundImage: `url(${item.icon})` }}
                      ></span>
                      <p>{item.label}</p>
                      {item.badge && (
                        <span className="notice ng-star-inserted">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Logout Button */}
          <div className="member-menu-logout">
            <a onClick={handleLogout}>
              <span
                className="item-icon ng-star-inserted"
                style={{
                  maskImage:
                    'url("https://img.s628b.com/sb/h5/assets/images/icon-set/index-theme-icon/header-logout-icon.svg?v=1760412521693")',
                }}
              ></span>
              <div className="text">
                <p>Log out</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberMenu;
