import { useState, useEffect, useRef } from 'react';
import { CodeToggle } from './CodeToggle';
import { animate, stagger } from 'animejs';

// Define the working loader component here
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
          className="wave-dot inline-block w-3 h-3 rounded-full bg-primary"
        ></span>
      ))}
    </div>
  );
};

// Updated loader data
const LOADER_DATA = [
  {
    label: "Wavy Dots Loader",
    description: "Dots moving in a wave pattern using Anime.js.",
    component: <WavyDotsLoader />,
    code: `import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

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
          className="wave-dot inline-block w-3 h-3 rounded-full bg-primary"
        ></span>
      ))}
    </div>
  );
};`
  }
];

const LoadersExamples = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Loading Animations</h2>
        <p className="text-muted-foreground">
          A collection of loading animations and spinners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {LOADER_DATA.map(loader => (
          <CodeToggle
            key={loader.label}
            previewContent={
              <div className="space-y-4 p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold mb-1">{loader.label}</h3>
                  <p className="text-sm text-muted-foreground">{loader.description}</p>
                </div>
                <div className="flex items-center justify-center min-h-[60px] p-8">
                  {loader.component}
                </div>
              </div>
            }
            codeContent={loader.code}
            className="w-full h-full"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadersExamples;
