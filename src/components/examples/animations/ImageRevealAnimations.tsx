
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { CodeToggle } from "../CodeToggle";
import * as anime from "animejs";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  animationType: "clip" | "fade" | "slide" | "split";
}

const ImageRevealAnimations = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Clip Path Reveal</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <ClipPathReveal
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                  alt="Abstract art"
                />
              </div>
            </div>
          }
          codeContent={clipPathRevealCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Fade In Reveal</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <FadeInReveal
                  src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Gradient bubbles"
                />
              </div>
            </div>
          }
          codeContent={fadeInRevealCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Slide In Reveal</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <SlideInReveal
                  src="https://images.unsplash.com/photo-1508614999368-9260051292e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Abstract lines"
                />
              </div>
            </div>
          }
          codeContent={slideInRevealCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Split Curtain Reveal</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                <SplitCurtainReveal
                  src="https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Abstract colors"
                />
              </div>
            </div>
          }
          codeContent={splitCurtainRevealCode}
        />
      </div>

      <div className="p-6 bg-muted/30 rounded-lg space-y-2">
        <h4 className="text-lg font-medium">Image Reveal Animation Tips</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Use IntersectionObserver to trigger animations when images enter the viewport.</li>
          <li>Always provide meaningful alt text for accessibility.</li>
          <li>Consider performance – animate transform and opacity properties when possible.</li>
          <li>For clip-path animations, stick to simple shapes for better browser support.</li>
          <li>Add fallbacks for browsers that don't support modern CSS features.</li>
        </ul>
      </div>
    </div>
  );
};

// Clip Path Reveal Component
const ClipPathReveal = ({ src, alt }: { src: string; alt: string }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
          
          // Animate using anime.js
          anime.default({
            targets: imageRef.current,
            clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
            easing: 'easeInOutQuad',
            duration: 1200
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div 
        ref={imageRef}
        className="w-full h-72 rounded-md overflow-hidden"
        style={{ 
          clipPath: isInView ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)'
        }}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

// Fade In Reveal Component
const FadeInReveal = ({ src, alt }: { src: string; alt: string }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          // Animate using anime.js
          anime.default({
            targets: imageRef.current,
            opacity: [0, 1],
            filter: ['blur(10px)', 'blur(0px)'],
            scale: [0.9, 1],
            easing: 'easeOutExpo',
            duration: 1500
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={imageRef}
      className="w-full h-72 rounded-md overflow-hidden opacity-0"
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

// Slide In Reveal Component
const SlideInReveal = ({ src, alt }: { src: string; alt: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          // Sequence animations with anime.js
          const timeline = anime.timeline({
            easing: 'easeOutExpo'
          });
          
          timeline
            .add({
              targets: overlayRef.current,
              translateX: ['0%', '100%'],
              duration: 800
            })
            .add({
              targets: imageRef.current,
              translateX: ['-100%', '0%'],
              opacity: [0, 1],
              duration: 800
            }, '-=600');
        }
      }, 
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-72 rounded-md overflow-hidden relative"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-primary z-10"
      />
      <img 
        ref={imageRef}
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover opacity-0 transform -translate-x-full"
      />
    </div>
  );
};

// Split Curtain Reveal Component
const SplitCurtainReveal = ({ src, alt }: { src: string; alt: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          // Animate curtains with anime.js
          anime.default({
            targets: topCurtainRef.current,
            translateY: ['0%', '-100%'],
            easing: 'easeInOutQuad',
            duration: 800
          });
          
          anime.default({
            targets: bottomCurtainRef.current,
            translateY: ['0%', '100%'],
            easing: 'easeInOutQuad',
            duration: 800
          });
          
          anime.default({
            targets: imageRef.current,
            scale: [1.1, 1],
            opacity: [0, 1],
            easing: 'easeOutQuad',
            duration: 1000,
            delay: 300
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-72 rounded-md overflow-hidden relative"
    >
      <img 
        ref={imageRef}
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover opacity-0 scale-110"
      />
      <div 
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-primary"
      />
      <div 
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-primary"
      />
    </div>
  );
};

// Code examples for each animation technique
const clipPathRevealCode = `import { useEffect, useRef, useState } from "react";
import * as anime from "animejs";

const ClipPathReveal = ({ src, alt }) => {
  const imageRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
          
          // Animate using anime.js
          anime.default({
            targets: imageRef.current,
            clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
            easing: 'easeInOutQuad',
            duration: 1200
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div 
        ref={imageRef}
        className="w-full h-72 rounded-md overflow-hidden"
        style={{ 
          clipPath: isInView ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)'
        }}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
        />
      </div>
    </div>
  );
};

export default ClipPathReveal;`;

const fadeInRevealCode = `import { useEffect, useRef } from "react";
import * as anime from "animejs";

const FadeInReveal = ({ src, alt }) => {
  const imageRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          // Animate using anime.js
          anime.default({
            targets: imageRef.current,
            opacity: [0, 1],
            filter: ['blur(10px)', 'blur(0px)'],
            scale: [0.9, 1],
            easing: 'easeOutExpo',
            duration: 1500
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={imageRef}
      className="w-full h-72 rounded-md overflow-hidden opacity-0"
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

export default FadeInReveal;`;

const slideInRevealCode = `import { useEffect, useRef } from "react";
import * as anime from "animejs";

const SlideInReveal = ({ src, alt }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          // Sequence animations with anime.js
          const timeline = anime.timeline({
            easing: 'easeOutExpo'
          });
          
          timeline
            .add({
              targets: overlayRef.current,
              translateX: ['0%', '100%'],
              duration: 800
            })
            .add({
              targets: imageRef.current,
              translateX: ['-100%', '0%'],
              opacity: [0, 1],
              duration: 800
            }, '-=600');
        }
      }, 
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-72 rounded-md overflow-hidden relative"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-primary z-10"
      />
      <img 
        ref={imageRef}
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover opacity-0 transform -translate-x-full"
      />
    </div>
  );
};

export default SlideInReveal;`;

const splitCurtainRevealCode = `import { useEffect, useRef } from "react";
import * as anime from "animejs";

const SplitCurtainReveal = ({ src, alt }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const topCurtainRef = useRef(null);
  const bottomCurtainRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          
          // Animate curtains with anime.js
          anime.default({
            targets: topCurtainRef.current,
            translateY: ['0%', '-100%'],
            easing: 'easeInOutQuad',
            duration: 800
          });
          
          anime.default({
            targets: bottomCurtainRef.current,
            translateY: ['0%', '100%'],
            easing: 'easeInOutQuad',
            duration: 800
          });
          
          anime.default({
            targets: imageRef.current,
            scale: [1.1, 1],
            opacity: [0, 1],
            easing: 'easeOutQuad',
            duration: 1000,
            delay: 300
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-72 rounded-md overflow-hidden relative"
    >
      <img 
        ref={imageRef}
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover opacity-0 scale-110"
      />
      <div 
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-primary"
      />
      <div 
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-primary"
      />
    </div>
  );
};

export default SplitCurtainReveal;`;

export default ImageRevealAnimations;
