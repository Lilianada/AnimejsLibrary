
import { useEffect, useRef } from "react";
import anime from "animejs";
import { Code, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ButtonExamples = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.addEventListener('mouseenter', () => {
        anime({
          targets: buttonRef.current,
          scale: 1.1,
          duration: 200,
          easing: 'easeInOutQuad'
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        anime({
          targets: buttonRef.current,
          scale: 1,
          duration: 200,
          easing: 'easeInOutQuad'
        });
      });
    }
  }, []);

  const codeExample = `
  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.addEventListener('mouseenter', () => {
        anime({
          targets: button,
          scale: 1.1,
          duration: 200,
          easing: 'easeInOutQuad'
        });
      });
    }
  }, []);`;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Button Animations</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Code className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-8">
        <div className="p-6 rounded-lg border bg-card">
          <h2 className="text-lg font-semibold mb-4">Scale on Hover</h2>
          <div className="flex flex-col items-start gap-4">
            <Button ref={buttonRef}>
              Hover Me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
