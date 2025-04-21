
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CodeBlock from '@/components/examples/animations/CodeBlock';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ArrowRight } from 'lucide-react';

const Docs = () => {
  return (
    <div className="min-h-screen bg-[#181818]">
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 order-2 lg:order-1">
            <div className="sticky top-20 bg-[#222] rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Documentation</h3>
              <nav className="space-y-1">
                {[
                  { id: 'introduction', label: 'Introduction & Setup' },
                  { id: 'core-concepts', label: 'Core Concepts' },
                  { id: 'components', label: 'Component Documentation' },
                  { id: 'categories', label: 'Animation Categories' },
                  { id: 'advanced', label: 'Advanced Usage' },
                  { id: 'recipes', label: 'Animation Recipes' },
                  { id: 'api', label: 'API Reference' },
                  { id: 'migration', label: 'Migration Guide' },
                  { id: 'playground', label: 'Playground' },
                  { id: 'examples', label: 'Examples & Templates' },
                  { id: 'contributing', label: 'Contributing Guide' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-2 px-3 rounded-lg hover:bg-[#333] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="w-full lg:w-3/4 order-1 lg:order-2 space-y-16">
            <section id="introduction">
              <h1 className="text-3xl md:text-4xl font-bold mb-8">Documentation for React & Anime.js Animation Library</h1>
              
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4" id="introduction">1. Introduction & Setup</h2>
                  <Card className="bg-[#222] border-[#333]">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Overview</h3>
                        <p className="text-muted-foreground">
                          Our animation library combines the power of React and Anime.js to provide a simple yet powerful way to add stunning animations to your web applications. With a focus on performance and developer experience, our library enables you to create complex animations with minimal code.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Installation</h3>
                        <CodeBlock code={`npm install animejs react react-dom\n# or\nyarn add animejs react react-dom`} />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Basic Setup</h3>
                        <p className="text-muted-foreground mb-3">
                          Import and use Anime.js in your React components:
                        </p>
                        <CodeBlock code={`import React, { useRef, useEffect } from 'react';\nimport anime from 'animejs';\n\nconst AnimatedComponent = () => {\n  const elementRef = useRef(null);\n\n  useEffect(() => {\n    anime({\n      targets: elementRef.current,\n      translateX: 250,\n      rotate: '1turn',\n      duration: 800,\n      easing: 'easeInOutQuad'\n    });\n  }, []);\n\n  return <div ref={elementRef}>Animation Target</div>;\n};`} />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Browser Compatibility</h3>
                        <p className="text-muted-foreground">
                          Our animation library is compatible with all modern browsers (Chrome, Firefox, Safari, Edge). For older browsers, you may need to include appropriate polyfills for ES6+ features used by React and Anime.js.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4" id="core-concepts">2. Core Concepts</h2>
                  <Card className="bg-[#222] border-[#333]">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Anime.js Integration</h3>
                        <p className="text-muted-foreground">
                          Our library seamlessly integrates Anime.js with React's component lifecycle. This allows you to create animations that react to component mounting, updates, and state changes.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Refs & Animation Targets</h3>
                        <p className="text-muted-foreground mb-3">
                          React refs are used to target DOM elements for animation:
                        </p>
                        <CodeBlock code={`const MyComponent = () => {\n  const elementRef = useRef(null);\n  \n  // Use elementRef.current as your animation target\n  return <div ref={elementRef}>Target element</div>;\n};`} />
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Animation Triggers</h3>
                        <p className="text-muted-foreground">
                          Animations can be triggered by:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                          <li>Component mounting (useEffect with empty dependency array)</li>
                          <li>State changes (useEffect with dependencies)</li>
                          <li>User interactions (onClick, onHover, etc.)</li>
                          <li>Intersection Observer API (for scroll-triggered animations)</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Performance Considerations</h3>
                        <p className="text-muted-foreground">
                          For optimal performance:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                          <li>Prefer CSS transforms and opacity for smooth animations</li>
                          <li>Use will-change CSS property for elements that will animate frequently</li>
                          <li>Avoid animating layout properties (width, height, top, left) when possible</li>
                          <li>Use requestAnimationFrame for custom animations</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center">
                  <Button variant="secondary" className="mt-8">
                    Continue Reading <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Docs;
