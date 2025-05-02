
import { useRef, useEffect, ReactNode } from "react";
import * as anime from "animejs";

interface TextRevealOnScrollProps {
  children: ReactNode;
  threshold?: number;
}

const TextRevealOnScroll = ({ children, threshold = 0.3 }: TextRevealOnScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            observer.unobserve(entry.target);
            
            anime.default.animate(containerRef.current, {
              opacity: [0, 1],
              translateY: [20, 0],
              easing: 'easeOutCubic',
              duration: 800,
              delay: 200
            });
          }
        });
      },
      { threshold }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold]);
  
  return (
    <div ref={containerRef} className="opacity-0 transform translate-y-5">
      {children}
    </div>
  );
};

export default TextRevealOnScroll;

export const textFadeInCode = `import { useRef, useEffect, ReactNode } from "react";
import * as anime from "animejs";

interface TextRevealOnScrollProps {
  children: ReactNode;
  threshold?: number;
}

const TextRevealOnScroll = ({ children, threshold = 0.3 }: TextRevealOnScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            observer.unobserve(entry.target);
            
            anime.default.animate(containerRef.current, {
              opacity: [0, 1],
              translateY: [20, 0],
              easing: 'easeOutCubic',
              duration: 800,
              delay: 200
            });
          }
        });
      },
      { threshold }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold]);
  
  return (
    <div ref={containerRef} className="opacity-0 transform translate-y-5">
      {children}
    </div>
  );
};

export default TextRevealOnScroll;`;
