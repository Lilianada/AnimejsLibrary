
import { useEffect, useRef } from "react";
import anime from "animejs";

interface SlideInRevealProps {
  src: string;
  alt: string;
}

const SlideInReveal = ({ src, alt }: SlideInRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          // Sequence animations with anime.js
          const timeline = anime.timeline({
            easing: 'easeOutExpo'
          });
          
          timeline
            .add({
              targets: overlayRef.current,
              translateX: ['0%', '100%'],
              duration: 800
            })
            .add({
              targets: imageRef.current,
              translateX: ['-100%', '0%'],
              opacity: [0, 1],
              duration: 800
            }, '-=600');
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
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-primary z-10"
      />
      <img 
        ref={imageRef}
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover opacity-0 transform -translate-x-full"
      />
    </div>
  );
};

export default SlideInReveal;

export const slideInRevealCode = `import { useEffect, useRef } from "react";
import anime from "animejs";

const SlideInReveal = ({ src, alt }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          // Sequence animations with anime.js
          const timeline = anime.timeline({
            easing: 'easeOutExpo'
          });
          
          timeline
            .add({
              targets: overlayRef.current,
              translateX: ['0%', '100%'],
              duration: 800
            })
            .add({
              targets: imageRef.current,
              translateX: ['-100%', '0%'],
              opacity: [0, 1],
              duration: 800
            }, '-=600');
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
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-primary z-10"
      />
      <img 
        ref={imageRef}
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover opacity-0 transform -translate-x-full"
      />
    </div>
  );
};

export default SlideInReveal;`;
