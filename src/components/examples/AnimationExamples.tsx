
import { useRef, useEffect, useState } from "react";
import ScrollProgressAnimation from "./animations/ScrollProgressAnimation";
import TextAnimations from "./animations/TextAnimations";
import ImageRevealAnimations from "./animations/image-reveal";
import DraggableCardStack from "./animations/DraggableCardStack";
import HeroTextAnimations from "./animations/HeroTextAnimations";
import * as anime from "animejs";

const AnimationExamples = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const animateElements = () => {
      const cards = containerRef.current?.querySelectorAll(".animation-card");

      if (cards) {
        // Use anime.animate instead of anime.default
        cards.forEach(card => {
          anime.animate(card, {
            opacity: 0,
            translateY: 20,
            duration: 1,
          });
        });
        
        anime.animate(cards, {
          opacity: 1,
          translateY: 0,
          duration: 600,
          easing: 'easeOutExpo',
          delay: anime.stagger(100)
        });
      }
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

  // Handle navigation button clicks with smooth scrolling using anime.js
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const topOffset = section.getBoundingClientRect().top + window.scrollY;
      
      anime.animate(window.document.scrollingElement, {
        scrollTop: topOffset,
        duration: 600,
        easing: 'easeInOutQuad'
      });
    }
  };

  return (
    <div ref={containerRef} className="space-y-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Web Animation Examples</h2>
        <p className="text-muted-foreground">
          A collection of practical animations powered by anime.js to enhance your website's user experience. 
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
              onClick={() => scrollToSection(section)}
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
              Engaging typewriter and text reveal effects powered by anime.js that bring your content to life 
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
              creating a more dynamic and engaging browsing experience using anime.js transitions.
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
