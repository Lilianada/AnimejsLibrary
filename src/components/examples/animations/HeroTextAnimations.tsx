
import { useState, useEffect, useRef } from "react";
import { CodeToggle } from "../CodeToggle";
import anime from "animejs";
import { useTheme } from "next-themes";

const HeroTextAnimations = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Staggered Hero Text</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <StaggeredHeroText />
              </div>
            </div>
          }
          codeContent={staggeredHeroTextCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Glitch Text Effect</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <GlitchTextEffect />
              </div>
            </div>
          }
          codeContent={glitchTextEffectCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Text Sketch Effect</h4>
              <div 
                className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center"
                style={{
                  background: isDark ? "#121212" : "#f5f5f5",
                }}
              >
                <TextSketchEffect />
              </div>
            </div>
          }
          codeContent={textSketchEffectCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Masked Hero Text</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center overflow-hidden">
                <MaskedHeroText />
              </div>
            </div>
          }
          codeContent={maskedHeroTextCode}
        />
      </div>
    </div>
  );
};

// Staggered Hero Text
const StaggeredHeroText = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 750,
    });

    // First animate the container
    timeline.add({
      targets: containerRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
    });

    // Then animate each line with a staggered delay
    const lines = containerRef.current.querySelectorAll('.hero-line');
    timeline.add({
      targets: lines,
      translateY: [40, 0],
      opacity: [0, 1],
      delay: anime.stagger(200)
    }, '-=400');

    // Then animate the highlight elements
    const highlights = containerRef.current.querySelectorAll('.hero-highlight');
    highlights.forEach((highlight, index) => {
      const delay = 1000 + (index * 300);
      
      timeline.add({
        targets: highlight,
        backgroundPosition: ['-100% 0', '200% 0'],
        easing: 'easeInOutQuad',
        duration: 1200,
      }, `-=${delay > 1000 ? 1000 : delay}`);
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="opacity-0 max-w-2xl mx-auto text-center"
    >
      <div className="text-4xl md:text-5xl font-bold leading-tight">
        <div className="hero-line opacity-0">Create <span className="hero-highlight bg-gradient-to-r from-primary via-transparent to-transparent bg-[length:200%_100%] bg-clip-text text-transparent">seamless</span></div>
        <div className="hero-line opacity-0">animations with</div>
        <div className="hero-line opacity-0"><span className="hero-highlight bg-gradient-to-r from-secondary via-transparent to-transparent bg-[length:200%_100%] bg-clip-text text-transparent">anime.js</span></div>
      </div>
    </div>
  );
};

// Glitch Text Effect
const GlitchTextEffect = () => {
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const glitchAnimation = () => {
      // Reset before animating
      anime({
        targets: textRef.current,
        duration: 10,
        translateX: 0,
        translateY: 0,
        skewX: 0,
        easing: 'easeInOutQuad',
        complete: () => {
          // Begin glitch sequence
          anime({
            targets: textRef.current,
            translateX: [
              { value: 3, duration: 100, delay: 500 },
              { value: -5, duration: 100, delay: 0 },
              { value: 0, duration: 100, delay: 0 }
            ],
            translateY: [
              { value: -3, duration: 100, delay: 1000 },
              { value: 5, duration: 100, delay: 0 },
              { value: 0, duration: 100, delay: 0 }
            ],
            skewX: [
              { value: 5, duration: 100, delay: 1500 },
              { value: -3, duration: 100, delay: 0 },
              { value: 0, duration: 100, delay: 0 }
            ],
            easing: 'easeInOutQuad',
            complete: glitchAnimation
          });
        }
      });
    };
    
    glitchAnimation();
    
    return () => {
      anime.remove(textRef.current);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div 
        ref={textRef}
        className="text-4xl md:text-5xl font-bold relative"
        style={{
          textShadow: '2px 0 #ff00cc, -2px 0 #00ccff'
        }}
      >
        GLITCH EFFECT
        <span 
          className="absolute inset-0 opacity-70"
          style={{
            textShadow: '-2px 0 #ff00cc, 2px 0 #00ccff',
            clipPath: 'inset(10% 0 60% 0)',
            animation: 'glitch-anim 3s infinite linear alternate-reverse'
          }}
        >
          GLITCH EFFECT
        </span>
      </div>
    </div>
  );
};

// Text Sketch Effect
const TextSketchEffect = () => {
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const letters = textRef.current.querySelectorAll('span');
    
    anime({
      targets: letters,
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
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

// Masked Hero Text
const MaskedHeroText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current || isAnimated) return;
    
    const animation = anime({
      targets: '.mask-target',
      translateY: ["101%", 0],
      easing: 'easeOutQuart',
      duration: 800,
      delay: anime.stagger(200),
      complete: () => {
        setIsAnimated(true);
      }
    });
    
    return () => {
      animation.pause();
    };
  }, [isAnimated]);
  
  return (
    <div ref={containerRef} className="flex flex-col items-center text-center space-y-2">
      <div className="text-4xl md:text-5xl font-bold space-y-0">
        <h2 className="overflow-hidden">
          <span className="mask-target block transform translate-y-full">Welcome to my</span>
        </h2>
        <h2 className="overflow-hidden">
          <span className="mask-target block transform translate-y-full text-primary">Portfolio Site</span>
        </h2>
      </div>
      
      <div className="overflow-hidden mt-6 max-w-md">
        <p className="mask-target transform translate-y-full text-lg text-muted-foreground">
          Discover my creative projects and expertise across design & development.
        </p>
      </div>
    </div>
  );
};

