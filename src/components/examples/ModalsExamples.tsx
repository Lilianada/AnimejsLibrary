import { useRef, useEffect } from 'react'
import { CodeToggle } from './CodeToggle'
import ModalAnimations from './animations/modals/ModalAnimations'

const MODAL_DATA = [
  {
    label: "Modal Animations",
    description: "Examples of modal entrance and exit animations.",
    component: <ModalAnimations />,
    code: `import ModalAnimations from './animations/modals/ModalAnimations';

<ModalAnimations />
/* See component file for implementation */`
  }
];

const ModalsExamples = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Modal & Dialog Animations</h2>
        <p className="text-muted-foreground">
          Explore different types of modals and dialogs with various entrance and exit animations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {MODAL_DATA.map((modal) => (
          <CodeToggle
            key={modal.label}
            previewContent={
              <div className="space-y-4 p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold mb-1">{modal.label}</h3>
                  <p className="text-sm text-muted-foreground">{modal.description}</p>
                </div>
                <div className="min-h-[200px]">
                  {modal.component}
                </div>
              </div>
            }
            codeContent={modal.code}
            className="w-full"
          />
        ))}
      </div>
    </div>
  )
}

export default ModalsExamples
