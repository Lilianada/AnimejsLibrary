import { useRef, useEffect, useState } from "react";
import AnimationControls from "./controls/AnimationControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CodeBlock from "./CodeBlock";

// Type for the dynamically loaded animejs module
type AnimeType = any;

const TimelineAnimations = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<any | null>(null); // Use any for timeline type
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0); // Keep progress state
  const [codeVisible, setCodeVisible] = useState(false);
  const [anime, setAnime] = useState<AnimeType>(null); // State for loaded anime

  // Load animejs dynamically
  useEffect(() => {
    import("animejs")
      .then((module) => {
        setAnime(() => module); // Use the module itself
      })
      .catch((err) => console.error("Failed to load animejs:", err));
  }, []);

  // Setup timeline only after animejs is loaded
  useEffect(() => {
    // Wait for anime and required function
    if (!anime || !animationRef.current || !anime.createTimeline) return;

    const targets = animationRef.current?.querySelectorAll(".timeline-target");
    if (targets && targets.length > 0) {
      // Clear previous timeline if any
      if (
        timelineRef.current &&
        typeof timelineRef.current.pause === "function"
      ) {
        timelineRef.current.pause();
      }

      timelineRef.current = anime
        .createTimeline({
          autoplay: false,
          loop: true,
          update: (anim) => {
            setProgress(Math.round(anim.progress));
          },
        })
        .add(targets[0], {
          translateX: 100,
          easing: "easeOutExpo",
          duration: 500,
        })
        .add(
          targets[1],
          {
            translateX: 100,
            rotate: 180,
            easing: "easeOutExpo",
            duration: 500,
          },
          "-=300",
        )
        .add(
          targets[2],
          {
            translateX: 100,
            scale: 1.5,
            easing: "easeOutExpo",
            duration: 500,
          },
          "-=300",
        );
    }

    // Cleanup: Pause timeline on unmount or when anime changes
    return () => {
      if (
        timelineRef.current &&
        typeof timelineRef.current.pause === "function"
      ) {
        timelineRef.current.pause();
      }
      // No need to clear timelineRef here as the effect will recreate it if needed
    };
  }, [anime]); // Depend on loaded anime

  // Control logic remains the same (uses timelineRef)
  useEffect(() => {
    if (timelineRef.current) {
      if (isPlaying) {
        timelineRef.current.play();
      } else {
        timelineRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.speed = speed;
    }
  }, [speed]);

  // Handlers remain the same
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleRestart = () => {
    if (timelineRef.current) {
      timelineRef.current.restart();
      setIsPlaying(true);
    }
  };

  // Update Code Example String
  const codeExample = `
import { useRef, useEffect, useState } from 'react'

const TimelineAnimation = () => {
  const containerRef = useRef(null)
  const timelineRef = useRef(null);
  const [anime, setAnime] = useState<any>(null);

  useEffect(() => {
    import('animejs').then(module => setAnime(() => module));
  }, []);
  
  useEffect(() => {
    if (!anime || !containerRef.current || !anime.createTimeline) return;

    const targets = containerRef.current?.querySelectorAll('.timeline-target')
    if (!targets || targets.length === 0) return;

    timelineRef.current = anime.createTimeline({ loop: true })
      .add(targets[0], { translateX: 100, duration: 500 })
      .add(targets[1], { translateX: 100, rotate: 180, duration: 500 }, '-=300')
      .add(targets[2], { translateX: 100, scale: 1.5, duration: 500 }, '-=300')
      
    timelineRef.current.play(); // Example: Autoplay

    return () => {
       if (timelineRef.current && typeof timelineRef.current.pause === 'function') {
         timelineRef.current.pause();
       }
    };
  }, [anime])
  
  return (
    <div ref={containerRef}>
      <div className="timeline-target"> 1</div>
      <div className="timeline-target"> 2</div>
      <div className="timeline-target"> 3</div>
    </div>
  )
}
`;

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Timeline Animations</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCodeVisible(!codeVisible)}
          >
            {codeVisible ? "Hide Code" : "View Code"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="mb-6 p-6 bg-muted rounded-lg flex flex-col items-center justify-center space-y-4 min-h-[200px]"
          ref={animationRef}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="timeline-target h-10 w-10 bg-secondary flex items-center justify-center rounded-md text-secondary-foreground font-medium"
            >
              Box {i}
            </div>
          ))}
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
  );
};

export default TimelineAnimations;
