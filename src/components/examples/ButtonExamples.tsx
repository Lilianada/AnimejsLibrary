
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeToggle } from "@/components/examples/CodeToggle";
import { ArrowUp, ArrowDown, ChevronRight, Loader2 } from "lucide-react";
import AnimatedSubmitButton, { animatedSubmitButtonCode } from "./animations/buttons/AnimatedSubmitButton";

// Define button types for structure
const BUTTON_EXAMPLES = [
  {
    label: "Primary Button",
    description: "Default button style.",
    component: <Button>Primary</Button>,
    code: `import { Button } from "@/components/ui/button";\n\n<Button>Primary</Button>`,
  },
  {
    label: "Secondary Button",
    description: "Secondary action style.",
    component: <Button variant="secondary">Secondary</Button>,
    code: `import { Button } from "@/components/ui/button";\n\n<Button variant="secondary">Secondary</Button>`,
  },
  {
    label: "Destructive Button",
    description: "For dangerous actions.",
    component: <Button variant="destructive">Destructive</Button>,
    code: `import { Button } from "@/components/ui/button";\n\n<Button variant="destructive">Destructive</Button>`,
  },
  {
    label: "Outline Button",
    description: "Less prominent button style.",
    component: <Button variant="outline">Outline</Button>,
    code: `import { Button } from "@/components/ui/button";\n\n<Button variant="outline">Outline</Button>`,
  },
  {
    label: "Ghost Button",
    description: "Minimal button style.",
    component: <Button variant="ghost">Ghost</Button>,
    code: `import { Button } from "@/components/ui/button";\n\n<Button variant="ghost">Ghost</Button>`,
  },
  {
    label: "Link Button",
    description: "Button styled as a link.",
    component: <Button variant="link">Link</Button>,
    code: `import { Button } from "@/components/ui/button";\n\n<Button variant="link">Link</Button>`,
  },
  {
    label: "Icon Button",
    description: "Button with only an icon.",
    component: (
      <Button variant="outline" size="icon">
        <ChevronRight className="h-4 w-4" />
      </Button>
    ),
    code: `import { Button } from "@/components/ui/button";\nimport { ChevronRight } from "lucide-react";\n\n<Button variant="outline" size="icon">\n  <ChevronRight className="h-4 w-4" />\n</Button>`,
  },
  {
    label: "Button with Icon",
    description: "Button with text and an icon.",
    component: (
      <Button>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
      </Button>
    ),
    code: `import { Button } from "@/components/ui/button";\nimport { Loader2 } from "lucide-react";\n\n<Button>\n  <Loader2 className="mr-2 h-4 w-4 animate-spin" />\n  Loading\n</Button>`,
  },
  {
    label: "Disabled Button",
    description: "Non-interactive button.",
    component: <Button disabled>Disabled</Button>,
    code: `import { Button } from "@/components/ui/button";\n\n<Button disabled>Disabled</Button>`,
  },
  {
    label: "As Child Prop",
    description: "Render as an anchor tag.",
    component: (
      <Button asChild>
        <a href="#">Login</a>
      </Button>
    ),
    code: `import { Button } from "@/components/ui/button";\n\n<Button asChild>\n  <a href="#">Login</a>\n</Button>`,
  },
  {
    label: "Animated Submit Button",
    description: "Button with loading and success animations.",
    component: (
      <AnimatedSubmitButton 
        text="Click to Submit" 
        loadingText="Processing..."
        successText="Done!"
      />
    ),
    code: animatedSubmitButtonCode,
  },
];

const ButtonExamples = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Button Examples</h2>
        <p className="text-muted-foreground">
          Showcase of different button variants and styles using Shadcn UI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BUTTON_EXAMPLES.map((btn) => (
          <CodeToggle
            key={btn.label}
            previewContent={
              <div className="space-y-4">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold mb-1">{btn.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {btn.description}
                  </p>
                </div>
                <div className="min-h-[60px]">{btn.component}</div>
              </div>
            }
            codeContent={btn.code}
            className="w-full"
            minHeightClass="min-h-[250px]"
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonExamples;
