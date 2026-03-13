// components/vip/VIPHistory.js
import React from 'react';
import { useApp } from '../../../contexts/AppContext';


const VIPHistory = () => {
  const { vipData, conversionData, updateConversionData, convertPoints } = useApp();

  const getLevelIcon = (level) => {
    const levelIcons = {
      'Copper': 'https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/vip-sidenav-1.svg?v=1761636564965',
      'Bronze': 'https://img.s628b.com/sb/h5/assets/images/icon-set/player/vip/vip-sidenav-2.svg?v=1761636564965',
      // Add other level icons
    };
    return levelIcons[level] || levelIcons.Copper;
  };

  // Group history by year
  const historyByYear = vipData.history.reduce((acc, record) => {
    if (!acc[record.year]) {
      acc[record.year] = [];
    }
    acc[record.year].push(record);
    return acc;
  }, {});

  return (
    <div className="acquired-content">
      <div className="history-content">
        {Object.entries(historyByYear).map(([year, records]) => (
          <div key={year} className="vip-history-year">
            <div className="vip-year">{year}</div>
            <div className="vip-history-list">
              {records.map((record, index) => (
                <ul key={index} className="form-vip-history">
                  <li className="vip-month">{record.month}</li>
                  <li className="lv1 vip-level">
                    <span 
                      className="item-icon" 
                      style={{ backgroundImage: `url(${getLevelIcon(record.level)})` }}
                    ></span>
                    <div className="text">VIP LEVEL</div>
                    <div className="level">{record.level}</div>
                  </li>
                  <li className="vip-acquired">
                    <div className="text">Experience Acquired</div>
                    <div className="acquired">{record.experience.toFixed(2)}</div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VIPHistory;