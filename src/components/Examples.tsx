
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
        <h2 className="text-lg font-bold text-center mb-12">Animation Examples</h2>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item}
              className="grid-item bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md mb-4" />
              <h3 className="text-base font-semibold mb-2">Animation {item}</h3>
              <p className="text-sm text-foreground/70">
                Beautiful, smooth animation example that you can use in your projects.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Examples;
