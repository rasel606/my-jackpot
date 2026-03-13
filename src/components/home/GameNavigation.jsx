import React, { useEffect } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";

// Import custom hooks
import { useRefreshBalance } from "../../hooks/useRefreshBalance";
import { useGameData } from "../../hooks/useGameData";
import { useScroll, useScrollFix } from "../../hooks/useScroll";

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { gameLaunchState, closeGame, launchGame, setGameLaunchState } = useApp();
  const { balance, refreshing, handleRefresh } = useRefreshBalance();
  const { data, loading, active, activeIndex, handleItemClick, gameData , setActive, setActiveIndex } = useGameData();
  const { isFixed, scrollStopped } = useScroll();

 useEffect(() => {
    if (data.length > 0 && !active) {
      setActive(data[0]);
      setActiveIndex(0);
    }
  // }, [data, active]);
  }, [data, active, setActive, setActiveIndex]);


  const onRefreshBalance = () => {
    handleRefresh();
  };

  // Fixed handleGamePlay function with authentication check
  const handleGamePlay = async (game) => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { from: location } 
      });
      return;
    }

    const result = await launchGame(game);
    if (result?.requiresLogin) {
      navigate('/login', { state: { from: location } });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">লোড হচ্ছে...</div>
      </div>
    );
  }

  return (
    <div className="game-nav-container">
      <div
        className={`${
          scrollStopped ? "scroll-stopped " : ""
        } nav nav-category ${isFixed ? "active" : ""}nav-auto`}
      >
        {data.map((item, index) => (
          <div
            className={`btn ${index === activeIndex ? "selected" : ""}`}
            key={index}
            onClick={() => handleItemClick(index, item)}
          >
            <div className="icon">
              <span
                className="item-icon"
                style={{
                  backgroundImage: `url(${item?.image})`,
                }}
              ></span>
              <p>{item?.category_name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="nav-wrap">
        <div className="content-title">
          <h2>
            <span>{active?.category_name}</span>
          </h2>
        </div>
        <div className="nav-content-wrap">
          <div className="nav-content-inner">
            <div className="content-box">
              <div className="layout-brand">
                <div className="card1">
                  {activeIndex < 2 ? (
                    // ✅ Direct game list for first 2 categories
                    <ul>
                      {gameData && gameData.length > 0 ? (
                        gameData.map((game, index) => (
                          <li key={index}>
                            {/* Use onClick handler instead of direct launchGame call */}
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleGamePlay(game);
                              }}
                              className="game-link"
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src={game.image_url}
                                alt={game.gameName}
                                loading="lazy"
                              />
                              <p>{game.gameName}</p>
                            </a>
                          </li>
                        ))
                      ) : (
                        <div className="no-games">কোন গেম পাওয়া যায়নি</div>
                      )}
                    </ul>
                  ) : (
                    // 🎲 Show providers for other categories
                    <ul>
                      {active?.uniqueProviders?.map((item, index) => (
                        <li key={index}>
                          
                           <Link
                             to={`/gamesProvidersPage/${encodeURIComponent(
                               active.category_name
                             )}/${encodeURIComponent(item.providercode)}`}
                             className="game-link"
                           >
                             <img src={item.image_url} alt={item.company} />
                             <p>{item.company}</p>
                           </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Game Launch Modal is managed globally by a component like GameLaunchPopup.jsx,
          which listens to gameLaunchState from AppContext. It should not be here. */}
    </div>
  );
};