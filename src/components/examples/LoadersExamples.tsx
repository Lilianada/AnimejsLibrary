import { useState } from 'react';
import WaveLoader from './animations/loaders/WaveLoader';
import { CodeToggle } from './CodeToggle';

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
        <CodeToggle
          previewContent={
            <div className="flex items-center justify-center p-8">
              <WaveLoader />
            </div>
          }
          codeContent={`
import { useEffect, useRef } from 'react';
import anime from 'animejs';

const WaveLoader = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = anime({
        targets: '.wave-dot',
        translateY: [
          { value: -15, duration: 300, easing: 'easeOutCubic' },
          { value: 0, duration: 300, easing: 'easeInCubic' }
        ],
        delay: anime.stagger(100),
        loop: true,
        direction: 'alternate'
      });

      return () => animation.pause();
    }
  }, []);

  return (
    <div ref={containerRef} className="flex items-center justify-center gap-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="wave-dot w-3 h-3 bg-primary rounded-full"
        />
      ))}
    </div>
  );
};
          `}
        />
      </div>
    </div>
  );
};

export default LoadersExamples;
