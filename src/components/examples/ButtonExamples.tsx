
import { useRef, useEffect } from 'react'
import anime from 'animejs'
import { Code, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ButtonExamples = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      const animation = anime({
        targets: buttonRef.current,
        scale: [1, 1.1],
        duration: 200,
        easing: 'easeInOutQuad',
        autoplay: false
      })

      const handleMouseEnter = () => animation.play()
      const handleMouseLeave = () => {
        animation.reverse()
        animation.play()
      }

      buttonRef.current.addEventListener('mouseenter', handleMouseEnter)
      buttonRef.current.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        if (buttonRef.current) {
          buttonRef.current.removeEventListener('mouseenter', handleMouseEnter)
          buttonRef.current.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }
  }, [])

  return (
    <div className="space-y-8">
      <div className="p-6 bg-secondary/10 rounded-lg">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Scale on Hover</h3>
          <div className="space-x-2">
            <Button variant="ghost" size="icon">
              <Code className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 bg-background rounded-md">
          <Button ref={buttonRef}>
            Hover Me
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ButtonExamples
