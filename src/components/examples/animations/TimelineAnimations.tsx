import { useRef, useEffect, useState } from 'react'
import { animate, createTimeline, stagger } from 'animejs'
import AnimationControls from './controls/AnimationControls'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeBlock from './CodeBlock'

const TimelineAnimations = () => {
  const animationRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<ReturnType<typeof createTimeline> | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [progress, setProgress] = useState(0)
  const [codeVisible, setCodeVisible] = useState(false)

  useEffect(() => {
    const targets = animationRef.current?.querySelectorAll('.timeline-target')
    if (targets && targets.length > 0) {
      if (timelineRef.current) {
        timelineRef.current.pause()
      }

      timelineRef.current = createTimeline({
        autoplay: false,
        loop: true,
        update: (anim) => {
          setProgress(Math.round(anim.progress))
        }
      })
      .add(
        targets[0],
        {
          translateX: 100,
          easing: 'easeOutExpo',
          duration: 500
        }
      )
      .add(
        targets[1],
        {
          translateX: 100,
          rotate: 180,
          easing: 'easeOutExpo',
          duration: 500
        },
        '-=300'
      )
      .add(
        targets[2],
        {
          translateX: 100,
          scale: 1.5,
          easing: 'easeOutExpo',
          duration: 500
        },
        '-=300'
      )
    }
  }, [])

  useEffect(() => {
    if (timelineRef.current) {
      if (isPlaying) {
        timelineRef.current.play()
      } else {
        timelineRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.speed = speed
    }
  }, [speed])

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  const handleRestart = () => {
    if (timelineRef.current) {
      timelineRef.current.restart()
      setIsPlaying(true)
    }
  }

  const codeExample = `
import { useRef, useEffect } from 'react'
import { createTimeline } from 'animejs'

const TimelineAnimation = () => {
  const containerRef = useRef(null)
  
  useEffect(() => {
    const targets = containerRef.current?.querySelectorAll('.timeline-target')
    if (!targets || targets.length === 0) return;

    const tl = createTimeline({ loop: true })
      .add(targets[0], { translateX: 100, duration: 500 })
      .add(targets[1], { translateX: 100, rotate: 180, duration: 500 }, '-=300')
      .add(targets[2], { translateX: 100, scale: 1.5, duration: 500 }, '-=300')
      
    tl.play(); // Example: Autoplay

    return () => tl.pause(); // Basic cleanup
  }, [])
  
  return (
    <div ref={containerRef}>
      <div className="timeline-target">Box 1</div>
      <div className="timeline-target">Box 2</div>
      <div className="timeline-target">Box 3</div>
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
        <div className="mb-6 p-6 bg-muted rounded-lg flex flex-col items-center justify-center space-y-4 min-h-[200px]" ref={animationRef}>
          {[1, 2, 3].map(i => (
             <div key={i} className="timeline-target h-10 w-10 bg-secondary flex items-center justify-center rounded-md text-secondary-foreground font-medium">
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
          progress={progress}
        />
        
        {codeVisible && <CodeBlock code={codeExample} />}
      </CardContent>
    </Card>
  )
}

export default TimelineAnimations
