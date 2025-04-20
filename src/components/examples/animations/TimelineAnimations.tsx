
import { useRef, useEffect, useState } from 'react'
import { animate, createTimeline } from 'animejs'
import AnimationControls from './controls/AnimationControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeBlock from './CodeBlock'

const TimelineAnimations = () => {
  const animationRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [codeVisible, setCodeVisible] = useState(false)

  useEffect(() => {
    if (animationRef.current) {
      // Compose a timeline using the newer anime API
      timelineRef.current = createTimeline({
        autoplay: false,
        loop: true,
      })
        .add({
          targets: animationRef.current.querySelector('.box-1'),
          translateY: -50,
          backgroundColor: '#A78BFA',
          borderRadius: ['0%', '50%'],
          easing: 'easeOutElastic(1, .8)',
        })
        .add({
          targets: animationRef.current.querySelector('.box-2'),
          translateX: 50,
          backgroundColor: '#F59E0B',
          rotate: 180,
          easing: 'easeOutElastic(1, .8)',
        })
        .add({
          targets: animationRef.current.querySelector('.box-3'),
          scale: 1.5,
          backgroundColor: '#EC4899',
          easing: 'easeOutElastic(1, .8)',
        })
        .add({
          targets: [
            animationRef.current.querySelector('.box-1'),
            animationRef.current.querySelector('.box-2'),
            animationRef.current.querySelector('.box-3'),
          ],
          translateY: 0,
          translateX: 0,
          backgroundColor: '#3B82F6',
          borderRadius: '0%',
          rotate: 0,
          scale: 1,
          delay: (el, i) => i * 100,
          easing: 'easeOutElastic(1, .8)',
        })

      return () => {
        if (timelineRef.current?.pause) {
          timelineRef.current.pause()
        }
      }
    }
  }, [])

  useEffect(() => {
    if (timelineRef.current) {
      if (isPlaying && timelineRef.current.play) {
        timelineRef.current.play()
      } else if (timelineRef.current.pause) {
        timelineRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (timelineRef.current && typeof timelineRef.current.speed !== 'undefined') {
      timelineRef.current.speed = speed
    }
  }, [speed])

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  const handleRestart = () => {
    if (timelineRef.current) {
      if (timelineRef.current.restart) timelineRef.current.restart()
      setIsPlaying(true)
    }
  }

  const codeExample = `
import { useRef, useEffect } from 'react'
import { createTimeline } from 'animejs'

const TimelineAnimation = () => {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (containerRef.current) {
      const timeline = createTimeline({
        duration: 800,
        autoplay: false,
        loop: true
      })
        .add({
          targets: containerRef.current.querySelector('.box-1'),
          translateY: -50,
          backgroundColor: '#A78BFA',
          borderRadius: ['0%', '50%'],
          easing: 'easeOutElastic(1, .8)'
        })
        .add({
          targets: containerRef.current.querySelector('.box-2'),
          translateX: 50,
          backgroundColor: '#F59E0B',
          rotate: 180,
          easing: 'easeOutElastic(1, .8)'
        })
        .add({
          targets: containerRef.current.querySelector('.box-3'),
          scale: 1.5,
          backgroundColor: '#EC4899',
          easing: 'easeOutElastic(1, .8)'
        })
        .add({
          targets: [
            containerRef.current.querySelector('.box-1'),
            containerRef.current.querySelector('.box-2'),
            containerRef.current.querySelector('.box-3'),
          ],
          translateY: 0,
          translateX: 0,
          backgroundColor: '#3B82F6',
          borderRadius: '0%',
          rotate: 0,
          scale: 1,
          delay: (el, i) => i * 100,
          easing: 'easeOutElastic(1, .8)'
        })
    }
  }, [])
  
  return (
    <div ref={containerRef} className="flex gap-4">
      <div className="box-1 h-16 w-16 bg-blue-500"></div>
      <div className="box-2 h-16 w-16 bg-blue-500"></div>
      <div className="box-3 h-16 w-16 bg-blue-500"></div>
    </div>
  )
}
`

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
            {codeVisible ? 'Hide Code' : 'View Code'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-6 bg-muted rounded-lg flex items-center justify-center min-h-[200px]" ref={animationRef}>
          <div className="flex gap-8">
            <div className="box-1 h-16 w-16 bg-primary flex items-center justify-center text-primary-foreground font-medium">
              1
            </div>
            <div className="box-2 h-16 w-16 bg-primary flex items-center justify-center text-primary-foreground font-medium">
              2
            </div>
            <div className="box-3 h-16 w-16 bg-primary flex items-center justify-center text-primary-foreground font-medium">
              3
            </div>
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

export default TimelineAnimations

