import React, { useEffect, useState, useRef } from "react";
import { CodeToggle } from "./CodeToggle";


// Loader Components (can be kept separate or inlined)
const SpinningGradientLoader = () => (
  <div className="relative">
    <svg
      className="animate-spin"
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
    >
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="#FDA858"
        strokeWidth={5}
        opacity={0.25}
      />
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="url(#spin-grad)"
        strokeWidth={5}
        strokeDasharray="100"
        strokeDashoffset="30"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="spin-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDA858" />
          <stop offset="1" stopColor="#a07cf0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const CircularProgressLoader = ({ progress }: { progress: number }) => (
  <div className="relative w-14 h-14">
    <svg width={56} height={56}>
      <circle
        cx="28"
        cy="28"
        r="24"
        fill="none"
        stroke="#252525"
        strokeWidth="5"
      />
      <circle
        cx="28"
        cy="28"
        r="24"
        fill="none"
        stroke="#FDA858"
        strokeWidth="5"
        strokeDasharray="151"
        strokeDashoffset={151 - (151 * progress) / 100}
        style={{
          transition: "stroke-dashoffset 0.33s cubic-bezier(.4,2.6,0,1)"
        }}
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-sm text-primary font-bold mix-blend-lighten">
      {progress}%
    </div>
  </div>
);

const PulsingBarLoader = () => (
  <div className="w-10 h-10 bg-primary/80 rounded animate-pulse"></div>
);

const AnimatedProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full max-w-xs">
    <div className="h-3 rounded-lg bg-muted overflow-hidden">
      <div
        className="h-3 rounded-l-lg transition-all duration-200"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg,#FDA858,#A07CF0)"
        }}
      ></div>
    </div>
  </div>
);

const RotatingSquaresLoader = () => (
  <div className="relative w-12 h-12">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="absolute w-5 h-5 bg-primary/70 rounded-sm animate-rotate-square"
        style={{ animationDelay: `${i * 150}ms` }}
      ></div>
    ))}
    <style>{`
      @keyframes rotate-square {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-rotate-square {
        transform-origin: center center;
        animation: rotate-square 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      }
      .animate-rotate-square:nth-child(1) { top: 0; left: 0; }
      .animate-rotate-square:nth-child(2) { top: 0; right: 0; }
      .animate-rotate-square:nth-child(3) { bottom: 0; right: 0; }
      .animate-rotate-square:nth-child(4) { bottom: 0; left: 0; }
    `}</style>
  </div>
);

const BouncingLoader = () => {
  const ref = useRef(null);
  useEffect(() => {
    let animeModule: any = null;

    import('animejs')
      .then(module => {
        const animeInstance = module as any;
        animeModule = animeInstance;
        
        if (animeInstance && typeof animeInstance === 'function' && ref.current?.children) {
          console.log("Initializing BouncingLoader animation");
          animeInstance({
            targets: ref.current.children,
            translateY: [0, -10, 0],
            loop: true,
            duration: 800,
            delay: animeInstance.stagger(150)
          });
        } else {
          console.error("Failed to get animejs function or find targets for BouncingLoader:", { animeInstance, current: ref.current?.children });
        }
      })
      .catch(err => console.error("Failed to load animejs for BouncingLoader:", err));

    // Cleanup function
    return () => {
      if (animeModule && typeof animeModule.remove === 'function' && ref.current?.children) {
        try {
          const currentTargets = ref.current?.children;
          if (currentTargets && currentTargets.length > 0) {
             animeModule.remove(currentTargets);
          }
        } catch (error) {
          console.warn("Anime.js BouncingLoader cleanup error:", error);
        }
      }
    };
  }, []);

  return (
    <div ref={ref} className="flex space-x-1">
      <div className="w-3 h-3 bg-primary rounded-full"></div>
      <div className="w-3 h-3 bg-primary rounded-full"></div>
      <div className="w-3 h-3 bg-primary rounded-full"></div>
      <div className="w-3 h-3 bg-primary rounded-full"></div>
    </div>
  );
};

