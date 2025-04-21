
// COMBINED DOCS PAGE WITH FIXED CODEBLOCK ERRORS, PAGINATION, AND MOBILE SIDEBAR.

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";

const docsSections = [
  {
    title: "1. Introduction & Setup",
    slug: "introduction-setup",
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Introduction & Setup</h2>
        <p>
          The React & Anime.js Animation Library provides a comprehensive suite of components and utilities for creating stunning, high-performance UI animations in your React projects. Combining the power and simplicity of Anime.js with a robust suite of ready-made components, it empowers you to build beautiful UIs faster and more easily.
        </p>
        <h3 className="mt-6 text-lg font-semibold">Installation</h3>
        <pre className="p-3 bg-muted/50 rounded text-sm"><code>
npm install animejs react react-dom
# or
yarn add animejs react react-dom
        </code></pre>
        <h3 className="mt-6 text-lg font-semibold">Basic Setup</h3>
        <p>
          To get started, simply import <code>anime</code> from <code>animejs</code> and use it within your React components. For example:
        </p>
        <pre className="p-3 bg-muted/50 rounded text-sm"><code>
import anime from 'animejs';

useEffect(() {'{'} 
  anime({ 
    targets: ref.current, 
    opacity: [0, 1], 
    duration: 1000 
  }); 
{'}'}, []);
        </code></pre>
        <h3 className="mt-6 text-lg font-semibold">Browser Compatibility</h3>
        <p>
          Anime.js supports all modern browsers. For older browsers, consider adding suitable polyfills.
        </p>
      </div>
    )
  },
  {
    title: "2. Core Concepts",
    slug: "core-concepts",
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Core Concepts</h2>
        <ol className="list-disc space-y-2 pl-4">
          <li><b>Anime.js Integration:</b> Hook Anime.js into React’s lifecycle for seamless, performant animations.</li>
          <li><b>Refs & Animation Targets:</b> Use React refs to target DOM elements with Anime.js.</li>
          <li><b>Animation Triggers:</b> Trigger animations on mount, state change, or user events.</li>
          <li><b>Performance Considerations:</b> Minimize re-renders and follow Anime.js best practices for performance.</li>
        </ol>
      </div>
    )
  },
  {
    title: "3. Component Documentation",
    slug: "component-documentation",
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Component Documentation</h2>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <span className="font-semibold">Props API:</span> 
            <br />
            <span>All animation components list their prop types, defaults, and descriptions in a clear table.</span>
          </li>
          <li>
            <span className="font-semibold">Methods:</span>
            <br />
            <span>Components with additional methods (like <code>play()</code>, <code>pause()</code>) document their APIs where relevant.</span>
          </li>
          <li>
            <span className="font-semibold">Usage Examples:</span>
            <pre className="p-3 bg-muted/50 rounded text-xs"><code>
{`<FloatingLabelInput 
  label="Email" 
  animation="slide"
  onFocus={() => /* animation logic */} 
/>`}
            </code></pre>
          </li>
          <li>
            <span className="font-semibold">Customization Options:</span>
            <br />
            <span>Animations & styles customizable via props or style overrides.</span>
          </li>
          <li>
            <span className="font-semibold">Accessibility Considerations:</span>
            <br />
            <span>ARIA attributes and keyboard navigation provided out of the box.</span>
          </li>
        </ul>
      </div>
    )
  },
  {
    title: "4. Animation Categories",
    slug: "animation-categories",
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Animation Categories</h2>
        <p className="mb-4">
          The library covers a broad set of animation categories:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Forms, Modals, Cards, Lists, Loaders, Sidebars, Tooltips, Toasts</li>
          <li>Each category lists available components, usage patterns, and interactive examples.</li>
        </ul>
      </div>
    )
  },
  {
    title: "5. Advanced Usage",
    slug: "advanced-usage",
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Advanced Usage</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Creating Custom Animations:</b> Build your own with Anime.js and the library's hooks.</li>
          <li><b>Animation Timelines:</b> Sequence multiple steps with Anime.js timelines.</li>
          <li><b>Animation Choreography:</b> Coordinate animations using context or callbacks.</li>
          <li><b>State Management Integration:</b> Examples for Redux, Zustand, Context.</li>
        </ol>
      </div>
    )
  },
  {
    title: "6. Animation Recipes",
    slug: "animation-recipes",
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Animation Recipes</h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>Common UI Patterns with ready-to-use recipes.</li>
          <li>Copy-paste code examples.</li>
          <li>Troubleshooting tips for common edge cases.</li>
        </ul>
      </div>
    )
  },
  {
    title: "7. API Reference",
    slug: "api-reference",
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">API Reference</h2>
        <p>
          <b>Configuration Options:</b> Full list of animation parameters (duration, easing, etc.)<br />
          <b>Easing Functions:</b> Visual chart of supported easings.<br />
          <b>Animation Properties:</b> List of animatable CSS/SVG properties.
        </p>
      </div>
    )
  },
  {
    title: "8. Migration Guide",
    slug: "migration-guide",
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Migration Guide</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            <b>Upgrading from Previous Versions:</b> Stepwise instructions for migrating your codebase.
          </li>
          <li>
            <b>Breaking Changes:</b> See the list of breaking changes for each release.
          </li>
        </ol>
      </div>
    )
  },
  {
    title: "9. Playground",
    slug: "playground",
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Playground</h2>
        <p>
          Experiment interactively: Try out different animation settings and see results live.<br />
          (Coming soon!)
        </p>
      </div>
    )
  },
  {
    title: "10. Examples & Templates",
    slug: "examples-templates",
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Examples & Templates</h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>Complete, real-world code examples.</li>
          <li>Starter templates for common use cases.</li>
        </ul>
      </div>
    )
  },
  {
    title: "11. Contributing Guide",
    slug: "contributing-guide",
    content: (
      <div>
        <h2 className="text-xl font-bold mb-3">Contributing Guide</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Development Setup:</b> How to set up the project locally.</li>
          <li><b>Submission Guidelines:</b> Details about PR process, code standards.</li>
          <li><b>Component Requirements:</b> Expected standards for new components.</li>
        </ol>
      </div>
    )
  },
];

