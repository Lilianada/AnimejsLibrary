
import { useState, useEffect, useRef } from "react";
import { CodeToggle } from "../CodeToggle";
import anime from "animejs";

const TextAnimations = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Typewriter Effect</h4>
              <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                <TypewriterEffect 
                  phrases={[
                    "Build amazing websites.",
                    "Create engaging user experiences.",
                    "Design with anime.js animations.",
                    "Captivate your audience."
                  ]} 
                />
              </div>
            </div>
          }
          codeContent={typewriterCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Text Fade In</h4>
              <div className="border rounded-lg p-6 min-h-[200px]">
                <TextRevealOnScroll />
              </div>
            </div>
          }
          codeContent={textFadeInCode}
        />
        
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Letter Fly In</h4>
              <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                <LetterFlyIn text="ANIMATIONS" />
              </div>
            </div>
          }
          codeContent={letterFlyInCode}
        />
        
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Gradient Animated Text</h4>
              <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                <GradientText text="Moving Gradients" />
              </div>
            </div>
          }
          codeContent={gradientTextCode}
        />
      </div>
    </div>
  );
};

// Typewriter Effect Component
const TypewriterEffect = ({ phrases }: { phrases: string[] }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentPhrase) {
        // When typing is complete, wait and then start deleting
        setTypingSpeed(200);
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        // When deletion is complete, move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTypingSpeed(100);
      } else if (isDeleting) {
        // Delete one character at a time
        setText(currentPhrase.substring(0, text.length - 1));
      } else {
        // Add one character at a time
        setText(currentPhrase.substring(0, text.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, phraseIndex, isDeleting, phrases, typingSpeed]);

  return (
    <div className="flex items-center text-2xl font-bold">
      <span>{text}</span>
      <span className="w-0.5 h-8 bg-primary animate-blink ml-1"></span>
    </div>
  );
};

// Text Reveal On Scroll Component
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
          anime({
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

// Letter Fly In Component
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
      anime({
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

// Gradient Text Component
const GradientText = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    anime({
      targets: textRef.current,
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      easing: 'easeInOutSine',
      duration: 4000,
      loop: true
    });
  }, []);

  return (
    <div className="text-4xl font-bold">
      <span 
        ref={textRef}
        className="bg-clip-text text-transparent bg-[length:200%_auto]"
        style={{
          backgroundImage: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))'
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Code strings for the examples
const typewriterCode = `import { useState, useEffect } from "react";
import anime from "animejs";

const TypewriterEffect = ({ phrases }: { phrases: string[] }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentPhrase) {
        // When typing is complete, wait and then start deleting
        setTypingSpeed(200);
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        // When deletion is complete, move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTypingSpeed(100);
      } else if (isDeleting) {
        // Delete one character at a time
        setText(currentPhrase.substring(0, text.length - 1));
      } else {
        // Add one character at a time
        setText(currentPhrase.substring(0, text.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, phraseIndex, isDeleting, phrases, typingSpeed]);

  return (
    <div className="flex items-center text-2xl font-bold">
      <span>{text}</span>
      <span className="w-0.5 h-8 bg-primary animate-blink ml-1"></span>
    </div>
  );
};

// Add to tailwind.config.js
// animation: {
//   blink: 'blink 1s step-end infinite',
// },
// keyframes: {
//   blink: {
//     'from, to': { opacity: '1' },
//     '50%': { opacity: '0' },
//   },
// },

export default TypewriterEffect;`;

const textFadeInCode = `import { useEffect, useRef } from "react";
import anime from "animejs";

const TextRevealOnScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Use anime.js to animate text lines
          anime({
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

const letterFlyInCode = `import { useEffect, useRef } from "react";
import anime from "animejs";

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
      anime({
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

const gradientTextCode = `import { useEffect, useRef } from "react";
import anime from "animejs";

const GradientText = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    // Create animated gradient movement using anime.js
    anime({
      targets: textRef.current,
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      easing: 'easeInOutSine',
      duration: 4000,
      loop: true
    });
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

export default TextAnimations;
