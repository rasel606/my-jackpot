import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DepositPopup.css';

const API_BASE_URL = 'https://api.png71.live/api';

const DepositPopup = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [selectedPromotion, setSelectedPromotion] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [selectedDepositSetting, setSelectedDepositSetting] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [depositSettings, setDepositSettings] = useState([]);

  // ডেটা লোড করার ফাংশন
  useEffect(() => {
    if (isOpen) {
      loadPromotions();
      loadPaymentGateways();
      loadUserDefaultMobile();
    }
  }, [isOpen]);

  // প্রমোশন লোড
  const loadPromotions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bonus/active`);
      setPromotions(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedPromotion(response.data.data[0]._id);
      }
    } catch (error) {
      console.error('প্রমোশন লোড করতে সমস্যা:', error);
    }
  };

  // পেমেন্ট গেটওয়ে লোড
  const loadPaymentGateways = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payment-gateway/available`);
      const gateways = response.data.data;
      
      // পেমেন্ট মেথড ম্যাপিং
      const methods = gateways.map(gateway => ({
        id: `paymentMethod_${gateway._id}`,
        name: gateway.gateway_name.toLowerCase(),
        label: gateway.gateway_name,
        bonus: '+4%',
        icon: getGatewayIcon(gateway.gateway_name),
        gatewayData: gateway
      }));
      
      setPaymentMethods(methods);

      // ডিপোজিট সেটিংস ম্যাপিং
      const settings = gateways.flatMap(gateway => 
        gateway.payment_type.split(',').map(type => ({
          id: `depositSetting_${gateway._id}_${type}`,
          label: `${gateway.gateway_name}-${type}`,
          gatewayData: gateway,
          paymentType: type.trim()
        }))
      );
      
      setDepositSettings(settings);
    } catch (error) {
      console.error('পেমেন্ট গেটওয়ে লোড করতে সমস্যা:', error);
    }
  };

  // গেটওয়ে আইকন সেট করা
  const getGatewayIcon = (gatewayName) => {
    const icons = {
      'Bkash': 'https://img.s628b.com/sb/h5/assets/images/payment/bkash.png',
      'Nagad': 'https://img.s628b.com/sb/h5/assets/images/payment/nagad.png',
      'Rocket': 'https://img.s628b.com/sb/h5/assets/images/payment/rocket.png',
      'Upay': 'https://img.s628b.com/sb/h5/assets/images/payment/upay.png',
      'USDT TRC20': 'https://img.s628b.com/sb/h5/assets/images/icon-set/player/crypto/trc20.svg',
      'USDT ERC20': 'https://img.s628b.com/sb/h5/assets/images/icon-set/player/crypto/erc20.svg'
    };
    return icons[gatewayName] || '';
  };

  // ইউজারের ডিফল্ট মোবাইল লোড
  const loadUserDefaultMobile = () => {
    if (user && user.phone && user.phone.length > 0) {
      const defaultPhone = user.phone.find(ph => ph.isDefault) || user.phone[0];
      setMobile(defaultPhone.number);
    }
  };

  const handleAmountSelect = (amount, index) => {
    setSelectedAmount(`depositAmount_${index}`);
    setCustomAmount(amount.replace(/,/g, ''));
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCustomAmount(value);
    setSelectedAmount('');
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const selectedPayment = paymentMethods.find(method => method.id === selectedPaymentMethod);
      const selectedSetting = depositSettings.find(setting => setting.id === selectedDepositSetting);

      const depositData = {
        userId: user.userId,
        base_amount: parseInt(customAmount),
        gateway_name: selectedPayment?.gatewayData.gateway_name,
        payment_type: selectedSetting?.paymentType,
        mobile: parseInt(mobile),
        gateway_Number: selectedPayment?.gatewayData.gateway_Number,
        promotionId: selectedPromotion,
        details: `ডিপোজিট via ${selectedPayment?.label} - ${selectedSetting?.label}`
      };

      const response = await axios.post(`${API_BASE_URL}/deposit/initiate`, depositData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        alert('ডিপোজিট সফলভাবে Initiate হয়েছে! ট্রানজেকশন আইডি: ' + response.data.data.transactionID);
        
        // OTP/TRX ID এর জন্য কনফার্মেশন পপআপ শো করা
        const trxId = prompt('আপনার পেমেন্টের TRX ID দিন:');
        if (trxId) {
          await confirmDeposit(response.data.data.transactionID, trxId);
        }
        
        onClose();
      }
    } catch (error) {
      console.error('ডিপোজিট Error:', error);
      alert(error.response?.data?.message || 'ডিপোজিট করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeposit = async (transactionID, otpOrTrxID) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/deposit/confirm`, {
        transactionID,
        otpOrTrxID
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        alert('ডিপোজিট সফলভাবে Confirm হয়েছে!');
      }
    } catch (error) {
      console.error('কনফার্ম Error:', error);
      alert(error.response?.data?.message || 'ডিপোজিট Confirm করতে সমস্যা হয়েছে');
    }
  };

  const validateForm = () => {
    if (!selectedPaymentMethod) {
      alert('দয়া করে পেমেন্ট মেথড নির্বাচন করুন');
      return false;
    }
    if (!selectedDepositSetting) {
      alert('দয়া করে ডিপোজিট চ্যানেল নির্বাচন করুন');
      return false;
    }
    if (!customAmount || parseInt(customAmount) < 100) {
      alert('দয়া করে সর্বনিম্ন ৳১০০ Amount দিন');
      return false;
    }
    if (!mobile) {
      alert('দয়া করে মোবাইল নম্বর দিন');
      return false;
    }
    return true;
  };

  const paymentTypes = [
    { id: 'paymentType_0', label: 'বিকাশ পেমেন্ট' }
  ];

  const presetAmounts = ['২০০০', '৫০০০', '১০০০০', '১৫০০০', '২০০০০', '৩০০০০', '১০০০', '১০০'];

  if (!isOpen) return null;

  return (
    <div className="mcd-popup-page popup-page-wrapper active">
      <div className="popup-page show-toolbar popup-page--active popup-page--align-top">
        <div className="popup-page__backdrop" onClick={onClose}></div>
        <div className="popup-page__main popup-page-main popup-page-main--show">
          
          {/* Header */}
          <div className="popup-page-main__header wallet-header">
            <div className="popup-page-main__title">ফান্ডস</div>
            <div className="popup-page-main__close" onClick={onClose}></div>
          </div>

          <div className="popup-page-main__container">
            <div className="content mcd-style fixed-tab player-content">
              
              {/* Tab Navigation */}
              <TabButton 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === 'deposit' && (
                  <DepositContent
                    promotions={promotions}
                    selectedPromotion={selectedPromotion}
                    onPromotionChange={setSelectedPromotion}
                    paymentMethods={paymentMethods}
                    selectedPaymentMethod={selectedPaymentMethod}
                    onPaymentMethodChange={setSelectedPaymentMethod}
                    paymentTypes={paymentTypes}
                    selectedPaymentType={selectedPaymentType}
                    onPaymentTypeChange={setSelectedPaymentType}
                    depositSettings={depositSettings}
                    selectedDepositSetting={selectedDepositSetting}
                    onDepositSettingChange={setSelectedDepositSetting}
                    presetAmounts={presetAmounts}
                    selectedAmount={selectedAmount}
                    onAmountSelect={handleAmountSelect}
                    customAmount={customAmount}
                    onCustomAmountChange={handleCustomAmountChange}
                    mobile={mobile}
                    onMobileChange={setMobile}
                    onSubmit={handleSubmit}
                    loading={loading}
                  />
                )}
                
                {activeTab === 'withdraw' && (
                  <WithdrawContent />
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tab Button Component
const TabButton = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-btn-section tab-btn-wrap">
      <div className="tab-btn tab-btn-bar">
        <div 
          className="line" 
          style={{ 
            width: '50%', 
            transform: activeTab === 'deposit' ? 'translate(0%, 0px)' : 'translate(100%, 0px)' 
          }}
        ></div>
        <button 
          className={`btn ${activeTab === 'deposit' ? 'active' : ''}`}
          onClick={() => onTabChange('deposit')}
        >
          <div className="text">ডিপোজিট</div>
        </button>
        <button 
          className={`btn ${activeTab === 'withdraw' ? 'active' : ''}`}
          onClick={() => onTabChange('withdraw')}
        >
          <div className="text">উইথড্র</div>
        </button>
      </div>
    </div>
  );
};

