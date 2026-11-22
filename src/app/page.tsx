import { HeroBanner } from '../components/HeroBanner';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { AboutStore } from '../components/AboutStore';
import { Testimonials } from '../components/Testimonials';

export default function Home() {
  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-200">
      <HeroBanner />
      <FeaturedProducts />
      <AboutStore />
      <Testimonials />
    </div>
  );
}
