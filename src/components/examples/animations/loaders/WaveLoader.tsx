
import { useEffect, useRef } from 'react';
import * as anime from 'animejs';

const WaveLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = anime.default({
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

export default WaveLoader;
