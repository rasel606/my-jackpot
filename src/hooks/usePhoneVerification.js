import { useState, useEffect, useCallback } from 'react';
import phoneVerificationService from '../services/phoneVerificationService';

export const usePhoneVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [pendingPhones, setPendingPhones] = useState([]);

  const initSession = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await phoneVerificationService.initVerificationSession();
      
      if (result.success) {
        setSessionActive(true);
        
        phoneVerificationService.onSessionExpire(() => {
          setSessionActive(false);
          setPendingPhones([]);
          console.warn('Phone verification session expired');
        });
        
        return result;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendVerificationCode = useCallback(async (countryCode, phoneNumber) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await phoneVerificationService.sendVerificationCode(countryCode, phoneNumber);
      
      if (result.success) {
        setPendingPhones(prev => [...prev, {
          countryCode,
          phoneNumber,
          verified: false,
          maskedNumber: maskPhoneNumber(`${countryCode}${phoneNumber}`)
        }]);
      }
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyCode = useCallback(async (countryCode, phoneNumber, verificationCode) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await phoneVerificationService.verifyCode(countryCode, phoneNumber, verificationCode);
      
      if (result.success) {
        setPendingPhones(prev => 
          prev.map(phone => 
            phone.phoneNumber === phoneNumber && phone.countryCode === countryCode
              ? { ...phone, verified: true }
              : phone
          )
        );
      }
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resendVerificationCode = useCallback(async (countryCode, phoneNumber) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await phoneVerificationService.resendVerificationCode(countryCode, phoneNumber);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const endSession = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const result = await phoneVerificationService.endSession();
      
      if (result.success) {
        setSessionActive(false);
        setPendingPhones([]);
      }
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSessionStatus = useCallback(async () => {
    try {
      const result = await phoneVerificationService.getSessionStatus();
      
      if (result.success && result.data) {
        setPendingPhones(result.data.session.pendingPhones || []);
      }
      
      return result;
    } catch (err) {
      console.error('Failed to get session status:', err);
      return { success: false };
    }
  }, []);

  const cancelPhoneVerification = useCallback(async (countryCode, phoneNumber) => {
    setIsLoading(true);
    
    try {
      const result = await phoneVerificationService.cancelPhoneVerification(countryCode, phoneNumber);
      
      if (result.success) {
        setPendingPhones(prev => 
          prev.filter(phone => 
            !(phone.phoneNumber === phoneNumber && phone.countryCode === countryCode)
          )
        );
      }
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (sessionActive) {
        phoneVerificationService.endSession().catch(console.error);
      }
    };
  }, [sessionActive]);

  return {
    isLoading,
    error,
    sessionActive,
    pendingPhones,
    initSession,
    sendVerificationCode,
    verifyCode,
    resendVerificationCode,
    endSession,
    getSessionStatus,
    cancelPhoneVerification,
    clearError: () => setError(null)
  };
};

const maskPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  return phoneNumber.replace(/(\+\d{3})(\d{2})(\d+)(\d{2})/, '$1$2*****$4');
};