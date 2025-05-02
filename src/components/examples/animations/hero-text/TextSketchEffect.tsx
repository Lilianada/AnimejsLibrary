
import { useEffect, useRef } from "react";
import * as anime from "animejs";

const TextSketchEffect = () => {
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const letters = textRef.current.querySelectorAll('span');
    
    anime.animate(letters, {
      opacity: [0, 1],
      translateY: [20, 0],
      translateX: [20, 0],
      translateZ: 0,
      duration: 1800,
      delay: anime.stagger(40),
      easing: 'easeOutExpo',
    });
    
  }, []);
  
  return (
    <div ref={textRef} className="text-center">
      <div className="text-4xl font-bold sketch-text">
        {Array.from("CREATIVE").map((letter, i) => (
          <span key={`${letter}-${i}`} className="inline-block opacity-0">
            {letter}
          </span>
        ))}
        <br />
        {Array.from("PORTFOLIO").map((letter, i) => (
          <span key={`${letter}-${i}`} className="inline-block opacity-0">
            {letter}
          </span>
        ))}
      </div>
      <style>
        {`
        .sketch-text {
          font-family: 'Arial', sans-serif;
          color: transparent;
          -webkit-text-stroke: 1px currentColor;
          letter-spacing: 0.05em;
          position: relative;
        }
        
        .sketch-text::before,
        .sketch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        `}
      </style>
    </div>
  );
};

export default TextSketchEffect;

export const textSketchEffectCode = `import { useRef, useEffect } from "react";
import * as anime from "animejs";

const TextSketchEffect = () => {
  const textRef = useRef(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const letters = textRef.current.querySelectorAll('span');
    
    anime.animate(letters, {
      opacity: [0, 1],
      translateY: [20, 0],
      translateX: [20, 0],
      translateZ: 0,
      duration: 1800,
      delay: anime.stagger(40),
      easing: 'easeOutExpo',
    });
    
  }, []);
  
  return (
    <div ref={textRef} className="text-center">
      <div className="text-4xl font-bold sketch-text">
        {Array.from("CREATIVE").map((letter, i) => (
          <span key={\`\${letter}-\${i}\`} className="inline-block opacity-0">
            {letter}
          </span>
        ))}
        <br />
        {Array.from("PORTFOLIO").map((letter, i) => (
          <span key={\`\${letter}-\${i}\`} className="inline-block opacity-0">
            {letter}
          </span>
        ))}
      </div>
      <style>{\`
        .sketch-text {
          font-family: 'Arial', sans-serif;
          color: transparent;
          -webkit-text-stroke: 1px currentColor;
          letter-spacing: 0.05em;
          position: relative;
        }
      \`}</style>
    </div>
  );
};

export default TextSketchEffect;`;
