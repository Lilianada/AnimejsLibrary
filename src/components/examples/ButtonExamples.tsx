import { useRef, useEffect, useState } from 'react'
import { animate, createScope } from 'animejs'
import { Code, Copy, Check, X, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CodeBlock from "./animations/CodeBlock"

const IndividualCodeDemo = ({
  children,
  code,
  copied,
  onCopy,
}: {
  children: React.ReactNode,
  code: string,
  copied: boolean,
  onCopy: () => void,
}) => {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="bg-muted p-6 rounded-lg flex flex-col items-center">
      <div className="flex gap-2 items-center justify-end w-full mb-2">
        <button onClick={() => setShowCode(v => !v)} className="p-2 rounded hover:bg-muted/50">
          {showCode
            ? <EyeOff className="h-4 w-4" />
            : <Eye className="h-4 w-4" />}
        </button>
        <button onClick={onCopy} className="p-2 rounded hover:bg-muted/50">
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      {showCode
        ? <CodeBlock code={code} />
        : <div className="w-full flex-1 flex items-center justify-center">{children}</div>
      }
    </div>
  )
}

const ButtonExamples = () => {
  const scaleButtonRef = useRef<HTMLButtonElement>(null)
  const rippleButtonRef = useRef<HTMLButtonElement>(null)
  const rotateIconRef = useRef<HTMLButtonElement>(null)
  const pulseButtonRef = useRef<HTMLButtonElement>(null)
  const pressButtonRef = useRef<HTMLButtonElement>(null)
  const bounceIconRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [showCodeBlock, setShowCodeBlock] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copiedDemo, setCopiedDemo] = useState([false, false, false, false, false, false, false])
  const codeSnippets = [
    `// Scale Button\n<Button className="hover:bg-[#F97316]/80 transition-colors">Hover Me</Button>`,
    `// Color Shift\n<Button className="btn-color-shift">Hover Me</Button>`,
    `// Shadow Effect\n<Button className="btn-pulse">Hover Me</Button>`,
    `// Spin Icon\n<Button><ArrowRight /></Button>`,
    `// Bounce Icon\n<Button><Zap /></Button>`,
    `// Press Effect\n<Button className="btn-press">Click Me</Button>`,
    `// Ripple Effect\n<Button className="btn-ripple">Ripple</Button>`,
  ]

  const codeExample = `
import { Button } from '@/components/ui/button'
import { animate, createScope } from 'animejs'
import { useEffect } from 'react'

const AnimatedButton = () => {
  const buttonRef = useRef(null)
  useEffect(() => {
    const scope = createScope({ root: buttonRef.current });
    scope.add(() => {
      animate(buttonRef.current, {
        scale: [
          { value: 1, duration: 0 },
          { value: 1.1, duration: 200, ease: 'easeInOutQuad' }
        ],
        autoplay: false
      });
      // ... Add other effects here as in ButtonExamples
    });
    return () => scope.revert()
  }, []);
  return <Button ref={buttonRef}>Hover Me</Button>
}
  `

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeExample)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  const handleCopyDemo = async (idx: number) => {
    try {
      await navigator.clipboard.writeText(codeSnippets[idx])
      setCopiedDemo(arr => {
        const next = [...arr];
        next[idx] = true;
        return next;
      });
      setTimeout(() => setCopiedDemo(arr => {
        const next = [...arr];
        next[idx] = false;
        return next;
      }), 1700)
    } catch {}
  }

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
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Buttons</h2>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <IndividualCodeDemo
          code={codeSnippets[0]}
          copied={copiedDemo[0]}
          onCopy={() => handleCopyDemo(0)}
        >
          <Button ref={scaleButtonRef} className="hover:bg-[#F97316]/80 bg-primary transition-colors">
            Hover to Scale
          </Button>
        </IndividualCodeDemo>
        <IndividualCodeDemo
          code={codeSnippets[1]}
          copied={copiedDemo[1]}
          onCopy={() => handleCopyDemo(1)}
        >
          <Button className="btn-color-shift">
            Hover for Colors
          </Button>
        </IndividualCodeDemo>
        <IndividualCodeDemo
          code={codeSnippets[2]}
          copied={copiedDemo[2]}
          onCopy={() => handleCopyDemo(2)}
        >
          <Button ref={pulseButtonRef} className="btn-pulse glass-btn">
            Hover for Glow
          </Button>
        </IndividualCodeDemo>
        <IndividualCodeDemo
          code={codeSnippets[3]}
          copied={copiedDemo[3]}
          onCopy={() => handleCopyDemo(3)}
        >
          <Button ref={rotateIconRef} className="glass-btn hover:bg-[#F97316]/80">
            <span className="mr-2">Spin</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </IndividualCodeDemo>
        <IndividualCodeDemo
          code={codeSnippets[4]}
          copied={copiedDemo[4]}
          onCopy={() => handleCopyDemo(4)}
        >
          <Button ref={bounceIconRef} className="glass-btn hover:bg-[#F97316]/80">
            <span className="mr-2">Bounce</span>
            <Zap className="h-4 w-4" />
          </Button>
        </IndividualCodeDemo>
        <IndividualCodeDemo
          code={codeSnippets[5]}
          copied={copiedDemo[5]}
          onCopy={() => handleCopyDemo(5)}
        >
          <Button ref={pressButtonRef} className="glass-btn btn-press hover:bg-[#F97316]/80">
            Click to Press
          </Button>
        </IndividualCodeDemo>
        <IndividualCodeDemo
          code={codeSnippets[6]}
          copied={copiedDemo[6]}
          onCopy={() => handleCopyDemo(6)}
        >
          <Button
            ref={rippleButtonRef}
            className="btn-ripple glass-btn relative overflow-hidden hover:bg-[#F97316]/80"
            onClick={createRipple}
          >
            Click for Ripple
          </Button>
        </IndividualCodeDemo>
      </div>
    </div>
  )
}

export default ButtonExamples
