import { useState } from 'react';
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
import { SplashScreen } from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      <div className={`min-h-screen flex flex-col relative font-sans selection:bg-theme-saffron/30 ${showSplash ? 'h-screen overflow-hidden' : ''}`}>
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
          <Footer>
            <CTASection />
          </Footer>
        </main>
      </div>
    </>
  );
}

export default App;
