import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import heritageCombinedImg from '../assets/heritage/heritage-combined-transparent.png';

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

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
        <div className="flex flex-col items-center justify-center text-center max-w-4xl lg:max-w-5xl w-full mx-auto">

          {/* Centered Hero Content */}
          <motion.div
            className="w-full flex flex-col items-center text-center z-10"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-extrabold uppercase tracking-widest mb-2 sm:mb-3 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 bg-clip-text text-transparent drop-shadow-sm">
              IEEE Colloquium 2026
            </div>

            <div className="relative inline-block mb-7 sm:mb-9 md:mb-11">
              <h1 className="relative m-0 p-0 flex items-center justify-center">
                <span className="sr-only">VIKAS 2026</span>
                <img
                  src="/vikas-logo-transparent.png"
                  alt="VIKAS"
                  className="h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 2xl:h-64 w-auto object-contain drop-shadow-lg select-none"
                />
                <motion.div
                  className="absolute top-[68%] sm:top-[70%] md:top-[72%] right-[-6%] sm:right-[-4%] md:right-[-2%] z-20 pointer-events-none"
                  initial={{ rotate: -3, y: 0 }}
                  animate={{
                    rotate: [-3, 2, -4, -3],
                    y: [0, 2, -1, 0]
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ transformOrigin: "42% 15%" }}
                >
                  <img
                    src="/2026-badge.png"
                    alt="2026"
                    className="h-10 sm:h-13 md:h-16 lg:h-20 xl:h-24 2xl:h-26 w-auto object-contain drop-shadow-xl"
                  />
                </motion.div>
              </h1>
            </div>

            {/* Tricolor Timer Bar */}
            <div className="flex flex-col w-full max-w-[320px] sm:max-w-md mb-5 sm:mb-6 items-center">
              <div className="flex h-8 sm:h-10 w-full rounded-full overflow-hidden shadow-md">
                <div className="bg-tricolor-saffron flex-1 flex items-center justify-center text-xs sm:text-sm font-bold text-white tracking-wide">
                  {timeLeft.days} D
                </div>
                <div className="bg-tricolor-white flex-1 flex items-center justify-center text-xs sm:text-sm font-bold text-brand-navy tracking-wide">
                  {timeLeft.hours} H
                </div>
                <div className="bg-tricolor-green flex-1 flex items-center justify-center text-xs sm:text-sm font-bold text-white tracking-wide">
                  {timeLeft.minutes} M
                </div>
              </div>
              <div className="flex w-full mt-2">
                <div className="flex-1 text-center text-[10px] sm:text-xs font-bold text-brand-navy/90 uppercase tracking-wider pr-1">Days</div>
                <div className="flex-1 text-center text-[10px] sm:text-xs font-bold text-brand-navy/90 uppercase tracking-wider px-1">Hours</div>
                <div className="flex-1 text-center text-[10px] sm:text-xs font-bold text-brand-navy/90 uppercase tracking-wider pl-1">Mins</div>
              </div>
            </div>

            <motion.h2 
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-brand-navy mb-3 sm:mb-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
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
              className="text-xs sm:text-sm md:text-base lg:text-[1.05rem] text-text-dark max-w-2xl mb-5 sm:mb-6 leading-relaxed font-normal"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
            >
              A national platform for young minds and researchers to ideate,
              innovate and contribute towards a resilient, inclusive and
              technologically advanced Viksit Bharat.
            </motion.p>

            <div className="flex flex-col items-center gap-4 mb-3 w-full">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
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
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-brand-navy mt-1">
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

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