// Mobile sidebar mode state
function useMobileSidebar() {
  const [open, setOpen] = React.useState(false);
  return { open, setOpen };
}

const Docs = () => {
  const [page, setPage] = React.useState(0);
  const { open, setOpen } = useMobileSidebar();

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(docsSections.length - 1, p + 1));
  const goto = (i: number) => {
    setPage(i);
    setOpen(false);
  };

  return (
    <div className="flex min-h-[70vh] relative bg-[#181818]">
      {/* Sidebar */}
      {/* Desktop: static sidebar; Mobile: Sheet drawer */}
      <div className="hidden md:block min-w-[220px] border-r border-[#252525] pt-10 px-4 bg-[#181818] text-foreground/80">
        <h3 className="text-lg font-bold mb-5">Documentation</h3>
        <ul>
          {docsSections.map((section, idx) => (
            <li key={section.slug} className={`mb-2`}>
              <Button
                variant={page === idx ? "default" : "ghost"}
                className={`w-full justify-start ${page === idx ? 'font-bold' : ''}`}
                onClick={() => goto(idx)}
              >
                {section.title}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile sidebar */}
      <div className="md:hidden absolute left-2 top-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="max-w-xs w-full bg-[#181818]">
            <div className="pt-8 px-2">
              <h3 className="text-base font-bold mb-4">Documentation</h3>
              <ul>
                {docsSections.map((section, idx) => (
                  <li key={section.slug} className="mb-2">
                    <Button
                      variant={page === idx ? "default" : "ghost"}
                      className={`w-full justify-start ${page === idx ? 'font-bold' : ''}`}
                      onClick={() => goto(idx)}
                    >
                      {section.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* Section Content */}
      <main className="flex-1 px-5 md:px-14 py-12 max-w-3xl mx-auto">
        <h1 className="text-3xl mb-8 font-bold text-center text-[#FDA858]">Documentation for React & Anime.js Animation Library</h1>
        <div className="mb-10">{docsSections[page].content}</div>
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={page === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </Button>
          <span className="text-sm opacity-60">{docsSections[page].title}</span>
          <Button
            variant="ghost"
            onClick={handleNext}
            disabled={page === docsSections.length - 1}
            className="gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Docs;
