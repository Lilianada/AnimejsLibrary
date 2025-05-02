
import { useEffect, useRef } from "react";
import anime from "animejs";

interface FadeInRevealProps {
  src: string;
  alt: string;
}

const FadeInReveal = ({ src, alt }: FadeInRevealProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          // Animate using anime.js
          anime({
            targets: imageRef.current,
            opacity: [0, 1],
            filter: ['blur(10px)', 'blur(0px)'],
            scale: [0.9, 1],
            easing: 'easeOutExpo',
            duration: 1500
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={imageRef}
      className="w-full h-72 rounded-md overflow-hidden opacity-0"
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

export default FadeInReveal;

export const fadeInRevealCode = `import { useEffect, useRef } from "react";
import anime from "animejs";

const FadeInReveal = ({ src, alt }) => {
  const imageRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          // Animate using anime.js
          anime({
            targets: imageRef.current,
            opacity: [0, 1],
            filter: ['blur(10px)', 'blur(0px)'],
            scale: [0.9, 1],
            easing: 'easeOutExpo',
            duration: 1500
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={imageRef}
      className="w-full h-72 rounded-md overflow-hidden opacity-0"
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

export default FadeInReveal;`;
