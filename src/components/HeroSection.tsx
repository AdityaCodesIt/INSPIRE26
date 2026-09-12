import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section id="home" className="relative pt-32 md:pt-40 pb-16 px-6 md:px-12 max-w-[1440px] mx-auto overflow-hidden">



      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Content */}
        <motion.div
          className="lg:w-[45%] flex flex-col items-start z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-brand-navy text-white text-xs font-bold px-4 py-1.5 rounded-sm uppercase tracking-wider mb-6">
            IEEE Colloquium 2026
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-[5rem] leading-[1.1] font-display font-bold text-brand-navy mb-2">
            Vikas<br />Viksit Bharat
          </h1>

          {/* Tricolor Accent Line */}
          <div className="flex h-1.5 w-64 mb-6 rounded-full overflow-hidden">
            <div className="bg-tricolor-saffron flex-1"></div>
            <div className="bg-tricolor-white flex-1"></div>
            <div className="bg-tricolor-green flex-1"></div>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold text-brand-navy mb-4 flex flex-wrap gap-x-2">
            <span>Ideas</span> <span className="text-brand-orange text-lg">·</span>
            <span>Innovation</span> <span className="text-brand-orange text-lg">·</span>
            <span>Inclusion</span> <span className="text-brand-orange text-lg">·</span>
            <span className="text-brand-navy font-bold">A Stronger Tomorrow</span>
          </h2>

          <p className="text-base text-text-dark max-w-xl mb-8 leading-relaxed">
            A national platform for young minds and researchers to ideate,
            innovate and contribute towards a resilient, inclusive and
            technologically advanced Viksit Bharat.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 w-full sm:w-auto">
            <a href="#register" className="btn-primary flex items-center justify-center w-full sm:w-auto">
              Register Now <span className="ml-2">→</span>
            </a>

            <div className="flex items-center gap-4 text-sm font-semibold text-brand-navy">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span>16–18 Jan 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📍</span>
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
          <div className="w-[95%] h-[95%] bg-[url('/india-map-new.png')] bg-contain bg-center bg-no-repeat mix-blend-multiply z-10"></div>

          {/* Floating Stamp Cards */}
          <div className="absolute inset-0">
            {/* Stamp 1 */}
            <motion.div
              className="stamp-card absolute top-[10%] left-[10%] w-32 rotate-[-5deg]"
              animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-full h-16 bg-tricolor-green/20 mb-2 flex items-center justify-center text-2xl">🌱</div>
              <p className="text-[0.6rem] font-bold text-center leading-tight text-brand-navy">CLEAN INDIA<br />GREENER TOMORROW</p>
            </motion.div>

            {/* Stamp 2 */}
            <motion.div
              className="stamp-card absolute top-[5%] right-[20%] w-36 rotate-[4deg]"
              animate={{ y: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity }}
            >
              <div className="w-full h-16 bg-brand-navy/10 mb-2 flex items-center justify-center text-2xl">🤝</div>
              <p className="text-[0.6rem] font-bold text-center leading-tight text-brand-navy">A BRIGHTER<br />TOMORROW TOGETHER</p>
            </motion.div>

            {/* Stamp 3 */}
            <motion.div
              className="stamp-card absolute bottom-[20%] left-[5%] w-32 rotate-[-3deg]"
              animate={{ y: [-4, 6, -4] }} transition={{ duration: 4.5, repeat: Infinity }}
            >
              <div className="w-full h-16 bg-brand-orange/10 mb-2 flex items-center justify-center text-2xl">🚀</div>
              <p className="text-[0.6rem] font-bold text-center leading-tight text-brand-navy">INNOVATION<br />DRIVES PROGRESS</p>
            </motion.div>

            {/* Stamp 4 */}
            <motion.div
              className="stamp-card absolute bottom-[10%] right-[15%] w-36 rotate-[6deg]"
              animate={{ y: [6, -4, 6] }} transition={{ duration: 5.5, repeat: Infinity }}
            >
              <div className="w-full h-16 bg-tricolor-saffron/10 mb-2 flex items-center justify-center text-2xl">🏙️</div>
              <p className="text-[0.6rem] font-bold text-center leading-tight text-brand-navy">INFRASTRUCTURE<br />BUILDS OPPORTUNITIES</p>
            </motion.div>

            {/* Handwritten annotation */}
            <div className="absolute top-[30%] left-0 font-handwriting text-2xl text-brand-orange transform -rotate-[15deg] opacity-90 max-w-[150px]">
              Ideas for a Stronger Tomorrow
            </div>

            <div className="absolute bottom-[30%] right-[-5%] font-handwriting text-2xl text-brand-navy transform rotate-[10deg] opacity-90 max-w-[150px]">
              Research Innovation Impact
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
