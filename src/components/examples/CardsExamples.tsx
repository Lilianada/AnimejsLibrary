
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Check, ArrowUp, Code, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import "./animations/cards/card-animations.css"
import { toast } from 'sonner';
import CodeBlock from '@/components/examples/animations/CodeBlock';

const CARD_DESIGNS = [
  {
    title: "Hover Lift Card",
    description: "Elevates on hover with enhanced shadow",
    className: "card-hover",
    code: `.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}`
  },
  {
    title: "Content Reveal",
    description: "Slides content from bottom on hover",
    className: "card-reveal",
    code: `.card-reveal {
  position: relative;
  overflow: hidden;
}

.card-reveal .card-overlay {
  position: absolute;
  bottom: -100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  transition: bottom 0.3s ease-in-out;
}

.card-reveal:hover .card-overlay {
  bottom: 0;
}`
  },
  {
    title: "Image Zoom",
    description: "Smooth zoom effect on hover",
    className: "image-zoom-container",
    code: `.image-zoom-container {
  overflow: hidden;
}

.image-zoom {
  width: 100%;
  height: 100%;
  background-size: cover;
  transition: transform 0.5s ease;
}

.image-zoom-container:hover .image-zoom {
  transform: scale(1.1);
}`
  },
  {
    title: "Border Highlight",
    description: "Animated colorful border on hover",
    className: "card-border-highlight",
    code: `.card-border-highlight {
  position: relative;
  overflow: hidden;
}

.card-border-highlight::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  background: linear-gradient(to right, #FDA858, #9046ff);
  transition: height 0.3s ease;
}

.card-border-highlight:hover::before {
  height: 4px;
}`
  },
  {
    title: "Tilt Effect",
    description: "3D tilt animation",
    className: "card-tilt",
    code: `.card-tilt {
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.card-tilt:hover {
  transform: rotateX(5deg) rotateY(5deg);
}`
  },
  {
    title: "Pulse Animation",
    description: "Attention-grabbing pulse effect",
    className: "card-pulse",
    code: `@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(253, 168, 88, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(253, 168, 88, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(253, 168, 88, 0);
  }
}

.card-pulse:hover {
  animation: pulse 1.5s infinite;
}`
  }
];

const CardsExamples = () => {
  const [selected, setSelected] = useState<number|null>(null);
  const [showCode, setShowCode] = useState<number|null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered fade-in / slide-in for cards
    if (gridRef.current) {
      const cards = Array.from(gridRef.current.children) as HTMLElement[];
      cards.forEach((card, i) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(24px)";
        setTimeout(() => {
          card.style.transition = "opacity 0.5s cubic-bezier(.42,0,.58,1), transform 0.5s";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 150 + i * 130)
      })
    }
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };
  
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Cards & Tiles</h2>
        <p className="text-muted-foreground">
          A collection of animated cards with various hover effects. Click on a card to select it or view its code.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CARD_DESIGNS.map((design, i) => (
          <Card
            key={i}
            className={`relative overflow-hidden card-selectable ${
              selected === i ? "selected" : ""
            } ${design.className}`}
            onClick={() => setSelected(selected === i ? null : i)}
          >
            <div className="absolute top-3 right-3 flex space-x-2 z-20">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 bg-background/50"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCode(showCode === i ? null : i);
                }}
              >
                <Code size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 bg-background/50"
                onClick={(e) => {
                  e.stopPropagation();
                  copyCode(design.code);
                }}
              >
                <Copy size={16} />
              </Button>
            </div>

            {/* Selectable indicator */}
            <div className="absolute top-3 left-3 z-20 check-icon pointer-events-none">
              {selected === i && (
                <Check className="h-6 w-6 text-primary drop-shadow-lg" />
              )}
            </div>

            {showCode === i ? (
              <CardContent className="pt-10">
                <CodeBlock code={design.code} />
              </CardContent>
            ) : (
              <>
                {design.className === "image-zoom-container" ? (
                  <div className="image-zoom" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')",
                    height: "140px"
                  }}></div>
                ) : null}
                
                <CardHeader>
                  <CardTitle>{design.title}</CardTitle>
                  <CardDescription>{design.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  {design.className === "card-reveal" && (
                    <div className="card-overlay">
                      <div className="text-xl mb-2 font-bold">Hidden Content</div>
                      <div>This content reveals on hover!</div>
                    </div>
                  )}
                  
                  <p className="text-sm text-muted-foreground">
                    Hover over this card to see the {design.title.toLowerCase()} effect in action.
                    {selected === i && " This card is currently selected."}
                  </p>
                </CardContent>
                
                <CardFooter>
                  <Button variant="outline" size="sm">
                    <ArrowUp className="mr-2 h-4 w-4" />
                    {selected === i ? "Selected" : "Select Card"}
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        ))}

        {/* Card Flip Demo */}
        <div className="card-flip-container">
          <div className="card-flip">
            <Card className="card-flip-front">
              <CardHeader>
                <CardTitle>Card Flip</CardTitle>
                <CardDescription>Hover to flip</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  This card flips when you hover over it. Perfect for before/after presentations or revealing information.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">Front Side</Button>
              </CardFooter>
            </Card>
            <Card className="card-flip-back bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Back Side</CardTitle>
                <CardDescription className="text-primary-foreground/70">Flipped content</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-primary-foreground/70">
                  This is the back of the card. You can add any content here like additional information or even a form.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/20">
                  Back Side Action
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardsExamples
