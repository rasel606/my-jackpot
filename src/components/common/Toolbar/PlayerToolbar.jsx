
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useEffect, useState } from 'react';


const PlayerToolbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

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
      link: "/account",
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
    // Check if authentication is required but user is not authenticated
    if (tab.requiresAuth && !isAuthenticated) {
      navigate('/login', { 
        state: { background: location } 
      });
      return;
    }

    setActiveTab(tab.id);
    
    // Navigate based on whether it's a popup route or not
    if (tab.isPopup) {
      navigate(tab.link, { 
        state: { background: location } 
      });
    } else {
      navigate(tab.link);
    }
  };

  const handleMcdNeuaClick = (tab, event) => {
    event.preventDefault();
    handleTabClick(tab);
  };

  return (
    <div className="mcd-player-toolbar-inner">
      <div id="toolbar" className="toolbar">
        <ul>
          {tabs.map(tab => (
            <li 
              key={tab.id} 
              className={`${tab.id} ${activeTab === tab.id ? 'active' : ''}`}
              tabIndex={tab.id === 'deposit' ? 0 : undefined}
            >
              <a 
                href="#" 
                onClick={(e) => handleMcdNeuaClick(tab, e)}
                className="mcd-neua-click"
              >
                <span 
                  className="item-icon" 
                  style={{ 
                    backgroundImage: `url(${tab.icon})` 
                  }}
                ></span>
                <span 
                  className="item-icon-active" 
                  style={{ 
                    backgroundImage: `url(${tab.activeIcon})` 
                  }}
                ></span>
                <p>{tab.label}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlayerToolbar;