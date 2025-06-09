import { useEffect, useRef } from "react";
import * as anime from 'animejs';

interface LetterFlyInProps {
  text: string;
  delay?: number;
  direction?: 'bottom' | 'top' | 'left' | 'right';
}

const LetterFlyIn = ({ 
  text, 
  delay = 0, 
  direction = 'bottom'
}: LetterFlyInProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const letters = containerRef.current.querySelectorAll('.letter');
    
    // Set initial properties
    letters.forEach(letter => {
      anime.default({
        targets: letter,
        opacity: 0,
        translateX: direction === 'left' ? -30 : (direction === 'right' ? 30 : 0),
        translateY: direction === 'top' ? -30 : (direction === 'bottom' ? 30 : 0),
        duration: 1 // Immediate effect
      });
    });
    
    // Animate letters
    anime.default({
      targets: Array.from(letters),
      opacity: [0, 1],
      translateX: [direction === 'left' ? -30 : (direction === 'right' ? 30 : 0), 0],
      translateY: [direction === 'top' ? -30 : (direction === 'bottom' ? 30 : 0), 0],
      rotate: [
        { value: direction === 'bottom' || direction === 'top' ? [-25, 25] : 0 }
      ],
      duration: 600,
      easing: 'easeOutQuad',
      delay: anime.default.stagger(80, { start: delay }),
    });
    
  }, [text, delay, direction]);
  
  return (
    <div ref={containerRef} className="inline-block">
      {text.split('').map((letter, index) => (
        <span
          key={index}
          className="letter inline-block"
          style={{ opacity: 0 }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
};

export default LetterFlyIn;

export const letterFlyInCode = `import { useEffect, useRef } from "react";
import * as anime from 'animejs';

interface LetterFlyInProps {
  text: string;
  delay?: number;
  direction?: 'bottom' | 'top' | 'left' | 'right';
}

const LetterFlyIn = ({ 
  text, 
  delay = 0, 
  direction = 'bottom'
}: LetterFlyInProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const letters = containerRef.current.querySelectorAll('.letter');
    
    // Set initial properties
    letters.forEach(letter => {
      anime.default({
        targets: letter,
        opacity: 0,
        translateX: direction === 'left' ? -30 : (direction === 'right' ? 30 : 0),
        translateY: direction === 'top' ? -30 : (direction === 'bottom' ? 30 : 0),
        duration: 1 // Immediate effect
      });
    });
    
    // Animate letters
    anime.default({
      targets: Array.from(letters),
      opacity: [0, 1],
      translateX: [direction === 'left' ? -30 : (direction === 'right' ? 30 : 0), 0],
      translateY: [direction === 'top' ? -30 : (direction === 'bottom' ? 30 : 0), 0],
      rotate: [
        { value: direction === 'bottom' || direction === 'top' ? [-25, 25] : 0 }
      ],
      duration: 600,
      easing: 'easeOutQuad',
      delay: anime.default.stagger(80, { start: delay }),
    });
    
  }, [text, delay, direction]);
  
  return (
    <div ref={containerRef} className="inline-block">
      {text.split('').map((letter, index) => (
        <span
          key={index}
          className="letter inline-block"
          style={{ opacity: 0 }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
};

export default LetterFlyIn;`
