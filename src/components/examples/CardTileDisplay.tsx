import React from 'react';
import CodeBlock from './animations/CodeBlock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components

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
  return (
    <div className={`border border-border rounded-lg overflow-hidden flex flex-col min-h-[450px] ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/40">
        <h3 className="text-lg font-semibold mb-1">{label}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Tabs for Preview and Usage - Allow Tabs to flex grow */}
      <Tabs defaultValue="preview" className="w-full flex flex-col flex-1">
        <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-border shrink-0"> {/* Prevent TabsList from shrinking */}
          <TabsTrigger value="preview" className="rounded-none data-[state=active]:shadow-none data-[state=active]:bg-background">Preview</TabsTrigger>
          <TabsTrigger value="usage" className="rounded-none data-[state=active]:shadow-none data-[state=active]:bg-background">Usage</TabsTrigger>
        </TabsList>
        
        {/* Preview Content - Allow content to flex grow and scroll if needed */}
        <TabsContent value="preview" className="flex-1 overflow-auto mt-0">
            <div className="p-6 flex justify-center items-center min-h-[180px]">
                {component}
            </div>
        </TabsContent>

        {/* Usage/Code Content - Allow content to flex grow */}
        <TabsContent value="usage" className="mt-0 flex-1 flex flex-col">
            {/* Make CodeBlock fill available space */}
            <CodeBlock code={code} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CardTileDisplay; 