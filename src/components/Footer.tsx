const Footer = () => {
  return (
    <footer className="bg-[#181818] border-t border-[#252525]">
      <div className="py-5 text-center text-sm text-foreground/70">
        <p>
          &copy; {new Date().getFullYear()} Animelibrary.xyz. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
