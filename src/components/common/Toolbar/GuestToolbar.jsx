
// components/layouts/GuestToolbar.jsx
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import CurrencyLanguagePopup from '../Popups/CurrencyLanguagePopup';


export default function GuestToolbar({ showError, showSuccess, showWarning, showInfo }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyPopup, setShowCurrencyPopup] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    code: 'BD',
    name: 'English',
    currency: 'BDT',
    flag: 'https://img.s628b.com/sb/h5/assets/images/flag/BD.png?v=1760412521693&source=mcdsrc'
  });

  const languages = [
    {
      code: 'BD',
      name: 'English',
      currency: 'BDT',
      flag: 'https://img.s628b.com/sb/h5/assets/images/flag/BD.png?v=1760412521693&source=mcdsrc'
    },
    {
      code: 'US',
      name: 'English',
      currency: 'USD',
      flag: 'https://img.s628b.com/sb/h5/assets/images/flag/US.png?v=1760412521693&source=mcdsrc'
    },
    {
      code: 'UK',
      name: 'English',
      currency: 'GBP',
      flag: 'https://img.s628b.com/sb/h5/assets/images/flag/UK.png?v=1760412521693&source=mcdsrc'
    },
    {
      code: 'IN',
      name: 'Hindi',
      currency: 'INR',
      flag: 'https://img.s628b.com/sb/h5/assets/images/flag/IN.png?v=1760412521693&source=mcdsrc'
    }
  ];

  const tabs = [
    { 
      id: 'home', 
      label: 'হোম', 
      icon: 'https://img.s628b.com/sb/h5/assets/images/icon-set/toolbar-icon/toolbar-icon-home.svg?v=1760412521693',
      activeIcon: 'https://img.s628b.com/sb/h5/assets/images/icon-set/toolbar-icon/toolbar-icon-home.svg?v=1760412521693',
      link: "/",
      isPopup: false
    },
    { 
      id: 'promotion', 
      label: 'প্রমোশন', 
      icon: 'https://img.s628b.com/sb/h5/assets/images/icon-set/toolbar-icon/toolbar-icon-promotion.svg?v=1760412521693',
      activeIcon: 'https://img.s628b.com/sb/h5/assets/images/icon-set/toolbar-icon/toolbar-icon-promotion.svg?v=1760412521693',
      link: "/promotion",
      isPopup: true
    },
    { 
      id: 'deposit', 
      label: 'ডিপোজিট', 
      icon: 'https://img.s628b.com/sb/h5/assets/images/icon-set/toolbar-icon/toolbar-icon-deposit.svg?v=1760412521693',
      activeIcon: 'https://img.s628b.com/sb/h5/assets/images/icon-set/toolbar-icon/toolbar-icon-deposit.svg?v=1760412521693',
      link: "/deposit",
      requiresAuth: true,
      isPopup: true
    },
    { 
      id: 'mine', 
      label: 'মাই একাউন্ট', 
      icon: 'https://img.s628b.com/sb/h5/assets/images/icon-set/toolbar-icon/toolbar-icon-mine.svg?v=1760412521693',
      activeIcon: 'https://img.s628b.com/sb/h5/assets/images/icon-set/toolbar-icon/toolbar-icon-mine.svg?v=1760412521693',
      link: "/profile",
      requiresAuth: true,
      isPopup: true
    }
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentTab = tabs.find(tab => tab.link === currentPath);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    if (tab.requiresAuth && !isAuthenticated) {
      navigate('/login', { 
        state: { background: location } 
      });
      return;
    }

    setActiveTab(tab.id);
    
    if (tab.isPopup) {
      navigate(tab.link, { 
        state: { background: location } 
      });
    } else {
      navigate(tab.link);
    }
  };

  const handleLanguageChange = (selectedCurrency) => {
    const newLanguage = languages.find(lang => lang.currency === selectedCurrency.code);
    if (newLanguage) {
      setCurrentLanguage(newLanguage);
      showSuccess(`Language changed to ${newLanguage.name} (${newLanguage.currency})`);
    }
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate('/register', { 
      state: { background: location } 
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/login', { 
      state: { background: location } 
    });
  };

  const handleLanguageDropdown = (event) => {
    event.preventDefault();
    setShowCurrencyPopup(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-select')) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="mcd-guest-toolbar">
        <div className="beforelogin havelanguage">
          {/* Language Selector */}
          <div 
            className="language-select order-null"
            onClick={handleLanguageDropdown}
          >
            <img 
              width="24" 
              height="16" 
              alt={currentLanguage.code} 
              src={currentLanguage.flag} 
              loading="lazy" 
              className="language-flag"
            />
            <p className="language-info">
              {currentLanguage.currency} <br /> 
              <span className="language-name">{currentLanguage.name}</span>
            </p>
          </div>

          {/* Sign Up Button */}
          <div className="register-button order-null">
            <Link 
              to="/register" 
              onClick={handleSignUp} 
              className="auth-button signup-btn"
              state={{ background: location }}
            >
              Sign up
            </Link>
          </div>

          {/* Login Button */}
          <div className="login-button order-null">
            <Link 
              to="/login" 
              onClick={handleLogin} 
              className="auth-button "
              state={{ background: location }}
            >
              Login
            </Link>
          </div>
        </div>

        
      </div>

      {/* Currency & Language Popup */}
      <CurrencyLanguagePopup
        show={showCurrencyPopup}
        onClose={() => setShowCurrencyPopup(false)}
        onCurrencyChange={handleLanguageChange}
        onLanguageChange={({ language }) => {
          // showSuccess({language});
        }}
        initialCurrency={currentLanguage.currency}
        initialLanguage={currentLanguage.name}
      />
    </>
  );
}