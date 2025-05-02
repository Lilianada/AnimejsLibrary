
import { useState, useEffect, useRef } from "react";
import { CodeToggle } from "../CodeToggle";
import anime from "animejs";

const ImageRevealAnimations = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Clipping Mask Reveal</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center">
                <ClippingReveal 
                  imageUrl="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  altText="Mountain landscape with lake"
                />
              </div>
            </div>
          }
          codeContent={clippingRevealCode}
        />

        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Blur to Clear</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center">
                <BlurReveal 
                  imageUrl="https://images.unsplash.com/photo-1542202229-7d93c33f5d07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  altText="City skyline" 
                />
              </div>
            </div>
          }
          codeContent={blurRevealCode}
        />
        
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Scale In Images</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center">
                <ScaleInImages />
              </div>
            </div>
          }
          codeContent={scaleInImagesCode}
        />
        
        <CodeToggle
          previewContent={
            <div className="p-4 space-y-4">
              <h4 className="text-lg font-medium">Parallax Scroll</h4>
              <div className="border rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center">
                <ParallaxScroll />
              </div>
            </div>
          }
          codeContent={parallaxScrollCode}
        />
      </div>
    </div>
  );
};

// Clipping Mask Reveal Component
const ClippingReveal = ({ imageUrl, altText }: { imageUrl: string; altText: string }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), 300);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!imageRef.current) return;
    
    if (isRevealed) {
      anime({
        targets: imageRef.current,
        clipPath: ['polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'],
        duration: 1500,
        easing: 'easeInOutQuad'
      });
    } else {
      anime({
        targets: imageRef.current,
        clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
        duration: 700,
        easing: 'easeInOutQuad'
      });
    }
  }, [isRevealed]);

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
        <div
          ref={imageRef}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)'
          }}
        />
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover opacity-0"
        />
      </div>
      <button
        className="mt-4 px-4 py-2 bg-primary/80 text-white rounded-md hover:bg-primary transition-colors mx-auto block"
        onClick={() => setIsRevealed(!isRevealed)}
      >
        {isRevealed ? "Reset" : "Reveal"}
      </button>
    </div>
  );
};

