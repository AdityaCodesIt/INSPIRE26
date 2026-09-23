import { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import PageBackground from './components/PageBackground';
import HeroSection from './components/HeroSection';
import InformationScrollSection from './components/InformationScrollSection';
import AboutSection from './components/AboutSection';
import WhoCanParticipateSection from './components/WhoCanParticipateSection';
import { SplashScreen } from './components/SplashScreen';
import SmoothScroll from './components/SmoothScroll';

const TracksSection = lazy(() => import('./components/TracksSection'));
const TimelineSection = lazy(() => import('./components/TimelineSection'));
const PrizePoolSection = lazy(() => import('./components/PrizePoolSection'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const Footer = lazy(() => import('./components/Footer'));
const CTASection = lazy(() => import('./components/CTASection'));

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <SmoothScroll>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      <div className={`min-h-screen flex flex-col relative font-sans selection:bg-theme-saffron/30 ${showSplash ? 'h-screen overflow-hidden' : ''}`}>
        <PageBackground />
        <Navbar />

        <main className="flex-grow">
          <HeroSection />
          <InformationScrollSection />
          <AboutSection />
          <WhoCanParticipateSection />
          
          <Suspense fallback={<div className="h-20 w-full flex items-center justify-center text-amber-900/50">Loading sections...</div>}>
            <TracksSection />
            <TimelineSection />
            <PrizePoolSection />
            <FAQSection />
            <Footer>
              <CTASection />
            </Footer>
          </Suspense>
        </main>
      </div>
    </SmoothScroll>
  );
}

export default App;
