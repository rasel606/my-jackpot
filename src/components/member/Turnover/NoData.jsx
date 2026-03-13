// components/member/Turnover/NoData.jsx
import React from 'react';

const NoData = ({ message = 'No Data' }) => {
  return (
    <div className="no-result">
      <div className="pic">
        <img 
          alt="no-data" 
          src="https://img.s628b.com/sb/h5/assets/images/no-data.png?v=1761636564965&source=mcdsrc" 
          loading="lazy" 
        />
      </div>
      <div className="text ng-star-inserted">{message}</div>
    </div>
  );
};

export default NoData;