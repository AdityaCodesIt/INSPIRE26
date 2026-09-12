import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const InformationScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);

  // Desktop horizontal scroll progress based on 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform vertical scroll progress into horizontal translateX
  // With dwell plateaus so users can comfortably read each slide:
  // 0.00 - 0.14 : Slide 1 Dwells at 0%
  // 0.14 - 0.44 : Transition from Slide 1 to Slide 2
  // 0.44 - 0.56 : Slide 2 Dwells at -33.333%
  // 0.56 - 0.86 : Transition from Slide 2 to Slide 3
  // 0.86 - 1.00 : Slide 3 Dwells at -66.666%
  const x = useTransform(
    scrollYProgress,
    [0, 0.14, 0.44, 0.56, 0.86, 1],
    ['0%', '0%', '-33.3333%', '-33.3333%', '-66.6666%', '-66.6666%']
  );

  // Parallax shifts for background watermarks
  const watermarkX1 = useTransform(scrollYProgress, [0, 0.35], ['0px', '-80px']);
  const watermarkX2 = useTransform(scrollYProgress, [0.2, 0.7], ['60px', '-60px']);
  const watermarkX3 = useTransform(scrollYProgress, [0.55, 1], ['60px', '0px']);

  // Track active slide index for progress indicator
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (latest < 0.32) {
        setActiveSlide(0);
      } else if (latest < 0.68) {
        setActiveSlide(1);
      } else {
        setActiveSlide(2);
      }
    });
  }, [scrollYProgress]);

  const topics = [
    { number: '01', title: 'OUR COLLEGE', subtitle: 'Shree L. R. Tiwari College of Engineering' },
    { number: '02', title: 'OUR BRANCH', subtitle: 'Department of Engineering' },
    { number: '03', title: 'ABOUT IEEE', subtitle: 'Advancing Technology for Humanity' },
  ];

  return (
    <>
      {/* DESKTOP / LAPTOP: Horizontal Scroll Experience (md and above) */}
      <div
        id="overview"
        ref={containerRef}
        className="hidden md:block relative h-[300vh] bg-[#061426] text-white"
      >
        {/* Sticky Viewport pinned under the navbar */}
        <div className="sticky top-[56px] h-[calc(100vh-56px)] w-full overflow-hidden flex flex-col justify-between bg-[#061426] border-t border-b border-white/10">

          {/* Subtle Technical Blueprint Background Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px, 80px 80px, 80px 80px',
            }}
          />

          {/* Ambient Lighting Gradients */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Editorial Status Bar */}
          <div className="relative z-20 w-full px-8 lg:px-14 pt-4 pb-3 flex items-center justify-between border-b border-white/10 bg-[#061426]/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-white/70 uppercase">
                Institutional Perspective
              </span>
            </div>

            {/* Step Navigation Pill Indicator */}
            <div className="flex items-center space-x-6 text-xs font-mono">
              {topics.map((item, idx) => (
                <div
                  key={item.number}
                  className={`flex items-center space-x-2 transition-all duration-300 ${activeSlide === idx ? 'text-amber-400 font-bold' : 'text-white/40'
                    }`}
                >
                  <span>{item.number}</span>
                  <span className="tracking-wider">{item.title}</span>
                  {idx < topics.length - 1 && <span className="text-white/20 ml-4">·</span>}
                </div>
              ))}
            </div>

            <div className="text-xs font-mono text-white/50 tracking-wider">
              {activeSlide === 2 ? 'SCROLL DOWN TO NEXT SECTION ↓' : 'SCROLL DOWN TO EXPLORE →'}
            </div>
          </div>

          {/* Horizontal Track (300vw wide) */}
          <motion.div
            style={shouldReduceMotion ? {} : { x }}
            className="flex h-full w-[300vw] will-change-transform relative z-10"
          >
            {/* ========================================================================= */}
            {/* SLIDE 1: OUR COLLEGE */}
            {/* ========================================================================= */}
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center px-8 lg:px-16 xl:px-20 relative">
              {/* Background Watermark */}
              <motion.div
                style={shouldReduceMotion ? {} : { x: watermarkX1 }}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-[14vw] font-black text-white/[0.025] select-none pointer-events-none tracking-tighter"
              >
                SLRTCE
              </motion.div>

              <div className="max-w-[1440px] w-full mx-auto grid grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* Left Column: Narrative & Philosophy */}
                <div className="col-span-12 lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-amber-400 font-mono text-sm tracking-widest font-bold">01 / INSTITUTION</span>
                    <span className="h-px w-12 bg-amber-400/50"></span>
                    <span className="text-white/60 text-xs font-mono uppercase tracking-wider">Rahul Education</span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white tracking-tight leading-[1.12] mb-5">
                    Shree L. R. Tiwari <br />
                    <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                      College of Engineering
                    </span>
                  </h2>

                  <p className="text-sm lg:text-base text-white/80 leading-relaxed mb-6 font-light max-w-2xl">
                    Established under the visionary aegis of Rahul Education, SLRTCE stands as a premier hub for engineering and technological education in Maharashtra. Committed to academic rigor, modern research laboratories, and fostering a dynamic spirit of inquiry.
                  </p>

                  {/* Clean Editorial Pillars (No Boxy Cards) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-1">FOUNDATION</div>
                      <div className="text-sm font-semibold text-white">Rahul Education</div>
                      <div className="text-xs text-white/60 mt-0.5">Decades of educational excellence</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-1">CAMPUS</div>
                      <div className="text-sm font-semibold text-white">Kanakia Park</div>
                      <div className="text-xs text-white/60 mt-0.5">Mira Road, Maharashtra</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-1">CULTURE</div>
                      <div className="text-sm font-semibold text-white">Research First</div>
                      <div className="text-xs text-white/60 mt-0.5">Innovation & Incubation labs</div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Architectural Photography Showcase */}
                <div className="col-span-12 lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-lg overflow-hidden border border-white/15 shadow-2xl group">
                    <img
                      src="/college-photo.jpg"
                      alt="Shree L. R. Tiwari College of Engineering"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80">
                      <span>SLRTCE Main Building</span>
                      <span className="text-amber-400">Hub of Excellence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SLIDE 2: OUR BRANCH */}
            {/* ========================================================================= */}
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center px-8 lg:px-16 xl:px-20 relative">
              {/* Background Watermark */}
              <motion.div
                style={shouldReduceMotion ? {} : { x: watermarkX2 }}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-[14vw] font-black text-white/[0.025] select-none pointer-events-none tracking-tighter"
              >
                INNOVATE
              </motion.div>

              <div className="max-w-[1440px] w-full mx-auto grid grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* Left Column: Department Narrative */}
                <div className="col-span-12 lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-amber-400 font-mono text-sm tracking-widest font-bold">02 / DEPARTMENT</span>
                    <span className="h-px w-12 bg-amber-400/50"></span>
                    <span className="text-white/60 text-xs font-mono uppercase tracking-wider">Technical Wing</span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white tracking-tight leading-[1.12] mb-5">
                    Pioneering Engineering & <br />
                    <span className="bg-gradient-to-r from-blue-300 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">
                      Future-Ready Research
                    </span>
                  </h2>

                  <p className="text-sm lg:text-base text-white/80 leading-relaxed mb-6 font-light max-w-2xl">
                    Driven by a commitment to technical mastery and real-world problem solving, our department equips students to spearhead advancements across modern computing, intelligent systems, hardware design, and cutting-edge software architecture.
                  </p>

                  {/* Clean Editorial Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-xs font-mono text-cyan-400/90 uppercase tracking-wider mb-1">FOCUS DOMAINS</div>
                      <div className="text-sm font-semibold text-white">Intelligent Systems</div>
                      <div className="text-xs text-white/60 mt-0.5">AI, IoT, Embedded Systems</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-cyan-400/90 uppercase tracking-wider mb-1">PEDAGOGY</div>
                      <div className="text-sm font-semibold text-white">Project-Based</div>
                      <div className="text-xs text-white/60 mt-0.5">Industry-aligned toolchains</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-cyan-400/90 uppercase tracking-wider mb-1">VISION</div>
                      <div className="text-sm font-semibold text-white">Viksit Bharat</div>
                      <div className="text-xs text-white/60 mt-0.5">Empowering youth innovation</div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Engineering Schematic Visual Showcase */}
                <div className="col-span-12 lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-lg bg-gradient-to-br from-[#0c2342] to-[#08182f] border border-cyan-500/20 p-6 flex flex-col justify-between shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs font-mono text-cyan-300 tracking-wider">LABORATORY SPECIFICATION</span>
                      </div>
                      <span className="text-xs font-mono text-white/40">v2026.1</span>
                    </div>

                    {/* Schematic Nodes Representation */}
                    <div className="grid grid-cols-2 gap-4 my-auto">
                      <div className="p-3 bg-white/5 rounded border border-white/5">
                        <div className="text-xs font-mono text-cyan-400 mb-1">01 / ARCHITECTURE</div>
                        <div className="text-sm font-semibold text-white">Embedded & VLSI</div>
                        <div className="text-[0.65rem] text-white/50 mt-1">High-performance microcontrollers</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded border border-white/5">
                        <div className="text-xs font-mono text-cyan-400 mb-1">02 / COMPUTING</div>
                        <div className="text-sm font-semibold text-white">Intelligent Data</div>
                        <div className="text-[0.65rem] text-white/50 mt-1">Autonomous edge intelligence</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded border border-white/5">
                        <div className="text-xs font-mono text-cyan-400 mb-1">03 / NETWORKS</div>
                        <div className="text-sm font-semibold text-white">IoT Ecosystems</div>
                        <div className="text-[0.65rem] text-white/50 mt-1">Industrial communication nodes</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded border border-white/5">
                        <div className="text-xs font-mono text-cyan-400 mb-1">04 / PROTOYPING</div>
                        <div className="text-sm font-semibold text-white">Makerspace Labs</div>
                        <div className="text-[0.65rem] text-white/50 mt-1">Hands-on student incubators</div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[0.7rem] font-mono text-white/50">
                      <span>Bridging Theory & Impact</span>
                      <span className="text-cyan-400 font-bold">Industry Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SLIDE 3: ABOUT IEEE */}
            {/* ========================================================================= */}
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center px-8 lg:px-16 xl:px-20 relative">
              {/* Background Watermark */}
              <motion.div
                style={shouldReduceMotion ? {} : { x: watermarkX3 }}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-[14vw] font-black text-white/[0.025] select-none pointer-events-none tracking-tighter"
              >
                IEEE
              </motion.div>

              <div className="max-w-[1440px] w-full mx-auto grid grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* Left Column: IEEE Narrative */}
                <div className="col-span-12 lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-amber-400 font-mono text-sm tracking-widest font-bold">03 / GLOBAL NETWORK</span>
                    <span className="h-px w-12 bg-amber-400/50"></span>
                    <span className="text-white/60 text-xs font-mono uppercase tracking-wider">Student Branch</span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white tracking-tight leading-[1.12] mb-5">
                    Advancing Technology <br />
                    <span className="bg-gradient-to-r from-orange-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
                      For Humanity
                    </span>
                  </h2>

                  <p className="text-sm lg:text-base text-white/80 leading-relaxed mb-6 font-light max-w-2xl">
                    As the world's largest technical professional organization, IEEE connects over 400,000 members across 160+ countries. Our Student Branch serves as the catalyst for technical colloquiums, IEEE Xplore standards access, student research, and lifelong engineering networks.
                  </p>

                  {/* Clean Editorial Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-1">GLOBAL REACH</div>
                      <div className="text-sm font-semibold text-white">400,000+ Members</div>
                      <div className="text-xs text-white/60 mt-0.5">Spanning 160+ countries</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-1">STANDARDS</div>
                      <div className="text-sm font-semibold text-white">Global Authority</div>
                      <div className="text-xs text-white/60 mt-0.5">Wireless, Power, AI & Ethics</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-1">STUDENT BRANCH</div>
                      <div className="text-sm font-semibold text-white">Leadership Platform</div>
                      <div className="text-xs text-white/60 mt-0.5">Colloquiums & Competitions</div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Iconic IEEE Diamond Emblem Showcase */}
                <div className="col-span-12 lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-lg bg-gradient-to-br from-[#0c2240] to-[#07152b] border border-amber-500/20 p-8 flex flex-col items-center justify-center shadow-2xl text-center">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-xl transform scale-125 pointer-events-none" />
                      <svg
                        viewBox="0 0 24 24"
                        className="w-24 h-24 fill-current text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] relative z-10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8l6.2 6.2-6.2 6.2-6.2-6.2L12 5.8z" />
                      </svg>
                    </div>

                    <div className="text-2xl font-bold font-display tracking-widest text-white mb-1">IEEE</div>
                    <div className="text-xs font-mono text-amber-300 tracking-wider mb-4 italic">
                      Advancing Technology for Humanity
                    </div>

                    <p className="text-xs text-white/60 max-w-xs leading-relaxed font-light">
                      Fostering technological innovation and excellence for the benefit of humanity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Continuous Progress Bar */}
          <div className="relative z-20 w-full px-8 lg:px-14 py-4 bg-[#061426]/90 backdrop-blur-sm border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs font-mono text-white/60">
              <span>01 / 03</span>
              <div className="w-48 lg:w-72 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 w-full"
                />
              </div>
              <span>03 / 03</span>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono text-white/50">
              <span>Vertical Scroll Controls Horizontal Journey</span>
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE / TABLET ALTERNATIVE: Clean Vertically Stacked Editorial Experience (< md) */}
      <div className="block md:hidden bg-[#061426] text-white py-12 px-6 border-t border-b border-white/10">

        {/* Section Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">Institutional Overview</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white">Our Foundations</h2>
        </div>

        <div className="flex flex-col space-y-16">
          {/* Mobile Item 1: OUR COLLEGE */}
          <div className="border-l-2 border-amber-400 pl-4">
            <div className="text-xs font-mono text-amber-400 mb-1">01 / INSTITUTION</div>
            <h3 className="text-xl font-bold text-white mb-2">Shree L. R. Tiwari College of Engineering</h3>
            <p className="text-xs text-white/75 leading-relaxed mb-4">
              Established under Rahul Education, SLRTCE stands as a premier center for engineering and technological education at Kanakia Park, Mira Road, Maharashtra.
            </p>
            <div className="w-full aspect-[16/9] rounded overflow-hidden border border-white/15 mb-3">
              <img src="/college-photo.jpg" alt="College Campus" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Mobile Item 2: OUR BRANCH */}
          <div className="border-l-2 border-cyan-400 pl-4">
            <div className="text-xs font-mono text-cyan-400 mb-1">02 / DEPARTMENT</div>
            <h3 className="text-xl font-bold text-white mb-2">Department of Engineering</h3>
            <p className="text-xs text-white/75 leading-relaxed mb-3">
              Fostering mastery in intelligent systems, embedded architecture, data sciences, and hands-on laboratory innovation.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[0.7rem] font-mono text-white/70">
              <div className="p-2 bg-white/5 rounded">AI & Computing</div>
              <div className="p-2 bg-white/5 rounded">Embedded & IoT</div>
            </div>
          </div>

          {/* Mobile Item 3: ABOUT IEEE */}
          <div className="border-l-2 border-amber-400 pl-4">
            <div className="text-xs font-mono text-amber-400 mb-1">03 / GLOBAL COMMUNITY</div>
            <h3 className="text-xl font-bold text-white mb-2">About IEEE</h3>
            <p className="text-xs text-white/75 leading-relaxed mb-3">
              Advancing Technology for Humanity. The world's largest technical professional organization connecting students with global standards and research.
            </p>
            <div className="text-xs font-mono text-amber-400">IEEE Student Branch · SLRTCE</div>
          </div>
        </div>

      </div>
    </>
  );
};

export default InformationScrollSection;
