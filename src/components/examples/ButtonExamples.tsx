
import { useRef, useEffect } from 'react'
import { animate, createScope } from 'animejs'
import { Code, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ButtonExamples = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const scope = useRef<any>(null)

  useEffect(() => {
    if (buttonRef.current) {
      scope.current = createScope({ root: buttonRef.current }).add(scope => {
        animate(buttonRef.current, {
          scale: [
            { value: 1, duration: 0 },
            { value: 1.1, duration: 200, ease: 'easeInOutQuad' }
          ],
          autoplay: false
        })
      })

      const handleMouseEnter = () => {
        animate(buttonRef.current, {
          scale: 1.1,
          duration: 200,
          ease: 'easeInOutQuad'
        })
      }

      const handleMouseLeave = () => {
        animate(buttonRef.current, {
          scale: 1,
          duration: 200,
          ease: 'easeInOutQuad'
        })
      }

      buttonRef.current.addEventListener('mouseenter', handleMouseEnter)
      buttonRef.current.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        if (buttonRef.current) {
          buttonRef.current.removeEventListener('mouseenter', handleMouseEnter)
          buttonRef.current.removeEventListener('mouseleave', handleMouseLeave)
        }
        scope.current.revert()
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
