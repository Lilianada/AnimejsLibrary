
import { useRef, useEffect, useState } from 'react'

const LoaderShowcase = () => {
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
          Fancy animated loaders: morphing SVGs, bouncy dots, and animated progress!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Spinner Loader */}
        <div className="loader-card flex flex-col items-center justify-center gap-2 bg-muted rounded-lg p-8 shadow shadow-primary/20">
          <div className="spinner" style={{
            width: '54px',
            height: '54px',
            border: '6px solid #333',
            borderTop: '6px solid #FDA858',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <div className="text-muted-foreground text-xs mt-2">Spinning Loader</div>
        </div>
        {/* Bouncing Dots */}
        <div className="loader-card flex flex-col items-center justify-center gap-2 bg-muted rounded-lg p-8">
          <div className="flex gap-2 mt-2">
            {[0,1,2].map(i => (
              <div key={i} className="w-3 h-3 bg-[#FDA858] rounded-full"
                style={{
                  animation: `bounceDot 1s ${i * 0.16}s infinite cubic-bezier(.4,0,.2,1)`
                }}
              />
            ))}
          </div>
          <div className="text-muted-foreground text-xs mt-2">Bouncing Dots</div>
        </div>
        {/* Animated Progress Bar */}
        <div className="loader-card flex flex-col items-center justify-center gap-2 bg-muted rounded-lg p-8 w-full">
          <div className="w-full h-3 bg-[#222] rounded-full overflow-hidden mb-2">
            <div className="bg-[#FDA858] h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-muted-foreground text-xs">Progress Bar - {progress}%</div>
        </div>
        {/* Circular Progress */}
        <div className="loader-card flex flex-col items-center justify-center gap-2 bg-muted rounded-lg p-8">
          <svg width={60} height={60}>
            <circle cx="30" cy="30" r="25" fill="none" stroke="#444" strokeWidth={7} />
            <circle
              cx="30" cy="30" r="25"
              fill="none"
              stroke="#FDA858"
              strokeWidth={7}
              strokeDasharray={Math.PI*2*25}
              strokeDashoffset={Math.PI*2*25 - (Math.PI*2*25*progress/100)}
              style={{transition: 'stroke-dashoffset 0.35s'}}
            />
          </svg>
          <div className="text-muted-foreground text-xs">Circular Progress</div>
        </div>
        {/* Morphing SVG */}
        <div className="loader-card flex flex-col items-center justify-center gap-2 bg-muted rounded-lg p-8">
          <svg width={80} height={80} viewBox="0 0 100 100">
            <path
              fill="#FDA858"
              d={morphPaths[morphIndex]}
              style={{ transition: "d .7s cubic-bezier(.86,0,.07,1)" }}
            />
          </svg>
          <div className="text-muted-foreground text-xs">Morphing SVG</div>
        </div>
        {/* Indeterminate loader */}
        <div className="loader-card flex flex-col items-center justify-center gap-2 bg-muted rounded-lg p-8 w-full">
          <div className="relative w-full h-3 bg-[#2c2c32] rounded-full overflow-hidden">
            <div className="absolute left-0 h-3 w-1/3 bg-[#FDA858] rounded-full animate-indeterminate" />
          </div>
          <div className="text-muted-foreground text-xs">Indeterminate Loader</div>
        </div>
      </div>
      {/* spinner and bounce animations keyframes (scoped) */}
      <style>
      {`
      @keyframes spin {
        0% { transform: rotate(0);}
        100% { transform: rotate(360deg);}
      }
      @keyframes bounceDot {
        0%,100% { transform: translateY(0);}
        40% { transform: translateY(-16px);}
        60% { transform: translateY(-8px);}
      }
      @keyframes indeterminateLoader {
        0% { left: -33%; width: 33%; }
        50% { left: 33%; width: 33%; }
        100% { left: 100%; width: 33%; }
      }
      .animate-indeterminate {
        animation: indeterminateLoader 2s infinite cubic-bezier(.4,0,.2,1);
      }
      `}
      </style>
    </div>
  )
}

export default LoaderShowcase
