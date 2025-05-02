
import { useState, useRef, useEffect } from "react";
import { CodeToggle } from "../CodeToggle";
import { ArrowsPointingOutIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { ArrowsPointingOut, RotateCw } from "lucide-react";
import anime from "animejs";

const DraggableCardStack = () => {
  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-6">
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Draggable Card Stack</h4>
              <div className="border rounded-lg p-8 min-h-[400px] flex items-center justify-center bg-muted/30">
                <CardStack />
              </div>
            </div>
          }
          codeContent={cardStackCode}
          minHeightClass="min-h-[500px]"
        />
        
        <div className="space-y-4 p-6 bg-muted/30 rounded-lg">
          <h3 className="text-xl font-semibold">How It Works</h3>
          <div className="space-y-3">
            <div className="flex gap-2 items-start">
              <span className="bg-primary/20 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center shrink-0">1</span>
              <p className="text-sm">Each card in the stack is positioned with subtle rotation and translate offsets to create a stacked appearance.</p>
            </div>
            <div className="flex gap-2 items-start">
              <span className="bg-primary/20 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center shrink-0">2</span>
              <p className="text-sm">When a user clicks or touches a card, it becomes draggable using mouse or touch events.</p>
            </div>
            <div className="flex gap-2 items-start">
              <span className="bg-primary/20 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center shrink-0">3</span>
              <p className="text-sm">The card follows the cursor/finger with a smooth animation powered by anime.js.</p>
            </div>
            <div className="flex gap-2 items-start">
              <span className="bg-primary/20 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center shrink-0">4</span>
              <p className="text-sm">When released, the card stays in its final position, revealing cards underneath.</p>
            </div>
            <div className="flex gap-2 items-start">
              <span className="bg-primary/20 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center shrink-0">5</span>
              <p className="text-sm">The reset button animates all cards back to their original position in the stack.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card Stack Component
const CardStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const cardInitialPos = useRef<{x: number, y: number, rotation: number}[]>([]);
  
  // Set up initial positions for cards
  useEffect(() => {
    if (!containerRef.current) return;
    
    const cards = cardsRef.current.filter(Boolean);
    
    // Store initial positions
    cardInitialPos.current = cards.map((_, i) => ({
      x: i * -2,
      y: i * -2,
      rotation: (i - 1.5) * -3
    }));
    
    // Apply initial positions and rotations
    cards.forEach((card, i) => {
      if (card) {
        anime({
          targets: card,
          translateX: cardInitialPos.current[i].x,
          translateY: cardInitialPos.current[i].y,
          rotate: cardInitialPos.current[i].rotation,
          opacity: 1,
          easing: 'easeOutQuad',
          duration: 500,
          delay: i * 100
        });
      }
    });
  }, []);
  
  // Handle mouse and touch events
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    e.preventDefault();
    setIsDragging(index);
    
    // Get mouse/touch start position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    dragStartPos.current = { x: clientX, y: clientY };
  };
  
  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (isDragging === null) return;
    
    // Get current mouse/touch position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Calculate drag distance
    const deltaX = clientX - dragStartPos.current.x;
    const deltaY = clientY - dragStartPos.current.y;
    
    const card = cardsRef.current[isDragging];
    if (card) {
      anime({
        targets: card,
        translateX: cardInitialPos.current[isDragging].x + deltaX,
        translateY: cardInitialPos.current[isDragging].y + deltaY,
        rotate: cardInitialPos.current[isDragging].rotation,
        easing: 'linear',
        duration: 0
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(null);
  };
  
  // Add and remove event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  });
  
  // Handle reset button click
  const handleReset = () => {
    const cards = cardsRef.current.filter(Boolean);
    
    cards.forEach((card, i) => {
      if (card) {
        anime({
          targets: card,
          translateX: cardInitialPos.current[i].x,
          translateY: cardInitialPos.current[i].y,
          rotate: cardInitialPos.current[i].rotation,
          opacity: 1,
          easing: 'easeOutElastic(1, .5)',
          duration: 800
        });
      }
    });
  };

  // Images for cards
  const cardImages = [
    "https://images.unsplash.com/photo-1686914143117-3aa3fc9d2340?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1683009427738-e836bed10849?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1628373383885-4be0bc0172fa?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1672700955223-35f6abf19f62?q=80&w=1964&auto=format&fit=crop"
  ];

  return (
    <div className="relative w-full max-w-md">
      <div 
        ref={containerRef}
        className="relative h-80 sm:h-96 w-full flex items-center justify-center"
      >
        {cardImages.map((image, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            className={`absolute w-64 h-64 bg-card rounded-lg shadow-lg cursor-grab opacity-0
              ${isDragging === i ? 'z-20 cursor-grabbing shadow-xl' : `z-${10 - i}`}
            `}
            style={{ 
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onMouseDown={(e) => handleMouseDown(e, i)}
            onTouchStart={(e) => handleMouseDown(e, i)}
          >
            <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white opacity-80">
                {i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <Button
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleReset}
        >
          <RotateCw className="w-4 h-4" />
          Reset Stack
        </Button>
      </div>
    </div>
  );
};

const cardStackCode = `import { useState, useRef, useEffect } from "react";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import anime from "animejs";

const CardStack = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [isDragging, setIsDragging] = useState(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const cardInitialPos = useRef([]);
  
  // Set up initial positions for cards
  useEffect(() => {
    if (!containerRef.current) return;
    
    const cards = cardsRef.current.filter(Boolean);
    
    // Store initial positions
    cardInitialPos.current = cards.map((_, i) => ({
      x: i * -2,
      y: i * -2,
      rotation: (i - 1.5) * -3
    }));
    
    // Apply initial positions and rotations
    cards.forEach((card, i) => {
      if (card) {
        anime({
          targets: card,
          translateX: cardInitialPos.current[i].x,
          translateY: cardInitialPos.current[i].y,
          rotate: cardInitialPos.current[i].rotation,
          opacity: 1,
          easing: 'easeOutQuad',
          duration: 500,
          delay: i * 100
        });
      }
    });
  }, []);
  
  // Handle mouse and touch events
  const handleMouseDown = (e, index) => {
    e.preventDefault();
    setIsDragging(index);
    
    // Get mouse/touch start position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    dragStartPos.current = { x: clientX, y: clientY };
  };
  
  const handleMouseMove = (e) => {
    if (isDragging === null) return;
    
    // Get current mouse/touch position
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Calculate drag distance
    const deltaX = clientX - dragStartPos.current.x;
    const deltaY = clientY - dragStartPos.current.y;
    
    const card = cardsRef.current[isDragging];
    if (card) {
      anime({
        targets: card,
        translateX: cardInitialPos.current[isDragging].x + deltaX,
        translateY: cardInitialPos.current[isDragging].y + deltaY,
        rotate: cardInitialPos.current[isDragging].rotation,
        easing: 'linear',
        duration: 0
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(null);
  };
  
  // Add and remove event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  });
  
  // Handle reset button click
  const handleReset = () => {
    const cards = cardsRef.current.filter(Boolean);
    
    cards.forEach((card, i) => {
      if (card) {
        anime({
          targets: card,
          translateX: cardInitialPos.current[i].x,
          translateY: cardInitialPos.current[i].y,
          rotate: cardInitialPos.current[i].rotation,
          opacity: 1,
          easing: 'easeOutElastic(1, .5)',
          duration: 800
        });
      }
    });
  };

  // Images for cards (replace with your own)
  const cardImages = [
    "https://images.unsplash.com/photo-1686914143117-3aa3fc9d2340?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1683009427738-e836bed10849?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1628373383885-4be0bc0172fa?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1672700955223-35f6abf19f62?q=80&w=1964&auto=format&fit=crop"
  ];

  return (
    <div className="relative w-full max-w-md">
      <div 
        ref={containerRef}
        className="relative h-80 sm:h-96 w-full flex items-center justify-center"
      >
        {cardImages.map((image, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            className={\`absolute w-64 h-64 bg-card rounded-lg shadow-lg cursor-grab opacity-0
              \${isDragging === i ? 'z-20 cursor-grabbing shadow-xl' : \`z-\${10 - i}\`}
            \`}
            style={{ 
              backgroundImage: \`url(\${image})\`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onMouseDown={(e) => handleMouseDown(e, i)}
            onTouchStart={(e) => handleMouseDown(e, i)}
          >
            <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white opacity-80">
                {i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <Button
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleReset}
        >
          <RotateCw className="w-4 h-4" />
          Reset Stack
        </Button>
      </div>
    </div>
  );
};

export default CardStack;`;

export default DraggableCardStack;
