import { motion, useReducedMotion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import heritageCombinedImg from '../assets/heritage/heritage-combined-transparent.png';

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const lineX2 = useTransform(dragX, (x) => `calc(50% + ${x}px)`);
  const lineY2 = useTransform(dragY, (y) => `calc(30px + ${y}px)`);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    // Target date: 3 October 2026, 9:00 AM
    const targetDate = new Date('2026-10-03T09:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative w-full h-auto min-h-[calc(100vh-56px)] lg:h-[calc(100vh-56px)] lg:max-h-[calc(100vh-56px)] flex flex-col justify-between bg-[#F9E7B7] overflow-hidden">
      {/* Layer 1: Clean Paper Texture Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-[#F9E7B7] bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: "url('/hero-bg.png')",
        }}
      />

      {/* Layer 2: Indian Heritage Skyline Layer — Continuous bottom decorative layer with entrance animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full z-0 pointer-events-none overflow-hidden select-none"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
      >
        <img
          src={heritageCombinedImg}
          alt=""
          role="presentation"
          fetchPriority="high"
          decoding="async"
          className="w-full h-auto max-h-[160px] sm:max-h-[200px] md:max-h-[250px] lg:max-h-[280px] object-cover object-bottom translate-y-1 sm:translate-y-2 opacity-85"
        />
      </motion.div>

      {/* Layer 3: Foreground Hero Content */}
      <div className="relative z-10 w-[min(92%,1440px)] 2xl:w-[min(90%,1600px)] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 md:pt-10 pb-20 sm:pb-24 md:pb-28 lg:pb-24 flex-1 flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left max-w-5xl lg:max-w-6xl w-full mx-auto gap-10">

          {/* Left Column: Hero Content */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center md:items-start z-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-xs sm:text-sm md:text-base lg:text-lg font-extrabold uppercase tracking-widest mb-2 sm:mb-3 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 bg-clip-text text-transparent drop-shadow-sm"
            >
              IEEE SLRTCE presents
            </motion.div>

            <div className="relative inline-block mb-7 sm:mb-9 md:mb-11">
              <h1 className="relative m-0 p-0 flex flex-col items-center justify-center md:items-start">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-black text-brand-navy drop-shadow-xl leading-tight uppercase font-sans text-center md:text-left"
                >
                  INSPIRE
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-semibold text-brand-navy drop-shadow-xl leading-tight uppercase font-sans text-center md:text-left"
                >
                  Colloquium
                </motion.span>
              </h1>
            </div>

            <motion.h2
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-brand-navy mb-3 sm:mb-4 flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.3 }
                }
              }}
            >
              {[
                <span key="1">Ideas</span>,
                <span key="2" className="text-brand-orange text-lg">·</span>,
                <span key="3">Innovation</span>,
                <span key="4" className="text-brand-orange text-lg">·</span>,
                <span key="5">Inclusion</span>,
                <span key="6" className="text-brand-orange text-lg">·</span>,
                <span key="7" className="text-brand-navy font-bold">A Stronger Tomorrow</span>
              ].map((child) => (
                <motion.span
                  key={child.key}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                >
                  {child}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              className="text-xs sm:text-sm md:text-base lg:text-[1.05rem] text-text-dark max-w-2xl mb-5 sm:mb-6 leading-relaxed font-normal text-center md:text-left"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
            >
              A national platform for young minds and researchers to ideate,
              innovate and contribute towards a resilient, inclusive and
              technologically advanced Viksit Bharat.
            </motion.p>

            <div className="flex flex-col items-center md:items-start gap-4 mb-3 w-full">
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 w-full">
                {/* Registration Button: Light Orange Box, Blue Text */}
                <a href="#register" className="flex items-center justify-center w-full sm:w-auto relative group px-7 sm:px-9 py-2.5 sm:py-3.5 bg-orange-400 hover:bg-orange-300 rounded-md shadow-md border border-orange-400 transition-all">
                  <span className="text-brand-navy font-extrabold text-sm sm:text-base tracking-wide transition-all">
                    Register Now
                  </span>
                  <span className="ml-2 font-bold text-brand-navy transition-colors">→</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md"></div>
                </a>

                {/* Brochure Button: Blue Box, Light Orange Text */}
                <a href="#" className="flex items-center justify-center w-full sm:w-auto relative group px-7 sm:px-9 py-2.5 sm:py-3.5 bg-brand-navy hover:bg-blue-900 rounded-md shadow-sm border border-brand-navy transition-all hover:shadow-md">
                  <span className="text-orange-400 font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 group-hover:text-orange-300 transition-colors">
                    <svg className="w-4 h-4 text-orange-400 group-hover:text-orange-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Brochure
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md"></div>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-brand-navy mt-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg">📅</span>
                  <span>16–18 Jan 2026</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-base sm:text-lg">📍</span>
                  <a
                    href="https://www.google.com/maps/search/Shree+L.R.+Tiwari+College+of+Engineering"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-orange hover:underline transition-all"
                  >
                    SLR Tiwari, NM
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: ID Badge CSS Construction */}
          <motion.div
            className="w-full md:w-1/2 flex items-start justify-center z-10 mt-16 md:mt-0 relative h-full min-h-[400px] sm:min-h-[500px]"
            initial={{ opacity: 1, y: -800 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.35, delay: 3.5 }}
          >
            {/* Fixed Anchor Lanyard String */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
              <motion.line
                x1="50%"
                y1="-500"
                x2={lineX2}
                y2={lineY2}
                stroke="#0A2A5E"
                strokeWidth="14"
                strokeLinecap="round"
              />
            </svg>

            {/* The Badge Itself */}
            <motion.div
              className="relative w-[240px] sm:w-[280px] md:w-[320px] h-auto min-h-[360px] sm:min-h-[420px] md:min-h-[480px] bg-brand-navy rounded-2xl border-4 border-black shadow-2xl mt-[20px] md:mt-[30px] z-10 flex flex-col items-center p-3 sm:p-5 cursor-grab active:cursor-grabbing"
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0.6}
              dragTransition={{ bounceStiffness: 150, bounceDamping: 10 }}
              whileHover={{ scale: 1.02 }}
              whileDrag={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 150, damping: 12, mass: 1.5 }}
              style={{ x: dragX, y: dragY, transformStyle: "preserve-3d", perspective: "1000px" }}
            >

              {/* Lanyard Clip Hole / Attachment Point */}
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-12 sm:w-16 h-4 sm:h-5 bg-black rounded-full z-20 border-2 border-gray-700 shadow-md flex items-center justify-center">
                <div className="w-8 sm:w-10 h-1.5 sm:h-2 bg-gray-400 rounded-full" />
              </div>

              {/* Badge Inner Hole Cutout (Visual only) */}
              <div className="w-16 sm:w-20 h-2 sm:h-3 bg-[#F9E7B7] rounded-full border-2 border-black absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 opacity-0" />

              {/* Badge Content */}
              <div className="w-full h-full bg-white rounded-xl mt-6 flex flex-col items-center p-4 sm:p-5 relative border-2 border-gray-200">

                {/* Header inside badge */}
                <div className="w-full text-center pb-3 mb-3 sm:mb-4 border-b-2 border-brand-orange/30">
                  <h3 className="text-brand-navy font-black text-lg sm:text-xl uppercase tracking-widest leading-none">
                    INSPIRE
                  </h3>
                  <p className="text-brand-orange font-bold text-[0.65rem] sm:text-xs uppercase tracking-widest mt-1">
                    Colloquium 2026
                  </p>
                </div>

                {/* Participant Details */}
                <div className="text-center w-full flex-grow flex flex-col items-center mt-2">
                  <p className="text-gray-500 font-bold text-[0.65rem] sm:text-xs uppercase tracking-widest mb-1">
                    Participant
                  </p>
                  <h4 className="font-black text-brand-navy text-xl sm:text-2xl mb-3 truncate w-full uppercase">
                    Aditya Pandey
                  </h4>

                  <div className="bg-brand-navy/5 px-2 py-2 rounded-md border border-brand-navy/10 mb-4 w-full">
                    <p className="text-brand-orange font-bold text-[0.55rem] uppercase tracking-widest mb-0.5">
                      Team
                    </p>
                    <div className="flex flex-col items-center justify-center gap-1">
                      <h5 className="font-extrabold text-brand-navy text-sm sm:text-base uppercase flex items-center justify-center gap-1.5 leading-none">
                        TECH TITANS <span className="text-gray-500 font-bold text-[0.55rem] tracking-normal">(UG ONLY)</span>
                      </h5>
                      <p className="text-brand-navy/60 font-semibold text-[0.55rem] sm:text-[0.6rem] tracking-wide mt-0.5">
                        Ankush &bull; Divakar &bull; Member 4 &bull; Member 5 &bull; Member 6
                      </p>
                    </div>
                  </div>

                  {/* Timer Bar (Navbar Stamp Format) */}
                  <div className="w-[90%] drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)] mb-4 select-none mx-auto rounded-lg overflow-hidden">
                    <div className="rounded-lg flex flex-col justify-center bg-[#F8E7BE] px-3 sm:px-4 py-2 sm:py-2.5 w-full border border-black/5 select-none relative">

                      {/* Top Header Row */}
                      <div className="flex justify-between items-center w-full mb-1.5 z-10 gap-2 px-1">
                        <div className="text-[8px] sm:text-[9px] font-mono text-black/80 tracking-widest uppercase font-bold leading-none mt-px">
                          [ DEADLINE ]
                        </div>
                        <div className="flex items-center gap-1.5 ml-auto">
                          <motion.div
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-xs"
                          />
                          <span className="text-[8px] sm:text-[9px] font-mono text-red-600 tracking-widest font-bold leading-none mt-px">LIVE</span>
                        </div>
                      </div>

                      {/* Bottom Countdown Row */}
                      <div className="flex items-center justify-center z-10 w-full gap-1.5 sm:gap-2 mt-1">
                        <div className="flex flex-col items-center flex-1">
                          <span className="font-mono font-bold text-xl sm:text-2xl text-black leading-none tracking-widest">
                            {timeLeft.days.toString().padStart(2, '0')}
                          </span>
                          <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.1em] text-black/70 mt-1 uppercase leading-none">
                            DAYS
                          </span>
                        </div>
                        <span className="text-black/40 font-mono font-bold text-lg sm:text-xl mb-1 animate-pulse leading-none">:</span>

                        <div className="flex flex-col items-center flex-1">
                          <span className="font-mono font-bold text-xl sm:text-2xl text-black leading-none tracking-widest">
                            {timeLeft.hours.toString().padStart(2, '0')}
                          </span>
                          <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.1em] text-black/70 mt-1 uppercase leading-none">
                            HRS
                          </span>
                        </div>
                        <span className="text-black/40 font-mono font-bold text-lg sm:text-xl mb-1 animate-pulse leading-none">:</span>

                        <div className="flex flex-col items-center flex-1">
                          <span className="font-mono font-bold text-xl sm:text-2xl text-black leading-none tracking-widest">
                            {timeLeft.minutes.toString().padStart(2, '0')}
                          </span>
                          <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.1em] text-black/70 mt-1 uppercase leading-none">
                            MIN
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <a
                    href="#register"
                    className="w-[90%] py-1.5 bg-brand-navy hover:bg-brand-orange text-white text-[0.65rem] sm:text-xs font-bold uppercase tracking-widest rounded transition-colors mb-3 shadow-md flex items-center justify-center cursor-pointer pointer-events-auto"
                  >
                    Register Now
                  </a>

                  {/* Date at the bottom of the card */}
                  <div className="mt-auto w-full pt-1 border-t-2 border-brand-orange/20">
                    <div className="flex items-center justify-center gap-1.5 text-brand-navy font-bold text-[0.65rem] sm:text-[0.7rem] uppercase tracking-widest">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      October 3-4, 2026
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
