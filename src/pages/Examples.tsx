
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "@/components/examples/Sidebar";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const Examples = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Extract the current category from the pathname
  const pathParts = location.pathname.split("/");
  const currentCategory = pathParts[pathParts.length - 1] || "buttons";
  
  // If at /examples with no sub-route, redirect to /examples/buttons
  useEffect(() => {
    if (location.pathname === "/examples") {
      navigate("/examples/buttons");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-1">
        <Sidebar
          selectedCategory={currentCategory}
          onSelectCategory={(category) => navigate(`/examples/${category}`)}
        />
        <div className="flex-1 overflow-y-auto pb-16">
          <div className="mt-16 md:mt-0">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Examples;
