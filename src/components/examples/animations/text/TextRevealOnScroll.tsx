
import { useEffect, useRef, useState } from "react";
import anime from "animejs";

interface TextRevealOnScrollProps {
  children: React.ReactNode;
}

const TextRevealOnScroll = ({ children }: TextRevealOnScrollProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          anime({
            targets: textRef.current?.querySelector('.reveal-text'),
            translateY: [100, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1200,
            delay: 300
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(textRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <div ref={textRef} className="overflow-hidden">
      <div className="reveal-text opacity-0">{children}</div>
    </div>
  );
};

export default TextRevealOnScroll;

export const textRevealOnScrollCode = `import { useEffect, useRef, useState } from "react";
import anime from "animejs";

interface TextRevealOnScrollProps {
  children: React.ReactNode;
}

const TextRevealOnScroll = ({ children }: TextRevealOnScrollProps) => {
  const textRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          anime({
            targets: textRef.current?.querySelector('.reveal-text'),
            translateY: [100, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1200,
            delay: 300
          });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(textRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <div ref={textRef} className="overflow-hidden">
      <div className="reveal-text opacity-0">{children}</div>
    </div>
  );
};

export default TextRevealOnScroll;`;
