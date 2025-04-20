
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Eye, ArrowRight, Circle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const BUTTON_CODE = [
  {
    label: "Primary",
    code: `<Button>Primary Button</Button>`,
    render: () => <Button>Primary Button</Button>,
  },
  {
    label: "Secondary",
    code: `<Button variant="secondary">Secondary Button</Button>`,
    render: () => <Button variant="secondary">Secondary Button</Button>,
  },
  {
    label: "Destructive",
    code: `<Button variant="destructive">Destructive</Button>`,
    render: () => <Button variant="destructive">Destructive</Button>,
  },
  {
    label: "With Icon",
    code: `<Button><ArrowRight className="mr-2" />Next</Button>`,
    render: () => (
      <Button>
        <ArrowRight className="mr-2" />
        Next
      </Button>
    ),
  },
  {
    label: "Loading",
    code: `<Button disabled><Circle className="animate-spin mr-2" />Loading</Button>`,
    render: () => (
      <Button disabled>
        <Circle className="animate-spin mr-2" />
        Loading
      </Button>
    ),
  },
];

const ButtonCard = ({
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

const ButtonExamples = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-8">
      {BUTTON_CODE.map((btn) => (
        <ButtonCard
          key={btn.label}
          label={btn.label}
          code={btn.code}
          render={btn.render}
        />
      ))}
    </section>
  );
};

export default ButtonExamples;
