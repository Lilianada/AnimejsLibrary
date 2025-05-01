
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Examples from "./pages/Examples";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";
import * as React from "react";
import { Toaster } from "sonner";

// Import individual example pages
import ButtonExamples from "./components/examples/ButtonExamples";
import CardAnimations from "./components/examples/animations/cards/CardAnimations";
import LoaderShowcase from "./components/examples/LoaderShowcase";
import ToastsExamples from "./components/examples/ToastsExamples";
import DraggableExamples from "./components/examples/DraggableExamples";
import AnimationExamples from "./components/examples/AnimationExamples";
import FormsExamples from "./components/examples/FormsExamples";

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [transitionClass, setTransitionClass] = React.useState("opacity-0");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionClass("opacity-100");
    }, 50);

    return () => clearTimeout(timer);
  }, [children]);

  const isDocsPage = location.pathname === "/docs";

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${transitionClass} ${isDocsPage ? "pt-16" : ""}`}
    >
      {children}
    </div>
  );
}

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      {location.pathname === "/" && <Footer />}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Index />} />
            <Route path="examples" element={<Examples />} />
            <Route path="examples/buttons" element={<ButtonExamples />} />
            <Route path="examples/cards" element={<CardAnimations />} />
            <Route path="examples/forms" element={<FormsExamples />} />
            <Route path="examples/loaders" element={<LoaderShowcase />} />
            <Route path="examples/toasts" element={<ToastsExamples />} />
            <Route path="examples/draggable" element={<DraggableExamples />} />
            <Route path="examples/animations" element={<AnimationExamples />} />
            <Route path="docs" element={<Docs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster position="top-right" richColors closeButton />
      </TooltipProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
