import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import anime from 'animejs/lib/anime.es.js';

interface StackedToast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const StackedToasts = () => {
  const [toasts, setToasts] = useState<StackedToast[]>([]);
  const toastContainerRef = useRef<HTMLDivElement>(null);
  
  // Generate a unique ID for each toast
  const generateId = () => Math.random().toString(36).substring(2, 9);
  
  // Add a toast to the stack
  const addToast = (type: 'success' | 'error' | 'info' | 'warning') => {
    const id = generateId();
    const newToast = {
      id,
      message: `This is a ${type} message.`,
      type
    };
    
    setToasts(prev => [newToast, ...prev]);
    
    // Auto-remove toast after delay
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };
  
  // Remove a toast from the stack
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  // Animate toasts when stack changes
  useEffect(() => {
    if (!toastContainerRef.current) return;
    
    const toastElements = toastContainerRef.current.querySelectorAll('.stacked-toast');
    
    // Animate each toast based on its position in stack
    toastElements.forEach((toast, index) => {
      if (index > 0) {
        // Scale and shift stacked toasts
        anime({
          targets: toast,
          translateY: index * 4, // 4px vertical offset for each toast
          scale: 1 - (index * 0.05), // Slight scale down for depth effect
          opacity: 1 - (index * 0.2), // Fade for depth effect
          zIndex: 50 - index, // Ensure proper stacking
          duration: 300,
          easing: 'easeOutQuad'
        });
      } else {
        // Reset animation for the front toast
        anime({
          targets: toast,
          translateY: 0,
          scale: 1,
          opacity: 1,
          zIndex: 50,
          duration: 300,
          easing: 'easeOutQuad'
        });
      }
    });
  }, [toasts]);
  
  // Get background color based on toast type
  const getToastColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-[#4ade80]/10 border-[#4ade80]/30';
      case 'error': return 'bg-[#f43f5e]/10 border-[#f43f5e]/30';
      case 'warning': return 'bg-[#fb923c]/10 border-[#fb923c]/30';
      case 'info':
      default: return 'bg-[#38bdf8]/10 border-[#38bdf8]/30';
    }
  };
  
  // Get icon color based on toast type
  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-[#4ade80]';
      case 'error': return 'text-[#f43f5e]';
      case 'warning': return 'text-[#fb923c]';
      case 'info':
      default: return 'text-[#38bdf8]';
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" onClick={() => addToast('info')}>Show Info Toast</Button>
        <Button variant="outline" onClick={() => addToast('success')}>Show Success Toast</Button>
        <Button variant="outline" onClick={() => addToast('warning')}>Show Warning Toast</Button>
        <Button variant="outline" onClick={() => addToast('error')}>Show Error Toast</Button>
      </div>
      
      {/* Toast container with stacking effect */}
      <div ref={toastContainerRef} className="relative h-[80px] w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`stacked-toast absolute right-0 top-0 border rounded-lg p-3 
                        shadow-sm w-[300px] ${getToastColor(toast.type)}`}
            style={{
              transformOrigin: 'center right',
              willChange: 'transform, opacity',
            }}
          >
            <div className="flex items-center">
              <div className={`mr-2 ${getIconColor(toast.type)}`}>
                {toast.type === 'success' && <span>✓</span>}
                {toast.type === 'error' && <span>×</span>}
                {toast.type === 'warning' && <span>!</span>}
                {toast.type === 'info' && <span>i</span>}
              </div>
              <div className="flex-1">{toast.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedToasts;

// Export the code as a string for rendering in the code viewer
export const StackToastsCode = `import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import anime from 'animejs/lib/anime.es.js';

interface StackedToast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const StackedToasts = () => {
  const [toasts, setToasts] = useState<StackedToast[]>([]);
  const toastContainerRef = useRef<HTMLDivElement>(null);
  
  // Generate a unique ID for each toast
  const generateId = () => Math.random().toString(36).substring(2, 9);
  
  // Add a toast to the stack
  const addToast = (type: 'success' | 'error' | 'info' | 'warning') => {
    const id = generateId();
    const newToast = {
      id,
      message: \`This is a \${type} message.\`,
      type
    };
    
    setToasts(prev => [newToast, ...prev]);
    
    // Auto-remove toast after delay
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };
  
  // Remove a toast from the stack
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  // Animate toasts when stack changes
  useEffect(() => {
    if (!toastContainerRef.current) return;
    
    const toastElements = toastContainerRef.current.querySelectorAll('.stacked-toast');
    
    // Animate each toast based on its position in stack
    toastElements.forEach((toast, index) => {
      if (index > 0) {
        // Scale and shift stacked toasts
        anime({
          targets: toast,
          translateY: index * 4, // 4px vertical offset for each toast
          scale: 1 - (index * 0.05), // Slight scale down for depth effect
          opacity: 1 - (index * 0.2), // Fade for depth effect
          zIndex: 50 - index, // Ensure proper stacking
          duration: 300,
          easing: 'easeOutQuad'
        });
      } else {
        // Reset animation for the front toast
        anime({
          targets: toast,
          translateY: 0,
          scale: 1,
          opacity: 1,
          zIndex: 50,
          duration: 300,
          easing: 'easeOutQuad'
        });
      }
    });
  }, [toasts]);
  
  // Get background color based on toast type
  const getToastColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-[#4ade80]/10 border-[#4ade80]/30';
      case 'error': return 'bg-[#f43f5e]/10 border-[#f43f5e]/30';
      case 'warning': return 'bg-[#fb923c]/10 border-[#fb923c]/30';
      case 'info':
      default: return 'bg-[#38bdf8]/10 border-[#38bdf8]/30';
    }
  };
  
  // Get icon color based on toast type
  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-[#4ade80]';
      case 'error': return 'text-[#f43f5e]';
      case 'warning': return 'text-[#fb923c]';
      case 'info':
      default: return 'text-[#38bdf8]';
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" onClick={() => addToast('info')}>Show Info Toast</Button>
        <Button variant="outline" onClick={() => addToast('success')}>Show Success Toast</Button>
        <Button variant="outline" onClick={() => addToast('warning')}>Show Warning Toast</Button>
        <Button variant="outline" onClick={() => addToast('error')}>Show Error Toast</Button>
      </div>
      
      {/* Toast container with stacking effect */}
      <div ref={toastContainerRef} className="relative h-[80px] w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={\`stacked-toast absolute right-0 top-0 border rounded-lg p-3 
                        shadow-sm w-[300px] \${getToastColor(toast.type)}\`}
            style={{
              transformOrigin: 'center right',
              willChange: 'transform, opacity',
            }}
          >
            <div className="flex items-center">
              <div className={\`mr-2 \${getIconColor(toast.type)}\`}>
                {toast.type === 'success' && <span>✓</span>}
                {toast.type === 'error' && <span>×</span>}
                {toast.type === 'warning' && <span>!</span>}
                {toast.type === 'info' && <span>i</span>}
              </div>
              <div className="flex-1">{toast.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
`;
