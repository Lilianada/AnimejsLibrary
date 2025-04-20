
import { useRef, useEffect } from 'react'
import ModalAnimations from './animations/modals/ModalAnimations'

const ModalsExamples = () => {
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
        <h2 className="text-2xl font-bold mb-3">Modal & Dialog Animations</h2>
        <p className="text-muted-foreground">
          Explore different types of modals and dialogs with various entrance and exit animations.
          Each example includes interactive controls and sample code.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="animation-card">
          <ModalAnimations />
        </div>
      </div>
    </div>
  )
}

export default ModalsExamples
