import { useState } from 'react';
import { motion } from 'framer-motion';

const sdgDetails: Record<number, { title: string; color: string }> = {
  1: { title: 'No Poverty', color: '#E5243B' },
  3: { title: 'Good Health & Well-being', color: '#4C9F38' },
  4: { title: 'Quality Education', color: '#C5192D' },
  5: { title: 'Gender Equality', color: '#FF3A21' },
  6: { title: 'Clean Water & Sanitation', color: '#26BDE2' },
  7: { title: 'Affordable & Clean Energy', color: '#FCC30B' },
  8: { title: 'Decent Work & Economic Growth', color: '#A21942' },
  9: { title: 'Industry, Innovation & Infrastructure', color: '#FD6925' },
  10: { title: 'Reduced Inequalities', color: '#DD1367' },
  11: { title: 'Sustainable Cities & Communities', color: '#FD9D24' },
  12: { title: 'Responsible Consumption & Production', color: '#BF8B2E' },
  13: { title: 'Climate Action', color: '#3F7E44' },
  16: { title: 'Peace, Justice & Strong Institutions', color: '#00689D' },
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

const trackRows = [
  {
    label: 'Tracks 01 – 03',
    sublabel: 'Core Computing, IoT & Health Sciences',
    items: themes.slice(0, 3), // Row 1
  },
  {
    label: 'Tracks 04 – 06',
    sublabel: 'Sustainable Systems, Security & Automation',
    items: themes.slice(3, 6), // Row 2
  },
  {
    label: 'Tracks 07 – 09',
    sublabel: 'FinTech, Web3 & Frontier Technologies',
    items: themes.slice(6, 9), // Row 3
  },
];

const ThemeStamp = ({
  theme,
  index,
  colIndex,
}: {
  theme: typeof themes[0];
  index: number;
  colIndex: number;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const rotation = index % 2 === 0 ? 1.5 : -1.5;

  return (
    <motion.div
      className="w-full max-w-[340px] sm:max-w-[360px] md:max-w-[370px] lg:max-w-[380px]"
      initial={{ opacity: 0, x: -140 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.75,
        delay: colIndex * 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="relative group cursor-pointer w-full perspective-1000 select-none"
        whileHover={{
          y: -6,
          rotate: 0,
          scale: 1.02,
          transition: { duration: 0.25 },
        }}
        style={{ rotate: rotation }}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsFlipped((prev) => !prev)}
        onFocus={() => setIsFlipped(true)}
        onBlur={() => setIsFlipped(false)}
        tabIndex={0}
        role="button"
        aria-label={`${theme.title} - UN SDGs: ${theme.sdgs.map((s) => 'SDG ' + s).join(', ')}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped((prev) => !prev);
          }
        }}
      >
        {/* 3D Flippable Box */}
        <div
          className="w-full h-[400px] sm:h-[420px] md:h-[430px] relative preserve-3d transition-transform duration-700 ease-out motion-reduce:transition-none motion-reduce:duration-0"
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="stamp-card w-full h-full flex flex-col !p-2 sm:!p-2.5 shadow-xl">
              <div className="flex-grow relative overflow-hidden flex flex-col bg-white rounded-[3px] border border-[#D8CFC0]">

                {/* Artwork / Image Area */}
                <div className={`${theme.color} w-full h-[70%] flex items-center justify-center relative overflow-hidden`}>
                  <img
                    src={theme.image}
                    alt={theme.title}
                    className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Tactile Texture overlay */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] opacity-20 mix-blend-overlay pointer-events-none z-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none z-20" />

                  {/* Track Index Badge */}
                  <div className="absolute top-2.5 left-2.5 z-30 bg-black/65 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-amber-300/40 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                    <span className="font-mono text-[0.7rem] font-bold text-amber-300 tracking-wider uppercase">
                      Track 0{index + 1}
                    </span>
                  </div>

                  {/* Flip Badge Indicator */}
                  <div className="absolute top-2.5 right-2.5 z-30 bg-[#0A2A5E]/85 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1 text-[0.68rem] text-white font-medium group-hover:bg-[#FF6B00] transition-colors">
                    <span>UN SDGs</span>
                    <span className="text-[0.8rem] leading-none">↻</span>
                  </div>

                  {/* Bottom Badges on Image */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 z-30 flex items-center justify-between text-white/90 text-[0.7rem] font-sans">
                    <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded text-[0.68rem] font-medium">
                      {theme.sdgs.length} Aligned SDGs
                    </span>
                    <span className="text-white/80 text-[0.65rem] italic">
                      Tap to view
                    </span>
                  </div>
                </div>

                {/* Lower Title Area */}
                <div className="h-[30%] bg-[#FCF9F2] flex flex-col justify-center px-4 py-3 border-t border-[#E8E1D5]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[0.65rem] sm:text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider">
                      Colloquium Track
                    </span>
                    <div className="flex items-center gap-1">
                      {theme.sdgs.map((sdg) => (
                        <span
                          key={sdg}
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: sdgDetails[sdg]?.color || '#0A2A5E' }}
                          title={`SDG ${sdg}: ${sdgDetails[sdg]?.title}`}
                        />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-bold text-brand-navy text-base sm:text-lg lg:text-[1.15rem] leading-tight font-sans">
                    {theme.title}
                  </h4>

                  <div className="mt-1.5 flex items-center text-[0.72rem] text-[#FF6B00] font-semibold">
                    <span>Hover or tap to view UN SDGs</span>
                    <span className="ml-1 text-sm">→</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* BACK SIDE (UN SDG Images) */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden rotate-y-180"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="stamp-card w-full h-full flex flex-col !p-2 sm:!p-2.5 shadow-xl">
              <div className="flex-grow relative overflow-hidden flex flex-col justify-between bg-[#FAF6EE] rounded-[3px] p-4 sm:p-5 border border-[#D8CFC0]">

                {/* Header */}
                <div className="pb-2.5 border-b border-[#E2D8C7] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tricolor-saffron inline-block shadow-xs" />
                    <span className="font-sans text-[0.72rem] sm:text-[0.78rem] font-bold text-[#0A2A5E] tracking-widest uppercase block">
                      UN SDG Alignment
                    </span>
                  </div>
                  <span className="font-mono text-[0.68rem] font-bold text-slate-500 bg-[#ECE5D8] px-2 py-0.5 rounded">
                    0{index + 1}
                  </span>
                </div>

                {/* Track Title banner */}
                <div className="py-1 text-center">
                  <h5 className="font-bold text-brand-navy text-sm sm:text-base font-sans">
                    {theme.title}
                  </h5>
                  <p className="text-[0.68rem] text-slate-600 font-sans mt-0.5">
                    Official United Nations Sustainable Development Goals
                  </p>
                </div>

                {/* Respective UN SDG Vector Images Grid */}
                <div className="flex-grow flex items-center justify-center py-1 sm:py-2">
                  {/* 2 SDGs */}
                  {theme.sdgs.length === 2 && (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[260px] place-items-center">
                      {theme.sdgs.map((sdg) => (
                        <div key={sdg} className="group/sdg flex flex-col items-center">
                          <img
                            src={`/sdg/sdg-${sdg}.svg`}
                            alt={`UN SDG ${sdg}: ${sdgDetails[sdg]?.title}`}
                            title={`SDG ${sdg}: ${sdgDetails[sdg]?.title}`}
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg shadow-md hover:scale-105 transition-transform duration-200 border border-black/10 bg-white"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 3 SDGs */}
                  {theme.sdgs.length === 3 && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full max-w-[290px] place-items-center">
                      {theme.sdgs.map((sdg) => (
                        <div key={sdg} className="group/sdg flex flex-col items-center">
                          <img
                            src={`/sdg/sdg-${sdg}.svg`}
                            alt={`UN SDG ${sdg}: ${sdgDetails[sdg]?.title}`}
                            title={`SDG ${sdg}: ${sdgDetails[sdg]?.title}`}
                            className="w-20 h-20 sm:w-22 sm:h-22 rounded-md shadow-md hover:scale-105 transition-transform duration-200 border border-black/10 bg-white"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 4 SDGs */}
                  {theme.sdgs.length === 4 && (
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-[210px] place-items-center">
                      {theme.sdgs.map((sdg) => (
                        <div key={sdg} className="group/sdg flex flex-col items-center">
                          <img
                            src={`/sdg/sdg-${sdg}.svg`}
                            alt={`UN SDG ${sdg}: ${sdgDetails[sdg]?.title}`}
                            title={`SDG ${sdg}: ${sdgDetails[sdg]?.title}`}
                            className="w-20 h-20 sm:w-22 sm:h-22 rounded-md shadow-md hover:scale-105 transition-transform duration-200 border border-black/10 bg-white"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 5 SDGs */}
                  {theme.sdgs.length >= 5 && (
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-[280px]">
                      {theme.sdgs.map((sdg) => (
                        <div key={sdg} className="group/sdg flex flex-col items-center">
                          <img
                            src={`/sdg/sdg-${sdg}.svg`}
                            alt={`UN SDG ${sdg}: ${sdgDetails[sdg]?.title}`}
                            title={`SDG ${sdg}: ${sdgDetails[sdg]?.title}`}
                            className="w-18 h-18 sm:w-20 sm:h-20 rounded-md shadow-md hover:scale-105 transition-transform duration-200 border border-black/10 bg-white"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="pt-2.5 border-t border-[#E2D8C7] flex items-center justify-between text-[0.68rem] text-slate-600 font-sans">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-tricolor-green inline-block" />
                    Viksit Bharat @2047
                  </span>
                  <span className="text-[#FF6B00] font-semibold flex items-center gap-1 hover:underline">
                    Flip back ↺
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

const TracksSection = () => {
  return (
    <section
      id="tracks"
      className="py-16 md:py-24 relative overflow-hidden bg-cover bg-center border-t border-b border-blue-950/40 text-white scroll-mt-[65px] w-full max-w-full"
      style={{
        backgroundImage: "url('/backgrounds/bg-cyan.jpg')",
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

      <div className="max-w-[1360px] w-full mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">Tracks</h2>
            <div className="w-16 h-[3px] bg-amber-400 rounded-full mb-3" />
            <p className="text-sm sm:text-base text-blue-100/80 font-sans">
              Explore multidisciplinary domains that drive innovation for a Viksit Bharat. Their are in total 9 Tracks.
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

        {/* Rows of Tracks: Balanced gap so only one row of 3 tracks is in view at a time */}
        <div className="flex flex-col gap-14 sm:gap-18 md:gap-22 lg:gap-28 w-full">
          {trackRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-col justify-center items-center w-full"
            >
              {/* Row Header Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between w-full max-w-[1240px] mb-6 sm:mb-7 pb-2.5 border-b border-white/20"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-amber-300 bg-black/45 px-3 py-1 rounded border border-amber-300/35 uppercase tracking-wider">
                    {row.label}
                  </span>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white/95 font-sans">
                    {row.sublabel}
                  </h3>
                </div>
                
              </motion.div>

              {/* 3 Tracks in this Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 lg:gap-10 xl:gap-12 w-full max-w-[1240px] place-items-center">
                {row.items.map((theme, colIndex) => (
                  <ThemeStamp
                    key={theme.id}
                    theme={theme}
                    index={rowIndex * 3 + colIndex}
                    colIndex={colIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TracksSection;
