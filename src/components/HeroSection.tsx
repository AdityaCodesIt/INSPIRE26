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
          <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase tracking-widest mb-6 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-800 bg-clip-text text-transparent drop-shadow-md" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
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

          <div className="flex flex-col items-start gap-4 mb-10 w-full sm:w-auto">
            <a href="#register" className="btn-primary flex items-center justify-center w-full sm:w-auto relative group px-8 py-3 bg-brand-navy rounded-md shadow-md border border-white/20">
              <span className="bg-gradient-to-b from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent font-bold text-lg tracking-wide group-hover:brightness-110 transition-all">
                Register Now
              </span>
              <span className="ml-2 text-brand-orange group-hover:text-orange-400 transition-colors">→</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md"></div>
            </a>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm font-semibold text-brand-navy mt-2">
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

          {/* Floating Images */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Image 1 */}
            <motion.div
              className="absolute top-[5%] left-[5%] w-24 md:w-36 rotate-[-6deg]"
              animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }}
            >
              <img src="/hero-img-1.jpeg" alt="Hero 1" className="w-full h-auto rounded-md" />
            </motion.div>

            {/* Image 2 */}
            <motion.div
              className="absolute top-[2%] right-[15%] w-24 md:w-32 rotate-[4deg]"
              animate={{ y: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity }}
            >
              <img src="/hero-img-2.jpeg" alt="Hero 2" className="w-full h-auto rounded-md" />
            </motion.div>

            {/* Image 3 */}
            <motion.div
              className="absolute top-[40%] left-[-5%] w-28 md:w-40 rotate-[-2deg]"
              animate={{ y: [-4, 6, -4] }} transition={{ duration: 4.5, repeat: Infinity }}
            >
              <img src="/hero-img-3.jpeg" alt="Hero 3" className="w-full h-auto rounded-md" />
            </motion.div>

            {/* Image 4 */}
            <motion.div
              className="absolute top-[45%] right-[-5%] w-24 md:w-36 rotate-[8deg]"
              animate={{ y: [6, -4, 6] }} transition={{ duration: 5.5, repeat: Infinity }}
            >
              <img src="/hero-img-4.jpeg" alt="Hero 4" className="w-full h-auto rounded-md" />
            </motion.div>

            {/* Image 5 */}
            <motion.div
              className="absolute bottom-[10%] left-[10%] w-20 md:w-32 rotate-[-8deg]"
              animate={{ y: [-6, 4, -6] }} transition={{ duration: 5, repeat: Infinity }}
            >
              <img src="/hero-img-5.jpeg" alt="Hero 5" className="w-full h-auto rounded-md" />
            </motion.div>

            {/* Image 6 */}
            <motion.div
              className="absolute bottom-[5%] right-[15%] w-28 md:w-40 rotate-[5deg]"
              animate={{ y: [4, -6, 4] }} transition={{ duration: 4.8, repeat: Infinity }}
            >
              <img src="/hero-img-6.jpeg" alt="Hero 6" className="w-full h-auto rounded-md" />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
