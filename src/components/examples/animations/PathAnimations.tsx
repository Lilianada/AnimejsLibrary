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
  const [progress, setProgress] = useState(0)
  const [codeVisible, setCodeVisible] = useState(false)

  useEffect(() => {
    if (animationRef.current) {
      const path = animationRef.current.querySelector('#svgPath path') as SVGPathElement | null;
      if (!path) return;

      scopeRef.current = createScope({ root: animationRef.current }).add((scope) => {
        const animationInstance = animate(
          '.path-target',
          {
            translateX: anime.path(path, 'x'),
            translateY: anime.path(path, 'y'),
            rotate: anime.path(path, 'angle'),
            easing: 'linear',
            duration: 4000,
            loop: true,
            autoplay: false,
            update: (anim) => {
              setProgress(Math.round(anim.progress));
            }
          }
        );

        scope.add('play', () => { animationInstance.play(); });
        scope.add('pause', () => { animationInstance.pause(); });
        scope.add('restart', () => { animationInstance.restart(); });
        scope.add('setSpeed', (newSpeed: number) => {
          if (animationInstance && typeof (animationInstance as any).speed !== 'undefined') {
             (animationInstance as any).speed = newSpeed;
          }
          return undefined;
        });
      });

      return () => {
        if (scopeRef.current && typeof scopeRef.current.revert === 'function') {
          scopeRef.current.revert();
        }
      };
    }
  }, [])

  useEffect(() => {
    if (scopeRef.current?.methods) {
      isPlaying ? scopeRef.current.methods.play() : scopeRef.current.methods.pause();
    }
  }, [isPlaying])

  useEffect(() => {
     if (scopeRef.current?.methods) {
       scopeRef.current.methods.setSpeed(speed);
    }
  }, [speed])

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  const handleRestart = () => {
    if (scopeRef.current?.methods) {
      scopeRef.current.methods.restart()
      setIsPlaying(true)
    }
  }

  const codeExample = `
import { useRef, useEffect } from 'react'
import { animate, createScope } from 'animejs'

const PathAnimation = () => {
  const elementRef = useRef(null)
  
  useEffect(() => {
    if (elementRef.current) {
      const path = elementRef.current.querySelector('#svgPath path');
      if (!path) return;

      const scope = createScope({ root: elementRef.current }).add(scope => {
        animate('.path-target', {
          translateX: anime.path(path, 'x'),
          translateY: anime.path(path, 'y'),
          rotate: anime.path(path, 'angle'),
          easing: 'linear',
          duration: 4000,
          loop: true
        })
      })
      
      return () => scope.revert()
    }
  }, [])
  
  return (
    <div ref={elementRef} style={{ position: 'relative', height: '150px' }}>
      <svg id="svgPath" width="100%" height="100" viewBox="0 0 200 100" style={{ position: 'absolute' }}>
        <path d="M 10 80 Q 50 10, 100 80 T 190 80" stroke="rgba(255,255,255,0.2)" fill="none" />
      </svg>
      <div className="path-target absolute h-6 w-6 rounded-full bg-primary shadow-lg">
        {/* You can put an icon inside */}
      </div>
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
        <div className="mb-6 p-6 bg-muted rounded-lg flex items-center justify-center min-h-[200px] relative" ref={animationRef}>
          <svg id="svgPath" width="90%" height="100" viewBox="0 0 200 100" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <path d="M 10 80 Q 50 10, 100 80 T 190 80" stroke="hsl(var(--border))" strokeWidth="1" fill="none" />
          </svg>
          <div className="path-target absolute h-6 w-6 rounded-full bg-primary shadow-lg">
            {/* You can put an icon inside */}
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

export default PathAnimations
