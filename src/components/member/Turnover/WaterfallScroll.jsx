// components/member/Turnover/WaterfallScroll.jsx
import React, { useState, useEffect, useRef } from 'react';

const WaterfallScroll = ({ children }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowPrompt(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (anchorRef.current) {
      observer.observe(anchorRef.current);
    }

    return () => {
      if (anchorRef.current) {
        observer.unobserve(anchorRef.current);
      }
    };
  }, []);

  return (
    <div className="mcd-waterfall-scroll ng-star-inserted">
      {children}
      
      {showPrompt && (
        <div className="prompt ng-star-inserted">－end of page－</div>
      )}
      
      <div 
        ref={anchorRef}
        className="anchor" 
        style={{ height: '10px', visibility: 'hidden' }}
      >
        anchor
      </div>
    </div>
  );
};

export default WaterfallScroll;