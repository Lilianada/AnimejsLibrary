import React from "react";
import { toast } from "sonner"; // Import sonner toast
// import { useToast } from '../toast/ToastProvider'; // Remove custom hook import
// Keep Button for triggering, but these won't be part of the package
// If the Button itself needs to be packaged, it needs rework
import { Button } from "@/components/ui/button";
import { CodeToggle } from "./CodeToggle";
import { Terminal, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

// --- Main Component using the custom hook ---
const ToastsExamples = () => {
  // const { addToast } = useToast(); // Use the custom hook

  // Define examples *inside* the component to access addToast
  const TOAST_EXAMPLES = [
    {
      label: "Default Toast",
      description: "A standard notification toast.",
      trigger: (
        <Button
          variant="outline"
          onClick={() => toast("Event has been created.")}
        >
          Show Default
        </Button>
      ),
      code: `import { toast } from "sonner";

toast('Event has been created.');`,
    },
    {
      label: "Success Toast",
      description: "Indicates success.",
      trigger: (
        <Button
          variant="outline"
          className="text-green-600 border-green-600/50 hover:bg-green-500/10 hover:text-green-700"
          onClick={() => toast.success("Operation successful!")}
        >
          Show Success
        </Button>
      ),
      code: `import { toast } from "sonner";

toast.success('Operation successful!');`,
    },
    {
      label: "Error Toast",
      description: "Indicates an error.",
      trigger: (
        <Button
          variant="destructive"
          onClick={() => toast.error("Failed to save changes.")}
        >
          Show Error
        </Button>
      ),
      code: `import { toast } from "sonner";

toast.error('Failed to save changes.');`,
    },
    {
      label: "Warning Toast",
      description: "Indicates a warning.",
      trigger: (
        <Button
          variant="outline"
          className="text-yellow-600 border-yellow-600/50 hover:bg-yellow-500/10 hover:text-yellow-700"
          onClick={() => toast.warning("Potential issue detected.")}
        >
          Show Warning
        </Button>
      ),
      code: `import { toast } from "sonner";

toast.warning('Potential issue detected.');`,
    },
    {
      label: "Toast with Action",
      description: "Includes an action button within the toast.",
      trigger: (
        <Button
          variant="outline"
          onClick={() =>
            toast("File uploaded", {
              action: {
                label: "Undo",
                onClick: () => console.log("Undo Action"),
              },
            })
          }
        >
          Show Action Toast
        </Button>
      ),
      code: `import { toast } from "sonner";

toast('File uploaded', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo Action')
  },
});`,
    },
    {
      label: "Promise Toast",
      description: "Handles loading, success, and error states of a promise.",
      trigger: (
        <Button
          variant="outline"
          onClick={() => {
            const promise = () =>
              new Promise<string>((resolve, reject) =>
                setTimeout(() => {
                  // Randomly resolve or reject for demo
                  Math.random() > 0.5
                    ? resolve("Data Loaded!")
                    : reject("Network Error!");
                }, 2000),
              );
            toast.promise(promise, {
              loading: "Loading...",
              success: (data) => `Success: ${data}`,
              error: (err) => `Error: ${err}`,
            });
          }}
        >
          Show Promise Toast
        </Button>
      ),
      code: `import { toast } from "sonner";

const promise = () => new Promise<string>((resolve, reject) => 
  setTimeout(() => { 
    // Simulate success/failure
    Math.random() > 0.5 ? resolve('Data Loaded!') : reject('Network Error!');
  }, 2000)
);

toast.promise(promise, {
  loading: 'Loading...',
  success: (data) => \`Success: \${data}\`,
  error: (err) => \`Error: \${err}\`,
});`,
    },
    // Example for custom styling via classNames (less relevant for copy-paste but good demo)
    {
      label: "Custom Style Toast",
      description: "Applies custom styling using classNames.",
      trigger: (
        <Button
          variant="outline"
          onClick={() =>
            toast("Terminal Command Executed", {
              icon: <Terminal className="h-4 w-4" />,
              description: "npm run build completed.",
              classNames: {
                // Example: Tailwind classes for custom look
                toast:
                  "group toast group-[.toaster]:bg-gray-900 group-[.toaster]:text-gray-100 group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg",
                description: "group-[.toast]:text-gray-400",
                actionButton:
                  "group-[.toast]:bg-gray-700 group-[.toast]:text-gray-100",
                cancelButton:
                  "group-[.toast]:bg-gray-800 group-[.toast]:text-gray-300",
              },
            })
          }
        >
          Show Custom Style
        </Button>
      ),
      code: `import { toast } from "sonner";
import { Terminal } from 'lucide-react';

toast('Terminal Command Executed', { 
  icon: <Terminal className="h-4 w-4"/>, 
  description: 'npm run build completed.',
  classNames: { 
    toast: 'group toast bg-gray-900 text-gray-100 border-gray-700 shadow-lg',
    description: 'text-gray-400',
    actionButton: 'bg-gray-700 text-gray-100',
    cancelButton: 'bg-gray-800 text-gray-300',
    // Note: Sonner uses group-[.toast] internally, 
    // so direct classes might be simpler for user copy-paste.
  }
})`,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">
          Toast Notifications (Sonner)
        </h2>
        <p className="text-muted-foreground">
          Examples using the Sonner library for toast notifications. Requires{" "}
          {"<Toaster />"} from sonner in your app layout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {TOAST_EXAMPLES.map((example) => (
          <CodeToggle
            key={example.label}
            previewContent={
              <div className="space-y-4 p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold mb-1">
                    {example.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {example.description}
                  </p>
                </div>
                <div className="flex justify-center items-center min-h-[60px]">
                  {example.trigger}
                </div>
              </div>
            }
            codeContent={example.code}
            className="w-full h-full"
            minHeightClass="min-h-[250px]"
          />
        ))}
      </div>
    </div>
  );
};

export default ToastsExamples;
