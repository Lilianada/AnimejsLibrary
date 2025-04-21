
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CodeBlock from '@/components/examples/animations/CodeBlock';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ArrowRight, ArrowLeft, Code } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { toast } from 'sonner';

const docSections = [
  "introduction",
  "core-concepts",
  "components",
  "categories",
  "advanced",
  "recipes",
  "api",
  "migration",
  "playground",
  "examples",
  "contributing"
];

const Docs = () => {
  const [activePage, setActivePage] = useState(0);
  const [showCode, setShowCode] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const handlePrevPage = () => {
    setActivePage(prev => Math.max(0, prev - 1));
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    setActivePage(prev => Math.min(docSections.length - 1, prev + 1));
    window.scrollTo(0, 0);
  };

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
                ].map((item, index) => (
                  <a
                    key={item.id}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActivePage(index);
                      window.scrollTo(0, 0);
                    }}
                    className={`block py-2 px-3 rounded-lg transition-colors ${
                      activePage === index 
                        ? "bg-[#333] text-[#FDA858]" 
                        : "hover:bg-[#333]"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="w-full lg:w-3/4 order-1 lg:order-2 space-y-16">
            {/* Introduction & Setup */}
            {activePage === 0 && (
              <section id="introduction" className="animate-fade-in">
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

                        <div className="relative">
                          <div className="absolute right-0 top-0 flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => setShowCode(!showCode)}
                            >
                              <Code size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => copyCode(`npm install animejs react react-dom\n# or\nyarn add animejs react react-dom`)}
                            >
                              <Copy size={16} />
                            </Button>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Installation</h3>
                          {showCode ? (
                            <CodeBlock code={`npm install animejs react react-dom\n# or\nyarn add animejs react react-dom`} />
                          ) : (
                            <p className="text-muted-foreground">
                              Install the package and its dependencies using npm or yarn.
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <div className="absolute right-0 top-0 flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => setShowCode(!showCode)}
                            >
                              <Code size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => copyCode(`import React, { useRef, useEffect } from 'react';\nimport anime from 'animejs';\n\nconst AnimatedComponent = () => {\n  const elementRef = useRef(null);\n\n  useEffect(() => {\n    anime({\n      targets: elementRef.current,\n      translateX: 250,\n      rotate: '1turn',\n      duration: 800,\n      easing: 'easeInOutQuad'\n    });\n  }, []);\n\n  return <div ref={elementRef}>Animation Target</div>;\n};`)}
                            >
                              <Copy size={16} />
                            </Button>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Basic Setup</h3>
                          {showCode ? (
                            <CodeBlock code={`import React, { useRef, useEffect } from 'react';\nimport anime from 'animejs';\n\nconst AnimatedComponent = () => {\n  const elementRef = useRef(null);\n\n  useEffect(() => {\n    anime({\n      targets: elementRef.current,\n      translateX: 250,\n      rotate: '1turn',\n      duration: 800,\n      easing: 'easeInOutQuad'\n    });\n  }, []);\n\n  return <div ref={elementRef}>Animation Target</div>;\n};`} />
                          ) : (
                            <p className="text-muted-foreground mb-3">
                              Import and use Anime.js in your React components by creating refs and applying animations within useEffect hooks.
                            </p>
                          )}
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
                </div>
              </section>
            )}

            {/* Core Concepts */}
            {activePage === 1 && (
              <section id="core-concepts" className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Core Concepts</h1>
                
                <div className="space-y-8">
                  <Card className="bg-[#222] border-[#333]">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Anime.js Integration</h3>
                        <p className="text-muted-foreground">
                          Our library seamlessly integrates Anime.js with React's component lifecycle. This allows you to create animations that react to component mounting, updates, and state changes.
                        </p>
                      </div>

                      <div className="relative">
                        <div className="absolute right-0 top-0 flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => setShowCode(!showCode)}
                          >
                            <Code size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => copyCode(`const MyComponent = () => {\n  const elementRef = useRef(null);\n  \n  // Use elementRef.current as your animation target\n  return <div ref={elementRef}>Target element</div>;\n};`)}
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Refs & Animation Targets</h3>
                        {showCode ? (
                          <CodeBlock code={`const MyComponent = () => {\n  const elementRef = useRef(null);\n  \n  // Use elementRef.current as your animation target\n  return <div ref={elementRef}>Target element</div>;\n};`} />
                        ) : (
                          <p className="text-muted-foreground mb-3">
                            React refs are used to target DOM elements for animation. Create a ref and attach it to the element you want to animate.
                          </p>
                        )}
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
              </section>
            )}

            {/* Component Documentation */}
            {activePage === 2 && (
              <section id="components" className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Component Documentation</h1>
                
                <div className="space-y-8">
                  <Card className="bg-[#222] border-[#333]">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Form Components</h3>
                        <p className="text-muted-foreground mb-3">
                          Our library provides several animated form components that enhance user experience.
                        </p>
                        
                        <div className="mt-4 space-y-4">
                          <div className="border-l-4 border-[#FDA858] pl-4">
                            <h4 className="font-medium mb-1">FloatingLabelInput</h4>
                            <p className="text-sm text-muted-foreground">
                              Input with label that animates to the top when focused or filled.
                            </p>
                            <div className="mt-2">
                              <p className="text-sm font-medium">Props:</p>
                              <ul className="list-disc list-inside text-xs text-muted-foreground ml-2 space-y-1">
                                <li>label: string - The input label text</li>
                                <li>value: string - The input value</li>
                                <li>onChange: (e: ChangeEvent) => void - Change handler</li>
                                <li>type: string - Input type (default: "text")</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="border-l-4 border-[#FDA858] pl-4">
                            <h4 className="font-medium mb-1">BorderAnimationInput</h4>
                            <p className="text-sm text-muted-foreground">
                              Input with a border that animates when focused.
                            </p>
                            <div className="mt-2">
                              <p className="text-sm font-medium">Props:</p>
                              <ul className="list-disc list-inside text-xs text-muted-foreground ml-2 space-y-1">
                                <li>placeholder: string - Placeholder text</li>
                                <li>value?: string - The input value</li>
                                <li>onChange?: (e: ChangeEvent) => void - Change handler</li>
                                <li>type?: string - Input type (default: "text")</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="border-l-4 border-[#FDA858] pl-4">
                            <h4 className="font-medium mb-1">PlaceholderAnimationInput</h4>
                            <p className="text-sm text-muted-foreground">
                              Input with animated placeholder text.
                            </p>
                            <div className="mt-2">
                              <p className="text-sm font-medium">Props:</p>
                              <ul className="list-disc list-inside text-xs text-muted-foreground ml-2 space-y-1">
                                <li>placeholder: string - Placeholder text</li>
                                <li>value?: string - The input value</li>
                                <li>onChange?: (e: ChangeEvent) => void - Change handler</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Card Components</h3>
                        <p className="text-muted-foreground mb-3">
                          Animated cards for displaying content with hover and click interactions.
                        </p>
                        
                        <div className="mt-4 space-y-4">
                          <div className="border-l-4 border-[#FDA858] pl-4">
                            <h4 className="font-medium mb-1">HoverCard</h4>
                            <p className="text-sm text-muted-foreground">
                              Card that animates on hover with scale and shadow effects.
                            </p>
                            <div className="mt-2">
                              <p className="text-sm font-medium">Props:</p>
                              <ul className="list-disc list-inside text-xs text-muted-foreground ml-2 space-y-1">
                                <li>children: ReactNode - Card content</li>
                                <li>className?: string - Additional CSS classes</li>
                                <li>onClick?: () => void - Click handler</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="border-l-4 border-[#FDA858] pl-4">
                            <h4 className="font-medium mb-1">FlipCard</h4>
                            <p className="text-sm text-muted-foreground">
                              Card that flips to reveal content on the back.
                            </p>
                            <div className="mt-2">
                              <p className="text-sm font-medium">Props:</p>
                              <ul className="list-disc list-inside text-xs text-muted-foreground ml-2 space-y-1">
                                <li>frontContent: ReactNode - Content for front of card</li>
                                <li>backContent: ReactNode - Content for back of card</li>
                                <li>className?: string - Additional CSS classes</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            {/* Animation Categories */}
            {activePage === 3 && (
              <section id="categories" className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Animation Categories</h1>
                
                <div className="space-y-8">
                  <Card className="bg-[#222] border-[#333]">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Navigation Menus & Drawers</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                          <li><span className="font-medium">Menu Open/Close:</span> Slide in/out, fade in/out, scale in/out animations</li>
                          <li><span className="font-medium">Menu Items:</span> Staggered reveal, underline or highlight animation on hover</li>
                          <li><span className="font-medium">Hamburger Icon:</span> Morph to close icon and back</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Lists & Grids</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                          <li><span className="font-medium">Item Entrance:</span> Staggered fade/slide in for list/grid items</li>
                          <li><span className="font-medium">Reordering:</span> Smooth movement of items on drag-and-drop</li>
                          <li><span className="font-medium">Removal:</span> Fade or slide out</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Tooltips & Popovers</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                          <li><span className="font-medium">Show/Hide:</span> Fade in/out, scale up/down, slide from trigger element</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Alerts & Toasts</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                          <li><span className="font-medium">Entrance:</span> Slide in (from top, bottom, or side), fade in</li>
                          <li><span className="font-medium">Exit:</span> Slide out, fade out</li>
                          <li><span className="font-medium">Progress Bar:</span> Animated auto-dismiss progress</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Tabs & Accordions</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                          <li><span className="font-medium">Tab Change:</span> Underline or highlight slide animation, content fade/slide in/out</li>
                          <li><span className="font-medium">Accordion Expand/Collapse:</span> Height expansion with smooth easing, icon rotation</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            {/* Advanced Usage */}
            {activePage === 4 && (
              <section id="advanced" className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Advanced Usage</h1>
                
                <div className="space-y-8">
                  <Card className="bg-[#222] border-[#333]">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Creating Custom Animations</h3>
                        <p className="text-muted-foreground">
                          Learn how to build your own animations using the library's primitives.
                        </p>
                        <div className="mt-3 text-sm text-muted-foreground">
                          <p>Our library provides a set of low-level hooks and utilities that allow you to create custom animations:</p>
                          <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                            <li>useAnime hook for controlling animations</li>
                            <li>useTimeline hook for creating animation sequences</li>
                            <li>useAnimationGroup for coordinating multiple animations</li>
                          </ul>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute right-0 top-0 flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => setShowCode(!showCode)}
                          >
                            <Code size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => copyCode(`import { useAnime } from 'react-anime-lib';\n\nconst CustomAnimation = () => {\n  const [ref, anime] = useAnime({\n    translateX: [0, 250],\n    rotate: '1turn',\n    duration: 800,\n    easing: 'easeInOutQuad'\n  });\n\n  return (\n    <div>\n      <button onClick={() => anime.play()}>Play</button>\n      <button onClick={() => anime.pause()}>Pause</button>\n      <div ref={ref}>Animated element</div>\n    </div>\n  );\n};`)}
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Animation Timelines</h3>
                        {showCode ? (
                          <CodeBlock code={`import { useAnime } from 'react-anime-lib';\n\nconst CustomAnimation = () => {\n  const [ref, anime] = useAnime({\n    translateX: [0, 250],\n    rotate: '1turn',\n    duration: 800,\n    easing: 'easeInOutQuad'\n  });\n\n  return (\n    <div>\n      <button onClick={() => anime.play()}>Play</button>\n      <button onClick={() => anime.pause()}>Pause</button>\n      <div ref={ref}>Animated element</div>\n    </div>\n  );\n};`} />
                        ) : (
                          <p className="text-muted-foreground mb-3">
                            Timelines allow you to sequence animations, with precise control over timing and coordination.
                          </p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Animation Choreography</h3>
                        <p className="text-muted-foreground">
                          Coordinating animations between multiple components can create complex, engaging user experiences. Our library provides tools for synchronizing animations across your UI.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">State Management Integration</h3>
                        <p className="text-muted-foreground">
                          Our animations integrate seamlessly with state management libraries:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                          <li>React Context API for sharing animation state</li>
                          <li>Redux for global animation state management</li>
                          <li>React Query for data-driven animations</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            {/* Animation Recipes */}
            {activePage === 5 && (
              <section id="recipes" className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Animation Recipes</h1>
                
                <div className="space-y-8">
                  <Card className="bg-[#222] border-[#333]">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Common UI Patterns</h3>
                        <p className="text-muted-foreground">
                          Ready-to-use animation recipes for common UI interactions:
                        </p>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#1c1c1c] p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Floating Button</h4>
                            <p className="text-sm text-muted-foreground">
                              A button that subtly floats up and down with a pulsing shadow effect.
                            </p>
                          </div>
                          <div className="bg-[#1c1c1c] p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Notification Badge</h4>
                            <p className="text-sm text-muted-foreground">
                              A badge that pulses to draw attention to new notifications.
                            </p>
                          </div>
                          <div className="bg-[#1c1c1c] p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Page Transitions</h4>
                            <p className="text-sm text-muted-foreground">
                              Smooth transitions between pages with content that fades and slides.
                            </p>
                          </div>
                          <div className="bg-[#1c1c1c] p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Content Loaders</h4>
                            <p className="text-sm text-muted-foreground">
                              Animated placeholders for content that is still loading.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute right-0 top-0 flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => setShowCode(!showCode)}
                          >
                            <Code size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => copyCode(`import { AnimatedButton } from 'react-anime-lib';\n\nconst MyComponent = () => {\n  return (\n    <AnimatedButton\n      animation="pulse"\n      duration={1000}\n      ease="easeInOutQuad"\n      onClick={() => console.log('Clicked!')}\n    >\n      Click Me\n    </AnimatedButton>\n  );\n};`)}
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Copy-Paste Solutions</h3>
                        {showCode ? (
                          <CodeBlock code={`import { AnimatedButton } from 'react-anime-lib';\n\nconst MyComponent = () => {\n  return (\n    <AnimatedButton\n      animation="pulse"\n      duration={1000}\n      ease="easeInOutQuad"\n      onClick={() => console.log('Clicked!')}\n    >\n      Click Me\n    </AnimatedButton>\n  );\n};`} />
                        ) : (
                          <p className="text-muted-foreground mb-3">
                            Ready-to-use code snippets for common animation needs.
                          </p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Troubleshooting</h3>
                        <p className="text-muted-foreground">
                          Common issues and their solutions:
                        </p>
                        <div className="mt-3 space-y-3">
                          <div className="bg-[#1c1c1c] p-3 rounded-lg">
                            <h4 className="font-medium">Animations not working in production builds</h4>
                            <p className="text-sm text-muted-foreground">
                              Make sure to use proper ref handling and check browser console for errors.
                            </p>
                          </div>
                          <div className="bg-[#1c1c1c] p-3 rounded-lg">
                            <h4 className="font-medium">Animations stuttering or lagging</h4>
                            <p className="text-sm text-muted-foreground">
                              Use hardware-accelerated properties (transform, opacity) and reduce animation complexity.
                            </p>
                          </div>
                          <div className="bg-[#1c1c1c] p-3 rounded-lg">
                            <h4 className="font-medium">Animations running on server-side rendering</h4>
                            <p className="text-sm text-muted-foreground">
                              Use proper checks for window/document objects and consider using dynamic imports.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            {/* API Reference */}
            {activePage === 6 && (
              <section id="api" className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">API Reference</h1>
                
                <div className="space-y-8">
                  <Card className="bg-[#222] border-[#333]">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Configuration Options</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-[#333]">
                                <th className="text-left py-2 px-3">Property</th>
                                <th className="text-left py-2 px-3">Type</th>
                                <th className="text-left py-2 px-3">Default</th>
                                <th className="text-left py-2 px-3">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-[#333]">
                                <td className="py-2 px-3 font-medium">duration</td>
                                <td className="py-2 px-3">number</td>
                                <td className="py-2 px-3">1000</td>
                                <td className="py-2 px-3">Animation duration in milliseconds</td>
                              </tr>
                              <tr className="border-b border-[#333]">
                                <td className="py-2 px-3 font-medium">easing</td>
                                <td className="py-2 px-3">string</td>
                                <td className="py-2 px-3">'easeOutElastic'</td>
                                <td className="py-2 px-3">Animation easing function name</td>
                              </tr>
                              <tr className="border-b border-[#333]">
                                <td className="py-2 px-3 font-medium">delay</td>
                                <td className="py-2 px-3">number</td>
                                <td className="py-2 px-3">0</td>
                                <td className="py-2 px-3">Delay before animation starts</td>
                              </tr>
                              <tr className="border-b border-[#333]">
                                <td className="py-2 px-3 font-medium">loop</td>
                                <td className="py-2 px-3">boolean | number</td>
                                <td className="py-2 px-3">false</td>
                                <td className="py-2 px-3">Number of times to loop animation (true for infinite)</td>
                              </tr>
                              <tr className="border-b border-[#333]">
                                <td className="py-2 px-3 font-medium">autoplay</td>
                                <td className="py-2 px-3">boolean</td>
                                <td className="py-2 px-3">true</td>
                                <td className="py-2 px-3">Whether to play animation automatically</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Easing Functions</h3>
                        <p className="text-muted-foreground mb-3">
                          Our library supports all Anime.js easing functions:
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">easeInQuad</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">easeOutQuad</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">easeInOutQuad</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">easeInCubic</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">easeOutCubic</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">easeInOutCubic</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">easeInQuart</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">easeOutQuart</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">easeInOutQuart</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">easeInElastic</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">easeOutElastic</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">easeInOutElastic</div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Animation Properties</h3>
                        <p className="text-muted-foreground mb-3">
                          Properties that can be animated:
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">translateX</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">translateY</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">rotate</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">scale</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">opacity</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">backgroundColor</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">borderRadius</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">width</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">height</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">skew</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">d (SVG paths)</div>
                          <div className="bg-[#1c1c1c] px-3 py-2 rounded text-sm">strokeDashoffset</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            {/* Additional pages for the remaining sections */}
            {activePage === 7 && (
              <section id="migration" className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Migration Guide</h1>
                
                <div className="space-y-8">
                  <Card className="bg-[#222] border-[#333]">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Upgrading from v1.x to v2.x</h3>
                        <p className="text-muted-foreground mb-3">
                          The major changes between v1 and v2 include:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                          <li>New hook-based API replacing class components</li>
                          <li>Improved performance with optimized animations</li>
                          <li>Enhanced TypeScript support</li>
                          <li>New animation components and utilities</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Breaking Changes</h3>
                        <div className="mt-3 space-y-3">
                          <div className="bg-[#1c1c1c] p-3 rounded-lg">
                            <h4 className="font-medium">AnimationProvider component</h4>
                            <p className="text-sm text-muted-foreground">
                              The AnimationProvider is no longer required at the root level.
                            </p>
                          </div>
                          <div className="bg-[#1c1c1c] p-3 rounded-lg">
                            <h4 className="font-medium">withAnimation HOC removed</h4>
                            <p className="text-sm text-muted-foreground">
                              Replace withAnimation HOC with the new useAnimation hook.
                            </p>
                          </div>
                          <div className="bg-[#1c1c1c] p-3 rounded-lg">
                            <h4 className="font-medium">Animation configuration</h4>
                            <p className="text-sm text-muted-foreground">
                              Configuration object structure has changed, see the updated API reference.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute right-0 top-0 flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => setShowCode(!showCode)}
                          >
                            <Code size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => copyCode(`// v1.x (old)\nimport { withAnimation } from 'react-anime-lib';\n\nclass MyComponent extends React.Component {\n  render() {\n    return <div ref={this.props.animationRef}>Animated content</div>;\n  }\n}\n\nexport default withAnimation(MyComponent, {\n  translateY: [50, 0],\n  opacity: [0, 1],\n  duration: 1000\n});\n\n// v2.x (new)\nimport { useAnimation } from 'react-anime-lib';\n\nconst MyComponent = () => {\n  const [ref] = useAnimation({\n    translateY: [50, 0],\n    opacity: [0, 1],\n    duration: 1000\n  });\n\n  return <div ref={ref}>Animated content</div>;\n};`)}
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Migration Examples</h3>
                        {showCode ? (
                          <CodeBlock code={`// v1.x (old)\nimport { withAnimation } from 'react-anime-lib';\n\nclass MyComponent extends React.Component {\n  render() {\n    return <div ref={this.props.animationRef}>Animated content</div>;\n  }\n}\n\nexport default withAnimation(MyComponent, {\n  translateY: [50, 0],\n  opacity: [0, 1],\n  duration: 1000\n});\n\n// v2.x (new)\nimport { useAnimation } from 'react-anime-lib';\n\nconst MyComponent = () => {\n  const [ref] = useAnimation({\n    translateY: [50, 0],\n    opacity: [0, 1],\n    duration: 1000\n  });\n\n  return <div ref={ref}>Animated content</div>;\n};`} />
                        ) : (
                          <p className="text-muted-foreground mb-3">
                            Code examples showing how to migrate from v1.x to v2.x.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            {activePage === 8 && (
              <section id="playground" className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Playground</h1>
                
                <div className="space-y-8">
                  <Card className="bg-[#222] border-[#333]">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Interactive Editor</h3>
                        <p className="text-muted-foreground">
                          Our playground allows you to experiment with different animations and see the results in real-time. Try adjusting parameters to see how they affect the animation.
                        </p>
                        <div className="mt-6 p-6 bg-[#1c1c1c] rounded-lg border border-[#333] text-center">
                          <p className="text-muted-foreground">Interactive playground coming soon</p>
                          <Button className="mt-4 bg-[#FDA858] text-[#191921] hover:bg-[#F9B143]">
                            Join Waitlist for Early Access
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Animation Inspector</h3>
                        <p className="text-muted-foreground">
                          The Animation Inspector provides tools to visualize and debug animations, including:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                          <li>Timeline view of all running animations</li>
                          <li>Property inspector to see animated values in real-time</li>
                          <li>Performance metrics for optimization</li>
                          <li>Export functionality to save and share animations</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            {activePage === 9 && (
              <section id="examples" className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Examples & Templates</h1>
                
                <div className="space-y-8">
                  <Card className="bg-[#222] border-[#333]">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Real-world Examples</h3>
                        <p className="text-muted-foreground mb-3">
                          Full implementations in various contexts:
                        </p>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#1c1c1c] p-4 rounded-lg">
                            <h4 className="font-medium mb-2">E-commerce Product Page</h4>
                            <p className="text-sm text-muted-foreground">
                              Product image gallery with animated transitions and hover effects.
                            </p>
                          </div>
                          <div className="bg-[#1c1c1c] p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Dashboard Interface</h4>
                            <p className="text-sm text-muted-foreground">
                              Data visualization components with entrance animations and tooltips.
                            </p>
                          </div>
                          <div className="bg-[#1c1c1c] p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Mobile Navigation</h4>
                            <p className="text-sm text-muted-foreground">
                              Responsive mobile menu with smooth slide and fade transitions.
                            </p>
                          </div>
                          <div className="bg-[#1c1c1c] p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Landing Page</h4>
                            <p className="text-sm text-muted-foreground">
                              Hero section with staggered content entrance and scroll-triggered animations.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Starter Templates</h3>
                        <p className="text-muted-foreground mb-3">
                          Ready-to-use templates for common animation needs:
                        </p>
                        <div className="mt-3 space-y-3">
                          <div className="bg-[#1c1c1c] p-3 rounded-lg">
                            <h4 className="font-medium">Page Transitions Template</h4>
                            <p className="text-sm text-muted-foreground">
                              Set up smooth transitions between pages in a React Router application.
                            </p>
                            <Button className="mt-2 text-xs" variant="outline" size="sm">
                              View Template
                            </Button>
                          </div>
                          <div className="bg-[#1c1c1c] p-3 rounded-lg">
                            <h4 className="font-medium">Animated Form Template</h4>
                            <p className="text-sm text-muted-foreground">
                              Multi-step form with animated transitions between steps.
                            </p>
                            <Button className="mt-2 text-xs" variant="outline" size="sm">
                              View Template
                            </Button>
                          </div>
                          <div className="bg-[#1c1c1c] p-3 rounded-lg">
                            <h4 className="font-medium">Animation Gallery</h4>
                            <p className="text-sm text-muted-foreground">
                              Showcase of different animation techniques with code examples.
                            </p>
                            <Button className="mt-2 text-xs" variant="outline" size="sm">
                              View Template
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            {activePage === 10 && (
              <section id="contributing" className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Contributing Guide</h1>
                
                <div className="space-y-8">
                  <Card className="bg-[#222] border-[#333]">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Development Setup</h3>
                        <p className="text-muted-foreground mb-3">
                          Instructions for setting up the development environment:
                        </p>
                        <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
                          <li>Fork the repository on GitHub</li>
                          <li>Clone your fork: <code className="text-xs bg-[#333] px-2 py-1 rounded">git clone https://github.com/yourusername/react-anime-lib.git</code></li>
                          <li>Install dependencies: <code className="text-xs bg-[#333] px-2 py-1 rounded">npm install</code></li>
                          <li>Start the dev server: <code className="text-xs bg-[#333] px-2 py-1 rounded">npm run dev</code></li>
                          <li>Make your changes and test thoroughly</li>
                          <li>Submit a pull request with your changes</li>
                        </ol>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Pull Request Process</h3>
                        <p className="text-muted-foreground mb-3">
                          Guidelines for contributing code:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                          <li>Create a new branch for your feature or fix</li>
                          <li>Follow the existing code style and conventions</li>
                          <li>Include tests for your changes</li>
                          <li>Update documentation as needed</li>
                          <li>Ensure all tests pass before submitting</li>
                          <li>Reference any related issues in your PR description</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Component Requirements</h3>
                        <p className="text-muted-foreground mb-3">
                          Standards for new components:
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                          <li>TypeScript definitions for all props and exports</li>
                          <li>Comprehensive documentation with usage examples</li>
                          <li>Accessibility considerations (ARIA attributes, keyboard navigation)</li>
                          <li>Performance optimizations where applicable</li>
                          <li>Responsive behavior for different screen sizes</li>
                          <li>Unit tests with at least 80% coverage</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-2">Code of Conduct</h3>
                        <p className="text-muted-foreground">
                          We follow a standard code of conduct to ensure a welcoming and inclusive community. All contributors are expected to adhere to our code of conduct in all project spaces.
                        </p>
                        <Button className="mt-4" variant="outline">
                          Read Code of Conduct
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            {/* Pagination */}
            <Pagination className="mt-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => {
                    e.preventDefault();
                    handlePrevPage();
                  }} className={activePage === 0 ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
                <PaginationItem>
                  <span className="text-sm">
                    Page {activePage + 1} of {docSections.length}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => {
                    e.preventDefault();
                    handleNextPage();
                  }} className={activePage === docSections.length - 1 ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Docs;
