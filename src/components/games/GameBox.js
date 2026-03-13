import React from 'react';

const GameBox = ({ game, onPlay, type = 'game', className = '' }) => {
  const handleClick = () => {
    onPlay(game);
  };
// console.log(game);
  const imageSrc = type === 'game' ? game.image_url : game.image_url || game.image_url;
  const title = type === 'game' ? game.gameName : (game.gameName || game.name);

  return (
    <div className={`games-box ${className}`} onClick={handleClick}>
      <div className="pic">
        <img src={imageSrc} alt={title} loading="lazy" />
      </div>
      <div className="text">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default GameBox;