// Deposit Content Component
const DepositContent = ({
  promotions,
  selectedPromotion,
  onPromotionChange,
  paymentMethods,
  selectedPaymentMethod,
  onPaymentMethodChange,
  paymentTypes,
  selectedPaymentType,
  onPaymentTypeChange,
  depositSettings,
  selectedDepositSetting,
  onDepositSettingChange,
  presetAmounts,
  selectedAmount,
  onAmountSelect,
  customAmount,
  onCustomAmountChange,
  mobile,
  onMobileChange,
  onSubmit,
  loading
}) => {
  return (
    <div className="tab-content-page">
      <div className="inner-wrap">
        <div className="inner-box deposit-wallet">
          <div className="player-deposit-wrap">
            <div className="player-deposit-step1">
              
              {/* Promotion Selection */}
              <PromotionSelect 
                promotions={promotions}
                selectedPromotion={selectedPromotion}
                onPromotionChange={onPromotionChange}
              />

              {/* Mobile Number Input */}
              <div className="menu-box">
                <div className="title">
                  <h2><span>মোবাইল নম্বর</span></h2>
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => onMobileChange(e.target.value)}
                    placeholder="আপনার মোবাইল নম্বর দিন"
                    className="mobile-input"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <PaymentMethods 
                paymentMethods={paymentMethods}
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodChange={onPaymentMethodChange}
                paymentTypes={paymentTypes}
                selectedPaymentType={selectedPaymentType}
                onPaymentTypeChange={onPaymentTypeChange}
              />

              {/* Deposit Settings */}
              <DepositSettings 
                depositSettings={depositSettings}
                selectedDepositSetting={selectedDepositSetting}
                onDepositSettingChange={onDepositSettingChange}
              />

              {/* Amount Selection */}
              <AmountSelection 
                presetAmounts={presetAmounts}
                selectedAmount={selectedAmount}
                onAmountSelect={onAmountSelect}
                customAmount={customAmount}
                onCustomAmountChange={onCustomAmountChange}
              />

              {/* Submit Button */}
              <div className="member-content">
                <div className="button">
                  <button 
                    className={`submit-btn ${loading ? 'loading' : ''}`} 
                    onClick={onSubmit}
                    disabled={loading}
                  >
                    {loading ? 'প্রসেসিং...' : 'সাবমিট'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Promotion Select Component
const PromotionSelect = ({ promotions, selectedPromotion, onPromotionChange }) => {
  return (
    <div className="option-group select-bar">
      <label>
        <span 
          className="item-icon" 
          style={{ 
            backgroundImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-selectpromotion.svg")' 
          }}
        ></span>
        <div>প্রচার নির্বাচন করুন</div>
      </label>
      <div className="option-wrap">
        <select 
          value={selectedPromotion} 
          onChange={(e) => onPromotionChange(e.target.value)}
        >
          <option value="">নরমাল ডিপোজিট</option>
          {promotions.map((promo) => (
            <option key={promo._id} value={promo._id}>
              {promo.name} - {promo.description}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Payment Methods Component
const PaymentMethods = ({ 
  paymentMethods, 
  selectedPaymentMethod, 
  onPaymentMethodChange,
  paymentTypes,
  selectedPaymentType,
  onPaymentTypeChange 
}) => {
  return (
    <div className="menu-box">
      <div className="title">
        <h2><span>পেমেন্ট পদ্ধতি</span></h2>
      </div>
      
      <div className="select-group checkbox-style">
        <ul className="col3">
          {paymentMethods.map((method) => (
            <PaymentMethodButton
              key={method.id}
              method={method}
              isSelected={selectedPaymentMethod === method.id}
              onChange={onPaymentMethodChange}
            />
          ))}
        </ul>
      </div>

      <div className="select-group">
        <ul className="col2">
          {paymentTypes.map((type) => (
            <PaymentTypeButton
              key={type.id}
              type={type}
              isSelected={selectedPaymentType === type.id}
              onChange={onPaymentTypeChange}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

// Individual Payment Method Button
const PaymentMethodButton = ({ method, isSelected, onChange }) => {
  const isAvailable = method.gatewayData?.isAvailable !== false;

  return (
    <li className={`payment-method-item ${!isAvailable ? 'disabled' : ''}`}>
      <input
        type="radio"
        name="paymentMethod"
        id={method.id}
        checked={isSelected}
        onChange={() => isAvailable && onChange(method.id)}
        disabled={!isAvailable}
      />
      <label htmlFor={method.id}>
        <div className="bank">
          <img 
            alt={method.name} 
            src={method.icon} 
            loading="lazy" 
          />
        </div>
        <span>{method.label}</span>
        {method.bonus && (
          <div className="tag-rebate-money">
            <p><span>+</span>4 <span>%</span></p>
          </div>
        )}
        {!isAvailable && (
          <div className="unavailable-overlay">
            {method.gatewayData?.availabilityMessage}
          </div>
        )}
        <span 
          className="item-icon" 
          style={{ 
            maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/player/select-check.svg")' 
          }}
        ></span>
      </label>
    </li>
  );
};

// Payment Type Button
const PaymentTypeButton = ({ type, isSelected, onChange }) => {
  return (
    <li className="payment-type-item">
      <input
        type="radio"
        name="paymentType"
        id={type.id}
        checked={isSelected}
        onChange={() => onChange(type.id)}
      />
      <label htmlFor={type.id}>
        <span>{type.label}</span>
        <span 
          className="item-icon" 
          style={{ 
            maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/player/select-check.svg")' 
          }}
        ></span>
      </label>
    </li>
  );
};

// Deposit Settings Component
const DepositSettings = ({ depositSettings, selectedDepositSetting, onDepositSettingChange }) => {
  return (
    <div className="deposit-normal">
      <div className="menu-box">
        <div className="title">
          <h2><span>ডিপোজিট চ্যানেল</span></h2>
        </div>
        <div className="select-group checkbox-style checkbox-height-set">
          <ul className="col2">
            {depositSettings.map((setting) => (
              <DepositSettingButton
                key={setting.id}
                setting={setting}
                isSelected={selectedDepositSetting === setting.id}
                onChange={onDepositSettingChange}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Deposit Setting Button
const DepositSettingButton = ({ setting, isSelected, onChange }) => {
  const isAvailable = setting.gatewayData?.isAvailable !== false;

  return (
    <li className={`deposit-setting-item ${!isAvailable ? 'disabled' : ''}`}>
      <input
        type="radio"
        name="depositSetting"
        id={setting.id}
        checked={isSelected}
        onChange={() => isAvailable && onChange(setting.id)}
        disabled={!isAvailable}
      />
      <label htmlFor={setting.id}>
        <span>{setting.label}</span>
        {!isAvailable && (
          <div className="unavailable-text">
            {setting.gatewayData?.availabilityMessage}
          </div>
        )}
        <span 
          className="item-icon" 
          style={{ 
            maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/player/select-check.svg")' 
          }}
        ></span>
      </label>
    </li>
  );
};

// Amount Selection Component
const AmountSelection = ({ 
  presetAmounts, 
  selectedAmount, 
  onAmountSelect, 
  customAmount, 
  onCustomAmountChange 
}) => {
  return (
    <div className="menu-box active">
      <div className="title">
        <h2>
          <span>এমাউন্ট</span>
          <i>৳ ১০০.০০ - ৳ ৩০,০০০.০০</i>
        </h2>
      </div>
      
      <div className="select-group style-add-amount">
        <ul className="col4">
          {presetAmounts.map((amount, index) => (
            <li key={index}>
              <input
                type="radio"
                name="depositAmount"
                id={`depositAmount_${index}`}
                checked={selectedAmount === `depositAmount_${index}`}
                onChange={() => onAmountSelect(amount, index)}
              />
              <label htmlFor={`depositAmount_${index}`}>
                <span>{amount}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="input-group money">
        <label htmlFor="amount">৳</label>
        <div className="input-wrap">
          <input
            type="text"
            id="amount"
            value={customAmount ? Number(customAmount).toLocaleString('bn-BD') : ''}
            onChange={onCustomAmountChange}
            placeholder="0.00"
            inputMode="numeric"
          />
          <a 
            className="delete-btn" 
            style={{ 
              maskImage: 'url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-cross-type09.svg")',
              opacity: customAmount ? 1 : 0 
            }}
            onClick={() => onCustomAmountChange({ target: { value: '' } })}
          ></a>
        </div>
      </div>

      <div className="tips-info note">
        <h5>
          <i 
            className="tips-icon" 
            style={{ 
              maskImage: 'url("/assets/images/icon-set/icon-tips-type02.svg")' 
            }}
          ></i>
          <span>
            ১.ক্যাশ আউট বা সেন্ডমানি করার আগে 'ব্যক্তিগত তথ্য' অংশে সর্বোচ্চ ৩টি মোবাইল নম্বর যোগ করে ভেরিফাই করুন।
            ২.আপনার ডিপোজিট প্রক্রিয়াটি আরও দ্রুত সফল করতে সঠিক ক্যাশ আউট নাম্বার,এমাউন্ট এবং ট্রানজেকশন আইডি সহ সাবমিট করুন।
            ৩.যেকোনো ডিপোজিট করার আগে সবসময় আমাদের ডিপোজিট পেইজে নাম্বার চেক করুন ।
            ৪.ডিপোজিট পেন্ডিং থাকা অবস্থায় আপনি সর্বোচ্চ ২টি ডিপোজিট ট্রাই করতে পারবেন। কোনো সমস্যা হলে অনুগ্রহ করে লাইভচ্যাটের মাধ্যমে সহায়তা নিন।
            ৫.বাজির ODDs অবশ্যই ১.৩০-এর ওপরে হতে হবে। এর নিচের অডসে -এ রাখা বাজি উইথড্র টার্নওভারের জন্য গণনা করা হবে না।
          </span>
        </h5>
      </div>
    </div>
  );
};

// Withdraw Content Component
const WithdrawContent = () => {
  return (
    <div className="tab-content-page">
      <div className="inner-wrap">
        <div className="inner-box">
          <div className="withdraw-notice">
            <h3>উইথড্র সার্ভিস খুব শীঘ্রই আসছে</h3>
            <p>আমাদের টিম উইথড্র সার্ভিস ডেভেলপমেন্ট কাজ শেষ করছে। খুব শীঘ্রই আপনি উইথড্র করতে পারবেন।</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPopup;