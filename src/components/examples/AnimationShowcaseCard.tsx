import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AnimationShowcaseCardProps {
  label: string;
  description: string;
  previewContent: React.ReactNode;
  className?: string;
}

const AnimationShowcaseCard: React.FC<AnimationShowcaseCardProps> = ({
  label,
  description,
  previewContent,
  className,
}) => {
  return (
    <Card className={`shadow-lg border-border overflow-visible ${className}`}>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center min-h-[200px] p-4 mt-4 border border-dashed border-border/50 rounded-md">
          {previewContent}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimationShowcaseCard;
