
# Animated UI Delights: React Animation Gallery

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF.svg)](https://vitejs.dev/)
[![Powered by anime.js](https://img.shields.io/badge/Powered%20by-anime.js-FF6B6B.svg)](https://animejs.com/)

Welcome to **Animated UI Delights**, a curated collection of modern, delightful UI animations built with React, Vite, Tailwind CSS, Shadcn UI, and the powerful Anime.js library. This project serves as a practical gallery and learning resource, offering copy-pasteable examples for developers looking to enhance their web applications with engaging user experiences.

## 🎯 Project Vision

This project aims to be the go-to resource for React developers who want to add smooth, meaningful animations to their applications. We believe that well-crafted animations can significantly improve user experience when used thoughtfully.

## ✨ Features

- **Diverse Animation Categories:** 
  - Button animations (ripple, pulse, shifting, icon rotation)
  - Card and tile animations (hover effects, entry animations)
  - Form and input animations (focus effects, validation feedback)
  - Loaders and spinners (various styles and effects)
  - Modal and dialog transitions (entry/exit animations)
  - Toast notifications (animated notifications with stacking)
  - Draggable elements (simple drag, spring physics, snapping)
  - Scroll-triggered animations (fade in, slide up, scale up)
  - Text animations (typewriter, gradient effects, reveal animations)
  - Hero text animations (staggered, glitch, masked effects)

- **Copy-Paste Friendly:** Each example comes with clean, well-documented code snippets
- **Interactive Previews:** See animations in action directly within the gallery
- **Modern Tech Stack:** Built with industry-standard tools for optimal performance
- **Responsive Design:** All animations work seamlessly across different screen sizes
- **Theme Support:** Light and dark mode compatibility

## 🚀 Tech Stack

- **Framework:** [React 18](https://reactjs.org/) with TypeScript
- **Build Tool:** [Vite](https://vitejs.dev/) for fast development and building
- **Animation Library:** [Anime.js 4.0](https://animejs.com/) for smooth, performant animations
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (built on Radix UI & Tailwind CSS)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **Icons:** [Lucide React](https://lucide.dev/) for consistent iconography
- **Routing:** [React Router DOM](https://reactrouter.com/) for navigation

## 🏗️ Project Structure

```
src/
├── components/
│   ├── examples/
│   │   ├── animations/          # Core animation components
│   │   │   ├── buttons/         # Button animation examples
│   │   │   ├── cards/           # Card animation examples
│   │   │   ├── forms/           # Form animation examples
│   │   │   ├── hero-text/       # Hero text animation effects
│   │   │   ├── image-reveal/    # Image reveal animations
│   │   │   ├── loaders/         # Loading animation components
│   │   │   ├── modals/          # Modal transition animations
│   │   │   ├── text/            # Text animation effects
│   │   │   └── toast/           # Toast notification animations
│   │   ├── ButtonExamples.tsx   # Button animation showcase
│   │   ├── CardAnimations.tsx   # Card animation showcase
│   │   ├── LoaderShowcase.tsx   # Loader animation showcase
│   │   └── ...                  # Other example showcases
│   ├── ui/                      # Shadcn UI components
│   └── layout/                  # Layout components
├── pages/                       # Route pages
├── hooks/                       # Custom React hooks
└── lib/                         # Utility functions
```

## 🚧 Current Progress

### ✅ Completed Features
- Basic project structure with React + Vite + TypeScript
- Shadcn UI integration with Tailwind CSS
- Route-based navigation system
- Multiple animation categories implemented:
  - Button animations with various effects
  - Text animations (typewriter, gradient, letter fly-in)
  - Hero text animations (staggered, glitch, masked effects)
  - Toast notifications with stacking effects
  - Card hover and reveal animations
  - Loading spinners and progress indicators
  - Form input animations with state feedback
  - Image reveal animations with multiple effects
  - Scroll-triggered animations
  - Draggable card interactions

### 🔄 In Progress
- Fixing anime.js import/export consistency across all components
- Improving TypeScript type safety for animation parameters
- Adding more comprehensive examples for each category
- Performance optimization for complex animations

### 📋 Planned Features
- Animation timeline controls (play, pause, reverse)
- Animation easing visualizer
- Performance metrics for animations
- Export functionality for individual components
- Animation preset builder
- Community-contributed animations
- Video tutorials for complex animations
- Mobile-optimized touch interactions
- Accessibility features for reduced motion preferences

## 🐛 Known Issues

### Critical Issues
1. **Anime.js Import Inconsistency** 
   - Some components use `import anime from 'animejs'` while others use `import * as anime from 'animejs'`
   - Build fails due to default export not being available
   - **Status:** Partially fixed, some components still need updates

2. **TypeScript Errors**
   - `anime.default is not a function` errors in runtime
   - Type definition conflicts between different import styles
   - **Impact:** Prevents successful builds and deployments

### Minor Issues
1. **Animation Performance**
   - Some complex animations may cause frame drops on lower-end devices
   - Need to implement `will-change` CSS properties strategically

2. **Responsive Design**
   - Some animations don't scale well on mobile devices
   - Touch interactions need refinement

3. **Documentation**
   - Code examples in some components need better comments
   - Missing usage instructions for complex animations

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/animated-ui-delights.git
   cd animated-ui-delights
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173) to view the application.

### Building for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Fix Bugs:** Help resolve the known issues listed above
2. **Add New Animations:** Create new animation examples following our patterns
3. **Improve Documentation:** Add better comments and usage examples
4. **Performance Optimization:** Help make animations smoother and more efficient
5. **Mobile Experience:** Improve touch interactions and mobile responsiveness
6. **Accessibility:** Add support for `prefers-reduced-motion` and other a11y features

### Development Guidelines

#### Code Style
- Use TypeScript for all new components
- Follow the existing file structure and naming conventions
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Ensure all animations are smooth and performant
- Add proper TypeScript types for all props and functions

#### Animation Best Practices
- Keep animations under 300ms for micro-interactions
- Use easing functions that feel natural (`easeOutQuad`, `easeInOutSine`)
- Ensure animations don't interfere with user interactions
- Test on both desktop and mobile devices
- Consider users with motion sensitivity

#### Component Structure
```typescript
// Example component structure
import { useEffect, useRef } from "react";
import * as anime from "animejs"; // Use this import style

interface ComponentProps {
  // Define clear props with TypeScript
}

const AnimatedComponent = ({ ...props }: ComponentProps) => {
  const elementRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Animation logic here
    if (!elementRef.current) return;
    
    const animation = anime({
      targets: elementRef.current,
      // Animation properties
    });
    
    return () => animation.pause(); // Cleanup
  }, []);
  
  return (
    // JSX with proper ref and classes
  );
};

export default AnimatedComponent;

// Export code snippet for documentation
export const componentCode = `...`;
```

### Submitting Contributions

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-animation`
3. **Make your changes:** Follow the guidelines above
4. **Test thoroughly:** Ensure your changes work on different devices
5. **Commit your changes:** Use clear, descriptive commit messages
6. **Push to your fork:** `git push origin feature/amazing-animation`
7. **Create a Pull Request:** Describe your changes and why they're valuable

### Pull Request Guidelines

- Ensure your code follows the existing style and patterns
- Add or update documentation for new features
- Test your changes across different browsers and devices
- Make sure the build passes without errors
- Include screenshots or GIFs for visual changes
- Reference any related issues in your PR description

## 🐛 Reporting Issues

When reporting bugs or issues:

1. **Check existing issues** to avoid duplicates
2. **Provide a clear description** of the problem
3. **Include steps to reproduce** the issue
4. **Add browser/device information** if relevant
5. **Include screenshots or screen recordings** when helpful

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Anime.js](https://animejs.com/) for the amazing animation library
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful component system
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the icon library
- The React and open-source community for inspiration and tools

## 📞 Contact

- **GitHub Issues:** For bug reports and feature requests
- **Discussions:** For questions and community discussions
- **Email:** [your-email@example.com] for private inquiries

---

**Happy animating! 🎨✨**

*Made with ❤️ by the open-source community*
