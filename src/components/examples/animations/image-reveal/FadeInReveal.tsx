
import { useEffect, useRef } from "react";
import * as anime from "animejs";

interface FadeInRevealProps {
  imageSrc: string;
  altText?: string;
  className?: string;
}

const FadeInReveal = ({ imageSrc, altText = '', className = '' }: FadeInRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            observer.unobserve(entry.target);
            
            // Create fade and scale animation
            anime.default.animate(imageRef.current, {
              opacity: [0, 1],
              scale: [0.9, 1],
              easing: 'easeOutCubic',
              duration: 800
            });
          }
        });
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
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img 
        ref={imageRef}
        src={imageSrc} 
        alt={altText} 
        className="w-full h-full object-cover opacity-0 scale-90"
      />
    </div>
  );
};

export default FadeInReveal;

export const fadeInRevealCode = `import { useEffect, useRef } from "react";
import * as anime from "animejs";

const FadeInReveal = ({ imageSrc, altText = '', className = '' }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            observer.unobserve(entry.target);
            
            // Create fade and scale animation
            anime.default.animate(imageRef.current, {
              opacity: [0, 1],
              scale: [0.9, 1],
              easing: 'easeOutCubic',
              duration: 800
            });
          }
        });
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
    <div ref={containerRef} className="overflow-hidden">
      <img 
        ref={imageRef}
        src={imageSrc} 
        alt={altText} 
        className="w-full h-full object-cover opacity-0 scale-90"
      />
    </div>
  );
};

export default FadeInReveal;`;
