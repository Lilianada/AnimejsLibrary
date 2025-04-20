
import { useState } from "react"
import { Label } from "@/components/ui/label"
import "./forms.css"

const BorderAnimationInput = () => {
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <div>
      <div className="relative">
        <Label htmlFor="border-input" className="mb-2 block">Email Address</Label>
        <input
          id="border-input"
          className={`border-animation-input w-full rounded-md border ${isFocused ? 'border-primary' : 'border-input'} bg-background px-3 py-2 text-foreground outline-none`}
          type="email"
          placeholder="example@email.com"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      
      <div className="rounded-md border border-border p-4 mt-6 bg-muted">
        <h3 className="text-sm font-medium mb-2">How it works:</h3>
        <p className="text-sm text-muted-foreground">
          When the input is focused, a border animation occurs. The border color changes and a subtle pulse 
          effect is applied using CSS transitions. This provides clear visual feedback to the user.
        </p>
      </div>
    </div>
  )
}

export default BorderAnimationInput
