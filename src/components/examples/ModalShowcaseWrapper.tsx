import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ModalShowcaseWrapperProps {
  label: string;
  description: string;
  children: React.ReactNode; // Accept the modal trigger/component as children
  className?: string;
}

const ModalShowcaseWrapper: React.FC<ModalShowcaseWrapperProps> = ({
  label,
  description,
  children,
  className,
}) => {
  return (
    <Card className={`shadow-lg border-border overflow-visible ${className}`}>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Render the modal trigger/example directly */}
        <div className="flex justify-center items-center min-h-[100px] p-4 mt-4">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModalShowcaseWrapper;
