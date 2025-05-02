
import { useState, useEffect, useRef } from "react";
import { CodeToggle } from "../CodeToggle";
import CodeBlock from "./CodeBlock";

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
                    "Design with animations.",
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
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div ref={elementRef} className="space-y-6">
      {[
        "This text will reveal",
        "one line at a time",
        "as it enters the viewport."
      ].map((line, index) => (
        <div
          key={index}
          className={`text-xl font-medium overflow-hidden transition-all duration-1000 ease-in-out transform ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${index * 200}ms` }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

// Letter Fly In Component
const LetterFlyIn = ({ text }: { text: string }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mount
    setTimeout(() => setIsAnimated(true), 500);
    
    // Reset animation periodically
    const interval = setInterval(() => {
      setIsAnimated(false);
      setTimeout(() => setIsAnimated(true), 500);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="text-4xl font-bold flex overflow-hidden">
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ease-out ${
            isAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-16"
          }`}
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

// Gradient Text Component
const GradientText = ({ text }: { text: string }) => {
  return (
    <div className="text-4xl font-bold">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%] animate-gradient-x">
        {text}
      </span>
    </div>
  );
};

// Code strings for the examples

const typewriterCode = `import { useState, useEffect } from "react";

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

const textFadeInCode = `import { useRef, useState, useEffect } from "react";

const TextRevealOnScroll = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div ref={elementRef} className="space-y-6">
      {[
        "This text will reveal",
        "one line at a time",
        "as it enters the viewport."
      ].map((line, index) => (
        <div
          key={index}
          className={\`text-xl font-medium overflow-hidden transition-all 
            duration-1000 ease-in-out transform \${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }\`}
          style={{ transitionDelay: \`\${index * 200}ms\` }}
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export default TextRevealOnScroll;`;

const letterFlyInCode = `import { useState, useEffect } from "react";

const LetterFlyIn = ({ text }: { text: string }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mount
    setTimeout(() => setIsAnimated(true), 500);
    
    // Reset animation periodically
    const interval = setInterval(() => {
      setIsAnimated(false);
      setTimeout(() => setIsAnimated(true), 500);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="text-4xl font-bold flex overflow-hidden">
      {text.split("").map((letter, index) => (
        <span
          key={index}
          className={\`inline-block transition-all duration-700 ease-out \${
            isAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-16"
          }\`}
          style={{ transitionDelay: \`\${index * 60}ms\` }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default LetterFlyIn;`;

const gradientTextCode = `import React from "react";

const GradientText = ({ text }: { text: string }) => {
  return (
    <div className="text-4xl font-bold">
      <span className="bg-clip-text text-transparent bg-gradient-to-r 
        from-primary via-secondary to-accent bg-[length:200%] 
        animate-gradient-x">
        {text}
      </span>
    </div>
  );
};

// Add to tailwind.config.js:
// animation: {
//   'gradient-x': 'gradient-x 4s ease infinite',
// },
// keyframes: {
//   'gradient-x': {
//     '0%, 100%': { backgroundPosition: '0% 50%' },
//     '50%': { backgroundPosition: '100% 50%' },
//   },
// },

export default GradientText;`;

export default TextAnimations;
