
import React from "react";
import { Button } from "@/components/ui/button";
import useAnimeToast from "./useAnimeToast";

const AnimeToastDemoComponent = () => {
  const { addToast, ToastWrapper } = useAnimeToast();
  
  // Function to show multiple toasts at once for demonstration
  const showMultipleToasts = () => {
    addToast({ message: "First toast message" });
    setTimeout(() => addToast({ message: "Second toast message", type: "success" }), 200);
    setTimeout(() => addToast({ message: "Third toast message", type: "warning" }), 400);
  };
  
  return (
    <ToastWrapper>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => addToast({ message: "This is an info message" })}>
            Show Info Toast
          </Button>
          <Button onClick={() => addToast({ message: "Operation successful!", type: "success" })}>
            Show Success Toast
          </Button>
          <Button onClick={() => addToast({ message: "Warning: Low disk space", type: "warning" })}>
            Show Warning Toast
          </Button>
          <Button onClick={() => addToast({ message: "Error: Failed to save changes", type: "error" })}>
            Show Error Toast
          </Button>
          <Button onClick={showMultipleToasts} variant="default" className="bg-purple-600 hover:bg-purple-700 text-white">
            Show Multiple Toasts
          </Button>
        </div>
      </div>
    </ToastWrapper>
  );
};

export default AnimeToastDemoComponent;

export const useToastCode = `import React, { useRef, useState, useEffect } from "react";
import anime from "animejs";
import { CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

const AnimeToast = ({ message, type = "info", duration = 3000, onClose }: ToastProps) => {
  const toastRef = useRef(null);
  const progressRef = useRef(null);
  
  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500"
  };
  
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-white" />,
    error: <XCircle className="h-5 w-5 text-white" />,
    warning: <AlertTriangle className="h-5 w-5 text-white" />,
    info: <Info className="h-5 w-5 text-white" />
  };
  
  useEffect(() => {
    if (!toastRef.current || !progressRef.current) return;
    
    // Animate toast entrance
    anime({
      targets: toastRef.current,
      opacity: [0, 1],
      translateX: ["100%", "0%"],
      duration: 400,
      easing: "easeOutExpo"
    });
    
    // Animate progress bar
    anime({
      targets: progressRef.current,
      width: ["100%", "0%"],
      duration: duration,
      easing: "linear"
    });
    
    // Close toast after duration
    const timer = setTimeout(() => {
      if (toastRef.current) {
        anime({
          targets: toastRef.current,
          opacity: 0,
          translateX: "100%",
          duration: 300,
          easing: "easeInExpo",
          complete: () => {
            if (onClose) onClose();
          }
        });
      }
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  const handleClose = () => {
    if (!toastRef.current) return;
    
    anime({
      targets: toastRef.current,
      opacity: 0,
      translateX: "100%",
      duration: 300,
      easing: "easeInExpo",
      complete: () => {
        if (onClose) onClose();
      }
    });
  };
  
  return (
    <div 
      ref={toastRef}
      className={\`\${bgColors[type]} text-white rounded-md shadow-lg max-w-xs w-full opacity-0 overflow-hidden\`}
    >
      <div className="flex items-start p-3 pr-2">
        <div className="flex-shrink-0 mr-2">
          {icons[type]}
        </div>
        <div className="flex-1 mr-2">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button 
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
          onClick={handleClose}
        >
          <XCircle className="h-4 w-4 text-white" />
        </button>
      </div>
      <div className="h-1 w-full bg-black/10">
        <div ref={progressRef} className="h-full bg-white/30"></div>
      </div>
    </div>
  );
};

// Updated container to handle stacking effect like sonner
const useAnimeToast = () => {
  const [toasts, setToasts] = useState([]);
  const containerRef = useRef(null);
  
  const addToast = (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    
    // Auto remove after duration + animation time
    setTimeout(() => {
      removeToast(id);
    }, (toast.duration || 3000) + 300);
    
    return id;
  };
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  // Handle stacking effect when toasts count changes
  useEffect(() => {
    if (!containerRef.current) return;
    
    const toastElements = containerRef.current.querySelectorAll('.anime-toast-item');
    if (toastElements.length <= 1) return;
    
    // Animate stacked toasts
    for (let i = 0; i < toastElements.length - 1; i++) {
      const translateY = -6 * (toastElements.length - 1 - i);
      const scale = 1 - 0.05 * (toastElements.length - 1 - i);
      
      anime({
        targets: toastElements[i],
        translateY: translateY,
        scale: scale,
        opacity: 0.9 - (0.1 * (toastElements.length - 1 - i)),
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  }, [toasts]);
  
  const ToastWrapper = ({ children }) => {
    return (
      <>
        {children}
        <div ref={containerRef} className="fixed top-4 right-4 z-50 flex flex-col-reverse gap-2 items-end">
          {toasts.map(toast => (
            <div className="anime-toast-item" key={toast.id} style={{transformOrigin: 'top right'}}>
              <AnimeToast
                message={toast.message}
                type={toast.type}
                duration={toast.duration}
                onClose={() => removeToast(toast.id)}
              />
            </div>
          ))}
        </div>
      </>
    );
  };
  
  return { addToast, removeToast, ToastWrapper };
};`;
