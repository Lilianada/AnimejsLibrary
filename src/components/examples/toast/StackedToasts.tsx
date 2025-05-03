
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import anime from 'animejs/lib/anime.es.js';
import useAnimeToast from './useAnimeToast';

const StackedToasts = () => {
  const { addToast, ToastWrapper } = useAnimeToast();
  
  const showMultipleToasts = () => {
    // Show multiple toasts with slight delay
    addToast({ message: "First notification", type: "info" });
    
    setTimeout(() => {
      addToast({ message: "Second notification", type: "success" });
    }, 300);
    
    setTimeout(() => {
      addToast({ message: "Third notification", type: "warning" });
    }, 600);
  };

  return (
    <ToastWrapper>
      <div className="flex flex-col gap-4 items-center">
        <Button onClick={showMultipleToasts}>
          Show Multiple Toasts
        </Button>
        <p className="text-sm text-muted-foreground max-w-md text-center">
          Click to trigger multiple toast notifications that stack with a visual depth effect.
        </p>
      </div>
    </ToastWrapper>
  );
};

export default StackedToasts;

// Code snippet for documentation
export const StackToastsCode = `import React from 'react';
import { Button } from '@/components/ui/button';
import anime from 'animejs/lib/anime.es.js';
import useAnimeToast from './useAnimeToast';

const StackedToasts = () => {
  const { addToast, ToastWrapper } = useAnimeToast();
  
  const showMultipleToasts = () => {
    // Show multiple toasts with slight delay
    addToast({ message: "First notification", type: "info" });
    
    setTimeout(() => {
      addToast({ message: "Second notification", type: "success" });
    }, 300);
    
    setTimeout(() => {
      addToast({ message: "Third notification", type: "warning" });
    }, 600);
  };

  return (
    <ToastWrapper>
      <div className="flex flex-col gap-4 items-center">
        <Button onClick={showMultipleToasts}>
          Show Multiple Toasts
        </Button>
        <p className="text-sm text-muted-foreground max-w-md text-center">
          Click to trigger multiple toast notifications that stack with a visual depth effect.
        </p>
      </div>
    </ToastWrapper>
  );
};

export default StackedToasts;`;
