
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import * as anime from "animejs";

interface CardProps {
  image: string;
  alt: string;
  index: number;
  isDragging: boolean;
  dragPosition: { x: number; y: number };
  onDragStart: () => void;
  onDragEnd: () => void;
  onDrag: (x: number, y: number) => void;
}

const DraggableCardStack = () => {
  const cards = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Gradient bubble",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Abstract light",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      alt: "Abstract pattern",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1507908708918-778587c9e563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      alt: "Colorful smoke",
    },
  ];

  const [dragStates, setDragStates] = useState(
    cards.map(() => ({
      isDragging: false,
      dragPosition: { x: 0, y: 0 },
    }))
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // Handle drag start for a specific card
  const handleDragStart = (index: number) => {
    setDragStates((prev) => {
      const newStates = [...prev];
      newStates[index] = {
        ...newStates[index],
        isDragging: true,
      };
      return newStates;
    });
  };

  // Handle drag movement for a specific card
  const handleDrag = (index: number, x: number, y: number) => {
    setDragStates((prev) => {
      const newStates = [...prev];
      newStates[index] = {
        ...newStates[index],
        dragPosition: { x, y },
      };
      return newStates;
    });
  };

  // Handle drag end for a specific card
  const handleDragEnd = (index: number) => {
    setDragStates((prev) => {
      const newStates = [...prev];
      newStates[index] = {
        ...newStates[index],
        isDragging: false,
      };
      return newStates;
    });
  };

  // Reset all cards to initial positions
  const resetCards = () => {
    // Use anime.js for the reset animation
    cards.forEach((_, index) => {
      anime.default({
        targets: `.card-${index}`,
        translateX: 0,
        translateY: 0,
        rotate: getInitialRotation(index),
        opacity: 1,
        scale: 1,
        duration: 600,
        easing: "easeOutElastic(1, .6)",
      });
    });

    // Reset state after animation completes
    setTimeout(() => {
      setDragStates(
        cards.map(() => ({
          isDragging: false,
          dragPosition: { x: 0, y: 0 },
        }))
      );
    }, 600);
  };

  // Initial animation when component mounts
  useEffect(() => {
    anime.default({
      targets: ".draggable-card",
      scale: [0.9, 1],
      opacity: [0, 1],
      delay: anime.stagger(150),
      duration: 800,
      easing: "easeOutElastic(1, .6)",
    });
  }, []);

  // Helper function to get initial rotation for each card
  const getInitialRotation = (index: number): number => {
    const rotations = [-3, 2, -2, 4];
    return rotations[index % rotations.length];
  };

  return (
    <div className="space-y-8">
      <div className="border rounded-lg p-6 relative">
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            Drag each card to reveal the ones underneath. Click the reset button
            to rearrange the stack.
          </p>
        </div>

        {/* Card stack container */}
        <div
          ref={containerRef}
          className="relative h-[400px] md:h-[500px] w-full max-w-md mx-auto perspective-500"
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              image={card.image}
              alt={card.alt}
              index={index}
              isDragging={dragStates[index].isDragging}
              dragPosition={dragStates[index].dragPosition}
              onDragStart={() => handleDragStart(index)}
              onDragEnd={() => handleDragEnd(index)}
              onDrag={(x, y) => handleDrag(index, x, y)}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={resetCards}
            size="sm"
            variant="outline"
            className="flex gap-2 items-center"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Stack</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Implementation</h3>
        <div className="bg-muted/30 rounded-lg p-6 text-sm overflow-auto max-h-[600px]">
          <pre className="whitespace-pre-wrap">
            {`import React, { useState, useRef, useEffect } from "react";
import * as anime from "animejs";

interface CardProps {
  image: string;
  alt: string;
  index: number;
  isDragging: boolean;
  dragPosition: { x: number; y: number };
  onDragStart: () => void;
  onDragEnd: () => void;
  onDrag: (x: number, y: number) => void;
}

const Card: React.FC<CardProps> = ({
  image,
  alt,
  index,
  isDragging,
  dragPosition,
  onDragStart,
  onDragEnd,
  onDrag,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  // Initial rotation for the stacked appearance
  const getInitialRotation = () => {
    const rotations = [-3, 2, -2, 4]; 
    return rotations[index % rotations.length];
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    e.preventDefault();
    onDragStart();
    
    // Record initial mouse position
    startPos.current = {
      x: e.clientX - dragPosition.x,
      y: e.clientY - dragPosition.y
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const x = e.clientX - startPos.current.x;
    const y = e.clientY - startPos.current.y;
    onDrag(x, y);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    onDragEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardRef.current || e.touches.length !== 1) return;
    
    e.preventDefault();
    onDragStart();
    
    // Record initial touch position
    startPos.current = {
      x: e.touches[0].clientX - dragPosition.x,
      y: e.touches[0].clientY - dragPosition.y
    };
    
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    
    e.preventDefault(); // Prevent scrolling while dragging
    
    const x = e.touches[0].clientX - startPos.current.x;
    const y = e.touches[0].clientY - startPos.current.y;
    onDrag(x, y);
  };

  const handleTouchEnd = () => {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
    onDragEnd();
  };

  // Calculate z-index based on card position and drag state
  const zIndex = isDragging ? 10 : 3 - index;

  // Calculate the stacking appearance (cards getting smaller as they go deeper)
  const scale = 1 - index * 0.03;
  
  // Calculate the slight offset for each card in the stack
  const translateY = index * -4;

  return (
    <div
      ref={cardRef}
      className={\`draggable-card card-\${index} absolute inset-0 cursor-grab active:cursor-grabbing select-none\`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        transform: \`translateX(\${dragPosition.x}px) translateY(\${dragPosition.y + translateY}px) rotate(\${getInitialRotation()}deg) scale(\${scale})\`,
        zIndex,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

const DraggableCardStack = () => {
  // Card data and state management...
  // Reset functionality with anime.js...
  
  return (
    <div>
      {/* Card stack container */}
      <div className="relative h-[400px] w-full max-w-md mx-auto perspective-500">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            image={card.image}
            alt={card.alt}
            index={index}
            isDragging={dragStates[index].isDragging}
            dragPosition={dragStates[index].dragPosition}
            onDragStart={() => handleDragStart(index)}
            onDragEnd={() => handleDragEnd(index)}
            onDrag={(x, y) => handleDrag(index, x, y)}
          />
        ))}
      </div>
      
      <button onClick={resetCards}>
        Reset Stack
      </button>
    </div>
  );
};

export default DraggableCardStack;`}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Separate Card component for draggable functionality
const Card: React.FC<CardProps> = ({
  image,
  alt,
  index,
  isDragging,
  dragPosition,
  onDragStart,
  onDragEnd,
  onDrag,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  // Initial rotation for the stacked appearance
  const getInitialRotation = useCallback(() => {
    const rotations = [-3, 2, -2, 4];
    return rotations[index % rotations.length];
  }, [index]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    e.preventDefault();
    onDragStart();
    
    // Record initial mouse position
    startPos.current = {
      x: e.clientX - dragPosition.x,
      y: e.clientY - dragPosition.y
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX - startPos.current.x;
    const y = e.clientY - startPos.current.y;
    onDrag(x, y);
  }, [onDrag]);

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    onDragEnd();
  }, [handleMouseMove, onDragEnd]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardRef.current || e.touches.length !== 1) return;
    
    e.preventDefault();
    onDragStart();
    
    // Record initial touch position
    startPos.current = {
      x: e.touches[0].clientX - dragPosition.x,
      y: e.touches[0].clientY - dragPosition.y
    };
    
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    
    e.preventDefault(); // Prevent scrolling while dragging
    
    const x = e.touches[0].clientX - startPos.current.x;
    const y = e.touches[0].clientY - startPos.current.y;
    onDrag(x, y);
  }, [onDrag]);

  const handleTouchEnd = useCallback(() => {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
    onDragEnd();
  }, [handleTouchMove, onDragEnd]);

  // Calculate z-index based on card position and drag state
  const zIndex = isDragging ? 10 : 3 - index;

  // Calculate the stacking appearance (cards getting smaller as they go deeper)
  const scale = 1 - index * 0.03;
  
  // Calculate the slight offset for each card in the stack
  const translateY = index * -4;

  return (
    <div
      ref={(el) => {
        if (el) cardRef.current = el;
      }}
      className={`draggable-card card-${index} absolute inset-0 cursor-grab active:cursor-grabbing select-none`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        transform: `translateX(${dragPosition.x}px) translateY(${dragPosition.y + translateY}px) rotate(${getInitialRotation()}deg) scale(${scale})`,
        zIndex,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default DraggableCardStack;
