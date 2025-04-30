import { useRef, useEffect, useState } from 'react';
// import { createDraggable, createSpring } from 'animejs'; // Remove static import
import { CodeToggle } from './CodeToggle';
import { Move } from 'lucide-react';

// Type for the dynamically loaded animejs module
type AnimeType = any;

// --- Draggable Components ---\n

const SimpleDraggable = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [anime, setAnime] = useState<AnimeType>(null);

  // Load animejs dynamically
  useEffect(() => {
    import('animejs').then(module => {
      setAnime(() => module.default);
    }).catch(err => console.error("Failed to load animejs:", err));
  }, []);

  // Setup draggable only after animejs is loaded
  useEffect(() => {
    if (!anime || !targetRef.current || !anime.createDraggable) return;
    const drag = anime.createDraggable(targetRef.current);
    return () => drag.revert(); // Cleanup
  }, [anime]); // Depend on loaded anime

  return (
    <div ref={targetRef} className="w-24 h-24 bg-primary rounded-lg shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing">
      <span className="text-primary-foreground"><Move size={32} /></span>
    </div>
  );
};

const SpringDraggable = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [anime, setAnime] = useState<AnimeType>(null);

  // Load animejs dynamically
  useEffect(() => {
    import('animejs').then(module => {
      setAnime(() => module.default);
    }).catch(err => console.error("Failed to load animejs:", err));
  }, []);

  // Setup draggable only after animejs is loaded
  useEffect(() => {
    if (!anime || !targetRef.current || !anime.createDraggable || !anime.createSpring) return;
    const drag = anime.createDraggable(targetRef.current, {
      releaseEase: anime.createSpring({
        stiffness: 180,
        damping: 12,
        mass: 1.2
      })
    });
    return () => drag.revert();
  }, [anime]); // Depend on loaded anime

  return (
    <div ref={targetRef} className="w-24 h-24 bg-secondary rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing">
      <span className="text-secondary-foreground"><Move size={32} /></span>
    </div>
  );
};

const SnapDraggable = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const snapPoints = [-100, 0, 100];
  const [anime, setAnime] = useState<AnimeType>(null);

  // Load animejs dynamically
  useEffect(() => {
    import('animejs').then(module => {
      setAnime(() => module.default);
    }).catch(err => console.error("Failed to load animejs:", err));
  }, []);

  // Setup draggable only after animejs is loaded
  useEffect(() => {
    if (!anime || !targetRef.current || !anime.createDraggable) return;
    const drag = anime.createDraggable(targetRef.current, {
      x: { snap: snapPoints },
      y: { snap: snapPoints },
      releaseEase: 'outExpo' // Smoother snap
    });
    return () => drag.revert();
  }, [anime]); // Depend on loaded anime

  return (
    <div className="relative w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
      {/* Visual guides for snap points (optional) */}
      {[...Array(9)].map((_, i) => (
        <div key={i} className="absolute w-2 h-2 bg-muted-foreground/30 rounded-full" style={{ left: `${50 + snapPoints[i % 3] / 2}%`, top: `${50 + snapPoints[Math.floor(i / 3)] / 2}%`, transform: 'translate(-50%, -50%)' }}></div>
      ))}
      <div ref={targetRef} className="absolute w-20 h-20 bg-accent rounded-lg shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing">
        <span className="text-accent-foreground"><Move size={24} /></span>
      </div>
    </div>
  );
};

// --- Data Array ---\n
const DRAGGABLE_EXAMPLES = [
  {
    label: 'Simple Drag',
    description: 'Basic draggable element with default settings.',
    component: <SimpleDraggable />,
    code: `import { useRef, useEffect, useState } from 'react';

const SimpleDraggable = () => {
  const targetRef = useRef(null);
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    import('animejs').then(module => setAnime(() => module.default));
  }, []);

  useEffect(() => {
    if (!anime || !targetRef.current || !anime.createDraggable) return;
    const drag = anime.createDraggable(targetRef.current);
    return () => drag.revert();
  }, [anime]);

  return <div ref={targetRef} className="cursor-grab ...">Drag Me</div>;
};`
  },
  {
    label: 'Spring Release',
    description: 'Element snaps back with spring physics on release.',
    component: <SpringDraggable />,
    code: `import { useRef, useEffect, useState } from 'react';

const SpringDraggable = () => {
  const targetRef = useRef(null);
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    import('animejs').then(module => setAnime(() => module.default));
  }, []);

  useEffect(() => {
    if (!anime || !targetRef.current || !anime.createDraggable || !anime.createSpring) return;
    const drag = anime.createDraggable(targetRef.current, {
      releaseEase: anime.createSpring({
        stiffness: 180,
        damping: 12,
        mass: 1.2
      })
    });
    return () => drag.revert();
  }, [anime]);

  return <div ref={targetRef} className="cursor-grab ...">Spring</div>;
};`
  },
  {
    label: 'Snap to Grid',
    description: 'Element snaps to predefined points when released.',
    component: <SnapDraggable />,
    code: `import { useRef, useEffect, useState } from 'react';

const SnapDraggable = () => {
  const targetRef = useRef(null);
  const snapPoints = [-100, 0, 100];
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    import('animejs').then(module => setAnime(() => module.default));
  }, []);

  useEffect(() => {
    if (!anime || !targetRef.current || !anime.createDraggable) return;
    const drag = anime.createDraggable(targetRef.current, {
      x: { snap: snapPoints },
      y: { snap: snapPoints },
      releaseEase: 'outExpo'
    });
    return () => drag.revert();
  }, [anime]);

  return <div className="relative ..."><div ref={targetRef} className="absolute cursor-grab ...">Snap</div></div>;
};`
  },
];

// --- Main Component ---\n
const DraggableExamples = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Draggable Examples</h2>
        <p className="text-muted-foreground">
          Interactive draggable elements using Anime.js.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"> { /* Increased gap */ }
        {DRAGGABLE_EXAMPLES.map((example) => (
          <CodeToggle
            key={example.label}
            previewContent={
              <div className="space-y-4 p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold mb-1">{example.label}</h3>
                  <p className="text-sm text-muted-foreground">{example.description}</p>
                </div>
                <div className="flex justify-center items-center min-h-[200px] py-8"> { /* Added padding */ }
                  {example.component}
                </div>
              </div>
            }
            codeContent={example.code}
            className="w-full h-full"
          />
        ))}
      </div>
    </div>
  );
};

export default DraggableExamples; 