import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CodeToggle } from "./CodeToggle";
import { Terminal } from "lucide-react";

// Toast Examples Data
const TOAST_EXAMPLES = [
  {
    label: "Default Toast",
    description: "A standard notification toast.",
    trigger: <Button variant="outline" onClick={() => toast('Event has been created.')}>Show Default</Button>,
    code: `toast('Event has been created.');`
  },
  {
    label: "Success Toast",
    description: "Indicates a successful operation.",
    trigger: <Button variant="outline" className="text-green-500 border-green-500/50 hover:bg-green-500/10 hover:text-green-600" onClick={() => toast.success('Operation successful!')}>Show Success</Button>,
    code: `toast.success('Operation successful!');`
  },
  {
    label: "Error Toast",
    description: "Indicates a failed operation or error.",
    trigger: <Button variant="destructive" onClick={() => toast.error('Failed to save changes.')}>Show Error</Button>,
    code: `toast.error('Failed to save changes.');`
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
    code: `toast('File uploaded', {
  action: { 
    label: 'Undo', 
    onClick: () => console.log('Undo') 
  },
});`
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
    code: `const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

toast.promise(promise, {
  loading: 'Loading...',
  success: 'Data fetched successfully!',
  error: 'Error fetching data',
});`
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
    code: `toast('Terminal Command Executed', { 
  icon: <Terminal className="h-4 w-4"/>, 
  description: 'npm run build completed.',
  classNames: { 
    toast: 'group toast ...',
    description: 'group-[.toast]:text-muted-foreground',
    // ... etc.
  }
})`
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