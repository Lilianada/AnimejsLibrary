
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
      <>
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
import anime from &apos;animejs&apos;;

useEffect(() =&gt; {"{"}
  anime({"{"} 
    targets: ref.current, 
    opacity: [0, 1], 
    duration: 1000 
  {"}"});
{"}"}, []);
        </code></pre>
        <h3 className="mt-6 text-lg font-semibold">Browser Compatibility</h3>
        <p>
          Anime.js supports all modern browsers. For older browsers, consider adding suitable polyfills.
        </p>
      </>
    )
  },
  {
    title: "2. Core Concepts",
    slug: "core-concepts",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">Core Concepts</h2>
        <ol className="list-disc space-y-2 pl-4">
          <li><b>Anime.js Integration:</b> Hook Anime.js into React's lifecycle for seamless, performant animations.</li>
          <li><b>Refs & Animation Targets:</b> Use React refs to target DOM elements with Anime.js.</li>
          <li><b>Animation Triggers:</b> Trigger animations on mount, state change, or user events.</li>
          <li><b>Performance Considerations:</b> Minimize re-renders and follow Anime.js best practices for performance.</li>
        </ol>
      </>
    )
  },
  {
    title: "3. Component Documentation",
    slug: "component-documentation",
    content: (
      <>
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
      </>
    )
  },
  {
    title: "4. Animation Categories",
    slug: "animation-categories",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">Animation Categories</h2>
        <p className="mb-4">
          The library covers a broad set of animation categories:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Forms, Modals, Cards, Lists, Loaders, Sidebars, Tooltips, Toasts</li>
          <li>Each category lists available components, usage patterns, and interactive examples.</li>
        </ul>
      </>
    )
  },
  {
    title: "5. Advanced Usage",
    slug: "advanced-usage",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">Advanced Usage</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><b>Creating Custom Animations:</b> Build your own with Anime.js and the library's hooks.</li>
          <li><b>Animation Timelines:</b> Sequence multiple steps with Anime.js timelines.</li>
          <li><b>Animation Choreography:</b> Coordinate animations using context or callbacks.</li>
          <li><b>State Management Integration:</b> Examples for Redux, Zustand, Context.</li>
        </ol>
      </>
    )
  },
  {
    title: "6. Animation Recipes",
    slug: "animation-recipes",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">Animation Recipes</h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>Common UI Patterns with ready-to-use recipes.</li>
          <li>Copy-paste code examples.</li>
          <li>Troubleshooting tips for common edge cases.</li>
        </ul>
      </>
    )
  },
  {
    title: "7. API Reference",
    slug: "api-reference",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">API Reference</h2>
        <p>
          <b>Configuration Options:</b> Full list of animation parameters (duration, easing, etc.)<br />
          <b>Easing Functions:</b> Visual chart of supported easings.<br />
          <b>Animation Properties:</b> List of animatable CSS/SVG properties.
        </p>
      </>
    )
  },
  {
    title: "8. Migration Guide",
    slug: "migration-guide",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">Migration Guide</h2>
        <ol className="list-decimal space-y-2 pl-6">
          <li>
            <b>Upgrading from Previous Versions:</b> Stepwise instructions for migrating your codebase.
          </li>
          <li>
            <b>Breaking Changes:</b> See the list of breaking changes for each release.
          </li>
        </ol>
      </>
    )
  },
  {
    title: "9. Lists & Grids",
    slug: "lists-grids",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">Lists & Grids</h2>
        <ul className="list-disc space-y-4 pl-6">
          <li>
            <span className="font-semibold">Item Entrance:</span>
            <p className="mt-1">Staggered fade/slide in for list/grid items, creating a visually pleasing entrance effect.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// Staggered list entrance
anime({
  targets: '.list-item',
  translateY: [20, 0],
  opacity: [0, 1],
  delay: anime.stagger(100),
  easing: 'easeOutQuad'
});`}
            </code></pre>
          </li>
          <li>
            <span className="font-semibold">Reordering:</span>
            <p className="mt-1">Smooth movement of items on drag-and-drop for intuitive user interactions.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// Animate item movement during reordering
anime({
  targets: '.item-' + itemId,
  translateX: targetX,
  translateY: targetY,
  duration: 300,
  easing: 'easeOutQuint'
});`}
            </code></pre>
          </li>
          <li>
            <span className="font-semibold">Removal:</span>
            <p className="mt-1">Fade or slide out animations for smooth list item removal.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// Animate item removal
