import { useEffect, useRef } from 'react';
import anime from 'animejs'; // Changed from individual imports
import { CodeToggle } from './CodeToggle';

// Fixed WavyDotsLoader component
const WavyDotsLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = containerRef.current?.querySelectorAll('.wave-dot');

    if (!targets || targets.length === 0) return;

    // Anime.js animation for wavy bouncing effect
    const animation = anime({
      targets: targets,
      translateY: {
        value: [-12, 0],
        duration: 800,
        easing: 'easeInOutSine',
      },
      scale: {
        value: [0.8, 1],
        duration: 800,
        easing: 'easeInOutSine',
      },
      delay: anime.stagger(120, { from: 'center' }), // Stagger effect from the center
      loop: true,
      direction: 'alternate',
      autoplay: true,
    });

    return () => animation.pause(); // Clean up the animation on component unmount
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex gap-2 justify-center items-center h-12"
    >
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="wave-dot inline-block w-4 h-4 rounded-full bg-primary"
        ></span>
      ))}
    </div>
  );
};


// Updated loader data with fixed code
const LOADER_DATA = [
  {
    label: "Wavy Dots Loader",
    description: "Dots moving in a wave pattern using Anime.js.",
    component: <WavyDotsLoader />,
    code: `import { useEffect, useRef } from 'react';
import anime from 'animejs';

const WavyDotsLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = containerRef.current?.querySelectorAll('.wave-dot');
    
    if (!targets || targets.length === 0) return;

    const animation = anime({
      targets: targets,
      translateY: {
        value: [-12, 0],
        duration: 800,
        easing: 'easeInOutSine'
      },
      delay: anime.stagger(90, { from: 'center' }),
      loop: true,
      direction: 'alternate',
      autoplay: true
    });

    return () => animation.pause();
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

// Preserved LoadersExamples component with CodeToggle
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
