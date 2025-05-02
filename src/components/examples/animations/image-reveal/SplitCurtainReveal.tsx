
import { useEffect, useRef } from "react";
import anime from "animejs";

interface SplitCurtainRevealProps {
  src: string;
  alt: string;
}

const SplitCurtainReveal = ({ src, alt }: SplitCurtainRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          // Animate curtains with anime.js
          anime({
            targets: topCurtainRef.current,
            translateY: ['0%', '-100%'],
            easing: 'easeInOutQuad',
            duration: 800
          });
          
          anime({
            targets: bottomCurtainRef.current,
            translateY: ['0%', '100%'],
            easing: 'easeInOutQuad',
            duration: 800
          });
          
          anime({
            targets: imageRef.current,
            scale: [1.1, 1],
            opacity: [0, 1],
            easing: 'easeOutQuad',
            duration: 1000,
            delay: 300
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-72 rounded-md overflow-hidden relative"
    >
      <img 
        ref={imageRef}
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover opacity-0 scale-110"
      />
      <div 
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-primary"
      />
      <div 
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-primary"
      />
    </div>
  );
};

export default SplitCurtainReveal;

export const splitCurtainRevealCode = `import { useEffect, useRef } from "react";
import anime from "animejs";

const SplitCurtainReveal = ({ src, alt }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const topCurtainRef = useRef(null);
  const bottomCurtainRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          // Animate curtains with anime.js
          anime({
            targets: topCurtainRef.current,
            translateY: ['0%', '-100%'],
            easing: 'easeInOutQuad',
            duration: 800
          });
          
          anime({
            targets: bottomCurtainRef.current,
            translateY: ['0%', '100%'],
            easing: 'easeInOutQuad',
            duration: 800
          });
          
          anime({
            targets: imageRef.current,
            scale: [1.1, 1],
            opacity: [0, 1],
            easing: 'easeOutQuad',
            duration: 1000,
            delay: 300
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-72 rounded-md overflow-hidden relative"
    >
      <img 
        ref={imageRef}
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover opacity-0 scale-110"
      />
      <div 
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-primary"
      />
      <div 
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-primary"
      />
    </div>
  );
};

export default SplitCurtainReveal;`;
