
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"
import Index from "./pages/Index"
import Examples from "./pages/Examples"
import Docs from "./pages/Docs"
import NotFound from "./pages/NotFound"

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
)

export default App
