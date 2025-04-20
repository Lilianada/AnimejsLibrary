
import { useEffect, useRef } from 'react';

const Examples = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach((item, index) => {
      const element = item as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'scale(0.8)';
      
      setTimeout(() => {
        element.style.transition = 'opacity 800ms ease-out, transform 800ms ease-out';
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
      }, index * 150);
    });
  }, []);

  return (
    <section className="py-20 bg-background" id="examples">
      <div className="container mx-auto px-4">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
          <div className="grid-item col-span-2 row-span-2 bg-secondary/10 rounded-3xl p-6 hover:bg-secondary/20 transition-colors" />
          <div className="grid-item bg-secondary/10 rounded-3xl p-6 hover:bg-secondary/20 transition-colors" />
          <div className="grid-item bg-secondary/10 rounded-3xl p-6 hover:bg-secondary/20 transition-colors" />
          <div className="grid-item col-span-2 bg-secondary/10 rounded-3xl p-6 hover:bg-secondary/20 transition-colors" />
          <div className="grid-item col-span-1 row-span-2 bg-secondary/10 rounded-3xl p-6 hover:bg-secondary/20 transition-colors" />
          <div className="grid-item col-span-2 bg-secondary/10 rounded-3xl p-6 hover:bg-secondary/20 transition-colors" />
        </div>
      </div>
    </section>
  );
};

export default Examples;
