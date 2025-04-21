
import { Star } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef } from 'react';

const Sponsors = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const animateScroll = () => {
      if (!scrollContainerRef.current) return;
      
      if (scrollContainerRef.current.scrollLeft >= scrollContainerRef.current.scrollWidth / 2) {
        scrollContainerRef.current.scrollLeft = 0;
      } else {
        scrollContainerRef.current.scrollLeft += 1;
      }
    };
    
    const intervalId = setInterval(animateScroll, 30);
    return () => clearInterval(intervalId);
  }, []);

  // Generate sponsors in double to create smooth infinite scroll
  const sponsorItems = Array(10).fill(null).map((_, i) => (
    <TooltipProvider key={i}>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex-shrink-0 w-20 h-20 mx-3 bg-[#222] rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer">
            <Star className="w-6 h-6 text-primary" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Become a sponsor</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ));

  return (
    <section className="py-20 bg-[#181818]">
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-bold text-center mb-12">Our Sponsors</h2>
        
        <div className="relative overflow-hidden">
          {/* Left shadow gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#181818] to-transparent"></div>
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex">
              {sponsorItems}
              {sponsorItems} {/* Duplicate for seamless looping */}
            </div>
          </div>
          
          {/* Right shadow gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#181818] to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
