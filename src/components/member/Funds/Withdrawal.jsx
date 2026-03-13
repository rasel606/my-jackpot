
// components/member/Funds/Withdraw.jsx
import React, { useState, useEffect } from "react";
import { useApp } from "../../../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import VerificationTips from "../../common/VerificationTips/VerificationTips";

const Withdraw = ({
  showError,
  showSuccess,
  showWarning,
  showInfo,
}) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mainWalletBalance, setMainWalletBalance] = useState(0);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { setNotificationFunctions } = useApp();

  // Check verification status
  const hasVerifiedPhone = user?.phone?.some((phone) => phone.verified) || false;
  const isBlocked = !hasVerifiedPhone;

  // Set notification functions in context
  useEffect(() => {
    if (setNotificationFunctions) {
      setNotificationFunctions({
        showError,
        showSuccess,
        showWarning,
        showInfo,
      });
    }
  }, [setNotificationFunctions, showError, showSuccess, showWarning, showInfo]);

  // Mock wallet balance - in real app, this would come from API
  useEffect(() => {
    // Simulate fetching wallet balance
    setMainWalletBalance(1500); // Mock balance
  }, []);

  const paymentMethods = [
    {
      id: "8192",
      name: "নগদ",
      displayName: "Nagad",
      icon: "/assets/images/payment/nagad.png",
      type: "mobile",
    },
    {
      id: "2048",
      name: "বিকাশ",
      displayName: "bKash",
      icon: "/assets/images/payment/bkash.png",
      type: "mobile",
    },
    {
      id: "4096",
      name: "রকেট",
      displayName: "Rocket",
      icon: "/assets/images/payment/rocket.png",
      type: "mobile",
    },
    {
      id: "16777216",
      name: "UPay",
      displayName: "UPay",
      icon: "/assets/images/payment/upay.png",
      type: "mobile",
    },
  ];

  const quickAmounts = [100, 500, 1000, 2000, 5000, 10000];

  // Mock user's saved withdrawal accounts
  const withdrawAccounts = [
    { id: "acc_1", number: "01XXXXXXXXX", type: "nagad", name: "Nagad Account" },
    { id: "acc_2", number: "01XXXXXXXXX", type: "bkash", name: "bKash Account" },
  ];

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

    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount < 100) {
      return { isValid: false, message: "Minimum withdrawal amount is ৳100" };
    }

    if (withdrawAmount > 50000) {
      return { isValid: false, message: "Maximum withdrawal amount is ৳50,000" };
    }

    if (withdrawAmount > mainWalletBalance) {
      return { 
        isValid: false, 
        message: "Insufficient balance in main wallet" 
      };
    }

    if (!paymentMethod) {
      return { isValid: false, message: "Please select a payment method" };
    }

    if (!withdrawAccount) {
      return { isValid: false, message: "Please select a withdrawal account" };
    }

    return { isValid: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || isBlocked) return;

    const validation = validateForm();
    if (!validation.isValid) {
      showError("Error", validation.message);
      return;
    }

    setIsSubmitting(true);

    try {
      const withdrawAmount = parseFloat(amount);
      const selectedAccount = withdrawAccounts.find(acc => acc.id === withdrawAccount);
      const selectedPaymentMethod = paymentMethods.find(method => method.id === paymentMethod);

      // Prepare withdrawal data
      const withdrawData = {
        amount: withdrawAmount,
        paymentMethod: selectedPaymentMethod?.id,
        paymentMethodName: selectedPaymentMethod?.name,
        accountNumber: selectedAccount?.number,
        accountType: selectedAccount?.type,
        timestamp: new Date().toISOString(),
        status: "pending",
        transactionId: `WT${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      };

      // Here you would typically send to your withdrawal API
      console.log("Withdrawal Submission:", withdrawData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showSuccess(
        "Withdrawal Request Submitted",
        `Your withdrawal of ৳${withdrawAmount.toLocaleString()} has been submitted successfully!` +
        ` Transaction ID: ${withdrawData.transactionId}` +
        `\nPlease allow up to 30 minutes for processing.`
      );

      // Reset form
      setAmount("");
      setPaymentMethod("");
      setWithdrawAccount("");
      
      // Update wallet balance (in real app, this would come from API response)
      setMainWalletBalance(prev => prev - withdrawAmount);

    } catch (error) {
      console.error("Withdrawal error:", error);
      showError(
        "Withdrawal Failed",
        "Failed to process withdrawal. Please try again."
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

  const handleVerifyNow = () => {
    navigate("/profile/personal-info", {
      state: { background: location },
    });
  };

  const refreshBalance = async () => {
    try {
      // Simulate API call to refresh balance
      console.log("Refreshing wallet balance...");
      // In real app, this would fetch from API
    } catch (error) {
      console.error("Failed to refresh balance:", error);
    }
  };

  return (
    <div className="withdraw-content">
      <div className="player-withdraw-wrap">
        <div className="player-withdraw-step1">
          
          {/* Main Wallet Info */}
          <div className="player-top player-withdraw">
            <div className="main-wallet-info">
              <div className="operating-wallet"></div>
              <div className="renew-main-wallet" onClick={refreshBalance}>
                <span>মেইন ওয়ালেট</span>
                <div 
                  className="icon-refresh" 
                  style={{
                    maskImage: 'url("/assets/images/icon-set/icon-refresh-type01.svg")'
                  }}
                ></div>
              </div>
              <h4>
                <i>৳{mainWalletBalance.toLocaleString()}</i>
              </h4>
            </div>
            <span 
              className="item-bg" 
              style={{
                maskImage: 'url("/assets/images/player/bg-header-bottom.svg")'
              }}
            ></span>
          </div>

          {/* Verification Tips */}
          <VerificationTips user={user} type="withdraw" />

          {/* Payment Method */}
          <div className="menu-box">
            {isBlocked && (
              <div className="kyc-verify-mask ng-star-inserted">
                <div className="kyc-verify-mask-icon"></div>
                <div className="kyc-verify-mask-message">
                  অনুগ্রহ করে যাচাইকরণ সম্পন্ন করুন।
                </div>
                <div className="kyc-verify-mask-blur"></div>
              </div>
            )}
            
            <div className="title">
              <h2>
                <span>পেমেন্ট পদ্ধতি</span>
              </h2>
            </div>
            
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
                          alt={method.displayName}
                          src={method.icon}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = "/assets/images/icon-set/default-payment.png";
                          }}
                        />
                      </div>
                      <span>{method.name}</span>
                      <span 
                        className="item-icon"
                        style={{
                          maskImage: 'url("/assets/images/player/select-check.svg")'
                        }}
                      ></span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Withdrawal Account Selection */}
          {!isBlocked && paymentMethod && (
            <div className="menu-box">
              <div className="title">
                <h2>
                  <span>Withdrawal Account</span>
                </h2>
              </div>
              
              <div className="select-group checkbox-style checkbox-height-set">
                <ul className="col2">
                  {withdrawAccounts
                    .filter(account => {
                      const method = paymentMethods.find(m => m.id === paymentMethod);
                      return method && account.type === method.name.toLowerCase();
                    })
                    .map((account) => (
                      <li key={account.id}>
                        <input
                          type="radio"
                          name="withdrawAccount"
                          id={`withdrawAccount_${account.id}`}
                          checked={withdrawAccount === account.id}
                          onChange={() => setWithdrawAccount(account.id)}
                          disabled={isSubmitting || isBlocked}
                        />
                        <label htmlFor={`withdrawAccount_${account.id}`}>
                          <span>{account.name} - {account.number}</span>
                          <span 
                            className="item-icon"
                            style={{
                              maskImage: 'url("/assets/images/player/select-check.svg")'
                            }}
                          ></span>
                        </label>
                      </li>
                    ))
                  }
                  
                  {/* Add New Account Option */}
                  <li>
                    <input
                      type="radio"
                      name="withdrawAccount"
                      id="withdrawAccount_new"
                      checked={withdrawAccount === "new"}
                      onChange={() => setWithdrawAccount("new")}
                      disabled={isSubmitting || isBlocked}
                    />
                    <label htmlFor="withdrawAccount_new">
                      <span>Add New Account</span>
                      <span 
                        className="item-icon"
                        style={{
                          maskImage: 'url("/assets/images/player/select-check.svg")'
                        }}
                      ></span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Add New Account Form */}
          {!isBlocked && withdrawAccount === "new" && (
            <div className="menu-box">
              <div className="title">
                <h2>
                  <span>Add New Withdrawal Account</span>
                </h2>
              </div>
              
              <div className="input-group">
                <label htmlFor="accountNumber">Account Number</label>
                <div className="input-wrap">
                  <input
                    type="text"
                    id="accountNumber"
                    placeholder="Enter your account number"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="accountHolder">Account Holder Name</label>
                <div className="input-wrap">
                  <input
                    type="text"
                    id="accountHolder"
                    placeholder="Enter account holder name"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Amount Selection */}
          {!isBlocked && paymentMethod && withdrawAccount && (
            <div className="menu-box active">
              <div className="title">
                <h2>
                  <span>Amount</span>
                  <i>৳ 100.00 - ৳ 50,000.00</i>
                </h2>
              </div>

              <div className="select-group style-add-amount">
                <ul className="col4">
                  {quickAmounts.map((amt, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        name="withdrawAmount"
                        id={`withdrawAmount_${index}`}
                        checked={amount === amt.toString()}
                        onChange={() => handleQuickAmount(amt)}
                        disabled={isSubmitting || isBlocked || amt > mainWalletBalance}
                      />
                      <label 
                        htmlFor={`withdrawAmount_${index}`}
                        className={amt > mainWalletBalance ? "disabled" : ""}
                      >
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
                          "Minimum withdrawal amount is ৳100"
                        );
                      }
                      if (value && value > 50000) {
                        showWarning(
                          "Maximum Amount",
                          "Maximum withdrawal amount is ৳50,000"
                        );
                      }
                      if (value && value > mainWalletBalance) {
                        showWarning(
                          "Insufficient Balance",
                          "Amount exceeds your main wallet balance"
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

              {/* Balance Info */}
              <div className="balance-info">
                <div className="calculation-row">
                  <span>Available Balance:</span>
                  <span>৳{mainWalletBalance.toLocaleString()}</span>
                </div>
                {amount && !isNaN(amount) && parseFloat(amount) >= 100 && (
                  <div className="calculation-row">
                    <span>After Withdrawal:</span>
                    <span>৳{(mainWalletBalance - parseFloat(amount)).toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="tips-info note">
                <h5>
                  <i className="tips-icon"></i>
                  <span>
                    ১.উইথড্রয়াল রিকোয়েস্ট করার আগে 'ব্যক্তিগত তথ্য' অংশে সর্বোচ্চ ৩টি মোবাইল নম্বর যোগ করে ভেরিফাই করুন।
                    ২.উইথড্রয়াল প্রক্রিয়াটি সম্পন্ন করতে সাধারণত ৩০ মিনিট পর্যন্ত সময় লাগতে পারে।
                    ৩.যেকোনো সমস্যা হলে অনুগ্রহ করে লাইভচ্যাটের মাধ্যমে সহায়তা নিন।
                    ৪.প্রতিদিন সর্বোচ্চ ৩টি উইথড্রয়াল রিকোয়েস্ট করতে পারবেন।
                    ৫.উইথড্রয়ালের জন্য সর্বনিম্ন amount ৳১০০ এবং সর্বোচ্চ amount ৳৫০,০০০।
                  </span>
                </h5>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="member-content">
            <div className="button submit">
              <Link
                className={`submit-btn ${
                  !amount || !paymentMethod || !withdrawAccount || isSubmitting || isBlocked
                    ? "disabled"
                    : ""
                }`}
                onClick={handleSubmit}
                disabled={
                  !amount ||
                  !paymentMethod ||
                  !withdrawAccount ||
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

export default Withdraw;