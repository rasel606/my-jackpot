
// components/member/Funds/Deposit.jsx
import React, { useState, useEffect } from "react";
import { useApp } from "../../../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import VerificationTips from "../../common/VerificationTips/VerificationTips";

const Deposit = ({
  // showError,
  showSuccess,
  showWarning,
  showInfo,

}) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [promotion, setPromotion] = useState("");
  const [depositChannel, setDepositChannel] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { promotions, fetchPromotions, setNotificationFunctions } = useApp();

  // Check verification status
  const hasVerifiedPhone = 
    user?.phone?.some((phone) => phone.verified) || false;
  const isBlocked = !hasVerifiedPhone;


  // Set notification functions in context
  useEffect(() => {
    if (setNotificationFunctions) {
      setNotificationFunctions({
        
        showSuccess,
        showWarning,
        showInfo,
      });
    }
  }, [setNotificationFunctions,  showSuccess, showWarning, showInfo]);

  const paymentMethodsLocal = [
    {
      id: "bkash",
      name: "bKash",
      icon: "https://img.s628b.com/sb/h5/assets/images/payment/bkash.png?v=1763700584552&source=mcdsrc",
      type: "mobile",
      bonus: "+4%",
    },
    {
      id: "nagad",
      name: "Nagad",
      icon: "https://img.s628b.com/sb/h5/assets/images/payment/nagad.png?v=1763700584552&source=mcdsrc",
      type: "mobile",
      bonus: "+4%",
    },
    {
      id: "rocket",
      name: "Rocket",
      icon: "https://img.s628b.com/sb/h5/assets/images/payment/rocket.png",
      type: "mobile",
      bonus: "+4%",
    },
    {
      id: "upay",
      name: "UPay",
      icon: "https://img.s628b.com/sb/h5/assets/images/payment/upay.png",
      type: "mobile",
      bonus: "+4%",
    },
    {
      id: "usdt_trc20",
      name: "USDT TRC20",
      icon: "/assets/images/icon-set/player/crypto/trc20.svg",
      type: "crypto",
    },
    {
      id: "usdt_erc20",
      name: "USDT ERC20",
      icon: "/assets/images/icon-set/player/crypto/erc20.svg",
      type: "crypto",
    },
  ];



  const [paymentMethods, setPaymentMethods] = useState([]);


  const [type, setType] = useState("crypto");
  const [loading, setLoading] = useState(true);


  const onStatsUpdate = (data) => {
    if (onStatsUpdate) {
        onStatsUpdate(data);
    }
  };
    useEffect(() => {
        fetchPaymentMethods();
    }, [user, type]);

    const fetchPaymentMethods = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://api.png71.live/api/payment-methods/direct-owners-user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.success) {
                setPaymentMethods(data.paymentMethods || paymentMethodsLocal);
                
            } else {
                setShowError('Error', data.message || 'Failed to load payment methods');
            }
        } catch (error) {
            console.error('Error fetching payment methods:', error);
            setShowError('Error', 'Failed to load payment methods. Please try again.');
        } finally {
            setLoading(false);
        }
    };



  const quickAmounts = [100, 1000, 2000, 5000, 10000, 15000, 20000, 30000];

  const depositChannels = [
    { id: "3367", name: "EP-ক্যাশ আউট", type: "cashout" },
    { id: "3371", name: "AP-ক্যাশ আউট", type: "cashout" },
    { id: "3705", name: "SP-ক্যাশ আউট", type: "cashout" },
    { id: "3508", name: "EP-সেন্ড মানি", type: "sendmoney" },
  ];

  // Filter and prepare promotions
  const getFilteredPromotions = () => {
    const depositPromos = promotions.deposit || [];
    return depositPromos;
  };

  const filteredPromotions = getFilteredPromotions();
  console.log("filteredPromotions", filteredPromotions);
  // Set default promotion
  useEffect(() => {
    if (filteredPromotions.length > 0 && !promotion) {
      setPromotion(filteredPromotions[0]._id);
    }
  }, [filteredPromotions]);

  const getSelectedPromotion = () => {
    return filteredPromotions.find((promo) => promo._id === promotion);
  };

  const calculateBonus = () => {
    if (isBlocked) return 0;

    const selectedPromo = getSelectedPromotion();
    if (!selectedPromo || !amount || isNaN(amount)) return 0;

    const depositAmount = parseFloat(amount);
    if (depositAmount < (selectedPromo.minDeposit || 0)) return 0;

    if (selectedPromo.fixedAmount) {
      return Math.min(
        selectedPromo.fixedAmount,
        selectedPromo.maxBonus || Infinity
      );
    }

    const bonus = (depositAmount * (selectedPromo.percentage || 0)) / 100;
    return selectedPromo.maxBonus
      ? Math.min(bonus, selectedPromo.maxBonus)
      : bonus;
  };

  const getTotalAmount = () => {
    if (isBlocked) return 0;

    const depositAmount = parseFloat(amount) || 0;
    return depositAmount + calculateBonus();
  };

  const validateForm = () => {
    if (isBlocked) {
      return {
        isValid: false,
        message: "Please complete phone verification first",
      };
    }

    if (!amount || isNaN(amount)) {
      return { isValid: false, message: "Please enter a valid amount" };
    }

    const depositAmount = parseFloat(amount);
    if (depositAmount < 100) {
      return { isValid: false, message: "Minimum deposit amount is ৳100" };
    }

    if (depositAmount > 30000) {
      return { isValid: false, message: "Maximum deposit amount is ৳30,000" };
    }

    if (!paymentMethod) {
      return { isValid: false, message: "Please select a payment method" };
    }

    if (!depositChannel) {
      return { isValid: false, message: "Please select a deposit channel" };
    }

    const selectedPromo = getSelectedPromotion();
    if (selectedPromo?.minDeposit && depositAmount < selectedPromo.minDeposit) {
      return {
        isValid: false,
        message: `This promotion requires minimum deposit of ৳${selectedPromo.minDeposit}`,
      };
    }

    return { isValid: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || isBlocked) return;

    const validation = validateForm();
    if (!validation.isValid) {
    setShowError("Error", validation.message);
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedPromo = getSelectedPromotion();
      const depositAmount = parseFloat(amount);

      // Prepare deposit data
      const depositData = {
        amount: depositAmount,
        paymentMethod,
        promotion: selectedPromo?._id,
        promotionName: selectedPromo?.name,
        bonusAmount: calculateBonus(),
        totalAmount: getTotalAmount(),
        depositChannel,
        paymentType: paymentType || `${paymentMethod}_payment`,
        timestamp: new Date().toISOString(),
        status: "pending",
      };

      // Here you would typically send to your deposit API
      console.log("Deposit Submission:", depositData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showSuccess(
        "Deposit Request Submitted",
        `Your deposit of ৳${depositAmount.toLocaleString()} has been submitted successfully!` +
          (calculateBonus() > 0
            ? ` You will receive ৳${calculateBonus().toLocaleString()} bonus.`
            : "") +
          ` Transaction ID: ${Math.random()
            .toString(36)
            .substr(2, 9)
            .toUpperCase()}`
      );

      // Reset form
      setAmount("");
      setPaymentMethod("");
      setDepositChannel("");
      setPaymentType("");
    } catch (error) {
      console.error("Deposit error:", error);
      setShowError(
        "Deposit Failed",
        "Failed to process deposit. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickAmount = (amt) => {
    if (isBlocked) return;
    setAmount(amt.toString());
  };

  const handleAmountChange = (value) => {
    if (isBlocked) return;

    // Allow only numbers and decimal point
    const validatedValue = value.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point
    const parts = validatedValue.split(".");
    if (parts.length > 2) {
      return;
    }

    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      return;
    }

    setAmount(validatedValue);
  };

  const getSelectedPaymentMethod = () => {
    return paymentMethods.find((method) => method.id === paymentMethod);
  };

  const handleVerifyNow = () => {
    navigate("/profile", {
      state: { background: location },
    });
  };

  return (
    <div className="deposit-content">
      <div className="player-deposit-wrap">
        <div className="player-deposit-step1">
          {/* Verification Block Overlay */}

          {/* Loading State */}
          {promotions.loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading promotions...</p>
            </div>
          )}

          {/* Error State */}
          {promotions.error && (
            <div className="error-state">
              <p>Error loading promotions: {promotions.error}</p>
              <button onClick={fetchPromotions} className="retry-btn">
                Retry
              </button>
            </div>
          )}

          {/* Promotion Selection */}
          <div className="option-group select-bar">
            <label>
              <span
                className="item-icon"
                style={{
                  backgroundImage:
                    'url("/assets/images/icon-set/icon-selectpromotion.svg")',
                }}
              ></span>
              <div>প্রচার নির্বাচন করুন</div>
            </label>
            <div className="option-wrap">
              <select
                value={promotion}
                onChange={(e) => setPromotion(e.target.value)}
                className="promotion-select"
                disabled={promotions.loading || isBlocked}
              >
                {filteredPromotions.map((promo) => (
                  <option key={promo._id} value={promo._id}>
                    {promo.name}
                    {promo.percentage > 0 && ` - ${promo.percentage}% Bonus`}
                    {promo.fixedAmount > 0 &&
                      ` - ৳${promo.fixedAmount} Fixed Bonus`}
                    {promo.minDeposit > 0 && ` (Min: ৳${promo.minDeposit})`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <VerificationTips user={user} type="deposit" />
          {/* Payment Method */}
          <div className="menu-box">
            <div className="title">
              <h2>
                <span>পেমেন্ট পদ্ধতি</span>
              </h2>
            </div>
            {isBlocked && (
              <div className="kyc-verify-mask ng-star-inserted">
                <div className="kyc-verify-mask-icon"></div>
                <div className="kyc-verify-mask-message">
                  অনুগ্রহ করে যাচাইকরণ সম্পন্ন করুন।
                </div>
                <div className="kyc-verify-mask-blur"></div>
                <div className="kyc-verify-mask-action">
                  <button className="verify-now-btn" onClick={handleVerifyNow}>
                    Verify Now
                  </button>
                </div>
              </div>
            )}
            <div className="select-group checkbox-style">
              <ul className="col3">
                {paymentMethods.map((method) => (
                  <li key={method.id} className="payment-method-item">
                    <input
                      type="radio"
                      name="paymentMethod"
                      id={`paymentMethod_${method.id}`}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      disabled={isSubmitting || isBlocked}
                    />
                    <label htmlFor={`paymentMethod_${method.id}`}>
                      <div className="bank">
                        <img
                          alt={method.name}
                          src={method.icon}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src =
                              "/assets/images/icon-set/default-payment.png";
                          }}
                        />
                      </div>
                      <span>{method.name}</span>
                      {method.bonus && (
                        <div className="tag-rebate-money">
                          <p>
                            <span>+</span>4 <span>%</span>
                          </p>
                        </div>
                      )}
                      <span className={` ${paymentMethod === method.id ? 'item-icon' : ''}`}
                      
                      style={{
                                      maskImage:
                                        'url("https://img.c88rx.com/cx/h5/assets/images/player/select-check.svg?v=1739862678809")',
                                      WebkitMaskImage:
                                        'url("https://img.c88rx.com/cx/h5/assets/images/player/select-check.svg?v=1739862678809")',
                                    }}
                      
                      ></span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {!isBlocked && getSelectedPaymentMethod()?.type === "mobile" && (
            <div className="select-group">
              {/* <div className="title">
                <h2>
                  <span>Payment Type</span>
                </h2>
              </div> */}
              <ul className="col2">
                <li className="payment-type-item">
                  <input
                    type="radio"
                    name="paymentType"
                    id="paymentType_payment"
                    checked={paymentType === `${paymentMethod}_payment`}
                    onChange={() => setPaymentType(`${paymentMethod}_payment`)}
                    disabled={isSubmitting || isBlocked}
                  />
                  <label htmlFor="paymentType_payment">
                    <span>{getSelectedPaymentMethod()?.name} Payment</span>
                    <span className="item-icon"></span>
                  </label>
                </li>
                {/* <li className="payment-type-item">
                  <input
                    type="radio"
                    name="paymentType"
                    id="paymentType_sendmoney"
                    checked={paymentType === `${paymentMethod}_sendmoney`}
                    onChange={() =>
                      setPaymentType(`${paymentMethod}_sendmoney`)
                    }
                    disabled={isSubmitting || isBlocked}
                  />
                  <label htmlFor="paymentType_sendmoney">
                    <span>{getSelectedPaymentMethod()?.name} Send Money</span>
                    <span className="item-icon"></span>
                  </label>
                </li>  */}
              </ul>
            </div>
          )}
          </div>

          {/* Payment Type - Show only for mobile payments */}
          

          {/* Deposit Channel */}
          {!isBlocked && (
            <div className="deposit-normal">
              <div className="menu-box">
                <div className="title">
                  <h2>
                    <span>Deposit Channel</span>
                  </h2>
                </div>
                <div className="select-group checkbox-style checkbox-height-set">
                  <ul className="col2">
                    {depositChannels.map((channel) => (
                      <li key={channel.id}>
                        <input
                          type="radio"
                          name="depositSetting"
                          id={`depositSetting_${channel.id}`}
                          checked={depositChannel === channel.id}
                          onChange={() => setDepositChannel(channel.id)}
                          disabled={isSubmitting || isBlocked}
                        />
                        <label htmlFor={`depositSetting_${channel.id}`}>
                          <span>{channel.name}</span>
                          <span className="item-icon"></span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Amount Selection */}
          {!isBlocked && (
            <div className="menu-box active">
              <div className="title">
                <h2>
                  <span>Amount</span>
                  <i>৳ 100.00 - ৳ 30,000.00</i>
                </h2>
              </div>

              <div className="select-group style-add-amount">
                <ul className="col4">
                  {quickAmounts.map((amt, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        name="depositAmount"
                        id={`depositAmount_${index}`}
                        checked={amount === amt.toString()}
                        onChange={() => handleQuickAmount(amt)}
                        disabled={isSubmitting || isBlocked}
                      />
                      <label htmlFor={`depositAmount_${index}`}>
                        <span>৳{amt.toLocaleString()}</span>
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
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    onBlur={(e) => {
                      if (isBlocked) return;
                      const value = parseFloat(e.target.value);
                      if (value && value < 100) {
                        showWarning(
                          "Minimum Amount",
                          "Minimum deposit amount is ৳100"
                        );
                      }
                      if (value && value > 30000) {
                        showWarning(
                          "Maximum Amount",
                          "Maximum deposit amount is ৳30,000"
                        );
                      }
                    }}
                    inputMode="numeric"
                    disabled={isSubmitting || isBlocked}
                  />
                  {amount && !isBlocked && (
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => setAmount("")}
                      disabled={isSubmitting}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Bonus Calculation */}
              {!isBlocked &&
                amount &&
                !isNaN(amount) &&
                parseFloat(amount) >= 100 && (
                  <div className="bonus-calculation">
                    <div className="calculation-row">
                      <span>Deposit Amount:</span>
                      <span>৳{parseFloat(amount).toLocaleString()}</span>
                    </div>
                    {calculateBonus() > 0 && (
                      <div className="calculation-row bonus">
                        <span>Bonus Amount:</span>
                        <span>+ ৳{calculateBonus().toLocaleString()}</span>
                      </div>
                    )}
                    <div className="calculation-row total">
                      <span>Total Credit:</span>
                      <span className="total-amount">
                        ৳{getTotalAmount().toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

              {/* Instructions */}
              <div className="tips-info note">
                <h5>
                  <i className="tips-icon"></i>
                  <span>
                    ১.ক্যাশ আউট বা সেন্ডমানি করার আগে 'ব্যক্তিগত তথ্য' অংশে
                    সর্বোচ্চ ৩টি মোবাইল নম্বর যোগ করে ভেরিফাই করুন। ২.আপনার
                    ডিপোজিট প্রক্রিয়াটি আরও দ্রুত সফল করতে সঠিক ক্যাশ আউট
                    নাম্বার,এমাউন্ট এবং ট্রানজেকশন আইডি সহ সাবমিট করুন। ৩.যেকোনো
                    ডিপোজিট করার আগে সবসময় আমাদের ডিপোজিট পেইজে নাম্বার চেক করুন
                    । ৪.ডিপোজিট পেন্ডিং থাকা অবস্থায় আপনি সর্বোচ্চ ২টি ডিপোজিট
                    ট্রাই করতে পারবেন। কোনো সমস্যা হলে অনুগ্রহ করে লাইভচ্যাটের
                    মাধ্যমে সহায়তা নিন। ৫.বাজির ODDs অবশ্যই ১.৩০-এর ওপরে হতে
                    হবে। এর নিচের অডসে -এ রাখা বাজি উইথড্র টার্নওভারের জন্য গণনা
                    করা হবে না।
                  </span>
                </h5>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="member-content">
            <div className="button">
              <Link
                className={`submit-btn ${
                  !amount || !paymentMethod || !depositChannel || isSubmitting
                    ? "disabled"
                    : ""
                }`}
                onClick={handleSubmit}
                disabled={
                  !amount ||
                  !paymentMethod ||
                  !depositChannel ||
                  isSubmitting ||
                  isBlocked
                }
              >
                {isSubmitting ? (
                  <>
                    <div className="submit-spinner"></div>
                    Processing...
                  </>
                ) : isBlocked ? (
                  "Complete Verification First"
                ) : (
                  "সাবমিট"
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
