
import { useState, useEffect, useRef, useCallback } from "react";
import { CodeToggle } from "../CodeToggle";
import { Move, RotateCcw } from "lucide-react";

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
  const dragItem = useRef<HTMLDivElement | null>(null);
  const draggedCardId = useRef<number | null>(null);
  const initialPosition = useRef({ x: 0, y: 0 });

  // Reset the cards to their initial state
  const resetCards = () => {
    setCards(initialCards.map(card => ({ ...card, x: 0, y: 0, isDragged: false })));
  };

  // Handle the start of dragging
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    draggedCardId.current = id;
    const cardElement = e.currentTarget;
    dragItem.current = cardElement;
    
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
    if (!draggedCardId.current || !dragItem.current) return;
    
    const cardElement = dragItem.current;
    const containerRect = cardElement.parentElement?.getBoundingClientRect();
    
    if (!containerRect) return;
    
    // Calculate new position
    const newX = e.clientX - containerRect.left - initialPosition.current.x;
    const newY = e.clientY - containerRect.top - initialPosition.current.y;
    
    // Update the card's position
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
    dragItem.current = null;
    
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

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative h-[400px] border rounded-lg flex items-center justify-center overflow-visible">
        {/* Card Stack */}
        <div className="relative w-64 h-64">
          {cards.map((card) => (
            <div
              key={card.id}
              className={\`absolute top-0 left-0 w-64 h-64 rounded-lg shadow-lg cursor-grab 
                active:cursor-grabbing transition-all duration-300 \${
                card.isDragged ? 'z-50 shadow-xl' : 'hover:shadow-xl'
              }\`}
              style={{
                backgroundImage: \`url(\${card.imageUrl})\`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: \`rotate(\${card.rotation}deg) translate(\${card.x}px, \${card.y}px)\`,
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
  const dragItem = useRef<HTMLDivElement | null>(null);
  const draggedCardId = useRef<number | null>(null);
  const initialPosition = useRef({ x: 0, y: 0 });

  // Reset the cards to their initial state
  const resetCards = () => {
    setCards(initialCards.map(card => ({ ...card, x: 0, y: 0, isDragged: false })));
  };

  // Handle the start of dragging
  const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    draggedCardId.current = id;
    const cardElement = e.currentTarget;
    dragItem.current = cardElement;
    
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
    if (!draggedCardId.current || !dragItem.current) return;
    
    const cardElement = dragItem.current;
    const containerRect = cardElement.parentElement?.getBoundingClientRect();
    
    if (!containerRect) return;
    
    // Calculate new position
    const newX = e.clientX - containerRect.left - initialPosition.current.x;
    const newY = e.clientY - containerRect.top - initialPosition.current.y;
    
    // Update the card's position
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === draggedCardId.current
          ? { ...card, x: newX, y: newY }
          : card
      )
    );
  }, []);

  // Handle the end of dragging
  const handleDragEnd = useCallback(() => {
    draggedCardId.current = null;
    dragItem.current = null;
    
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

  return (
    <div className="space-y-8">
      <CodeToggle
        previewContent={
          <div className="p-4 space-y-4">
            <h4 className="text-lg font-medium">Draggable Card Stack</h4>
            <div className="relative h-[400px] border rounded-lg flex items-center justify-center overflow-visible">
              {/* Card Stack */}
              <div className="relative w-64 h-64">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`absolute top-0 left-0 w-64 h-64 rounded-lg shadow-lg cursor-grab 
                      active:cursor-grabbing transition-all duration-300 group ${
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
