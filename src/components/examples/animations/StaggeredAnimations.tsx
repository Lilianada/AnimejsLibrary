import { useRef, useEffect, useState } from 'react'
// import { animate, stagger } from 'animejs' // Remove static import
import AnimationControls from './controls/AnimationControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeBlock from './CodeBlock'

// Type for the dynamically loaded animejs module
type AnimeType = any;

const StaggeredAnimations = () => {
  const animationRef = useRef<HTMLDivElement>(null)
  const animationInstanceRef = useRef<any | null>(null) // Use any for instance type
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [progress, setProgress] = useState(0) // Keep progress state for now
  const [codeVisible, setCodeVisible] = useState(false)
  const [anime, setAnime] = useState<AnimeType>(null); // State for loaded anime

  // Load animejs dynamically
  useEffect(() => {
    import('animejs').then(module => {
      setAnime(() => module); // Use the module itself
    }).catch(err => console.error("Failed to load animejs:", err));
  }, []);

  // Setup animation only after animejs is loaded
  useEffect(() => {
    // Wait for anime and required functions
    if (!anime || !animationRef.current || !anime.animate || !anime.stagger) return;

    const targets = animationRef.current?.querySelectorAll('.stagger-target')
    if (targets && targets.length > 0) {
      animationInstanceRef.current = anime.animate(
        targets,
        {
          translateY: [-20, 0],
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 600,
          delay: anime.stagger(100, { easing: 'easeOutQuad' }),
          autoplay: false,
          loop: true,
          direction: 'alternate',
          update: (anim) => {
            setProgress(Math.round(anim.progress))
          }
        }
      )
    }
    // Keep cleanup logic using animationInstanceRef
    return () => {
      if (animationInstanceRef.current && typeof animationInstanceRef.current.pause === 'function') {
        animationInstanceRef.current.pause()
        // Optional: Consider anime.remove(targets) if anime.remove exists and is reliable
      }
      animationInstanceRef.current = null; // Clear ref on cleanup
    }
  }, [anime]); // Depend on loaded anime

  // Control logic remains the same (uses animationInstanceRef)
  useEffect(() => {
    if (animationInstanceRef.current) {
      isPlaying ? animationInstanceRef.current.play() : animationInstanceRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (animationInstanceRef.current) {
      (animationInstanceRef.current as any).speed = speed
    }
  }, [speed])

  // Handlers remain the same
  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  const handleRestart = () => {
    if (animationInstanceRef.current) {
      animationInstanceRef.current.restart()
      setIsPlaying(true)
    }
  }

  // Update Code Example String
  const codeExample = `
import { useRef, useEffect, useState } from 'react'

const StaggeredAnimation = () => {
  const containerRef = useRef(null)
  const animationInstanceRef = useRef(null);
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    import('animejs').then(module => setAnime(() => module));
  }, []);
  
  useEffect(() => {
    if (!anime || !containerRef.current || !anime.animate || !anime.stagger) return;

    const targets = containerRef.current?.querySelectorAll('.stagger-target')
    if (!targets || targets.length === 0) return;

    animationInstanceRef.current = anime.animate(
      targets,
      {
        translateY: [-20, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 600,
        delay: anime.stagger(100, { easing: 'easeOutQuad' }),
        loop: true,
        direction: 'alternate',
        autoplay: true // Autoplay in example
      }
    );

    return () => {
      if (animationInstanceRef.current && typeof animationInstanceRef.current.pause === 'function') {
         animationInstanceRef.current.pause();
      }
      animationInstanceRef.current = null;
    };
  }, [anime])
  
  return (
    // ... JSX ...
  )
}
`

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Staggered Animations</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCodeVisible(!codeVisible)}
          >
            {codeVisible ? 'Hide Code' : 'View Code'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-6 bg-muted rounded-lg flex items-center justify-center min-h-[200px]" ref={animationRef}>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="stagger-target h-10 w-10 bg-accent rounded-md opacity-0"></div>
            ))}
          </div>
        </div>
        
        <AnimationControls 
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onRestart={handleRestart}
          speed={speed}
          onSpeedChange={setSpeed}
          // progress={progress} // Remove this prop
        />
        
        {codeVisible && <CodeBlock code={codeExample} />}
      </CardContent>
    </Card>
  )
}

export default StaggeredAnimations
