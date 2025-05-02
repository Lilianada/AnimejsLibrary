
import { useState } from "react";
import MainContainer from "@/components/examples/MainContainer";
import Sidebar from "@/components/examples/Sidebar";
import Footer from "@/components/Footer";

const Examples = () => {
  const [selectedCategory, setSelectedCategory] = useState("buttons");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-1">
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <div className="flex-1 overflow-y-auto pb-16">
          <MainContainer category={selectedCategory} />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Examples;
