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
        <linearGradient
          id="spin-grad"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
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
          transition: "stroke-dashoffset 0.33s cubic-bezier(.4,2.6,0,1)",
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
          background: "linear-gradient(90deg,#FDA858,#A07CF0)",
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

// New Pulsating Circles Loader
const PulsatingCirclesLoader = () => (
  <div className="flex space-x-2 relative w-20 h-10 items-center justify-center">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="w-3 h-3 bg-primary rounded-full animate-pulsate"
        style={{ animationDelay: `${i * 180}ms` }} // Stagger the animation
      ></div>
    ))}
    <style>{`
      @keyframes pulsate {
        0%, 100% { transform: scale(0.8); opacity: 0.6; }
        50% { transform: scale(1.1); opacity: 1; }
      }
      .animate-pulsate {
        animation: pulsate 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `}</style>
  </div>
);
const LOADER_EXAMPLES = [
  {
    label: "Spinning Gradient",
    description: "SVG spinner with gradient.",
    component: <SpinningGradientLoader />,
    code: `
import React from 'react';

const SpinningGradientLoader = () => (
  <div className="relative">
    <svg className="animate-spin" width={48} height={48} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" stroke="#FDA858" strokeWidth={5} opacity={0.25} />
      <circle cx="24" cy="24" r="20" stroke="url(#spin-grad)" strokeWidth={5} strokeDasharray="100" strokeDashoffset="30" strokeLinecap="round" />
      <defs>
        <linearGradient id="spin-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDA858" />
          <stop offset="1" stopColor="#a07cf0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);`,
  },
  {
    label: "Circular Progress",
    description: "Shows percentage progress.",
    componentGenerator: (progress: number) => (
      <CircularProgressLoader progress={progress} />
    ),
    code: `
import React from 'react';

const CircularProgressLoader = ({ progress }: { progress: number }) => (
  <div className="relative w-14 h-14">
    <svg width={56} height={56}>
      <circle cx="28" cy="28" r="24" fill="none" stroke="#252525" strokeWidth="5" />
      <circle cx="28" cy="28" r="24" fill="none" stroke="#FDA858" strokeWidth="5" strokeDasharray="151" strokeDashoffset={151 - (151 * progress) / 100} style={{ transition: "stroke-dashoffset 0.33s cubic-bezier(.4,2.6,0,1)" }} />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-sm text-primary font-bold mix-blend-lighten">
      {progress}%
    </div>
  </div>
);`,
  },
  {
    label: "Pulsing Bar",
    description: "Simple pulsing indicator.",
    component: <PulsingBarLoader />,
    code: `
import React from 'react';

const PulsingBarLoader = () => (
  <div className="w-10 h-10 bg-primary/80 rounded animate-pulse"></div>
);`,
  },
  {
    label: "Animated Progress Bar",
    description: "Linear progress indicator.",
    componentGenerator: (progress: number) => (
      <AnimatedProgressBar progress={progress} />
    ),
    code: `
import React from 'react';

const AnimatedProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full max-w-xs">
    <div className="h-3 rounded-lg bg-muted overflow-hidden">
      <div
        className="h-3 rounded-l-lg transition-all duration-200"
        style={{
          width: \`\${progress}%\`,
          background: "linear-gradient(90deg,#FDA858,#A07CF0)"
        }}
      ></div>
    </div>
  </div>
);`,
  },
  {
    label: "Rotating Squares",
    description: "Squares rotating around center.",
    component: <RotatingSquaresLoader />,
    code: `
import React from 'react';

const RotatingSquaresLoader = () => (
  <div className="relative w-12 h-12">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="absolute w-5 h-5 bg-primary/70 rounded-sm animate-rotate-square"
        style={{ animationDelay: \`\${i * 150}ms\` }}
      ></div>
    ))}
    <style>{\`
      @keyframes rotate-square {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-rotate-square {
        transform-origin: center center;
        animation: rotate-square 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      }
      .animate-rotate-square:nth-child(1) { top: 0; left: 0; }
      /* ... positioning for other squares ... */
    \`}</style>
  </div>
);`,
  },
  {
    label: "Pulsating Circles",
    description: "Circles pulsing with staggered delay.",
    component: <PulsatingCirclesLoader />,
    code: `
import React from 'react';

const PulsatingCirclesLoader = () => (
  <div className="flex space-x-2 relative w-20 h-10 items-center justify-center">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="w-3 h-3 bg-primary rounded-full animate-pulsate"
        style={{ animationDelay: \`\${i * 180}ms\` }}
      ></div>
    ))}
    {/* Requires CSS Keyframes for 'animate-pulsate' */}
    <style>{\`
      @keyframes pulsate {
        0%, 100% { transform: scale(0.8); opacity: 0.6; }
        50% { transform: scale(1.1); opacity: 1; }
      }
      .animate-pulsate {
        animation: pulsate 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    \`}</style>
  </div>
);`,
  },
];

// Restore the main LoaderShowcase component structure
export default function LoaderShowcase() {
  const [progress, setProgress] = useState(0);

  // Animate progress for relevant loaders
  useEffect(() => {
    let frame: number;
    let running = true;
    const animate = () => {
      setProgress((old) => (old >= 100 ? 0 : old + 5));
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
                {loader.componentGenerator
                  ? loader.componentGenerator(progress)
                  : loader.component}
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
