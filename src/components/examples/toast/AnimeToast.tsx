
import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

// Toast container for easy positioning
export const AnimeToastContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="fixed top-4 right-4 z-50 flex flex-col-reverse gap-2 items-end">
    {children}
  </div>
);

// Main toast component
const AnimeToast = ({ message, type = 'info', duration = 3000, onClose }: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  // Get toast color based on type
  const getToastColor = () => {
    switch (type) {
      case 'success': return '#4ade80'; // green-500
      case 'error': return '#f43f5e'; // rose-500
      case 'warning': return '#fb923c'; // orange-400
      case 'info':
      default: return '#38bdf8'; // sky-400
    }
  };
  
  // Animate toast entrance
  useEffect(() => {
    if (!toastRef.current) return;

    // Animate toast entrance
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
        duration: duration,
        complete: () => {
          // Exit animation when done
          if (toastRef.current) {
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
          }
        }
      });
    }

    // Manual cleanup
    const timer = setTimeout(() => {
      if (toastRef.current) {
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
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  return (
    <div
      ref={toastRef}
      className="bg-card border shadow-md rounded-lg min-w-[250px] max-w-[350px] opacity-0 transform translate-x-8"
      style={{
        borderLeftColor: getToastColor(),
        borderLeftWidth: '4px'
      }}
    >
      <div className="px-4 py-3">
        <div className="text-sm">{message}</div>
        <div className="mt-2 h-1 rounded-full bg-card-foreground/10">
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

export default AnimeToast;
