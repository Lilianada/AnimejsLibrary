
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Code as CodeIcon, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface CodeToggleProps {
  previewContent: React.ReactNode;
  codeContent: string;
  className?: string;
}

export const CodeToggle: React.FC<CodeToggleProps> = ({ 
  previewContent, 
  codeContent, 
  className 
}) => {
  const [isCodeView, setIsCodeView] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeContent);
    toast.success('Code copied to clipboard');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-3 right-3 z-10 flex space-x-2 bg-background/80 backdrop-blur-sm rounded-md p-1">
        <Button 
          variant={isCodeView ? "ghost" : "secondary"} 
          size="sm" 
          className="text-xs flex items-center gap-1.5"
          onClick={() => setIsCodeView(false)}
        >
          <Eye size={14} />
          Preview
        </Button>
        <Button 
          variant={isCodeView ? "secondary" : "ghost"} 
          size="sm" 
          className="text-xs flex items-center gap-1.5"
          onClick={() => setIsCodeView(true)}
        >
          <CodeIcon size={14} />
          Code
        </Button>
        {isCodeView && (
          <Button 
            variant="outline" 
            size="icon" 
            className="h-7 w-7"
            onClick={handleCopyCode}
            title="Copy code"
          >
            <Copy size={14} />
          </Button>
        )}
      </div>

      <div 
        className={`transition-all duration-300 ease-in-out ${
          isCodeView 
            ? 'opacity-0 translate-x-full absolute inset-0' 
            : 'opacity-100 relative'
        }`}
      >
        {!isCodeView && previewContent}
      </div>

      <div 
        className={`transition-all duration-300 ease-in-out ${
          isCodeView 
            ? 'opacity-100 relative' 
            : 'opacity-0 -translate-x-full absolute inset-0'
        }`}
      >
        {isCodeView && (
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm min-h-[200px] max-h-[500px]">
            <code className="text-foreground">{codeContent}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
