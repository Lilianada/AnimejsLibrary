import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { CodeToggle } from "@/components/examples/CodeToggle"
import { ArrowUp, ArrowDown, ChevronRight, Loader2 } from "lucide-react"

// Define button types for structure
const BUTTON_EXAMPLES = [
  {
    label: "Primary Button",
    description: "Default button style.",
    component: <Button>Primary</Button>,
    code: `<Button>Primary</Button>`,
  },
  {
    label: "Secondary Button",
    description: "Secondary action style.",
    component: <Button variant="secondary">Secondary</Button>,
    code: `<Button variant="secondary">Secondary</Button>`,
  },
  {
    label: "Destructive Button",
    description: "For dangerous actions.",
    component: <Button variant="destructive">Destructive</Button>,
    code: `<Button variant="destructive">Destructive</Button>`,
  },
  {
    label: "Outline Button",
    description: "Less prominent button style.",
    component: <Button variant="outline">Outline</Button>,
    code: `<Button variant="outline">Outline</Button>`,
  },
  {
    label: "Ghost Button",
    description: "Minimal button style.",
    component: <Button variant="ghost">Ghost</Button>,
    code: `<Button variant="ghost">Ghost</Button>`,
  },
  {
    label: "Link Button",
    description: "Button styled as a link.",
    component: <Button variant="link">Link</Button>,
    code: `<Button variant="link">Link</Button>`,
  },
  {
    label: "Icon Button",
    description: "Button with only an icon.",
    component: <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>,
    code: `<Button variant="outline" size="icon">
  <ChevronRight className="h-4 w-4" />
</Button>`,
  },
  {
    label: "Button with Icon",
    description: "Button with text and an icon.",
    component: <Button><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading</Button>,
    code: `<Button>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading
</Button>`,
  },
  {
    label: "Disabled Button",
    description: "Non-interactive button.",
    component: <Button disabled>Disabled</Button>,
    code: `<Button disabled>Disabled</Button>`,
  },
  {
    label: "As Child Prop",
    description: "Render as an anchor tag.",
    component: <Button asChild><a href="#">Login</a></Button>,
    code: `<Button asChild>
  <a href="#">Login</a>
</Button>`,
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {BUTTON_EXAMPLES.map((btn) => (
          <CodeToggle
            key={btn.label}
            previewContent={
              <div className="space-y-4">
                 <div className="mb-2">
                  <h3 className="text-lg font-semibold mb-1">{btn.label}</h3>
                  <p className="text-sm text-muted-foreground">{btn.description}</p>
                </div>
                <div className="min-h-[60px]">
                  {btn.component}
                </div>
              </div>
            }
            codeContent={btn.code}
            className="w-full"
          />
        ))}
      </div>
    </div>
  )
}

export default ButtonExamples
