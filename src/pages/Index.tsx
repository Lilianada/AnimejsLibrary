
import Hero from "@/components/Hero";
import Examples from "@/components/Examples";
import Sponsors from "@/components/Sponsors";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  return (
    <div className="max-w-full overflow-x-hidden">
      <Hero />
      <Examples />
      <Sponsors />
      <Newsletter />
    </div>
  );
};

export default Index;
