
import { useRef, useEffect, useState } from "react";
import { CodeToggle } from "./CodeToggle";
import ScrollProgressAnimation from "./animations/ScrollProgressAnimation";
import TextAnimations from "./animations/TextAnimations";
import ImageRevealAnimations from "./animations/ImageRevealAnimations";
import DraggableCardStack from "./animations/DraggableCardStack";
import HeroTextAnimations from "./animations/HeroTextAnimations";

const AnimationExamples = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const animateElements = () => {
      const cards = containerRef.current?.querySelectorAll(".animation-card");

      cards?.forEach((card, index) => {
        const element = card as HTMLElement;
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";

        setTimeout(() => {
          element.style.transition =
            "opacity 600ms ease-out, transform 600ms ease-out";
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }, index * 100);
      });
    };

    animateElements();
  }, []);
  
  // Handle intersection observer to determine active section
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });
    
    const sections = document.querySelectorAll('.animation-section');
    sections.forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="space-y-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Web Animation Examples</h2>
        <p className="text-muted-foreground">
          A collection of practical animations to enhance your website's user experience. 
          Each animation example includes code snippets that you can easily incorporate into your projects.
        </p>
      </div>

      {/* Navigation menu for the animations */}
      <div className="sticky top-16 lg:top-4 z-10 bg-background/80 backdrop-blur py-3 border-b border-border/50">
        <nav className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide">
          {['scroll-progress', 'text-animations', 'image-reveal', 'hero-animations', 'card-stack'].map((section) => (
            <button 
              key={section} 
              className={`px-3 py-1.5 text-sm whitespace-nowrap rounded-md transition-colors ${
                activeSection === section 
                  ? 'bg-primary/20 text-primary font-medium' 
                  : 'bg-muted/50 hover:bg-muted'
              }`}
              onClick={() => {
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <section id="scroll-progress" className="animation-section animation-card">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Scroll Progress Animations</h3>
            <p className="text-muted-foreground">
              Display a progress bar that shows how far a user has scrolled down the page. 
              Great for long-form content and enhancing user experience.
            </p>
          </div>
          <ScrollProgressAnimation />
        </section>
        
        <section id="text-animations" className="animation-section animation-card">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Text Animations</h3>
            <p className="text-muted-foreground">
              Engaging typewriter and text reveal effects that bring your content to life 
              and capture your visitor's attention.
            </p>
          </div>
          <TextAnimations />
        </section>
        
        <section id="image-reveal" className="animation-section animation-card">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Image Reveal Animations</h3>
            <p className="text-muted-foreground">
              Creative ways to reveal images as they enter the viewport, 
              creating a more dynamic and engaging browsing experience.
            </p>
          </div>
          <ImageRevealAnimations />
        </section>
        
        <section id="hero-animations" className="animation-section animation-card">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Hero Text Animations</h3>
            <p className="text-muted-foreground">
              Make your landing page more impactful with these hero section text animations.
              Great for portfolios and product launches.
            </p>
          </div>
          <HeroTextAnimations />
        </section>
        
        <section id="card-stack" className="animation-section animation-card">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Draggable Card Stack</h3>
            <p className="text-muted-foreground">
              Interactive card stack that allows users to drag cards to reveal images underneath.
              Perfect for showcasing portfolios, testimonials, or product galleries.
            </p>
          </div>
          <DraggableCardStack />
        </section>
      </div>
    </div>
  );
};

export default AnimationExamples;
