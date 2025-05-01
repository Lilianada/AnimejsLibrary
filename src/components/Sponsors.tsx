import { Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef } from "react";

// Infinite scroll from left to right, with gradient fade on both sides.
const Sponsors = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateScroll = () => {
      if (!scrollContainerRef.current) return;

      // Loop when over halfway scrolled (for smooth effect)
      if (
        scrollContainerRef.current.scrollLeft >=
        scrollContainerRef.current.scrollWidth / 2
      ) {
        scrollContainerRef.current.scrollLeft = 0;
      } else {
        scrollContainerRef.current.scrollLeft += 1;
      }
    };

    const intervalId = setInterval(animateScroll, 24);
    return () => clearInterval(intervalId);
  }, []);

  // Generate sponsors (small size)
  const sponsorItems = Array(10)
    .fill(null)
    .map((_, i) => (
      <TooltipProvider key={i}>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex-shrink-0 w-10 h-10 mx-2 bg-[#222] rounded-lg flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer">
              <Star className="w-5 h-5 text-primary" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Become a sponsor</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ));

  return (
    <section className="py-16 bg-[#181818]">
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-bold text-center mb-10">Our Sponsors</h2>
        <div className="relative overflow-hidden">
          {/* Left shadow gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-[#181818] to-transparent"></div>
          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide py-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              marginLeft: "48px",
              marginRight: "48px",
              width: "calc(100% - 96px)",
            }}
          >
            <div className="flex">
              {sponsorItems}
              {sponsorItems}
            </div>
          </div>
          {/* Right shadow gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-[#181818] to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
