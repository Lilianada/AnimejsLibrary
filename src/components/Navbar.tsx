
import { Book, Grid2X2, HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Use location for active state
  const location = window.location.pathname; // Works since SSR not needed
  const links = [
    { href: "/docs", label: "Docs", icon: Book },
    { href: "/examples", label: "Examples", icon: Grid2X2 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#181818]/95 backdrop-blur-sm border-b border-[#252525]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center" tabIndex={0}>
            <img
              src="/logo.png"
              alt="Animelibrary.xyz Logo"
              className="h-8 w-8 object-contain"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`
                  flex items-center space-x-1 text-sm px-3 py-1 rounded transition
                  ${
                    location.startsWith(link.href)
                      ? "font-bold text-primary"
                      : "text-foreground hover:text-primary hover:opacity-80"
                  }
                `}
                tabIndex={0}
                style={{
                  background: "transparent",
                  boxShadow: "none",
                }}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            ))}
            <Button
              asChild
              className="bg-primary text-bg hover:bg-primary/90 transition-colors"
            >
              <Link to="/examples" className="flex items-center space-x-1">
                <span>Sponsor</span>
                <HeartIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
