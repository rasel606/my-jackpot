import React from 'react';
import { Link } from 'react-router-dom';
import { useScroll } from '../../../hooks/useScroll';

const GameNavigation = ({
  data,
  activeIndex,
  onItemClick,
  onPlayProvider,
  showPlayButtons = true
}) => {
  const { isFixed, scrollStopped } = useScroll();

  return (
    <div className="game-nav-container">
      <div className={`${scrollStopped ? "scroll-stopped " : ""} nav nav-category ${isFixed ? "active" : ""}nav-auto`}>
        {data.map((item, index) => (
          <div
            className={`btn ${index === activeIndex ? "selected" : ""}`}
            key={index}
            onClick={() => onItemClick(index, item)}
          >
            <div className="icon">
              <span
                className="item-icon"
                style={{ backgroundImage: `url(${item?.image})` }}
              />
              <p>{item?.category_name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="nav-wrap">
        <div className="content-title">
          <h2><span>{data[activeIndex]?.category_name}</span></h2>
        </div>
        <div className="nav-content-wrap">
          <div className="nav-content-inner">
            <div className="content-box">
              <div className="layout-brand">
                <div className="card1">
                  <ul>
                    {data[activeIndex]?.uniqueProviders?.map((item, index) => (
                      <li key={index} >
                        {showPlayButtons && activeIndex < 2 ? (
                          <Link onClick={() => onPlayProvider(item)}>
                            <img src={item.image_url} alt={item.company} />
                            <p>{item.company}</p>
                          </Link>
                        ) : (
                          <Link
                            to={`/gamesProvidersPageWithCategory/${encodeURIComponent(
                              data[activeIndex]?.category?.name
                            )}/${encodeURIComponent(item.providercode)}`}
                            className="btn"
                          >
                            <img src={item.image_url} alt={item.company} />
                            <p>{item.company}</p>
                          </Link>
                        )}
                      </li>
                    ))}
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

export default GameNavigation;