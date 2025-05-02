
import { useEffect, useRef } from "react";
import * as anime from "animejs";

const LetterFlyIn = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Setup for letter animation
    const letters = containerRef.current?.querySelectorAll('.letter');
    
    // Reset and trigger animation
    const animateLetters = () => {
      if (!letters) return;
      
      // Reset animation
      anime.set(letters, {
        translateY: -30,
        opacity: 0,
        scale: 1.2
      });
      
      // Start animation
      anime.default({
        targets: letters,
        translateY: 0,
        opacity: 1,
        scale: 1,
        easing: 'easeOutExpo',
        duration: 1000,
        delay: anime.stagger(50)
      });
    };
    
    animateLetters();
    
    // Setup interval to repeat animation
    const interval = setInterval(animateLetters, 6000);
    
    return () => clearInterval(interval);
  }, [text]);
  
  return (
    <div ref={containerRef} className="text-4xl font-bold flex">
      {text.split("").map((letter, index) => (
        <span key={index} className="letter inline-block">
          {letter}
        </span>
      ))}
    </div>
  );
};

export default LetterFlyIn;

export const letterFlyInCode = `import { useEffect, useRef } from "react";
import * as anime from "animejs";

const LetterFlyIn = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Setup for letter animation
    const letters = containerRef.current?.querySelectorAll('.letter');
    
    // Reset and trigger animation
    const animateLetters = () => {
      if (!letters) return;
      
      // Reset animation
      anime.set(letters, {
        translateY: -30,
        opacity: 0,
        scale: 1.2
      });
      
      // Start animation
      anime.default({
        targets: letters,
        translateY: 0,
        opacity: 1,
        scale: 1,
        easing: 'easeOutExpo',
        duration: 1000,
        delay: anime.stagger(50) // stagger each letter
      });
    };
    
    animateLetters();
    
    // Setup interval to repeat animation
    const interval = setInterval(animateLetters, 6000);
    
    return () => clearInterval(interval);
  }, [text]);
  
  return (
    <div ref={containerRef} className="text-4xl font-bold flex">
      {text.split("").map((letter, index) => (
        <span key={index} className="letter inline-block">
          {letter}
        </span>
      ))}
    </div>
  );
};

export default LetterFlyIn;`;
