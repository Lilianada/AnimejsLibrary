
import { useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PropertyAnimations from './animations/PropertyAnimations'
import TimelineAnimations from './animations/TimelineAnimations'
import StaggeredAnimations from './animations/StaggeredAnimations'
import PathAnimations from './animations/PathAnimations'
import MorphingAnimations from './animations/MorphingAnimations'

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
      </div>
      
      <Card className="animation-card border-border shadow-lg">
        <CardHeader>
          <CardTitle>Animation Performance Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-bold mb-2">1. Use GPU-accelerated properties</h3>
            <p className="text-muted-foreground">
              Properties like transform and opacity are GPU-accelerated and perform better than properties that trigger layout.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">2. Manage animation lifecycles</h3>
            <p className="text-muted-foreground">
              Always clean up animations when components unmount using the revert() method on Anime.js scopes.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">3. Consider reduced motion</h3>
            <p className="text-muted-foreground">
              Provide alternatives for users who prefer reduced motion by checking the prefers-reduced-motion media query.
            </p>
            <pre className="bg-muted p-3 rounded-md mt-2 text-sm">
              <code>{`if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Provide alternative or simplified animations
}`}</code>
            </pre>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">4. Profile and optimize</h3>
            <p className="text-muted-foreground">
              Use browser developer tools to profile animation performance and identify bottlenecks.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnimationExamples
