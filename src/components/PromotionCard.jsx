import React from 'react';

const PromotionCard = ({ promotion, onApply }) => {
  const {
    id,
    title,
    description,
    type,
    image,
    hasApplyButton,
    hasJoined
  } = promotion;

  return (
    <div className="promotion-box new promotion-toggle">
      <div className="pic">
        <img
          alt={`promotion-${id}`}
          src={image}
          loading="lazy"
        />
        <span className="item-bg"></span>
      </div>
      
      <div className="promotion-box-inner content-style">
        <div className="text-main">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        
        <div className="times">
          <span className="item-icon clock-icon"></span>
          <span>{type}</span>
        </div>
        
        <div className="button-box">
          {hasApplyButton && !hasJoined && (
            <div 
              className="button button__apply"
              onClick={() => onApply(id)}
            >
              <span>à¦à¦–à¦¨ à¦†à¦¬à§‡à¦¦à¦¨ à¦•à¦°</span>
            </div>
          )}
          
          {hasJoined && (
            <div className="button button__joined active">
              <span>à¦¯à§‹à¦—à¦¦à¦¾à¦¨ à¦•à¦°à§‡à¦›à§‡à¦¨</span>
            </div>
          )}
          
          <div className="button btn-primary">
            <span>à¦¬à¦¿à¦¸à§à¦¤à¦¾à¦°à¦¿à¦¤</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;



