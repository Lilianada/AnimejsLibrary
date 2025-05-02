
import { useEffect, useRef } from "react";
import anime from "animejs";

interface ClipPathRevealProps {
  imageSrc: string;
  altText?: string;
  className?: string;
}

const ClipPathReveal = ({ imageSrc, altText = '', className = '' }: ClipPathRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            observer.unobserve(entry.target);
            
            // Create clip path animation
            anime({
              targets: imageRef.current,
              clipPath: ['inset(100% 0 0 0)', 'inset(0 0 0 0)'], 
              opacity: [0, 1],
              easing: 'easeInOutQuad',
              duration: 800,
              delay: 100
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
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <img 
        ref={imageRef}
        src={imageSrc} 
        alt={altText} 
        className="w-full h-full object-cover opacity-0"
        style={{ 
          clipPath: 'inset(100% 0 0 0)'
        }}
      />
    </div>
  );
};

export default ClipPathReveal;

export const clipPathRevealCode = `import { useEffect, useRef } from "react";
import anime from "animejs";

const ClipPathReveal = ({ imageSrc, altText = '', className = '' }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            observer.unobserve(entry.target);
            
            // Create clip path animation
            anime({
              targets: imageRef.current,
              clipPath: ['inset(100% 0 0 0)', 'inset(0 0 0 0)'], 
              opacity: [0, 1],
              easing: 'easeInOutQuad',
              duration: 800,
              delay: 100
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
    <div ref={containerRef} className="overflow-hidden relative">
      <img 
        ref={imageRef}
        src={imageSrc} 
        alt={altText} 
        className="w-full h-full object-cover opacity-0"
        style={{ 
          clipPath: 'inset(100% 0 0 0)'
        }}
      />
    </div>
  );
};

export default ClipPathReveal;`;
