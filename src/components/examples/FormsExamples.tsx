
import React from "react";
import FloatingLabelInput from "./forms/FloatingLabelInput";
import PlaceholderAnimationInput from "./forms/PlaceholderAnimationInput";
import BorderAnimationInput from "./forms/BorderAnimationInput";
import ErrorStateInput from "./forms/ErrorStateInput";
import SuccessStateInput from "./forms/SuccessStateInput";
import { CodeToggle } from "./CodeToggle";

const INPUTS = [
  {
    label: "Floating Label",
    description: "Smooth label transition on focus",
    code: `<FloatingLabelInput label="Email" />`,
    component: <FloatingLabelInput label="Email" />,
  },
  {
    label: "Placeholder Animation",
    description: "Animated placeholder text",
    code: `<PlaceholderAnimationInput placeholder="Enter your password" />`,
    component: <PlaceholderAnimationInput placeholder="Enter your password" />,
  },
  {
    label: "Border Animation",
    description: "Interactive border effect",
    code: `<BorderAnimationInput placeholder="Username" />`,
    component: <BorderAnimationInput placeholder="Username" />,
  },
  {
    label: "Error State",
    description: "Form validation feedback",
    code: `<ErrorStateInput error="Please enter a valid email address" />`,
    component: <ErrorStateInput error="Please enter a valid email address" />,
  },
  {
    label: "Success State",
    description: "Positive feedback indicator",
    code: `<SuccessStateInput success="Email is available" />`,
    component: <SuccessStateInput success="Email is available" />,
  },
];

const FormsExamples = () => {
  return (
    <section className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Form Components</h2>
        <p className="text-muted-foreground">
          A collection of form input components with various states and animations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {INPUTS.map((input) => (
          <CodeToggle
            key={input.label}
            previewContent={
              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">{input.label}</h3>
                  <p className="text-sm text-muted-foreground">{input.description}</p>
                </div>
                <div className="flex items-center justify-center py-6">
                  {input.component}
                </div>
              </div>
            }
            codeContent={input.code}
            className="w-full"
          />
        ))}
      </div>
    </section>
  );
};

export default FormsExamples;
