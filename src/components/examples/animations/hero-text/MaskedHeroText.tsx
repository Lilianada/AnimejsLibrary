
import { useEffect, useRef, useState } from "react";
import * as anime from "animejs";

const MaskedHeroText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current || isAnimated) return;
    
    const animation = anime.default({
      targets: '.mask-target',
      translateY: ["101%", 0],
      easing: 'easeOutQuart',
      duration: 800,
      delay: anime.default.stagger(200),
      complete: () => {
        setIsAnimated(true);
      }
    });
    
    return () => {
      animation.pause();
    };
  }, [isAnimated]);
  
  return (
    <div ref={containerRef} className="flex flex-col items-center text-center space-y-2">
      <div className="text-4xl md:text-5xl font-bold space-y-0">
        <h2 className="overflow-hidden">
          <span className="mask-target block transform translate-y-full">Welcome to my</span>
        </h2>
        <h2 className="overflow-hidden">
          <span className="mask-target block transform translate-y-full text-primary">Portfolio Site</span>
        </h2>
      </div>
      
      <div className="overflow-hidden mt-6 max-w-md">
        <p className="mask-target transform translate-y-full text-lg text-muted-foreground">
          Discover my creative projects and expertise across design & development.
        </p>
      </div>
    </div>
  );
};

export default MaskedHeroText;

export const maskedHeroTextCode = `import { useRef, useEffect, useState } from "react";
import * as anime from "animejs";

const MaskedHeroText = () => {
  const containerRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current || isAnimated) return;
    
    const animation = anime.default({
      targets: '.mask-target',
      translateY: ["101%", 0],
      easing: 'easeOutQuart',
      duration: 800,
      delay: anime.default.stagger(200),
      complete: () => {
        setIsAnimated(true);
      }
    });
    
    return () => {
      animation.pause();
    };
  }, [isAnimated]);
  
  return (
    <div ref={containerRef} className="flex flex-col items-center text-center space-y-2">
      <div className="text-4xl md:text-5xl font-bold space-y-0">
        <h2 className="overflow-hidden">
          <span className="mask-target block transform translate-y-full">Welcome to my</span>
        </h2>
        <h2 className="overflow-hidden">
          <span className="mask-target block transform translate-y-full text-primary">Portfolio Site</span>
        </h2>
      </div>
      
      <div className="overflow-hidden mt-6 max-w-md">
        <p className="mask-target transform translate-y-full text-lg text-muted-foreground">
          Discover my creative projects and expertise across design & development.
        </p>
      </div>
    </div>
  );
};

export default MaskedHeroText;`;
