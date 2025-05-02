
import { useState, useEffect, useRef } from "react";
import { CodeToggle } from "../CodeToggle";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeBlock from "./CodeBlock";

const ScrollProgressAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);
  
  // Demo scroll handler for the contained demo area
  const handleDemoScroll = () => {
    if (!demoRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = demoRef.current;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(scrollPercentage);
  };
  
  // Global scroll handler for the page progress indicator
  useEffect(() => {
    const handleGlobalScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      
      // Show scroll to top button when we're 300px down the page
      setShowScrollToTop(scrollTop > 300);
    };
    
    window.addEventListener("scroll", handleGlobalScroll);
    return () => {
      window.removeEventListener("scroll", handleGlobalScroll);
    };
  }, []);
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progressBarCode = `import { useState, useEffect } from "react";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY;
      const docHeight = 
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
        style={{ width: \`\${scrollProgress}%\` }}
      />
    </div>
  );
};

export default ScrollProgress;`;

  const scrollToTopCode = `import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={handleScrollToTop}
      className={\`fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg 
      transition-opacity duration-300 \${
        showButton ? "opacity-100" : "opacity-0 pointer-events-none"
      }\`}
      aria-label="Scroll to top"
      size="icon"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};

export default ScrollToTop;`;

  return (
    <div className="space-y-8">
      {/* Fixed progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Scroll to top button */}
      <Button
        onClick={handleScrollToTop}
        className={`fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg transition-opacity duration-300 ${
          showScrollToTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
        size="icon"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Progress Bar Example */}
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Progress Indicator</h4>
              <div className="relative border rounded-lg h-64 overflow-hidden">
                <div
                  ref={demoRef}
                  className="absolute inset-0 overflow-y-auto p-4"
                  onScroll={handleDemoScroll}
                >
                  <div className="sticky top-0 left-0 right-0 h-1 z-10 bg-muted">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-100 ease-out"
                      style={{ width: `${scrollProgress}%` }}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <h5 className="text-md font-medium mb-2">Scroll down to see progress</h5>
                    <p className="mb-4">This is a demo of the scroll indicator. As you scroll through this content, the progress bar at the top updates to reflect your position.</p>
                    
                    {Array(10).fill(0).map((_, i) => (
                      <p key={i} className="mb-4">
                        Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }
          codeContent={progressBarCode}
        />
        
        {/* Scroll to Top Example */}
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Scroll to Top Button</h4>
              <div className="relative border rounded-lg h-64 overflow-hidden">
                <div className="absolute inset-0 p-4 space-y-4">
                  <div className="flex justify-center items-center h-full">
                    <div className="text-center">
                      <p className="mb-2 text-muted-foreground">
                        A button appears when scrolling down the main page
                      </p>
                      <ArrowUp className="h-10 w-10 mx-auto animate-bounce text-primary" />
                      <p className="mt-2">
                        You can see it at the bottom right of the screen
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          codeContent={scrollToTopCode}
        />
      </div>
      
      <div className="mt-8">
        <h4 className="text-lg font-medium mb-3">Implementation Notes</h4>
        <div className="p-4 bg-muted/50 rounded-lg">
          <ul className="list-disc pl-4 space-y-2">
            <li>The progress bar updates smoothly as the user scrolls, providing visual feedback.</li>
            <li>The scroll-to-top button appears only when the user has scrolled down, reducing visual clutter.</li>
            <li>Both components use React's useEffect hook to efficiently add and remove event listeners.</li>
            <li>The progress calculation works by dividing the current scroll position by the maximum scrollable area.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScrollProgressAnimation;
