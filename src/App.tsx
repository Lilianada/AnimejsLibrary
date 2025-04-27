
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

  // Determine if this is the Docs page
  const isDocsPage = location.pathname === "/docs";

  return (
    <div className={`page-fade ${transitionStage} ${isDocsPage ? "pt-16" : ""}`}>
      {displayChildren}
    </div>
  );
}

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
    <TooltipProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
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
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
)

export default App
