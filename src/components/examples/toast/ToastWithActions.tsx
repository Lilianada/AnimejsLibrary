
import React, { useRef, useState, useEffect } from "react";
import * as anime from "animejs";
import { Button } from "@/components/ui/button";

const ToastWithActions = () => {
  const toastRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  
  // Only run the effect once on mount
  useEffect(() => {
    if (!toastRef.current) return;
    
    anime.default({
      targets: toastRef.current,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
      easing: "easeOutExpo"
    });
    
    // Set a longer timeout and store the ID
    const timer = setTimeout(() => {
      dismissToast();
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const dismissToast = () => {
    if (!toastRef.current || !visible) return;
    
    setVisible(false);
    anime.default({
      targets: toastRef.current,
      opacity: 0,
      translateY: 10,
      duration: 300,
      easing: "easeInExpo",
      complete: () => {
        if (toastRef.current) {
          toastRef.current.style.display = "none";
        }
      }
    });
  };
  
  // Show a new toast if the previous one was dismissed
  const resetToast = () => {
    setVisible(true);
    if (toastRef.current) {
      toastRef.current.style.display = "block";
      anime.default({
        targets: toastRef.current,
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 400,
        easing: "easeOutExpo"
      });
    }
  };
  
  if (!visible) {
    return (
      <div className="flex justify-center">
        <Button onClick={resetToast}>Show Toast Again</Button>
      </div>
    );
  }
  
  return (
    <div 
      ref={toastRef}
      className="bg-background border border-border rounded-md shadow-lg p-4 w-full max-w-xs"
      style={{ pointerEvents: "auto" }} // Ensure hover works correctly
    >
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium">New update available</h4>
        <p className="text-sm text-muted-foreground">
          A new software update is available for download.
        </p>
        <div className="flex items-center justify-end space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={dismissToast}
          >
            Not now
          </Button>
          <Button 
            size="sm" 
            onClick={() => {
              alert("Update initiated!");
              dismissToast();
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToastWithActions;

export const ToastWithActionsCode = `import React, { useRef, useEffect } from "react";
import anime from "animejs";
import { Button } from "@/components/ui/button";

const ToastWithActions = () => {
  const toastRef = useRef(null);
  
  useEffect(() => {
    if (!toastRef.current) return;
    
    anime({
      targets: toastRef.current,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
      easing: "easeOutExpo"
    });
    
    const timer = setTimeout(() => {
      dismissToast();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const dismissToast = () => {
    if (!toastRef.current) return;
    
    anime({
      targets: toastRef.current,
      opacity: 0,
      translateY: 10,
      duration: 300,
      easing: "easeInExpo",
      complete: () => {
        if (toastRef.current) {
          toastRef.current.style.display = "none";
        }
      }
    });
  };
  
  return (
    <div 
      ref={toastRef}
      className="bg-background border border-border rounded-md shadow-lg p-4 w-full max-w-xs opacity-0"
    >
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium">New update available</h4>
        <p className="text-sm text-muted-foreground">
          A new software update is available for download.
        </p>
        <div className="flex items-center justify-end space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={dismissToast}
          >
            Not now
          </Button>
          <Button 
            size="sm" 
            onClick={() => {
              alert("Update initiated!");
              dismissToast();
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};`;
