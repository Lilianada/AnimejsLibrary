
import React, { useState, useRef, useEffect } from 'react';
import * as animeJs from 'animejs';
import { Button } from '@/components/ui/button';

const anime = animeJs.default;

interface ToastWithActionsProps {
  message: string;
  onAccept?: () => void;
  onDecline?: () => void;
  duration?: number;
}

const ToastWithActions: React.FC<ToastWithActionsProps> = ({
  message,
  onAccept = () => {},
  onDecline = () => {},
  duration = 8000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Entrance animation
    if (toastRef.current) {
      anime({
        targets: toastRef.current,
        translateY: ['-100%', '0%'],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutCubic'
      });
    }
    
    // Progress bar animation
    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ['100%', '0%'],
        duration: duration,
        easing: 'linear'
      });
    }
    
    // Auto close after duration
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  const handleClose = () => {
    if (toastRef.current) {
      anime({
        targets: toastRef.current,
        translateY: ['0%', '-120%'],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInCubic',
        complete: () => {
          setIsVisible(false);
        }
      });
    }
  };
  
  const handleAccept = () => {
    onAccept();
    handleClose();
  };
  
  const handleDecline = () => {
    onDecline();
    handleClose();
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      ref={toastRef}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-card shadow-lg rounded-lg border border-border max-w-md w-full opacity-0"
      style={{ transform: 'translateY(-100%)' }}
    >
      <div className="p-4">
        <div className="mb-3 text-sm">{message}</div>
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDecline}
            className="text-xs"
          >
            Decline
          </Button>
          <Button 
            size="sm" 
            onClick={handleAccept}
            className="text-xs"
          >
            Accept
          </Button>
        </div>
        <div className="mt-2 h-0.5 w-full bg-card-foreground/10 rounded-full">
          <div 
            ref={progressRef}
            className="h-full rounded-full bg-primary"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ToastWithActions;

// Code snippet for documentation
export const ToastWithActionsCode = `import React, { useState, useRef, useEffect } from 'react';
import * as animeJs from 'animejs';
import { Button } from '@/components/ui/button';

const anime = animeJs.default;

interface ToastWithActionsProps {
  message: string;
  onAccept?: () => void;
  onDecline?: () => void;
  duration?: number;
}

const ToastWithActions: React.FC<ToastWithActionsProps> = ({
  message,
  onAccept = () => {},
  onDecline = () => {},
  duration = 8000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Entrance animation
    if (toastRef.current) {
      anime({
        targets: toastRef.current,
        translateY: ['-100%', '0%'],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutCubic'
      });
    }
    
    // Progress bar animation
    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: ['100%', '0%'],
        duration: duration,
        easing: 'linear'
      });
    }
    
    // Auto close after duration
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  const handleClose = () => {
    if (toastRef.current) {
      anime({
        targets: toastRef.current,
        translateY: ['0%', '-120%'],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInCubic',
        complete: () => {
          setIsVisible(false);
        }
      });
    }
  };
  
  const handleAccept = () => {
    onAccept();
    handleClose();
  };
  
  const handleDecline = () => {
    onDecline();
    handleClose();
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      ref={toastRef}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-card shadow-lg rounded-lg border border-border max-w-md w-full opacity-0"
      style={{ transform: 'translateY(-100%)' }}
    >
      <div className="p-4">
        <div className="mb-3 text-sm">{message}</div>
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDecline}
            className="text-xs"
          >
            Decline
          </Button>
          <Button 
            size="sm" 
            onClick={handleAccept}
            className="text-xs"
          >
            Accept
          </Button>
        </div>
        <div className="mt-2 h-0.5 w-full bg-muted rounded-full">
          <div 
            ref={progressRef}
            className="h-full rounded-full bg-primary"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ToastWithActions;`;
