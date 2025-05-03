
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

// Import example pages
import ButtonsPage from "./pages/examples/ButtonsPage";
import CardsPage from "./pages/examples/CardsPage";
import FormsPage from "./pages/examples/FormsPage";
import LoadersPage from "./pages/examples/LoadersPage";
import ToastsPage from "./pages/examples/ToastsPage";
import DraggablePage from "./pages/examples/DraggablePage";
import AnimationsPage from "./pages/examples/AnimationsPage";

function PageTransition({ children }: { children: React.ReactNode }) {
  const [transitionClass, setTransitionClass] = React.useState("opacity-0");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionClass("opacity-100");
    }, 50);

    return () => clearTimeout(timer);
  }, [children]);

  return (
    <div className={`transition-opacity duration-300 ease-in-out ${transitionClass}`}>
      {children}
    </div>
  );
}

const AppLayout = () => {
  const location = useLocation();
  const isExamplePage = location.pathname.includes("/examples");
  const isDocsPage = location.pathname === "/docs";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-1 ${isDocsPage || isExamplePage ? "pt-16" : ""}`}>
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
            <Route path="examples" element={<Examples />}>
              <Route path="buttons" element={<ButtonsPage />} />
              <Route path="cards" element={<CardsPage />} />
              <Route path="forms" element={<FormsPage />} />
              <Route path="loaders" element={<LoadersPage />} />
              <Route path="toasts" element={<ToastsPage />} />
              <Route path="draggable" element={<DraggablePage />} />
              <Route path="animations" element={<AnimationsPage />} />
            </Route>
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
