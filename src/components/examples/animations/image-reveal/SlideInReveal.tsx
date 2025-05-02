
import { useEffect, useRef } from "react";
import * as anime from "animejs";

interface SlideInRevealProps {
  imageSrc: string;
  altText?: string;
  className?: string;
  direction?: 'right' | 'left' | 'top' | 'bottom';
}

const SlideInReveal = ({ 
  imageSrc, 
  altText = '', 
  className = '',
  direction = 'right'
}: SlideInRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            observer.unobserve(entry.target);
            
            // Get transform start position based on direction
            const getStartPosition = () => {
              switch(direction) {
                case 'right': return { translateX: '100%' };
                case 'left': return { translateX: '-100%' };
                case 'top': return { translateY: '-100%' };
                case 'bottom': return { translateY: '100%' };
                default: return { translateX: '100%' };
              }
            };
            
            // Create image slide in animation
            anime.animate(imageRef.current, {
              ...getStartPosition(),
              translateX: '0%',
              translateY: '0%',
              opacity: [0, 1],
              easing: 'easeOutQuad',
              duration: 800
            });
            
            // Create overlay animation
            anime.animate(overlayRef.current, {
              scaleX: direction === 'top' || direction === 'bottom' ? [1, 1] : [1, 0],
              scaleY: direction === 'left' || direction === 'right' ? [1, 1] : [1, 0],
              translateX: direction === 'right' ? ['0%', '-100%'] : (direction === 'left' ? ['0%', '100%'] : '0%'),
              translateY: direction === 'bottom' ? ['0%', '-100%'] : (direction === 'top' ? ['0%', '100%'] : '0%'),
              easing: 'easeInOutQuad',
              duration: 800,
              delay: 300
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
  }, [direction]);
  
  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img 
        ref={imageRef}
        src={imageSrc} 
        alt={altText} 
        className="w-full h-full object-cover opacity-0"
        style={{ 
          transform: direction === 'right' ? 'translateX(100%)' : 
                     direction === 'left' ? 'translateX(-100%)' : 
                     direction === 'top' ? 'translateY(-100%)' : 
                     'translateY(100%)'
        }}
      />
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-primary origin-left"
        style={{ 
          transformOrigin: direction === 'right' ? 'right' : 
                          direction === 'left' ? 'left' : 
                          direction === 'top' ? 'top' : 
                          'bottom' 
        }}
      />
    </div>
  );
};

export default SlideInReveal;
