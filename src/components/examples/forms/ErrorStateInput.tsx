
import { useState } from "react"
import { Label } from "@/components/ui/label"
import "./forms.css"

const ErrorStateInput = () => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  
  const validateInput = () => {
    if (value.length < 6) {
      setError("Password must be at least 6 characters")
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      return false
    }
    setError("")
    return true
  }
  
  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="error-input" className="block">Password</Label>
        <div className={`relative ${isShaking ? 'shake-animation' : ''}`}>
          <input
            id="error-input"
            className={`w-full rounded-md border ${error ? 'border-destructive' : 'border-input'} bg-background px-3 py-2 text-foreground outline-none`}
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={validateInput}
            placeholder="Enter password"
          />
        </div>
        {error && (
          <div className="error-message text-destructive text-sm">
            {error}
          </div>
        )}
      </div>
      
      <div className="rounded-md border border-border p-4 mt-6 bg-muted">
        <h3 className="text-sm font-medium mb-2">How it works:</h3>
        <p className="text-sm text-muted-foreground">
          When validation fails, the input field shakes side-to-side using CSS animation. 
          Additionally, an error message fades in below the input. Try entering less than 6 characters 
          and clicking outside the input field.
        </p>
      </div>
    </div>
  )
}

export default ErrorStateInput
