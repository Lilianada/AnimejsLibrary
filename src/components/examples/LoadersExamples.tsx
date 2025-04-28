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
    title: "Wave Animation",
    description: "Fluid wave animation effect",
    code: `.wave-container {
  position: relative;
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.wave {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: #FDA858;
  border-radius: 40%;
  animation: wave 3s infinite linear;
  opacity: 0.8;
}

.wave:nth-child(2) {
  animation-delay: -0.5s;
  opacity: 0.5;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  const [wavePercent, setWavePercent] = useState(70);
  const [showCode, setShowCode] = useState<number | null>(null);
  
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  useEffect(() => {
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
      
      setWavePercent(p => {
        if (p <= 30) return 90;
        return p - 3;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Loaders & Spinners</h2>
        <p className="text-muted-foreground">
          A gallery of fancy animated loaders. Enjoy spinners, progress bars, and interactive animations!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div 
          key={0} 
          className="loader-card flex flex-col gap-2 bg-muted rounded-lg p-8 relative"
        >
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
            <div className="text-center">
              <div className="wave-loader mx-auto mb-4">
                <div className="wave-circle"></div>
                <div className="wave"></div>
              </div>
              <div className="font-medium mt-4">{loaderExamples[0].title}</div>
              <div className="text-muted-foreground text-xs mt-1">{loaderExamples[0].description}</div>
            </div>
          )}
        </div>
        <div 
          key={1} 
          className="loader-card flex flex-col gap-2 bg-muted rounded-lg p-8 relative"
        >
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
            <div className="text-center">
              <div className="font-medium mt-4">{loaderExamples[1].title}</div>
              <div className="text-muted-foreground text-xs mt-1">{loaderExamples[1].description}</div>
            </div>
          )}
        </div>
        <div 
          key={2} 
          className="loader-card flex flex-col gap-2 bg-muted rounded-lg p-8 relative"
        >
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
            <div className="text-center">
              <div className="font-medium mt-4">{loaderExamples[2].title}</div>
              <div className="text-muted-foreground text-xs mt-1">{loaderExamples[2].description}</div>
            </div>
          )}
        </div>
        <div 
          key={3} 
          className="loader-card flex flex-col gap-2 bg-muted rounded-lg p-8 relative"
        >
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
            <div className="text-center">
              <div className="font-medium mt-4">{loaderExamples[3].title}</div>
              <div className="text-muted-foreground text-xs mt-1">{loaderExamples[3].description}</div>
            </div>
          )}
        </div>
        <div 
          key={4} 
          className="loader-card flex flex-col gap-2 bg-muted rounded-lg p-8 relative"
        >
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
            <div className="text-center">
              <div className="font-medium mt-4">{loaderExamples[4].title}</div>
              <div className="text-muted-foreground text-xs mt-1">{loaderExamples[4].description}</div>
            </div>
          )}
        </div>
        <div 
          key={5} 
          className="loader-card flex flex-col gap-2 bg-muted rounded-lg p-8 relative"
        >
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
            <div className="text-center">
              <div className="font-medium mt-4">{loaderExamples[5].title}</div>
              <div className="text-muted-foreground text-xs mt-1">{loaderExamples[5].description}</div>
            </div>
          )}
        </div>
      </div>

      <style>{`
          .wave-loader {
            position: relative;
            width: 60px;
            height: 60px;
            margin: 0 auto;
          }

          .wave-circle {
            position: absolute;
            width: 100%;
            height: 100%;
            background: #FDA858;
            border-radius: 50%;
            opacity: 0.8;
          }

          .wave {
            position: absolute;
            width: 200%;
            height: 200%;
            top: -50%;
            left: -50%;
            background: #FDA858;
            border-radius: 40%;
            opacity: 0.5;
            animation: wave 3s infinite linear;
          }

          @keyframes wave {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
    </div>
  );
};

export default LoadersExamples;
