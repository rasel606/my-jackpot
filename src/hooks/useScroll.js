import { useState, useEffect } from 'react';

export const useScroll = (threshold = 150, debounceDelay = 200) => {
  const [isFixed, setIsFixed] = useState(false);
  const [scrollStopped, setScrollStopped] = useState(false);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setIsFixed(window.scrollY >= threshold);
      
      clearTimeout(scrollTimeout);
      setScrollStopped(false);
      
      scrollTimeout = setTimeout(() => {
        setScrollStopped(true);
      }, debounceDelay);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [threshold, debounceDelay]);

  return { isFixed, scrollStopped };
};