// Code examples for export
const staggeredHeroTextCode = `import { useRef, useEffect } from "react";
import anime from "animejs";

const StaggeredHeroText = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 750,
    });

    // First animate the container
    timeline.add({
      targets: containerRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
    });

    // Then animate each line with a staggered delay
    const lines = containerRef.current.querySelectorAll('.hero-line');
    timeline.add({
      targets: lines,
      translateY: [40, 0],
      opacity: [0, 1],
      delay: anime.stagger(200)
    }, '-=400');

    // Then animate the highlight elements
    const highlights = containerRef.current.querySelectorAll('.hero-highlight');
    highlights.forEach((highlight, index) => {
      const delay = 1000 + (index * 300);
      
      timeline.add({
        targets: highlight,
        backgroundPosition: ['-100% 0', '200% 0'],
        easing: 'easeInOutQuad',
        duration: 1200,
      }, \`-=\${delay > 1000 ? 1000 : delay}\`);
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="opacity-0 max-w-2xl mx-auto text-center"
    >
      <div className="text-4xl md:text-5xl font-bold leading-tight">
        <div className="hero-line opacity-0">Create <span className="hero-highlight bg-gradient-to-r from-primary via-transparent to-transparent bg-[length:200%_100%] bg-clip-text text-transparent">seamless</span></div>
        <div className="hero-line opacity-0">animations with</div>
        <div className="hero-line opacity-0"><span className="hero-highlight bg-gradient-to-r from-secondary via-transparent to-transparent bg-[length:200%_100%] bg-clip-text text-transparent">anime.js</span></div>
      </div>
    </div>
  );
};

export default StaggeredHeroText;`;

const glitchTextEffectCode = `import { useRef, useEffect } from "react";
import anime from "animejs";

const GlitchTextEffect = () => {
  const textRef = useRef(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const glitchAnimation = () => {
      // Reset before animating
      anime({
        targets: textRef.current,
        duration: 10,
        translateX: 0,
        translateY: 0,
        skewX: 0,
        easing: 'easeInOutQuad',
        complete: () => {
          // Begin glitch sequence
          anime({
            targets: textRef.current,
            translateX: [
              { value: 3, duration: 100, delay: 500 },
              { value: -5, duration: 100, delay: 0 },
              { value: 0, duration: 100, delay: 0 }
            ],
            translateY: [
              { value: -3, duration: 100, delay: 1000 },
              { value: 5, duration: 100, delay: 0 },
              { value: 0, duration: 100, delay: 0 }
            ],
            skewX: [
              { value: 5, duration: 100, delay: 1500 },
              { value: -3, duration: 100, delay: 0 },
              { value: 0, duration: 100, delay: 0 }
            ],
            easing: 'easeInOutQuad',
            complete: glitchAnimation
          });
        }
      });
    };
    
    glitchAnimation();
    
    return () => {
      anime.remove(textRef.current);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div 
        ref={textRef}
        className="text-4xl md:text-5xl font-bold relative"
        style={{
          textShadow: '2px 0 #ff00cc, -2px 0 #00ccff'
        }}
      >
        GLITCH EFFECT
        <span 
          className="absolute inset-0 opacity-70"
          style={{
            textShadow: '-2px 0 #ff00cc, 2px 0 #00ccff',
            clipPath: 'inset(10% 0 60% 0)'
          }}
        >
          GLITCH EFFECT
        </span>
      </div>
      
      {/* You can add some CSS for additional glitch effects */}
      <style jsx>{\`
        @keyframes glitch-anim {
          0%, 100% { clip-path: inset(20% 0 30% 0); }
          20% { clip-path: inset(60% 0 10% 0); }
          40% { clip-path: inset(40% 0 40% 0); }
          60% { clip-path: inset(80% 0 5% 0); }
          80% { clip-path: inset(10% 0 60% 0); }
        }
      \`}</style>
    </div>
  );
};

export default GlitchTextEffect;`;

const textSketchEffectCode = `import { useRef, useEffect } from "react";
import anime from "animejs";

const TextSketchEffect = () => {
  const textRef = useRef(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const letters = textRef.current.querySelectorAll('span');
    
    anime({
      targets: letters,
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
      <style jsx>{\`
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

const maskedHeroTextCode = `import { useRef, useEffect, useState } from "react";
import anime from "animejs";

const MaskedHeroText = () => {
  const containerRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current || isAnimated) return;
    
    const animation = anime({
      targets: '.mask-target',
      translateY: ["101%", 0],
      easing: 'easeOutQuart',
      duration: 800,
      delay: anime.stagger(200),
      complete: () => {
        setIsAnimated(true);
      }
    });
    
    return () => {
      animation.pause();
    };
  }, [isAnimated]);
  
  return (
    <div ref={containerRef} className="flex flex-col items-center text-center space-y-2">
      <div className="text-4xl md:text-5xl font-bold space-y-0">
        <h2 className="overflow-hidden">
          <span className="mask-target block transform translate-y-full">Welcome to my</span>
        </h2>
        <h2 className="overflow-hidden">
          <span className="mask-target block transform translate-y-full text-primary">Portfolio Site</span>
        </h2>
      </div>
      
      <div className="overflow-hidden mt-6 max-w-md">
        <p className="mask-target transform translate-y-full text-lg text-muted-foreground">
          Discover my creative projects and expertise across design & development.
        </p>
      </div>
    </div>
  );
};

export default MaskedHeroText;`;

export default HeroTextAnimations;
