
import { useRef, useEffect, useState } from 'react';
import { Code, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from '@/components/examples/animations/CodeBlock';
import { toast } from 'sonner';

const loaderExamples = [
  {
    title: "Spinning Loader",
    description: "Classic rotating spinner with gradient",
    code: `.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #FDA858;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}`
  },
  {
    title: "Bouncing Dots",
    description: "Three dots bouncing in sequence",
    code: `.dots-loader {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #FDA858;
  animation: bounce 0.6s infinite alternate;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-10px); }
}`
  },
  {
    title: "Progress Bar",
    description: "Animated horizontal progress indicator",
    code: `.progress-bar {
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FDA858, #9046ff);
  transition: width 0.3s ease;
}`
  },
  {
    title: "Circular Progress",
    description: "SVG circular progress indicator",
    code: `.circular-progress {
  position: relative;
}

.circular-progress-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 4;
}

.circular-progress-fill {
  fill: none;
  stroke: #FDA858;
  stroke-width: 4;
  stroke-dasharray: 251.2;
  stroke-linecap: round;
  transform-origin: center;
  transition: stroke-dashoffset 0.5s ease;
}`
  },
  {
    title: "Morphing SVG",
    description: "Shape-shifting SVG animation",
    code: `.circle-morph {
  transition: d 0.7s cubic-bezier(.86,0,.07,1);
}`
  },
  {
    title: "Indeterminate Loader",
    description: "Continuous loading animation",
    code: `.indeterminate-progress {
  height: 4px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.indeterminate-progress::after {
  content: '';
  position: absolute;
  height: 100%;
  width: 50%;
  background-color: #FDA858;
  animation: indeterminate 1.5s infinite;
  border-radius: 2px;
}

@keyframes indeterminate {
  0% { left: -50%; }
  100% { left: 100%; }
}`
  }
];

const LoadersExamples = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [morphIndex, setMorphIndex] = useState(0);
  const [showCode, setShowCode] = useState<number | null>(null);
  
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  useEffect(() => {
    // Animate cards in
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".loader-card");
      cards.forEach((card, i) => {
        const el = card as HTMLElement;
        el.style.opacity = "0";
        el.style.transform = "translateY(36px)";
        setTimeout(() => {
          el.style.transition = "opacity 0.6s, transform 0.5s";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 60 + i * 140);
      });
    }
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 0;
        return p + 5;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Morphing shape SVG animation using setInterval (as a lightweight demo)
  const morphPaths = [
    "M50,50 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0", // Circle
    "M25,25 h50 v50 h-50 Z", // Square
    "M50,10 L90,90 L10,90 Z" // Triangle
  ];
  
  useEffect(() => {
    const morphTimeout = setInterval(() => {
      setMorphIndex(i => (i + 1) % morphPaths.length);
    }, 1200);
    return () => clearInterval(morphTimeout);
  }, []);

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
        <div className="loader-card flex flex-col gap-2 bg-muted rounded-lg p-8 shadow shadow-primary/20 relative">
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setShowCode(showCode === 0 ? null : 0)}
            >
              <Code size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => copyCode(loaderExamples[0].code)}
            >
              <Copy size={16} />
            </Button>
          </div>
          
          {showCode === 0 ? (
            <CodeBlock code={loaderExamples[0].code} />
          ) : (
            <>
              <div className="spinner mx-auto mb-4"></div>
              <div className="text-center">
                <div className="font-medium">{loaderExamples[0].title}</div>
                <div className="text-muted-foreground text-xs mt-1">{loaderExamples[0].description}</div>
              </div>
            </>
          )}
        </div>
        
        {/* Bouncing Dots */}
        <div className="loader-card flex flex-col gap-2 bg-muted rounded-lg p-8 relative">
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setShowCode(showCode === 1 ? null : 1)}
            >
              <Code size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => copyCode(loaderExamples[1].code)}
            >
              <Copy size={16} />
            </Button>
          </div>
          
          {showCode === 1 ? (
            <CodeBlock code={loaderExamples[1].code} />
          ) : (
            <>
              <div className="dots-loader mx-auto mb-4">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <div className="text-center">
                <div className="font-medium">{loaderExamples[1].title}</div>
                <div className="text-muted-foreground text-xs mt-1">{loaderExamples[1].description}</div>
              </div>
            </>
          )}
        </div>
        
        {/* Animated Progress Bar */}
        <div className="loader-card flex flex-col gap-2 bg-muted rounded-lg p-8 w-full relative">
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setShowCode(showCode === 2 ? null : 2)}
            >
              <Code size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => copyCode(loaderExamples[2].code)}
            >
              <Copy size={16} />
            </Button>
          </div>
          
          {showCode === 2 ? (
            <CodeBlock code={loaderExamples[2].code} />
          ) : (
            <>
              <div className="progress-bar w-full mb-1">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-center">
                <div className="font-medium">{loaderExamples[2].title}</div>
                <div className="text-muted-foreground text-xs mt-1">{loaderExamples[2].description} - {progress}%</div>
              </div>
            </>
          )}
        </div>
        
        {/* Circular Progress */}
        <div className="loader-card flex flex-col gap-2 bg-muted rounded-lg p-8 relative">
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setShowCode(showCode === 3 ? null : 3)}
            >
              <Code size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => copyCode(loaderExamples[3].code)}
            >
              <Copy size={16} />
            </Button>
          </div>
          
          {showCode === 3 ? (
            <CodeBlock code={loaderExamples[3].code} />
          ) : (
            <>
              <div className="circular-progress mx-auto mb-4">
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
              <div className="text-center">
                <div className="font-medium">{loaderExamples[3].title}</div>
                <div className="text-muted-foreground text-xs mt-1">{loaderExamples[3].description}</div>
              </div>
            </>
          )}
        </div>
        
        {/* Morphing SVG */}
        <div className="loader-card flex flex-col gap-2 bg-muted rounded-lg p-8 relative">
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setShowCode(showCode === 4 ? null : 4)}
            >
              <Code size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => copyCode(loaderExamples[4].code)}
            >
              <Copy size={16} />
            </Button>
          </div>
          
          {showCode === 4 ? (
            <CodeBlock code={loaderExamples[4].code} />
          ) : (
            <>
              <svg width={80} height={80} viewBox="0 0 100 100" className="mx-auto mb-4">
                <path
                  className="circle-morph"
                  fill="#A78BFA"
                  d={morphPaths[morphIndex]}
                  style={{ transition: "d .7s cubic-bezier(.86,0,.07,1)" }}
                />
              </svg>
              <div className="text-center">
                <div className="font-medium">{loaderExamples[4].title}</div>
                <div className="text-muted-foreground text-xs mt-1">{loaderExamples[4].description}</div>
              </div>
            </>
          )}
        </div>
        
        {/* Indeterminate Linear Progress */}
        <div className="loader-card flex flex-col gap-2 bg-muted rounded-lg p-8 w-full relative">
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setShowCode(showCode === 5 ? null : 5)}
            >
              <Code size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => copyCode(loaderExamples[5].code)}
            >
              <Copy size={16} />
            </Button>
          </div>
          
          {showCode === 5 ? (
            <CodeBlock code={loaderExamples[5].code} />
          ) : (
            <>
              <div className="indeterminate-progress w-full mx-auto mb-4"></div>
              <div className="text-center">
                <div className="font-medium">{loaderExamples[5].title}</div>
                <div className="text-muted-foreground text-xs mt-1">{loaderExamples[5].description}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadersExamples;
