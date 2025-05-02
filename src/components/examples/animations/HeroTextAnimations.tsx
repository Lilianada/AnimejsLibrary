
import { useState, useEffect, useRef } from "react";
import { CodeToggle } from "../CodeToggle";
import anime from "animejs";

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
  const mainTextRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const animateElements = () => {
    setIsAnimated(true);
    
    // Animate main text elements
    if (mainTextRef.current) {
      const spans = mainTextRef.current.querySelectorAll('span');
      anime.timeline({
        easing: 'easeOutExpo',
      })
      .add({
        targets: spans,
        translateY: ['100%', '0%'],
        duration: 1000,
        delay: anime.stagger(200),
        opacity: [0, 1]
      });
    }
    
    // Animate subtitle with delay
    if (subTextRef.current) {
      anime({
        targets: subTextRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuad',
        delay: 600
      });
    }
    
    // Animate button with more delay
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuad',
        delay: 800
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      animateElements();
    }, 500);
  }, []);

  const resetAnimation = () => {
    setIsAnimated(false);
    
    // Reset all elements
    if (mainTextRef.current) {
      const spans = mainTextRef.current.querySelectorAll('span');
      anime.set(spans, {
        translateY: '100%',
        opacity: 0
      });
    }
    
    if (subTextRef.current) {
      anime.set(subTextRef.current, {
        translateY: 20,
        opacity: 0
      });
    }
    
    if (buttonRef.current) {
      anime.set(buttonRef.current, {
        translateY: 20,
        opacity: 0
      });
    }
    
    // Re-run animation after a short delay
    setTimeout(() => {
      animateElements();
    }, 100);
  };

  return (
    <div className="text-center">
      <div ref={mainTextRef} className="mb-4">
        <div className="inline-block overflow-hidden mr-2">
          <span className="text-3xl sm:text-4xl font-bold inline-block opacity-0">
            Creative
          </span>
        </div>
        <div className="inline-block overflow-hidden">
          <span className="text-3xl sm:text-4xl font-bold inline-block opacity-0">
            Developer
          </span>
        </div>
      </div>
      <div className="overflow-hidden">
        <p
          ref={subTextRef}
          className="text-muted-foreground opacity-0"
        >
          Building amazing web experiences
        </p>
      </div>
      <button
        ref={buttonRef}
        onClick={resetAnimation}
        className="mt-6 px-4 py-2 bg-primary/80 text-white rounded-md hover:bg-primary transition-colors opacity-0"
      >
        Reset Animation
      </button>
    </div>
  );
};