anime({
  targets: '.item-to-remove',
  translateX: -20,
  opacity: 0,
  duration: 300,
  easing: 'easeOutQuad',
  complete: () => {
    // Remove from DOM or state after animation completes
  }
});`}
            </code></pre>
          </li>
        </ul>
      </>
    )
  },
  {
    title: "10. Tooltips & Popovers",
    slug: "tooltips-popovers",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">Tooltips & Popovers</h2>
        <ul className="list-disc space-y-4 pl-6">
          <li>
            <span className="font-semibold">Show/Hide Animations:</span>
            <p className="mt-1">Elegant entrance and exit animations for tooltips and popovers.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// Fade in tooltip
anime({
  targets: '.tooltip',
  opacity: [0, 1],
  scale: [0.9, 1],
  duration: 200,
  easing: 'easeOutQuad'
});

// Slide in popover from trigger
anime({
  targets: '.popover',
  translateY: [10, 0],
  opacity: [0, 1],
  duration: 250,
  easing: 'easeOutQuint'
});`}
            </code></pre>
          </li>
        </ul>
      </>
    )
  },
  {
    title: "11. Alerts & Toasts",
    slug: "alerts-toasts",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">Alerts & Toasts</h2>
        <ul className="list-disc space-y-4 pl-6">
          <li>
            <span className="font-semibold">Entrance & Exit:</span>
            <p className="mt-1">Smooth animations for alert and toast notifications.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// Slide in toast from top
anime({
  targets: '.toast-notification',
  translateY: [-50, 0],
  opacity: [0, 1],
  duration: 400,
  easing: 'easeOutElastic(1, 0.6)'
});

// Progress bar animation
anime({
  targets: '.toast-progress',
  width: ['0%', '100%'],
  duration: 3000,
  easing: 'linear',
  complete: () => {
    // Dismiss toast when complete
    dismissToast();
  }
});`}
            </code></pre>
          </li>
        </ul>
      </>
    )
  },
  {
    title: "12. Tabs & Accordions",
    slug: "tabs-accordions",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">Tabs & Accordions</h2>
        <ul className="list-disc space-y-4 pl-6">
          <li>
            <span className="font-semibold">Tab Change:</span>
            <p className="mt-1">Animated tab transitions and underline indicators.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// Animate tab underline
anime({
  targets: '.tab-underline',
  translateX: tabPosition,
  width: tabWidth,
  easing: 'easeOutQuint',
  duration: 250
});

// Fade in new tab content
anime({
  targets: '.tab-content',
  opacity: [0, 1],
  translateY: [10, 0],
  easing: 'easeOutQuad',
  duration: 250
});`}
            </code></pre>
          </li>
          <li>
            <span className="font-semibold">Accordion Expand/Collapse:</span>
            <p className="mt-1">Smooth height transitions and icon rotations.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// Animate accordion height
anime({
  targets: '.accordion-content',
  height: [0, expandedHeight],
  opacity: [0, 1],
  duration: 300,
  easing: 'easeOutCubic'
});

// Rotate accordion chevron
anime({
  targets: '.accordion-icon',
  rotate: isOpen ? 180 : 0,
  duration: 300,
  easing: 'easeOutQuad'
});`}
            </code></pre>
          </li>
        </ul>
      </>
    )
  },
  {
    title: "13. SVG & Icon Animations",
    slug: "svg-icon-animations",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">SVG & Icon Animations</h2>
        <ul className="list-disc space-y-4 pl-6">
          <li>
            <span className="font-semibold">Path Animation:</span>
            <p className="mt-1">Drawing and animating SVG paths.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// SVG path drawing animation
anime({
  targets: '.path-draw',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutCubic',
  duration: 1500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});`}
            </code></pre>
          </li>
          <li>
            <span className="font-semibold">Morphing:</span>
            <p className="mt-1">Shape morphing for icons or illustrations.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// Morph between SVG paths
