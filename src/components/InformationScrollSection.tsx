import { useRef, useState, useEffect, useCallback } from 'react';

const PANEL_COUNT = 3;
const SCROLL_THRESHOLD = 30; // A very small scroll gesture is enough to trigger snap
const ANIMATION_DURATION = 2500; // Slow, cinematic panel transition (1.4 seconds)
const COOLDOWN_AFTER_ANIMATION = 400; // Extra buffer after animation ends
const TOTAL_LOCK_TIME = ANIMATION_DURATION + COOLDOWN_AFTER_ANIMATION; // 1800ms total lock

// Ghost Perforated Outline Border for Stamp Cards (Scalloped Stamp Perforation Border in Background)
const PerforatedGhostOutline = ({
  insetClass,
  opacityClass,
  idPrefix,
}: {
  insetClass: string;
  opacityClass: string;
  idPrefix: string;
}) => (
  <div className={`absolute ${insetClass} ${opacityClass} pointer-events-none -z-10 overflow-visible`}>
    <svg className="w-0 h-0 absolute pointer-events-none" aria-hidden="true">
      <defs>
        {/* Top scalloped tooth pattern: baseline at y=10, teeth arching outward to y=3 */}
        <pattern id={`${idPrefix}-top`} width="18" height="10" patternUnits="userSpaceOnUse">
          <path d="M 0 10 L 2 10 A 7 7 0 0 1 16 10 L 18 10" fill="none" stroke="white" strokeWidth="1.25" />
        </pattern>
        {/* Bottom scalloped tooth pattern: baseline at y=0, teeth arching outward to y=7 */}
        <pattern id={`${idPrefix}-bot`} width="18" height="10" patternUnits="userSpaceOnUse">
          <path d="M 0 0 L 2 0 A 7 7 0 0 0 16 0 L 18 0" fill="none" stroke="white" strokeWidth="1.25" />
        </pattern>
        {/* Left scalloped tooth pattern: baseline at x=10, teeth arching outward to x=3 */}
        <pattern id={`${idPrefix}-left`} width="10" height="18" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 10 2 A 7 7 0 0 0 10 16 L 10 18" fill="none" stroke="white" strokeWidth="1.25" />
        </pattern>
        {/* Right scalloped tooth pattern: baseline at x=0, teeth arching outward to x=7 */}
        <pattern id={`${idPrefix}-right`} width="10" height="18" patternUnits="userSpaceOnUse">
          <path d="M 0 0 L 0 2 A 7 7 0 0 1 0 16 L 0 18" fill="none" stroke="white" strokeWidth="1.25" />
        </pattern>
      </defs>
    </svg>

    {/* Top scalloped border */}
    <div className="absolute top-0 left-2.5 right-2.5 h-2.5 overflow-hidden">
      <svg className="w-full h-full">
        <rect width="100%" height="10" fill={`url(#${idPrefix}-top)`} />
      </svg>
    </div>

    {/* Bottom scalloped border */}
    <div className="absolute bottom-0 left-2.5 right-2.5 h-2.5 overflow-hidden">
      <svg className="w-full h-full">
        <rect width="100%" height="10" fill={`url(#${idPrefix}-bot)`} />
      </svg>
    </div>

    {/* Left scalloped border */}
    <div className="absolute top-2.5 bottom-2.5 left-0 w-2.5 overflow-hidden">
      <svg className="w-full h-full">
        <rect width="10" height="100%" fill={`url(#${idPrefix}-left)`} />
      </svg>
    </div>

    {/* Right scalloped border */}
    <div className="absolute top-2.5 bottom-2.5 right-0 w-2.5 overflow-hidden">
      <svg className="w-full h-full">
        <rect width="10" height="100%" fill={`url(#${idPrefix}-right)`} />
      </svg>
    </div>

    {/* 4 Corner joints */}
    <svg className="absolute top-0 left-0 w-2.5 h-2.5 pointer-events-none">
      <path d="M 2.5 10 L 2.5 2.5 L 10 2.5" fill="none" stroke="white" strokeWidth="1.25" />
    </svg>
    <svg className="absolute top-0 right-0 w-2.5 h-2.5 pointer-events-none">
      <path d="M 0 2.5 L 7.5 2.5 L 7.5 10" fill="none" stroke="white" strokeWidth="1.25" />
    </svg>
    <svg className="absolute bottom-0 left-0 w-2.5 h-2.5 pointer-events-none">
      <path d="M 2.5 0 L 2.5 7.5 L 10 7.5" fill="none" stroke="white" strokeWidth="1.25" />
    </svg>
    <svg className="absolute bottom-0 right-0 w-2.5 h-2.5 pointer-events-none">
      <path d="M 0 7.5 L 7.5 7.5 L 7.5 0" fill="none" stroke="white" strokeWidth="1.25" />
    </svg>
  </div>
);

