import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ReferBonusPopup = ({ showError, showSuccess, showWarning, showInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, updateUserDetails } = useAuth();
  const [activeTab, setActiveTab] = useState('invite');
  const [friendsInvited, setFriendsInvited] = useState(1);
  const [friendsCompleted, setFriendsCompleted] = useState(0);
  const [todayRebate, setTodayRebate] = useState(0);
  const [yesterdayRebate, setYesterdayRebate] = useState(0);
  const [canClaimBonus, setCanClaimBonus] = useState(0);
  const [showBonusDetails, setShowBonusDetails] = useState(false);

  const invitationCode = `${user.referralCode}`;
  const invitationUrl = `https://api.png71.live/?ref=${user.referralCode}`;
  console.log("user", user)
  const closeModal = () => {
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const toggleBonusDetails = () => {
    setShowBonusDetails(!showBonusDetails);
  };

  // const handleCopyCode = (text, type) => {
  //   navigator.clipboard.writeText(text).then(() => {
  //     showSuccess(`${type} copied to clipboard!`);
  //   }).catch(err => {
  //     showError('Failed to copy to clipboard');
  //   });
  // };

  // const handleShare = () => {
  //   if (navigator.share) {
  //     navigator.share({
  //       title: 'Join me on KingBaji',
  //       text: 'Use my referral code to get bonus!',
  //       url: invitationUrl,
  //     })
  //       .then(() => showSuccess('Invitation shared successfully'))
  //       .catch((error) => showError('Error sharing invitation'));
  //   } else {
  //     handleCopyCode(invitationUrl, 'Invitation URL');
  //   }
  // };
const handleCopyCode = async (text, type) => {
    console.log('Attempting to copy:', text);
    
    try {
      // Method 1: Modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        showSuccess(`${type} copied to clipboard!`);
        return;
      }
      
      // Method 2: execCommand fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        showSuccess(`${type} copied to clipboard!`);
      } else {
        throw new Error('execCommand failed');
      }
    } catch (err) {
      console.error('Copy failed:', err);
      showError('Failed to copy to clipboard');
    }
  };

  const handleShare = async () => {
    console.log('Sharing:', invitationUrl);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join me on KingBaji',
          text: 'Use my referral code to get bonus!',
          url: invitationUrl,
        });
        showSuccess('Invitation shared successfully');
      } else {
        // Fallback: copy to clipboard
        await handleCopyCode(invitationUrl, 'Invitation URL');
      }
    } catch (err) {
      console.error('Share failed:', err);
      if (err.name !== 'AbortError') {
        // Only show error if user didn't cancel the share
        showError('Failed to share invitation');
      }
    }
  };
  const handleClaimBonus = () => {
    if (canClaimBonus > 0) {
      showSuccess(`Successfully claimed ৳ ${canClaimBonus} bonus!`);
      setCanClaimBonus(0);
    } else {
      showWarning('No bonus available to claim');
    }
  };

  return (
    <>
      <div className="content mcd-style fixed-tab player-content">
        <div className="tab-btn-section referral-partner-tab">
          <div className="tab-btn tab-btn-page">
            <div
              className="line"
              style={{
                width: 'calc(50%)',
                transform: activeTab === 'invite' ? 'translate(0%, 0px)' : 'translate(100%, 0px)'
              }}
            ></div>
            <div
              className={`btn ${activeTab === 'invite' ? 'active' : ''}`}
              onClick={() => setActiveTab('invite')}
            >
              <div className="text">Invite</div>
            </div>
            <div
              className={`btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              <div className="text">Details</div>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 'invite' ? (
          <div className="referral-partner">

            {/* Invitation Section */}
            <div className="menu-box invitation-link">
              <div className="title">
                <h2><span>Refer Your Friends and Earn</span></h2>
              </div>
              <div className="code-box">
                <div className="invite-banner">
                  <img
                    alt="referral-invite-banner-en"
                    src="https://img.s628b.com/sb/h5/assets/images/player/referral/referral-invite-banner-en.png"
                    loading="lazy"
                  />
                </div>
                <div className="invite-cont">
                  <div className="left">
                    <div className="bonus-title">Invitation QR Code</div>
                    <div className="invite-qr-code">
                      <div className="qr-code">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(invitationUrl)}`}
                          alt="QR Code"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="bonus-title">Invitation URL</div>
                    <div className="btn-share" onClick={handleShare}>
                      Share
                    </div>
                    <div className="bonus-title">Invitation Code</div>
                    <div className="code">
                      <span>{invitationCode}</span>
                      <div
                        className="btn"
                        onClick={() => handleCopyCode(invitationCode, 'Invitation code')}
                      >
                        <img
                          alt="icon-copy-type02"
                          src="https://img.s628b.com/sb/h5/assets/images/icon-set/icon-copy-type02.svg"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Section */}
            <div className="menu-box referral-dashboard">
              <div className="title">
                <h2><span>Dashboard</span></h2>
              </div>
              <div className="recommend-friends-box">
                <div className="referral-cont">
                  <div className="status-box">
                    <div className="status">
                      <div className="text">Friends' Invited</div>
                      <div className="number">{friendsInvited}</div>
                    </div>
                    <div className="status">
                      <div className="text">Friends' Completed</div>
                      <div className="number">{friendsCompleted}</div>
                    </div>
                    <div className="status">
                      <div className="text">Today's Rebate</div>
                      <div className="number">৳ {todayRebate}</div>
                    </div>
                    <div className="status">
                      <div className="text">Yesterday's Rebate</div>
                      <div className="number">৳ {yesterdayRebate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rebate Bonus Section */}
            <div className="menu-box can-receive-bonus">
              <div className="title">
                <h2><span>Rebate Bonus</span></h2>
              </div>
              <div className="receive-box">
                <div className="referral-banner">
                  <img
                    alt="receive-betting-bonus-banner-en"
                    src="https://img.s628b.com/sb/h5/assets/images/player/referral/receive-betting-bonus-banner-en.png"
                    loading="lazy"
                  />
                </div>
                <div className="item">
                  <div className="receive-bonus">
                    <div className="text">৳ {canClaimBonus}</div>
                    <div
                      type="button"
                      className={`button ${canClaimBonus ? '' : 'btn-disabled'}`}
                      onClick={handleClaimBonus}
                    >
                      Claim
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="menu-box referral-requirement">
              <div className="title">
                <h2><span>Requirement</span></h2>
              </div>
              <div className="condition-box">
                <div className="invite-banner">
                  <img
                    alt="referral-requirement-banner-en"
                    src="https://img.s628b.com/sb/h5/assets/images/player/referral/referral-requirement-banner-en.png"
                    loading="lazy"
                  />
                </div>
                <div className="referral-cont">
                  <div className="title">
                    The following conditions must be met for each referrer and referred friends.
                  </div>
                  <div className="condition-list">
                    <div className="item">
                      <div className="condition">Total Deposits</div>
                      <div className="text">৳ 2,000.00</div>
                    </div>
                    <div className="item">
                      <div className="condition">Total Turnover</div>
                      <div className="text">5,000.00</div>
                    </div>
                    <div className="item">
                      <div className="condition">Within Days</div>
                      <div className="text">7</div>
                    </div>
                    <div className="item">
                      <div className="condition">Email</div>
                      <div className="text">Email verified</div>
                    </div>
                    <div className="item">
                      <div className="condition">Phone</div>
                      <div className="text">Phone verified</div>
                    </div>
                  </div>
                  <div className="code-box-tips">
                    <p>Both you & your friend will receive the bonus once met the conditions.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Goals Section */}
            <div className="menu-box referral-bonus-goals">
              <div className="title title-group">
                <h2><span>Monthly Achievement Goals</span></h2>
                <div className="detail-btn" onClick={toggleBonusDetails}>
                  <img
                    alt="icon-search-type02"
                    src="https://img.c88rx.com/cx/h5/assets/images/icon-set/icon-search-type02.svg"
                    loading="lazy"
                  />
                  <span>Goals & Bonuses</span>
                </div>
              </div>
              <div className="achievement-bonus-block">
                <div className="achievement-bonus item-ani">
                  <ul className="achievement-bonus-box item-ani">
                    <li>
                      <div className="achievement-icon">
                        <img
                          alt="achievement-icon-1"
                          src="https://img.c88rx.com/cx/h5/assets/images/player/referral/achievement-icon-1.png"
                          loading="lazy"
                        />
                      </div>
                      <div className="achievement-bonus-group">
                        <div className="achievement-bonus-title">
                          <p className="txt">Agent Achievement <i>5</i></p>
                          <p className="number"><i>0</i> / 5</p>
                        </div>
                        <div className="achievement-bonus-bar">
                          <div className="progress-bar">
                            <div className="bar">
                              <div className="bar-inner" style={{ width: '0%' }}></div>
                            </div>
                          </div>
                        </div>
                        <strong className="achievement-bonus-number">৳ 177.00</strong>
                      </div>
                    </li>
                    <li>
                      <div className="lock-mask">
                        <div className="icon">
                          <img
                            alt="icon-lock"
                            src="https://img.c88rx.com/cx/h5/assets/images/player/referral/icon-lock.png"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="achievement-icon">
                        <img
                          alt="achievement-icon-2"
                          src="https://img.c88rx.com/cx/h5/assets/images/player/referral/achievement-icon-2.png"
                          loading="lazy"
                        />
                      </div>
                      <div className="achievement-bonus-group">
                        <div className="achievement-bonus-title">
                          <p className="txt">Agent Achievement <i>10</i></p>
                          <p className="number"><i>0</i> / 10</p>
                        </div>
                        <div className="achievement-bonus-bar">
                          <div className="progress-bar">
                            <div className="bar">
                              <div className="bar-inner" style={{ width: '0%' }}></div>
                            </div>
                          </div>
                        </div>
                        <strong className="achievement-bonus-number">৳ 377.00</strong>
                      </div>
                    </li>
                    <li>
                      <div className="lock-mask">
                        <div className="icon">
                          <img
                            alt="icon-lock"
                            src="https://img.c88rx.com/cx/h5/assets/images/player/referral/icon-lock.png"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="achievement-icon">
                        <img
                          alt="achievement-icon-3"
                          src="https://img.c88rx.com/cx/h5/assets/images/player/referral/achievement-icon-3.png"
                          loading="lazy"
                        />
                      </div>
                      <div className="achievement-bonus-group">
                        <div className="achievement-bonus-title">
                          <p className="txt">Agent Achievement <i>15</i></p>
                          <p className="number"><i>0</i> / 15</p>
                        </div>
                        <div className="achievement-bonus-bar">
                          <div className="progress-bar">
                            <div className="bar">
                              <div className="bar-inner" style={{ width: '0%' }}></div>
                            </div>
                          </div>
                        </div>
                        <strong className="achievement-bonus-number">৳ 777.00</strong>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Commission Info Section */}
            <div className="menu-box">
              <div className="title">
                <h2><span>How to Earn More Rewards</span></h2>
              </div>
              <div className="rebate-bonus-box">
                <div className="referral-cont">
                  <div className="sec">
                    <p>
                      All referrer will receive a certain cash reward percentage for every referee
                      when they play games on KingBaji.
                    </p>
                  </div>
                  <div className="sec">
                    <h3>Daily Commission Table</h3>
                    <div className="table">
                      <table>
                        <thead>
                          <tr>
                            <th>Turnover</th>
                            <th>Tier 1</th>
                            <th>Tier 2</th>
                            <th>Tier 3</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>৳ 100 - ৳ 25,000</td>
                            <td>0.15%</td>
                            <td>0.10%</td>
                            <td>0.05%</td>
                          </tr>
                          <tr>
                            <td>৳ 25,001 - ৳ 50,000</td>
                            <td>0.25%</td>
                            <td>0.15%</td>
                            <td>0.10%</td>
                          </tr>
                          <tr>
                            <td>৳ 50,001</td>
                            <td>0.35%</td>
                            <td>0.25%</td>
                            <td>0.20%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="referral-banner">
                  <div className="sec">
                    <img
                      alt="commission-from"
                      src="https://img.s628b.com/sb/h5/assets/images/player/referral/commission-from.png"
                      loading="lazy"
                    />
                    <p>
                      Be diligent in referring, be the upline and earn upto 3 tiers easily.
                    </p>
                    <strong>Earn Lifetime Commissions! With KingBaji</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="referral-partner">
            {/* Details Tab Content */}
            <div className="inner-box">
              {/* Search/Filter Section */}
              <div className="filter-tab">
                <ul className="item-ani">
                  <li className="active">Bonus Type-All</li>
                  <li className="active">Status-All</li>
                  <li className="active">Today</li>
                </ul>
                <div className="btn search-btn">
                  <span className="item-icon"></span>
                </div>
              </div>

              {/* Referral Details List */}
              <div className="recommend-friends-list">
                <div className="rf-list form-title">
                  <div className="bonus-type">Bonus Type</div>
                  <div className="invite-user">Invited users</div>
                  <div className="reward-amount">Reward amount</div>
                  <div className="status">Status</div>
                </div>

                {/* No Data State */}
                <div className="no-result">
                  <div className="pic">
                    <img
                      alt="no-data"
                      src="https://img.s628b.com/sb/h5/assets/images/no-data.png"
                      loading="lazy"
                    />
                  </div>
                  <div className="text">No Data</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bonus Details Popup */}
      {showBonusDetails && (
        <div className="cdk-overlay-container">
          <div className="cdk-overlay-backdrop dialog-backdrop cdk-overlay-backdrop-showing"
            onClick={toggleBonusDetails}></div>
          <div className="cdk-global-overlay-wrapper" dir="ltr"
            style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className="cdk-overlay-pane dialog-panel referral-reward-bonus-popup"
              style={{ position: 'static' }}>
              <div className="popup" id="dialog-1">
                <div className="popup__header"></div>
                <div className="popup__content">
                  <div className="pop-wrap referral-reward-bonus ng-trigger ng-trigger-popWrapTriggerAni ani show">
                    <a className="btn-close" onClick={toggleBonusDetails}></a>
                    <div className="title">
                      <p>Cumulative Deposit Users</p>
                      <p>Bonus</p>
                    </div>
                    <div className="reward-bonus-list">
                      {/* Bonus list items would go here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pop-bg ng-trigger ng-trigger-popBgTriggerAni"
            style={{ display: 'block' }}></div>
        </div>
      )}
    </>
  );
};

export default ReferBonusPopup;