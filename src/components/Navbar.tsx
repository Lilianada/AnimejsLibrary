
import { Book, Grid2X2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/4b01183e-bc11-41ee-bfc1-0ac9ce1e7576.png" 
              alt="Animelibrary.xyz Logo" 
              className="h-8 w-8 object-contain"
            />
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/docs" className="flex items-center space-x-1 text-sm hover:opacity-70 transition-opacity">
              <Book className="h-4 w-4" />
              <span>Docs</span>
            </a>
            <a href="/examples" className="flex items-center space-x-1 text-sm hover:opacity-70 transition-opacity">
              <Grid2X2 className="h-4 w-4" />
              <span>Examples</span>
            </a>
            <a href="/premium" className="text-sm bg-primary px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
              Get More
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
