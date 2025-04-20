
import { useEffect, useRef } from 'react';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
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

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient opacity-20" />
      <div className="container mx-auto px-4 py-20 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Beautiful animations for modern web applications
          </h1>
          <p className="text-sm md:text-base text-foreground/80 mb-8">
            A carefully crafted library of animations to enhance your user experience
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a 
              href="/docs" 
              className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
            <a 
              href="/examples" 
              className="bg-secondary text-secondary-foreground px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              View Examples
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
