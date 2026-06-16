import TopNavBar from './components/layout/TopNavBar';
import Footer from './components/layout/Footer';
import HeroSection from './components/landing/HeroSection';
import FeaturesStrip from './components/landing/FeaturesStrip';
import AIFeatureSpotlight from './components/landing/AIFeatureSpotlight';
import MediLabSpotlight from './components/landing/MediLabSpotlight';
import PricingTeaser from './components/landing/PricingTeaser';

export default function Home() {
  return (
    <>
      <TopNavBar />
      <main>
        <HeroSection />
        <FeaturesStrip />
        <AIFeatureSpotlight />
        <MediLabSpotlight />
        <PricingTeaser />
      </main>
      <Footer />
    </>
  );
}
