import { Book, Grid2X2, HeartIcon } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  // Use location for active state
  const location = window.location; // Works since SSR not needed
  const links = [
    { href: "/docs", label: "Docs", icon: Book },
    { href: "/examples", label: "Examples", icon: Grid2X2 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#181818]/95 backdrop-blur-sm border-b border-[#252525]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center" tabIndex={0}>
            <img 
              src="/logo.png" 
              alt="Animelibrary.xyz Logo" 
              className="h-8 w-8 object-contain"
            />
          </a>
          <div className="hidden md:flex items-center space-x-8">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`
                  flex items-center space-x-1 text-sm px-3 py-1 rounded transition
                  ${location.pathname.startsWith(link.href)
                    ? "font-bold text-primary"
                    : "text-foreground hover:text-primary hover:opacity-80"}
                `}
                tabIndex={0}
                style={{
                  background: "transparent",
                  boxShadow: "none"
                }}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </a>
            ))}
           <Button
            asChild // Use asChild to render an anchor tag
            className="bg-primary text-bg hover:bg-primary/90 transition-colors"
          >
             <a href="/examples" className="flex items-center space-x-1">
                <span>Sponsor</span>
                <HeartIcon className="h-4 w-4" />
             </a>
          </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
