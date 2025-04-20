
import { useRef, useEffect, useState } from 'react'
import { animate, createScope } from 'animejs'
import AnimationControls from './controls/AnimationControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeBlock from './CodeBlock'

const PropertyAnimations = () => {
  const animationRef = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [codeVisible, setCodeVisible] = useState(false)

  useEffect(() => {
    if (animationRef.current) {
      scopeRef.current = createScope({ root: animationRef.current }).add((scope) => {
        const animation = animate('.animation-target', {
          translateX: [
            { value: 0, duration: 0 },
            { value: 150, duration: 1000 },
            { value: 0, duration: 1000 }
          ],
          rotate: [
            { value: 0, duration: 0 },
            { value: 180, duration: 1000 },
            { value: 0, duration: 1000 }
          ],
          scale: [
            { value: 1, duration: 0 },
            { value: 1.5, duration: 500 },
            { value: 1, duration: 500 },
            { value: 1.5, duration: 500 },
            { value: 1, duration: 500 }
          ],
          easing: 'easeInOutQuad',
          autoplay: false,
          loop: true
        })

        scope.add('play', () => { animation.play(); })
        scope.add('pause', () => { animation.pause(); })
        scope.add('restart', () => { animation.restart(); })
        scope.add('setSpeed', (speed: number) => { 
          animation.speed = speed;
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

const PropertyAnimation = () => {
  const elementRef = useRef(null)
  
  useEffect(() => {
    if (elementRef.current) {
      const scope = createScope({ root: elementRef.current }).add(scope => {
        animate('.animation-target', {
          translateX: [
            { value: 0, duration: 0 },
            { value: 150, duration: 1000 },
            { value: 0, duration: 1000 }
          ],
          rotate: [
            { value: 0, duration: 0 },
            { value: 180, duration: 1000 },
            { value: 0, duration: 1000 }
          ],
          scale: [
            { value: 1, duration: 0 },
            { value: 1.5, duration: 500 },
            { value: 1, duration: 500 },
            { value: 1.5, duration: 500 },
            { value: 1, duration: 500 }
          ],
          easing: 'easeInOutQuad',
          loop: true
        })
      })
      
      return () => scope.revert()
    }
  }, [])
  
  return (
    <div ref={elementRef}>
      <div className="animation-target">Element to animate</div>
    </div>
  )
}
`

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Property Animations</span>
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
          <div className="animation-target h-16 w-16 bg-primary flex items-center justify-center rounded-md text-primary-foreground font-medium">
            Box
          </div>
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

export default PropertyAnimations
