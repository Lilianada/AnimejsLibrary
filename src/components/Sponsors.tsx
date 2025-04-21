
import { Star } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sponsors = () => {
  return (
    <section className="py-20 bg-[#181818]">
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-bold text-center mb-12">Our Sponsors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {[1, 2, 3, 4, 5].map((item) => (
            <TooltipProvider key={item}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="aspect-square bg-[#222] rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer">
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Become a sponsor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
