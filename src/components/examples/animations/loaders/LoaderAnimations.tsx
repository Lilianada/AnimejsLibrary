
import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './loader-animations.css';

// Create proper function types
const initializeAnimations = (element: HTMLElement) => {
  // Pulse loader animation
  anime({
    targets: element.querySelector('.pulse-loader .dot'),
    scale: [1, 1.5, 1],
    opacity: [1, 0.5, 1],
    easing: 'easeInOutSine',
    duration: 1200,
    loop: true
  });

  // Circular loader animation
  anime({
    targets: element.querySelector('.circular-loader .path'),
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    loop: true
  });

  // Spinner animation
  anime({
    targets: element.querySelector('.spinner'),
    rotate: '360deg',
    easing: 'linear',
    duration: 1000,
    loop: true
  });
};

const LoaderAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      initializeAnimations(containerRef.current);
    }
  }, []);

  return (
    <div ref={containerRef} className="loader-animations-container">
      <div className="pulse-loader">
        <div className="dot"></div>
      </div>
      
      <div className="circular-loader">
        <svg viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
      </div>
      
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LoaderAnimations;
