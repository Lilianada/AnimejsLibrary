
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";
import anime from 'animejs/lib/anime.es.js';

interface AnimatedSubmitButtonProps {
  text: string;
  loadingText?: string;
  successText?: string;
  onClick?: () => Promise<void>;
  className?: string;
}

const AnimatedSubmitButton: React.FC<AnimatedSubmitButtonProps> = ({
  text = "Submit",
  loadingText = "Loading...",
  successText = "Success!",
  onClick,
  className = ""
}) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = async () => {
    if (status !== "idle") return;
    
    setStatus("loading");
    
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        scale: [1, 0.98],
        duration: 150,
        easing: "easeInOutQuad"
      });
    }
    
    try {
      if (onClick) {
        await onClick();
      } else {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      setStatus("success");
      
      if (buttonRef.current) {
        anime({
          targets: buttonRef.current,
          scale: [0.98, 1.05, 1],
          backgroundColor: ["#8b5cf6", "#10b981", "#8b5cf6"],
          duration: 600,
          easing: "easeOutElastic(1, .6)"
        });
      }
      
      // Reset after showing success
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
      
    } catch (error) {
      setStatus("idle");
      console.error("Submission error:", error);
    }
  };

  return (
    <Button
      ref={buttonRef}
      onClick={handleClick}
      disabled={status !== "idle" && status !== "success"}
      className={`relative transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Idle state */}
      <span className={`flex items-center gap-2 transition-opacity ${status !== "idle" ? "opacity-0" : "opacity-100"}`}>
        {text}
      </span>
      
      {/* Loading state */}
      <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${status !== "loading" ? "opacity-0" : "opacity-100"}`}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {loadingText}
      </span>
      
      {/* Success state */}
      <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${status !== "success" ? "opacity-0" : "opacity-100"}`}>
        <Check className="mr-2 h-4 w-4" />
        {successText}
      </span>
    </Button>
  );
};

export default AnimatedSubmitButton;

export const animatedSubmitButtonCode = `import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";
import anime from 'animejs/lib/anime.es.js';

interface AnimatedSubmitButtonProps {
  text: string;
  loadingText?: string;
  successText?: string;
  onClick?: () => Promise<void>;
  className?: string;
}

const AnimatedSubmitButton = ({
  text = "Submit",
  loadingText = "Loading...", 
  successText = "Success!",
  onClick,
  className = ""
}) => {
  const [status, setStatus] = useState("idle");
  const buttonRef = React.useRef(null);

  const handleClick = async () => {
    if (status !== "idle") return;
    
    setStatus("loading");
    
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        scale: [1, 0.98],
        duration: 150,
        easing: "easeInOutQuad"
      });
    }
    
    try {
      if (onClick) {
        await onClick();
      } else {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      setStatus("success");
      
      if (buttonRef.current) {
        anime({
          targets: buttonRef.current,
          scale: [0.98, 1.05, 1],
          backgroundColor: ["#8b5cf6", "#10b981", "#8b5cf6"],
          duration: 600,
          easing: "easeOutElastic(1, .6)"
        });
      }
      
      // Reset after showing success
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
      
    } catch (error) {
      setStatus("idle");
      console.error("Submission error:", error);
    }
  };

  return (
    <Button
      ref={buttonRef}
      onClick={handleClick}
      disabled={status !== "idle" && status !== "success"}
      className={\`relative transition-all duration-300 overflow-hidden \${className}\`}
    >
      {/* Idle state */}
      <span className={\`flex items-center gap-2 transition-opacity \${status !== "idle" ? "opacity-0" : "opacity-100"}\`}>
        {text}
      </span>
      
      {/* Loading state */}
      <span className={\`absolute inset-0 flex items-center justify-center transition-opacity \${status !== "loading" ? "opacity-0" : "opacity-100"}\`}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {loadingText}
      </span>
      
      {/* Success state */}
      <span className={\`absolute inset-0 flex items-center justify-center transition-opacity \${status !== "success" ? "opacity-0" : "opacity-100"}\`}>
        <Check className="mr-2 h-4 w-4" />
        {successText}
      </span>
    </Button>
  );
};

export default AnimatedSubmitButton;`;
