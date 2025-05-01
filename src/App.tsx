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
  const location = useLocation(); // Can use useLocation here as it's inside BrowserRouter

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        {" "}
        {/* Add padding top for fixed Navbar */}
        {/* Outlet renders the matched route component */}
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      {/* Conditionally render Footer */}
      {location.pathname === "/" && <Footer />}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    {" "}
    {/* Router context starts here */}
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        {/* Routes define the page structure */}
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {" "}
            {/* Layout route */}
            {/* Nested routes render inside AppLayout's Outlet */}
            <Route index element={<Index />} />
            <Route path="examples" element={<Examples />} />
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
