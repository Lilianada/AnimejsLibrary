
import { useRef, useEffect, useState } from 'react'
import * as anime from 'animejs'
import AnimationControls from './controls/AnimationControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeBlock from './CodeBlock'

const MorphingAnimations = () => {
  const animationRef = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [codeVisible, setCodeVisible] = useState(false)

  // SVG paths for different shapes
  const paths = {
    circle: 'M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0',
    square: 'M10,10 h80 v80 h-80 Z',
    triangle: 'M50,10 L90,90 L10,90 Z',
    star: 'M50,10 L61,39 L92,40 L69,61 L76,90 L50,76 L24,90 L31,61 L8,40 L39,39 Z'
  }

  useEffect(() => {
    if (animationRef.current) {
      scopeRef.current = anime.createScope({ root: animationRef.current }).add((scope) => {
        const morphAnimation = anime.animate('path', {
          d: [
            { value: paths.circle, duration: 0 },
            { value: paths.square, duration: 1000, easing: 'easeInOutQuad' },
            { value: paths.triangle, duration: 1000, easing: 'easeInOutQuad' },
            { value: paths.star, duration: 1000, easing: 'easeInOutQuad' },
            { value: paths.circle, duration: 1000, easing: 'easeInOutQuad' }
          ],
          fill: [
            { value: '#3B82F6', duration: 0 },
            { value: '#A78BFA', duration: 1000 },
            { value: '#F59E0B', duration: 1000 },
            { value: '#EC4899', duration: 1000 },
            { value: '#3B82F6', duration: 1000 }
          ],
          autoplay: false,
          loop: true
        })
        
        scope.add('play', () => { morphAnimation.play(); })
        scope.add('pause', () => { morphAnimation.pause(); })
        scope.add('restart', () => { morphAnimation.restart(); })
        scope.add('setSpeed', (speed: number) => { 
          morphAnimation.speed = speed;
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
import * as anime from 'animejs'

const MorphingAnimation = () => {
  const containerRef = useRef(null)
  
  // SVG paths for different shapes
  const paths = {
    circle: 'M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0',
    square: 'M10,10 h80 v80 h-80 Z',
    triangle: 'M50,10 L90,90 L10,90 Z',
    star: 'M50,10 L61,39 L92,40 L69,61 L76,90 L50,76 L24,90 L31,61 L8,40 L39,39 Z'
  }
  
  useEffect(() => {
    if (containerRef.current) {
      const scope = anime.createScope({ root: containerRef.current }).add(scope => {
        anime.animate('path', {
          d: [
            { value: paths.circle, duration: 0 },
            { value: paths.square, duration: 1000, easing: 'easeInOutQuad' },
            { value: paths.triangle, duration: 1000, easing: 'easeInOutQuad' },
            { value: paths.star, duration: 1000, easing: 'easeInOutQuad' },
            { value: paths.circle, duration: 1000, easing: 'easeInOutQuad' }
          ],
          fill: [
            { value: '#3B82F6', duration: 0 },
            { value: '#A78BFA', duration: 1000 },
            { value: '#F59E0B', duration: 1000 },
            { value: '#EC4899', duration: 1000 },
            { value: '#3B82F6', duration: 1000 }
          ],
          loop: true
        })
      })
      
      return () => scope.revert()
    }
  }, [])
  
  return (
    <div ref={containerRef}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path fill="#3B82F6" d={paths.circle} />
      </svg>
    </div>
  )
}
`

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Morphing Animations</span>
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
          <svg width="150" height="150" viewBox="0 0 100 100">
            <path fill="#3B82F6" d={paths.circle} />
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

export default MorphingAnimations
