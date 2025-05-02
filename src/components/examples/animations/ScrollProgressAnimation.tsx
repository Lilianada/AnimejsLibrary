
import { useState, useEffect, useRef } from "react";
import { CodeToggle } from "../CodeToggle";
import * as anime from "animejs";

const ScrollProgressAnimation = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Linear Progress</h4>
              <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                <LinearProgress />
              </div>
            </div>
          }
          codeContent={linearProgressCode}
        />
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Circle Progress</h4>
              <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center">
                <CircleProgress />
              </div>
            </div>
          }
          codeContent={circleProgressCode}
        />
      </div>
    </div>
  );
};

// Linear progress component
const LinearProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const percentage = Math.round((scrollTop / maxScroll) * 100);
      
      setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (progressRef.current && valueRef.current) {
      anime.default({
        targets: progressRef.current,
        width: `${scrollPercentage}%`,
        easing: 'easeOutCubic',
        duration: 300
      });
      
      valueRef.current.textContent = `${scrollPercentage}%`;
    }
  }, [scrollPercentage]);

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between text-sm text-muted-foreground mb-1">
        <span>Page Progress</span>
        <span ref={valueRef}>0%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          ref={progressRef}
          className="h-full bg-primary rounded-full"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
};

// Circle progress component
const CircleProgress = () => {
  const circleRef = useRef<SVGCircleElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  const circleRadius = 40;
  const circumference = 2 * Math.PI * circleRadius;

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const percentage = Math.round((scrollTop / maxScroll) * 100);
      
      setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (circleRef.current && valueRef.current) {
      const offset = circumference - (scrollPercentage / 100) * circumference;
      
      anime({
        targets: circleRef.current,
        strokeDashoffset: offset,
        easing: 'easeOutCubic',
        duration: 300
      });
      
      valueRef.current.textContent = `${scrollPercentage}%`;
    }
  }, [scrollPercentage, circumference]);

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          className="stroke-muted fill-none"
          strokeWidth="4"
        />
        <circle
          ref={circleRef}
          cx="50"
          cy="50"
          r={circleRadius}
          className="stroke-primary fill-none"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
        />
      </svg>
      <div 
        ref={valueRef}
        className="absolute text-lg font-medium"
      >
        0%
      </div>
    </div>
  );
};

// Code block for linear progress
const linearProgressCode = `import { useState, useEffect, useRef } from "react";
import * as anime from "animejs";

const LinearProgress = () => {
  const progressRef = useRef(null);
  const valueRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const percentage = Math.round((scrollTop / maxScroll) * 100);
      
      setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (progressRef.current && valueRef.current) {
      anime.default({
        targets: progressRef.current,
        width: \`\${scrollPercentage}%\`,
        easing: 'easeOutCubic',
        duration: 300
      });
      
      valueRef.current.textContent = \`\${scrollPercentage}%\`;
    }
  }, [scrollPercentage]);

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between text-sm text-muted-foreground mb-1">
        <span>Page Progress</span>
        <span ref={valueRef}>0%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          ref={progressRef}
          className="h-full bg-primary rounded-full"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
};

export default LinearProgress;`;

// Code block for circle progress
const circleProgressCode = `import { useState, useEffect, useRef } from "react";
import * as anime from "animejs";

const CircleProgress = () => {
  const circleRef = useRef(null);
  const valueRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  const circleRadius = 40;
  const circumference = 2 * Math.PI * circleRadius;

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const percentage = Math.round((scrollTop / maxScroll) * 100);
      
      setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (circleRef.current && valueRef.current) {
      const offset = circumference - (scrollPercentage / 100) * circumference;
      
      anime.default({
        targets: circleRef.current,
        strokeDashoffset: offset,
        easing: 'easeOutCubic',
        duration: 300
      });
      
      valueRef.current.textContent = \`\${scrollPercentage}%\`;
    }
  }, [scrollPercentage, circumference]);

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          className="stroke-muted fill-none"
          strokeWidth="4"
        />
        <circle
          ref={circleRef}
          cx="50"
          cy="50"
          r={circleRadius}
          className="stroke-primary fill-none"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
        />
      </svg>
      <div 
        ref={valueRef}
        className="absolute text-lg font-medium"
      >
        0%
      </div>
    </div>
  );
};

export default CircleProgress;`;

export default ScrollProgressAnimation;
