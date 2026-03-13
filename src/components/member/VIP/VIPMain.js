// components/vip/VIPMain.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useApp } from '../../../contexts/AppContext';

const VIPMain = () => {
  const { vipData, conversionData, updateConversionData, convertPoints } = useApp();
  const navigate = useNavigate();
    const location = useLocation();
  const [showConversionSuccess, setShowConversionSuccess] = useState(false);

  const progressPercentage = (vipData.experience / vipData.nextLevelExperience) * 100;
  const neededExperience = vipData.nextLevelExperience - vipData.experience;

  const handleConvert = () => {
    const result = convertPoints();
    if (result.success) {
      setShowConversionSuccess(true);
      setTimeout(() => setShowConversionSuccess(false), 3000);
    } else {
      // You can use your notification system here
      alert(result.message);
    }
  };

  const getLevelIcon = (level) => {
    const levelIcons = {
      'Copper': 'https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/vip-sidenav-1.svg?v=1761636564965',
      'Bronze': 'https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/vip-sidenav-2.svg?v=1761636564965',
      // Add other level icons
    };
    return levelIcons[level] || levelIcons.Copper;
  };

  return (
    <div className="vip-content">
      {/* VIP Level Card */}
      <div className="player-vip-box deco vip-card lv1 item-ani">
        <div className="card-top">
          <div className="vip-lv-area">
            <div className="lv-totem">
              <span 
                className="item-icon" 
                style={{ backgroundImage: `url(${getLevelIcon(vipData.currentLevel)})` }}
              ></span>
            </div>
            <div className="lv-text">
              <div className="text">VIP LEVEL</div>
              <h2>{vipData.currentLevel}</h2>
            </div>
            <a 
              className="lv-history" 
              onClick={() => navigate('/vip-history', { state: { background: location } })}
            >
              <span 
                className="item-icon" 
                style={{ maskImage: 'url(https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/icon-history.svg?v=1761636564965)' }}
              ></span>
              <p>history</p>
            </a>
          </div>

          <div className="vip-lv-area">
            <div className="progress-bar">
              <div className="txt">
                <p><span>{vipData.experience.toFixed(2)}</span>/{vipData.nextLevelExperience}</p>
              </div>
              <div className="bar">
                <div 
                  className="bar-inner" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="number">
                <span></span>
                <span></span>
              </div>
            </div>
            <div 
              className="next-lv-totem"
              style={{ backgroundImage: 'url(https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/vip-totem-bg-2.svg?v=1761636564965)' }}
            ></div>
          </div>

          <p>
            You need <i>{neededExperience.toFixed(2)}</i> more VIP Experience to upgrade to next <i>{vipData.nextLevel}</i> level.
          </p>
        </div>
      </div>

      {/* VIP Points Card */}
      <div className="player-vip-box total item-ani">
        <div className="title">VIP Points</div>
        <div className="status-box">
          <div className="status">
            <div className="number">{vipData.currentPoints}</div>
            <div className="text">VP</div>
          </div>
          <a 
            className="cleader" 
            onClick={() => navigate('/vip-points-records', { state: { background: location } })}
          >
            <span 
              className="item-icon" 
              style={{ maskImage: 'url(https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/icon-points.svg?v=1761636564965)' }}
            ></span>
            <p>detail</p>
          </a>
        </div>
      </div>

      {/* Conversion Card */}
      <div className="player-vip-box cash-card item-ani">
        <div className="title">
          <h2><span>Convert VP</span></h2>
        </div>
        
        <div className="cash-points">
          <div className="coin">
            <div className="movie-box">
              <video 
                width="100%" 
                height="100%" 
                autoPlay 
                playsInline 
                loop 
                poster="https://img.s628b.com/sb/h5/assets/images/vip/coin-rotate-silver.png?v=1761636564965"
              >
                <source src="https://img.s628b.com/sb/h5/assets/images/vip/coin-rotate-silver-alpha.mov?v=1761636564965" type="video/quicktime" />
                <source src="https://img.s628b.com/sb/h5/assets/images/vip/coin-rotate-silver-alpha.webm?v=1761636564965" type="video/webm" />
              </video>
            </div>
            
            <div className="convert-icon">
              <div className="chevron"></div>
              <div className="chevron"></div>
            </div>
            
            <div className="movie-box">
              <video 
                width="100%" 
                height="100%" 
                autoPlay 
                playsInline 
                loop 
                poster="https://img.s628b.com/sb/h5/assets/images/vip/coin-rotate-gold.png?v=1761636564965"
              >
                <source src="https://img.s628b.com/sb/h5/assets/images/vip/coin-rotate-gold-alpha.mov?v=1761636564965" type="video/quicktime" />
                <source src="https://img.s628b.com/sb/h5/assets/images/vip/coin-rotate-gold-alpha.webm?v=1761636564965" type="video/webm" />
              </video>
            </div>
          </div>
          
          <div className="cash-detail">
            <div className="cash-input">
              <div className="detail-title">
                <span>Points</span>
                <p className="text">
                  Minimum VP Required: <span>{vipData.minConversionPoints}</span>
                </p>
              </div>
              <input 
                type="number" 
                inputMode="numeric" 
                placeholder="0"
                value={conversionData.points || ''}
                onChange={(e) => updateConversionData('points', parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="conversion">
              <div className="ratio">
                <span>VP Conversion Ratio : </span>
                <div className="text">{vipData.conversionRatio}</div>
              </div>
            </div>
            
            <div className="cash-input">
              <div className="detail-title">
                <span>Real Money</span>
              </div>
              <input 
                type="number" 
                inputMode="numeric" 
                placeholder="0"
                value={conversionData.money || ''}
                onChange={(e) => updateConversionData('money', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Convert Button */}
      <div className="button-ani item-ani button default" onClick={handleConvert}>
        Convert to Real Money 
        <img 
          alt="convert-button-dfbg" 
          src="https://img.s628b.com/sb/h5/assets/images/player/vip/convert-button-dfbg.png?v=1761636564965" 
          loading="lazy" 
        />
      </div>

      {/* Conversion Success Animation */}
      {showConversionSuccess && (
        <div id="convert-content" className="convert-content">
          <div className="convert-ani">
            <div className="coin-block">
              <video 
                width="100%" 
                height="100%" 
                loop 
                poster="https://img.s628b.com/sb/h5/assets/images/vip/vip-coin.png?v=1761636564965"
              >
                <source src="https://img.s628b.com/sb/h5/assets/images/vip/vip-coin-alpha.mov?v=1761636564965" type="video/quicktime" />
                <source src="https://img.s628b.com/sb/h5/assets/images/vip/vip-coin-alpha.webm?v=1761636564965" type="video/webm" />
              </video>
              <div className="convert-success text">Success !</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VIPMain;