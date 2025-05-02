
import { useState, useEffect, useRef, useCallback } from "react";
import { CodeToggle } from "../CodeToggle";
import { Move, RotateCcw } from "lucide-react";
import anime from "animejs";

// Define type for a card in the stack
type Card = {
  id: number;
  imageUrl: string;
  rotation: number;
  x: number;
  y: number;
  isDragged: boolean;
};

const DraggableCardStack = () => {
  const codeString = `import { useState, useEffect, useRef } from "react";
import { Move, RotateCcw } from "lucide-react";
import anime from "animejs";

// Define type for a card in the stack
type Card = {
  id: number;
  imageUrl: string;
  rotation: number;
  x: number;
  y: number;
  isDragged: boolean;
};

const DraggableCardStack = () => {
  // Initial cards data
  const initialCards: Card[] = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
      rotation: -3,
      x: 0,
      y: 0,
      isDragged: false,
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1",
      rotation: 2,
      x: 0,
      y: 0,
      isDragged: false,
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c",
      rotation: -1,
      x: 0,
      y: 0,
      isDragged: false,
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1590479773265-7464e5d48118",
      rotation: 3,
      x: 0,
      y: 0,
      isDragged: false,
    },
  ];

  const [cards, setCards] = useState<Card[]>(initialCards);
  const draggedCardId = useRef<number | null>(null);
  const initialPosition = useRef({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Reset the cards to their initial state
  const resetCards = () => {
    // First set the state
    setCards(initialCards.map(card => ({ ...card, x: 0, y: 0, isDragged: false })));
    
    // Then animate the cards back to their original positions
    cardRefs.current.forEach((cardEl, index) => {
      if (cardEl) {
        anime({
          targets: cardEl,
          translateX: 0,
          translateY: 0,
          rotate: initialCards[index].rotation,
          duration: 800,
          easing: 'easeOutElastic(1, .6)'
        });
      }
    });
  };

  // Handle the start of dragging
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    draggedCardId.current = id;
    const cardElement = e.currentTarget;
    
    // Get initial mouse position
    initialPosition.current = {
      x: e.clientX - cardElement.getBoundingClientRect().left,
      y: e.clientY - cardElement.getBoundingClientRect().top,
    };
    
    // Update the card's state
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isDragged: true } : card
      )
    );
    
    // Add global event listeners
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  };

  // Handle the dragging
  const handleDrag = (e: MouseEvent) => {
    if (!draggedCardId.current) return;
    
    const cardIndex = cards.findIndex(card => card.id === draggedCardId.current);
    if (cardIndex === -1) return;
    
    const cardEl = cardRefs.current[cardIndex];
    if (!cardEl) return;
    
    const containerRect = cardEl.parentElement?.getBoundingClientRect();
    if (!containerRect) return;
    
    // Calculate new position
    const newX = e.clientX - containerRect.left - initialPosition.current.x;
    const newY = e.clientY - containerRect.top - initialPosition.current.y;
    
    // Use anime.js for smooth dragging
    anime.set(cardEl, {
      translateX: newX,
      translateY: newY
    });
    
    // Update state
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === draggedCardId.current
          ? { ...card, x: newX, y: newY }
          : card
      )
    );
  };

  // Handle the end of dragging
  const handleDragEnd = () => {
    draggedCardId.current = null;
    
    // Remove global event listeners
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  // Clean up event listeners when component unmounts
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, []);

  // Animate cards on initial render
  useEffect(() => {
    cardRefs.current.forEach((cardEl, index) => {
      if (cardEl) {
        // Start cards from the center and animate them into position
        anime.set(cardEl, {
          translateX: 0,
          translateY: 0,
          rotate: 0,
          scale: 0.8,
          opacity: 0
        });
        
        // Animate cards into initial positions
        anime({
          targets: cardEl,
          translateX: 0,
          translateY: 0,
          rotate: initialCards[index].rotation,
          scale: 1,
          opacity: 1,
          duration: 800,
          delay: index * 150,
          easing: 'easeOutElastic(1, .6)'
        });
      }
    });
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative h-[400px] border rounded-lg flex items-center justify-center overflow-visible">
        {/* Card Stack */}
        <div className="relative w-64 h-64">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={el => cardRefs.current[index] = el}
              className={\`absolute top-0 left-0 w-64 h-64 rounded-lg shadow-lg cursor-grab 
                active:cursor-grabbing transition-shadow duration-300 \${
                card.isDragged ? 'z-50 shadow-xl' : 'hover:shadow-xl'
              }\`}
              style={{
                backgroundImage: \`url(\${card.imageUrl})\`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: \`rotate(\${card.rotation}deg)\`,
                zIndex: card.isDragged ? 50 : 5 - card.id,
              }}
              onMouseDown={(e) => handleDragStart(e, card.id)}
            >
              <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center">
                <Move className="text-white/70 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Reset Button */}
        <button
          onClick={resetCards}
          className="absolute bottom-4 right-4 p-2 bg-primary/80 text-white rounded-full 
            hover:bg-primary transition-colors shadow-lg"
          aria-label="Reset card stack"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-muted-foreground text-sm">
          Drag each card to reveal the ones underneath. 
          Click the reset button to restore the stack.
        </p>
      </div>
    </div>
  );
};

export default DraggableCardStack;`;

  // Initial cards data
  const initialCards: Card[] = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600",
      rotation: -3,
      x: 0,
      y: 0,
      isDragged: false,
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=600",
      rotation: 2,
      x: 0,
      y: 0,
      isDragged: false,
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?auto=format&fit=crop&w=600",
      rotation: -1,
      x: 0,
      y: 0,
      isDragged: false,
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1590479773265-7464e5d48118?auto=format&fit=crop&w=600",
      rotation: 3,
      x: 0,
      y: 0,
      isDragged: false,
    },
  ];

  const [cards, setCards] = useState<Card[]>(initialCards);
  const draggedCardId = useRef<number | null>(null);
  const initialPosition = useRef({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Reset the cards to their initial state
  const resetCards = () => {
    // First set the state
    setCards(initialCards.map(card => ({ ...card, x: 0, y: 0, isDragged: false })));
    
    // Then animate the cards back to their original positions with anime.js
    cardRefs.current.forEach((cardEl, index) => {
      if (cardEl) {
        anime({
          targets: cardEl,
          translateX: 0,
          translateY: 0,
          rotate: initialCards[index].rotation,
          scale: [0.95, 1],
          opacity: [0.9, 1],
          duration: 800,
          delay: index * 100,
          easing: 'easeOutElastic(1, .6)'
        });
      }
    });
  };

  // Handle the start of dragging
  const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    draggedCardId.current = id;
    const cardElement = e.currentTarget;
    
    // Get initial mouse position
    initialPosition.current = {
      x: e.clientX - cardElement.getBoundingClientRect().left,
      y: e.clientY - cardElement.getBoundingClientRect().top,
    };
    
    // Update the card's state
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isDragged: true } : card
      )
    );
    
    // Add global event listeners
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  }, []);

  // Handle the dragging
  const handleDrag = useCallback((e: MouseEvent) => {
    if (!draggedCardId.current) return;
    
    const cardIndex = cards.findIndex(card => card.id === draggedCardId.current);
    if (cardIndex === -1) return;
    
    const cardEl = cardRefs.current[cardIndex];
    if (!cardEl) return;
    
    const containerRect = cardEl.parentElement?.getBoundingClientRect();
    if (!containerRect) return;
    
    // Calculate new position
    const newX = e.clientX - containerRect.left - initialPosition.current.x;
    const newY = e.clientY - containerRect.top - initialPosition.current.y;
    
    // Use anime.js for smooth dragging
    anime.set(cardEl, {
      translateX: newX,
      translateY: newY
    });
    
    // Update state
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === draggedCardId.current
          ? { ...card, x: newX, y: newY }
          : card
      )
    );
  }, [cards]);

  // Handle the end of dragging
  const handleDragEnd = useCallback(() => {
    if (!draggedCardId.current) return;
  
    // Update state to reflect the drag end
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === draggedCardId.current
          ? { ...card, isDragged: false }
          : card
      )
    );
    
    // Clear reference
    draggedCardId.current = null;
    
    // Remove global event listeners
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  }, [handleDrag]);

  // Clean up event listeners when component unmounts
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [handleDrag, handleDragEnd]);

  // Animate cards on initial render
  useEffect(() => {
    cardRefs.current.forEach((cardEl, index) => {
      if (cardEl) {
        // Start cards from the center and animate them into position
        anime.set(cardEl, {
          translateX: 0,
          translateY: 0,
          rotate: 0,
          scale: 0.8,
          opacity: 0
        });
        
        // Animate cards into initial positions with anime.js
        anime({
          targets: cardEl,
          translateX: 0,
          translateY: 0,
          rotate: initialCards[index].rotation,
          scale: 1,
          opacity: 1,
          duration: 800,
          delay: index * 150,
          easing: 'easeOutElastic(1, .6)'
        });
      }
    });
  }, []);

  return (
    <div className="space-y-8">
      <CodeToggle
        previewContent={
          <div className="p-4 space-y-4">
            <h4 className="text-lg font-medium">Draggable Card Stack</h4>
            <div className="relative h-[400px] border rounded-lg flex items-center justify-center overflow-visible">
              {/* Card Stack */}
              <div className="relative w-64 h-64">
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    ref={el => cardRefs.current[index] = el}
                    className={`absolute top-0 left-0 w-64 h-64 rounded-lg shadow-lg cursor-grab 
                      active:cursor-grabbing transition-shadow duration-300 group ${
                      card.isDragged ? 'z-50 shadow-xl' : 'hover:shadow-xl'
                    }`}
                    style={{
                      backgroundImage: `url(${card.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transform: `rotate(${card.rotation}deg) translate(${card.x}px, ${card.y}px)`,
                      zIndex: card.isDragged ? 50 : 5 - card.id,
                    }}
                    onMouseDown={(e) => handleDragStart(e, card.id)}
                  >
                    <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center">
                      <Move className="text-white/70 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Reset Button */}
              <button
                onClick={resetCards}
                className="absolute bottom-4 right-4 p-2 bg-primary/80 text-white rounded-full 
                  hover:bg-primary transition-colors shadow-lg"
                aria-label="Reset card stack"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Drag each card to reveal the ones underneath. 
                Click the reset button to restore the stack.
              </p>
            </div>
          </div>
        }
        codeContent={codeString}
      />
    </div>
  );
};

export default DraggableCardStack;
