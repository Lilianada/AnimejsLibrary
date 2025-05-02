
import React, { useRef } from "react";
import anime from "animejs";
import { CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
}

const AnimeToast = ({ message, type = "info", duration = 3000, onClose }: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
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
  
  React.useEffect(() => {
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
      className={`${bgColors[type]} text-white rounded-md shadow-lg max-w-xs w-full opacity-0 overflow-hidden`}
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

export default AnimeToast;

export const AnimeToastContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
      {children}
    </div>
  );
};
