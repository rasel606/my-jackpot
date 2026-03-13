// components/pages/PromotionPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPromotionPage = ({ showError, showSuccess, showWarning, showInfo }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('running');

  const closeModal = () => {
    navigate(-1);
  };

  const tabs = [
    { key: 'running', label: 'Running', badge: null },
    { key: 'completed', label: 'Completed', badge: null }
  ];

  const renderContent = () => {
    if (activeTab === 'running') {
      return (
        <div className="inner-box ng-tns-c1248122026-37 ng-trigger ng-trigger-staggerFadeAnimation ng-star-inserted">
          <NoData 
            imageUrl="https://img.s628b.com/sb/h5/assets/images/no-data-wallet.png?v=1761024116679&source=mcdsrc"
            altText="no-data-wallet"
            message="No Data"
          />
        </div>
      );
    } else if (activeTab === 'completed') {
      return (
        <div className="inner-box ng-tns-c1248122026-37 ng-trigger ng-trigger-staggerFadeAnimation ng-star-inserted">
          <NoData 
            imageUrl="https://img.s628b.com/sb/h5/assets/images/no-data-wallet.png?v=1761024116679&source=mcdsrc"
            altText="no-data-wallet"
            message="No Data"
          />
        </div>
      );
    }
  };

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">My Promotion</div>
            <div className="popup-page-main__close ng-star-inserted" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content mcd-style player-content">
              <TabButton 
                tabs={tabs} 
                activeTab={activeTab} 
                onTabChange={setActiveTab}
              />
              <div className="ng-tns-c3777251059-36 ng-trigger ng-trigger-tabPageTriggerAni">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// TabButton Component
const TabButton = ({ tabs, activeTab, onTabChange }) => {
  const activeIndex = tabs.findIndex(tab => tab.key === activeTab);
  const lineWidth = `calc(${100 / tabs.length}%)`;
  const lineTransform = `translate(${activeIndex * 100}%, 0px)`;

  return (
    <div className="tab-btn-section tab-btn-wrap ng-star-inserted">
      <div className="tab-btn tab-btn-bar">
        <div 
          className="line" 
          style={{ 
            width: lineWidth, 
            transform: lineTransform 
          }}
        ></div>
        {tabs.map((tab, index) => (
          <div
            key={tab.key}
            className={`btn ${activeTab === tab.key ? 'active' : ''} ng-star-inserted`}
            onClick={() => onTabChange(tab.key)}
          >
            <div className="text">
              {tab.label}
              {tab.badge && <div className="badge">{tab.badge}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// NoData Component
const NoData = ({ imageUrl, altText, message }) => {
  return (
    <div className="no-result">
      <div className="pic">
        <img 
          src={imageUrl} 
          alt={altText}
          loading="lazy"
        />
      </div>
      <div className="text ng-star-inserted">{message}</div>
    </div>
  );
};

export default MyPromotionPage;