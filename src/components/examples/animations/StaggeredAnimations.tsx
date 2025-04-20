
import { useRef, useEffect, useState } from 'react'
import * as anime from 'animejs'
import AnimationControls from './controls/AnimationControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeBlock from './CodeBlock'

const StaggeredAnimations = () => {
  const animationRef = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [codeVisible, setCodeVisible] = useState(false)
  const [staggerDelay, setStaggerDelay] = useState(100)

  useEffect(() => {
    if (animationRef.current) {
      scopeRef.current = anime.default.createScope({ root: animationRef.current }).add((scope) => {
        const setupAnimation = () => {
          return anime.default.animate('.stagger-item', {
            translateY: [
              { value: 0, duration: 0 },
              { value: -30, duration: 500 },
              { value: 0, duration: 500 }
            ],
            opacity: [
              { value: 0, duration: 0 },
              { value: 1, duration: 500 },
              { value: 1, duration: 500 },
              { value: 0, duration: 500 },
              { value: 0, duration: 500 }
            ],
            backgroundColor: [
              { value: '#3B82F6', duration: 0 },
              { value: '#A78BFA', duration: 500 },
              { value: '#F59E0B', duration: 500 },
              { value: '#3B82F6', duration: 500 }
            ],
            scale: [
              { value: 0.5, duration: 0 },
              { value: 1, duration: 500 },
              { value: 1, duration: 500 },
              { value: 0.5, duration: 500 }
            ],
            delay: anime.default.stagger(staggerDelay),
            easing: 'easeInOutQuad',
            loop: true,
            autoplay: false
          })
        }

        let animation = setupAnimation()
        
        scope.add('play', () => { animation.play(); })
        scope.add('pause', () => { animation.pause(); })
        scope.add('restart', () => {
          animation.pause();
          animation = setupAnimation();
          animation.play();
          return undefined;
        })
        scope.add('setSpeed', (speed: number) => { 
          animation.speed = speed;
          return undefined;
        })
        scope.add('updateStaggerDelay', (delay: number) => {
          animation.pause();
          animation = setupAnimation();
          if (isPlaying) {
            animation.play();
          }
          return undefined;
        })
      })

      return () => {
        if (scopeRef.current) {
          scopeRef.current.revert()
        }
      }
    }
  }, [staggerDelay, isPlaying])

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

  useEffect(() => {
    if (scopeRef.current) {
      scopeRef.current.methods.updateStaggerDelay(staggerDelay)
    }
  }, [staggerDelay])

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
import * as anime from 'animejs'

const StaggeredAnimation = () => {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (containerRef.current) {
      const scope = anime.default.createScope({ root: containerRef.current }).add(scope => {
        anime.default.animate('.stagger-item', {
          translateY: [
            { value: 0, duration: 0 },
            { value: -30, duration: 500 },
            { value: 0, duration: 500 }
          ],
          opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: 500 },
            { value: 1, duration: 500 },
            { value: 0, duration: 500 },
            { value: 0, duration: 500 }
          ],
          backgroundColor: [
            { value: '#3B82F6', duration: 0 },
            { value: '#A78BFA', duration: 500 },
            { value: '#F59E0B', duration: 500 },
            { value: '#3B82F6', duration: 500 }
          ],
          scale: [
            { value: 0.5, duration: 0 },
            { value: 1, duration: 500 },
            { value: 1, duration: 500 },
            { value: 0.5, duration: 500 }
          ],
          delay: anime.default.stagger(100), // 100ms between each element
          easing: 'easeInOutQuad',
          loop: true
        })
      })
      
      return () => scope.revert()
    }
  }, [])
  
  return (
    <div ref={containerRef} className="flex gap-2">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="stagger-item h-8 w-8 rounded-full bg-blue-500 opacity-0 scale-50" />
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
          <div className="flex gap-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="stagger-item h-10 w-10 rounded-full bg-primary opacity-0 scale-50 flex items-center justify-center text-primary-foreground font-bold">
                {i+1}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Stagger Delay: {staggerDelay}ms</label>
          <input 
            type="range" 
            min="25" 
            max="300" 
            step="25" 
            value={staggerDelay} 
            onChange={(e) => setStaggerDelay(Number(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
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

export default StaggeredAnimations
