
import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const element = titleRef.current;
    if (element) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(-20px)';

      requestAnimationFrame(() => {
        element.style.transition = 'opacity 1000ms ease-out, transform 1000ms ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted email:', email);
    // Handle waitlist submission
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#111113]">
      {/* Subtle/dark hero gradient top, like lovable.dev */}
      <div 
        className="absolute top-0 left-0 w-full h-[360px] z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 60% at 50% 0px, #29293a 60%, #111113 100%)"
        }}
      />
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Floating hero heart logo */}
          <img
            src="/lovable-uploads/ce144d1b-b055-4ad2-8feb-81f212b9cc06.png"
            alt="Lovable gradient heart"
            className="h-20 w-20 md:h-28 md:w-28 mx-auto mb-5 mt-4 drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 8px 32px #222226bb)' }}
          />
          {/* Brand logo */}
          <img 
            src="/lovable-uploads/4b01183e-bc11-41ee-bfc1-0ac9ce1e7576.png" 
            alt="Hero Logo" 
            className="mx-auto mb-6 h-12 w-12 object-contain drop-shadow-lg"
          />
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Beautiful animations for modern web applications
          </h1>
          <p className="text-sm md:text-base text-foreground/80 mb-8">
            A carefully crafted library of animations to enhance your user experience
          </p>
          <form onSubmit={handleSubmit} className="flex items-center justify-center max-w-md mx-auto">
            <div className="relative flex w-full items-center rounded-full bg-[#191921] backdrop-blur border border-white/10 p-1.5">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border-0 bg-transparent px-4 text-foreground placeholder:text-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
              <button 
                type="submit"
                className="rounded-full bg-[#FDA858] px-5 py-2 text-sm font-medium text-[#191921] transition-colors hover:bg-[#F97316] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FDA858]" // clean orange
              >
                Join the waitlist
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
