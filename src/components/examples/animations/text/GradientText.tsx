
import { useEffect, useRef } from "react";
import * as anime from "animejs";

const GradientText = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const animation = anime({
      targets: textRef.current,
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      easing: 'easeInOutSine',
      duration: 4000,
      loop: true,
      autoplay: true
    });
    
    return () => {
      animation.pause();
    };
  }, []);

  return (
    <div className="text-4xl font-bold">
      <span 
        ref={textRef}
        className="bg-clip-text text-transparent bg-[length:200%_auto]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ff4bbd, #7c3aed, #fb7185, #ff4bbd)'
          // Using direct hex colors instead of hsl variables
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default GradientText;

export const gradientTextCode = `import { useEffect, useRef } from "react";
import * as anime from "animejs";

const GradientText = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const animation = anime({
      targets: textRef.current,
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      easing: 'easeInOutSine',
      duration: 4000,
      loop: true,
      autoplay: true
    });
    
    return () => {
      animation.pause();
    };
  }, []);

  return (
    <div className="text-4xl font-bold">
      <span 
        ref={textRef}
        className="bg-clip-text text-transparent bg-[length:200%_auto]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ff6b6b, #6b6bff, #6bff6b, #ff6b6b)'
          // You can customize your gradient colors
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default GradientText;`;
