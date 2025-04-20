
import { useRef, useEffect, useState } from 'react'
import { animate, createScope } from 'animejs'
import { Code, Copy, ArrowRight, Zap, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ButtonExamples = () => {
  const scaleButtonRef = useRef<HTMLButtonElement>(null)
  const rippleButtonRef = useRef<HTMLButtonElement>(null)
  const rotateIconRef = useRef<HTMLButtonElement>(null)
  const pulseButtonRef = useRef<HTMLButtonElement>(null)
  const pressButtonRef = useRef<HTMLButtonElement>(null)
  const bounceIconRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  
  // Scale animation on hover using Anime.js
  useEffect(() => {
    if (scaleButtonRef.current) {
      const scope = createScope({ root: scaleButtonRef.current }).add(scope => {
        animate(scaleButtonRef.current, {
          scale: [
            { value: 1, duration: 0 },
            { value: 1.1, duration: 200, ease: 'easeInOutQuad' }
          ],
          autoplay: false
        })
      })

      const handleMouseEnter = () => {
        animate(scaleButtonRef.current, {
          scale: 1.1,
          duration: 200,
          ease: 'easeInOutQuad'
        })
      }

      const handleMouseLeave = () => {
        animate(scaleButtonRef.current, {
          scale: 1,
          duration: 200,
          ease: 'easeInOutQuad'
        })
      }

      scaleButtonRef.current.addEventListener('mouseenter', handleMouseEnter)
      scaleButtonRef.current.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        if (scaleButtonRef.current) {
          scaleButtonRef.current.removeEventListener('mouseenter', handleMouseEnter)
          scaleButtonRef.current.removeEventListener('mouseleave', handleMouseLeave)
        }
        scope.revert()
      }
    }
  }, [])

  // Press animation using Anime.js
  useEffect(() => {
    if (pressButtonRef.current) {
      const scope = createScope({ root: pressButtonRef.current }).add(scope => {
        animate(pressButtonRef.current, {
          scale: [
            { value: 1, duration: 0 },
            { value: 0.95, duration: 100, ease: 'easeInOutQuad' },
            { value: 1, duration: 100, ease: 'easeInOutQuad' }
          ],
          autoplay: false
        })
      })

      const handleClick = () => {
        animate(pressButtonRef.current, {
          scale: [
            { value: 1, duration: 0 },
            { value: 0.95, duration: 100, ease: 'easeInOutQuad' },
            { value: 1, duration: 100, ease: 'easeInOutQuad' }
          ],
        })
      }

      pressButtonRef.current.addEventListener('click', handleClick)

      return () => {
        if (pressButtonRef.current) {
          pressButtonRef.current.removeEventListener('click', handleClick)
        }
        scope.revert()
      }
    }
  }, [])

  // Rotate icon animation using Anime.js
  useEffect(() => {
    if (rotateIconRef.current) {
      const iconElement = rotateIconRef.current.querySelector('svg')
      
      if (iconElement) {
        const scope = createScope({ root: rotateIconRef.current }).add(scope => {
          animate(iconElement, {
            rotate: [
              { value: 0, duration: 0 },
              { value: 360, duration: 800, ease: 'easeInOutQuad' }
            ],
            autoplay: false
          })
        })

        const handleMouseEnter = () => {
          animate(iconElement, {
            rotate: 360,
            duration: 800,
            ease: 'easeInOutQuad'
          })
        }

        const handleMouseLeave = () => {
          animate(iconElement, {
            rotate: 0,
            duration: 0
          })
        }

        rotateIconRef.current.addEventListener('mouseenter', handleMouseEnter)
        rotateIconRef.current.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          if (rotateIconRef.current) {
            rotateIconRef.current.removeEventListener('mouseenter', handleMouseEnter)
            rotateIconRef.current.removeEventListener('mouseleave', handleMouseLeave)
          }
          scope.revert()
        }
      }
    }
  }, [])

  // Bounce icon animation using Anime.js
  useEffect(() => {
    if (bounceIconRef.current) {
      const iconElement = bounceIconRef.current.querySelector('svg')
      
      if (iconElement) {
        const scope = createScope({ root: bounceIconRef.current }).add(scope => {
          animate(iconElement, {
            translateY: [
              { value: 0, duration: 0 },
              { value: -5, duration: 300, ease: 'easeOutQuad' },
              { value: 0, duration: 300, ease: 'easeInQuad' }
            ],
            loop: true,
            autoplay: false
          })
        })

        const handleMouseEnter = () => {
          animate(iconElement, {
            translateY: [
              { value: 0, duration: 0 },
              { value: -5, duration: 300, ease: 'easeOutQuad' },
              { value: 0, duration: 300, ease: 'easeInQuad' }
            ],
            loop: true
          })
        }

        const handleMouseLeave = () => {
          animate(iconElement, {
            translateY: 0,
            duration: 0,
            loop: false
          })
        }

        bounceIconRef.current.addEventListener('mouseenter', handleMouseEnter)
        bounceIconRef.current.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          if (bounceIconRef.current) {
            bounceIconRef.current.removeEventListener('mouseenter', handleMouseEnter)
            bounceIconRef.current.removeEventListener('mouseleave', handleMouseLeave)
          }
          scope.revert()
        }
      }
    }
  }, [])

  // Pulse animation using Anime.js
  useEffect(() => {
    if (pulseButtonRef.current) {
      const scope = createScope({ root: pulseButtonRef.current }).add(scope => {
        animate(pulseButtonRef.current, {
          boxShadow: [
            { value: '0 0 0 0 rgba(255, 255, 255, 0)', duration: 0 },
            { value: '0 0 0 10px rgba(255, 255, 255, 0.2)', duration: 700, ease: 'easeOutQuad' },
            { value: '0 0 0 0 rgba(255, 255, 255, 0)', duration: 700, ease: 'easeInQuad' }
          ],
          loop: true,
          autoplay: false
        })
      })

      const handleMouseEnter = () => {
        animate(pulseButtonRef.current, {
          boxShadow: [
            { value: '0 0 0 0 rgba(255, 255, 255, 0)', duration: 0 },
            { value: '0 0 0 10px rgba(255, 255, 255, 0.2)', duration: 700, ease: 'easeOutQuad' },
            { value: '0 0 0 0 rgba(255, 255, 255, 0)', duration: 700, ease: 'easeInQuad' }
          ],
          loop: true
        })
      }

      const handleMouseLeave = () => {
        animate(pulseButtonRef.current, {
          boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)',
          duration: 0,
          loop: false
        })
      }

      pulseButtonRef.current.addEventListener('mouseenter', handleMouseEnter)
      pulseButtonRef.current.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        if (pulseButtonRef.current) {
          pulseButtonRef.current.removeEventListener('mouseenter', handleMouseEnter)
          pulseButtonRef.current.removeEventListener('mouseleave', handleMouseLeave)
        }
        scope.revert()
      }
    }
  }, [])

  // Ripple effect on click
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");
    
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
  };

  return (
    <div className="space-y-8">
      {/* Hover animations section */}
      <Card className="border-border bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Hover Animations</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scale on hover */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Scale Effect</h3>
            <div className="flex items-center justify-center p-6">
              <Button ref={scaleButtonRef} className="glass-btn">
                Hover to Scale
              </Button>
            </div>
          </div>

          {/* Color shift on hover */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Color Shift</h3>
            <div className="flex items-center justify-center p-6">
              <Button className="btn-color-shift">
                Hover for Colors
              </Button>
            </div>
          </div>

          {/* Shadow pulse on hover */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Shadow Effect</h3>
            <div className="flex items-center justify-center p-6">
              <Button ref={pulseButtonRef} className="glass-btn">
                Hover for Glow
              </Button>
            </div>
          </div>

          {/* Icon animations */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Icon Animations</h3>
            <div className="flex items-center justify-center p-6 gap-4">
              <Button ref={rotateIconRef} className="glass-btn">
                <span className="mr-2">Spin</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button ref={bounceIconRef} className="glass-btn">
                <span className="mr-2">Bounce</span>
                <Zap className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Focus and click animations */}
      <Card className="border-border bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Focus & Click Animations</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Focus animation */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Focus Effect</h3>
            <div className="flex items-center justify-center p-6">
              <Button className="btn-focus-outline glass-btn">
                Focus Me (Tab)
              </Button>
            </div>
          </div>

          {/* Ripple effect */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Ripple Effect</h3>
            <div className="flex items-center justify-center p-6">
              <Button 
                ref={rippleButtonRef} 
                className="btn-ripple glass-btn relative overflow-hidden"
                onClick={createRipple}
              >
                Click for Ripple
              </Button>
            </div>
            <style jsx>{`
              .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
              }

              @keyframes ripple {
                to {
                  transform: scale(4);
                  opacity: 0;
                }
              }
            `}</style>
          </div>

          {/* Press effect */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Press Effect</h3>
            <div className="flex items-center justify-center p-6">
              <Button ref={pressButtonRef} className="glass-btn">
                Click to Press
              </Button>
            </div>
          </div>

          {/* Icon morph or spin */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Toggle State</h3>
            <div className="flex items-center justify-center p-6">
              <Button 
                className="glass-btn"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <>
                    <span className="mr-2">Close</span>
                    <X className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span className="mr-2">Open</span>
                    <Check className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disabled state */}
      <Card className="border-border bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-medium">Disabled State</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6">
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Disabled Buttons</h3>
            <div className="flex items-center justify-center p-6 gap-4 flex-wrap">
              <Button disabled className="glass-btn btn-disabled">
                Disabled Button
              </Button>
              <Button disabled className="btn-disabled" variant="secondary">
                Disabled Secondary
              </Button>
              <Button disabled className="btn-disabled" variant="outline">
                Disabled Outline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ButtonExamples
