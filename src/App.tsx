import Navbar from './components/Navbar';
import PageBackground from './components/PageBackground';
import HeroSection from './components/HeroSection';
import InstitutionSection from './components/InstitutionSection';
import AboutSection from './components/AboutSection';
import ThemesSection from './components/ThemesSection';
import TimelineSection from './components/TimelineSection';
import AwardsFAQSection from './components/AwardsFAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative font-sans selection:bg-theme-saffron/30">
      <PageBackground />
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <InstitutionSection />
        <AboutSection />
        <ThemesSection />
        <TimelineSection />
        <AwardsFAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
