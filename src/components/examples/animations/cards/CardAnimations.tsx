import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import AnimationShowcaseCard from "@/components/examples/AnimationShowcaseCard";
import "./card-animations.css";

// Define individual animation components or JSX for previews
const HoverLiftPreview = () => (
  <Card className="card-hover w-full max-w-xs mx-auto">
    <CardHeader>
      <CardTitle>Hover Lift</CardTitle>
      <CardDescription>Elevate on hover</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Hover over this card to see it lift up.</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm">
        Learn More
      </Button>
    </CardFooter>
  </Card>
);

const ContentRevealPreview = () => (
  <Card className="card-reveal w-full max-w-xs mx-auto">
    <CardHeader>
      <CardTitle>Content Reveal</CardTitle>
      <CardDescription>Hidden information</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-32 flex items-center justify-center bg-muted rounded-md mb-4">
        <p className="text-center px-4">
          Hover to reveal additional content below
        </p>
      </div>
      <div className="card-overlay">
        <h3 className="text-lg font-bold mb-2">Hidden Content</h3>
        <p>This content slides in!</p>
      </div>
    </CardContent>
  </Card>
);

const ImageZoomPreview = () => (
  <Card className="overflow-hidden w-full max-w-xs mx-auto">
    <div className="image-zoom-container h-32">
      <div
        className="image-zoom"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')",
        }}
      />
    </div>
    <CardHeader>
      <CardTitle>Image Zoom</CardTitle>
      <CardDescription>Hover effect</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Hover over the image to see a smooth zoom.</p>
    </CardContent>
  </Card>
);

const SelectableCardPreview = () => {
  const [selected, setSelected] = useState(false);
  const handleSelect = () => setSelected(!selected);

  return (
    <Card
      className={`card-selectable relative w-full max-w-xs mx-auto cursor-pointer ${selected ? "selected" : ""}`}
      onClick={handleSelect}
      tabIndex={0} // Accessibility
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleSelect();
      }} // Accessibility
      aria-pressed={selected} // Accessibility
      role="button" // Accessibility
    >
      <div className="check-icon">
        <Check className="h-5 w-5 text-primary" />
      </div>
      <CardHeader>
        <CardTitle>Selectable Card</CardTitle>
        <CardDescription>Click to select</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Click this card to select/deselect it.</p>
      </CardContent>
    </Card>
  );
};

const FadeInPreview = () => (
  // Note: Key is added to force remount for demo purposes on toggle
  // In a real app, this animation usually runs once on initial mount.
  <Card className="animate-fade-in w-full max-w-xs mx-auto" key={Math.random()}>
    <CardHeader>
      <CardTitle>Fade In Card</CardTitle>
      <CardDescription>Entrance animation</CardDescription>
    </CardHeader>
    <CardContent>
      <p>This card fades in. (Animation restarts on toggle for demo).</p>
    </CardContent>
  </Card>
);

// Array of animation data - Removed title/description from top level
const CARD_ANIMATIONS = [
  {
    label: "Hover Lift",
    description: "Elevates card on hover with subtle shadow.",
    preview: <HoverLiftPreview />,
  },
  {
    label: "Content Reveal",
    description: "Reveals hidden content from bottom on hover.",
    preview: <ContentRevealPreview />,
  },
  {
    label: "Image Zoom",
    description: "Smoothly zooms the background image on hover.",
    preview: <ImageZoomPreview />,
  },
  {
    label: "Selectable Card",
    description: "Indicates selection state with border and checkmark.",
    preview: <SelectableCardPreview />,
  },
  {
    label: "Fade In",
    description: "Simple fade-in entrance animation on mount.",
    preview: <FadeInPreview />,
  },
];

const CardAnimations = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Card & Tile Animations</h2>
        <p className="text-muted-foreground">
          Explore various interactive animations for card components. Each
          includes a preview and you can copy the code to your project.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {CARD_ANIMATIONS.map((anim) => (
          <AnimationShowcaseCard
            key={anim.label}
            label={anim.label}
            description={anim.description}
            previewContent={anim.preview}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default CardAnimations;