// Masked Text Effect Component
const MaskedTextEffect = () => {
  const [isHovered, setIsHovered] = useState(false);
  const maskRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Auto-play the animation once
    setIsHovered(true);
    
    if (maskRef.current) {
      anime({
        targets: maskRef.current,
        translateY: '100%',
        easing: 'cubicBezier(0.77, 0, 0.175, 1)',
        duration: 800
      });
    }
    
    const timer = setTimeout(() => {
      setIsHovered(false);
      
      if (maskRef.current) {
        anime({
          targets: maskRef.current,
          translateY: '0%',
          easing: 'cubicBezier(0.77, 0, 0.175, 1)',
          duration: 800
        });
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleHover = (hovering: boolean) => {
    setIsHovered(hovering);
    
    if (maskRef.current) {
      anime({
        targets: maskRef.current,
        translateY: hovering ? '100%' : '0%',
        easing: 'cubicBezier(0.77, 0, 0.175, 1)',
        duration: 800
      });
    }
  };

  return (
    <div 
      className="text-center"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
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
          ref={maskRef}
          className="relative inline-block bg-[#111] text-white mix-blend-lighten"
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
  const mainTextRef = useRef<HTMLSpanElement>(null);
  const glitchLayerOneRef = useRef<HTMLSpanElement>(null);
  const glitchLayerTwoRef = useRef<HTMLSpanElement>(null);
  
  const triggerGlitch = () => {
    setIsGlitching(true);
    
    // Create glitch animation with anime.js
    if (mainTextRef.current && glitchLayerOneRef.current && glitchLayerTwoRef.current) {
      // Show glitch layers
      anime.set([glitchLayerOneRef.current, glitchLayerTwoRef.current], {
        opacity: 0.7
      });
      
      // Animate main text with short random movements
      anime.timeline({
        targets: mainTextRef.current,
        easing: 'easeInOutQuad',
        duration: 100,
        loop: 8,
        direction: 'alternate',
      })
      .add({
        translateX: () => anime.random(-5, 5),
        translateY: () => anime.random(-3, 3),
      })
      .add({
        translateX: () => anime.random(-5, 5),
        translateY: () => anime.random(-3, 3),
      })
      .add({
        translateX: 0,
        translateY: 0,
        complete: () => {
          anime.set([glitchLayerOneRef.current, glitchLayerTwoRef.current], {
            opacity: 0
          });
          setIsGlitching(false);
        }
      });
      
      // Animate glitch layer one
      anime.timeline({
        targets: glitchLayerOneRef.current,
        easing: 'steps(2)',
        duration: 100,
        loop: 6
      })
      .add({
        translateX: () => anime.random(-10, 10),
        translateY: () => anime.random(-5, 5),
      });
      
      // Animate glitch layer two
      anime.timeline({
        targets: glitchLayerTwoRef.current,
        easing: 'steps(2)',
        duration: 50,
        loop: 10
      })
      .add({
        translateX: () => anime.random(-8, 8),
        translateY: () => anime.random(-6, 6),
      });
    }
  };
  
  useEffect(() => {
    // Trigger initial animation
    const initialTimeout = setTimeout(() => {
      triggerGlitch();
    }, 800);
    
    // Set up interval to periodically trigger the glitch effect
    const interval = setInterval(() => {
      triggerGlitch();
    }, 8000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="text-center">
      <h2 className="text-3xl sm:text-4xl font-bold relative inline-block">
        <span className="relative inline-block">
          {/* Create the "glitched" pseudo-elements */}
          <span 
            ref={glitchLayerOneRef} 
            className="absolute top-0 left-0 w-full text-primary opacity-0"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
          >
            {text}
          </span>
          <span 
            ref={glitchLayerTwoRef} 
            className="absolute top-0 left-0 w-full text-accent opacity-0"
            style={{ clipPath: "polygon(0 80%, 100% 20%, 100% 100%, 0 100%)" }}
          >
            {text}
          </span>
          <span ref={mainTextRef}>{text}</span>
        </span>
      </h2>
      <button
        onClick={triggerGlitch}
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
  const textContainerRef = useRef<HTMLDivElement>(null);
  
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
    
    // Use anime.js for smooth rotation
    if (textContainerRef.current) {
      anime({
        targets: textContainerRef.current,
        rotateX: rotX,
        rotateY: rotY,
        easing: 'easeOutQuad',
        duration: 300
      });
    }
  };
  
  const handleMouseLeave = () => {
    // Reset rotations when mouse leaves
    setRotateX(0);
    setRotateY(0);
    
    // Animate back to center position
    if (textContainerRef.current) {
      anime({
        targets: textContainerRef.current,
        rotateX: 0,
        rotateY: 0,
        easing: 'easeOutQuad',
        duration: 600
      });
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="flex items-center justify-center perspective-500 w-full h-full cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={textContainerRef}
        className="text-center transform-preserve-3d"
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
const splitTextRevealCode = `import { useEffect, useRef, useState } from "react";
import anime from "animejs";

const SplitTextReveal = () => {
  const mainTextRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const animateElements = () => {
    setIsAnimated(true);
    
    // Animate main text elements with anime.js
    if (mainTextRef.current) {
      const spans = mainTextRef.current.querySelectorAll('span');
      anime.timeline({
        easing: 'easeOutExpo',
      })
      .add({
        targets: spans,
        translateY: ['100%', '0%'],
        duration: 1000,
        delay: anime.stagger(200),
        opacity: [0, 1]
      });
    }
    
    // Animate subtitle with delay
    if (subTextRef.current) {
      anime({
        targets: subTextRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuad',
        delay: 600
      });
    }
    
    // Animate button with more delay
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuad',
        delay: 800
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      animateElements();
    }, 500);
  }, []);

  const resetAnimation = () => {
    setIsAnimated(false);
    
    // Reset all elements with anime.js
    if (mainTextRef.current) {
      const spans = mainTextRef.current.querySelectorAll('span');
      anime.set(spans, {
        translateY: '100%',
        opacity: 0
      });
    }
    
    if (subTextRef.current) {
      anime.set(subTextRef.current, {
        translateY: 20,
        opacity: 0
      });
    }
    
    if (buttonRef.current) {
      anime.set(buttonRef.current, {
        translateY: 20,
        opacity: 0
      });
    }
    
    // Re-run animation after a short delay
    setTimeout(() => {
      animateElements();
    }, 100);
  };

  return (
    <div className="text-center">
      <div ref={mainTextRef} className="mb-4">
        <div className="inline-block overflow-hidden mr-2">
          <span className="text-3xl sm:text-4xl font-bold inline-block opacity-0">
            Creative
          </span>
        </div>
        <div className="inline-block overflow-hidden">
          <span className="text-3xl sm:text-4xl font-bold inline-block opacity-0">
            Developer
          </span>
        </div>
      </div>
      <div className="overflow-hidden">
        <p
          ref={subTextRef}
          className="text-muted-foreground opacity-0"
        >
          Building amazing web experiences
        </p>
      </div>
      <button
        ref={buttonRef}
        onClick={resetAnimation}
        className="mt-6 px-4 py-2 bg-primary/80 text-white rounded-md 
          hover:bg-primary transition-colors opacity-0"
      >
        Reset Animation
      </button>
    </div>
  );
};

export default SplitTextReveal;`;

const maskedTextCode = `import { useState, useEffect, useRef } from "react";
import anime from "animejs";

const MaskedTextEffect = () => {
  const [isHovered, setIsHovered] = useState(false);
  const maskRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Auto-play the animation once
    setIsHovered(true);
    
    if (maskRef.current) {
      anime({
        targets: maskRef.current,
        translateY: '100%',
        easing: 'cubicBezier(0.77, 0, 0.175, 1)',
        duration: 800
      });
    }
    
    const timer = setTimeout(() => {
      setIsHovered(false);
      
      if (maskRef.current) {
        anime({
          targets: maskRef.current,
          translateY: '0%',
          easing: 'cubicBezier(0.77, 0, 0.175, 1)',
          duration: 800
        });
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleHover = (hovering: boolean) => {
    setIsHovered(hovering);
    
    // Use anime.js for smooth mask animation
    if (maskRef.current) {
      anime({
        targets: maskRef.current,
        translateY: hovering ? '100%' : '0%',
        easing: 'cubicBezier(0.77, 0, 0.175, 1)',
        duration: 800
      });
    }
  };

  return (
    <div 
      className="text-center"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
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
          ref={maskRef}
          className="relative inline-block bg-[#111] text-white mix-blend-lighten"
        >
          DIGITAL CREATION
        </span>
      </h2>
      <p className="mt-2 text-white/60 text-sm">Hover to reveal</p>
    </div>
  );
};

export default MaskedTextEffect;`;

const glitchTextCode = `import { useState, useEffect, useRef } from "react";
import anime from "animejs";

const GlitchText = ({ text }: { text: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const mainTextRef = useRef<HTMLSpanElement>(null);
  const glitchLayerOneRef = useRef<HTMLSpanElement>(null);
  const glitchLayerTwoRef = useRef<HTMLSpanElement>(null);
  
  const triggerGlitch = () => {
    setIsGlitching(true);
    
    // Create glitch animation with anime.js
    if (mainTextRef.current && glitchLayerOneRef.current && glitchLayerTwoRef.current) {
      // Show glitch layers
      anime.set([glitchLayerOneRef.current, glitchLayerTwoRef.current], {
        opacity: 0.7
      });
      
      // Animate main text with short random movements
      anime.timeline({
        targets: mainTextRef.current,
        easing: 'easeInOutQuad',
        duration: 100,
        loop: 8,
        direction: 'alternate',
      })
      .add({
        translateX: () => anime.random(-5, 5),
        translateY: () => anime.random(-3, 3),
      })
      .add({
        translateX: () => anime.random(-5, 5),
        translateY: () => anime.random(-3, 3),
      })
      .add({
        translateX: 0,
        translateY: 0,
        complete: () => {
          anime.set([glitchLayerOneRef.current, glitchLayerTwoRef.current], {
            opacity: 0
          });
          setIsGlitching(false);
        }
      });
      
      // Animate glitch layer one
      anime.timeline({
        targets: glitchLayerOneRef.current,
        easing: 'steps(2)',
        duration: 100,
        loop: 6
      })
      .add({
        translateX: () => anime.random(-10, 10),
        translateY: () => anime.random(-5, 5),
      });
      
      // Animate glitch layer two
      anime.timeline({
        targets: glitchLayerTwoRef.current,
        easing: 'steps(2)',
        duration: 50,
        loop: 10
      })
      .add({
        translateX: () => anime.random(-8, 8),
        translateY: () => anime.random(-6, 6),
      });
    }
  };
  
  useEffect(() => {
    // Trigger initial animation
    const initialTimeout = setTimeout(() => {
      triggerGlitch();
    }, 800);
    
    // Set up interval to periodically trigger the glitch effect
    const interval = setInterval(() => {
      triggerGlitch();
    }, 8000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="text-center">
      <h2 className="text-3xl sm:text-4xl font-bold relative inline-block">
        <span className="relative inline-block">
          {/* Create the "glitched" pseudo-elements */}
          <span 
            ref={glitchLayerOneRef} 
            className="absolute top-0 left-0 w-full text-primary opacity-0"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
          >
            {text}
          </span>
          <span 
            ref={glitchLayerTwoRef} 
            className="absolute top-0 left-0 w-full text-accent opacity-0"
            style={{ clipPath: "polygon(0 80%, 100% 20%, 100% 100%, 0 100%)" }}
          >
            {text}
          </span>
          <span ref={mainTextRef}>{text}</span>
        </span>
      </h2>
      <button
        onClick={triggerGlitch}
        className="mt-6 px-4 py-2 bg-primary/80 text-white rounded-md hover:bg-primary transition-colors"
      >
        Trigger Glitch
      </button>
    </div>
  );
};

export default GlitchText;`;

const perspectiveTextCode = `import { useState, useRef } from "react";
import anime from "animejs";

const PerspectiveText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calculate rotation values based on mouse position
    const rotX = ((y - height / 2) / height) * -20;
    const rotY = ((x - width / 2) / width) * 20;
    
    // Use anime.js for smooth rotation
    if (textContainerRef.current) {
      anime({
        targets: textContainerRef.current,
        rotateX: rotX,
        rotateY: rotY,
        easing: 'easeOutQuad',
        duration: 300
      });
    }
  };
  
  const handleMouseLeave = () => {
    // Reset rotations when mouse leaves with anime.js
    if (textContainerRef.current) {
      anime({
        targets: textContainerRef.current,
        rotateX: 0,
        rotateY: 0,
        easing: 'easeOutQuad',
        duration: 600
      });
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="flex items-center justify-center perspective-500 w-full h-full cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={textContainerRef}
        className="text-center transform-preserve-3d"
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
