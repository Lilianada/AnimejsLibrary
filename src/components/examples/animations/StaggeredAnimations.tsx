import { useRef, useEffect, useState } from 'react'
import { animate, stagger } from 'animejs'
import AnimationControls from './controls/AnimationControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeBlock from './CodeBlock'

const StaggeredAnimations = () => {
  const animationRef = useRef<HTMLDivElement>(null)
  const animationInstanceRef = useRef<ReturnType<typeof animate> | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [progress, setProgress] = useState(0)
  const [codeVisible, setCodeVisible] = useState(false)

  useEffect(() => {
    const targets = animationRef.current?.querySelectorAll('.stagger-target')
    if (targets && targets.length > 0) {
      animationInstanceRef.current = animate(
        targets,
        {
          translateY: [-20, 0],
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 600,
          delay: stagger(100, { easing: 'easeOutQuad' }),
          autoplay: false,
          loop: true,
          direction: 'alternate',
          update: (anim) => {
            setProgress(Math.round(anim.progress))
          }
        }
      )
    }
    return () => {
      if (animationInstanceRef.current && typeof animationInstanceRef.current.pause === 'function') {
        animationInstanceRef.current.pause()
      }
    }
  }, [])

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

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  const handleRestart = () => {
    if (animationInstanceRef.current) {
      animationInstanceRef.current.restart()
      setIsPlaying(true)
    }
  }

  const codeExample = `
import { useRef, useEffect } from 'react'
import { animate, stagger } from 'animejs'

const StaggeredAnimation = () => {
  const containerRef = useRef(null)
  
  useEffect(() => {
    const targets = containerRef.current?.querySelectorAll('.stagger-target')
    if (!targets || targets.length === 0) return;

    const animation = animate(
      targets,
      {
        translateY: [-20, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 600,
        delay: stagger(100, { easing: 'easeOutQuad' }),
        loop: true,
        direction: 'alternate'
      }
    );
    
    animation.play(); // Autoplay example

    return () => animation.pause();
  }, [])
  
  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-4">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="stagger-target h-12 w-12 bg-blue-500"></div>
      ))}
    </div>
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
          progress={progress}
        />
        
        {codeVisible && <CodeBlock code={codeExample} />}
      </CardContent>
    </Card>
  )
}

export default StaggeredAnimations