const InformationScrollSection = () => {
  const [activePanel, setActivePanel] = useState(0);
  const activePanelRef = useRef(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const isLockedRef = useRef(false);
  const accumulatedDeltaRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Dynamically get the exact navbar height
  const getNavbarHeight = useCallback(() => {
    const header = document.querySelector('header');
    return header ? header.getBoundingClientRect().height : 65;
  }, []);

  // Check if the sticky content is currently pinned in the viewport
  const isStickyPinned = useCallback(() => {
    const outer = outerRef.current;
    if (!outer) return false;
    const rect = outer.getBoundingClientRect();
    const navbarHeight = getNavbarHeight();
    const viewportH = window.innerHeight - navbarHeight;

    // The section is "pinned" when:
    // - The top of the outer wrapper has scrolled above or to the navbar
    // - The bottom of the outer wrapper is still below the viewport
    // This means the sticky inner content is stuck to the viewport
    return rect.top <= navbarHeight && rect.bottom > navbarHeight + viewportH + 50;
  }, [getNavbarHeight]);

  // Scroll the window so the outer wrapper position matches the target panel
  const scrollToPanel = useCallback((panelIndex: number) => {
    const outer = outerRef.current;
    if (!outer) return;
    const navbarHeight = getNavbarHeight();
    const viewportH = window.innerHeight - navbarHeight;
    const totalScroll = outer.offsetHeight - viewportH;
    const zonePerPanel = totalScroll / PANEL_COUNT;

    // Scroll to the middle of this panel's zone so we're firmly inside it
    const targetScrollTop = outer.offsetTop + (panelIndex * zonePerPanel) + (zonePerPanel / 2);
    window.scrollTo({ top: targetScrollTop, behavior: 'auto' });
  }, [getNavbarHeight]);

  // Navigate to a target panel with cinematic animation and lock
  const goToPanel = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= PANEL_COUNT) return;
    if (isLockedRef.current) return;

    isLockedRef.current = true;
    accumulatedDeltaRef.current = 0;

    setActivePanel(targetIndex);
    activePanelRef.current = targetIndex;

    // Also move the scroll position to match so the outer wrapper
    // stays in the correct zone for this panel
    scrollToPanel(targetIndex);

    // Release lock after animation + cooldown
    setTimeout(() => {
      isLockedRef.current = false;
      accumulatedDeltaRef.current = 0;
    }, TOTAL_LOCK_TIME);
  }, [scrollToPanel]);

  // Wheel interception: intercept scroll when pinned, snap panels
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Ignore micro-noise from trackpads
      if (Math.abs(e.deltaY) < 5) return;

      // Only intercept when the sticky section is pinned
      if (!isStickyPinned()) return;

      // If currently locked/animating, absorb ALL wheel events
      if (isLockedRef.current) {
        e.preventDefault();
        accumulatedDeltaRef.current = 0;
        return;
      }

      if (e.deltaY > 0) {
        // Scrolling DOWN
        if (activePanelRef.current < PANEL_COUNT - 1) {
          // Not at last panel yet — prevent native scroll and accumulate
          e.preventDefault();
          accumulatedDeltaRef.current += e.deltaY;

          if (accumulatedDeltaRef.current >= SCROLL_THRESHOLD) {
            goToPanel(activePanelRef.current + 1);
          }
        } else {
          // At last panel (IEEE) — let native scroll continue to About Colloquium
          // Scroll to end of outer wrapper so sticky unsticks
          const outer = outerRef.current;
          if (outer) {
            const navbarHeight = getNavbarHeight();
            const endScrollTop = outer.offsetTop + outer.offsetHeight - (window.innerHeight - navbarHeight);
            if (window.scrollY < endScrollTop - 5) {
              e.preventDefault();
              window.scrollTo({ top: endScrollTop, behavior: 'smooth' });
            }
          }
        }
      } else if (e.deltaY < 0) {
        // Scrolling UP
        if (activePanelRef.current > 0) {
          // Not at first panel yet — prevent native scroll and accumulate
          e.preventDefault();
          accumulatedDeltaRef.current += e.deltaY;

          if (accumulatedDeltaRef.current <= -SCROLL_THRESHOLD) {
            goToPanel(activePanelRef.current - 1);
          }
        } else {
          // At first panel (Our College) — let native scroll continue back to Hero
          // Scroll to start of outer wrapper so sticky unsticks upward
          const outer = outerRef.current;
          if (outer) {
            if (window.scrollY > outer.offsetTop + 5) {
              e.preventDefault();
              window.scrollTo({ top: outer.offsetTop, behavior: 'smooth' });
            }
          }
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [goToPanel, isStickyPinned, getNavbarHeight]);

  // Sync panel state when user scrolls back from outside (e.g., from Hero or from About)
  useEffect(() => {
    const handleScroll = () => {
      if (isLockedRef.current) return;
      const outer = outerRef.current;
      if (!outer) return;

      const rect = outer.getBoundingClientRect();
      const navbarHeight = getNavbarHeight();

      // If user has scrolled above the section (back to Hero), reset to panel 0
      if (rect.top > navbarHeight + 50) {
        if (activePanelRef.current !== 0) {
          setActivePanel(0);
          activePanelRef.current = 0;
          accumulatedDeltaRef.current = 0;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getNavbarHeight]);

  // Touch handlers for mobile / tablet horizontal swipe
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
      if (deltaX < 0 && activePanelRef.current < PANEL_COUNT - 1) {
        goToPanel(activePanelRef.current + 1);
      } else if (deltaX > 0 && activePanelRef.current > 0) {
        goToPanel(activePanelRef.current - 1);
      }
    }
  };

  const folios = [
    { number: 'I', title: 'ABOUT SLRTCE', subtitle: 'Shree L. R. Tiwari College of Engineering' },
    { number: 'II', title: 'ABOUT DEPARTMENT', subtitle: 'Faculty of Engineering' },
    { number: 'III', title: 'ABOUT IEEE CHAPTER', subtitle: 'IEEE SLRTCE Chapter' },
  ];

  return (
    // OUTER WRAPPER: Tall enough so the browser can't skip past it.
    // The sticky inner content pins to the viewport while user scrolls through this height.
    <div
      id="overview"
      ref={outerRef}
      style={{
        height: `calc((100vh - 65px) * ${PANEL_COUNT + 1})`,
      }}
      className="relative scroll-mt-[65px]"
    >
      {/* STICKY INNER: Pins below navbar while the outer wrapper scrolls */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'sticky',
          top: '65px',
          height: 'calc(100vh - 65px)',
        }}
        className="w-full min-h-[600px] max-h-[1080px] overflow-hidden select-none border-t border-b border-[#C8B89A]/30"
      >
        {/* ========================================================================= */}
        {/* Top Sub-Nav Ribbon: "About slrtce", "About Department", "About IEEE chapter" */}
        {/* ========================================================================= */}
        <div className="absolute top-0 left-0 w-full z-30 px-4 sm:px-8 py-3 flex items-center justify-center bg-[#07172E]/95 backdrop-blur-md border-b border-[#C8B89A]/30">
          <div className="flex items-center space-x-6 sm:space-x-12 md:space-x-16 font-sans text-xs sm:text-sm">
            {[
              { title: 'About slrtce', idx: 0 },
              { title: 'About Department', idx: 1 },
              { title: 'About IEEE chapter', idx: 2 },
            ].map((tab) => (
              <button
                key={tab.idx}
                onClick={() => goToPanel(tab.idx)}
                className={`transition-all duration-200 cursor-pointer pb-1 border-b-2 font-medium tracking-wide ${activePanel === tab.idx
                    ? 'border-[#D4AF37] text-white font-bold'
                    : 'border-transparent text-white/60 hover:text-white/90 hover:border-white/30'
                  }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Horizontal Track: 300vw wide, snaps using CSS transform */}
        {/* ========================================================================= */}
        <div
          className="flex h-full w-[300vw] will-change-transform"
          style={{
            transform: `translateX(-${activePanel * 100}vw)`,
            transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
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
            {/* Content Layout */}
            <div className="max-w-[1520px] xl:max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 relative z-10">

              {/* Left Column: Actual College Photo with Vintage Archival Treatment (Shifted further right) */}
              <div className="w-full lg:w-[46%] xl:w-[46%] flex justify-center lg:justify-start lg:translate-x-4 xl:translate-x-8 relative">

                {/* Photo Container - Smaller Square (Decreased Length & Width) */}
                <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[460px] xl:max-w-[490px] aspect-square">
                  {/* Subtle drop shadow for depth */}
                  <div className="absolute inset-2 bg-black/30 blur-2xl z-0 rounded-sm"></div>

                  {/* Archival Torn Paper Background Frame - Square */}
                  <div className="relative z-10 w-full h-full aspect-square bg-[#E8DCC8] p-4 sm:p-5 shadow-2xl rotate-[2.5deg] transition-transform duration-700 hover:rotate-[1deg] flex flex-col"
                    style={{
                      // Jagged edge clip-path to simulate torn paper template
                      clipPath: 'polygon(1% 2%, 10% 0%, 20% 2%, 30% 0%, 40% 1%, 50% 0%, 60% 2%, 70% 0%, 80% 1%, 90% 0%, 98% 1%, 100% 10%, 99% 20%, 100% 30%, 98% 40%, 100% 50%, 99% 60%, 100% 70%, 98% 80%, 100% 90%, 99% 98%, 90% 100%, 80% 98%, 70% 100%, 60% 99%, 50% 100%, 40% 98%, 30% 100%, 20% 99%, 10% 100%, 1% 98%, 0% 90%, 1% 80%, 0% 70%, 2% 60%, 0% 50%, 1% 40%, 0% 30%, 2% 20%, 0% 10%)'
                    }}>

                    {/* The Actual Photo - Square */}
                    <div className="relative w-full h-full aspect-square overflow-hidden border border-[#C8B89A]/50 rotate-[-1deg] bg-slate-900">
                      <img
                        src="/slrtce-actual-photo.jpg"
                        alt="Shree L. R. Tiwari College of Engineering"
                        className="w-full h-full object-cover filter contrast-[1.05] saturate-[0.9] sepia-[0.05]"
                      />
                      {/* Vintage Color Wash Overlay */}
                      <div className="absolute inset-0 bg-amber-900/10 pointer-events-none mix-blend-multiply"></div>
                    </div>

                    {/* Tape 1 - Top Center */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-8 bg-[#D4C9A8]/85 shadow-sm z-20 opacity-90 backdrop-blur-sm" style={{ clipPath: 'polygon(2% 0, 98% 0, 100% 100%, 0 100%)' }}></div>

                    {/* Tape 2 - Bottom Left */}
                    <div className="absolute -bottom-4 -left-2 w-20 h-7 bg-[#D4C9A8]/85 rotate-[25deg] shadow-sm z-20 opacity-90 backdrop-blur-sm" style={{ clipPath: 'polygon(0 0, 100% 5%, 95% 100%, 5% 95%)' }}></div>
                  </div>

                  {/* Torn-Paper Label: SLRTCE */}
                  <div className="absolute -bottom-5 right-4 z-30 bg-[#F4EFE6] text-[#0A2A5E] px-4 py-1.5 shadow-lg border border-[#C8B89A]/60 rotate-[-4deg]"
                    style={{ clipPath: 'polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)' }}>
                    <span className="font-display font-extrabold text-lg tracking-widest uppercase">
                      SLRTCE
                    </span>
                  </div>

                  {/* Optional Subtle Postal Details */}
                  <div className="absolute -top-2 -left-4 z-20 text-[0.55rem] font-mono text-[#D4AF37]/80 tracking-widest rotate-[-15deg]">
                    No. 2010-ENG-MH
                  </div>
                </div>

              </div>

              {/* Right Column: Wide Landscape Postal Ticket with Top-Right ESTB 2010 Stamp (Moved lower & tilted 2 deg with perforated borders) */}
              <div className="w-full lg:w-[54%] xl:w-[54%] flex justify-center lg:justify-end lg:translate-x-2 xl:translate-x-4 translate-y-8 sm:translate-y-12 lg:translate-y-16 xl:translate-y-20">
                <div className="relative w-full max-w-[800px] lg:max-w-[880px] xl:max-w-[940px] rotate-[2deg] transition-transform duration-500">

                  {/* Concentric Perforated Stamp Borders (as marked in reference) */}
                  <PerforatedGhostOutline
                    insetClass="-inset-4 sm:-inset-5"
                    opacityClass="opacity-40"
                    idPrefix="ghost-inner"
                  />
                  <PerforatedGhostOutline
                    insetClass="-inset-8 sm:-inset-10"
                    opacityClass="opacity-20"
                    idPrefix="ghost-outer"
                  />

                  {/* Floating Circular ESTB 2010 Stamp at Top Right Corner (Untouched) */}
                  <div className="absolute -top-7 -right-4 sm:-top-8 sm:-right-6 z-30 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#B71C1C] text-white flex flex-col items-center justify-center shadow-2xl border-2 border-white/90 rotate-[-5deg] hover:rotate-0 transition-transform duration-300 pointer-events-auto">
                      <div className="w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full border border-dashed border-white/70 flex flex-col items-center justify-center p-1">
                        <span className="text-[0.6rem] sm:text-[0.65rem] font-serif tracking-widest uppercase font-bold text-white/90 leading-tight">
                          ESTB.
                        </span>
                        <span className="text-xl sm:text-2xl font-serif font-black tracking-tight leading-none text-white my-0.5">
                          2010
                        </span>
                        <span className="text-[0.65rem] text-amber-200 leading-none">★</span>
                      </div>
                    </div>
                  </div>

                  {/* Rectangle Postal Ticket Container (Stamp Card) */}
                  <div className="stamp-card w-full bg-[#F5F0E6] text-[#1A4338] relative z-10 px-6 sm:px-9 py-6 sm:py-7 shadow-2xl rounded-2xl">

                    {/* Ticket Texture Overlay */}
                    <div className="absolute inset-0 bg-[url('/backgrounds/paper-texture-clean.jpg')] opacity-25 mix-blend-multiply pointer-events-none z-0 rounded-2xl"></div>

                    {/* Main Content Layout (Vertical Stack of Horizontal Rows) */}
                    <div className="relative z-10 flex flex-col justify-between pl-2 sm:pl-4 pr-6 sm:pr-8">

                      {/* Far-left dashed stub perforation line */}
                      <div className="hidden sm:block absolute -left-1.5 top-0 bottom-0 border-l border-dashed border-[#C8B89A]/80 pointer-events-none"></div>

                      {/* 1. Title in ONE single line */}
                      <div className="flex flex-wrap items-baseline gap-2 sm:gap-2.5">
                        <h2 className="font-serif font-black text-lg sm:text-[1.45rem] lg:text-[1.65rem] text-[#1A4338] leading-tight tracking-tight">
                          Shree L. R. Tiwari College of Engineering
                        </h2>
                        <span className="font-serif font-bold text-base sm:text-lg text-[#1A4338]/85">
                          (SLRTCE)
                        </span>
                      </div>

                      {/* 2. College Info Paragraph */}
                      <p className="font-sans text-[#3D4D44] text-[0.8rem] sm:text-[0.86rem] leading-relaxed text-justify mt-2.5 sm:mt-3">
                        Shree L. R. Tiwari College of Engineering (SLRTCE) is one of the leading engineering colleges in Mumbai, Maharashtra, offering a wide range of undergraduate and postgraduate programs at an affordable fee structure with excellent placement opportunities.
                      </p>

                      {/* Horizontal Separator Line */}
                      <div className="w-full border-b border-[#C8B89A]/80 my-3.5 sm:my-4"></div>

                      {/* 3. The Three Points in a HORIZONTAL Row Below Paragraph */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 w-full">

                        {/* Point 1: Autonomous */}
                        <div className="flex items-center gap-2.5">
                          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#1A4338] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6" />
                          </svg>
                          <div className="border-l border-[#C8B89A]/80 pl-2.5">
                            <span className="font-sans font-bold text-[0.66rem] sm:text-[0.72rem] text-[#1A4338] uppercase tracking-wider leading-tight block">
                              AUTONOMOUS <br />
                              ENGINEERING COLLEGE
                            </span>
                          </div>
                        </div>

                        {/* Point 2: Affiliated */}
                        <div className="flex items-center gap-2.5">
                          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#1A4338] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div className="border-l border-[#C8B89A]/80 pl-2.5">
                            <span className="font-sans font-bold text-[0.66rem] sm:text-[0.72rem] text-[#1A4338] uppercase tracking-wider leading-tight block">
                              AFFILIATED WITH <br />
                              THE UNIVERSITY OF MUMBAI
                            </span>
                          </div>
                        </div>

                        {/* Point 3: Accredited */}
                        <div className="flex items-center gap-2.5">
                          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#1A4338] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="9" r="6" />
                            <path d="M9 14.5L7 21l5-2.5L17 21l-2-6.5" />
                            <path d="M12 7l.8 1.6 1.8.3-1.3 1.3.3 1.8-1.6-.9-1.6.9.3-1.8-1.3-1.3 1.8-.3z" fill="currentColor" />
                          </svg>
                          <div className="border-l border-[#C8B89A]/80 pl-2.5">
                            <span className="font-sans font-bold text-[0.66rem] sm:text-[0.72rem] text-[#1A4338] uppercase tracking-wider leading-tight block">
                              AICTE &amp; NAAC <br />
                              ACCREDITED
                            </span>
                          </div>
                        </div>

                      </div>

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
                    ✦ COMPUTER DEPARTMENT
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
                    ✦ IEEE SLRTCE
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
                          <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8l6.2 6.2-6.2 6.2-6.2-6.2L12 5.8z" />
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
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activePanel === idx
                    ? 'w-7 bg-[#D4AF37]'
                    : 'w-2 bg-white/25 hover:bg-white/50'
                    }`}
                  aria-label={`Jump to folio ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 text-[0.65rem] sm:text-[0.72rem] font-mono text-amber-200/80">
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationScrollSection;