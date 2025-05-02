
import { useState, useEffect, useRef } from "react";
import { CodeToggle } from "../CodeToggle";

const HeroTextAnimations = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Split Text Reveal</h4>
              <div className="border rounded-lg p-6 min-h-[250px] flex items-center justify-center">
                <SplitTextReveal />
              </div>
            </div>
          }
          codeContent={splitTextRevealCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Masked Text</h4>
              <div className="border rounded-lg p-6 min-h-[250px] flex items-center justify-center bg-[#111]">
                <MaskedTextEffect />
              </div>
            </div>
          }
          codeContent={maskedTextCode}
        />
        
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Glitch Text</h4>
              <div className="border rounded-lg p-6 min-h-[250px] flex items-center justify-center">
                <GlitchText text="CREATIVE PORTFOLIO" />
              </div>
            </div>
          }
          codeContent={glitchTextCode}
        />
        
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">3D Perspective Text</h4>
              <div className="border rounded-lg p-6 min-h-[250px] flex items-center justify-center">
                <PerspectiveText />
              </div>
            </div>
          }
          codeContent={perspectiveTextCode}
        />
      </div>
    </div>
  );
};

// Split Text Reveal Component
const SplitTextReveal = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const resetAnimation = () => {
    setIsRevealed(false);
    setTimeout(() => setIsRevealed(true), 500);
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="overflow-hidden inline-block">
          <span
            className={`text-3xl sm:text-4xl font-bold inline-block transition-transform duration-1000 ${
              isRevealed ? "translate-y-0" : "translate-y-full"
            }`}
          >
            Creative
          </span>
        </div>{" "}
        <div className="overflow-hidden inline-block">
          <span
            className={`text-3xl sm:text-4xl font-bold inline-block transition-transform duration-1000 delay-[200ms] ${
              isRevealed ? "translate-y-0" : "translate-y-full"
            }`}
          >
            Developer
          </span>
        </div>
      </div>
      <div className="overflow-hidden">
        <p
          className={`text-muted-foreground transition-all duration-1000 delay-[400ms] ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Building amazing web experiences
        </p>
      </div>
      <button
        onClick={resetAnimation}
        className={`mt-6 px-4 py-2 bg-primary/80 text-white rounded-md 
          hover:bg-primary transition-colors transition-all duration-1000 delay-[600ms] ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        Reset Animation
      </button>
    </div>
  );
};

// Masked Text Effect Component
const MaskedTextEffect = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Auto-play the animation once
    setIsHovered(true);
    const timer = setTimeout(() => setIsHovered(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="relative text-4xl md:text-5xl font-bold overflow-hidden cursor-pointer p-4">
        {/* Background text (revealed) */}
        <span
          className="absolute inset-0 flex items-center justify-center bg-clip-text text-transparent 
          bg-gradient-to-r from-primary to-accent"
        >
          DIGITAL CREATION
        </span>
        
        {/* Foreground text (mask) */}
        <span
          className="relative inline-block bg-[#111] text-white mix-blend-lighten"
          style={{
            transition: "transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)",
            transform: isHovered ? "translateY(100%)" : "translateY(0)",
          }}
        >
          DIGITAL CREATION
        </span>
      </h2>
      <p className="mt-2 text-white/60 text-sm">Hover to reveal</p>
    </div>
  );
};

// Glitch Text Effect Component
const GlitchText = ({ text }: { text: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    // Trigger initial animation
    const initialTimeout = setTimeout(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 2000);
    }, 800);
    
    // Set up interval to periodically trigger the glitch effect
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 2000);
    }, 8000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="text-center">
      <h2
        className={`text-3xl sm:text-4xl font-bold relative inline-block ${
          isGlitching ? "animate-glitch" : ""
        }`}
      >
        <span className="relative inline-block">
          {/* Create the "glitched" pseudo-elements */}
          {isGlitching && (
            <>
              <span className="absolute top-0 left-0 w-full text-primary 
                animate-glitch-1 opacity-70" style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}>
                {text}
              </span>
              <span className="absolute top-0 left-0 w-full text-accent 
                animate-glitch-2 opacity-70" style={{ clipPath: "polygon(0 80%, 100% 20%, 100% 100%, 0 100%)" }}>
                {text}
              </span>
            </>
          )}
          <span className={isGlitching ? "opacity-90" : ""}>{text}</span>
        </span>
      </h2>
      <button
        onClick={() => {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 2000);
        }}
        className="mt-6 px-4 py-2 bg-primary/80 text-white rounded-md hover:bg-primary transition-colors"
      >
        Trigger Glitch
      </button>
    </div>
  );
};

// 3D Perspective Text Component
const PerspectiveText = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calculate rotation values based on mouse position
    // Invert the values to make the element "follow" the cursor
    const rotX = ((y - height / 2) / height) * -20;
    const rotY = ((x - width / 2) / width) * 20;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };
  
  const handleMouseLeave = () => {
    // Reset rotations when mouse leaves
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <div 
      ref={containerRef}
      className="flex items-center justify-center perspective-500 w-full h-full cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="text-center transition-transform duration-300 ease-out transform-preserve-3d"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
          3D PERSPECTIVE
        </h2>
        <p className="text-md text-white/80">Move your cursor over me</p>
      </div>
    </div>
  );
};

// Code strings for the examples
const splitTextRevealCode = `import { useState, useEffect } from "react";

const SplitTextReveal = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const resetAnimation = () => {
    setIsRevealed(false);
    setTimeout(() => setIsRevealed(true), 500);
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="overflow-hidden inline-block">
          <span
            className={\`text-3xl sm:text-4xl font-bold inline-block transition-transform duration-1000 \${
              isRevealed ? "translate-y-0" : "translate-y-full"
            }\`}
          >
            Creative
          </span>
        </div>{" "}
        <div className="overflow-hidden inline-block">
          <span
            className={\`text-3xl sm:text-4xl font-bold inline-block transition-transform duration-1000 delay-[200ms] \${
              isRevealed ? "translate-y-0" : "translate-y-full"
            }\`}
          >
            Developer
          </span>
        </div>
      </div>
      <div className="overflow-hidden">
        <p
          className={\`text-muted-foreground transition-all duration-1000 delay-[400ms] \${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }\`}
        >
          Building amazing web experiences
        </p>
      </div>
      <button
        onClick={resetAnimation}
        className={\`mt-6 px-4 py-2 bg-primary/80 text-white rounded-md 
          hover:bg-primary transition-colors transition-all duration-1000 delay-[600ms] \${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }\`}
      >
        Reset Animation
      </button>
    </div>
  );
};

export default SplitTextReveal;`;

const maskedTextCode = `import { useState, useEffect } from "react";

const MaskedTextEffect = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Auto-play the animation once
    setIsHovered(true);
    const timer = setTimeout(() => setIsHovered(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="relative text-4xl md:text-5xl font-bold overflow-hidden cursor-pointer p-4">
        {/* Background text (revealed) */}
        <span
          className="absolute inset-0 flex items-center justify-center bg-clip-text text-transparent 
          bg-gradient-to-r from-primary to-accent"
        >
          DIGITAL CREATION
        </span>
        
        {/* Foreground text (mask) */}
        <span
          className="relative inline-block bg-[#111] text-white mix-blend-lighten"
          style={{
            transition: "transform 0.6s cubic-bezier(0.77, 0, 0.175, 1)",
            transform: isHovered ? "translateY(100%)" : "translateY(0)",
          }}
        >
          DIGITAL CREATION
        </span>
      </h2>
      <p className="mt-2 text-white/60 text-sm">Hover to reveal</p>
    </div>
  );
};

export default MaskedTextEffect;`;

const glitchTextCode = `import { useState, useEffect } from "react";

const GlitchText = ({ text }: { text: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    // Trigger initial animation
    const initialTimeout = setTimeout(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 2000);
    }, 800);
    
    // Set up interval to periodically trigger the glitch effect
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 2000);
    }, 8000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="text-center">
      <h2
        className={\`text-3xl sm:text-4xl font-bold relative inline-block \${
          isGlitching ? "animate-glitch" : ""
        }\`}
      >
        <span className="relative inline-block">
          {/* Create the "glitched" pseudo-elements */}
          {isGlitching && (
            <>
              <span className="absolute top-0 left-0 w-full text-primary 
                animate-glitch-1 opacity-70" style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}>
                {text}
              </span>
              <span className="absolute top-0 left-0 w-full text-accent 
                animate-glitch-2 opacity-70" style={{ clipPath: "polygon(0 80%, 100% 20%, 100% 100%, 0 100%)" }}>
                {text}
              </span>
            </>
          )}
          <span className={isGlitching ? "opacity-90" : ""}>{text}</span>
        </span>
      </h2>
      <button
        onClick={() => {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 2000);
        }}
        className="mt-6 px-4 py-2 bg-primary/80 text-white rounded-md"
      >
        Trigger Glitch
      </button>
    </div>
  );
};

// Add to tailwind.config.js:
// keyframes: {
//   'glitch': {
//     '0%, 100%': { transform: 'translate(0)' },
//     '20%': { transform: 'translate(-5px, 5px)' },
//     '40%': { transform: 'translate(-5px, -5px)' },
//     '60%': { transform: 'translate(5px, 5px)' },
//     '80%': { transform: 'translate(5px, -5px)' },
//   },
//   'glitch-1': {
//     '0%, 100%': { transform: 'translate(0)' },
//     '40%': { transform: 'translate(-3px, 3px)' },
//     '66%': { transform: 'translate(3px, -3px)' },
//   },
//   'glitch-2': {
//     '0%, 100%': { transform: 'translate(0)' },
//     '33%': { transform: 'translate(5px, -5px)' },
//     '77%': { transform: 'translate(-5px, 5px)' },
//   },
// },
// animation: {
//   'glitch': 'glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite',
//   'glitch-1': 'glitch-1 0.4s linear infinite alternate-reverse',
//   'glitch-2': 'glitch-2 0.4s linear infinite alternate-reverse',
// },

export default GlitchText;`;

const perspectiveTextCode = `import { useState, useRef } from "react";

const PerspectiveText = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calculate rotation values based on mouse position
    const rotX = ((y - height / 2) / height) * -20;
    const rotY = ((x - width / 2) / width) * 20;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };
  
  const handleMouseLeave = () => {
    // Reset rotations when mouse leaves
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <div 
      ref={containerRef}
      className="flex items-center justify-center perspective-500 w-full h-full cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="text-center transition-transform duration-300 ease-out transform-preserve-3d"
        style={{
          transform: \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`,
        }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
          3D PERSPECTIVE
        </h2>
        <p className="text-md text-white/80">Move your cursor over me</p>
      </div>
    </div>
  );
};

// Add to your CSS:
// .perspective-500 {
//   perspective: 500px;
// }
// .transform-preserve-3d {
//   transform-style: preserve-3d;
// }

export default PerspectiveText;`;

export default HeroTextAnimations;
