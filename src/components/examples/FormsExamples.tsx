import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FloatingLabelInput from "./forms/FloatingLabelInput"
import BorderAnimationInput from "./forms/BorderAnimationInput"
import ErrorStateInput from "./forms/ErrorStateInput"
import SuccessStateInput from "./forms/SuccessStateInput"
import PlaceholderAnimationInput from "./forms/PlaceholderAnimationInput"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "./animations/CodeBlock"
import { Copy, Code, Check } from "lucide-react"

const FormsExamples = () => {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const codeExample = `
import { useState } from "react"
import FloatingLabelInput from "./FloatingLabelInput"

const Example = () => (
  <FloatingLabelInput />
)
  `
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeExample)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  return (
    <div className="space-y-8">
      <div className="flex gap-3 mb-2 justify-end">
        <button className="flex gap-2 px-2 py-1 rounded border border-border bg-background text-foreground text-sm" onClick={() => setShowCode(v => !v)}>
          <Code className="h-4 w-4" /> {showCode ? "Hide Code" : "View Code"}
        </button>
        <button className="flex gap-2 px-2 py-1 rounded border border-border bg-background text-foreground text-sm" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Code
        </button>
      </div>
      {showCode && <CodeBlock code={codeExample} />}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Form Examples</h2>
        <p className="text-muted-foreground">
          Explore various form input animations and interactions.
        </p>
      </div>

      <Tabs defaultValue="label" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="label">Label Float</TabsTrigger>
          <TabsTrigger value="border">Border Animation</TabsTrigger>
          <TabsTrigger value="error">Error State</TabsTrigger>
          <TabsTrigger value="success">Success State</TabsTrigger>
          <TabsTrigger value="placeholder">Placeholder</TabsTrigger>
        </TabsList>
        
        <TabsContent value="label" className="mt-0">
          <Card className="shadow-lg border-border">
            <CardHeader>
              <CardTitle>Floating Label Animation</CardTitle>
              <CardDescription>
                The label animates from placeholder position to above the input when focused or filled.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FloatingLabelInput />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="border" className="mt-0">
          <Card className="shadow-lg border-border">
            <CardHeader>
              <CardTitle>Border Animation</CardTitle>
              <CardDescription>
                The border color or thickness animates on focus and validation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <BorderAnimationInput />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="error" className="mt-0">
          <Card className="shadow-lg border-border">
            <CardHeader>
              <CardTitle>Error State Animation</CardTitle>
              <CardDescription>
                Shake animation for invalid input and animated error message.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ErrorStateInput />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="success" className="mt-0">
          <Card className="shadow-lg border-border">
            <CardHeader>
              <CardTitle>Success State Animation</CardTitle>
              <CardDescription>
                Border color transition and checkmark animation for successful validation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SuccessStateInput />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="placeholder" className="mt-0">
          <Card className="shadow-lg border-border">
            <CardHeader>
              <CardTitle>Placeholder Animation</CardTitle>
              <CardDescription>
                Fade or slide placeholder text on focus.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <PlaceholderAnimationInput />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FormsExamples
