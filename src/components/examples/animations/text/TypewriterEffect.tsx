
import { useState, useEffect } from "react";

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

export default TypewriterEffect;

export const typewriterCode = `import { useState, useEffect } from "react";

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
