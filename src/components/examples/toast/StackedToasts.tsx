import React, { useState, useRef, useEffect } from "react";
import * as anime from "animejs";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

const StackedToasts = () => {
  const [toasts, setToasts] = useState<Array<{id: string; type: string; message: string}>>([]);
  const toastContainerRef = useRef<HTMLDivElement>(null);
  
  const addToast = (type: string) => {
    const newToast = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      message: `This is a ${type} message`,
    };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after delay
    setTimeout(() => {
      removeToast(newToast.id);
    }, 3000);
  };
  
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  useEffect(() => {
    if (!toastContainerRef.current) return;
    
    // Animate new toasts when they are added
    const toastEls = toastContainerRef.current.querySelectorAll('.toast-item');
    if (toastEls.length > 0) {
      const newToast = toastEls[toastEls.length - 1];
      
      anime.default({
        targets: newToast,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 400,
        easing: 'easeOutExpo'
      });
    }
    
    // Adjust positions of existing toasts
    if (toastEls.length > 1) {
      for (let i = 0; i < toastEls.length - 1; i++) {
        anime.default({
          targets: toastEls[i],
          translateY: -((toastEls.length - 1 - i) * 4),
          scale: 1 - ((toastEls.length - 1 - i) * 0.05),
          duration: 300,
          easing: 'easeOutQuad'
        });
      }
    }
  }, [toasts]);
  
  const getToastIcon = (type: string) => {
    switch(type) {
      case "success": return <CheckCircle className="h-5 w-5" />;
      case "error": return <XCircle className="h-5 w-5" />;
      case "warning": return <AlertTriangle className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };
  
  const getToastColor = (type: string) => {
    switch(type) {
      case "success": return "bg-green-500 text-white";
      case "error": return "bg-red-500 text-white";
      case "warning": return "bg-amber-500 text-white";
      default: return "bg-blue-500 text-white";
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => addToast("info")}>
          Info Toast
        </Button>
        <Button onClick={() => addToast("success")}>
          Success Toast
        </Button>
        <Button onClick={() => addToast("warning")}>
          Warning Toast
        </Button>
        <Button onClick={() => addToast("error")}>
          Error Toast
        </Button>
      </div>
      
      <div className="relative h-48 border border-dashed border-border rounded-md flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Preview area</p>
        
        <div 
          ref={toastContainerRef}
          className="absolute bottom-4 right-4 flex flex-col-reverse items-end gap-2"
        >
          {toasts.map((toast, index) => (
            <div
              key={toast.id}
              className={`toast-item flex items-center gap-2 px-4 py-3 rounded-md shadow-lg ${getToastColor(toast.type)}`}
              style={{
                zIndex: 50 - index,
                transformOrigin: 'bottom right'
              }}
            >
              {getToastIcon(toast.type)}
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackedToasts;

export const StackToastsCode = `import React, { useState, useRef, useEffect } from "react";
import * as anime from "animejs";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

const StackedToasts = () => {
  const [toasts, setToasts] = useState([]);
  const toastContainerRef = useRef(null);
  
  const addToast = (type) => {
    const newToast = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      message: \`This is a \${type} message\`,
    };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after delay
    setTimeout(() => {
      removeToast(newToast.id);
    }, 3000);
  };
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  useEffect(() => {
    if (!toastContainerRef.current) return;
    
    // Animate new toasts when they are added
    const toastEls = toastContainerRef.current.querySelectorAll('.toast-item');
    if (toastEls.length > 0) {
      const newToast = toastEls[toastEls.length - 1];
      
      anime.default({
        targets: newToast,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 400,
        easing: 'easeOutExpo'
      });
    }
    
    // Adjust positions of existing toasts
    if (toastEls.length > 1) {
      for (let i = 0; i < toastEls.length - 1; i++) {
        anime.default({
          targets: toastEls[i],
          translateY: -((toastEls.length - 1 - i) * 4),
          scale: 1 - ((toastEls.length - 1 - i) * 0.05),
          duration: 300,
          easing: 'easeOutQuad'
        });
      }
    }
  }, [toasts]);
  
  function getToastIcon(type: string) {
    switch(type) {
      case "success": return <CheckCircle className="h-5 w-5" />;
      case "error": return <XCircle className="h-5 w-5" />;
      case "warning": return <AlertTriangle className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  }
  
  function getToastColor(type: string) {
    switch(type) {
      case "success": return "bg-green-500 text-white";
      case "error": return "bg-red-500 text-white";
      case "warning": return "bg-amber-500 text-white";
      default: return "bg-blue-500 text-white";
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => addToast("info")}>
          Info Toast
        </Button>
        <Button onClick={() => addToast("success")}>
          Success Toast
        </Button>
        <Button onClick={() => addToast("warning")}>
          Warning Toast
        </Button>
        <Button onClick={() => addToast("error")}>
          Error Toast
        </Button>
      </div>
      
      <div className="relative h-48 border border-dashed border-border rounded-md flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Preview area</p>
        
        <div 
          ref={toastContainerRef}
          className="absolute bottom-4 right-4 flex flex-col-reverse items-end gap-2"
        >
          {toasts.map((toast, index) => (
            <div
              key={toast.id}
              className={\`toast-item flex items-center gap-2 px-4 py-3 rounded-md shadow-lg \${getToastColor(toast.type)}\`}
              style={{
                zIndex: 50 - index,
                transformOrigin: 'bottom right'
              }}
            >
              {getToastIcon(toast.type)}
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`
