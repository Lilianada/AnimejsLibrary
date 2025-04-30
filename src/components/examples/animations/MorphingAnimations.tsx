import { useRef, useEffect, useState } from 'react'
import { animate, createScope } from 'animejs'
import AnimationControls from './controls/AnimationControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeBlock from './CodeBlock'

const MorphingAnimations = () => {
  const animationRef = useRef<HTMLDivElement>(null)
  const scopeRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [progress, setProgress] = useState(0)
  const [codeVisible, setCodeVisible] = useState(false)

  // Define SVG paths
  const paths = [
    { d: 'M150 0 L75 200 L225 200 Z', fill: '#A78BFA' }, // Triangle
    { d: 'M50 50 H250 V250 H50 Z', fill: '#F59E0B' }, // Square
    { d: 'M150 50 L200 150 L100 150 Z', fill: '#EC4899' } // Different Triangle
  ]

  useEffect(() => {
    if (animationRef.current) {
      const target = animationRef.current.querySelector('.morphing-target path') as SVGPathElement | null
      if (!target) return

      scopeRef.current = createScope({ root: animationRef.current }).add((scope) => {
        const animationInstance = animate(
          target,
          {
            d: paths.map(p => p.d),
            fill: paths.map(p => p.fill),
            easing: 'easeInOutQuad',
            duration: 1500,
            loop: true,
            direction: 'alternate',
            autoplay: false,
            update: (anim) => {
              setProgress(Math.round(anim.progress))
            }
          }
        )

        scope.add('play', () => { animationInstance.play() })
        scope.add('pause', () => { animationInstance.pause() })
        scope.add('restart', () => { animationInstance.restart() })
        scope.add('setSpeed', (newSpeed: number) => {
          if (animationInstance && typeof (animationInstance as any).speed !== 'undefined') {
            (animationInstance as any).speed = newSpeed
          }
          return undefined
        })
      })

      return () => {
        if (scopeRef.current && typeof scopeRef.current.revert === 'function') {
          scopeRef.current.revert()
        }
      }
    }
  }, [])

  useEffect(() => {
    if (scopeRef.current?.methods) {
      isPlaying ? scopeRef.current.methods.play() : scopeRef.current.methods.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (scopeRef.current?.methods) {
      scopeRef.current.methods.setSpeed(speed)
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

const MorphingAnimation = () => {
  const svgRef = useRef(null)
  
  const paths = [
    { d: 'M150 0 L75 200 L225 200 Z' },
    { d: 'M50 50 H250 V250 H50 Z' },
    { d: 'M150 50 L200 150 L100 150 Z' }
  ]
  
  useEffect(() => {
    if (svgRef.current) {
      const scope = createScope({ root: svgRef.current }).add(scope => {
        animate('path', {
          d: paths.map(p => p.d),
          easing: 'easeInOutQuad',
          duration: 1500,
          loop: true,
          direction: 'alternate'
        })
      })
      
      return () => scope.revert()
    }
  }, [])
  
  return (
    <svg ref={svgRef} viewBox="0 0 300 300">
      <path fill="blue" d={paths[0].d} />
    </svg>
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
        <div className="mb-6 p-6 bg-muted rounded-lg flex items-center justify-center min-h-[250px]" ref={animationRef}>
          <svg className="morphing-target w-48 h-48" viewBox="0 0 300 300">
            <path fill={paths[0].fill} d={paths[0].d} />
          </svg>
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

export default MorphingAnimations
