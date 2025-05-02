
import { useState, useEffect, useRef } from "react";
import { CodeToggle } from "../CodeToggle";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), 300);
        } else {
          setIsRevealed(false);
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

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
        <div
          className="absolute inset-0 transition-transform duration-1500 ease-in-out"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: isRevealed
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            transition: "clip-path 1.5s ease",
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
          setTimeout(() => setIsVisible(true), 300);
        } else {
          setIsVisible(false);
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

  return (
    <div ref={imageRef} className="w-full max-w-md mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`w-full h-full transition-all duration-2000 ease-out ${
            isVisible ? "blur-0 scale-100" : "blur-xl scale-110"
          }`}
        />
      </div>
      <button
        className="mt-4 px-4 py-2 bg-primary/80 text-white rounded-md hover:bg-primary transition-colors mx-auto block"
        onClick={() => setIsVisible(!isVisible)}
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const images = [
    {
      url: "https://images.unsplash.com/photo-1587502537745-84b86da1204f",
      alt: "Mountain and lake",
      delay: 0,
    },
    {
      url: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a",
      alt: "Forest landscape",
      delay: 200,
    },
    {
      url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
      alt: "Green trees",
      delay: 400,
    },
  ];

  const resetAnimation = () => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 100);
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg aspect-square"
          >
            <div
              className={`w-full h-full transition-all duration-1000 ease-out ${
                isVisible ? "scale-100 opacity-100" : "scale-150 opacity-0"
              }`}
              style={{
                backgroundImage: `url(${image.url}?auto=format&fit=crop&w=300&h=300)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transitionDelay: `${image.delay}ms`,
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

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop } = containerRef.current;
      setScrollPosition(scrollTop);
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
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translateY(${scrollPosition * 0.2}px)`,
            }}
          />
          
          {/* Middle layer */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=500&h=300')`,
              backgroundSize: "cover",
              backgroundPosition: "bottom center",
              opacity: 0.7,
              transform: `translateY(${scrollPosition * 0.4}px)`,
            }}
          />
          
          {/* Content layer */}
          <div
            className="absolute inset-0 flex items-center justify-center text-white text-center p-4"
            style={{
              transform: `translateY(${scrollPosition * 0.1}px)`,
            }}
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

const ClippingReveal = ({ imageUrl, altText }: { imageUrl: string; altText: string }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsRevealed(true), 300);
        } else {
          setIsRevealed(false);
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

  return (
    <div ref={containerRef} className="w-full max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
        <div
          className="absolute inset-0 transition-transform duration-1500 ease-in-out"
          style={{
            backgroundImage: \`url(\${imageUrl})\`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: isRevealed
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            transition: "clip-path 1.5s ease",
          }}
        />
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover opacity-0"
        />
      </div>
      <button
        onClick={() => setIsRevealed(!isRevealed)}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
      >
        {isRevealed ? "Reset" : "Reveal"}
      </button>
    </div>
  );
};

export default ClippingReveal;`;

const blurRevealCode = `import { useState, useEffect, useRef } from "react";

const BlurReveal = ({ imageUrl, altText }: { imageUrl: string; altText: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 300);
        } else {
          setIsVisible(false);
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

  return (
    <div ref={imageRef} className="w-full max-w-md mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
        <div
          style={{
            backgroundImage: \`url(\${imageUrl})\`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={\`w-full h-full transition-all duration-2000 ease-out \${
            isVisible ? "blur-0 scale-100" : "blur-xl scale-110"
          }\`}
        />
      </div>
      <button
        className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Blur" : "Reveal"}
      </button>
    </div>
  );
};

export default BlurReveal;`;

const scaleInImagesCode = `import { useState, useEffect, useRef } from "react";

const ScaleInImages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const images = [
    {
      url: "https://images.unsplash.com/photo-1587502537745-84b86da1204f",
      alt: "Mountain and lake",
      delay: 0,
    },
    {
      url: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a",
      alt: "Forest landscape",
      delay: 200,
    },
    {
      url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
      alt: "Green trees",
      delay: 400,
    },
  ];

  const resetAnimation = () => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 100);
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg aspect-square"
          >
            <div
              className={\`w-full h-full transition-all duration-1000 ease-out \${
                isVisible ? "scale-100 opacity-100" : "scale-150 opacity-0"
              }\`}
              style={{
                backgroundImage: \`url(\${image.url}?auto=format&fit=crop&w=300&h=300)\`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transitionDelay: \`\${image.delay}ms\`,
              }}
            />
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-primary text-white rounded-md mx-auto block"
        onClick={resetAnimation}
      >
        Reset Animation
      </button>
    </div>
  );
};

export default ScaleInImages;`;

const parallaxScrollCode = `import { useState, useRef } from "react";

const ParallaxScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop } = containerRef.current;
      setScrollPosition(scrollTop);
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
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: \`url('https://images.unsplash.com/photo-1534447677768-be436bb09401')\`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: \`translateY(\${scrollPosition * 0.2}px)\`,
            }}
          />
          
          {/* Middle layer */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: \`url('https://images.unsplash.com/photo-1541701494587-cb58502866ab')\`,
              backgroundSize: "cover",
              backgroundPosition: "bottom center",
              opacity: 0.7,
              transform: \`translateY(\${scrollPosition * 0.4}px)\`,
            }}
          />
          
          {/* Content layer */}
          <div
            className="absolute inset-0 flex items-center justify-center text-white text-center p-4"
            style={{
              transform: \`translateY(\${scrollPosition * 0.1}px)\`,
            }}
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
