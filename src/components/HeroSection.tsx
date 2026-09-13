import { motion, useReducedMotion } from 'framer-motion';
import heritageCombinedImg from '../assets/heritage/heritage-combined-transparent.png';

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative w-full h-auto min-h-[calc(100vh-56px)] lg:h-[calc(100vh-56px)] lg:max-h-[calc(100vh-56px)] flex flex-col justify-between bg-[#F9E7B7] overflow-hidden">
      {/* Layer 1: Clean Cream Paper Texture Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-[#F9E7B7] bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: "url('/paper-texture-clean.jpg')",
        }}
      />

      {/* Layer 1.5: Side Heritage Buildings (Watermark effect) */}
      <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden opacity-40 mix-blend-multiply">
        {/* Left Side Background Buildings */}
        <img
          src={heritageCombinedImg}
          alt=""
          className="absolute -left-[40%] md:-left-[20%] lg:-left-[10%] top-[15%] h-[60%] lg:h-[80%] w-auto object-cover opacity-60"
        />
        {/* Right Side Background Buildings (flipped) */}
        <img
          src={heritageCombinedImg}
          alt=""
          className="absolute -right-[40%] md:-right-[20%] lg:-right-[10%] top-[25%] h-[50%] lg:h-[70%] w-auto object-cover opacity-60 -scale-x-100"
        />
      </div>

      {/* Layer 2: Indian Heritage Skyline Layer — Continuous bottom decorative layer with entrance animation */}
      <motion.div
        className="absolute bottom-0 left-0 w-full pointer-events-none z-[5] leading-none select-none flex items-end"
        initial={shouldReduceMotion ? false : { y: '34%' }}
        animate={{ y: '0%' }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
              duration: 1.9,
              ease: [0.16, 1, 0.3, 1], // Smooth, premium ease-out curve
            }
        }
      >
        <img
          src={heritageCombinedImg}
          alt="Indian Heritage Skyline"
          className="w-full h-auto block select-none"
        />
      </motion.div>

      {/* Layer 3: Foreground Hero Content */}
      <div className="relative z-10 w-[min(92%,1440px)] 2xl:w-[min(90%,1600px)] mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 md:pt-6 pb-20 sm:pb-24 md:pb-28 lg:pb-32 flex-1 flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 xl:gap-14 w-full">

          {/* Left Content */}
          <motion.div
            className="w-full lg:w-[48%] xl:w-[48%] flex flex-col items-start z-10"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-extrabold uppercase tracking-widest mb-1.5 sm:mb-2 md:mb-3 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 bg-clip-text text-transparent drop-shadow-sm">
              IEEE Colloquium 2026
            </div>

            <h1 className="flex flex-col items-start mb-3 sm:mb-5">
              <span className="sr-only">VIKAS</span>
              <img 
                src="/vikas-logo-transparent.png" 
                alt="VIKAS" 
                className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-[8.5rem] 2xl:h-[10rem] object-contain drop-shadow-md mb-2 sm:mb-3" 
              />
            </h1>

            {/* Tricolor Accent Line */}
            <div className="flex h-1 sm:h-1.5 w-40 sm:w-56 mb-2.5 sm:mb-3.5 rounded-full overflow-hidden">
              <div className="bg-tricolor-saffron flex-1"></div>
              <div className="bg-tricolor-white flex-1"></div>
              <div className="bg-tricolor-green flex-1"></div>
            </div>

            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-brand-navy mb-2.5 sm:mb-3.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span>Ideas</span> <span className="text-brand-orange text-lg">·</span>
              <span>Innovation</span> <span className="text-brand-orange text-lg">·</span>
              <span>Inclusion</span> <span className="text-brand-orange text-lg">·</span>
              <span className="text-brand-navy font-bold">A Stronger Tomorrow</span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base lg:text-[0.95rem] xl:text-[1.05rem] text-text-dark max-w-lg xl:max-w-xl mb-3.5 sm:mb-4 lg:mb-5 leading-relaxed font-normal">
              A national platform for young minds and researchers to ideate,
              innovate and contribute towards a resilient, inclusive and
              technologically advanced Viksit Bharat.
            </p>

            <div className="flex flex-col items-start gap-3 sm:gap-4 mb-2 sm:mb-4 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full">
                <a href="#register" className="btn-primary flex items-center justify-center w-full sm:w-auto relative group px-6 sm:px-8 py-2.5 sm:py-3 bg-brand-navy rounded-md shadow-md border border-white/20 hover:shadow-lg transition-all">
                  <span className="bg-gradient-to-b from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent font-bold text-sm sm:text-base tracking-wide group-hover:brightness-110 transition-all">
                    Register Now
                  </span>
                  <span className="ml-2 text-brand-orange group-hover:text-orange-400 transition-colors">→</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md"></div>
                </a>
                
                <a href="#" className="flex items-center justify-center w-full sm:w-auto relative group px-6 sm:px-8 py-2.5 sm:py-3 bg-white/40 backdrop-blur-sm rounded-md shadow-sm border border-brand-navy/20 hover:bg-white/70 transition-all hover:shadow-md">
                  <span className="text-brand-navy font-bold text-sm sm:text-base tracking-wide flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Brochure
                  </span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 text-xs sm:text-sm font-semibold text-brand-navy mt-0.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg">📅</span>
                  <span>16–18 Jan 2026</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg">📍</span>
                  <span>SLR Tiwari, NM</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Map Illustration & Stamps */}
          <motion.div
            className="lg:w-[55%] relative h-[500px] md:h-[600px] w-full flex justify-center items-center z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            {/* Central India Map Illustration */}
            <div className="w-[95%] h-[95%] bg-[url('/hero-map.png')] bg-contain bg-center bg-no-repeat mix-blend-multiply z-10"></div>

            {/* Floating Images */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Image 1 - Space */}
              <motion.div
                className="absolute top-[5%] left-[5%] w-24 md:w-36 rotate-[-6deg]"
                animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }}
              >
                <img src="/hero-badge-1.png" alt="Viksit Bharat Space" className="w-full h-auto drop-shadow-lg" />
              </motion.div>

              {/* Image 2 - 5G/6G */}
              <motion.div
                className="absolute top-[2%] right-[15%] w-24 md:w-32 rotate-[4deg]"
                animate={{ y: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity }}
              >
                <img src="/hero-badge-2.png" alt="Digital Communications" className="w-full h-auto drop-shadow-lg" />
              </motion.div>

              {/* Image 3 - Semiconductors (Middle Left) */}
              <motion.div
                className="absolute top-[42%] left-[-2%] w-28 md:w-36 lg:w-40 rotate-[-2deg]"
                animate={{ y: [-4, 6, -4] }} transition={{ duration: 4.5, repeat: Infinity }}
              >
                <img src="/hero-badge-3.png" alt="Semiconductors" className="w-full h-auto drop-shadow-lg" />
              </motion.div>

              {/* Image 4 - UPI (Middle Right) */}
              <motion.div
                className="absolute top-[35%] right-[-8%] sm:right-[-5%] w-28 md:w-36 lg:w-40 rotate-[8deg]"
                animate={{ y: [6, -4, 6] }} transition={{ duration: 5.5, repeat: Infinity }}
              >
                <img src="/hero-badge-4.png" alt="UPI Payments" className="w-full h-auto drop-shadow-lg" />
              </motion.div>

              {/* Image 5 - Biotechnology */}
              <motion.div
                className="absolute bottom-[10%] left-[10%] w-20 md:w-32 rotate-[-8deg]"
                animate={{ y: [-6, 4, -6] }} transition={{ duration: 5, repeat: Infinity }}
              >
                <img src="/hero-badge-5.png" alt="Biotechnology" className="w-full h-auto drop-shadow-lg" />
              </motion.div>

              {/* Image 6 - Logistics & Transport */}
              <motion.div
                className="absolute bottom-[5%] right-[15%] w-28 md:w-40 rotate-[5deg]"
                animate={{ y: [4, -6, 4] }} transition={{ duration: 4.8, repeat: Infinity }}
              >
                <img src="/hero-badge-6.png" alt="Logistics & Transport" className="w-full h-auto drop-shadow-lg" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
