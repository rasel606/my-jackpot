import React, { useCallback, useEffect, useRef, useState } from 'react';
import PromotionInfo from '../member/PromotionPage/PromotionInfo';
import { usePopup } from '../../hooks/usePopup';

export default () => {
  const images = [
    "https://i.ibb.co.com/DChN5S5/img-1.jpg",
    "https://i.ibb.co.com/VqtD7Tq/img-2.jpg",
    "https://i.ibb.co.com/7Kkr63k/img-3.jpg",
    "https://i.ibb.co.com/LQB0VW7/img-4.jpg",
    "https://i.ibb.co.com/gdQVX9d/image-5.jpg",
  ];

  const marqueeRef = useRef(null);
  const intervalRef = useRef(null);
  const positionRef = useRef(0);
  const itemWidthRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);




  const { openPopup, closePopup } = usePopup();

  const handlePromoDetail = useCallback((promotion) => {
    openPopup(
      <PromotionInfo
        promotion={promotion}
        // showSuccess={showSuccess}
        onClose={() => {}}
      />,
      { 
        contentClass: 'promotionPop',
        size: 'large'
      }
    );
  }, [openPopup]);

  const handlePromoAction = useCallback((promotion) => {
   
      handlePromoDetail(promotion);
      closePopup();
  }, [handlePromoDetail]);















  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const wrapper = marquee.querySelector('.item-wrap');
    const firstItem = wrapper.querySelector('.item');
    if (!firstItem) return;

    itemWidthRef.current = firstItem.offsetWidth;
    
    const moveSlider = () => {
      positionRef.current -= itemWidthRef.current;
      
      if (Math.abs(positionRef.current) >= itemWidthRef.current * images.length) {
        positionRef.current = 0;
        wrapper.style.transition = 'none';
        wrapper.style.transform = `translateX(${positionRef.current}px)`;
        void wrapper.offsetWidth; // Force reflow
      }
      
      wrapper.style.transition = 'transform 1s ease-in-out';
      wrapper.style.transform = `translateX(${positionRef.current}px)`;
      
      // Calculate new active index
      const step = Math.abs(positionRef.current) / itemWidthRef.current;
      const newIndex = Math.floor(step) % images.length;
      setActiveIndex(newIndex);
    };

    intervalRef.current = setInterval(moveSlider, 5000);

    const handleResize = () => {
      itemWidthRef.current = firstItem.offsetWidth;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [images.length]);

  return (
    <div className="banner">
      <div className="banner-v1" ref={marqueeRef}>
        <div className="carousel-wrap style-init mcd siblings" data-auto="true" data-delay="500">
          <div className="cdk-drag item-drag">
            <div className="item-left">
              <div className="item-wrap">
                {[...images, ...images].map((url, idx) => (
                  <div key={idx} className="item" onClick={() => handlePromoAction(url)}>
                    <div
                      className="item-pic"
                      style={{ backgroundImage: `url("${url}")` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ul className="dot-group style-bar">
            {images.map((_, idx) => (
              <li key={idx} className={`${idx === activeIndex ? "active" : ""}`}>
                {/* Key forces animation restart when active */}
                <span 
                  key={activeIndex} 
                  className={"dot-progress"}
                  style={{ animationDuration: "5000ms" }}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};