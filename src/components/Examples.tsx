
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
        element.style.transition = 'opacity 800ms, transform 800ms';
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
      }, index * 150);
    });
  }, []);

  return (
    <section className="py-20 bg-[#181818]" id="examples">
      <div className="container mx-auto px-4">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">
          <div className="grid-item col-span-2 row-span-2 bg-gradient-to-br from-[#fa8bff60] via-[#2bd2ff60] to-[#2bff8860] rounded-3xl p-6 transition" />
          <div className="grid-item bg-gradient-to-br from-[#ffe29f33] to-[#ff719a66] rounded-3xl p-6 transition" />
          <div className="grid-item bg-gradient-to-br from-[#49c6e5bb] to-[#b393fb99] rounded-3xl p-6 transition" />
          <div className="grid-item col-span-2 bg-gradient-to-br from-[#fcff9e] to-[#c67700bb] rounded-3xl p-6 transition" />
          <div className="grid-item col-span-1 row-span-2 bg-gradient-to-br from-[#24ff72bb] to-[#9a4eff99] rounded-3xl p-6 transition" />
          <div className="grid-item col-span-2 bg-gradient-to-br from-[#fa8bff44] via-[#2bd2ff44] to-[#2bff8844] rounded-3xl p-6 transition" />
        </div>
      </div>
    </section>
  );
};

export default Examples;
