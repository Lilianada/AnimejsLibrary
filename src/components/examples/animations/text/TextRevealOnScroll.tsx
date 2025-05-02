
import { useEffect, useRef, useState } from "react";
import * as anime from "animejs";

const TextRevealOnScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Use anime.js to animate text lines
          anime.default({
            targets: '.text-line',
            translateY: [20, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(200)
          });
          
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      {[
        "This text will reveal",
        "one line at a time",
        "as it enters the viewport."
      ].map((line, index) => (
        <div
          key={index}
          className="text-line text-xl font-medium opacity-0"
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export default TextRevealOnScroll;

export const textFadeInCode = `import { useEffect, useRef } from "react";
import * as anime from "animejs";

const TextRevealOnScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use anime.js to animate text lines
          anime.default({
            targets: '.text-line',
            translateY: [20, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(200) // stagger each line
          });
          
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      {[
        "This text will reveal",
        "one line at a time",
        "as it enters the viewport."
      ].map((line, index) => (
        <div
          key={index}
          className="text-line text-xl font-medium opacity-0"
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export default TextRevealOnScroll;`;