// Blur Reveal Component
const BlurReveal = ({ imageUrl, altText }: { imageUrl: string; altText: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            
            if (imageRef.current) {
              anime({
                targets: imageRef.current,
                filter: ['blur(20px)', 'blur(0px)'],
                scale: [1.1, 1],
                duration: 2000,
                easing: 'easeOutCubic'
              });
            }
          }, 300);
        }
      },
      { threshold: 0.3 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const handleToggle = () => {
    setIsVisible(!isVisible);
    
    if (imageRef.current) {
      anime({
        targets: imageRef.current,
        filter: isVisible ? ['blur(0px)', 'blur(20px)'] : ['blur(20px)', 'blur(0px)'],
        scale: isVisible ? [1, 1.1] : [1.1, 1],
        duration: 1000,
        easing: 'easeInOutQuad'
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
        <div
          ref={imageRef}
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            filter: "blur(20px)",
            transform: "scale(1.1)"
          }}
        />
      </div>
      <button
        className="mt-4 px-4 py-2 bg-primary/80 text-white rounded-md hover:bg-primary transition-colors mx-auto block"
        onClick={handleToggle}
      >
        {isVisible ? "Blur" : "Reveal"}
      </button>
    </div>
  );
};

// Scale In Images Component
const ScaleInImages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          anime({
            targets: imagesRef.current,
            scale: [1.5, 1],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1500,
            delay: anime.stagger(200)
          });
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const resetAnimation = () => {
    setIsVisible(false);
    
    anime.set(imagesRef.current, {
      scale: 1.5,
      opacity: 0
    });
    
    setTimeout(() => {
      setIsVisible(true);
      anime({
        targets: imagesRef.current,
        scale: [1.5, 1],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1500,
        delay: anime.stagger(200)
      });
    }, 100);
  };

  const images = [
    {
      url: "https://images.unsplash.com/photo-1587502537745-84b86da1204f",
      alt: "Mountain and lake",
    },
    {
      url: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a",
      alt: "Forest landscape",
    },
    {
      url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
      alt: "Green trees",
    },
  ];

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg aspect-square"
          >
            <div
              ref={el => imagesRef.current[index] = el}
              className="w-full h-full"
              style={{
                backgroundImage: `url(${image.url}?auto=format&fit=crop&w=300&h=300)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0,
                transform: "scale(1.5)",
              }}
            />
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-primary/80 text-white rounded-md hover:bg-primary transition-colors mx-auto block"
        onClick={resetAnimation}
      >
        Reset Animation
      </button>
    </div>
  );
};

// Parallax Scroll Component
const ParallaxScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const middleLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop } = containerRef.current;
      setScrollPosition(scrollTop);
      
      // Update parallax elements using anime instead of direct style manipulation
      if (backgroundRef.current) {
        anime.set(backgroundRef.current, {
          translateY: scrollTop * 0.2
        });
      }
      
      if (middleLayerRef.current) {
        anime.set(middleLayerRef.current, {
          translateY: scrollTop * 0.4
        });
      }
      
      if (contentRef.current) {
        anime.set(contentRef.current, {
          translateY: scrollTop * 0.1
        });
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        ref={containerRef} 
        className="h-64 overflow-auto rounded-lg border" 
        onScroll={handleScroll}
      >
        <div className="relative h-[800px] overflow-hidden">
          {/* Background layer (moves slower) */}
          <div
            ref={backgroundRef}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          
          {/* Middle layer */}
          <div
            ref={middleLayerRef}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=500&h=300')`,
              backgroundSize: "cover",
              backgroundPosition: "bottom center",
              opacity: 0.7,
            }}
          />
          
          {/* Content layer */}
          <div
            ref={contentRef}
            className="absolute inset-0 flex items-center justify-center text-white text-center p-4"
          >
            <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-2">Parallax Effect</h3>
              <p className="text-sm">Scroll to see the parallax effect in action</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Code strings for the examples
const clippingRevealCode = `import { useState, useEffect, useRef } from "react";
import anime from "animejs";

const ClippingReveal = ({ imageUrl, altText }: { imageUrl: string; altText: string }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer to trigger animation when in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), 300);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!imageRef.current) return;
    
    if (isRevealed) {
      anime({
        targets: imageRef.current,
        clipPath: [
          'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', 
          'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        ],
        duration: 1500,
        easing: 'easeInOutQuad'
      });
    } else {
      anime({
        targets: imageRef.current,
        clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
        duration: 700,
        easing: 'easeInOutQuad'
      });
    }
  }, [isRevealed]);

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
        <div
          ref={imageRef}
          className="absolute inset-0"
          style={{
            backgroundImage: \`url(\${imageUrl})\`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)'
          }}
        />
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover opacity-0"
        />
      </div>
      <button
        className="mt-4 px-4 py-2 bg-primary/80 text-white rounded-md 
          hover:bg-primary transition-colors mx-auto block"
        onClick={() => setIsRevealed(!isRevealed)}
      >
        {isRevealed ? "Reset" : "Reveal"}
      </button>
    </div>
  );
};

export default ClippingReveal;`;

const blurRevealCode = `import { useState, useEffect, useRef } from "react";
import anime from "animejs";

const BlurReveal = ({ imageUrl, altText }: { imageUrl: string; altText: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            
            // Use anime.js for smooth blur animation
            if (imageRef.current) {
              anime({
                targets: imageRef.current,
                filter: ['blur(20px)', 'blur(0px)'],
                scale: [1.1, 1],
                duration: 2000,
                easing: 'easeOutCubic'
              });
            }
          }, 300);
        }
      },
      { threshold: 0.3 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const handleToggle = () => {
    setIsVisible(!isVisible);
    
    // Toggle blur with anime.js
    if (imageRef.current) {
      anime({
        targets: imageRef.current,
        filter: isVisible ? ['blur(0px)', 'blur(20px)'] : ['blur(20px)', 'blur(0px)'],
        scale: isVisible ? [1, 1.1] : [1.1, 1],
        duration: 1000,
        easing: 'easeInOutQuad'
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
        <div
          ref={imageRef}
          style={{
            backgroundImage: \`url(\${imageUrl})\`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            filter: "blur(20px)",
            transform: "scale(1.1)"
          }}
        />
      </div>
      <button
        className="mt-4 px-4 py-2 bg-primary/80 text-white rounded-md 
          hover:bg-primary transition-colors mx-auto block"
        onClick={handleToggle}
      >
        {isVisible ? "Blur" : "Reveal"}
      </button>
    </div>
  );
};

export default BlurReveal;`;

const scaleInImagesCode = `import { useState, useEffect, useRef } from "react";
import anime from "animejs";

const ScaleInImages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Use anime.js for scaling and opacity animations
          anime({
            targets: imagesRef.current,
            scale: [1.5, 1],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1500,
            delay: anime.stagger(200) // stagger effect for each image
          });
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const resetAnimation = () => {
    setIsVisible(false);
    
    // Reset animation with anime.js
    anime.set(imagesRef.current, {
      scale: 1.5,
      opacity: 0
    });
    
    setTimeout(() => {
      setIsVisible(true);
      anime({
        targets: imagesRef.current,
        scale: [1.5, 1],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1500,
        delay: anime.stagger(200)
      });
    }, 100);
  };

  const images = [
    {
      url: "https://images.unsplash.com/photo-1587502537745-84b86da1204f",
      alt: "Mountain and lake",
    },
    {
      url: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a",
      alt: "Forest landscape",
    },
    {
      url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
      alt: "Green trees",
    },
  ];

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg aspect-square"
          >
            <div
              ref={el => imagesRef.current[index] = el}
              className="w-full h-full"
              style={{
                backgroundImage: \`url(\${image.url}?auto=format&fit=crop&w=300&h=300)\`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0,
                transform: "scale(1.5)",
              }}
            />
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-primary/80 text-white rounded-md 
          hover:bg-primary transition-colors mx-auto block"
        onClick={resetAnimation}
      >
        Reset Animation
      </button>
    </div>
  );
};

export default ScaleInImages;`;

const parallaxScrollCode = `import { useState, useRef } from "react";
import anime from "animejs";

const ParallaxScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const middleLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop } = containerRef.current;
      
      // Use anime.js for smooth parallax effect
      if (backgroundRef.current) {
        anime.set(backgroundRef.current, {
          translateY: scrollTop * 0.2 // Background moves slower
        });
      }
      
      if (middleLayerRef.current) {
        anime.set(middleLayerRef.current, {
          translateY: scrollTop * 0.4 // Middle layer moves faster
        });
      }
      
      if (contentRef.current) {
        anime.set(contentRef.current, {
          translateY: scrollTop * 0.1 // Content moves slowly
        });
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        ref={containerRef} 
        className="h-64 overflow-auto rounded-lg border" 
        onScroll={handleScroll}
      >
        <div className="relative h-[800px] overflow-hidden">
          {/* Background layer (moves slower) */}
          <div
            ref={backgroundRef}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: \`url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000')\`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          
          {/* Middle layer */}
          <div
            ref={middleLayerRef}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: \`url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=500&h=300')\`,
              backgroundSize: "cover",
              backgroundPosition: "bottom center",
              opacity: 0.7,
            }}
          />
          
          {/* Content layer */}
          <div
            ref={contentRef}
            className="absolute inset-0 flex items-center justify-center text-white text-center p-4"
          >
            <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-2">Parallax Effect</h3>
              <p className="text-sm">Scroll to see the parallax effect in action</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxScroll;`;

export default ImageRevealAnimations;
