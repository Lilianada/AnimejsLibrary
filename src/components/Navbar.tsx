
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
                    ? "bg-gradient-to-r from-[#fdfcfb] via-[#e2d1c3] to-[#fdfcfb] text-[#181818] shadow-md font-bold"
                    : "text-foreground hover:opacity-80"}
                `}
                tabIndex={0}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </a>
            ))}
            <a
              href="/waitlist"
              className={`
                text-base px-5 py-2 rounded-full font-bold shadow-lg
                bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400
                text-[#181818] 
                drop-shadow-[0_0_6px_rgba(230,110,255,0.7)]
                hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(230,110,255,1)] transition
              `}
              style={{
                textShadow: "0 0 12px #ffffff, 0 0 5px #FFD6FE"
              }}
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
