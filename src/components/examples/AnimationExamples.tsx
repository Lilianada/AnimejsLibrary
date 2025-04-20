
import { useRef, useEffect } from 'react'
import PropertyAnimations from './animations/PropertyAnimations'
import TimelineAnimations from './animations/TimelineAnimations'
import StaggeredAnimations from './animations/StaggeredAnimations'
import PathAnimations from './animations/PathAnimations'
import MorphingAnimations from './animations/MorphingAnimations'
import CardAnimations from './animations/cards/CardAnimations'

const AnimationExamples = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animateElements = () => {
      const cards = containerRef.current?.querySelectorAll('.animation-card')
      
      cards?.forEach((card, index) => {
        const element = card as HTMLElement
        element.style.opacity = '0'
        element.style.transform = 'translateY(20px)'
        
        setTimeout(() => {
          element.style.transition = 'opacity 600ms ease-out, transform 600ms ease-out'
          element.style.opacity = '1'
          element.style.transform = 'translateY(0)'
        }, index * 100)
      })
    }
    
    animateElements()
  }, [])

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Animation Examples</h2>
        <p className="text-muted-foreground">
          Explore these animation techniques using Anime.js within React. 
          Each example includes interactive controls and code samples.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animation-card">
          <PropertyAnimations />
        </div>
        
        <div className="animation-card">
          <TimelineAnimations />
        </div>
        
        <div className="animation-card">
          <StaggeredAnimations />
        </div>
        
        <div className="animation-card">
          <PathAnimations />
        </div>
        
        <div className="animation-card lg:col-span-2">
          <MorphingAnimations />
        </div>

        <div className="animation-card lg:col-span-2">
          <CardAnimations />
        </div>
      </div>
    </div>
  )
}

export default AnimationExamples
