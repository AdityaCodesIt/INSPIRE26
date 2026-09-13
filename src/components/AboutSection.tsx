import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="relative z-10 w-full max-w-full min-h-[calc(100vh-65px)] flex items-center justify-center py-10 md:py-16 px-4 sm:px-6 md:px-12 bg-cover bg-center overflow-hidden border-t border-b border-amber-950/20 scroll-mt-[65px]"
      style={{
        backgroundImage: "url('/backgrounds/bg-gold.jpg')",
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
      {/* Subtle Warm Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/30 z-0" />

      <div className="w-full max-w-[1400px] mx-auto stamp-card p-6 sm:p-10 md:p-14 flex flex-col md:flex-row gap-8 md:gap-14 items-center bg-[#FCF9F2]/95 backdrop-blur-md shadow-2xl border border-white/40 relative z-10">

        {/* Left: Stamp Card Image */}
        <motion.div
          className="w-full md:w-[40%] flex justify-center"
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="stamp-card w-full max-w-sm rotate-[-3deg]">
            <div className="p-1 pb-4">
              {/* College Image */}
              <div className="aspect-[4/3] bg-[url('/college-photo.jpg')] bg-cover bg-center rounded-sm"></div>
              <div className="pt-4 text-center">
                <p className="font-bold text-brand-navy text-sm">IDEAS TODAY</p>
                <p className="font-bold text-brand-navy text-[0.65rem] tracking-wider mt-0.5">A BRIGHTER BHARAT TOMORROW</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Text and Stats */}
        <motion.div
          className="w-full md:w-[60%] flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-navy mb-6">About the IEEE Colloquium</h2>

          <p className="text-base text-text-dark leading-relaxed mb-10">
            The <strong className="font-semibold text-brand-navy">IEEE Colloquium 2026 — "Vikas Viksit Bharat"</strong> brings together U.G., P.G. students, research scholars, faculty, industry experts and thought leaders to present ideas, showcase innovations and deliberate on future technologies towards an empowered, inclusive and sustainable India. Hosted by Shree L. R. Tiwari College of Engineering, Navi Mumbai.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "500+", label: "Participants", icon: "👥" },
              { value: "20+", label: "Technical Tracks", icon: "🔬" },
              { value: "8", label: "Plenary Talks", icon: "🎤" },
              { value: "Nationwide", label: "Collaboration", icon: "🌐" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
              >
                <div className="text-3xl mb-3 text-brand-navy">{stat.icon}</div>
                <div className="number">{stat.value}</div>
                <div className="label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
