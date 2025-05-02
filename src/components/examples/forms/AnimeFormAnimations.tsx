
import React, { useEffect, useRef, useState } from "react";
import * as anime from "animejs";
import { Button } from "@/components/ui/button";
import { CodeToggle } from "../CodeToggle";
import AnimationShowcaseCard from "../AnimationShowcaseCard";
import { CheckCircle } from "lucide-react";

const AnimatedInput = ({ label, type = "text" }: { label: string; type?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;
    
    const borderElement = containerRef.current.querySelector(".input-border");
    const labelElement = containerRef.current.querySelector(".input-label");
    
    if (isFocused || value) {
      anime.animate(labelElement, {
        translateY: -20,
        scale: 0.85,
        color: "hsl(var(--primary))",
        duration: 300,
        easing: "easeOutQuad"
      });
      
      anime.animate(borderElement, {
        width: "100%",
        duration: 350,
        easing: "easeOutQuad"
      });
    } else {
      anime.animate(labelElement, {
        translateY: 0,
        scale: 1,
        color: "hsl(var(--muted-foreground))",
        duration: 300,
        easing: "easeOutQuad"
      });
      
      anime.animate(borderElement, {
        width: "0%",
        duration: 350,
        easing: "easeOutQuad"
      });
    }
  }, [isFocused, value]);
  
  return (
    <div ref={containerRef} className="relative mb-6 group">
      <label className="input-label absolute left-3 top-2.5 text-muted-foreground transition-all origin-left cursor-text">
        {label}
      </label>
      <input
        type={type}
        className="w-full h-10 px-3 pt-5 pb-2 bg-transparent border border-border rounded-md focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <span className="input-border block h-0.5 w-0 bg-primary absolute bottom-0 left-0 mx-3 transition-all" />
    </div>
  );
};

const ValidationInput = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const validationTimeout = useRef<NodeJS.Timeout | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (validationTimeout.current) {
      clearTimeout(validationTimeout.current);
    }

    if (value.length === 0) {
      setIsValid(null);
      return;
    }
    
    validationTimeout.current = setTimeout(() => {
      // Simple email validation pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailPattern.test(value);
      setIsValid(isValidEmail);
      
      // Animate validation response
      if (!containerRef.current || !messageRef.current) return;
      
      const inputBorder = containerRef.current.querySelector('.input-container');
      
      if (isValidEmail) {
        anime.animate(inputBorder, {
          borderColor: ['hsl(var(--border))', 'hsl(142, 76%, 36%)'],
          duration: 400,
          easing: 'easeOutQuad'
        });
        
        anime.animate(messageRef.current, {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 400,
          easing: 'easeOutQuad'
        });
      } else {
        anime.animate(inputBorder, {
          borderColor: ['hsl(var(--border))', 'hsl(0, 84%, 60%)'],
          duration: 400,
          easing: 'easeOutQuad'
        });
        
        anime.animate(messageRef.current, {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 400,
          easing: 'easeOutQuad'
        });
      }
    }, 500);
    
    return () => {
      if (validationTimeout.current) {
        clearTimeout(validationTimeout.current);
      }
    };
  }, [value]);
  
  return (
    <div ref={containerRef} className="space-y-2">
      <div 
        className={`input-container border ${
          isValid === null 
            ? 'border-border' 
            : isValid 
              ? 'border-green-600' 
              : 'border-red-500'
        } rounded-md transition-colors relative overflow-hidden`}
      >
        <input
          type="email"
          className="w-full h-10 px-3 bg-background focus:outline-none"
          placeholder="Enter your email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {isValid && (
          <span className="absolute right-3 top-2.5 text-green-600">
            <CheckCircle className="h-5 w-5" />
          </span>
        )}
      </div>
      
      {isValid !== null && (
        <div 
          ref={messageRef} 
          className={`text-sm ${isValid ? 'text-green-600' : 'text-red-500'} opacity-0`}
        >
          {isValid 
            ? 'Email is valid!' 
            : 'Please enter a valid email address'}
        </div>
      )}
    </div>
  );
};

