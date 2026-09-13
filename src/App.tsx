import Navbar from './components/Navbar';
import PageBackground from './components/PageBackground';
import HeroSection from './components/HeroSection';
import InformationScrollSection from './components/InformationScrollSection';
import AboutSection from './components/AboutSection';
import WhoCanParticipateSection from './components/WhoCanParticipateSection';
import TracksSection from './components/TracksSection';
import TimelineSection from './components/TimelineSection';
import PrizePoolSection from './components/PrizePoolSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative font-sans selection:bg-theme-saffron/30">
      <PageBackground />
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <InformationScrollSection />
        <AboutSection />
        <WhoCanParticipateSection />
        <TracksSection />
        <TimelineSection />
        <PrizePoolSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
