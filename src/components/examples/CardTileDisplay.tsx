import React, { useState } from 'react';
import CodeBlock from './animations/CodeBlock';

interface CardTileDisplayProps {
  label: string;
  description: string;
  component: React.ReactNode;
  code: string;
  className?: string;
}

const CardTileDisplay: React.FC<CardTileDisplayProps> = ({
  label,
  description,
  component,
  code,
  className = ''
}) => {
  const [isCodeView, setIsCodeView] = useState(false);

  return (
    <div className={`border border-border rounded-lg overflow-hidden flex flex-col min-h-[450px] ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/40">
        <h3 className="text-lg font-semibold mb-1">{label}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Button Header */}
      <div className="flex items-center border-b px-4 shrink-0">
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
          Usage
        </button>
      </div>

      {/* Content Area - Use flex-1 and relative positioning */}
      <div className="relative flex-1 overflow-hidden m-4">
        {/* Preview Content */}
        <div
          className={`absolute inset-0 p-4 transition-opacity duration-300 overflow-auto flex justify-center items-center ${
            isCodeView ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {component}
        </div>

        {/* Usage/Code Content */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${ 
            isCodeView ? 'opacity-100 flex flex-col' : 'opacity-0 pointer-events-none'
          }`}
        >
           {/* Make CodeBlock fill available space */}
           <div className="flex-1 h-full">
                <CodeBlock code={code} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default CardTileDisplay; 