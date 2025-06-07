import React, { useEffect, useRef } from 'react';
import * as anime from 'animejs';

interface TextRevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
}

const TextRevealOnScroll: React.FC<TextRevealOnScrollProps> = ({ 
  children, 
  delay = 0 
}) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: textRef.current,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: 'easeOutExpo',
            duration: 800,
            delay: delay
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <span 
      ref={textRef} 
      className="inline-block opacity-0"
      style={{ transform: 'translateY(20px)' }}
    >
      {children}
    </span>
  );
};

export default TextRevealOnScroll;

// Export the code snippet for documentation
export const textFadeInCode = `import React, { useEffect, useRef } from 'react';
import * as anime from 'animejs';

const TextRevealOnScroll = ({ children, delay = 0 }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: textRef.current,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: 'easeOutExpo',
            duration: 800,
            delay: delay
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <span 
      ref={textRef} 
      className="inline-block opacity-0"
      style={{ transform: 'translateY(20px)' }}
    >
      {children}
    </span>
  );
};

export default TextRevealOnScroll;`;
