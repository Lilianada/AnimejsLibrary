import React, { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeToggleProps {
  previewContent: React.ReactNode;
  codeContent: string;
  className?: string;
  minHeightClass?: string;
}

export const CodeToggle: React.FC<CodeToggleProps> = ({
  previewContent,
  codeContent,
  className,
  minHeightClass = "min-h-[450px]",
}) => {
  const [isCodeView, setIsCodeView] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeContent);
    toast.success("Code copied to clipboard");
  };

  return (
    <div
      className={`relative rounded-lg border bg-card flex flex-col ${minHeightClass} ${className}`}
    >
      <div className="flex items-center border-b px-4 shrink-0">
        <button
          onClick={() => setIsCodeView(false)}
          className={`px-4 py-3 text-sm font-medium relative ${
            !isCodeView
              ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setIsCodeView(true)}
          className={`px-4 py-3 text-sm font-medium relative ${
            isCodeView
              ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Usage
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden m-4">
        <div
          className={`absolute inset-0 p-4 transition-opacity duration-300 overflow-auto ${
            isCodeView ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {previewContent}
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isCodeView ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative h-full">
            <SyntaxHighlighter
              language="tsx"
              style={atomDark}
              customStyle={{
                margin: 0,
                height: "100%",
                borderRadius: "0.375rem",
                padding: "1rem",
                fontSize: "0.875rem",
              }}
              showLineNumbers
            >
              {codeContent.trim()}
            </SyntaxHighlighter>
            <button
              onClick={handleCopyCode}
              className="absolute top-3 right-3 p-1.5 bg-muted/50 hover:bg-muted rounded-md transition-colors z-10"
              title="Copy code"
              aria-label="Copy code to clipboard"
            >
              <Copy
                size={14}
                className="text-muted-foreground hover:text-foreground"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
