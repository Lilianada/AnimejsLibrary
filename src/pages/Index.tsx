
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="max-w-full overflow-x-hidden">
      <div className="h-screen flex flex-col">
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
