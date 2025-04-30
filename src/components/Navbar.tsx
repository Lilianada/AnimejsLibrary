import { Book, Grid2X2 } from "lucide-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";

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
              src="/lovable-uploads/4b01183e-bc11-41ee-bfc1-0ac9ce1e7576.png" 
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
                    ? "font-bold text-[#FDA858]"
                    : "text-foreground hover:text-[#FDA858] hover:opacity-80"}
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
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-base px-5 py-2 rounded-full font-bold shadow-lg
                bg-[#FDA858] text-[#191921]
                hover:bg-[#F9B143] transition
              `}
              style={{
                textShadow: "0 0 12px #fff"
              }}
            >
              Star on Github
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
