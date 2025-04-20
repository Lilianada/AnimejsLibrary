
import { useRef, useEffect } from 'react'
import LoaderAnimations from './animations/loaders/LoaderAnimations'

const LoadersExamples = () => {
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
        <h2 className="text-2xl font-bold mb-3">Loaders & Spinners</h2>
        <p className="text-muted-foreground">
          Explore different loading indicators, spinners, and progress animations that provide 
          visual feedback during asynchronous operations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="animation-card">
          <LoaderAnimations />
        </div>
      </div>
    </div>
  )
}

export default LoadersExamples
