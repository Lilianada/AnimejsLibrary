
import { useRef, useEffect, useState } from 'react'

const LoadersExamples = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    // Animate cards in
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".loader-card")
      cards.forEach((card, i) => {
        const el = card as HTMLElement
        el.style.opacity = "0"
        el.style.transform = "translateY(36px)"
        setTimeout(() => {
          el.style.transition = "opacity 0.6s, transform 0.5s"
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }, 60 + i * 140)
      })
    }
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 0
        return p + 5
      })
    }, 300)
    return () => clearInterval(interval)
  }, [])

  // Morphing shape SVG animation using setInterval (as a lightweight demo)
  const [morphIndex, setMorphIndex] = useState(0)
  const morphPaths = [
    "M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0", // Circle
    "M25,25 h50 v50 h-50 Z", // Square
    "M50,10 L90,90 L10,90 Z" // Triangle
  ]
  useEffect(() => {
    const morphTimeout = setInterval(() => {
      setMorphIndex(i => (i + 1) % morphPaths.length)
    }, 1200)
    return () => clearInterval(morphTimeout)
  }, [])

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Loaders & Spinners</h2>
        <p className="text-muted-foreground">
          A gallery of fancy animated loaders. Enjoy SVG morphs, spinning, progress bars, and bouncy dots!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Spinner Loader */}
        <div className="loader-card flex flex-col items-center justify-center gap-2 bg-muted rounded-lg p-8 shadow shadow-primary/20">
          <div className="spinner"></div>
          <div className="text-muted-foreground text-xs mt-2">Spinning Loader</div>
        </div>
        {/* Bouncing Dots */}
        <div className="loader-card flex flex-col items-center justify-center gap-2 bg-muted rounded-lg p-8">
          <div className="dots-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <div className="text-muted-foreground text-xs mt-2">Bouncing Dots</div>
        </div>
        {/* Animated Progress Bar */}
        <div className="loader-card flex flex-col items-center justify-center gap-2 bg-muted rounded-lg p-8 w-full">
          <div className="progress-bar w-full mb-1">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-muted-foreground text-xs">Progress Bar - {progress}%</div>
        </div>
        {/* Circular Progress */}
        <div className="loader-card flex flex-col items-center justify-center gap-2 bg-muted rounded-lg p-8">
          <div className="circular-progress">
            <svg width={60} height={60}>
              <circle className="circular-progress-bg" cx="30" cy="30" r="25" />
              <circle 
                className="circular-progress-fill" 
                cx="30" cy="30" r="25" 
                style={{
                  strokeDashoffset: 251.2 - (251.2 * progress / 100)
                }}
              />
            </svg>
          </div>
          <div className="text-muted-foreground text-xs">Circular Progress</div>
        </div>
        {/* Morphing SVG */}
        <div className="loader-card flex flex-col items-center justify-center gap-2 bg-muted rounded-lg p-8">
          <svg width={80} height={80} viewBox="0 0 100 100">
            <path
              className="circle-morph"
              fill="#A78BFA"
              d={morphPaths[morphIndex]}
              style={{ transition: "d .7s cubic-bezier(.86,0,.07,1)" }}
            />
          </svg>
          <div className="text-muted-foreground text-xs">Morphing SVG</div>
        </div>
        {/* Indeterminate Linear Progress */}
        <div className="loader-card flex flex-col items-center justify-center gap-2 bg-muted rounded-lg p-8 w-full">
          <div className="indeterminate-progress w-full"></div>
          <div className="text-muted-foreground text-xs">Indeterminate loader</div>
        </div>
      </div>
    </div>
  )
}

export default LoadersExamples