const FormEntrance = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (!formRef.current) return;
    
    const formItems = formRef.current.querySelectorAll('.form-item');
    
    anime.animate(formItems, {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 800,
      easing: 'easeOutElastic(1, 0.7)',
      delay: anime.stagger(100)
    });
  }, []);
  
  return (
    <form ref={formRef} className="space-y-4 p-5 border border-border rounded-lg">
      <div className="form-item opacity-0">
        <label className="block text-sm mb-1">First Name</label>
        <input 
          className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          type="text" 
        />
      </div>
      
      <div className="form-item opacity-0">
        <label className="block text-sm mb-1">Last Name</label>
        <input 
          className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          type="text"
        />
      </div>
      
      <div className="form-item opacity-0">
        <label className="block text-sm mb-1">Email</label>
        <input 
          className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          type="email"
        />
      </div>
      
      <div className="form-item opacity-0">
        <Button className="w-full">Submit</Button>
      </div>
    </form>
  );
};

const AnimatedSubmitButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dotRef1 = useRef<HTMLSpanElement>(null);
  const dotRef2 = useRef<HTMLSpanElement>(null);
  const dotRef3 = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const checkRef = useRef<HTMLSpanElement>(null);
  
  const handleClick = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Animate button width
    anime.animate(buttonRef.current, {
      width: '120px',
      duration: 300,
      easing: 'easeInOutQuad',
      complete: () => {
        if (!textRef.current || !dotRef1.current || !dotRef2.current || !dotRef3.current) return;
        
        // Hide text
        anime.animate(textRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 200,
          easing: 'easeInOutQuad'
        });
        
        // Show and animate dots
        const dots = [dotRef1.current, dotRef2.current, dotRef3.current];
        
        dots.forEach((dot, index) => {
          anime.animate(dot, {
            opacity: 1,
            translateY: [0, -10, 0],
            duration: 600,
            delay: index * 150,
            loop: true,
            easing: 'easeInOutSine'
          });
        });
        
        // Simulate API call with timeout
        setTimeout(() => {
          // Hide dots
          dots.forEach((dot) => {
            anime.animate(dot, {
              opacity: 0,
              duration: 200
            });
          });
          
          // Show check icon
          if (checkRef.current) {
            anime.animate(checkRef.current, {
              opacity: 1,
              scale: [0.5, 1.2, 1],
              duration: 400,
              easing: 'easeOutBack'
            });
          }
          
          // Reset after 1.5s
          setTimeout(() => {
            // Reset button width
            anime.animate(buttonRef.current, {
              width: '180px',
              duration: 300,
              easing: 'easeInOutQuad'
            });
            
            // Hide check icon
            if (checkRef.current) {
              anime.animate(checkRef.current, {
                opacity: 0,
                scale: 0.5,
                duration: 200
              });
            }
            
            // Show text again
            if (textRef.current) {
              anime.animate(textRef.current, {
                opacity: 1,
                scale: 1,
                duration: 200,
                easing: 'easeInOutQuad'
              });
            }
            
            setIsLoading(false);
          }, 1500);
        }, 2000);
      }
    });
  };
  
  return (
    <div className="flex justify-center">
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={isLoading}
        className="relative h-10 w-[180px] bg-primary rounded-md text-white font-medium flex items-center justify-center overflow-hidden"
      >
        <span ref={textRef} className="transition-opacity">
          Submit Form
        </span>
        
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <span ref={dotRef1} className="h-2 w-2 bg-white rounded-full opacity-0"></span>
          <span ref={dotRef2} className="h-2 w-2 bg-white rounded-full opacity-0"></span>
          <span ref={dotRef3} className="h-2 w-2 bg-white rounded-full opacity-0"></span>
        </div>
        
        <span 
          ref={checkRef}
          className="absolute inset-0 flex items-center justify-center text-white opacity-0"
        >
          <CheckCircle className="h-6 w-6" />
        </span>
      </button>
    </div>
  );
};

// Form animations example code for export
const animatedInputCode = `import React, { useEffect, useRef, useState } from "react";
import * as anime from "animejs";

const AnimatedInput = ({ label, type = "text" }) => {
  const containerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;
    
    const borderElement = containerRef.current.querySelector(".input-border");
    const labelElement = containerRef.current.querySelector(".input-label");
    
    if (isFocused || value) {
      anime.animate(labelElement, {
        translateY: -20,
        scale: 0.85,
        color: "hsl(var(--primary))",
        duration: 300,
        easing: "easeOutQuad"
      });
      
      anime.animate(borderElement, {
        width: "100%",
        duration: 350,
        easing: "easeOutQuad"
      });
    } else {
      anime.animate(labelElement, {
        translateY: 0,
        scale: 1,
        color: "hsl(var(--muted-foreground))",
        duration: 300,
        easing: "easeOutQuad"
      });
      
      anime.animate(borderElement, {
        width: "0%",
        duration: 350,
        easing: "easeOutQuad"
      });
    }
  }, [isFocused, value]);
  
  return (
    <div ref={containerRef} className="relative mb-6 group">
      <label className="input-label absolute left-3 top-2.5 text-muted-foreground transition-all origin-left cursor-text">
        {label}
      </label>
      <input
        type={type}
        className="w-full h-10 px-3 pt-5 pb-2 bg-transparent border border-border rounded-md focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <span className="input-border block h-0.5 w-0 bg-primary absolute bottom-0 left-0 mx-3 transition-all" />
    </div>
  );
};`;

