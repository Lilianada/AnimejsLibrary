
import { useEffect, useRef } from "react";
import * as anime from "animejs";

interface SplitCurtainRevealProps {
  imageSrc: string;
  altText?: string;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

const SplitCurtainReveal = ({ 
  imageSrc, 
  altText = '', 
  className = '',
  direction = 'horizontal' 
}: SplitCurtainRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const curtain1Ref = useRef<HTMLDivElement>(null);
  const curtain2Ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            observer.unobserve(entry.target);
            
            // Create image fade in animation
            anime.default.animate(imageRef.current, {
              opacity: [0, 1],
              easing: 'easeOutCubic',
              duration: 800,
              delay: 300
            });
            
            // Create curtains animation
            if (direction === 'horizontal') {
              anime.default.animate(curtain1Ref.current, {
                translateX: ['0%', '-100%'],
                easing: 'easeInOutQuart',
                duration: 800
              });
              
              anime.default.animate(curtain2Ref.current, {
                translateX: ['0%', '100%'],
                easing: 'easeInOutQuart',
                duration: 800
              });
            } else {
              anime.default.animate(curtain1Ref.current, {
                translateY: ['0%', '-100%'],
                easing: 'easeInOutQuart',
                duration: 800
              });
              
              anime.default.animate(curtain2Ref.current, {
                translateY: ['0%', '100%'],
                easing: 'easeInOutQuart',
                duration: 800
              });
            }
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
      />
      {direction === 'horizontal' ? (
        <>
          <div 
            ref={curtain1Ref}
            className="absolute top-0 left-0 w-1/2 h-full bg-secondary"
          />
          <div 
            ref={curtain2Ref}
            className="absolute top-0 right-0 w-1/2 h-full bg-secondary"
          />
        </>
      ) : (
        <>
          <div 
            ref={curtain1Ref}
            className="absolute top-0 left-0 w-full h-1/2 bg-secondary"
          />
          <div 
            ref={curtain2Ref}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-secondary"
          />
        </>
      )}
    </div>
  );
};

export default SplitCurtainReveal;

export const splitCurtainRevealCode = `import { useEffect, useRef } from "react";
import * as anime from "animejs";

const SplitCurtainReveal = ({ 
  imageSrc, 
  altText = '', 
  className = '',
  direction = 'horizontal' 
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const curtain1Ref = useRef(null);
  const curtain2Ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && containerRef.current) {
            observer.unobserve(entry.target);
            
            // Create image fade in animation
            anime.default.animate(imageRef.current, {
              opacity: [0, 1],
              easing: 'easeOutCubic',
              duration: 800,
              delay: 300
            });
            
            // Create curtains animation
            if (direction === 'horizontal') {
              anime.default.animate(curtain1Ref.current, {
                translateX: ['0%', '-100%'],
                easing: 'easeInOutQuart',
                duration: 800
              });
              
              anime.default.animate(curtain2Ref.current, {
                translateX: ['0%', '100%'],
                easing: 'easeInOutQuart',
                duration: 800
              });
            } else {
              anime.default.animate(curtain1Ref.current, {
                translateY: ['0%', '-100%'],
                easing: 'easeInOutQuart',
                duration: 800
              });
              
              anime.default.animate(curtain2Ref.current, {
                translateY: ['0%', '100%'],
                easing: 'easeInOutQuart',
                duration: 800
              });
            }
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
    <div ref={containerRef} className="relative overflow-hidden">
      <img 
        ref={imageRef}
        src={imageSrc} 
        alt={altText} 
        className="w-full h-full object-cover opacity-0"
      />
      {direction === 'horizontal' ? (
        <>
          <div 
            ref={curtain1Ref}
            className="absolute top-0 left-0 w-1/2 h-full bg-secondary"
          />
          <div 
            ref={curtain2Ref}
            className="absolute top-0 right-0 w-1/2 h-full bg-secondary"
          />
        </>
      ) : (
        <>
          <div 
            ref={curtain1Ref}
            className="absolute top-0 left-0 w-full h-1/2 bg-secondary"
          />
          <div 
            ref={curtain2Ref}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-secondary"
          />
        </>
      )}
    </div>
  );
};

export default SplitCurtainReveal;`;
