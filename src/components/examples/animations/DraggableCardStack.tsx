
import { useState, useRef, useEffect } from "react";
import { MoveIn, MoveOut } from "lucide-react"; // Updated icon imports
import { Card, CardContent } from "@/components/ui/card";
import * as anime from "animejs";

// Image data for the cards
const imageData = [
  {
    id: 1,
    src: "/placeholder.svg",
    alt: "Image 1",
    title: "Creative Design",
  },
  {
    id: 2,
    src: "/placeholder.svg",
    alt: "Image 2",
    title: "Interactive UI",
  },
  {
    id: 3,
    src: "/placeholder.svg",
    alt: "Image 3",
    title: "Modern Experience",
  },
];

interface Position {
  x: number;
  y: number;
}

const DraggableCardStack = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  // Set up initial card positions
  useEffect(() => {
    if (containerRef.current) {
      // Initialize positions for each card
      const initialPositions = imageData.map(() => ({ x: 0, y: 0 }));
      setPositions(initialPositions);
    }
  }, []);

  // Toggle expanded state
  const toggleExpand = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const cards = cardRefs.current.filter((ref): ref is HTMLDivElement => ref !== null);
    
    if (!expanded) {
      // Expand cards
      cards.forEach(card => {
        anime.default.remove(card);
      });
      
      anime.default.animate(cards, {
        translateX: (el, i) => [(i - 1) * 10, (i - 1) * 150],
        translateY: (el, i) => [-(i * 10), 0],
        rotate: (el, i) => [-(i * 2), 0],
        scale: [0.9, 1],
        opacity: [0.8, 1],
        delay: anime.default.stagger(100),
        easing: "easeOutElastic(1, .6)",
        duration: 800,
        complete: () => {
          setIsAnimating(false);
          setExpanded(true);
        }
      });
    } else {
      // Collapse cards
      cards.forEach(card => {
        anime.default.remove(card);
      });
      
      anime.default.animate(cards, {
        translateX: (el, i) => [(i - 1) * 150, (i - 1) * 10],
        translateY: (el, i) => [0, -(i * 10)],
        rotate: (el, i) => [0, -(i * 2)],
        scale: [1, 0.9],
        opacity: (el, i) => i === 0 ? 1 : 0.8,
        delay: anime.default.stagger(100, { from: 'last' }),
        easing: "easeInOutQuad",
        duration: 600,
        complete: () => {
          setIsAnimating(false);
          setExpanded(false);
        }
      });
    }
  };

  // Handle card dragging
  const startDrag = (index: number) => {
    if (!expanded) return;
    
    const cardElement = cardRefs.current[index];
    if (!cardElement) return;
    
    let startPos = { x: 0, y: 0 };
    let originalPos = { ...positions[index] };
    
    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      
      // Update position
      setPositions(prev => {
        const newPositions = [...prev];
        newPositions[index] = {
          x: originalPos.x + dx,
          y: originalPos.y + dy,
        };
        return newPositions;
      });
      
      // Apply position to the card
      anime.default.set(cardElement, {
        translateX: originalPos.x + dx,
        translateY: originalPos.y + dy,
      });
    };
    
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      
      // Animate card back to its original position with a spring effect
      anime.default.animate(cardElement, {
        translateX: [(originalPos.x + positions[index].x) / 2, (index - 1) * 150],
        translateY: [(originalPos.y + positions[index].y) / 2, 0],
        duration: 800,
        easing: "easeOutElastic(1, .6)",
        complete: () => {
          // Reset position in state
          setPositions(prev => {
            const newPositions = [...prev];
            newPositions[index] = { x: (index - 1) * 150, y: 0 };
            return newPositions;
          });
        }
      });
    };
    
    const onMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      startPos = { x: e.clientX, y: e.clientY };
      originalPos = { ...positions[index] };
      
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
    
    return onMouseDown;
  };

  // Initialize card refs
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  return (
    <div className="w-full flex items-center justify-center perspective-1000">
      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <div 
            ref={containerRef}
            className="relative w-full min-h-[300px] flex items-center justify-center"
          >
            {imageData.map((image, index) => (
              <div
                key={image.id}
                ref={(el) => setCardRef(el, index)}
                className="absolute w-64 h-64 rounded-xl overflow-hidden shadow-lg cursor-grab active:cursor-grabbing"
                style={{
                  zIndex: expanded ? imageData.length - index : index,
                  transform: `
                    translate(${expanded ? (index - 1) * 150 : (index - 1) * 10}px, ${expanded ? 0 : -(index * 10)}px) 
                    rotate(${expanded ? 0 : -(index * 2)}deg)
                    scale(${expanded ? 1 : 0.9})
                  `,
                  opacity: expanded ? 1 : index === 0 ? 1 : 0.8,
                  transition: isAnimating ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
                }}
                onMouseDown={expanded ? startDrag(index) : undefined}
              >
                <div className="relative w-full h-full bg-card">
                  {/* Card content */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h3 className="font-semibold">{image.title}</h3>
                    <p className="text-sm opacity-80">Click and drag to move</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Expand/collapse button */}
            <button
              className="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
              onClick={toggleExpand}
              disabled={isAnimating}
              title={expanded ? "Collapse cards" : "Expand cards"}
            >
              {expanded ? (
                <MoveIn className="w-4 h-4" />
              ) : (
                <MoveOut className="w-4 h-4" />
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DraggableCardStack;
