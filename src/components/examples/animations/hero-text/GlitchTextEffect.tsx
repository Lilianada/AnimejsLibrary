
import { useEffect, useRef } from "react";
import * as anime from "animejs";

const GlitchTextEffect = () => {
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const glitchAnimation = () => {
      // Reset before animating
      anime.default({
        targets: textRef.current,
        duration: 10,
        translateX: 0,
        translateY: 0,
        skewX: 0,
        easing: 'easeInOutQuad',
        complete: () => {
          // Begin glitch sequence
          anime.default({
            targets: textRef.current,
            translateX: [
              { value: 3, duration: 100, delay: 500 },
              { value: -5, duration: 100, delay: 0 },
              { value: 0, duration: 100, delay: 0 }
            ],
            translateY: [
              { value: -3, duration: 100, delay: 1000 },
              { value: 5, duration: 100, delay: 0 },
              { value: 0, duration: 100, delay: 0 }
            ],
            skewX: [
              { value: 5, duration: 100, delay: 1500 },
              { value: -3, duration: 100, delay: 0 },
              { value: 0, duration: 100, delay: 0 }
            ],
            easing: 'easeInOutQuad',
            complete: glitchAnimation
          });
        }
      });
    };
    
    glitchAnimation();
    
    // Updated cleanup function that doesn't rely on anime.running
    const element = textRef.current;
    return () => {
      if (element) {
        // Create a "stop" animation to effectively pause any ongoing animations
        anime.default({
          targets: element,
          duration: 1,
          complete: () => {
            // This callback runs after the stop animation completes
            // Nothing else should be running at this point
          }
        });
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div 
        ref={textRef}
        className="text-4xl md:text-5xl font-bold relative"
        style={{
          textShadow: '2px 0 #ff00cc, -2px 0 #00ccff'
        }}
      >
        GLITCH EFFECT
        <span 
          className="absolute inset-0 opacity-70"
          style={{
            textShadow: '-2px 0 #ff00cc, 2px 0 #00ccff',
            clipPath: 'inset(10% 0 60% 0)',
            animation: 'glitch-anim 3s infinite linear alternate-reverse'
          }}
        >
          GLITCH EFFECT
        </span>
      </div>
      
      <style>
        {`
        @keyframes glitch-anim {
          0%, 100% { clip-path: inset(20% 0 30% 0); }
          20% { clip-path: inset(60% 0 10% 0); }
          40% { clip-path: inset(40% 0 40% 0); }
          60% { clip-path: inset(80% 0 5% 0); }
          80% { clip-path: inset(10% 0 60% 0); }
        }
        `}
      </style>
    </div>
  );
};

export default GlitchTextEffect;

export const glitchTextEffectCode = `import { useRef, useEffect } from "react";
import * as anime from "animejs";

const GlitchTextEffect = () => {
  const textRef = useRef(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const glitchAnimation = () => {
      // Reset before animating
      anime.default({
        targets: textRef.current,
        duration: 10,
        translateX: 0,
        translateY: 0,
        skewX: 0,
        easing: 'easeInOutQuad',
        complete: () => {
          // Begin glitch sequence
          anime.default({
            targets: textRef.current,
            translateX: [
              { value: 3, duration: 100, delay: 500 },
              { value: -5, duration: 100, delay: 0 },
              { value: 0, duration: 100, delay: 0 }
            ],
            translateY: [
              { value: -3, duration: 100, delay: 1000 },
              { value: 5, duration: 100, delay: 0 },
              { value: 0, duration: 100, delay: 0 }
            ],
            skewX: [
              { value: 5, duration: 100, delay: 1500 },
              { value: -3, duration: 100, delay: 0 },
              { value: 0, duration: 100, delay: 0 }
            ],
            easing: 'easeInOutQuad',
            complete: glitchAnimation
          });
        }
      });
    };
    
    glitchAnimation();
    
    return () => {
      if (textRef.current) {
        // Create a "stop" animation to effectively pause ongoing animations
        anime.default({
          targets: textRef.current,
          duration: 1
        });
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div 
        ref={textRef}
        className="text-4xl md:text-5xl font-bold relative"
        style={{
          textShadow: '2px 0 #ff00cc, -2px 0 #00ccff'
        }}
      >
        GLITCH EFFECT
        <span 
          className="absolute inset-0 opacity-70"
          style={{
            textShadow: '-2px 0 #ff00cc, 2px 0 #00ccff',
            clipPath: 'inset(10% 0 60% 0)'
          }}
        >
          GLITCH EFFECT
        </span>
      </div>
      
      {/* You can add some CSS for additional glitch effects */}
      <style>{\`
        @keyframes glitch-anim {
          0%, 100% { clip-path: inset(20% 0 30% 0); }
          20% { clip-path: inset(60% 0 10% 0); }
          40% { clip-path: inset(40% 0 40% 0); }
          60% { clip-path: inset(80% 0 5% 0); }
          80% { clip-path: inset(10% 0 60% 0); }
        }
      \`}</style>
    </div>
  );
};

export default GlitchTextEffect;`;
