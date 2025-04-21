
import { useEffect, useRef } from 'react';
import anime from 'animejs';
import './loader-animations.css';

const LoaderAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      anime({
        targets: containerRef.current.querySelectorAll('.loader-animation'),
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        easing: 'easeOutQuad',
        duration: 600
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Loader Animations</h2>
        <p className="text-muted-foreground">
          Elegant loading animations to engage users during wait times.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="loader-animation bg-card p-6 rounded-lg">
          <div className="spinner-loader mb-4"></div>
          <h3 className="text-lg font-medium mb-2">Spinning Loader</h3>
          <p className="text-sm text-muted-foreground">
            A simple spinning loader with gradient colors.
          </p>
        </div>

        <div className="loader-animation bg-card p-6 rounded-lg">
          <div className="pulse-loader mb-4"></div>
          <h3 className="text-lg font-medium mb-2">Pulse Loader</h3>
          <p className="text-sm text-muted-foreground">
            A pulsing circle that provides a subtle loading indicator.
          </p>
        </div>

        <div className="loader-animation bg-card p-6 rounded-lg">
          <div className="dots-loader mb-4"></div>
          <h3 className="text-lg font-medium mb-2">Dots Loader</h3>
          <p className="text-sm text-muted-foreground">
            Three dots bouncing in sequence.
          </p>
        </div>

        <div className="loader-animation bg-card p-6 rounded-lg">
          <div className="progress-loader mb-4"></div>
          <h3 className="text-lg font-medium mb-2">Progress Loader</h3>
          <p className="text-sm text-muted-foreground">
            A horizontal progress bar with a smooth animation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoaderAnimations;
