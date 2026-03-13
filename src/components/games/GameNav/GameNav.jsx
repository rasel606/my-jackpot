





// components/HomePage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Component/AuthContext";


// Import custom hooks
import { useGamePlay } from "../hooks/useGamePlay";
import { useRefreshBalance } from "../hooks/useRefreshBalance";
import { useGameData } from "../hooks/useGameData";
import { useScrollFix } from "../hooks/useScrollFix";
// import GamePopup from "../components/GamePopup";

export default () => {
  // const { modalShow, setModalShow } = props;
  const navigate = useNavigate();
  
  // Use custom hooks
  const { 
    isPlaying, 
    playGameData, 
    showPopup, 
    handlePlay, 
    handleClosePopup 
  } = useGamePlay();
  
  const { 
    balance, 
    refreshing, 
    handleRefresh 
  } = useRefreshBalance();
  
  const { 
    data, 
    loading, 
    active, 
    activeIndex, 
    handleItemClick 
  } = useGameData();
  
  const { 
    isFixed, 
    scrollStopped 
  } = useScrollFix();

  const { userId, userDeatils } = useAuth();



  const onRefreshBalance = () => {
    if (userId) {
      handleRefresh(userId);
    }
  };

  const handleGamePlay = async (game) => {
    const result = await handlePlay(game);
    if (result.success && userId) {
      // Balance will be refreshed automatically after game closes
      console.log("Game launched successfully");
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
                {console.log(item)}
                <div className="icon">
                  <span
                    className="item-icon"
                    style={{
                      backgroundImage: `url(${item?.image})`,
                    }}
                  ></span>
                  <p>{item?.category?.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="nav-wrap">
            <div className="content-title">
              <h2>
                <span>{active?.name}</span>
              </h2>
            </div>
            <div className="nav-content-wrap">
              <div className="nav-content-inner">
                <div className="content-box">
                  <div className="layout-brand">
                    <div className="card1">
                      <ul>
                        {active?.uniqueProviders?.map((item, index) => {
                          if (activeIndex < 2) {
                            return (
                              <li key={index}>
                                <Link
                                  onClick={() => handleGamePlay(item)}
                                  className="game-link"
                                >
                                  <img
                                    src={item.image_url}
                                    alt={item.company}
                                  />
                                  <p>{item.company}</p>
                                </Link>
                              </li>
                            );
                          } else {
                            return (
                              <li key={index}>
                                <Link
                                  to={`/gamesProvidersPageWithCategory/${encodeURIComponent(
                                    active.name
                                  )}/${encodeURIComponent(
                                    item.providercode
                                  )}`}
                                  className="game-link"
                                >
                                  <img
                                    src={item.image_url}
                                    alt={item.company}
                                  />
                                  <p>{item.company}</p>
                                </Link>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};