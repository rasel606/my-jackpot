import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { emailVerificationService } from '../../../services/emailVerificationService';

const EmailVerificationCode = ({ showError, showSuccess, showWarning, showInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTime, setResendTime] = useState(285); // 4:45 in seconds
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // Get email from navigation state
  const email = location.state?.email || '';
  const maskedEmail = email ? email.replace(/(.{2})(.*)(?=@)/, (match, p1, p2) => 
    p1 + '*'.repeat(p2.length)
  ) : 'ar************on@gmail.com';

  // Timer for resend code
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTime(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `(${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')})`;
  };

  const handleCodeChange = (index, value) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 1);
    
    const newCode = [...code];
    newCode[index] = numericValue;
    setCode(newCode);

    if (numericValue && index < 3) {
      inputRefs[index + 1].current.focus();
    }

    if (newCode.every(digit => digit !== '') && index === 3) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numbers = pastedData.replace(/\D/g, '').slice(0, 4);
    
    const newCode = [...code];
    numbers.split('').forEach((num, index) => {
      if (index < 4) {
        newCode[index] = num;
      }
    });
    
    setCode(newCode);
    
    const nextEmptyIndex = newCode.findIndex(digit => digit === '');
    if (nextEmptyIndex !== -1) {
      inputRefs[nextEmptyIndex].current.focus();
    } else {
      inputRefs[3].current.focus();
    }
  };

  const handleSubmit = async (verificationCode = code.join('')) => {
    if (verificationCode.length !== 4) {
      showError('দয়া করে সম্পূর্ণ 4-সংখ্যার যাচাইকরণ কোড লিখুন');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Verify the code
      const verifyResult = await emailVerificationService.verifyCode(email, verificationCode);
      
      if (verifyResult.success) {
        // Update user's email in profile
        const updateResult = await emailVerificationService.updateEmail(email);
        
        if (updateResult.success) {
          showSuccess('ই-মেইল সফলভাবে যাচাই এবং আপডেট করা হয়েছে!');
          
          // Auto navigate back after success
          setTimeout(() => {
            navigate(-1); // Go back to profile page
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Verification error:', error);
      
      if (error.code === 400) {
        showError('অবৈধ যাচাইকরণ কোড');
      } else if (error.code === 410) {
        showError('যাচাইকরণ কোডের মেয়াদ শেষ হয়ে গেছে');
      } else if (error.code === 429) {
        showError('অনেকগুলি চেষ্টা। পরে আবার চেষ্টা করুন।');
      } else if (error.code === 500) {
        showError('সার্ভার ত্রুটি। পরে আবার চেষ্টা করুন।');
      } else {
        showError(error.message || 'যাচাইকরণ ব্যর্থ হয়েছে');
      }
      
      // Clear the code on error
      setCode(['', '', '', '']);
      inputRefs[0].current.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setResendTime(285); // Reset to 4:45
    setCanResend(false);
    setCode(['', '', '', '']);
    inputRefs[0].current.focus();
    
    try {
      const result = await emailVerificationService.resendVerificationCode(email);
      
      if (result.success) {
        showSuccess('যাচাইকরণ কোড আবার পাঠানো হয়েছে');
      }
    } catch (error) {
      console.error('Resend code error:', error);
      showError(error.message || 'যাচাইকরণ কোড আবার পাঠাতে ব্যর্থ হয়েছে');
      setCanResend(true); // Allow retry if resend fails
    }
  };

  return (
    <div className="content mcd-style third-party-login verify-code">
      <div className="verification-wrap ng-star-inserted">
        <div className="verification-txt">
          <p>
            অনুগ্রহ করে পাঠানো 4-সংখ্যার কোডটি লিখুন{' '}
            <span className="player ng-star-inserted">{maskedEmail}</span>
          </p>
        </div>

        <div className="verification-content">
          <form 
            noValidate 
            name="one-time-code" 
            className="verification-code ng-untouched ng-pristine ng-valid"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset>
              <label htmlFor="code-1" className="label">Number 1</label>
              <label htmlFor="code-2" className="label">Number 2</label>
              <label htmlFor="code-3" className="label">Number 3</label>
              <label htmlFor="code-4" className="label">Number 4</label>
              
              <div id="verification-input" className="verification-input">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="number"
                    pattern="[0-9]*"
                    min="0"
                    max="9"
                    maxLength="1"
                    value={digit}
                    inputtype="numeric"
                    id={`code-${index}`}
                    className={`code-input ${digit ? 'filled' : ''}`}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    onInput={(e) => {
                      if (e.target.value.length > 1) {
                        e.target.value = e.target.value.slice(0, 1);
                      }
                    }}
                    disabled={isSubmitting}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </fieldset>
          </form>
        </div>

        <div className="verification-tips">
          <p>
            কোড পাননি?{' '}
            <a 
              className={`resend-btn ${canResend ? 'active' : 'disabled'}`}
              onClick={handleResendCode}
            >
              আবার পাঠান{' '}
              {!canResend && (
                <span className="time active">{formatTime(resendTime)}</span>
              )}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationCode;