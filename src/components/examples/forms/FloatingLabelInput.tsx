
import { useState } from "react"
import { Label } from "@/components/ui/label"
import "./forms.css"

const FloatingLabelInput = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState("")
  
  return (
    <div className="floating-label-container">
      <div className="relative">
        <input
          id="floating-name"
          className="floating-input w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Label 
          htmlFor="floating-name" 
          className={`floating-label absolute left-3 transition-all duration-300 ${isFocused || value ? 'focused text-xs -translate-y-[140%] text-primary' : 'text-muted-foreground'}`}
        >
          Your Name
        </Label>
      </div>
      
      <div className="rounded-md border border-border p-4 mt-6 bg-muted">
        <h3 className="text-sm font-medium mb-2">How it works:</h3>
        <p className="text-sm text-muted-foreground">
          The label starts as a placeholder inside the input. When you focus the input or enter text, 
          the label animates to a smaller size above the input field using CSS transforms and transitions.
        </p>
      </div>
    </div>
  )
}

export default FloatingLabelInput
