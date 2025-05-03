
import React, { useState, useRef, useEffect } from "react";
import anime from 'animejs';
import AnimeToast, { AnimeToastContainer, ToastProps } from "./AnimeToast";

const useAnimeToast = () => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const addToast = (toast: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    
    // Auto remove after duration + animation time
    setTimeout(() => {
      removeToast(id);
    }, (toast.duration || 3000) + 300);
    
    return id;
  };
  
  const removeToast = (id: string) => {
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
  
  const ToastWrapper = ({ children }: { children: React.ReactNode }) => {
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
};

export default useAnimeToast;
