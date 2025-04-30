import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CodeToggle } from "./CodeToggle";
import { Terminal, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// Toast Examples Data
const TOAST_EXAMPLES = [
  {
    label: "Default Toast",
    description: "A standard notification toast.",
    trigger: <Button variant="outline" onClick={() => toast('Event has been created.')}>Show Default</Button>,
    code: `toast('Event has been created.');`
  },
  {
    label: "Success Toast (Styled)",
    description: "Indicates success with green styling.",
    trigger: <Button variant="outline" className="text-green-600 border-green-600/50 hover:bg-green-500/10 hover:text-green-700" 
      onClick={() => toast.success('Operation successful!', {
        icon: <CheckCircle className="h-4 w-4" />,
        classNames: { 
          toast: 'group toast group-[.toaster]:bg-green-100 group-[.toaster]:text-green-900 group-[.toaster]:border-green-300 dark:group-[.toaster]:bg-green-900/30 dark:group-[.toaster]:text-green-100 dark:group-[.toaster]:border-green-700',
          description: 'group-[.toast]:text-green-800 dark:group-[.toast]:text-green-200',
        }
      })}
      >Show Success</Button>,
    code: `toast.success('Operation successful!', {\n  classNames: { \n    toast: 'bg-green-100 text-green-900 border-green-300 ...',
    // ... other element classes
  }\n});`
  },
  {
    label: "Error Toast (Styled)",
    description: "Indicates error with red styling.",
    trigger: <Button variant="destructive" 
      onClick={() => toast.error('Failed to save changes.', {
         icon: <XCircle className="h-4 w-4" />,
         classNames: { 
           toast: 'group toast group-[.toaster]:bg-red-100 group-[.toaster]:text-red-900 group-[.toaster]:border-red-300 dark:group-[.toaster]:bg-red-900/30 dark:group-[.toaster]:text-red-100 dark:group-[.toaster]:border-red-700',
           description: 'group-[.toast]:text-red-800 dark:group-[.toast]:text-red-200',
         }
      })}
      >Show Error</Button>,
    code: `toast.error('Failed to save changes.', {\n  classNames: { \n    toast: 'bg-red-100 text-red-900 border-red-300 ...',
    // ...
  }\n});`
  },
  {
    label: "Warning Toast (Styled)",
    description: "Indicates a warning with orange styling.",
    trigger: <Button variant="outline" className="text-orange-600 border-orange-600/50 hover:bg-orange-500/10 hover:text-orange-700"
      onClick={() => toast('Potential issue detected.', {
          icon: <AlertTriangle className="h-4 w-4" />, 
          classNames: { 
            toast: 'group toast group-[.toaster]:bg-orange-100 group-[.toaster]:text-orange-900 group-[.toaster]:border-orange-300 dark:group-[.toaster]:bg-orange-900/30 dark:group-[.toaster]:text-orange-100 dark:group-[.toaster]:border-orange-700',
            description: 'group-[.toast]:text-orange-800 dark:group-[.toast]:text-orange-200',
          }
      })}
      >Show Warning</Button>,
    code: `toast('Potential issue detected.', {\n  icon: <AlertTriangle />,
  classNames: { \n    toast: 'bg-orange-100 text-orange-900 border-orange-300 ...',
    // ...
  }\n});`
  },
  {
    label: "Top-Right Position Toast",
    description: "Displays the toast in the top-right corner.",
    trigger: <Button variant="outline" 
      onClick={() => toast('Notification', { 
          description: 'This appeared in the top-right.', 
          position: 'top-right' 
        })}
      >Show Top-Right</Button>,
    code: `toast('Notification', { \n  description: 'This appeared in the top-right.', 
  position: 'top-right' 
});`
  },
  {
    label: "Toast with Action",
    description: "Includes an action button within the toast.",
    trigger: (
      <Button variant="outline" onClick={() =>
          toast('File uploaded', {
            action: { label: 'Undo', onClick: () => console.log('Undo') },
          })
        }
      >
        Show Action Toast
      </Button>
    ),
    code: `toast('File uploaded', {\n  action: { \n    label: 'Undo', \n    onClick: () => console.log('Undo') \n  },\n});`
  },
  {
    label: "Promise Toast",
    description: "Handles loading, success, and error states of a promise.",
    trigger: (
      <Button variant="outline" onClick={() => {
          const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
          toast.promise(promise, {
            loading: 'Loading...',
            success: 'Data fetched successfully!',
            error: 'Error fetching data',
          });
        }}
      >
        Show Promise Toast
      </Button>
    ),
    code: `const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));\n\ntoast.promise(promise, {\n  loading: 'Loading...',\n  success: 'Data fetched successfully!',\n  error: 'Error fetching data',\n});`
  },
  {
    label: "Custom Style Toast",
    description: "Applies custom styling using classNames.",
    trigger: (
      <Button variant="outline" onClick={() => 
        toast('Terminal Command Executed', { 
          icon: <Terminal className="h-4 w-4"/>, 
          description: 'npm run build completed.',
          classNames: { 
            toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
            description: 'group-[.toast]:text-muted-foreground',
            actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
            cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          }
        })
      }>Show Custom</Button>
    ),
    code: `toast('Terminal Command Executed', { \n  icon: <Terminal className="h-4 w-4"/>, \n  description: 'npm run build completed.',\n  classNames: { \n    toast: 'group toast ...',\n    description: 'group-[.toast]:text-muted-foreground',\n    // ... etc.\n  }\n})`
  }
];

const ToastsExamples = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Toast Notifications</h2>
        <p className="text-muted-foreground">
          Examples using the Sonner library for toast notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {TOAST_EXAMPLES.map((example) => (
          <CodeToggle
            key={example.label}
            previewContent={
              <div className="space-y-4 p-4">
                 <div className="mb-2">
                  <h3 className="text-lg font-semibold mb-1">{example.label}</h3>
                  <p className="text-sm text-muted-foreground">{example.description}</p>
                </div>
                <div className="flex justify-center items-center min-h-[60px]">
                  {example.trigger}
                </div>
              </div>
            }
            codeContent={example.code}
            className="w-full h-full"
          />
        ))}
      </div>
    </div>
  );
};

export default ToastsExamples; 