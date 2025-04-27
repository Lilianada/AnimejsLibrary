
import React, { useState } from 'react';
import { Copy } from 'lucide-react';
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
    <div className={`relative rounded-lg border bg-card ${className}`}>
      <div className="flex items-center border-b px-4">
        <button
          onClick={() => setIsCodeView(false)}
          className={`px-4 py-3 text-sm font-medium relative ${
            !isCodeView 
              ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setIsCodeView(true)}
          className={`px-4 py-3 text-sm font-medium relative ${
            isCodeView 
              ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Code
        </button>
      </div>

      <div className="relative min-h-[300px] p-4">
        <div
          className={`absolute inset-0 p-4 transition-opacity duration-300 ${
            isCodeView ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {previewContent}
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isCodeView ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="relative">
            <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm">
              <code className="text-foreground">{codeContent}</code>
            </pre>
            <button
              onClick={handleCopyCode}
              className="absolute top-3 right-3 p-2 hover:bg-background/50 rounded-md transition-colors"
              title="Copy code"
            >
              <Copy size={16} className="text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
