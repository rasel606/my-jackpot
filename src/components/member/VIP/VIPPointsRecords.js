// components/vip/VIPPointsRecords.js
import React, { useState } from 'react';


const VIPPointsRecords = () => {
  const [activeTab, setActiveTab] = useState('received');

  const tabs = [
    { key: 'received', label: 'VP Received' },
    { key: 'used', label: 'VP Used' }
  ];

  return (
    <div className="player-vip">
      <div className="player-top">
        <div className="tab-btn-section">
          <div className="tab-btn tab-btn-page">
            <div 
              className="line" 
              style={{ 
                width: `calc(${100 / tabs.length}%)`, 
                transform: `translate(${activeTab === 'received' ? '0%' : '100%'}, 0px)` 
              }}
            ></div>
            {tabs.map(tab => (
              <div 
                key={tab.key}
                className={`btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <div className="text">{tab.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tab-content tab-content-page">
        <div className="tab-content-inner">
          {/* No Data State */}
          <div className="inner-box">
            <div className="no-result">
              <div className="pic">
                <img 
                  alt="no-data" 
                  src="https://img.s628b.com/sb/h5/assets/images/no-data.png?v=1761636564965" 
                  loading="lazy" 
                />
              </div>
              <div className="text">No Data</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VIPPointsRecords;