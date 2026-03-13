import React, { createContext, useContext, useState, useCallback } from 'react';

const DEFAULT_LANGUAGE = "bn";

const translations = {
  bn: {
    // Navigation / Header
    home: 'হোম',
    login: 'লগইন',
    register: 'রেজিস্টার',
    logout: 'লগআউট',
    profile: 'প্রোফাইল',
    liveChat: 'লাইভ চ্যাট',
    app: 'অ্যাপ',

    // Games
    hotGames: 'হট গেমস',
    slots: 'স্লটস',
    liveCasino: 'লাইভ ক্যাসিনো',
    sports: 'স্পোর্টস',
    fishing: 'ফিশিং',
    p2p: 'P2P',
    arcade: 'আর্কেড',
    lottery: 'লটারি',
    playNow: 'এখন খেলুন',

    // Member Menu
    deposit: 'ডিপোজিট',
    withdrawal: 'উইথড্রল',
    funds: 'ফান্ডস',
    promotion: 'প্রমোশন',
    vip: 'ভিআইপি',
    inbox: 'ইনবক্স',
    transactionRecords: 'লেনদেনের রেকর্ড',
    bettingRecords: 'বেটিং রেকর্ড',
    turnover: 'টার্নওভার',
    realTimeBonus: 'রিয়েল-টাইম বোনাস',
    referBonus: 'রেফার বোনাস',

    // Auth
    userId: 'ইউজার আইডি',
    password: 'পাসওয়ার্ড',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    phone: 'ফোন নম্বর',
    loginBtn: 'লগইন করুন',
    registerBtn: 'রেজিস্টার করুন',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    alreadyHaveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    noAccount: 'অ্যাকাউন্ট নেই?',

    // Personal Info
    personalInfo: 'ব্যক্তিগত তথ্য',
    fullName: 'পূর্ণ নাম',
    birthday: 'জন্মদিন',
    email: 'ইমেইল',
    changePassword: 'পাসওয়ার্ড পরিবর্তন',
    addPhone: 'ফোন যোগ করুন',
    addEmail: 'ইমেইল যোগ করুন',

    // Common
    loading: 'লোড হচ্ছে...',
    balance: 'ব্যালেন্স',
    confirm: 'নিশ্চিত করুন',
    cancel: 'বাতিল',
    submit: 'জমা দিন',
    save: 'সংরক্ষণ করুন',
    back: 'পিছনে',
    close: 'বন্ধ',
    search: 'খোঁজুন',
    noData: 'কোনো ডেটা নেই',
    success: 'সফল',
    error: 'ত্রুটি',
    warning: 'সতর্কতা',
    welcome: 'স্বাগতম',

    // Language
    language: 'ভাষা',
    bengali: 'বাংলা',
    english: 'English',
  },

  en: {
    // Navigation / Header
    home: 'Home',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'Profile',
    liveChat: 'Live Chat',
    app: 'App',

    // Games
    hotGames: 'Hot Games',
    slots: 'Slots',
    liveCasino: 'Live Casino',
    sports: 'Sports',
    fishing: 'Fishing',
    p2p: 'P2P',
    arcade: 'Arcade',
    lottery: 'Lottery',
    playNow: 'Play Now',

    // Member Menu
    deposit: 'Deposit',
    withdrawal: 'Withdrawal',
    funds: 'Funds',
    promotion: 'Promotion',
    vip: 'VIP',
    inbox: 'Inbox',
    transactionRecords: 'Transaction Records',
    bettingRecords: 'Betting Records',
    turnover: 'Turnover',
    realTimeBonus: 'Real-Time Bonus',
    referBonus: 'Refer Bonus',

    // Auth
    userId: 'User ID',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    phone: 'Phone Number',
    loginBtn: 'Login',
    registerBtn: 'Register',
    forgotPassword: 'Forgot Password?',
    alreadyHaveAccount: 'Already have an account?',
    noAccount: "Don't have an account?",

    // Personal Info
    personalInfo: 'Personal Info',
    fullName: 'Full Name',
    birthday: 'Birthday',
    email: 'Email',
    changePassword: 'Change Password',
    addPhone: 'Add Phone',
    addEmail: 'Add Email',

    // Common
    loading: 'Loading...',
    balance: 'Balance',
    confirm: 'Confirm',
    cancel: 'Cancel',
    submit: 'Submit',
    save: 'Save',
    back: 'Back',
    close: 'Close',
    search: 'Search',
    noData: 'No data available',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    welcome: 'Welcome',

    // Language
    language: 'Language',
    bengali: 'বাংলা',
    english: 'English',
  },
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem('app-language') || DEFAULT_LANGUAGE
  );

  const switchLanguage = useCallback((newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
      localStorage.setItem('app-language', newLang);
      document.documentElement.lang = newLang;
    }
  }, []);

  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key,
    [lang]
  );

  const value = {
    lang,
    switchLanguage,
    t,
    isBengali: lang === 'bn',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