const validationInputCode = `import React, { useEffect, useRef, useState } from "react";
import * as anime from "animejs";
import { CheckCircle } from "lucide-react";

const ValidationInput = () => {
  const containerRef = useRef(null);
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(null);
  const validationTimeout = useRef(null);
  const messageRef = useRef(null);
  
  useEffect(() => {
    if (validationTimeout.current) {
      clearTimeout(validationTimeout.current);
    }

    if (value.length === 0) {
      setIsValid(null);
      return;
    }
    
    validationTimeout.current = setTimeout(() => {
      // Simple email validation pattern
      const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      const isValidEmail = emailPattern.test(value);
      setIsValid(isValidEmail);
      
      // Animate validation response
      if (!containerRef.current || !messageRef.current) return;
      
      const inputBorder = containerRef.current.querySelector('.input-container');
      
      if (isValidEmail) {
        anime.animate(inputBorder, {
          borderColor: ['hsl(var(--border))', 'hsl(142, 76%, 36%)'],
          duration: 400,
          easing: 'easeOutQuad'
        });
        
        anime.animate(messageRef.current, {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 400,
          easing: 'easeOutQuad'
        });
      } else {
        anime.animate(inputBorder, {
          borderColor: ['hsl(var(--border))', 'hsl(0, 84%, 60%)'],
          duration: 400,
          easing: 'easeOutQuad'
        });
        
        anime.animate(messageRef.current, {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 400,
          easing: 'easeOutQuad'
        });
      }
    }, 500);
    
    return () => {
      if (validationTimeout.current) {
        clearTimeout(validationTimeout.current);
      }
    };
  }, [value]);
  
  return (
    <div ref={containerRef} className="space-y-2">
      <div 
        className={\`input-container border \${
          isValid === null 
            ? 'border-border' 
            : isValid 
              ? 'border-green-600' 
              : 'border-red-500'
        } rounded-md transition-colors relative overflow-hidden\`}
      >
        <input
          type="email"
          className="w-full h-10 px-3 bg-background focus:outline-none"
          placeholder="Enter your email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {isValid && (
          <span className="absolute right-3 top-2.5 text-green-600">
            <CheckCircle className="h-5 w-5" />
          </span>
        )}
      </div>
      
      {isValid !== null && (
        <div 
          ref={messageRef} 
          className={\`text-sm \${isValid ? 'text-green-600' : 'text-red-500'} opacity-0\`}
        >
          {isValid 
            ? 'Email is valid!' 
            : 'Please enter a valid email address'}
        </div>
      )}
    </div>
  );
};`;

const formEntranceCode = `import React, { useEffect, useRef } from "react";
import * as anime from "animejs";
import { Button } from "@/components/ui/button";

const FormEntrance = () => {
  const formRef = useRef(null);
  
  useEffect(() => {
    if (!formRef.current) return;
    
    const formItems = formRef.current.querySelectorAll('.form-item');
    
    anime.animate(formItems, {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 800,
      easing: 'easeOutElastic(1, 0.7)',
      delay: anime.stagger(100)
    });
  }, []);
  
  return (
    <form ref={formRef} className="space-y-4 p-5 border border-border rounded-lg">
      <div className="form-item opacity-0">
        <label className="block text-sm mb-1">First Name</label>
        <input 
          className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          type="text" 
        />
      </div>
      
      <div className="form-item opacity-0">
        <label className="block text-sm mb-1">Last Name</label>
        <input 
          className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          type="text"
        />
      </div>
      
      <div className="form-item opacity-0">
        <label className="block text-sm mb-1">Email</label>
        <input 
          className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          type="email"
        />
      </div>
      
      <div className="form-item opacity-0">
        <Button className="w-full">Submit</Button>
      </div>
    </form>
  );
};`;

