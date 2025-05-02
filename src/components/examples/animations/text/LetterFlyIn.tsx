
import { useEffect, useRef } from "react";
import anime from "animejs";

interface LetterFlyInProps {
  text: string;
  delay?: number;
}

const LetterFlyIn = ({ text, delay = 0 }: LetterFlyInProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const letters = containerRef.current.querySelectorAll('.letter');
    
    // Set initial state
    anime.set(letters, {
      opacity: 0,
      translateY: 40,
      translateZ: 0,
      translateX: function() {
        return [anime.random(-40, 40)];
      }
    });
    
    // Animate each letter
    anime({
      targets: letters,
      opacity: 1,
      translateY: 0,
      translateX: 0,
      scale: [0.8, 1],
      delay: function(el, i) {
        return delay + (i * 30);
      },
      duration: 1000,
      easing: 'easeOutElastic(1.5, 0.5)',
    });
  }, [delay, text]);
  
  return (
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold overflow-hidden">
      <div ref={containerRef} className="flex flex-wrap justify-center">
        {text.split('').map((letter, index) => (
          <span key={`${letter}-${index}`} className="letter inline-block mx-[0.01em]">
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LetterFlyIn;

export const letterFlyInCode = `import { useEffect, useRef } from "react";
import anime from "animejs";

interface LetterFlyInProps {
  text: string;
  delay?: number;
}

const LetterFlyIn = ({ text, delay = 0 }: LetterFlyInProps) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const letters = containerRef.current.querySelectorAll('.letter');
    
    // Set initial state
    anime.set(letters, {
      opacity: 0,
      translateY: 40,
      translateZ: 0,
      translateX: function() {
        return [anime.random(-40, 40)];
      }
    });
    
    // Animate each letter
    anime({
      targets: letters,
      opacity: 1,
      translateY: 0,
      translateX: 0,
      scale: [0.8, 1],
      delay: function(el, i) {
        return delay + (i * 30);
      },
      duration: 1000,
      easing: 'easeOutElastic(1.5, 0.5)',
    });
  }, [delay, text]);
  
  return (
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold overflow-hidden">
      <div ref={containerRef} className="flex flex-wrap justify-center">
        {text.split('').map((letter, index) => (
          <span key={\`\${letter}-\${index}\`} className="letter inline-block mx-[0.01em]">
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LetterFlyIn;`;
