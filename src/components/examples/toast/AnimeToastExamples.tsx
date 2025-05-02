import React, { useRef, useState, useEffect } from "react";
import * as anime from "animejs";
import { Button } from "@/components/ui/button";
import { CodeToggle } from "../CodeToggle";
import { CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

interface ToastProps {
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
    anime.animate(toastRef.current, {
      opacity: [0, 1],
      translateX: ["100%", "0%"],
      duration: 400,
      easing: "easeOutExpo"
    });
    
    // Animate progress bar
    anime.animate(progressRef.current, {
      width: ["100%", "0%"],
      duration: duration,
      easing: "linear"
    });
    
    // Close toast after duration
    const timer = setTimeout(() => {
      if (toastRef.current) {
        anime.animate(toastRef.current, {
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
    
    anime.animate(toastRef.current, {
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

const AnimeToastContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
      {children}
    </div>
  );
};

const useAnimeToast = () => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);
  
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
  
  const ToastWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        {children}
        <AnimeToastContainer>
          {toasts.map(toast => (
            <AnimeToast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimeToastContainer>
      </>
    );
  };
  
  return { addToast, removeToast, ToastWrapper };
};

const useToastCode = `import React, { useRef, useState } from "react";
import * as anime from "animejs";
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
  
  React.useEffect(() => {
    if (!toastRef.current || !progressRef.current) return;
    
    // Animate toast entrance
    anime.animate(toastRef.current, {
      opacity: [0, 1],
      translateX: ["100%", "0%"],
      duration: 400,
      easing: "easeOutExpo"
    });
    
    // Animate progress bar
    anime.animate(progressRef.current, {
      width: ["100%", "0%"],
      duration: duration,
      easing: "linear"
    });
    
    // Close toast after duration
    const timer = setTimeout(() => {
      if (toastRef.current) {
        anime.animate(toastRef.current, {
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
    
    anime.animate(toastRef.current, {
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

const AnimeToastContainer = ({ children }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
      {children}
    </div>
  );
};

const useAnimeToast = () => {
  const [toasts, setToasts] = useState([]);
  
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
  
  const ToastWrapper = ({ children }) => {
    return (
      <>
        {children}
        <AnimeToastContainer>
          {toasts.map(toast => (
            <AnimeToast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimeToastContainer>
      </>
    );
  };
  
  return { addToast, removeToast, ToastWrapper };
};`;

const ToastWithActionsCode = `import React, { useRef } from "react";
import * as anime from "animejs";
import { Button } from "@/components/ui/button";

const ToastWithActions = () => {
  const toastRef = useRef(null);
  
  React.useEffect(() => {
    if (!toastRef.current) return;
    
    anime.animate(toastRef.current, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
      easing: "easeOutExpo"
    });
    
    const timer = setTimeout(() => {
      dismissToast();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const dismissToast = () => {
    if (!toastRef.current) return;
    
    anime.animate(toastRef.current, {
      opacity: 0,
      translateY: 10,
      duration: 300,
      easing: "easeInExpo",
      complete: () => {
        if (toastRef.current) {
          toastRef.current.style.display = "none";
        }
      }
    });
  };
  
  return (
    <div 
      ref={toastRef}
      className="bg-background border border-border rounded-md shadow-lg p-4 w-full max-w-xs opacity-0"
    >
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium">New update available</h4>
        <p className="text-sm text-muted-foreground">
          A new software update is available for download.
        </p>
        <div className="flex items-center justify-end space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={dismissToast}
          >
            Not now
          </Button>
          <Button 
            size="sm" 
            onClick={() => {
              alert("Update initiated!");
              dismissToast();
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

const StackToastsCode = `import React, { useState, useRef, useEffect } from "react";
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
      
      anime.animate(newToast, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 400,
        easing: 'easeOutExpo'
      });
    }
    
    // Adjust positions of existing toasts
    if (toastEls.length > 1) {
      for (let i = 0; i < toastEls.length - 1; i++) {
        anime.animate(toastEls[i], {
          translateY: -((toastEls.length - 1 - i) * 4),
          scale: 1 - ((toastEls.length - 1 - i) * 0.05),
          duration: 300,
          easing: 'easeOutQuad'
        });
      }
    }
  }, [toasts]);
  
  const getToastIcon = (type) => {
    switch(type) {
      case "success": return <CheckCircle className="h-5 w-5" />;
      case "error": return <XCircle className="h-5 w-5" />;
      case "warning": return <AlertTriangle className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };
  
  const getToastColor = (type) => {
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
};

const AnimeToastDemoComponent = () => {
  const { addToast, ToastWrapper } = useAnimeToast();
  
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
        </div>
      </div>
    </ToastWrapper>
  );
};

const ToastWithActions = () => {
  const toastRef = useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (!toastRef.current) return;
    
    anime.animate(toastRef.current, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
      easing: "easeOutExpo"
    });
    
    const timer = setTimeout(() => {
      dismissToast();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const dismissToast = () => {
    if (!toastRef.current) return;
    
    anime.animate(toastRef.current, {
      opacity: 0,
      translateY: 10,
      duration: 300,
      easing: "easeInExpo",
      complete: () => {
        if (toastRef.current) {
          toastRef.current.style.display = "none";
        }
      }
    });
  };
  
  return (
    <div 
      ref={toastRef}
      className="bg-background border border-border rounded-md shadow-lg p-4 w-full max-w-xs opacity-0"
    >
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium">New update available</h4>
        <p className="text-sm text-muted-foreground">
          A new software update is available for download.
        </p>
        <div className="flex items-center justify-end space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={dismissToast}
          >
            Not now
          </Button>
          <Button 
            size="sm" 
            onClick={() => {
              alert("Update initiated!");
              dismissToast();
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

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
      
      anime.animate(newToast, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 400,
        easing: 'easeOutExpo'
      });
    }
    
    // Adjust positions of existing toasts
    if (toastEls.length > 1) {
      for (let i = 0; i < toastEls.length - 1; i++) {
        anime.animate(toastEls[i], {
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

const AnimeToastExamples = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Toast Animations with anime.js</h2>
        <p className="text-muted-foreground">
          Custom toast notification components using anime.js for smooth entrance, exit, and interactive animations. 
          These examples can be used as alternatives to standard toast libraries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeToggle
          previewContent={
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Animated Toast Hook</h3>
              <p className="text-sm text-muted-foreground">
                Click the buttons below to show different types of toast notifications.
              </p>
              <div className="py-4">
                <AnimeToastDemoComponent />
              </div>
            </div>
          }
          codeContent={useToastCode}
          className="w-full"
          minHeightClass="min-h-[500px]"
        />

        <CodeToggle
          previewContent={
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Toast With Action Buttons</h3>
              <p className="text-sm text-muted-foreground">
                Toast notification with interactive action buttons.
              </p>
              <div className="py-8 flex justify-center">
                <ToastWithActions />
              </div>
            </div>
          }
          codeContent={ToastWithActionsCode}
          className="w-full"
          minHeightClass="min-h-[500px]"
        />

        <CodeToggle
          previewContent={
            <div className="space-y-4 col-span-1 lg:col-span-2">
              <h3 className="text-lg font-semibold">Stacked Toast Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Multiple toast notifications with a stacking effect.
              </p>
              <div className="py-6">
                <StackedToasts />
              </div>
            </div>
          }
          codeContent={StackToastsCode}
          className="w-full"
          minHeightClass="min-h-[500px]"
        />
      </div>
    </div>
  );
};

export default AnimeToastExamples;