anime({
  targets: '.morph-path',
  d: [
    { value: 'M0,0 C150,100 150,0 300,0' },
    { value: 'M0,0 C150,0 150,100 300,0' },
    { value: 'M0,0 C150,100 150,0 300,0' }
  ],
  easing: 'easeOutQuad',
  duration: 1000,
  loop: true
});`}
            </code></pre>
          </li>
        </ul>
      </>
    )
  },
  {
    title: "14. Page Transitions",
    slug: "page-transitions",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">Page Transitions</h2>
        <ul className="list-disc space-y-4 pl-6">
          <li>
            <span className="font-semibold">Route Change Animations:</span>
            <p className="mt-1">Smooth transitions between pages for a polished user experience.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// Page exit animation
function exitPage() {
  return anime({
    targets: '.page-content',
    opacity: [1, 0],
    translateY: [0, -20],
    easing: 'easeInQuad',
    duration: 300
  }).finished;
}

// Page enter animation
function enterPage() {
  anime({
    targets: '.page-content',
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutQuad',
    duration: 300
  });
}

// Usage with React Router
async function handleRouteChange(to) {
  await exitPage();
  history.push(to);
  enterPage();
}`}
            </code></pre>
          </li>
        </ul>
      </>
    )
  },
  {
    title: "15. Theme Toggles",
    slug: "theme-toggles",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">Theme/Mode Toggles</h2>
        <ul className="list-disc space-y-4 pl-6">
          <li>
            <span className="font-semibold">Dark/Light Mode Transitions:</span>
            <p className="mt-1">Smooth transitions between theme modes.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// Animate theme icon (sun to moon)
anime({
  targets: '.theme-icon path',
  d: [
    { value: isDarkMode ? moonPath : sunPath },
  ],
  duration: 400,
  easing: 'easeOutQuad'
});

// Transition background colors
anime({
  targets: 'body',
  backgroundColor: isDarkMode ? '#121212' : '#ffffff',
  color: isDarkMode ? '#ffffff' : '#121212',
  duration: 500,
  easing: 'easeOutQuad'
});`}
            </code></pre>
          </li>
        </ul>
      </>
    )
  },
  {
    title: "16. Miscellaneous Techniques",
    slug: "miscellaneous",
    content: (
      <>
        <h2 className="text-xl font-bold mb-3">Miscellaneous Animation Techniques</h2>
        <ul className="list-disc space-y-4 pl-6">
          <li>
            <span className="font-semibold">Staggered Animations:</span>
            <p className="mt-1">Creating sequential animations for multiple elements.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// Staggered entrance
anime({
  targets: '.menu-item',
  translateY: [20, 0],
  opacity: [0, 1],
  delay: anime.stagger(100, {start: 300}),
  easing: 'easeOutQuad',
  duration: 400
});`}
            </code></pre>
          </li>
          <li>
            <span className="font-semibold">Timeline Animations:</span>
            <p className="mt-1">Coordinating complex, multi-step animations.</p>
            <pre className="p-3 bg-muted/50 rounded text-xs mt-2"><code>
{`// Create animation timeline
const timeline = anime.timeline({
  easing: 'easeOutQuad',
  duration: 500
});

// Add animations to timeline
timeline
  .add({
    targets: '.first-element',
    translateY: [40, 0],
    opacity: [0, 1]
  })
  .add({
    targets: '.second-element',
    translateX: [-40, 0],
    opacity: [0, 1]
  }, '-=200')
  .add({
    targets: '.third-element',
    scale: [0.8, 1],
    opacity: [0, 1]
  }, '-=150');`}
            </code></pre>
          </li>
        </ul>
      </>
    )
  }
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
                className={`w-full justify-start text-sm ${page === idx ? 'font-bold' : ''}`}
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
                      className={`w-full justify-start text-sm ${page === idx ? 'font-bold' : ''}`}
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