const LOADER_EXAMPLES = [
  {
    label: "Spinning Gradient",
    description: "SVG spinner with gradient.",
    component: <SpinningGradientLoader />,
    code: `<svg className="animate-spin" width={48} height={48} viewBox="0 0 48 48" fill="none">
  <circle cx="24" cy="24" r="20" stroke="#FDA858" strokeWidth={5} opacity={0.25} />
  <circle cx="24" cy="24" r="20" stroke="url(#spin-grad)" strokeWidth={5} strokeDasharray="100" strokeDashoffset="30" strokeLinecap="round" />
  <defs>
    <linearGradient id="spin-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FDA858" />
      <stop offset="1" stopColor="#a07cf0" />
    </linearGradient>
  </defs>
</svg>`
  },
  {
    label: "Circular Progress",
    description: "Shows percentage progress.",
    componentGenerator: (progress: number) => <CircularProgressLoader progress={progress} />,
    code: `// ... CircularProgressLoader code string ...`
  },
  {
    label: "Pulsing Bar",
    description: "Simple pulsing indicator.",
    component: <PulsingBarLoader />,
    code: `<div className="w-10 h-10 bg-primary/80 rounded animate-pulse"></div>`
  },
  {
    label: "Animated Progress Bar",
    description: "Linear progress indicator.",
    componentGenerator: (progress: number) => <AnimatedProgressBar progress={progress} />,
    code: `// ... AnimatedProgressBar code string ...`
  },
  {
    label: "Rotating Squares",
    description: "Squares rotating around center.",
    component: <RotatingSquaresLoader />,
    code: `<div className="relative w-12 h-12">
  {[...Array(4)].map((_, i) => (
    <div
      key={i}
      className="absolute w-5 h-5 bg-primary/70 rounded-sm animate-rotate-square"
      style={{ animationDelay: \`\${i * 150}ms\` }}
    ></div>
  ))}
</div>

/* Requires CSS Keyframes for 'animate-rotate-square' */
@keyframes rotate-square {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-rotate-square {
  transform-origin: center center;
  animation: rotate-square 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
.animate-rotate-square:nth-child(1) { top: 0; left: 0; }
/* ... positioning for other squares ... */`
  },
  {
    label: "Bouncing Loader",
    description: "Dots bouncing vertically.",
    component: <BouncingLoader />,
    code: `import { useEffect, useRef } from 'react';

const BouncingLoader = () => {
  const ref = useRef(null);
  useEffect(() => {
    let animeModule: any = null;
    import('animejs').then(module => {
      const animeInstance = module as any;
      animeModule = animeInstance;
      if (animeInstance && typeof animeInstance === 'function' && ref.current?.children) {
        console.log("Initializing BouncingLoader animation");
        animeInstance({
          targets: ref.current.children,
          translateY: [0, -10, 0],
          loop: true,
          duration: 800,
          delay: animeInstance.stagger(150)
        });
      }
    }).catch(err => console.error("Failed load animejs", err));

    return () => {
      if (animeModule && typeof animeModule.remove === 'function' && ref.current?.children) {
        const currentTargets = ref.current?.children;
        if (currentTargets && currentTargets.length > 0) {
           animeModule.remove(currentTargets);
        }
      }
    };
  }, []);

  return (
    <div ref={ref} className="flex space-x-1">
      <div className="w-3 h-3 bg-primary rounded-full"></div>
      <div className="w-3 h-3 bg-primary rounded-full"></div>
      <div className="w-3 h-3 bg-primary rounded-full"></div>
      <div className="w-3 h-3 bg-primary rounded-full"></div> 
    </div>
  );
};`
  }
];

// Restore the main LoaderShowcase component structure
export default function LoaderShowcase() {
  const [progress, setProgress] = useState(0);

  // Animate progress for relevant loaders
  useEffect(() => {
    let frame: number;
    let running = true;
    const animate = () => {
      setProgress((old) => (old >= 100 ? 0 : old + 1));
      if (running) {
        frame = requestAnimationFrame(animate);
      }
    };
    animate();
    return () => {
      running = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="loaders" className="mb-16 scroll-mt-20 space-y-8">
       <div className="mb-6">
         <h2 className="text-2xl font-bold mb-3">Loaders & Spinners</h2>
         <p className="text-muted-foreground">
           Examples of loading indicators, including progress-based ones.
         </p>
       </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {LOADER_EXAMPLES.map((loader, index) => (
          <CodeToggle
            key={loader.label || index} // Use label or index as key
            previewContent={
                // Handle components needing progress prop
                <div className="flex justify-center items-center p-4 min-h-[80px]">
                 {loader.componentGenerator ? loader.componentGenerator(progress) : loader.component}
               </div>
            }
            codeContent={loader.code}
            minHeightClass="min-h-[300px]" // Apply the correct min height
            className="w-full h-full flex flex-col" // Ensure flex layout
          />
        ))}
      </div>
    </section>
  );
}