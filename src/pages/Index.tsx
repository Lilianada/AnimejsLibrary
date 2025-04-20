
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Examples from '@/components/Examples';
import Sponsors from '@/components/Sponsors';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Examples />
      <Sponsors />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
