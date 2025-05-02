
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as anime from "animejs";

const ScrollProgressAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollButtonRef = useRef<HTMLButtonElement>(null);
  
  // Handle scroll event to calculate scroll progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate scroll percentage
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(scrollPercentage, 100));
      
      // Show/hide scroll to top button
      setIsVisible(scrollTop > windowHeight / 2);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Animate the progress bar using anime.js
  useEffect(() => {
    if (!progressBarRef.current) return;
    
    anime.default({
      targets: progressBarRef.current,
      width: `${scrollProgress}%`,
      easing: 'easeOutExpo',
      duration: 300
    });
  }, [scrollProgress]);
  
  // Animate the scroll to top button appearance
  useEffect(() => {
    if (!scrollButtonRef.current) return;
    
    anime.default({
      targets: scrollButtonRef.current,
      opacity: isVisible ? 1 : 0,
      translateY: isVisible ? 0 : 20,
      scale: isVisible ? 1 : 0.9,
      duration: 300,
      easing: 'easeOutElastic(1, .5)'
    });
  }, [isVisible]);
  
  // Scroll to top with animation
  const scrollToTop = () => {
    anime.default({
      targets: window.document.scrollingElement,
      scrollTop: 0,
      duration: 800,
      easing: 'easeInOutQuad'
    });
  };
  
  // Generate color based on theme and progress
  const getColor = () => {
    if (resolvedTheme === 'dark') {
      return `hsl(var(--primary))`;
    }
    return `hsl(var(--primary))`;
  };
  
  return (
    <div className="relative space-y-8">
      {/* Example code block */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted/30 border-b p-4">
          <h4 className="text-lg font-medium">Scroll Progress Indicator</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Watch the progress bar at the top of the window as you scroll the page.
          </p>
        </div>
        
        {/* Live example preview */}
        <div className="p-6">
          <div className="fixed top-0 left-0 right-0 h-1 bg-muted/20 z-50">
            <div 
              ref={progressBarRef} 
              className="h-full transition-colors" 
              style={{ 
                width: `${scrollProgress}%`, 
                backgroundColor: getColor() 
              }}
            />
          </div>
          
          <button
            ref={scrollButtonRef}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-primary shadow-lg opacity-0 pointer-events-none z-50"
            style={{
              opacity: isVisible ? 1 : 0,
              pointerEvents: isVisible ? 'auto' : 'none'
            }}
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </button>
          
          <div className="text-center py-4 space-y-4">
            <div className="inline-flex items-center gap-2 text-sm bg-muted/30 px-3 py-1.5 rounded-full">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getColor() }}
              />
              <span>{scrollProgress.toFixed(0)}% scrolled</span>
            </div>
            <p>
              Current scroll position: {scrollProgress.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
      
      {/* Code example */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium">How to implement</h4>
        
        <div className="bg-muted/30 rounded-lg p-6 text-sm">
          <pre className="whitespace-pre-wrap">
{`import { useState, useEffect, useRef } from "react";
import * as anime from "animejs";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate scroll percentage
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(scrollPercentage, 100));
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animate the progress bar using anime.js
  useEffect(() => {
    if (!progressBarRef.current) return;
    
    anime.default({
      targets: progressBarRef.current,
      width: \`\${scrollProgress}%\`,
      easing: 'easeOutExpo',
      duration: 300
    });
  }, [scrollProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-muted/20 z-50">
      <div 
        ref={progressBarRef} 
        className="h-full bg-primary" 
        style={{ width: \`\${scrollProgress}%\` }}
      />
    </div>
  );
};

export default ScrollProgress;`}
          </pre>
        </div>
        
        <Button 
          onClick={scrollToTop}
          variant="outline"
          className="flex gap-2 items-center"
        >
          <ArrowUp className="w-4 h-4" />
          Scroll to top to see the progress bar reset
        </Button>
      </div>
    </div>
  );
};

export default ScrollProgressAnimation;
