import { useRef, useState, useEffect, useCallback } from 'react';

const SCROLL_THRESHOLD = 35; // Small, intentional scroll gesture
const ANIMATION_DURATION = 850; // Deliberate transition: 850ms
const COOLDOWN_DURATION = 200; // Cooldown after animation to absorb momentum/inertia
const TOTAL_LOCK_TIME = ANIMATION_DURATION + COOLDOWN_DURATION; // 1050ms

const InformationScrollSection = () => {
  const [activePanel, setActivePanel] = useState(0);
  const activePanelRef = useRef(0);
  const isLockedRef = useRef(false);
  const accumulatedDeltaRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Dynamically get the exact navbar height so we never hide behind it
  const getNavbarHeight = useCallback(() => {
    const header = document.querySelector('header');
    return header ? header.getBoundingClientRect().height : 65;
  }, []);

  // Navigate to target panel with lock and cooldown
  const goToPanel = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex > 2) return;
    if (isLockedRef.current) return;

    isLockedRef.current = true;
    accumulatedDeltaRef.current = 0;
    setActivePanel(targetIndex);
    activePanelRef.current = targetIndex;

    // Cooldown timer: 850ms animation + 200ms buffer = 1050ms
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
      const navbarHeight = getNavbarHeight();

      // If user has scrolled completely above the section into Hero
      if (rect.top > window.innerHeight - 80) {
        if (activePanelRef.current !== 0) {
          setActivePanel(0);
          activePanelRef.current = 0;
          accumulatedDeltaRef.current = 0;
        }
      }
      // If user has scrolled completely below the section into About Colloquium
      else if (rect.bottom < navbarHeight - 40) {
        if (activePanelRef.current !== 2) {
          setActivePanel(2);
          activePanelRef.current = 2;
          accumulatedDeltaRef.current = 0;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getNavbarHeight]);

  // Wheel interception: Strict 1-scroll = 1-panel snap state machine
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      // Filter out micro trackpad noise
      if (Math.abs(e.deltaY) < 10) return;

      const rect = section.getBoundingClientRect();
      const navbarHeight = getNavbarHeight();

      // Check if section is currently active and occupying the viewport
      const isSectionInView = rect.top <= navbarHeight + 30 && rect.bottom >= navbarHeight + 80;
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
          accumulatedDeltaRef.current = 0;
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [goToPanel, getNavbarHeight]);

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

  const folios = [
    { number: 'I', title: 'OUR COLLEGE', subtitle: 'Shree L. R. Tiwari College of Engineering' },
    { number: 'II', title: 'OUR BRANCH', subtitle: 'Faculty of Engineering' },
    { number: 'III', title: 'IEEE STUDENT BRANCH', subtitle: 'IEEE SLRTCE Chapter' },
  ];

  return (
    <section 
      id="overview"
      ref={sectionRef} 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        height: 'calc(100vh - 65px)',
      }}
      className="relative w-full min-h-[600px] max-h-[1080px] overflow-hidden select-none border-t border-b border-[#C8B89A]/30 scroll-mt-[65px]"
    >
      {/* ========================================================================= */}
      {/* Top Archival Folio Docket Ribbon */}
      {/* ========================================================================= */}
      <div className="absolute top-0 left-0 w-full z-30 px-4 sm:px-8 lg:px-16 py-2.5 flex items-center justify-between bg-[#07172E]/92 backdrop-blur-md border-b border-[#C8B89A]/30 text-xs">
        {/* Left: Archival Docket Badge */}
        <div className="flex items-center space-x-2">
          <span className="text-[#D4AF37] font-serif text-sm leading-none">✦</span>
          <span className="text-[0.68rem] sm:text-xs font-mono tracking-widest text-[#FBF7EE]/90 uppercase font-semibold">
            ARCHIVAL FOLIO · DISPATCH 2026
          </span>
        </div>

        {/* Center: 3-Panel Vintage Tab Selectors */}
        <div className="flex items-center space-x-1 sm:space-x-2 font-mono text-[0.7rem] sm:text-xs">
          {folios.map((item, idx) => (
            <button
              key={item.number}
              onClick={() => goToPanel(idx)}
              className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-1 rounded-[2px] transition-all duration-200 cursor-pointer ${
                activePanel === idx 
                  ? 'border border-[#D4AF37] bg-[#D4AF37]/20 text-[#FBF7EE] font-bold shadow-xs' 
                  : 'border border-transparent text-[#FBF7EE]/50 hover:text-[#FBF7EE]/90 hover:border-[#C8B89A]/40'
              }`}
            >
              <span className={activePanel === idx ? 'text-amber-300 font-bold' : 'text-[#D4AF37]/60'}>
                {item.number}.
              </span>
              <span className="tracking-wider hidden md:inline">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Right: Scroll Navigation Hint */}
        <div className="text-[0.65rem] sm:text-[0.72rem] font-mono text-amber-200/80 tracking-wider">
          {activePanel === 0 && 'SCROLL FOR FOLIO II →'}
          {activePanel === 1 && 'SCROLL FOR FOLIO III →'}
          {activePanel === 2 && 'SCROLL FOR COLLOQUIUM ↓'}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Horizontal Track: 300vw wide, snaps using CSS transform */}
      {/* ========================================================================= */}
      <div 
        className="flex h-full w-[300vw] will-change-transform"
        style={{
          transform: `translateX(-${activePanel * 100}vw)`,
          transition: 'transform 850ms cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {/* ========================================================================= */}
        {/* PANEL 0: OUR COLLEGE (Deep Midnight Navy with Gold & Cream) */}
        {/* ========================================================================= */}
        <div 
          className="w-screen h-full flex-shrink-0 flex items-center justify-center text-white px-6 sm:px-12 lg:px-20 pt-16 pb-14 relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "url('/backgrounds/bg-blue.jpg')",
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
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/40 via-transparent to-black/30 z-0" />

          {/* Archival Monogram Watermark */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[14vw] font-serif font-black text-white/[0.02] select-none pointer-events-none tracking-tighter leading-none">
            SLRTCE
          </div>

          {/* Content Layout */}
          <div className="max-w-[1360px] w-full mx-auto grid grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">
            {/* Left Column: Gazette Information */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
              {/* Postal Tag */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#FCF9F2] text-[#0A2A5E] font-mono text-[0.68rem] tracking-wider uppercase font-bold border border-[#C8B89A] shadow-xs">
                  ✦ ARCHIVAL REGISTER · FOLIO I
                </span>
                <span className="h-px w-6 bg-[#C8B89A]/40 hidden sm:inline-block" />
                <span className="text-amber-200/80 text-[0.72rem] font-serif uppercase tracking-wider">
                  Rahul Education Trust
                </span>
              </div>

              {/* Editorial Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white tracking-tight leading-[1.12] mb-3">
                Shree L. R. Tiwari <br />
                <span className="text-[#D4AF37] font-display italic font-semibold">
                  College of Engineering
                </span>
              </h2>

              {/* Narrative Text */}
              <p className="text-xs sm:text-sm lg:text-[0.95rem] text-[#F4EFE6]/90 leading-relaxed mb-6 font-light max-w-2xl">
                Established under the visionary aegis of Rahul Education, SLRTCE stands as a distinguished center for engineering excellence in Maharashtra. Rooted in academic integrity, state-of-the-art research laboratories, and an enduring commitment to nation-building through technology.
              </p>

              {/* Archival Charter Register (3 Columns with hairline borders) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 pt-3.5 border-t border-[#C8B89A]/30">
                <div className="border-l-2 border-[#D4AF37]/60 pl-3">
                  <div className="text-[0.65rem] sm:text-[0.7rem] font-mono text-amber-300 uppercase tracking-widest mb-0.5">FOUNDATION</div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-serif">Rahul Education</div>
                  <div className="text-[0.7rem] text-[#DDD5C7] mt-0.5 leading-snug">Decades of educational excellence & social leadership</div>
                </div>
                <div className="border-l-2 border-[#D4AF37]/60 pl-3">
                  <div className="text-[0.65rem] sm:text-[0.7rem] font-mono text-amber-300 uppercase tracking-widest mb-0.5">CAMPUS SEAT</div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-serif">Kanakia Park</div>
                  <div className="text-[0.7rem] text-[#DDD5C7] mt-0.5 leading-snug">Mira Road, Maharashtra · Autonomous grounds</div>
                </div>
                <div className="border-l-2 border-[#D4AF37]/60 pl-3">
                  <div className="text-[0.65rem] sm:text-[0.7rem] font-mono text-amber-300 uppercase tracking-widest mb-0.5">RESEARCH CORE</div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-serif">Innovation & Labs</div>
                  <div className="text-[0.7rem] text-[#DDD5C7] mt-0.5 leading-snug">Advanced incubation centers & accredited laboratories</div>
                </div>
              </div>
            </div>

            {/* Right Column: Vintage Philatelic Stamp Card */}
            <div className="col-span-12 lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px]">
                {/* Stamp Card */}
                <div className="stamp-card !p-3 bg-[#FCF9F2] text-[#0A2A5E] shadow-2xl rotate-[-1.5deg] transition-transform duration-500 hover:rotate-0">
                  {/* Top Perforation Header */}
                  <div className="flex items-center justify-between border-b border-[#C8B89A]/40 pb-1.5 mb-2 px-1 text-[0.65rem] font-mono font-bold tracking-widest text-[#0A2A5E]/80">
                    <span>BHARAT · INDIA</span>
                    <span className="text-[#D4AF37] tracking-widest">COMMEMORATIVE</span>
                    <span>₹ 20.26</span>
                  </div>

                  {/* Stamp Vignette with fine golden frame */}
                  <div className="relative aspect-[4/3] rounded-xs overflow-hidden border border-[#C8B89A] p-1 bg-white">
                    <img 
                      src="/college-photo.jpg" 
                      alt="Shree L. R. Tiwari College of Engineering Campus" 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-amber-950/10 pointer-events-none mix-blend-multiply" />
                    
                    {/* Vintage Postmark Seal Overlay */}
                    <div className="absolute -bottom-3 -right-3 w-22 h-22 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-[#0A2A5E]/60 flex flex-col items-center justify-center rotate-[-12deg] bg-[#FCF9F2]/95 backdrop-blur-xs p-1 pointer-events-none shadow-sm text-center">
                      <span className="text-[0.52rem] font-mono uppercase font-black text-[#0A2A5E] tracking-tighter leading-tight">SLRTCE</span>
                      <span className="text-[0.45rem] font-mono text-[#D4AF37] font-bold">MUMBAI</span>
                      <span className="text-[0.42rem] font-mono text-[#0A2A5E]/70 font-semibold tracking-wider">2026 REG</span>
                    </div>
                  </div>

                  {/* Stamp Footer Label */}
                  <div className="pt-2 px-1 flex items-center justify-between text-[#0A2A5E]">
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-xs tracking-wide">CAMPUS VIGNETTE</span>
                      <span className="text-[0.65rem] text-[#5A5A7A] font-sans">Main Academic Wing & Research Complex</span>
                    </div>
                    <span className="text-[0.62rem] font-mono text-[#D4AF37] font-bold border border-[#D4AF37]/50 px-1.5 py-0.5 rounded-[2px] bg-amber-50">
                      ACCREDITED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANEL 1: OUR BRANCH (Deep Forest Teal/Emerald with Archival Monograph) */}
        {/* ========================================================================= */}
        <div 
          className="w-screen h-full flex-shrink-0 flex items-center justify-center text-white px-6 sm:px-12 lg:px-20 pt-16 pb-14 relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "url('/backgrounds/bg-teal.jpg')",
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
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/40 via-transparent to-black/30 z-0" />

          {/* Archival Watermark */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[14vw] font-serif font-black text-white/[0.02] select-none pointer-events-none tracking-tighter leading-none">
            ENGINEER
          </div>

          {/* Content Layout */}
          <div className="max-w-[1360px] w-full mx-auto grid grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">
            {/* Left Column: Gazette Information */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
              {/* Postal Tag */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#FCF9F2] text-[#062E25] font-mono text-[0.68rem] tracking-wider uppercase font-bold border border-[#C8B89A] shadow-xs">
                  ✦ TECHNICAL MONOGRAPH · FOLIO II
                </span>
                <span className="h-px w-6 bg-[#C8B89A]/40 hidden sm:inline-block" />
                <span className="text-emerald-200/80 text-[0.72rem] font-serif uppercase tracking-wider">
                  Faculty of Engineering
                </span>
              </div>

              {/* Editorial Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white tracking-tight leading-[1.12] mb-3">
                Pioneering Engineering & <br />
                <span className="text-emerald-300 font-display italic font-semibold">
                  Future-Ready Research
                </span>
              </h2>

              {/* Narrative Text */}
              <p className="text-xs sm:text-sm lg:text-[0.95rem] text-[#F4EFE6]/90 leading-relaxed mb-6 font-light max-w-2xl">
                Driven by a passion for technical mastery and creative problem-solving, our department equips scholars to explore intelligent systems, embedded architecture, data sciences, and sustainable engineering — bridging deep theoretical foundations with tangible societal impact.
              </p>

              {/* Archival Register (3 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 pt-3.5 border-t border-[#C8B89A]/30">
                <div className="border-l-2 border-emerald-400/60 pl-3">
                  <div className="text-[0.65rem] sm:text-[0.7rem] font-mono text-emerald-300 uppercase tracking-widest mb-0.5">CORE DOMAINS</div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-serif">Intelligent Systems</div>
                  <div className="text-[0.7rem] text-[#DDD5C7] mt-0.5 leading-snug">AI, IoT, Embedded Computing & VLSI Architecture</div>
                </div>
                <div className="border-l-2 border-emerald-400/60 pl-3">
                  <div className="text-[0.65rem] sm:text-[0.7rem] font-mono text-emerald-300 uppercase tracking-widest mb-0.5">PEDAGOGY</div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-serif">Project-Based Rigor</div>
                  <div className="text-[0.7rem] text-[#DDD5C7] mt-0.5 leading-snug">Industry-aligned toolchains & empirical research</div>
                </div>
                <div className="border-l-2 border-emerald-400/60 pl-3">
                  <div className="text-[0.65rem] sm:text-[0.7rem] font-mono text-emerald-300 uppercase tracking-widest mb-0.5">VISION</div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-serif">Viksit Bharat</div>
                  <div className="text-[0.7rem] text-[#DDD5C7] mt-0.5 leading-snug">Empowering India's next generation of pioneers</div>
                </div>
              </div>
            </div>

            {/* Right Column: Archival Engineering Plate */}
            <div className="col-span-12 lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px]">
                {/* Archival Document Card */}
                <div className="archival-card !p-4 bg-[#FCF9F2] text-[#062E25] shadow-2xl rotate-[1.5deg] transition-transform duration-500 hover:rotate-0">
                  {/* Masthead */}
                  <div className="flex items-center justify-between border-b-2 border-[#C8B89A] pb-2 mb-3">
                    <div>
                      <div className="text-[0.65rem] font-mono font-bold tracking-widest text-[#062E25] uppercase">
                        DEPARTMENT RESEARCH REGISTER
                      </div>
                      <div className="text-[0.6rem] font-serif italic text-[#5A5A7A]">
                        Academic Specifications · Folio ENG/2026
                      </div>
                    </div>
                    <span className="text-[0.62rem] font-mono text-emerald-800 font-bold border border-emerald-700/40 px-1.5 py-0.5 rounded-[2px] bg-emerald-50">
                      VERIFIED
                    </span>
                  </div>

                  {/* 4 Vintage Research Plates */}
                  <div className="grid grid-cols-2 gap-2.5 my-2">
                    <div className="p-2.5 bg-white rounded-[2px] border border-[#C8B89A]/60">
                      <div className="text-[0.62rem] font-mono font-bold text-emerald-800 mb-0.5">I · ARCHITECTURE</div>
                      <div className="text-xs font-bold text-[#062E25] font-serif">Embedded & VLSI</div>
                      <div className="text-[0.68rem] text-[#5A5A7A] mt-0.5 leading-snug">Microcontrollers & signal synthesis</div>
                    </div>
                    <div className="p-2.5 bg-white rounded-[2px] border border-[#C8B89A]/60">
                      <div className="text-[0.62rem] font-mono font-bold text-emerald-800 mb-0.5">II · COMPUTING</div>
                      <div className="text-xs font-bold text-[#062E25] font-serif">Intelligent Data</div>
                      <div className="text-[0.68rem] text-[#5A5A7A] mt-0.5 leading-snug">Autonomous edge intelligence</div>
                    </div>
                    <div className="p-2.5 bg-white rounded-[2px] border border-[#C8B89A]/60">
                      <div className="text-[0.62rem] font-mono font-bold text-emerald-800 mb-0.5">III · NETWORKS</div>
                      <div className="text-xs font-bold text-[#062E25] font-serif">IoT Ecosystems</div>
                      <div className="text-[0.68rem] text-[#5A5A7A] mt-0.5 leading-snug">Industrial communication nodes</div>
                    </div>
                    <div className="p-2.5 bg-white rounded-[2px] border border-[#C8B89A]/60">
                      <div className="text-[0.62rem] font-mono font-bold text-emerald-800 mb-0.5">IV · PROTOTYPING</div>
                      <div className="text-xs font-bold text-[#062E25] font-serif">Makerspace Labs</div>
                      <div className="text-[0.68rem] text-[#5A5A7A] mt-0.5 leading-snug">Hands-on student incubators</div>
                    </div>
                  </div>

                  {/* Docket Footer */}
                  <div className="border-t border-[#C8B89A]/50 pt-2 flex items-center justify-between text-[0.68rem] font-mono text-[#5A5A7A]">
                    <span className="italic font-serif">Theory to Societal Impact</span>
                    <span className="font-bold text-emerald-800">INDUSTRY READY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANEL 2: IEEE SLRTCE STUDENT BRANCH (Deep Indigo/Violet with Philatelic Seal) */}
        {/* ========================================================================= */}
        <div 
          className="w-screen h-full flex-shrink-0 flex items-center justify-center text-white px-6 sm:px-12 lg:px-20 pt-16 pb-14 relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "url('/backgrounds/bg-purple.jpg')",
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
          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/40 via-transparent to-black/30 z-0" />

          {/* Archival Watermark */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[14vw] font-serif font-black text-white/[0.02] select-none pointer-events-none tracking-tighter leading-none">
            IEEE
          </div>

          {/* Content Layout */}
          <div className="max-w-[1360px] w-full mx-auto grid grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">
            {/* Left Column: Gazette Information */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
              {/* Postal Tag */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#FCF9F2] text-[#0A2A5E] font-mono text-[0.68rem] tracking-wider uppercase font-bold border border-[#C8B89A] shadow-xs">
                  ✦ CHARTERED BRANCH · FOLIO III
                </span>
                <span className="h-px w-6 bg-[#C8B89A]/40 hidden sm:inline-block" />
                <span className="text-amber-200/80 text-[0.72rem] font-serif uppercase tracking-wider">
                  Global Technical Consortium
                </span>
              </div>

              {/* Editorial Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white tracking-tight leading-[1.12] mb-3">
                IEEE SLRTCE <br />
                <span className="text-amber-300 font-display italic font-semibold">
                  Student Branch
                </span>
              </h2>

              {/* Narrative Text */}
              <p className="text-xs sm:text-sm lg:text-[0.95rem] text-[#F4EFE6]/90 leading-relaxed mb-6 font-light max-w-2xl">
                As part of the world's largest technical professional organization, the IEEE SLRTCE Student Branch serves as the catalyst for technical colloquiums, IEEE Xplore research access, professional networking, and student leadership development.
              </p>

              {/* Archival Register (3 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 pt-3.5 border-t border-[#C8B89A]/30">
                <div className="border-l-2 border-amber-400/60 pl-3">
                  <div className="text-[0.65rem] sm:text-[0.7rem] font-mono text-amber-300 uppercase tracking-widest mb-0.5">GLOBAL FELLOWSHIP</div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-serif">400,000+ Members</div>
                  <div className="text-[0.7rem] text-[#DDD5C7] mt-0.5 leading-snug">Uniting engineers & researchers across 160+ nations</div>
                </div>
                <div className="border-l-2 border-amber-400/60 pl-3">
                  <div className="text-[0.65rem] sm:text-[0.7rem] font-mono text-amber-300 uppercase tracking-widest mb-0.5">AUTHORITY</div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-serif">Global Standards</div>
                  <div className="text-[0.7rem] text-[#DDD5C7] mt-0.5 leading-snug">Wireless, Power, AI Ethics & autonomous systems</div>
                </div>
                <div className="border-l-2 border-amber-400/60 pl-3">
                  <div className="text-[0.65rem] sm:text-[0.7rem] font-mono text-amber-300 uppercase tracking-widest mb-0.5">SLRTCE CHAPTER</div>
                  <div className="text-xs sm:text-sm font-semibold text-white font-serif">Colloquium Host</div>
                  <div className="text-[0.7rem] text-[#DDD5C7] mt-0.5 leading-snug">Conferences, paper colloquiums & tech symposia</div>
                </div>
              </div>
            </div>

            {/* Right Column: Commemorative Philatelic Stamp Card */}
            <div className="col-span-12 lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px]">
                {/* Stamp Card */}
                <div className="stamp-card !p-3.5 bg-[#FCF9F2] text-[#0A2A5E] shadow-2xl rotate-[-1.5deg] transition-transform duration-500 hover:rotate-0">
                  {/* Top Perforation Header */}
                  <div className="flex items-center justify-between border-b border-[#C8B89A]/40 pb-1.5 mb-2 px-1 text-[0.65rem] font-mono font-bold tracking-widest text-[#0A2A5E]/80">
                    <span>COMMEMORATIVE ISSUE</span>
                    <span className="text-[#D4AF37]">IEEE EST. 1884</span>
                    <span>MUMBAI SECTION</span>
                  </div>

                  {/* Stamp Center Medallion */}
                  <div className="relative bg-[#0A2A5E] text-white p-6 rounded-xs border border-[#C8B89A] flex flex-col items-center justify-center text-center overflow-hidden">
                    {/* Radiant rays background */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300 via-transparent to-transparent pointer-events-none" />

                    {/* Iconic IEEE Diamond Emblem */}
                    <div className="relative mb-3">
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-14 h-14 sm:w-16 sm:h-16 fill-current text-[#D4AF37] drop-shadow-md relative z-10" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8l6.2 6.2-6.2 6.2-6.2-6.2L12 5.8z"/>
                      </svg>
                    </div>

                    <div className="text-xl sm:text-2xl font-bold font-display tracking-widest text-white mb-0.5">
                      IEEE SLRTCE
                    </div>
                    <div className="text-xs font-serif italic text-amber-300 mb-2">
                      Advancing Technology for Humanity
                    </div>

                    <p className="text-[0.72rem] text-blue-100/80 max-w-xs leading-relaxed font-sans">
                      Empowering student researchers with international technical standards, IEEE Xplore access, and global engineering networks.
                    </p>

                    {/* Vintage Corner Cancellation Postmark */}
                    <div className="absolute -bottom-3 -right-3 w-22 h-22 rounded-full border-2 border-dashed border-[#D4AF37]/60 flex flex-col items-center justify-center rotate-[-15deg] bg-[#0A2A5E]/95 p-1 pointer-events-none shadow-sm text-center">
                      <span className="text-[0.48rem] font-mono font-bold text-amber-300 tracking-tighter">BOMBAY SEC.</span>
                      <span className="text-[0.4rem] font-mono text-white/80">OFFICIAL</span>
                      <span className="text-[0.4rem] font-mono text-amber-300">2026</span>
                    </div>
                  </div>

                  {/* Stamp Footer Label */}
                  <div className="pt-2 px-1 flex items-center justify-between text-[#0A2A5E]">
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-xs tracking-wide">STUDENT BRANCH CHARTER</span>
                      <span className="text-[0.65rem] text-[#5A5A7A] font-sans">Region 10 (Asia-Pacific) · Bombay Section</span>
                    </div>
                    <span className="text-[0.62rem] font-mono text-[#D4AF37] font-bold border border-[#D4AF37]/50 px-1.5 py-0.5 rounded-[2px] bg-amber-50">
                      ACTIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Bottom Archival Status Bar */}
      {/* ========================================================================= */}
      <div className="absolute bottom-0 left-0 w-full z-30 px-4 sm:px-8 lg:px-16 py-2.5 bg-[#07172E]/92 backdrop-blur-md border-t border-[#C8B89A]/30 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-[0.68rem] sm:text-xs font-mono text-[#FBF7EE]/80">
            [ EXHIBIT 0{activePanel + 1} OF 03 ]
          </span>
          <div className="flex space-x-1.5">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => goToPanel(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activePanel === idx 
                    ? 'w-7 bg-[#D4AF37]' 
                    : 'w-2 bg-white/25 hover:bg-white/50'
                }`}
                aria-label={`Jump to folio ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[0.65rem] sm:text-[0.72rem] font-mono text-amber-200/80">
          <span>ONE GESTURE SNAPS TO NEXT FOLIO</span>
        </div>
      </div>
    </section>
  );
};

export default InformationScrollSection;
