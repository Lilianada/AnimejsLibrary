import React, { useState } from 'react';
import CodeBlock from './animations/CodeBlock';

interface CardTileDisplayProps {
  title: string;
  description: string;
  previewContent: React.ReactNode;
  codeContent: string;
  className?: string;
  minHeightClass?: string;
}

export const CardTileDisplay: React.FC<CardTileDisplayProps> = ({ 
  title, 
  description, 
  previewContent,
  codeContent,
  className, 
  minHeightClass = 'min-h-[450px]'
}) => {
  const [isCodeView, setIsCodeView] = useState(false);

  return (
    <div className={`relative rounded-lg border bg-card flex flex-col overflow-hidden ${minHeightClass} ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/40 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg text-card-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <button 
          onClick={() => setIsCodeView(!isCodeView)}
          className="px-3 py-1 text-xs font-medium rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label={isCodeView ? "Show Preview" : "Show Code"}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsCodeView(!isCodeView);
            }
          }}
        >
          {isCodeView ? 'Preview' : 'Code'}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-6 flex items-center justify-center bg-muted/20">
        {!isCodeView ? (
          previewContent
        ) : (
          <div className="w-full h-full overflow-auto">
            <CodeBlock code={codeContent} />
          </div>
        )}
      </div>
    </div>
  );
}; 