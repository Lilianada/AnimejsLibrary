
import { useEffect, useRef } from "react";
import anime from "animejs";

const StaggeredHeroText = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a sequence of animations manually instead of using timeline
    const playAnimation = () => {
      // First animate the container
      anime({
        targets: containerRef.current,
        opacity: [0, 1],
        translateY: [40, 0],
        easing: 'easeOutExpo',
        duration: 750,
        complete: animateLines
      });
    };

    // Second animation in the sequence
    const animateLines = () => {
      if (!containerRef.current) return;
      const lines = containerRef.current.querySelectorAll('.hero-line');
      
      anime({
        targets: lines,
        translateY: [40, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 750,
        delay: anime.stagger(200),
        complete: animateHighlights
      });
    };

    // Third animation in the sequence
    const animateHighlights = () => {
      if (!containerRef.current) return;
      const highlights = containerRef.current.querySelectorAll('.hero-highlight');
      
      highlights.forEach((highlight, index) => {
        anime({
          targets: highlight,
          backgroundPosition: ['-100% 0', '200% 0'],
          easing: 'easeInOutQuad',
          duration: 1200,
          delay: index * 300
        });
      });
    };

    playAnimation();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="opacity-0 max-w-2xl mx-auto text-center"
    >
      <div className="text-4xl md:text-5xl font-bold leading-tight">
        <div className="hero-line opacity-0">Create <span className="hero-highlight bg-gradient-to-r from-primary via-transparent to-transparent bg-[length:200%_100%] bg-clip-text text-transparent">seamless</span></div>
        <div className="hero-line opacity-0">animations with</div>
        <div className="hero-line opacity-0"><span className="hero-highlight bg-gradient-to-r from-secondary via-transparent to-transparent bg-[length:200%_100%] bg-clip-text text-transparent">anime.js</span></div>
      </div>
    </div>
  );
};

export default StaggeredHeroText;

export const staggeredHeroTextCode = `import { useRef, useEffect } from "react";
import anime from "animejs";

const StaggeredHeroText = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a sequence of animations manually
    const playAnimation = () => {
      // First animate the container
      anime({
        targets: containerRef.current,
        opacity: [0, 1],
        translateY: [40, 0],
        easing: 'easeOutExpo',
        duration: 750,
        complete: animateLines
      });
    };

    // Second animation in the sequence
    const animateLines = () => {
      if (!containerRef.current) return;
      const lines = containerRef.current.querySelectorAll('.hero-line');
      
      anime({
        targets: lines,
        translateY: [40, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 750,
        delay: anime.stagger(200),
        complete: animateHighlights
      });
    };

    // Third animation in the sequence
    const animateHighlights = () => {
      if (!containerRef.current) return;
      const highlights = containerRef.current.querySelectorAll('.hero-highlight');
      
      highlights.forEach((highlight, index) => {
        anime({
          targets: highlight,
          backgroundPosition: ['-100% 0', '200% 0'],
          easing: 'easeInOutQuad',
          duration: 1200,
          delay: index * 300
        });
      });
    };

    playAnimation();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="opacity-0 max-w-2xl mx-auto text-center"
    >
      <div className="text-4xl md:text-5xl font-bold leading-tight">
        <div className="hero-line opacity-0">Create <span className="hero-highlight bg-gradient-to-r from-primary via-transparent to-transparent bg-[length:200%_100%] bg-clip-text text-transparent">seamless</span></div>
        <div className="hero-line opacity-0">animations with</div>
        <div className="hero-line opacity-0"><span className="hero-highlight bg-gradient-to-r from-secondary via-transparent to-transparent bg-[length:200%_100%] bg-clip-text text-transparent">anime.js</span></div>
      </div>
    </div>
  );
};`;
