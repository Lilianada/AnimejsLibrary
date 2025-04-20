
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Check } from "lucide-react"
import "./animations/cards/card-animations.css"

const cardList = [
  {
    title: "Profile Card",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80",
    desc: "Animated profile with hover reveal."
  },
  {
    title: "Feature Card",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
    desc: "Highlight important features with shadow lift."
  },
  {
    title: "Image Zoom Card",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    desc: "Smooth zoom on image hover."
  },
  {
    title: "Notification Card",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    desc: "Animated entry and badge."
  },
  {
    title: "Selectable Card",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
    desc: "Selectable with animated border."
  },
  {
    title: "Slide-in Tile",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    desc: "Slide a tile in on mount."
  }
];

const CardsExamples = () => {
  const [selected, setSelected] = useState<number|null>(null)
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
  }, [])
  
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Cards & Tiles</h2>
        <p className="text-muted-foreground">
          Explore fancy animated cards! On mount, cards stagger into view. Hover to see lift, reveal, and zoom effects. Click to select.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cardList.map((c, i) => (
          <Card
            key={i}
            className={
              "relative overflow-hidden card-hover " +
              (selected === i ? "card-selectable selected" : "card-selectable") +
              (i === 2 ? " image-zoom-container" : "") +
              (i === 1 ? " card-reveal" : "")
            }
            onClick={() => setSelected(selected === i ? null : i)}
            style={{ cursor: "pointer", minHeight: "320px" }}
          >
            {/* Selectable indicator */}
            <div className="absolute top-3 right-3 z-20 check-icon pointer-events-none">
              {selected === i && (
                <Check className="h-6 w-6 text-primary drop-shadow-lg" />
              )}
            </div>
            {/* Card Image with possible zoom */}
            <div className={i === 2
              ? "image-zoom"
              : "h-32 bg-cover bg-center"} style={{
                backgroundImage: `url(${c.image})`,
                height: "180px"
              }}>
            </div>
            <CardHeader>
              <CardTitle>{c.title}</CardTitle>
              <CardDescription>
                {c.desc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(i === 1) && (
                <div className="card-overlay">
                  <div className="text-xl mb-2 font-bold">Hover Reveal</div>
                  <div>This content slides in from the bottom!</div>
                </div>
              )}
              {(i !== 1) && (
                <div className="pt-2 text-sm text-muted-foreground">
                  {selected === i
                    ? "Selected! Fancy anime border and icon"
                    : "Click to select. Hover for more effects."}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <span className="text-xs text-muted-foreground">Card #{i + 1}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CardsExamples
