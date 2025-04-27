
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CornerDownLeft, Zap, RefreshCw, AlertTriangle, Code, Copy } from 'lucide-react';
import CodeBlock from '@/components/examples/animations/CodeBlock';
import { toast } from 'sonner';

const buttonVariants = [
  {
    name: 'Primary Button',
    description: 'Used for primary actions',
    component: (
      <Button>
        Primary Action
      </Button>
    ),
    code: `<Button>
  Primary Action
</Button>`
  },
  {
    name: 'Secondary Button',
    description: 'Used for secondary actions',
    component: (
      <Button variant="secondary">
        Secondary Action
      </Button>
    ),
    code: `<Button variant="secondary">
  Secondary Action
</Button>`
  },
  {
    name: 'Ghost Button',
    description: 'Minimal visual style',
    component: (
      <Button variant="ghost">
        Ghost Button
      </Button>
    ),
    code: `<Button variant="ghost">
  Ghost Button
</Button>`
  },
  {
    name: 'Outline Button',
    description: 'Bordered button style',
    component: (
      <Button variant="outline">
        Outline Button
      </Button>
    ),
    code: `<Button variant="outline">
  Outline Button
</Button>`
  },
  {
    name: 'Destructive Button',
    description: 'For destructive actions',
    component: (
      <Button variant="destructive">
        Delete Item
      </Button>
    ),
    code: `<Button variant="destructive">
  Delete Item
</Button>`
  },
  {
    name: 'Icon Button',
    description: 'Button with an icon',
    component: (
      <Button>
        <Zap className="mr-2 h-4 w-4" /> With Icon
      </Button>
    ),
    code: `<Button>
  <Zap className="mr-2 h-4 w-4" /> With Icon
</Button>`
  },
  {
    name: 'Loading Button',
    description: 'Shows loading state',
    component: (
      <Button disabled>
        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Loading...
      </Button>
    ),
    code: `<Button disabled>
  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Loading...
</Button>`
  },
  {
    name: 'Small Button',
    description: 'Compact size button',
    component: (
      <Button size="sm">
        Small Button
      </Button>
    ),
    code: `<Button size="sm">
  Small Button
</Button>`
  },
  {
    name: 'Large Button',
    description: 'Larger size button',
    component: (
      <Button size="lg">
        Large Button
      </Button>
    ),
    code: `<Button size="lg">
  Large Button
</Button>`
  },
];

const ButtonExamples = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCode, setShowCode] = useState<number | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  useEffect(() => {
    const animateElements = () => {
      const cards = containerRef.current?.querySelectorAll('.button-card')

      cards?.forEach((card, index) => {
        const element = card as HTMLElement
        element.style.opacity = '0'
        element.style.transform = 'translateY(20px)'

        setTimeout(() => {
          element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out'
          element.style.opacity = '1'
          element.style.transform = 'translateY(0)'
        }, index * 100)
      })
    }

    animateElements()
  }, []);

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Button Components</h2>
        <p className="text-muted-foreground">
          Our versatile button collection offers various styles, sizes, and states to enhance your UI.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {buttonVariants.map((button, index) => (
          <div key={index} className="button-card space-y-4 p-6 bg-card rounded-xl border">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold mb-1">{button.name}</h3>
                <p className="text-sm text-muted-foreground">{button.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCode(showCode === index ? null : index)}
                  className="h-8 w-8 rounded-full"
                >
                  <Code className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyCode(button.code)}
                  className="h-8 w-8 rounded-full"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center py-6">
              {showCode === index ? (
                <CodeBlock code={button.code} />
              ) : (
                button.component
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonExamples;
