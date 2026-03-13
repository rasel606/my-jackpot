
import { useState, useEffect, useCallback } from 'react';

export const useCarousel = (totalSlides, interval = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (interval > 0) {
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }
  }, [nextSlide, interval]);

  return {
    currentIndex,
    goToSlide,
    nextSlide,
    prevSlide
  };
};



