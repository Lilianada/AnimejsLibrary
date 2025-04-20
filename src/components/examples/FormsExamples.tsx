
import React, { useState } from "react";
import FloatingLabelInput from "./forms/FloatingLabelInput";
import PlaceholderAnimationInput from "./forms/PlaceholderAnimationInput";
import BorderAnimationInput from "./forms/BorderAnimationInput";
import ErrorStateInput from "./forms/ErrorStateInput";
import SuccessStateInput from "./forms/SuccessStateInput";
import { Copy, Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const INPUTS = [
  {
    label: "Floating Label",
    code: `<FloatingLabelInput label="Email" />`,
    render: () => <FloatingLabelInput label="Email" />,
  },
  {
    label: "Placeholder Animation",
    code: `<PlaceholderAnimationInput placeholder="Password" />`,
    render: () => <PlaceholderAnimationInput placeholder="Password" />,
  },
  {
    label: "Border Animation",
    code: `<BorderAnimationInput placeholder="Username" />`,
    render: () => <BorderAnimationInput placeholder="Username" />,
  },
  {
    label: "Error State",
    code: `<ErrorStateInput error="Invalid email format" />`,
    render: () => <ErrorStateInput error="Invalid email format" />,
  },
  {
    label: "Success State",
    code: `<SuccessStateInput success="Looks good!" />`,
    render: () => <SuccessStateInput success="Looks good!" />,
  },
];

const InputCard = ({
  label,
  code,
  render,
}: {
  label: string;
  code: string;
  render: () => React.ReactNode;
}) => {
  const [showCode, setShowCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: `${label} code copied to clipboard.`,
    });
  };

  return (
    <div className="bg-card border rounded-lg shadow-lg p-5 flex flex-col gap-3 items-center w-full max-w-sm mx-auto transition-all hover:shadow-2xl hover:-translate-y-1">
      <div className="flex w-full justify-between items-center mb-2 relative">
        <span className="font-semibold text-lg">{label}</span>
        <div className="flex gap-2">
          <button
            aria-label="View Code"
            className="text-muted-foreground hover:text-[#FDA858] transition"
            onClick={() => setShowCode((c) => !c)}
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            aria-label="Copy Code"
            className="text-muted-foreground hover:text-[#FDA858] transition"
            onClick={handleCopy}
          >
            <Copy className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="w-full">
        {showCode ? (
          <pre className="bg-muted text-xs p-4 rounded-lg overflow-auto text-left select-all">
            <code>{code}</code>
          </pre>
        ) : (
          <div className="flex justify-center">{render()}</div>
        )}
      </div>
    </div>
  );
};

const FormsExamples = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-8">
      {INPUTS.map((inp) => (
        <InputCard
          key={inp.label}
          label={inp.label}
          code={inp.code}
          render={inp.render}
        />
      ))}
    </section>
  );
};

export default FormsExamples;
