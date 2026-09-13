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

      {/* Subtle Warm Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/30 z-0" />

      <div 
        className="max-w-[1200px] mx-auto rounded-xl ticket-border p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center shadow-2xl border border-white/40 relative z-10 bg-[#4169E1]"
      >

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
                <p className="font-bold text-[#4169E1] text-sm">IDEAS TODAY</p>
                <p className="font-bold text-[#4169E1] text-[0.65rem] tracking-wider mt-0.5">A BRIGHTER BHARAT TOMORROW</p>
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
          <h2 className="text-3xl md:text-4xl font-semibold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] mb-6">About the IEEE Colloquium</h2>

          <p className="text-base text-cyan-50 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] leading-relaxed mb-10">
            The <strong className="font-semibold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">IEEE Colloquium 2026 — "Vikas Viksit Bharat"</strong> brings together U.G., P.G. students, research scholars, faculty, industry experts and thought leaders to present ideas, showcase innovations and deliberate on future technologies towards an empowered, inclusive and sustainable India. Hosted by Shree L. R. Tiwari College of Engineering, Navi Mumbai.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                value: "500+", 
                label: "Participants", 
                icon: (
                  <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) 
              },
              { 
                value: "20+", 
                label: "Technical Tracks", 
                icon: (
                  <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ) 
              },
              { 
                value: "8", 
                label: "Plenary Talks", 
                icon: (
                  <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ) 
              },
              { 
                value: "Nationwide", 
                label: "Collaboration", 
                icon: (
                  <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ) 
              }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
              >
                <div className="text-3xl mb-3 text-cyan-300 drop-shadow-[0_0_12px_rgba(103,232,249,0.9)]">{stat.icon}</div>
                <div className="number !text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">{stat.value}</div>
                <div className="label !text-cyan-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
