// components/RotatingPhone.js
import React from 'react';

const RotatingPhone = () => {
  return (
    <div className="rotating-pop" style={{ opacity: 0 }}>
      <div className="rotating-phone-wrap">
        <div className="rotating-phone-mr02" style={{ 
          backgroundImage: `url("https://img.s628b.com/sb/h5/assets/images/mobile-rotating2.png")` 
        }}></div>
        
        <div className="rotating-phone-mr01" style={{ 
          backgroundImage: `url("https://img.s628b.com/sb/h5/assets/images/mobile-rotating1.png")` 
        }}></div>
        
        <div className="rotating-phone-mr03" style={{ 
          backgroundImage: `url("https://img.s628b.com/sb/h5/assets/images/mobile-rotating3.png")` 
        }}></div>
        
        <div className="rotating-phone-light" style={{ 
          backgroundImage: `url("https://img.s628b.com/sb/h5/assets/images/mobile-light.png")` 
        }}></div>
        
        <div className="dots-01"></div>
        <div className="dots-02"></div>
        <div className="dots-03"></div>
        <div className="dots-04"></div>
      </div>
      
      <div className="phone-rotating-tips">
        <span className="item-icon" style={{ 
          backgroundImage: `url("https://img.s628b.com/sb/h5/assets/images/icon-set/icon-refresh-type02.svg")` 
        }}></span>
        Stay portrait for better vision.
      </div>
    </div>
  );
};

export default RotatingPhone;