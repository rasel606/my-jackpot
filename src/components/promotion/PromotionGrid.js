import React from 'react';
import PromotionCard from '../common/PromotionCard';

const PromotionGrid = ({ promotions, onApplyPromotion }) => {
  return (
    <div className="promotion-main-scroll-wrapper">
      {promotions.map((promotion) => (
        <PromotionCard
          key={promotion.id}
          promotion={promotion}
          onApply={onApplyPromotion}
        />
      ))}
      
      <div className="prompt">ï¼à¦ªà§ƒà¦·à§à¦ à¦¾à¦° à¦¶à§‡à¦·ï¼</div>
    </div>
  );
};

export default PromotionGrid;



