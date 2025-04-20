
import { useState, useEffect, useRef } from 'react'
import { animate, createScope } from 'animejs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeBlock from '../CodeBlock'
import './loader-animations.css'

const LoaderAnimations = () => {
  const [codeVisible, setCodeVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const circleProgressRef = useRef<HTMLDivElement>(null)

  // Simulate progress increment for the progress indicators
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0
        return prev + 5
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Setup circular progress animation
  useEffect(() => {
    if (circleProgressRef.current) {
      const scope = createScope({ root: circleProgressRef.current })
      
      scope.add(() => {
        animate({
          targets: '.circle-morph',
          keyframes: [
            { d: 'M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0', fill: '#3B82F6', duration: 0 },
            { d: 'M50,50 m-30,-30 l60,0 l0,60 l-60,0 Z', fill: '#A78BFA', duration: 500 },
            { d: 'M50,10 L90,90 L10,90 Z', fill: '#F59E0B', duration: 500 },
            { d: 'M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0', fill: '#3B82F6', duration: 500 }
          ],
          loop: true,
          easing: 'easeInOutSine'
        })
      })
      
      return () => {
        if (scope.revert) scope.revert()
      }
    }
  }, [])

  const codeExample = `
// CSS for the loader animations
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-left-color: hsl(var(--primary));
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.dots-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: hsl(var(--primary));
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: hsl(var(--primary));
  border-radius: 5px;
  transition: width 0.3s ease;
}

.circular-progress {
  position: relative;
  width: 60px;
  height: 60px;
}

.circular-progress svg {
  transform: rotate(-90deg);
}

.circular-progress-bg {
  fill: none;
  stroke: rgba(0, 0, 0, 0.1);
  stroke-width: 4;
}

.circular-progress-fill {
  fill: none;
  stroke: hsl(var(--primary));
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 251.2;
  stroke-dashoffset: 251.2;
  transition: stroke-dashoffset 0.3s ease;
}

// React component for loaders
import { useState, useEffect, useRef } from 'react'
import { animate, createScope } from 'animejs'

const LoadersExample = () => {
  const [progress, setProgress] = useState(0)
  const morphRef = useRef(null)
  
  // Simulate progress increment
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 5))
    }, 500)
    return () => clearInterval(interval)
  }, [])
  
  // Setup SVG morphing animation
  useEffect(() => {
    if (morphRef.current) {
      const scope = createScope({ root: morphRef.current })
      
      scope.add(() => {
        animate({
          targets: '.circle-morph',
          keyframes: [
            // Circle to square to triangle to circle
            { d: 'M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0', fill: '#3B82F6', duration: 0 },
            { d: 'M50,50 m-30,-30 l60,0 l0,60 l-60,0 Z', fill: '#A78BFA', duration: 500 },
            { d: 'M50,10 L90,90 L10,90 Z', fill: '#F59E0B', duration: 500 },
            { d: 'M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0', fill: '#3B82F6', duration: 500 }
          ],
          loop: true,
          easing: 'easeInOutSine'
        })
      })
      
      return () => scope.revert()
    }
  }, [])
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Spinner */}
      <div className="flex flex-col items-center">
        <h3>Spinning Loader</h3>
        <div className="spinner"></div>
      </div>
      
      {/* Bouncing Dots */}
      <div className="flex flex-col items-center">
        <h3>Bouncing Dots</h3>
        <div className="dots-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="flex flex-col items-center">
        <h3>Progress Bar ({progress}%)</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: \`\${progress}%\` }}
          ></div>
        </div>
      </div>
      
      {/* Circular Progress */}
      <div className="flex flex-col items-center">
        <h3>Circular Progress ({progress}%)</h3>
        <div className="circular-progress">
          <svg width="60" height="60">
            <circle 
              className="circular-progress-bg" 
              cx="30" cy="30" r="25"
            />
            <circle 
              className="circular-progress-fill" 
              cx="30" cy="30" r="25"
              style={{ strokeDashoffset: 251.2 - (251.2 * progress / 100) }}
            />
          </svg>
        </div>
      </div>
      
      {/* Morphing SVG */}
      <div className="flex flex-col items-center" ref={morphRef}>
        <h3>Morphing Shape</h3>
        <svg width="80" height="80" viewBox="0 0 100 100">
          <path className="circle-morph" fill="#3B82F6" d="M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0" />
        </svg>
      </div>
    </div>
  )
}
`

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Loaders & Spinners</span>
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
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6 bg-muted rounded-lg">
            {/* Spinner */}
            <div className="flex flex-col items-center justify-center gap-4">
              <h3 className="text-lg font-medium">Spinning Loader</h3>
              <div className="spinner"></div>
            </div>
            
            {/* Bouncing Dots */}
            <div className="flex flex-col items-center justify-center gap-4">
              <h3 className="text-lg font-medium">Bouncing Dots</h3>
              <div className="dots-loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
            
            {/* Morphing SVG */}
            <div className="flex flex-col items-center justify-center gap-4" ref={circleProgressRef}>
              <h3 className="text-lg font-medium">Morphing Shape</h3>
              <svg width="80" height="80" viewBox="0 0 100 100">
                <path className="circle-morph" fill="#3B82F6" d="M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0" />
              </svg>
            </div>
            
            {/* Progress Bar */}
            <div className="flex flex-col items-center justify-center gap-4">
              <h3 className="text-lg font-medium">Progress Bar ({progress}%)</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Circular Progress */}
            <div className="flex flex-col items-center justify-center gap-4">
              <h3 className="text-lg font-medium">Circular Progress ({progress}%)</h3>
              <div className="circular-progress">
                <svg width="60" height="60">
                  <circle 
                    className="circular-progress-bg" 
                    cx="30" cy="30" r="25"
                  />
                  <circle 
                    className="circular-progress-fill" 
                    cx="30" cy="30" r="25"
                    style={{ 
                      strokeDashoffset: 251.2 - (251.2 * progress / 100) 
                    }}
                  />
                </svg>
              </div>
            </div>
            
            {/* Linear Indeterminate */}
            <div className="flex flex-col items-center justify-center gap-4">
              <h3 className="text-lg font-medium">Indeterminate</h3>
              <div className="indeterminate-progress"></div>
            </div>
          </div>
          
          {codeVisible && <CodeBlock code={codeExample} />}
        </div>
      </CardContent>
    </Card>
  )
}

export default LoaderAnimations
