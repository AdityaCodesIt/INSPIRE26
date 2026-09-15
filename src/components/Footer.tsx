import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface FooterProps {
  children?: React.ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerBarRef = useRef<HTMLDivElement>(null);

  const [navbarHeight, setNavbarHeight] = useState(58);
  const [footerBarHeight, setFooterBarHeight] = useState(56);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  useEffect(() => {
    const updateDimensions = () => {
      setViewportHeight(window.innerHeight);
      const header = document.querySelector('header');
      if (header) {
        setNavbarHeight(header.offsetHeight);
      }
      if (footerBarRef.current) {
        setFooterBarHeight(footerBarRef.current.offsetHeight);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const timer = setTimeout(updateDimensions, 250);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Track scroll through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate sliding distance:
  // When collapsed (progress <= 0.05): sheet translates down by maxTranslateY,
  // showing only the footer bar (~56px) and torn deckle edge along its top at the bottom of the viewport.
  // When expanded (progress >= 0.95): translateY is 0, sheet rises flush right below the navbar (docked).
  const maxTranslateY = Math.max(0, viewportHeight - navbarHeight - footerBarHeight);
  const yRaw = useTransform(scrollYProgress, [0.05, 0.95], [maxTranslateY, 0]);
  const y = useSpring(yRaw, { stiffness: 240, damping: 28, mass: 0.6 });

  const handleFoldDown = () => {
    if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ═══════════════════════════════════════════════════════════
  // The SVG torn deckle edge — complementary mate to the navbar torn edge
  // ═══════════════════════════════════════════════════════════
  // ═══════════════════════════════════════════════════════════
  // Crisp Torn Deckle Edge — Pure solid #0A2A5E, zero blur, zero filter
  // ═══════════════════════════════════════════════════════════
  const TornDeckleEdge = () => (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className="w-full h-7 sm:h-8 md:h-9 block overflow-visible"
    >
      {/* Crisp Solid Navy Paper Fill — exactly #0A2A5E with no blur or filter */}
      <path
        d="M 0,60 L 0,29 L 20,26.5 L 32,28.5 L 44,30 L 56,27.5 L 68,29 L 80,26 L 92,28.5 L 104,30 L 116,28 L 128,29 L 140,27.5 L 152,23 L 164,18 L 176,22.5 L 184,19 L 196,23 L 208,26 L 220,29 L 232,31 L 244,30 L 256,27.5 L 268,24 L 280,17 L 292,21 L 300,18 L 312,21 L 324,25.5 L 336,28.5 L 348,30 L 360,29 L 372,27.5 L 384,24 L 396,21 L 408,25 L 420,28 L 432,29.5 L 444,29 L 456,26.5 L 468,23 L 480,18 L 492,13 L 504,18 L 512,14 L 524,18.5 L 536,23 L 548,27 L 560,29 L 572,28 L 584,25 L 596,21.5 L 608,25.5 L 620,23.5 L 632,26 L 644,29 L 656,30.5 L 668,28.5 L 680,30 L 692,29 L 704,26.5 L 716,23 L 728,16.5 L 740,20.5 L 748,18 L 760,20.5 L 772,25 L 784,29 L 796,27.5 L 808,30 L 820,32 L 832,30.5 L 844,27.5 L 856,29 L 868,28 L 880,30 L 892,29 L 904,26.5 L 916,23 L 928,17.5 L 938,13 L 950,18.5 L 958,15 L 970,20 L 982,24.5 L 995,28 L 1008,30 L 1020,29 L 1032,27.5 L 1045,22 L 1058,25 L 1070,29 L 1082,27.5 L 1095,29.5 L 1108,29 L 1120,26.5 L 1132,22 L 1140,18.5 L 1152,23 L 1165,19 L 1178,23.5 L 1190,28 L 1202,30 L 1215,26 L 1228,28.5 L 1240,27.5 L 1252,21.5 L 1264,15.5 L 1275,20 L 1282,16 L 1295,20 L 1308,26 L 1320,29 L 1334,29 L 1345,24 L 1358,21.5 L 1370,26 L 1386,28 L 1395,25.5 L 1410,29 L 1422,27 L 1440,29 L 1440,60 Z"
        fill="#0A2A5E"
      />

      {/* Solid Navy Base Blending Strip */}
      <rect x="0" y="28" width="1440" height="32" fill="#0A2A5E" />
    </svg>
  );

  return (
    <div id="contact" ref={containerRef} className="relative h-[220vh] w-full">
      {/* Sticky Viewport — stays pinned in the window during the scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Underneath Layer: CTASection content */}
        <div className="absolute inset-0 z-0">
          {children}
        </div>

        {/* Sliding Navy Torn Paper Sheet (Footer) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-20 flex flex-col pointer-events-auto bg-[#0A2A5E]"
          style={{
            top: `${navbarHeight}px`,
            y,
          }}
        >
          {/* Torn Paper Deckle Edge — rides along the top of the rising sheet, docking flush under navbar */}
          <div
            className="absolute left-0 w-full overflow-visible pointer-events-none z-10"
            style={{ top: '0px', transform: 'translateY(calc(-100% + 4px))' }}
          >
            <TornDeckleEdge />
          </div>

          {/* Solid Navy Paper Body — exactly matching Navbar background #0A2A5E */}
          <div
            className="flex-1 relative flex flex-col justify-between bg-[#0A2A5E]"
          >
            {/* Content inside the expanded sheet (canvas for future content) */}
            <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10 p-6">
              <div className="text-white/20 text-center select-none">
                <div className="text-3xl sm:text-4xl mb-2">✦</div>
                <p className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase">
                  Content coming soon
                </p>
              </div>

              {/* Fold Down button to smoothly roll back down */}
              <button
                type="button"
                onClick={handleFoldDown}
                className="mt-6 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white/60 hover:text-white text-[10px] font-semibold tracking-wider transition-all cursor-pointer border border-white/[0.08] hover:border-white/[0.15]"
                title="Fold the paper back down"
              >
                FOLD DOWN ↓
              </button>
            </div>

            {/* Footer bar pinned at the bottom — seamless pure #0A2A5E */}
            <div
              ref={footerBarRef}
              className="w-full bg-[#0A2A5E] z-30"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
                  {/* Left: Branding */}
                  <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center space-x-2.5">
                      <img src="/slrtce-logo.png" alt="SLRTCE Logo" className="h-8 sm:h-10 w-auto object-contain" />
                      <div className="h-6 sm:h-8 w-px bg-white/30" />
                      <img src="/ieee-slrtce-logo.png" alt="IEEE SLRTCE Student Branch Logo" className="h-8 sm:h-10 w-auto object-contain" />
                    </div>
                  </div>

                  {/* Middle: Copyright */}
                  <div className="flex flex-col items-center text-center gap-2 text-[10px] sm:text-xs text-white/70">
                    <p>&copy; VIKAS 2026 — IEEE SLRTCE STUDENT BRANCH.</p>
                  </div>

                  {/* Right: Social & Actions */}
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      {[
                        { label: 'LinkedIn', icon: 'in' },
                        { label: 'Twitter', icon: 'X' },
                        { label: 'Instagram', icon: 'ig' },
                      ].map((social) => (
                        <div
                          key={social.label}
                          title={social.label}
                          className="w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-[#FF6B00] hover:text-white rounded-full cursor-pointer transition-all text-white font-bold text-[10px]"
                        >
                          {social.icon}
                        </div>
                      ))}
                    </div>
                    <a
                      href="#home"
                      onClick={handleScrollToTop}
                      className="text-[10px] font-bold text-white bg-[#FF6B00] hover:bg-[#E65A00] transition-all px-3.5 py-1.5 rounded-full shadow-sm hover:shadow active:scale-95 cursor-pointer"
                    >
                      Top ↑
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;
