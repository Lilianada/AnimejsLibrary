
import { useEffect, useRef, useState } from "react";
import anime from "animejs";

interface ClipPathRevealProps {
  src: string;
  alt: string;
}

const ClipPathReveal = ({ src, alt }: ClipPathRevealProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
          
          // Animate using anime.js
          anime({
            targets: imageRef.current,
            clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
            easing: 'easeInOutQuad',
            duration: 1200
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
    <div className="w-full h-full relative overflow-hidden">
      <div 
        ref={imageRef}
        className="w-full h-72 rounded-md overflow-hidden"
        style={{ 
          clipPath: isInView ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)'
        }}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

export default ClipPathReveal;

export const clipPathRevealCode = `import { useEffect, useRef, useState } from "react";
import anime from "animejs";

const ClipPathReveal = ({ src, alt }) => {
  const imageRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
          
          // Animate using anime.js
          anime({
            targets: imageRef.current,
            clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
            easing: 'easeInOutQuad',
            duration: 1200
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
    <div className="w-full h-full relative overflow-hidden">
      <div 
        ref={imageRef}
        className="w-full h-72 rounded-md overflow-hidden"
        style={{ 
          clipPath: isInView ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)'
        }}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

export default ClipPathReveal;`;
