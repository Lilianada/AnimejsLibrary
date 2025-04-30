import React, { useEffect, useState, useRef } from "react";
import { CodeToggle } from "./CodeToggle";
import { animate, stagger } from "animejs";

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

const WavyDotsLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animation: ReturnType<typeof animate> | null = null;
    const targets = containerRef.current?.querySelectorAll('.wave-dot');

    if (targets && targets.length > 0) {
      animation = animate(
        targets,
        {
          translateY: [
            { value: -12, duration: 400, easing: 'easeInOutSine' },
            { value: 0, duration: 400, easing: 'easeInOutSine' }
          ],
          delay: stagger(90),
          loop: true,
          direction: 'alternate'
        }
      );
    }
    return () => {
      if (animation && typeof animation.pause === 'function') {
        animation.pause();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="flex gap-2 items-center h-8">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="wave-dot inline-block w-3 h-3 rounded-full bg-[#FDA858]"
        ></span>
      ))}
    </div>
  );
};

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
    <div className="absolute inset-0 flex items-center justify-center text-sm text-[#FDA858] font-bold mix-blend-lighten">
      {progress}%
    </div>
  </div>
);

const PulsingBarLoader = () => (
  <div className="w-10 h-10 bg-[#FDA858]/80 rounded animate-pulse"></div>
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

const LOADER_EXAMPLES = [
  {
    label: "Spinning Gradient",
    description: "SVG spinner with gradient and animation.",
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
    label: "Wavy Dots",
    description: "Dots moving in a sine wave pattern using Anime.js.",
    component: <WavyDotsLoader />,
    code: `// Requires useEffect, useRef, and animejs
const WavyDotsLoader = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const animation = animate({
      targets: containerRef.current.querySelectorAll('.wave-dot'),
      translateY: [
        { value: -12, duration: 400, easing: 'easeInOutSine' },
        { value: 0, duration: 400, easing: 'easeInOutSine' }
      ],
      delay: stagger(90),
      loop: true,
      direction: 'alternate'
    });
    return () => animation.pause();
  }, []);

  return (
    <div ref={containerRef} className="flex gap-2 items-center h-8">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="wave-dot inline-block w-3 h-3 rounded-full bg-[#FDA858]"></span>
      ))}
    </div>
  );
};`
  },
  {
    label: "Circular Progress",
    description: "SVG circle simulating progress update.",
    componentGenerator: (progress) => <CircularProgressLoader progress={progress} />,
    code: `// Requires 'progress' state (0-100)
<div className="relative w-14 h-14">
  <svg width={56} height={56}>
    <circle cx="28" cy="28" r="24" fill="none" stroke="#252525" strokeWidth="5" />
    <circle
      cx="28" cy="28" r="24" fill="none" stroke="#FDA858" strokeWidth="5"
      strokeDasharray="151"
      strokeDashoffset={151 - (151 * progress) / 100}
      style={{ transition: "stroke-dashoffset 0.33s cubic-bezier(.4,2.6,0,1)" }}
    />
  </svg>
  <div className="absolute inset-0 flex items-center justify-center text-sm text-[#FDA858] font-bold mix-blend-lighten">
    {progress}%
  </div>
</div>`
  },
  {
    label: "Pulsing Bar",
    description: "Basic pulse animation on an element.",
    component: <PulsingBarLoader />,
    code: `<div className="w-10 h-10 bg-[#FDA858]/80 rounded animate-pulse"></div>`
  },
  {
    label: "Animated Progress Bar",
    description: "Linear progress bar with animation.",
    componentGenerator: (progress) => <AnimatedProgressBar progress={progress} />,
    code: `// Requires 'progress' state (0-100)
<div className="w-full">
  <div className="h-3 rounded-lg bg-muted overflow-hidden">
    <div
      className="h-3 rounded-l-lg transition-all duration-200"
      style={{
        width: \`\${progress}%\`,
        background: "linear-gradient(90deg,#FDA858,#A07CF0)"
      }}
    ></div>
  </div>
</div>`
  },
  {
    label: "Rotating Squares",
    description: "Four squares rotating in a loop.",
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
  }
];


export default function LoaderShowcase() {
  const [progress, setProgress] = useState(0);

  // Animate progress
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
    <section className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Loader Showcase</h2>
        <p className="text-muted-foreground">
          Examples of different loading indicators and animations.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {LOADER_EXAMPLES.map((loader) => (
          <CodeToggle
            key={loader.label}
            previewContent={
              <div className="space-y-4 p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold mb-1">{loader.label}</h3>
                  <p className="text-sm text-muted-foreground">{loader.description}</p>
                </div>
                <div className="flex justify-center items-center min-h-[80px]">
                  {loader.componentGenerator ? loader.componentGenerator(progress) : loader.component}
                </div>
              </div>
            }
            codeContent={loader.code}
            className="w-full h-full"
          />
        ))}
      </div>
    </section>
  );
}
