import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section id="home" className="relative w-full h-auto min-h-[calc(100vh-56px)] lg:h-[calc(100vh-56px)] lg:max-h-[calc(100vh-56px)] flex flex-col justify-between bg-[#F9E7B7] overflow-hidden">
      {/* Layer 1: Clean Cream Paper Texture Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 bg-[#F9E7B7] bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: "url('/paper-texture-clean.jpg')",
        }}
      />

      {/* Layer 2: Indian Heritage Skyline Layer — Continuous bottom decorative layer preserving aspect ratio */}
      <div 
        className="absolute bottom-0 left-0 w-full pointer-events-none z-[5] overflow-hidden leading-none select-none flex items-end"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
        }}
      >
        <img
          src="/heritage-skyline-clean.png"
          alt="Indian Heritage Skyline"
          className="w-full h-auto block select-none"
        />
      </div>

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

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.5rem] 2xl:text-[4.5rem] leading-[1.08] font-display font-bold text-brand-navy mb-2 sm:mb-3">
              Vikas<br />Viksit Bharat
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
              <a href="#register" className="btn-primary flex items-center justify-center w-full sm:w-auto relative group px-6 sm:px-8 py-2.5 sm:py-3 bg-brand-navy rounded-md shadow-md border border-white/20">
                <span className="bg-gradient-to-b from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent font-bold text-sm sm:text-base tracking-wide group-hover:brightness-110 transition-all">
                  Register Now
                </span>
                <span className="ml-2 text-brand-orange group-hover:text-orange-400 transition-colors">→</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md"></div>
              </a>

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

          {/* Right Content - India / Vikas Bharat Artwork */}
          <motion.div
            className="w-full lg:w-[48%] xl:w-[50%] relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[clamp(340px,46vh,480px)] xl:h-[clamp(380px,50vh,560px)] 2xl:h-[clamp(440px,54vh,640px)] flex justify-center items-center z-10 my-2 lg:my-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            {/* Central India Map Illustration - Prominent and Large */}
            <div className="w-full h-full max-w-[420px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[580px] xl:max-w-[650px] 2xl:max-w-[720px] bg-[url('/india-map-new.png')] bg-contain bg-center bg-no-repeat mix-blend-multiply z-10"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
