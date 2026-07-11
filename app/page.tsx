import TopNavBar from './components/layout/TopNavBar';
import Footer from './components/layout/Footer';
import HeroSection from './components/landing/HeroSection';
import FeaturesStrip from './components/landing/FeaturesStrip';
import AIFeatureSpotlight from './components/landing/AIFeatureSpotlight';
import MediLabSpotlight from './components/landing/MediLabSpotlight';
import PricingSection from './components/landing/PricingSection';
import MarqueeSection from './components/landing/MarqueeSection';
import './components/landing/landing.css';

export default function Home() {
  return (
    <div className="landing-page">
      <TopNavBar />
      <main>
        <HeroSection />
        <FeaturesStrip />
        <AIFeatureSpotlight />
        <MediLabSpotlight />
        <PricingSection />
        <MarqueeSection />
      </main>
      <Footer />
    </div>
  );
}
