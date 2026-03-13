
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RealTimeBonus = ({ showError, showSuccess, showWarning, showInfo }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const closeModal = () => {
    navigate(-1);
  };

  const tabs = [
    { label: 'Today' },
    { label: 'Yesterday' },
    { label: 'Last 7 days' },
    { label: 'Optional Date' }
  ];

  const handlePlayGames = () => {
    // Navigate to games page or handle play games action
    console.log('Play games clicked');
  };

  return (
    <div className="popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={closeModal}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          <div className="popup-page-main__header">
            <div className="popup-page-main__title">Real-Time Bonus</div>
            <div className="popup-page-main__close" onClick={closeModal}></div>
          </div>
          <div className="popup-page-main__container">
            <div className="content mcd-style player-content">
              <div className="real-time-bonus-wrap">
                
                {/* Available Amount Box */}
                <div className="menu-box available-amount">
                  <div 
                    className="available-amount__bg" 
                    style={{ 
                      backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/real-time-bonus/bg-available-amount.png?v=1761024116679")' 
                    }}
                  ></div>
                  <div className="available-amount__title">
                    <div 
                      className="available-amount__icon"
                      style={{ 
                        maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/real-time-bonus/icon-available-amount.svg?v=1761024116679")' 
                      }}
                    ></div>
                    <div className="available-amount__text">Available Amount</div>
                  </div>
                  <div 
                    className="available-amount__decor"
                    style={{ 
                      backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/real-time-bonus/deco-available-amount.png?v=1761024116679")' 
                    }}
                  ></div>
                  <div className="available-amount__value">৳0</div>
                  <div className="button available-amount__button">
                    <a onClick={handlePlayGames}>Play Games</a>
                  </div>
                </div>

                {/* Claimed Box */}
                <div className="menu-box">
                  <div className="claimed-box">
                    <div className="claimed-box__item">
                      <div className="claimed-box__title">Claimed Today</div>
                      <div className="claimed-box__value">৳1.51</div>
                    </div>
                    <div className="claimed-box__item">
                      <div className="claimed-box__title">Claimed This Week</div>
                      <div className="claimed-box__value">৳1.51</div>
                    </div>
                  </div>
                </div>

                {/* Bonus Summary */}
                <div className="menu-box">
                  <div className="bonus-summary-box">
                    <div className="bonus-summary__title">
                      <h2><span>Summary</span></h2>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="tab-btn-block">
                    <div className="tab-btn tab-btn-page tab-real-time-bonus">
                      <div 
                        className="line" 
                        style={{ 
                          width: 'calc(25%)', 
                          transform: `translate(${activeTab * 100}%, 0px)` 
                        }}
                      ></div>
                      {tabs.map((tab, index) => (
                        <div 
                          key={index}
                          className={`btn ${activeTab === index ? 'active' : ''}`}
                          onClick={() => setActiveTab(index)}
                        >
                          <div className="text">{tab.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bonus Details */}
                  <ul className="bonus-summary__group">
                    <li className="accordion-wrap real-time-bonuses-accordion">
                      <div className="accordion-header">
                        <div className="accordion-header__main-info">
                          <h4 className="accordion-header__title">
                            রিয়েল টাইম বোনাস (ক্যাসিনো + স্লট + খেলাধুলা)
                          </h4>
                          <span 
                            className="accordion-header__arrow"
                            style={{ 
                              maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-arrow-type09.svg?v=1761024116679")' 
                            }}
                          ></span>
                        </div>
                        <div className="accordion-header__total-amount-info">
                          <div className="total-rebate">
                            <span className="total-rebate__title">Total Rebate Amount</span>
                            <span className="total-rebate__value">1.51</span>
                          </div>
                          <div className="total-claimed">
                            <span className="total-claimed__title">Total Claimed</span>
                            <span className="total-claimed__value">1.51</span>
                          </div>
                          <div className="total-expired">
                            <span className="total-expired__title">Total Expired</span>
                            <span className="total-expired__value">0</span>
                          </div>
                        </div>
                      </div>
                      <ul className="accordion-collapse">
                        <li>
                          <div className="no-result">
                            <div className="pic">
                              <img 
                                alt="no-data" 
                                src="https://img.s628b.com/sb/h5/assets/images/no-data.png?v=1761024116679&source=mcdsrc" 
                                loading="lazy" 
                              />
                            </div>
                            <div className="text">No Data</div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeBonus;