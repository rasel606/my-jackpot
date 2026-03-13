import React from 'react';

const PromoCodeForm = ({ promoCode, onPromoCodeChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(promoCode);
  };

  return (
    <form className="promo-code-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          maxLength="30"
          placeholder="à¦ªà§à¦°à§‹à¦®à§‹ à¦•à§‹à¦¡"
          value={promoCode}
          onChange={(e) => onPromoCodeChange(e.target.value)}
        />
        <div className="promo-code-add-btn">à¦…à§à¦¯à¦¾à¦¡</div>
      </div>
    </form>
  );
};

export default PromoCodeForm;



