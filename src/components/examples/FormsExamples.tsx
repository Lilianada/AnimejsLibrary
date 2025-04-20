
import { useState } from 'react'
import { Code, Copy, Eye, EyeOff, Check } from 'lucide-react'
import BorderAnimationInput from './forms/BorderAnimationInput'
import ErrorStateInput from './forms/ErrorStateInput'
import FloatingLabelInput from './forms/FloatingLabelInput'
import PlaceholderAnimationInput from './forms/PlaceholderAnimationInput'
import SuccessStateInput from './forms/SuccessStateInput'
import CodeBlock from "../examples/animations/CodeBlock"

const formComponents = [
  {
    label: 'Border Animation',
    code: `<BorderAnimationInput placeholder="Fancy border..." />`,
    element: <BorderAnimationInput placeholder="Fancy border..." />,
  },
  {
    label: 'Floating Label',
    code: `<FloatingLabelInput label="Your name" />`,
    element: <FloatingLabelInput label="Your name" />,
  },
  {
    label: 'Animated Placeholder',
    code: `<PlaceholderAnimationInput placeholder="Animated..." />`,
    element: <PlaceholderAnimationInput placeholder="Animated..." />,
  },
  {
    label: 'Error State',
    code: `<ErrorStateInput error="Required!" />`,
    element: <ErrorStateInput error="Required!" />,
  },
  {
    label: 'Success State',
    code: `<SuccessStateInput success="Well done!" />`,
    element: <SuccessStateInput success="Well done!" />,
  },
]

const FormsExamples = () => {
  const [codeVisible, setCodeVisible] = useState(Array(formComponents.length).fill(false))
  const [copied, setCopied] = useState(Array(formComponents.length).fill(false))

  const handleView = (idx: number) => {
    setCodeVisible((visible: boolean[]) =>
      visible.map((v, i) => (i === idx ? !v : v))
    )
  }
  const handleCopy = async (idx: number) => {
    try {
      await navigator.clipboard.writeText(formComponents[idx].code)
      setCopied(c => {
        const next = [...c]
        next[idx] = true
        return next
      })
      setTimeout(() => setCopied(c => {
        const next = [...c]
        next[idx] = false
        return next
      }), 1600)
    } catch {}
  }

  return (
    <div className="space-y-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Forms &amp; Inputs</h2>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {formComponents.map((fc, idx) => (
          <div key={fc.label} className="bg-muted p-6 rounded-lg flex flex-col items-center">
            {/* Top actions */}
            <div className="flex gap-2 items-center justify-end w-full mb-2">
              <button onClick={() => handleView(idx)} className="p-2 rounded hover:bg-muted/50">
                {codeVisible[idx]
                  ? <EyeOff className="h-4 w-4" />
                  : <Eye className="h-4 w-4" />}
              </button>
              <button onClick={() => handleCopy(idx)} className="p-2 rounded hover:bg-muted/50">
                {copied[idx] ? <Check className="h-4 w-4 text-green-500"/> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            {codeVisible[idx]
              ? <CodeBlock code={fc.code} />
              : <div className="w-full flex-1 flex items-center justify-center">{fc.element}</div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default FormsExamples
