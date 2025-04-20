
import React, { useEffect, useState } from "react";
import clsx from "clsx";

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
    <section className="py-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Spinning Gradient Loader */}
      <div className="flex flex-col gap-4 items-center p-6 bg-card/60 rounded-xl border shadow-lg">
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
        <span className="font-semibold">Spinning Gradient Loader</span>
      </div>

      {/* Bouncing Dots Loader */}
      <div className="flex flex-col gap-4 items-center p-6 bg-card/60 rounded-xl border shadow-lg">
        <div className="flex gap-2 items-end h-8">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className={clsx(
                "inline-block w-3 h-3 rounded-full bg-[#FDA858] animate-bounce",
                "origin-bottom",
                { "animation-delay-200": i === 1, "animation-delay-400": i === 2, "animation-delay-600": i === 3 }
              )}
              style={{
                animationDelay: `${i * 160}ms`
              }}
            ></span>
          ))}
        </div>
        <span className="font-semibold">Bouncing Dots Loader</span>
      </div>

      {/* Circular Progress Loader */}
      <div className="flex flex-col gap-4 items-center p-6 bg-card/60 rounded-xl border shadow-lg">
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
        <span className="font-semibold">Animated Circular Progress</span>
      </div>

      {/* Morphing Loader */}
      <div className="flex flex-col gap-4 items-center p-6 bg-card/60 rounded-xl border shadow-lg">
        {/* Morph shape with SVG */}
        <MorphingShapeLoader />
        <span className="font-semibold">Morphing Shape Loader</span>
      </div>

      {/* Animated Progress Bar */}
      <div className="flex flex-col gap-4 items-center p-6 bg-card/60 rounded-xl border shadow-lg col-span-full">
        <div className="w-full">
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
        <span className="font-semibold">Animated Progress Bar</span>
      </div>
    </section>
  );
}

// Morphing shape SVG animation using React state for timing
function MorphingShapeLoader() {
  const [morphStep, setMorphStep] = useState(0);

  useEffect(() => {
    const steps = [
      // Circle
      "M28 4c13.255 0 24 10.745 24 24S41.255 52 28 52 4 41.255 4 28 14.745 4 28 4z",
      // Squircle
      "M12 12 Q28 0,44 12 Q56 28,44 44 Q28 56,12 44 Q0 28,12 12z",
      // Rounded Square
      "M10 10 Q10 0,28 0 Q46 0,46 10 Q56 28,46 46 Q46 56,28 56 Q10 56,10 46 Q0 28,10 10z",
    ];
    const interval = setInterval(() => {
      setMorphStep((prev) => (prev + 1) % steps.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);
  const steps = [
    "M28 4c13.255 0 24 10.745 24 24S41.255 52 28 52 4 41.255 4 28 14.745 4 28 4z",
    "M12 12 Q28 0,44 12 Q56 28,44 44 Q28 56,12 44 Q0 28,12 12z",
    "M10 10 Q10 0,28 0 Q46 0,46 10 Q56 28,46 46 Q46 56,28 56 Q10 56,10 46 Q0 28,10 10z",
  ];
  return (
    <svg width={56} height={56} viewBox="0 0 56 56">
      <path
        d={steps[morphStep]}
        fill="#FDA858"
        opacity="0.9"
        style={{
          transition: "d 0.5s cubic-bezier(.4,2.6,0,1)"
        }}
      />
    </svg>
  );
}
