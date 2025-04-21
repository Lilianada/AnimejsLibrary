
const Footer = () => {
  return (
    <footer className="bg-[#181818] border-t border-[#252525]">
      <div className="container mx-auto px-4 py-6 flex justify-center items-center">
        <img
          src="/lovable-uploads/4b01183e-bc11-41ee-bfc1-0ac9ce1e7576.png"
          alt="Logo"
          className="h-10 w-10 object-contain"
        />
      </div>
      <div className="border-t border-[#222] py-5 text-center text-sm text-foreground/70">
        <p>&copy; {new Date().getFullYear()} Animelibrary.xyz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
