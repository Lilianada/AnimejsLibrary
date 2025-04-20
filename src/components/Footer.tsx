
const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/4b01183e-bc11-41ee-bfc1-0ac9ce1e7576.png" 
                alt="Animelibrary.xyz Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-lg font-semibold">Animelibrary.xyz</span>
            </div>
            <p className="text-sm text-background/70">
              Beautiful animations for modern web applications
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Documentation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/docs/getting-started" className="hover:text-primary transition-colors">Getting Started</a></li>
              <li><a href="/docs/installation" className="hover:text-primary transition-colors">Installation</a></li>
              <li><a href="/docs/api" className="hover:text-primary transition-colors">API Reference</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/examples" className="hover:text-primary transition-colors">Examples</a></li>
              <li><a href="/premium" className="hover:text-primary transition-colors">Premium</a></li>
              <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/10 mt-12 pt-8 text-sm text-background/70">
          <p>&copy; {new Date().getFullYear()} Animelibrary.xyz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
