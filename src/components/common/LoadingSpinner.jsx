import React from 'react';


const LoadingSpinner = ({ size = 'medium', text = 'লোড হচ্ছে...' }) => {
  return (
    <div className={`loading-spinner loading-spinner--${size}`}>
      <div className="loading-spinner__animation"></div>
      {text && <p className="loading-spinner__text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;