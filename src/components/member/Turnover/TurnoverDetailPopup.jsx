// components/member/Turnover/TurnoverPopup.jsx
import React from 'react';
import { useApp } from '../../../contexts/AppContext';

const TurnoverDetailPopup = ({ turnover, onClose }) => {
  return (

      <>
        <button className="btn-close" onClick={onClose}>
          <span className="item-icon close-icon"></span>
        </button>
        
        <div className="pop-title">
          <h3>{turnover.title}</h3>
        </div>
        
        <div className="pop-inner content-style">
          <div className="form-wrap">
            <div className="arrow">
              <span className="item-icon arrow-icon"></span>
            </div>
            
            <div className="form-wrap-col">
              <div>Transaction Amount</div>
              <div>৳ {turnover.transactionAmount.toFixed(2)}</div>
            </div>
            
            <div className="form-wrap-col">
              <div>Bonus</div>
              <div>৳ {turnover.bonus.toFixed(2)}</div>
            </div>
            
            <div className="form-wrap-col">
              <div>Turnover Requirement</div>
              <div>৳ {turnover.turnoverRequirement.toFixed(2)}</div>
            </div>
            
            <div className="form-wrap-col">
              <div>Turnover Completed</div>
              <div>৳ {turnover.turnoverCompleted.toFixed(2)}</div>
            </div>
            
            <div className="form-wrap-col">
              <div>Completed Ratio</div>
              <div>{turnover.completedRatio}</div>
            </div>
            
            <div className="form-wrap-col">
              <div>Turnover Create Time</div>
              <div>{turnover.createTime}</div>
            </div>
          </div>
        </div>
        </>
      
  );
};

export default TurnoverDetailPopup;