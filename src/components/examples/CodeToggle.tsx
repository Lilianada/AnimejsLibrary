
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Code as CodeIcon } from 'lucide-react';
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
      <div className="absolute top-3 right-3 z-10 flex space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => setIsCodeView(!isCodeView)}
        >
          {isCodeView ? <CodeIcon size={16} /> : <CodeIcon size={16} />}
        </Button>
        {isCodeView && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleCopyCode}
          >
            <Copy size={16} />
          </Button>
        )}
      </div>

      <div 
        className={`transition-all duration-300 ease-in-out ${
          isCodeView 
            ? 'opacity-0 translate-x-full absolute' 
            : 'opacity-100 relative'
        }`}
      >
        {!isCodeView && previewContent}
      </div>

      <div 
        className={`transition-all duration-300 ease-in-out ${
          isCodeView 
            ? 'opacity-100 relative' 
            : 'opacity-0 -translate-x-full absolute'
        }`}
      >
        {isCodeView && (
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code className="text-foreground">{codeContent}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
