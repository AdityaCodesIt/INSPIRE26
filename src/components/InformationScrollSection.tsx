import { useRef, useState, useEffect, useCallback } from 'react';

const SCROLL_THRESHOLD = 35; // Small, intentional scroll gesture
const ANIMATION_DURATION = 850; // Slower, deliberate transition: 850ms
const COOLDOWN_DURATION = 200; // Cooldown after animation to absorb momentum/inertia
const TOTAL_LOCK_TIME = ANIMATION_DURATION + COOLDOWN_DURATION; // 1050ms

const InformationScrollSection = () => {
  const [activePanel, setActivePanel] = useState(0);
  const activePanelRef = useRef(0);
  const isLockedRef = useRef(false);
  const accumulatedDeltaRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Navigate to target panel with lock and cooldown
  const goToPanel = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex > 2) return;
    if (isLockedRef.current) return;

    isLockedRef.current = true;
    accumulatedDeltaRef.current = 0;
    setActivePanel(targetIndex);
    activePanelRef.current = targetIndex;

    // Cooldown timer: 850ms animation + 200ms buffer = 1050ms
    // This completely swallows momentum scrolling and trackpad inertia
    setTimeout(() => {
      isLockedRef.current = false;
      accumulatedDeltaRef.current = 0;
    }, TOTAL_LOCK_TIME);
  }, []);

  // Sync panel index when scrolling past the section from Hero or About
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const navbarHeight = 56;

      // If user has scrolled completely above the section into Hero
      if (rect.top > window.innerHeight - 80) {
        if (activePanelRef.current !== 0) {
          setActivePanel(0);
          activePanelRef.current = 0;
          accumulatedDeltaRef.current = 0;
        }
      }
      // If user has scrolled completely below the section into About Colloquium
      else if (rect.bottom < navbarHeight - 50) {
        if (activePanelRef.current !== 2) {
          setActivePanel(2);
          activePanelRef.current = 2;
          accumulatedDeltaRef.current = 0;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Wheel interception: Strict 1-scroll = 1-panel snap state machine
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      // Filter out micro trackpad noise
      if (Math.abs(e.deltaY) < 10) return;

      const rect = section.getBoundingClientRect();
      const navbarHeight = 56;

      // Check if section is currently active and occupying the viewport
      const isSectionInView = rect.top <= navbarHeight + 30 && rect.bottom >= navbarHeight + 100;
      if (!isSectionInView) return;

      const targetScrollTop = section.offsetTop - navbarHeight;

      // If currently locked/animating, absorb all wheel events completely
      if (isLockedRef.current) {
        e.preventDefault();
        accumulatedDeltaRef.current = 0;
        return;
      }

      if (e.deltaY > 0) {
        // User scrolling DOWN
        if (activePanelRef.current < 2) {
          // In panels 0 or 1: prevent page vertical scroll and accumulate delta
          e.preventDefault();
          accumulatedDeltaRef.current += e.deltaY;

          if (accumulatedDeltaRef.current >= SCROLL_THRESHOLD) {
            // Align section flush to navbar
            window.scrollTo({ top: targetScrollTop, behavior: 'auto' });
            goToPanel(activePanelRef.current + 1);
          }
        } else {
          // At Panel 2 (IEEE SLRTCE Student Branch): user scrolls down to continue to About Colloquium!
          // Allow normal vertical browser scroll to AboutSection.
          accumulatedDeltaRef.current = 0;
        }
      } else if (e.deltaY < 0) {
        // User scrolling UP
        if (activePanelRef.current > 0) {
          // In panels 1 or 2: prevent page vertical scroll and accumulate delta
          e.preventDefault();
          accumulatedDeltaRef.current += e.deltaY;

          if (accumulatedDeltaRef.current <= -SCROLL_THRESHOLD) {
            // Align section flush to navbar
            window.scrollTo({ top: targetScrollTop, behavior: 'auto' });
            goToPanel(activePanelRef.current - 1);
          }
        } else {
          // At Panel 0 (Our College): user scrolls up to return to Hero!
          // Allow normal vertical browser scroll to HeroSection.
          accumulatedDeltaRef.current = 0;
        }
      }
    };

    // Non-passive wheel listener on window ensures reliable interception
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [goToPanel]);

  // Touch handlers for mobile / tablet swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isLockedRef.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;

    // Horizontal swipe threshold: 40px
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0 && activePanelRef.current < 2) {
        goToPanel(activePanelRef.current + 1);
      } else if (deltaX > 0 && activePanelRef.current > 0) {
        goToPanel(activePanelRef.current - 1);
      }
    }
  };

  const topics = [
    { number: '01', title: 'OUR COLLEGE', subtitle: 'Shree L. R. Tiwari College of Engineering' },
    { number: '02', title: 'OUR BRANCH', subtitle: 'Department of Engineering' },
    { number: '03', title: 'IEEE SLRTCE STUDENT BRANCH', subtitle: 'Advancing Technology for Humanity' },
  ];

  return (
    <section 
      id="overview"
      ref={sectionRef} 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[calc(100vh-56px)] min-h-[580px] max-h-[1080px] overflow-hidden select-none border-t border-b border-white/10"
    >
      {/* Top Floating Editorial Navigation Bar */}
      <div className="absolute top-0 left-0 w-full z-30 px-6 sm:px-10 lg:px-16 pt-4 pb-3 flex items-center justify-between bg-black/30 backdrop-blur-md border-b border-white/10">
        {/* Left Perspective Badge */}
        <div className="flex items-center space-x-2.5">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[0.7rem] sm:text-xs font-mono tracking-widest text-white/80 uppercase">
            Institutional Perspective
          </span>
        </div>

        {/* Center: 3-Panel Clickable Tabs */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 text-xs font-mono">
          {topics.map((item, idx) => (
            <button
              key={item.number}
              onClick={() => goToPanel(idx)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                activePanel === idx 
                  ? 'bg-white/15 text-white font-bold shadow-sm ring-1 ring-white/30' 
                  : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <span className={activePanel === idx ? 'text-amber-400' : 'text-white/40'}>
                {item.number}
              </span>
              <span className="tracking-wider hidden sm:inline">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Right Scroll Status Cue */}
        <div className="text-[0.7rem] sm:text-xs font-mono text-white/60 tracking-wider">
          {activePanel === 0 && 'SCROLL DOWN FOR OUR BRANCH →'}
          {activePanel === 1 && 'SCROLL DOWN FOR IEEE STUDENT BRANCH →'}
          {activePanel === 2 && 'SCROLL DOWN FOR ABOUT COLLOQUIUM ↓'}
        </div>
      </div>

      {/* Horizontal Track: 300vw wide, snaps using CSS transform */}
      <div 
        className="flex h-full w-[300vw] will-change-transform"
        style={{
          transform: `translateX(-${activePanel * 100}vw)`,
          transition: 'transform 850ms cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {/* ========================================================================= */}
        {/* PANEL 0: OUR COLLEGE (Color: Deep Midnight Navy #081B38) */}
        {/* ========================================================================= */}
        <div 
          className="w-screen h-full flex-shrink-0 flex items-center justify-center bg-[#081B38] text-white px-6 sm:px-12 lg:px-20 pt-16 pb-16 relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(8, 27, 56, 0.88), rgba(8, 27, 56, 0.7)), url('/backgrounds/bg-blue.jpg')",
          }}
        >
          {/* Background Textured Overlay */}
          <div className="absolute inset-0 bg-[#081B38]/30 pointer-events-none" />

          {/* Large Watermark Typography */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[16vw] font-black text-white/[0.025] select-none pointer-events-none tracking-tighter leading-none">
            SLRTCE
          </div>

          {/* Content Layout */}
          <div className="max-w-[1400px] w-full mx-auto grid grid-cols-12 gap-6 lg:gap-14 items-center relative z-10">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-amber-400 font-mono text-xs sm:text-sm tracking-widest font-bold">01 / INSTITUTION</span>
                <span className="h-px w-10 bg-amber-400/50"></span>
                <span className="text-white/60 text-xs font-mono uppercase tracking-wider">Rahul Education</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white tracking-tight leading-[1.12] mb-4">
                Shree L. R. Tiwari <br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                  College of Engineering
                </span>
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed mb-6 font-light max-w-2xl">
                Established under the visionary aegis of Rahul Education, SLRTCE stands as a premier hub for engineering and technological education in Maharashtra. Committed to academic rigor, state-of-the-art research laboratories, and fostering a dynamic spirit of inquiry.
              </p>

              {/* Clean Editorial Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-white/10">
                <div>
                  <div className="text-[0.7rem] sm:text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-1">FOUNDATION</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">Rahul Education</div>
                  <div className="text-[0.7rem] text-white/60 mt-0.5">Decades of educational excellence</div>
                </div>
                <div>
                  <div className="text-[0.7rem] sm:text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-1">CAMPUS</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">Kanakia Park</div>
                  <div className="text-[0.7rem] text-white/60 mt-0.5">Mira Road, Maharashtra</div>
                </div>
                <div>
                  <div className="text-[0.7rem] sm:text-xs font-mono text-amber-400/90 uppercase tracking-wider mb-1">CULTURE</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">Research First</div>
                  <div className="text-[0.7rem] text-white/60 mt-0.5">Innovation & Incubation labs</div>
                </div>
              </div>
            </div>

            {/* Right Column: Campus Photograph */}
            <div className="col-span-12 lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-lg overflow-hidden border border-white/20 shadow-2xl group">
                <img 
                  src="/college-photo.jpg" 
                  alt="Shree L. R. Tiwari College of Engineering Campus" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081B38] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80">
                  <span>Campus Main Wing</span>
                  <span className="text-amber-400">Hub of Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANEL 1: OUR BRANCH (Color: Deep Forest Emerald #062E25) */}
        {/* ========================================================================= */}
        <div 
          className="w-screen h-full flex-shrink-0 flex items-center justify-center bg-[#062E25] text-white px-6 sm:px-12 lg:px-20 pt-16 pb-16 relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(6, 46, 37, 0.88), rgba(6, 46, 37, 0.7)), url('/backgrounds/bg-teal.jpg')",
          }}
        >
          {/* Background Textured Overlay */}
          <div className="absolute inset-0 bg-[#062E25]/30 pointer-events-none" />

          {/* Large Watermark Typography */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[16vw] font-black text-white/[0.025] select-none pointer-events-none tracking-tighter leading-none">
            INNOVATE
          </div>

          {/* Content Layout */}
          <div className="max-w-[1400px] w-full mx-auto grid grid-cols-12 gap-6 lg:gap-14 items-center relative z-10">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-emerald-400 font-mono text-xs sm:text-sm tracking-widest font-bold">02 / DEPARTMENT</span>
                <span className="h-px w-10 bg-emerald-400/50"></span>
                <span className="text-white/60 text-xs font-mono uppercase tracking-wider">Technical Wing</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white tracking-tight leading-[1.12] mb-4">
                Pioneering Engineering & <br />
                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  Future-Ready Research
                </span>
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed mb-6 font-light max-w-2xl">
                Driven by a passion for technical mastery and creative problem-solving, our department equips students to explore intelligent systems, embedded architecture, data sciences, and sustainable engineering — bridging deep theoretical foundations with industry impact.
              </p>

              {/* Clean Editorial Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-white/10">
                <div>
                  <div className="text-[0.7rem] sm:text-xs font-mono text-emerald-400/90 uppercase tracking-wider mb-1">FOCUS DOMAINS</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">Intelligent Systems</div>
                  <div className="text-[0.7rem] text-white/60 mt-0.5">AI, IoT, Embedded Computing</div>
                </div>
                <div>
                  <div className="text-[0.7rem] sm:text-xs font-mono text-emerald-400/90 uppercase tracking-wider mb-1">PEDAGOGY</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">Project-Based</div>
                  <div className="text-[0.7rem] text-white/60 mt-0.5">Industry-aligned toolchains</div>
                </div>
                <div>
                  <div className="text-[0.7rem] sm:text-xs font-mono text-emerald-400/90 uppercase tracking-wider mb-1">VISION</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">Viksit Bharat</div>
                  <div className="text-[0.7rem] text-white/60 mt-0.5">Empowering youth innovation</div>
                </div>
              </div>
            </div>

            {/* Right Column: Engineering Laboratory Schematic Showcase */}
            <div className="col-span-12 lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-lg bg-gradient-to-br from-[#0a382d] to-[#04201a] border border-emerald-500/25 p-6 flex flex-col justify-between shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-300 tracking-wider">LABORATORY SPECIFICATION</span>
                  </div>
                  <span className="text-xs font-mono text-white/40">v2026.1</span>
                </div>

                {/* Engineering Schematic Matrix */}
                <div className="grid grid-cols-2 gap-3.5 my-auto">
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="text-xs font-mono text-emerald-400 mb-0.5">01 / ARCHITECTURE</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">Embedded & VLSI</div>
                    <div className="text-[0.65rem] text-white/50 mt-0.5">High-performance microcontrollers</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="text-xs font-mono text-emerald-400 mb-0.5">02 / COMPUTING</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">Intelligent Data</div>
                    <div className="text-[0.65rem] text-white/50 mt-0.5">Autonomous edge intelligence</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="text-xs font-mono text-emerald-400 mb-0.5">03 / NETWORKS</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">IoT Ecosystems</div>
                    <div className="text-[0.65rem] text-white/50 mt-0.5">Industrial communication nodes</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="text-xs font-mono text-emerald-400 mb-0.5">04 / PROTOTYPING</div>
                    <div className="text-xs sm:text-sm font-semibold text-white">Makerspace Labs</div>
                    <div className="text-[0.65rem] text-white/50 mt-0.5">Hands-on student incubators</div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[0.7rem] font-mono text-white/50">
                  <span>Theory to Impact</span>
                  <span className="text-emerald-400 font-bold">Industry Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANEL 2: IEEE SLRTCE STUDENT BRANCH (Color: Deep Royal Indigo #18183D) */}
        {/* ========================================================================= */}
        <div 
          className="w-screen h-full flex-shrink-0 flex items-center justify-center bg-[#18183D] text-white px-6 sm:px-12 lg:px-20 pt-16 pb-16 relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(24, 24, 61, 0.88), rgba(24, 24, 61, 0.7)), url('/backgrounds/bg-purple.jpg')",
          }}
        >
          {/* Background Textured Overlay */}
          <div className="absolute inset-0 bg-[#18183D]/30 pointer-events-none" />

          {/* Large Watermark Typography */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[16vw] font-black text-white/[0.025] select-none pointer-events-none tracking-tighter leading-none">
            IEEE
          </div>

          {/* Content Layout */}
          <div className="max-w-[1400px] w-full mx-auto grid grid-cols-12 gap-6 lg:gap-14 items-center relative z-10">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-sky-400 font-mono text-xs sm:text-sm tracking-widest font-bold">03 / GLOBAL NETWORK</span>
                <span className="h-px w-10 bg-sky-400/50"></span>
                <span className="text-white/60 text-xs font-mono uppercase tracking-wider">SLRTCE Student Branch</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white tracking-tight leading-[1.12] mb-4">
                IEEE SLRTCE <br />
                <span className="bg-gradient-to-r from-sky-300 via-indigo-200 to-amber-300 bg-clip-text text-transparent">
                  Student Branch
                </span>
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed mb-6 font-light max-w-2xl">
                As part of the world's largest technical professional organization, the IEEE SLRTCE Student Branch serves as the catalyst for technical colloquiums, IEEE Xplore research access, professional networking, and student leadership development.
              </p>

              {/* Clean Editorial Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-white/10">
                <div>
                  <div className="text-[0.7rem] sm:text-xs font-mono text-sky-400/90 uppercase tracking-wider mb-1">GLOBAL REACH</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">400,000+ Members</div>
                  <div className="text-[0.7rem] text-white/60 mt-0.5">Spanning 160+ countries</div>
                </div>
                <div>
                  <div className="text-[0.7rem] sm:text-xs font-mono text-sky-400/90 uppercase tracking-wider mb-1">STANDARDS</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">Global Authority</div>
                  <div className="text-[0.7rem] text-white/60 mt-0.5">Wireless, Power, AI & Ethics</div>
                </div>
                <div>
                  <div className="text-[0.7rem] sm:text-xs font-mono text-sky-400/90 uppercase tracking-wider mb-1">STUDENT CHAPTER</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">SLRTCE Hub</div>
                  <div className="text-[0.7rem] text-white/60 mt-0.5">Colloquiums & Competitions</div>
                </div>
              </div>
            </div>

            {/* Right Column: Iconic IEEE Diamond Emblem Showcase */}
            <div className="col-span-12 lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-lg bg-gradient-to-br from-[#1c1c46] to-[#121230] border border-sky-500/25 p-8 flex flex-col items-center justify-center shadow-2xl text-center">
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-sky-400/10 rounded-full blur-xl transform scale-125 pointer-events-none" />
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-20 h-20 sm:w-24 sm:h-24 fill-current text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)] relative z-10" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8l6.2 6.2-6.2 6.2-6.2-6.2L12 5.8z"/>
                  </svg>
                </div>

                <div className="text-2xl font-bold font-display tracking-widest text-white mb-1">IEEE SLRTCE</div>
                <div className="text-xs font-mono text-sky-300 tracking-wider mb-3 italic">
                  Advancing Technology for Humanity
                </div>

                <p className="text-xs text-white/60 max-w-xs leading-relaxed font-light">
                  Empowering students with international research standards, innovation culture, and global engineering networks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Step Bar */}
      <div className="absolute bottom-0 left-0 w-full z-30 px-6 sm:px-10 lg:px-16 py-3.5 bg-black/30 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono text-white/70">
            PANEL {activePanel + 1} OF 3
          </span>
          <div className="flex space-x-1.5">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => goToPanel(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activePanel === idx 
                    ? 'w-8 bg-amber-400' 
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Jump to panel ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[0.7rem] sm:text-xs font-mono text-white/50">
          <span>ONE SMALL SCROLL SNAPS TO NEXT PANEL</span>
        </div>
      </div>
    </section>
  );
};

export default InformationScrollSection;
