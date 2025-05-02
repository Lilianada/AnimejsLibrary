import { TwitterIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#181818] border-t border-[#252525]">
      <div className="py-5 text-center text-sm text-foreground/70">
        <p className="flex items-center justify-center gap-2">
         Built with ❤️ by <a href="https://github.com/lilianada" className="hover:underline" target="_blank" rel="noopener noreferrer">Lilian Ada </a>
         {" "}
         <span className="text-foreground/30">|</span>
         {" "}
         <a href="https://x.com/lilian_ada_/" className="text-primary hover:text-foreground" target="_blank" rel="noopener noreferrer">
         <TwitterIcon size={14}/>
         </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
