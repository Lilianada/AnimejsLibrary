
import React from "react";
import { Button } from "@/components/ui/button";
import useAnimeToast from "./useAnimeToast";

const AnimeToastDemoComponent = () => {
  const { addToast } = useAnimeToast();
  
  const showSuccessToast = () => {
    addToast({
      message: 'Operation completed successfully!',
      type: 'success',
      duration: 3000
    });
  };
  
  const showErrorToast = () => {
    addToast({
      message: 'An error occurred during the operation.',
      type: 'error',
      duration: 5000
    });
  };
  
  const showInfoToast = () => {
    addToast({
      message: 'Here is some information for you.',
      type: 'info',
      duration: 3000
    });
  };
  
  const showWarningToast = () => {
    addToast({
      message: 'Please be cautious with this action.',
      type: 'warning',
      duration: 4000
    });
  };
  
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={showSuccessToast} variant="default">
        Success Toast
      </Button>
      <Button onClick={showErrorToast} variant="destructive">
        Error Toast
      </Button>
      <Button onClick={showInfoToast} variant="secondary">
        Info Toast
      </Button>
      <Button onClick={showWarningToast} variant="outline">
        Warning Toast
      </Button>
    </div>
  );
};

export default AnimeToastDemoComponent;

// Export code for documentation purposes
export const useToastCode = `import React, { useState, useRef, useEffect } from "react";
import anime from 'animejs';

// AnimeToast.tsx - Main toast component
const AnimeToast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const toastRef = useRef(null);
  const progressRef = useRef(null);
  
  // Get toast color based on type
  const getToastColor = () => {
    switch (type) {
      case 'success': return '#4ade80';
      case 'error': return '#f43f5e';
      case 'warning': return '#fb923c';
      case 'info':
      default: return '#38bdf8';
    }
  };
  
  // Animate toast entrance
  useEffect(() => {
    if (!toastRef.current) return;

    // Animate entrance
    anime({
      targets: toastRef.current,
      translateX: [30, 0],
      opacity: [0, 1],
      easing: 'easeOutQuad',
      duration: 300
    });

    // Animate progress bar
    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ['100%', '0%'],
        easing: 'linear',
        duration: duration
      });
    }

    // Exit animation when done
    const timer = setTimeout(() => {
      anime({
        targets: toastRef.current,
        translateX: [0, 30],
        opacity: [1, 0],
        easing: 'easeInQuad',
        duration: 300,
        complete: () => {
          if (onClose) onClose();
        }
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  return (
    <div
      ref={toastRef}
      className="bg-card border rounded-lg min-w-[250px] max-w-[350px] opacity-0 shadow-md"
      style={{
        borderLeftColor: getToastColor(),
        borderLeftWidth: '4px',
        transform: 'translateX(30px)'
      }}
    >
      <div className="px-4 py-3">
        <div className="text-sm">{message}</div>
        <div className="mt-2 h-1 rounded-full bg-muted">
          <div 
            ref={progressRef}
            className="h-full rounded-full"
            style={{ backgroundColor: getToastColor(), width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

// Hook for easy toast management
const useAnimeToast = () => {
  const [toasts, setToasts] = useState([]);
  
  const addToast = (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
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
  
  const ToastWrapper = ({ children }) => {
    return (
      <>
        {children}
        <div className="fixed top-4 right-4 z-50 flex flex-col-reverse gap-2">
          {toasts.map(toast => (
            <AnimeToast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </>
    );
  };
  
  return { addToast, removeToast, ToastWrapper };
};`;