const animatedButtonCode = `import React, { useRef, useState } from "react";
import * as anime from "animejs";
import { CheckCircle } from "lucide-react";

const AnimatedSubmitButton = () => {
  const buttonRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const dotRef1 = useRef(null);
  const dotRef2 = useRef(null);
  const dotRef3 = useRef(null);
  const textRef = useRef(null);
  const checkRef = useRef(null);
  
  const handleClick = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Animate button width
    anime.animate(buttonRef.current, {
      width: '120px',
      duration: 300,
      easing: 'easeInOutQuad',
      complete: () => {
        // Hide text
        anime.animate(textRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 200,
          easing: 'easeInOutQuad'
        });
        
        // Show and animate dots
        const dots = [dotRef1.current, dotRef2.current, dotRef3.current];
        
        dots.forEach((dot, index) => {
          anime.animate(dot, {
            opacity: 1,
            translateY: [0, -10, 0],
            duration: 600,
            delay: index * 150,
            loop: true,
            easing: 'easeInOutSine'
          });
        });
        
        // Simulate API call with timeout
        setTimeout(() => {
          // Hide dots
          dots.forEach((dot) => {
            anime.animate(dot, {
              opacity: 0,
              duration: 200
            });
          });
          
          // Show check icon
          anime.animate(checkRef.current, {
            opacity: 1,
            scale: [0.5, 1.2, 1],
            duration: 400,
            easing: 'easeOutBack'
          });
          
          // Reset after 1.5s
          setTimeout(() => {
            // Reset button width
            anime.animate(buttonRef.current, {
              width: '180px',
              duration: 300,
              easing: 'easeInOutQuad'
            });
            
            // Hide check icon
            anime.animate(checkRef.current, {
              opacity: 0,
              scale: 0.5,
              duration: 200
            });
            
            // Show text again
            anime.animate(textRef.current, {
              opacity: 1,
              scale: 1,
              duration: 200,
              easing: 'easeInOutQuad'
            });
            
            setIsLoading(false);
          }, 1500);
        }, 2000);
      }
    });
  };
  
  return (
    <div className="flex justify-center">
      <button
        ref={buttonRef}
        onClick={handleClick}
        disabled={isLoading}
        className="relative h-10 w-[180px] bg-primary rounded-md text-white font-medium flex items-center justify-center overflow-hidden"
      >
        <span ref={textRef} className="transition-opacity">
          Submit Form
        </span>
        
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <span ref={dotRef1} className="h-2 w-2 bg-white rounded-full opacity-0"></span>
          <span ref={dotRef2} className="h-2 w-2 bg-white rounded-full opacity-0"></span>
          <span ref={dotRef3} className="h-2 w-2 bg-white rounded-full opacity-0"></span>
        </div>
        
        <span 
          ref={checkRef}
          className="absolute inset-0 flex items-center justify-center text-white opacity-0"
        >
          <CheckCircle className="h-6 w-6" />
        </span>
      </button>
    </div>
  );
};`;

const AnimeFormAnimations = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Form Animations with anime.js</h2>
        <p className="text-muted-foreground">
          Animation examples for forms and inputs using the anime.js library. These examples
          demonstrate how to create smooth, interactive form elements with JavaScript animations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodeToggle
          previewContent={
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Animated Label Input</h3>
              <div className="pt-8 pb-4">
                <AnimatedInput label="Username" />
                <AnimatedInput label="Password" type="password" />
              </div>
            </div>
          }
          codeContent={animatedInputCode}
          className="w-full"
          minHeightClass="min-h-[400px]"
        />

        <CodeToggle
          previewContent={
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Validation Animation</h3>
              <div className="py-8">
                <ValidationInput />
              </div>
            </div>
          }
          codeContent={validationInputCode}
          className="w-full"
          minHeightClass="min-h-[400px]"
        />

        <CodeToggle
          previewContent={
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Form Entrance Animation</h3>
              <div className="py-4">
                <FormEntrance />
              </div>
            </div>
          }
          codeContent={formEntranceCode}
          className="w-full"
          minHeightClass="min-h-[400px]"
        />

        <CodeToggle
          previewContent={
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Animated Submit Button</h3>
              <div className="py-8">
                <AnimatedSubmitButton />
              </div>
            </div>
          }
          codeContent={animatedButtonCode}
          className="w-full"
          minHeightClass="min-h-[400px]"
        />
      </div>
    </div>
  );
};

export default AnimeFormAnimations;
