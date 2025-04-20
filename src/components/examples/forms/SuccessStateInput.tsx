
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import "./forms.css"

const SuccessStateInput = () => {
  const [value, setValue] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [showCheckmark, setShowCheckmark] = useState(false)
  
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    if (validateEmail(newValue)) {
      setIsValid(true)
      setShowCheckmark(true)
    } else {
      setIsValid(false)
      setShowCheckmark(false)
    }
  }
  
  return (
    <div>
      <div className="relative">
        <Label htmlFor="success-input" className="mb-2 block">Email Address</Label>
        <div className="relative">
          <input
            id="success-input"
            className={`w-full rounded-md border transition-colors duration-300 ${isValid ? 'border-success pr-10' : 'border-input'} bg-background px-3 py-2 text-foreground outline-none`}
            type="email"
            value={value}
            onChange={handleChange}
            placeholder="example@email.com"
          />
          {showCheckmark && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Check className="h-5 w-5 text-success check-animation" />
            </div>
          )}
        </div>
      </div>
      
      <div className="rounded-md border border-border p-4 mt-6 bg-muted">
        <h3 className="text-sm font-medium mb-2">How it works:</h3>
        <p className="text-sm text-muted-foreground">
          As you type a valid email address, the border color transitions to green and a checkmark icon 
          animates in. The validation happens in real-time using a simple regex pattern.
        </p>
      </div>
    </div>
  )
}

export default SuccessStateInput
