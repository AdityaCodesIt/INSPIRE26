import { useState } from 'react';
import { motion } from 'framer-motion';

const sdgColors: Record<number, string> = {
  1: '#E5243B',
  3: '#4C9F38',
  4: '#C5192D',
  5: '#FF3A21',
  6: '#26BDE2',
  7: '#FCC30B',
  8: '#A21942',
  9: '#FD6925',
  10: '#DD1367',
  11: '#FD9D24',
  12: '#BF8B2E',
  13: '#3F7E44',
  16: '#00689D',
};

const themes = [
  { id: 'ai', title: 'AI / ML', image: '/themes/ai_ml.jpg', color: 'bg-[#1E3A8A]', sdgs: [4, 8, 9, 10] },
  { id: 'iot', title: 'IoT', image: '/themes/iot.jpg', color: 'bg-[#0F172A]', sdgs: [9, 11, 12] },
  { id: 'health', title: 'Healthcare & MedTech', image: '/themes/health.jpg', color: 'bg-[#9F1239]', sdgs: [3, 5, 10] },
  { id: 'sus', title: 'Sustainability', image: '/themes/sustainability.jpg', color: 'bg-tricolor-green', sdgs: [6, 7, 11, 12, 13] },
  { id: 'cyber', title: 'Cybersecurity', image: '/themes/cybersecurity.jpg', color: 'bg-[#1E40AF]', sdgs: [9, 16] },
  { id: 'auto', title: 'Automation', image: '/themes/automation.jpg', color: 'bg-brand-orange', sdgs: [8, 9, 12] },
  { id: 'fintech', title: 'FinTech', image: '/themes/fintech.jpg', color: 'bg-[#D97706]', sdgs: [1, 8, 9, 10] },
  { id: 'block', title: 'Blockchain', image: '/themes/blockchain.jpg', color: 'bg-[#2563EB]', sdgs: [9, 16] },
  { id: 'emerge', title: 'Emerging Technologies', image: '/themes/emerging.jpg', color: 'bg-[#5B21B6]', sdgs: [4, 8, 9, 11] },
];

const ThemeStamp = ({ theme, index }: { theme: typeof themes[0], index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const rotation = index % 2 === 0 ? 3 : -3;

  return (
    <motion.div
      className="relative group cursor-pointer w-[140px] sm:w-[155px] md:w-[160px] lg:w-[175px] justify-self-center perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{
        y: -4,
        rotate: 0,
        scale: 1.05,
        boxShadow: "4px 4px 12px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 }
      }}
      style={{ rotate: rotation }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(prev => !prev)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      tabIndex={0}
      role="button"
      aria-label={`${theme.title} - UN SDGs: ${theme.sdgs.map(s => 'SDG ' + s).join(', ')}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(prev => !prev);
        }
      }}
    >
      {/* 3D Flippable Box */}
      <div
        className="w-full h-[155px] sm:h-[170px] md:h-[175px] lg:h-[190px] relative preserve-3d transition-transform duration-600 ease-out motion-reduce:transition-none motion-reduce:duration-0"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="stamp-card w-full h-full flex flex-col !p-1.5">
            <div className="flex-grow relative overflow-hidden flex flex-col bg-white rounded-[2px]">

              {/* Inner Image/Visual area */}
              <div className={`${theme.color} w-full h-[66%] flex items-center justify-center relative overflow-hidden`}>
                {/* Visual Image */}
                <img
                  src={theme.image}
                  alt={theme.title}
                  className="w-full h-full object-cover relative z-10 transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Texture overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] opacity-20 mix-blend-overlay pointer-events-none z-20"></div>
              </div>

              {/* Title area */}
              <div className="h-[34%] bg-bg-cream flex items-center justify-center text-center p-1.5">
                <h4 className="font-semibold text-brand-navy text-[0.75rem] sm:text-[0.8rem] lg:text-[0.85rem] leading-tight font-sans">{theme.title}</h4>
              </div>

            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="stamp-card w-full h-full flex flex-col !p-1.5">
            <div className="flex-grow relative overflow-hidden flex flex-col justify-between bg-bg-cream rounded-[2px] p-2.5 sm:p-3 border border-[#E5E0D8]">

              {/* Header */}
              <div className="text-center pb-1.5 border-b border-stamp-border/30">
                <span className="font-sans text-[0.6rem] sm:text-[0.65rem] font-bold text-text-muted tracking-widest uppercase block">
                  UN SDG Alignment
                </span>
              </div>

              {/* SDG Badges Container - ONLY SDG Numbers */}
              <div className="flex-grow flex items-center justify-center py-2">
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-[150px]">
                  {theme.sdgs.map((sdg) => (
                    <span
                      key={sdg}
                      className="inline-flex items-center justify-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[3px] text-white font-bold text-[0.65rem] sm:text-[0.72rem] tracking-wide shadow-xs"
                      style={{ backgroundColor: sdgColors[sdg] || '#1E3A8A' }}
                    >
                      SDG {sdg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Track Name */}
              <div className="pt-1.5 border-t border-stamp-border/30 text-center flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tricolor-saffron inline-block"></span>
                <span className="font-semibold text-brand-navy text-[0.65rem] sm:text-[0.72rem] truncate font-sans">
                  {theme.title}
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const ThemesSection = () => {
  return (
    <section
      id="themes"
      className="py-24 relative overflow-hidden bg-cover bg-center border-t border-b border-blue-950/40 text-white"
      style={{
        backgroundImage: "url('/backgrounds/bg-blue.jpg')",
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
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/30 z-0" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">Themes & Tracks</h2>
            <div className="w-16 h-[3px] bg-amber-400 rounded-full mb-3"></div>
            <p className="text-sm text-blue-100/75 font-sans">
              Explore multidisciplinary domains that drive innovation for a Viksit Bharat.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex flex-col items-end"
          >
            <span className="font-handwriting text-2xl text-amber-300 transform -rotate-3 mb-0">Explore. Build.</span>
            <span className="font-handwriting text-3xl text-orange-400 transform -rotate-2">Make an Impact.</span>
          </motion.div>
        </div>

        {/* Stamps Grid - 5 cards top, 4 cards bottom */}
        <div className="flex flex-col gap-10 lg:gap-14 items-center">
          {/* Row 1 */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 w-full place-items-center">
            {themes.slice(0, 5).map((theme, index) => (
              <ThemeStamp key={theme.id} theme={theme} index={index} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 w-full max-w-[960px] place-items-center relative">
            {themes.slice(5).map((theme, index) => (
              <ThemeStamp key={theme.id} theme={theme} index={index + 5} />
            ))}

            {/* Call to action stamp placeholder (Handwritten aside) */}
            <motion.div
              className="hidden xl:block absolute left-[calc(100%+28px)] top-4 transform rotate-6 pointer-events-none select-none"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="font-handwriting text-2xl text-amber-300 opacity-90 leading-tight">
                Ideas<br />that build<br />a better<br />tomorrow <span className="text-brand-orange text-3xl ml-1">↗</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThemesSection;
