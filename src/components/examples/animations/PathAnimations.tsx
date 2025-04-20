
import { useRef, useEffect, useState } from 'react'
import { animate, createScope } from 'animejs'
import AnimationControls from './controls/AnimationControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeBlock from './CodeBlock'

const PathAnimations = () => {
  const animationRef = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [codeVisible, setCodeVisible] = useState(false)

  useEffect(() => {
    if (animationRef.current) {
      scopeRef.current = createScope({ root: animationRef.current }).add((scope) => {
        // Set up path and get its length
        const path = document.querySelector('path');
        const pathLength = path ? path.getTotalLength() : 0;
        
        // Set initial dasharray and dashoffset
        if (path) {
          path.style.strokeDasharray = pathLength + 'px';
          path.style.strokeDashoffset = pathLength + 'px';
        }
        
        // Animate the path drawing
        const pathAnimation = animate('path', {
          strokeDashoffset: [
            { value: pathLength, duration: 0 },
            { value: 0, duration: 1500, easing: 'easeInOutSine' }
          ],
          autoplay: false,
          loop: true
        })
        
        // Create follower points array for tracking
        const followerPoints: { x: number, y: number }[] = [];
        const steps = 100;
        
        // Pre-calculate points along the path
        for (let i = 0; i <= steps; i++) {
          const point = path ? path.getPointAtLength((i / steps) * pathLength) : { x: 0, y: 0 };
          followerPoints.push(point);
        }
        
        // Animate the small circle moving along the path
        const followerAnimation = animate('.path-follower', {
          translateX: [
            { value: function() { return followerPoints[0].x; }, duration: 0 },
            { value: function() { 
              return followerPoints.map(p => p.x);
            }, duration: 3000, easing: 'linear' }
          ],
          translateY: [
            { value: function() { return followerPoints[0].y; }, duration: 0 },
            { value: function() { 
              return followerPoints.map(p => p.y);
            }, duration: 3000, easing: 'linear' }
          ],
          autoplay: false,
          loop: true
        })
        
        scope.add('play', () => { 
          pathAnimation.play();
          followerAnimation.play();
        })
        
        scope.add('pause', () => {
          pathAnimation.pause();
          followerAnimation.pause();
        })
        
        scope.add('restart', () => {
          pathAnimation.restart();
          followerAnimation.restart();
        })
        
        scope.add('setSpeed', (speed: number) => {
          pathAnimation.speed = speed;
          followerAnimation.speed = speed;
          return undefined;
        })
      })

      return () => {
        if (scopeRef.current) {
          scopeRef.current.revert()
        }
      }
    }
  }, [])

  useEffect(() => {
    if (scopeRef.current) {
      if (isPlaying) {
        scopeRef.current.methods.play()
      } else {
        scopeRef.current.methods.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (scopeRef.current) {
      scopeRef.current.methods.setSpeed(speed)
    }
  }, [speed])

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  const handleRestart = () => {
    if (scopeRef.current) {
      scopeRef.current.methods.restart()
      setIsPlaying(true)
    }
  }

  const codeExample = `
import { useRef, useEffect } from 'react'
import { animate, createScope } from 'animejs'

const PathAnimation = () => {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (containerRef.current) {
      const scope = createScope({ root: containerRef.current }).add(scope => {
        // Set up path and get its length
        const path = document.querySelector('path');
        const pathLength = path ? path.getTotalLength() : 0;
        
        // Set initial dasharray and dashoffset
        if (path) {
          path.style.strokeDasharray = pathLength + 'px';
          path.style.strokeDashoffset = pathLength + 'px';
        }
        
        // Animate the path drawing
        animate('path', {
          strokeDashoffset: [
            { value: pathLength, duration: 0 },
            { value: 0, duration: 1500, easing: 'easeInOutSine' }
          ],
          loop: true
        })
        
        // Create follower points array for tracking
        const followerPoints = [];
        const steps = 100;
        
        // Pre-calculate points along the path
        for (let i = 0; i <= steps; i++) {
          const point = path ? path.getPointAtLength((i / steps) * pathLength) : { x: 0, y: 0 };
          followerPoints.push(point);
        }
        
        // Animate the small circle moving along the path
        animate('.path-follower', {
          translateX: [
            { value: function() { return followerPoints[0].x; }, duration: 0 },
            { value: function() { 
              return followerPoints.map(p => p.x);
            }, duration: 3000, easing: 'linear' }
          ],
          translateY: [
            { value: function() { return followerPoints[0].y; }, duration: 0 },
            { value: function() { 
              return followerPoints.map(p => p.y);
            }, duration: 3000, easing: 'linear' }
          ],
          loop: true
        })
      })
      
      return () => scope.revert()
    }
  }, [])
  
  return (
    <div ref={containerRef}>
      <svg width="300" height="200" viewBox="0 0 300 200">
        <path
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          d="M20,50 C20,-50 180,150 180,50 C180,-50 20,150 20,50 z"
        />
        <circle className="path-follower" r="5" fill="#EC4899" />
      </svg>
    </div>
  )
}
`

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Path Animations</span>
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
          <svg width="300" height="200" viewBox="0 0 300 200">
            <path
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="4"
              d="M20,50 C20,-50 180,150 180,50 C180,-50 20,150 20,50 z"
            />
            <circle className="path-follower" r="8" fill="hsl(var(--primary))" />
          </svg>
        </div>
        
        <AnimationControls 
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onRestart={handleRestart}
          speed={speed}
          onSpeedChange={setSpeed}
        />
        
        {codeVisible && <CodeBlock code={codeExample} />}
      </CardContent>
    </Card>
  )
}

export default PathAnimations
