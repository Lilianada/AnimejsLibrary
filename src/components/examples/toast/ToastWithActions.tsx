
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import * as animeModule from 'animejs';

const anime = animeModule.default;

interface ToastWithActionsProps {
  message: string;
  onAccept?: () => void;
  onDecline?: () => void;
  onClose?: () => void;
  acceptText?: string;
  declineText?: string;
}

const ToastWithActions = ({
  message,
  onAccept,
  onDecline,
  onClose,
  acceptText = "Accept",
  declineText = "Decline"
}: ToastWithActionsProps) => {
  const toastRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    if (!toastRef.current) return;
    
    anime({
      targets: toastRef.current,
      translateY: [-20, 0],
      opacity: [0, 1],
      easing: 'easeOutElastic(1, .8)',
      duration: 600
    });
  }, []);
  
  const handleClose = () => {
    if (!toastRef.current || !onClose) return;
    
    // Exit animation
    anime({
      targets: toastRef.current,
      translateY: [0, -20],
      opacity: [1, 0],
      easing: 'easeInQuad',
      duration: 300,
      complete: () => {
        if (onClose) onClose();
      }
    });
  };
  
  const handleAccept = () => {
    if (onAccept) onAccept();
    handleClose();
  };
  
  const handleDecline = () => {
    if (onDecline) onDecline();
    handleClose();
  };

  return (
    <div 
      ref={toastRef}
      className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-[350px]"
      style={{ opacity: 0 }}
    >
      <div className="mb-3 text-sm">{message}</div>
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDecline}
          className="h-8 px-3"
        >
          {declineText}
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleAccept}
          className="h-8 px-3"
        >
          {acceptText}
        </Button>
      </div>
    </div>
  );
};

export default ToastWithActions;

// Add the code export for the component
export const ToastWithActionsCode = `import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import * as animeModule from 'animejs';

const anime = animeModule.default;

interface ToastWithActionsProps {
  message: string;
  onAccept?: () => void;
  onDecline?: () => void;
  onClose?: () => void;
  acceptText?: string;
  declineText?: string;
}

const ToastWithActions = ({
  message,
  onAccept,
  onDecline,
  onClose,
  acceptText = "Accept",
  declineText = "Decline"
}: ToastWithActionsProps) => {
  const toastRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    if (!toastRef.current) return;
    
    anime({
      targets: toastRef.current,
      translateY: [-20, 0],
      opacity: [0, 1],
      easing: 'easeOutElastic(1, .8)',
      duration: 600
    });
  }, []);
  
  const handleClose = () => {
    if (!toastRef.current || !onClose) return;
    
    // Exit animation
    anime({
      targets: toastRef.current,
      translateY: [0, -20],
      opacity: [1, 0],
      easing: 'easeInQuad',
      duration: 300,
      complete: () => {
        if (onClose) onClose();
      }
    });
  };
  
  const handleAccept = () => {
    if (onAccept) onAccept();
    handleClose();
  };
  
  const handleDecline = () => {
    if (onDecline) onDecline();
    handleClose();
  };

  return (
    <div 
      ref={toastRef}
      className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-[350px]"
      style={{ opacity: 0 }}
    >
      <div className="mb-3 text-sm">{message}</div>
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDecline}
          className="h-8 px-3"
        >
          {declineText}
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleAccept}
          className="h-8 px-3"
        >
          {acceptText}
        </Button>
      </div>
    </div>
  );
};

export default ToastWithActions;
`;
