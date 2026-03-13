import React from 'react';

const JackpotBanner = ({ 
  jackpotValues = {}, 
  imageUrl = "https://img.s628b.com/upload/backgroundImgH5/image_244710.jpg" 
}) => {
  const { grand = "89,918.18", major = "10,480.47", mini = "827.91" } = jackpotValues;

  return (
    <div className="jackpot-banner-wrapper">
      <img className="jackpot-banner-img" src={imageUrl} alt="Jackpot Banner" />
      <div className="game-jackpot-number-group">
        <p className="wide-to-narrow-grand">{grand}</p>
        <p className="wide-to-narrow-major">{major}</p>
        <p className="wide-to-narrow-mini">{mini}</p>
      </div>
    </div>
  );
};

export default JackpotBanner;