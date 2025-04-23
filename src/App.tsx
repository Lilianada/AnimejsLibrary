import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Index from "./pages/Index"
import Examples from "./pages/Examples"
import Docs from "./pages/Docs"
import NotFound from "./pages/NotFound"
import * as React from "react"

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = React.useState(children);
  const [transitionStage, setTransitionStage] = React.useState("page-fade-enter");

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Initialize transition on mount
    setTransitionStage("page-fade-enter");

    // Trigger exit after a short delay to allow enter to complete
    timeoutId = setTimeout(() => {
      setTransitionStage("page-fade-exit");
    }, 300); // Wait for enter transition to complete

    const resetTransition = () => {
      setDisplayChildren(children);
      setTransitionStage("page-fade-enter");
      timeoutId = setTimeout(() => {
        setTransitionStage("page-fade-exit");
      }, 300); // Wait for enter transition to complete
    };

    return () => clearTimeout(timeoutId);

  }, [children]);

  return (
    <div className={`page-fade ${transitionStage}`}>
      {displayChildren}
    </div>
  );
}

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
    <TooltipProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <PageTransition><Index /></PageTransition>
          } />
          <Route path="/examples" element={
            <PageTransition><Examples /></PageTransition>
          } />
          <Route path="/docs" element={
            <PageTransition><Docs /></PageTransition>
          } />
          <Route path="*" element={
            <PageTransition><NotFound /></PageTransition>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
)

export default App
