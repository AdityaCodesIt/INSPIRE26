import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section 
      id="register" 
      className="relative py-24 overflow-hidden bg-cover bg-center border-t border-amber-950/40 text-white scroll-mt-[68px]"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(20, 15, 10, 0.35), rgba(5, 5, 5, 0.65)), url('/cta-college-bg.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Tactile Fine Grain Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 z-0"
        style={{
          backgroundImage: "url('/backgrounds/noise-texture.svg')",
          backgroundRepeat: 'repeat',
        }}
      />
      {/* Subtle Vignette for Depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/35 z-0" />

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">

        {/* Main Title */}
        <motion.div
          className="mb-6 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="font-sans text-lg md:text-xl font-medium text-amber-200/95 mb-2">Be a Part of</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            Vikas<br />
            <span className="bg-gradient-to-r from-amber-200 via-white to-amber-300 bg-clip-text text-transparent drop-shadow-md">
              Viksit Bharat
            </span>
          </h2>
        </motion.div>

        {/* Supporting Line */}
        <motion.p
          className="text-base md:text-lg font-sans font-medium text-amber-100/90 mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Present <span className="text-amber-300 mx-2 font-bold">|</span> Participate <span className="text-amber-300 mx-2 font-bold">|</span> Network <span className="text-amber-300 mx-2 font-bold">|</span> Build Together
        </motion.p>

        {/* Event Details Box */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6 p-4 px-8 mb-8 bg-black/30 backdrop-blur-md rounded-2xl border border-amber-400/30 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <p className="font-semibold text-white font-sans text-sm md:text-base">16–18 Jan 2026</p>
          </div>

          <div className="hidden sm:block w-2 h-2 rounded-full bg-amber-400"></div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <p className="font-semibold text-white font-sans text-sm md:text-base">Shree L.R. Tiwari College</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="#register-form"
          className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold z-20 shadow-2xl px-12 py-3.5 rounded-full text-base tracking-wide transition-all transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register Now <span className="ml-2 font-normal">→</span>
        </motion.a>
      </div>

    </section>
  );
};

export default CTASection;
