
import { useRef, useEffect } from "react";
import { CodeBlock } from "./CodeBlock";
import * as anime from "animejs";

const HeroTextAnimations = () => {
  return (
    <div className="space-y-12">
      <GlitchingHeroText />
      <TextSplittingHero />
      <TextRevealHero />
    </div>
  );
};

const GlitchingHeroText = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Initialize animation on first render
    if (!textRef.current) return;
    
    const glitchEffect = () => {
      const glitchTimeline = anime.timeline({
        targets: textRef.current,
        duration: 100,
        easing: 'easeInOutSine',
        loop: 2,
        complete: () => {
          // Schedule next glitch effect
          setTimeout(glitchEffect, 4000 + Math.random() * 3000);
        },
      });
      
      // Random glitch effect
      for (let i = 0; i < 3; i++) {
        glitchTimeline.add({
          translateX: () => anime.random(-10, 10),
          translateY: () => anime.random(-2, 2),
          skewX: () => anime.random(-5, 5),
          color: () => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return `rgb(${r}, ${g}, ${b})`;
          },
        }).add({
          translateX: 0,
          translateY: 0,
          skewX: 0,
          color: 'hsl(var(--primary))',
        });
      }
    };
    
    // Start initial glitch sequence
    setTimeout(glitchEffect, 2000);
    
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Glitching Hero Text</h3>
          <p className="text-sm text-muted-foreground">
            A cyberpunk-inspired glitching text effect that catches attention with random movements and color changes.
          </p>
        </div>
        
        <div className="py-12 flex flex-col items-center justify-center border border-border/50 rounded-lg bg-gradient-to-br from-background to-muted">
          <h1 
            ref={textRef} 
            className="text-5xl md:text-7xl font-bold tracking-tight text-primary relative"
          >
            CYBER<span className="text-secondary">PUNK</span>
          </h1>
          <p className="mt-4 text-muted-foreground">Watch for the glitch effect</p>
        </div>
      </div>

      <CodeBlock
        code={`import { useRef, useEffect } from "react";
import * as anime from "animejs";

const GlitchingHeroText = () => {
  const textRef = useRef(null);
  
  useEffect(() => {
    // Initialize animation on first render
    if (!textRef.current) return;
    
    const glitchEffect = () => {
      const glitchTimeline = anime.timeline({
        targets: textRef.current,
        duration: 100,
        easing: 'easeInOutSine',
        loop: 2,
        complete: () => {
          // Schedule next glitch effect
          setTimeout(glitchEffect, 4000 + Math.random() * 3000);
        },
      });
      
      // Random glitch effect
      for (let i = 0; i < 3; i++) {
        glitchTimeline.add({
          translateX: () => anime.random(-10, 10),
          translateY: () => anime.random(-2, 2),
          skewX: () => anime.random(-5, 5),
          color: () => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return \`rgb(\${r}, \${g}, \${b})\`;
          },
        }).add({
          translateX: 0,
          translateY: 0,
          skewX: 0,
          color: 'var(--primary-color)',
        });
      }
    };
    
    // Start initial glitch sequence
    setTimeout(glitchEffect, 2000);
    
    // Clean up not needed for this effect as it self-terminates
  }, []);
  
  return (
    <h1 
      ref={textRef} 
      className="text-5xl md:text-7xl font-bold tracking-tight text-primary"
    >
      CYBER<span className="text-secondary">PUNK</span>
    </h1>
  );
};`}
        language="tsx"
      />
    </div>
  );
};

const TextSplittingHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimated = useRef(false);
  
  useEffect(() => {
    if (!containerRef.current || isAnimated.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isAnimated.current) {
          isAnimated.current = true;
          
          // Get all characters for animation
          const chars = containerRef.current?.querySelectorAll('.char');
          
          // Animate each character
          anime.default({
            targets: chars,
            translateY: [100, 0],
            translateX: [40, 0],
            translateZ: 0,
            rotateZ: [10, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1500,
            delay: (el, i) => 300 + 30 * i,
          });
          
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Split text into characters for animation
  const SplitText = ({ children, className = "" }: { children: string, className?: string }) => {
    return (
      <span className={`inline-block overflow-hidden ${className}`}>
        {children.split("").map((char, index) => (
          <span 
            key={index} 
            className="char inline-block opacity-0"
            style={{ transform: "translateY(100%) translateX(40%) rotateZ(10deg)" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Character-by-Character Reveal</h3>
          <p className="text-sm text-muted-foreground">
            A dynamic text animation that reveals each character with a slight delay, creating a fluid motion effect.
          </p>
        </div>
        
        <div className="py-12 flex flex-col items-center justify-center border border-border/50 rounded-lg">
          <div ref={containerRef} className="text-center max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <SplitText>Craft Beautiful</SplitText>{' '}
              <SplitText className="text-primary">Animations</SplitText>
            </h1>
            <p className="text-muted-foreground text-lg">
              <SplitText>Bring your website to life with smooth animations</SplitText>
            </p>
          </div>
        </div>
      </div>

      <CodeBlock
        code={`import { useRef, useEffect } from "react";
import * as anime from "animejs";

const TextSplittingHero = () => {
  const containerRef = useRef(null);
  const isAnimated = useRef(false);
  
  useEffect(() => {
    if (!containerRef.current || isAnimated.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isAnimated.current) {
          isAnimated.current = true;
          
          // Get all characters for animation
          const chars = containerRef.current?.querySelectorAll('.char');
          
          // Animate each character
          anime.default({
            targets: chars,
            translateY: [100, 0],
            translateX: [40, 0],
            translateZ: 0,
            rotateZ: [10, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1500,
            delay: (el, i) => 300 + 30 * i,
          });
          
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Split text into characters for animation
  const SplitText = ({ children, className = "" }) => {
    return (
      <span className={\`inline-block overflow-hidden \${className}\`}>
        {children.split("").map((char, index) => (
          <span 
            key={index} 
            className="char inline-block opacity-0"
            style={{ transform: "translateY(100%) translateX(40%) rotateZ(10deg)" }}
          >
            {char === " " ? "\\u00A0" : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div ref={containerRef} className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
        <SplitText>Craft Beautiful</SplitText>{' '}
        <SplitText className="text-primary">Animations</SplitText>
      </h1>
      <p className="text-lg text-muted-foreground">
        <SplitText>Bring your website to life with smooth animations</SplitText>
      </p>
    </div>
  );
};`}
        language="tsx"
      />
    </div>
  );
};

const TextRevealHero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    if (!textRef.current || !maskRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Text reveal animation
          anime.default({
            targets: maskRef.current,
            scaleX: [0, 1],
            easing: 'easeInOutExpo',
            duration: 1000,
          });
          
          // Animate lines
          anime.default({
            targets: lineRefs.current,
            width: ['0%', '100%'],
            easing: 'easeInOutExpo',
            duration: 1200,
            delay: anime.stagger(200, {start: 800}),
          });
          
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    
    if (textRef.current) {
      observer.observe(textRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Store line references
  const addLineRef = (el: HTMLDivElement | null) => {
    if (el && !lineRefs.current.includes(el)) {
      lineRefs.current.push(el);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Mask Reveal Effect</h3>
          <p className="text-sm text-muted-foreground">
            A sophisticated reveal animation that uses masking to unveil text, followed by animated accent lines.
          </p>
        </div>
        
        <div className="py-12 flex flex-col items-center justify-center border border-border/50 rounded-lg bg-background/50">
          <div ref={textRef} className="relative">
            <div className="text-center">
              <div className="relative overflow-hidden inline-block">
                <h1 className="invisible text-4xl md:text-6xl font-bold tracking-tight">
                  Design with Purpose
                </h1>
                <div 
                  ref={maskRef}
                  className="absolute inset-0 origin-left" 
                  style={{ 
                    transform: 'scaleX(0)',
                  }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Design with <span className="text-primary">Purpose</span>
                  </h1>
                </div>
              </div>
            </div>
            
            <div className="mt-8 space-y-2">
              <div 
                ref={addLineRef} 
                className="h-0.5 bg-primary/70 w-0"
              />
              <div 
                ref={addLineRef}
                className="h-0.5 bg-primary/40 w-0 ml-auto"
              />
              <div 
                ref={addLineRef}
                className="h-0.5 bg-primary/20 w-0"
              />
            </div>
          </div>
        </div>
      </div>

      <CodeBlock
        code={`import { useRef, useEffect } from "react";
import * as anime from "animejs";

const TextRevealHero = () => {
  const textRef = useRef(null);
  const maskRef = useRef(null);
  const lineRefs = useRef([]);
  
  useEffect(() => {
    if (!textRef.current || !maskRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Text reveal animation
          anime.default({
            targets: maskRef.current,
            scaleX: [0, 1],
            easing: 'easeInOutExpo',
            duration: 1000,
          });
          
          // Animate lines
          anime.default({
            targets: lineRefs.current,
            width: ['0%', '100%'],
            easing: 'easeInOutExpo',
            duration: 1200,
            delay: anime.stagger(200, {start: 800}),
          });
          
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    
    if (textRef.current) {
      observer.observe(textRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Store line references
  const addLineRef = (el) => {
    if (el && !lineRefs.current.includes(el)) {
      lineRefs.current.push(el);
    }
  };

  return (
    <div ref={textRef} className="relative">
      <div className="text-center">
        <div className="relative overflow-hidden inline-block">
          <h1 className="invisible text-4xl md:text-6xl font-bold tracking-tight">
            Design with Purpose
          </h1>
          <div 
            ref={maskRef}
            className="absolute inset-0 origin-left" 
            style={{ 
              transform: 'scaleX(0)',
            }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Design with <span className="text-primary">Purpose</span>
            </h1>
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-2">
        <div 
          ref={addLineRef} 
          className="h-0.5 bg-primary/70 w-0"
        />
        <div 
          ref={addLineRef}
          className="h-0.5 bg-primary/40 w-0 ml-auto"
        />
        <div 
          ref={addLineRef}
          className="h-0.5 bg-primary/20 w-0"
        />
      </div>
    </div>
  );
};`}
        language="tsx"
      />
    </div>
  );
};

export default HeroTextAnimations;
