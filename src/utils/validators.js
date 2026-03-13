export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^01[3-9]\d{8}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePromoCode = (code) => {
  if (!code || code.trim() === '') {
    return { isValid: false, message: 'প্রোমো কোড প্রয়োজন' };
  }
  
  if (code.length > 30) {
    return { isValid: false, message: 'প্রোমো কোড ৩০ অক্ষরের বেশি হতে পারবে না' };
  }
  
  const promoCodeRegex = /^[A-Z0-9_-]+$/i;
  if (!promoCodeRegex.test(code)) {
    return { isValid: false, message: 'প্রোমো কোডে শুধুমাত্র ইংরেজি অক্ষর, সংখ্যা, underscore এবং hyphen ব্যবহার করা যাবে' };
  }
  
  return { isValid: true, message: '' };
};

export const validateDepositData = (data) => {
  const errors = [];
  
  if (!data.paymentMethod) {
    errors.push('পেমেন্ট পদ্ধতি নির্বাচন করুন');
  }
  
  if (!data.amount || !validateAmount(data.amount)) {
    errors.push('সঠিক এমাউন্ট লিখুন (৳ ১০০ - ৳ ৩০,০০০)');
  }
  
  if (data.paymentMethod === 'bkash' && !data.mobileNumber) {
    errors.push('মোবাইল নম্বর প্রয়োজন');
  }
  
  if (data.paymentMethod === 'bkash' && data.mobileNumber && !validatePhone(data.mobileNumber)) {
    errors.push('সঠিক মোবাইল নম্বর লিখুন');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateAmount = (amount) => {
  const numAmount = parseFloat(amount);
  return !isNaN(numAmount) && numAmount >= 100 && numAmount <= 30000;
};

export const validateRegistration = (userData) => {
  const errors = {};
  
  if (!userData.fullName || userData.fullName.trim().length < 2) {
    errors.fullName = 'পূর্ণ নাম প্রয়োজন (ন্যূনতম ২ অক্ষর)';
  }
  
  if (!userData.email || !validateEmail(userData.email)) {
    errors.email = 'সঠিক ইমেইল ঠিকানা লিখুন';
  }
  
  if (!userData.phone || !validatePhone(userData.phone)) {
    errors.phone = 'সঠিক মোবাইল নম্বর লিখুন (01XXXXXXXXX)';
  }
  
  if (!userData.password || !validatePassword(userData.password)) {
    errors.password = 'পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে';
  }
  
  if (userData.password !== userData.confirmPassword) {
    errors.confirmPassword = 'পাসওয়ার্ড মেলেনি';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};