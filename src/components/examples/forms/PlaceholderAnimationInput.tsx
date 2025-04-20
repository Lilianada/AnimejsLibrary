
import { useState } from "react"
import { Label } from "@/components/ui/label"
import "./forms.css"

const PlaceholderAnimationInput = () => {
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <div>
      <div className="relative">
        <Label htmlFor="placeholder-input" className="mb-2 block">Search</Label>
        <div className="placeholder-container relative">
          <input
            id="placeholder-input"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none"
            type="text"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <span className={`placeholder-text absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 ${isFocused ? 'placeholder-focused' : ''}`}>
            Type to search...
          </span>
        </div>
      </div>
      
      <div className="rounded-md border border-border p-4 mt-6 bg-muted">
        <h3 className="text-sm font-medium mb-2">How it works:</h3>
        <p className="text-sm text-muted-foreground">
          This input uses a custom animated placeholder that slides and fades out when the input is focused.
          It's implemented using absolutely positioned text that animates with CSS transitions.
        </p>
      </div>
    </div>
  )
}

export default PlaceholderAnimationInput
