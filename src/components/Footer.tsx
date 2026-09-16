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
  const [deckleHeight, setDeckleHeight] = useState(28);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );

  const deckleRef = useRef<HTMLDivElement>(null);

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
      if (deckleRef.current) {
        setDeckleHeight(deckleRef.current.offsetHeight);
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

  // Decrease footer height so the torn papers meet cleanly without overlapping
  const dockedTop = navbarHeight;
  const maxTranslateY = Math.max(0, viewportHeight - dockedTop - footerBarHeight - deckleHeight);
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
  // Realistic Hand-Torn Paper Deckle Edge — EXACT COMPLEMENTARY PIECE TO NAVBAR
  // Derived directly from Navbar's torn contour so the two pieces fit together like a single torn sheet
  // ═══════════════════════════════════════════════════════════
  const TornDeckleEdge = () => (
    <svg
      viewBox="0 0 1440 45"
      preserveAspectRatio="none"
      className="w-full h-6 sm:h-7 md:h-8 block"
      style={{
        filter: 'drop-shadow(0 -3px 3px rgba(10, 42, 94, 0.16)) drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.08))',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      <defs>
        {/* Cellulose pulp displacement filter — identical seed and frequency to navbar */}
        <filter id="footer-torn-roughness" x="-2%" y="-15%" width="104%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.14 0.22" numOctaves={5} seed={83} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={3.2} xChannelSelector="R" yChannelSelector="G" result="displaced" />
        </filter>
      </defs>

      {/* Layer 1: Exposed Unbleached Paper Core Deckle Fringe — complementary raw paper pulp extending 2.5px past navy sheet, closing at y=35 */}
      <path
        d="M 0,35 L 0,14 L 20,16.5 L 32,14.5 L 44,13 L 56,15.5 L 68,13.5 L 80,17 L 92,14.5 L 104,12.5 L 116,15 L 128,13.5 L 140,15.5 L 152,20.5 L 164,25 L 176,20.5 L 184,24 L 196,20 L 208,16.5 L 220,13.5 L 232,11.5 L 244,12.5 L 256,15.5 L 268,19.5 L 280,26 L 292,22 L 300,25 L 312,22 L 324,17 L 336,14.5 L 348,12.5 L 360,14 L 372,15.5 L 384,19.5 L 396,22 L 408,18 L 420,14.5 L 432,13 L 444,13.5 L 456,16.5 L 468,20.5 L 480,25.5 L 492,30 L 504,25 L 512,28 L 524,24.5 L 536,19.5 L 548,16 L 560,13.5 L 572,14.5 L 584,18.5 L 596,21 L 608,17.5 L 620,19.5 L 632,16.5 L 644,13.5 L 656,12 L 668,14.5 L 680,12.5 L 692,13.5 L 704,16.5 L 716,20.5 L 728,26.5 L 740,22.5 L 748,25 L 760,22 L 772,17.5 L 784,13.5 L 796,15 L 808,12.5 L 820,10.5 L 832,12 L 844,15.5 L 856,13.5 L 868,15 L 880,12.5 L 892,13.5 L 904,16.5 L 916,20.5 L 928,25.5 L 938,29.5 L 950,24.5 L 958,27.5 L 970,22.5 L 982,18 L 995,15 L 1008,12.5 L 1020,13.5 L 1032,15.5 L 1045,20.5 L 1058,17.5 L 1070,13.5 L 1082,15.5 L 1095,13 L 1108,14.5 L 1120,16.5 L 1132,21.5 L 1140,24 L 1152,20.5 L 1165,23.5 L 1178,19.5 L 1190,14.5 L 1202,12.5 L 1215,16.5 L 1228,14 L 1240,15.5 L 1252,21.5 L 1264,27 L 1275,23.5 L 1282,26 L 1295,22.5 L 1308,17 L 1320,13.5 L 1334,14.5 L 1345,19.5 L 1358,21 L 1370,17 L 1386,14.5 L 1395,17.5 L 1410,14 L 1422,16 L 1440,13.5 L 1440,35 Z"
        fill="#F8E7BE"
        opacity={0.95}
        filter="url(#footer-torn-roughness)"
      />

      {/* Layer 2: Main Dark Blue Navy Paper (#0A2A5E) — EXACT matching contour of Navbar Layer 2 */}
      <path
        d="M 0,45 L 0,16.5 L 20,19 L 32,17 L 44,15.5 L 56,18 L 68,16 L 80,19.5 L 92,17 L 104,15 L 116,17.5 L 128,16 L 140,18 L 152,23 L 164,27.5 L 176,23 L 184,26.5 L 196,22.5 L 208,19 L 220,16 L 232,14 L 244,15 L 256,18 L 268,22 L 280,28.5 L 292,24.5 L 300,27.5 L 312,24.5 L 324,19.5 L 336,17 L 348,15 L 360,16.5 L 372,18 L 384,22 L 396,24.5 L 408,20.5 L 420,17 L 432,15.5 L 444,16 L 456,19 L 468,23 L 480,28 L 492,32.5 L 504,27.5 L 512,30.5 L 524,27 L 536,22 L 548,18.5 L 560,16 L 572,17 L 584,21 L 596,23.5 L 608,20 L 620,22 L 632,19 L 644,16 L 656,14.5 L 668,17 L 680,15 L 692,16 L 704,19 L 716,23 L 728,29 L 740,25 L 748,27.5 L 760,24.5 L 772,20 L 784,16 L 796,17.5 L 808,15 L 820,13 L 832,14.5 L 844,18 L 856,16 L 868,17.5 L 880,15 L 892,16 L 904,19 L 916,23 L 928,28 L 938,32 L 950,27 L 958,30 L 970,25 L 982,20.5 L 995,17.5 L 1008,15 L 1020,16 L 1032,18 L 1045,23 L 1058,20 L 1070,16 L 1082,18 L 1095,15.5 L 1108,17 L 1120,19 L 1132,24 L 1140,26.5 L 1152,23 L 1165,26 L 1178,22 L 1190,17 L 1202,15 L 1215,19 L 1228,16.5 L 1240,18 L 1252,24 L 1264,29.5 L 1275,26 L 1282,28.5 L 1295,25 L 1308,19.5 L 1320,16 L 1334,17 L 1345,22 L 1358,23.5 L 1370,19.5 L 1386,17 L 1395,20 L 1410,16.5 L 1422,18.5 L 1440,16 L 1440,45 Z"
        fill="#0A2A5E"
        filter="url(#footer-torn-roughness)"
      />

      {/* Layer 3: Paper Edge Bevel — OPEN path tracing the exact complementary torn fracture */}
      <path
        d="M 0,16.5 L 20,19 L 32,17 L 44,15.5 L 56,18 L 68,16 L 80,19.5 L 92,17 L 104,15 L 116,17.5 L 128,16 L 140,18 L 152,23 L 164,27.5 L 176,23 L 184,26.5 L 196,22.5 L 208,19 L 220,16 L 232,14 L 244,15 L 256,18 L 268,22 L 280,28.5 L 292,24.5 L 300,27.5 L 312,24.5 L 324,19.5 L 336,17 L 348,15 L 360,16.5 L 372,18 L 384,22 L 396,24.5 L 408,20.5 L 420,17 L 432,15.5 L 444,16 L 456,19 L 468,23 L 480,28 L 492,32.5 L 504,27.5 L 512,30.5 L 524,27 L 536,22 L 548,18.5 L 560,16 L 572,17 L 584,21 L 596,23.5 L 608,20 L 620,22 L 632,19 L 644,16 L 656,14.5 L 668,17 L 680,15 L 692,16 L 704,19 L 716,23 L 728,29 L 740,25 L 748,27.5 L 760,24.5 L 772,20 L 784,16 L 796,17.5 L 808,15 L 820,13 L 832,14.5 L 844,18 L 856,16 L 868,17.5 L 880,15 L 892,16 L 904,19 L 916,23 L 928,28 L 938,32 L 950,27 L 958,30 L 970,25 L 982,20.5 L 995,17.5 L 1008,15 L 1020,16 L 1032,18 L 1045,23 L 1058,20 L 1070,16 L 1082,18 L 1095,15.5 L 1108,17 L 1120,19 L 1132,24 L 1140,26.5 L 1152,23 L 1165,26 L 1178,22 L 1190,17 L 1202,15 L 1215,19 L 1228,16.5 L 1240,18 L 1252,24 L 1264,29.5 L 1275,26 L 1282,28.5 L 1295,25 L 1308,19.5 L 1320,16 L 1334,17 L 1345,22 L 1358,23.5 L 1370,19.5 L 1386,17 L 1395,20 L 1410,16.5 L 1422,18.5 L 1440,16"
        stroke="#061B3B"
        strokeWidth={0.65}
        fill="none"
        filter="url(#footer-torn-roughness)"
      />

      {/* Layer 4: Exposed Pure White Cotton Cellulose Fibers — identical fracture positions */}
      <path
        d="M 1358,23.5 L 1345,25 M 1295,25 L 1282,30 M 1264,29.5 L 1252,25 M 1178,22 L 1165,27 M 970,25 L 958,31.5 M 938,32 L 928,29 M 760,24.5 L 748,28.5 M 728,29 L 716,24 M 536,22 L 524,28.5 M 512,30.5 L 492,33.5 M 396,24.5 L 384,23 M 312,24.5 L 300,29 M 196,22.5 L 184,28 M 164,27.5 L 152,24"
        stroke="rgba(255, 255, 255, 0.75)"
        strokeWidth={0.8}
        fill="none"
        filter="url(#footer-torn-roughness)"
      />

      {/* Layer 5: Paper Surface Light Highlights along Fractured Ridges — identical ridge positions */}
      <path
        d="M 1440,16 L 1410,16.5 M 1370,19.5 L 1358,23.5 M 1240,18 L 1202,15 M 1120,19 L 1070,16 M 904,19 L 880,15 M 844,18 L 820,13 M 704,19 L 656,14.5 M 584,21 L 560,16 M 444,16 L 420,17 M 256,18 L 232,14 M 128,16 L 92,17"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth={0.75}
        fill="none"
        filter="url(#footer-torn-roughness)"
      />
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
          className="absolute inset-x-0 bottom-0 z-20 flex flex-col pointer-events-auto"
          style={{
            top: `${dockedTop}px`,
            y,
          }}
        >
          {/* Torn Paper Deckle Edge — aligned at the very top of the sliding sheet */}
          <div
            ref={deckleRef}
            className="relative w-full overflow-visible pointer-events-none z-0"
          >
            <TornDeckleEdge />
          </div>

          {/* Solid Navy Paper Body — slight -mt-2 overlaps the SVG bottom cleanly */}
          <div
            className="flex-1 relative z-10 flex flex-col justify-between bg-[#0A2A5E] -mt-2"
          >
            {/* Content inside the expanded sheet (Our Technical Team) */}
            <div className="flex-1 w-full flex flex-col items-center justify-start pt-3 sm:pt-5 pb-6 relative z-10 px-4 max-w-[1440px] mx-auto overflow-y-auto">
              {/* Heading & Fold Down control */}
              <div className="order-0 flex items-center justify-center gap-3 mb-3 sm:mb-6 md:mb-8 relative w-full max-w-[1100px]">
                <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-wide text-center">
                  Our Technical Team
                </h2>
              </div>

              {/* Row 1: 4 Slots with LinkedIn, GitHub, and Instagram icon circles below each slot */}
              <div className="order-2 sm:order-1 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 w-full max-w-[1100px] mb-4 sm:mb-8 md:mb-10">
                {[1, 2, 3, 4].map((slot) => (
                  <div key={slot} className="w-full flex flex-col items-center">
                    <div className="w-full aspect-[1581/995] rounded-lg border border-dashed border-white/15 bg-white/[0.02] flex items-center justify-center">
                      <span className="text-white/20 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase">
                        Slot {slot}
                      </span>
                    </div>
                    {/* Social Icon Circles for upcoming member */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                      <a
                        href="#"
                        aria-label={`Slot ${slot} LinkedIn`}
                        className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-[#0077B5] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                      >
                        <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        aria-label={`Slot ${slot} GitHub`}
                        className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-[#24292e] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                      >
                        <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        aria-label={`Slot ${slot} Instagram`}
                        className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                      >
                        <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2: 3 Frame Images — First one full-width, next two side-by-side on mobile */}
              <div className="order-1 sm:order-2 w-full max-w-[860px] flex flex-col">
                {/* First member — centered, large on mobile only (appears FIRST on mobile via order) */}
                {(() => {
                  const member = {
                    name: 'Adityakumar Pandey',
                    src: '/frame/Aditya_frame_Bg.png',
                    linkedin: '#',
                    github: '#',
                    instagram: '#',
                  };
                  return (
                    <div className="flex justify-center mb-4 sm:hidden">
                      <div className="w-full max-w-[280px] flex flex-col items-center">
                        <img
                          src={member.src}
                          alt={member.name}
                          loading="lazy"
                          className="w-full h-auto block select-none pointer-events-none"
                        />
                        <div className="flex items-center justify-center gap-2 mt-1.5 sm:mt-2">
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title={`${member.name} on LinkedIn`} className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-[#0077B5] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer">
                            <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74v-8.37H5.07v8.37h2.78z" /></svg>
                          </a>
                          <a href={member.github} target="_blank" rel="noopener noreferrer" title={`${member.name} on GitHub`} className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-[#24292e] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer">
                            <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                          </a>
                          <a href={member.instagram} target="_blank" rel="noopener noreferrer" title={`${member.name} on Instagram`} className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer">
                            <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Remaining two members — side-by-side on mobile, part of 3-col on sm+ */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-7 sm:hidden">
                  {[
                    {
                      name: 'Ankush Pal',
                      src: '/frame/Ankush_frame_Bg.png',
                      linkedin: '#',
                      github: '#',
                      instagram: '#',
                    },
                    {
                      name: 'Divakar Navik',
                      src: '/frame/Divakar_frame_Bg.png',
                      linkedin: '#',
                      github: '#',
                      instagram: '#',
                    },
                  ].map((member) => (
                    <div key={member.name} className="w-full flex flex-col items-center">
                      <img
                        src={member.src}
                        alt={member.name}
                        className="w-full h-auto block select-none pointer-events-none"
                      />
                      <div className="flex items-center justify-center gap-1.5 mt-1.5">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title={`${member.name} on LinkedIn`} className="w-5 h-5 rounded-full bg-white/10 hover:bg-[#0077B5] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer">
                          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74v-8.37H5.07v8.37h2.78z" /></svg>
                        </a>
                        <a href={member.github} target="_blank" rel="noopener noreferrer" title={`${member.name} on GitHub`} className="w-5 h-5 rounded-full bg-white/10 hover:bg-[#24292e] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer">
                          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                        </a>
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" title={`${member.name} on Instagram`} className="w-5 h-5 rounded-full bg-white/10 hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer">
                          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: all 3 in a row (sm+) */}
                <div className="hidden sm:grid sm:grid-cols-3 gap-5 md:gap-7">
                  {[
                    {
                      name: 'Adityakumar Pandey',
                      src: '/frame/Aditya_frame_Bg.png',
                      linkedin: '#',
                      github: '#',
                      instagram: '#',
                    },
                    {
                      name: 'Ankush Pal',
                      src: '/frame/Ankush_frame_Bg.png',
                      linkedin: '#',
                      github: '#',
                      instagram: '#',
                    },
                    {
                      name: 'Divakar Navik',
                      src: '/frame/Divakar_frame_Bg.png',
                      linkedin: '#',
                      github: '#',
                      instagram: '#',
                    },
                  ].map((member) => (
                    <div key={member.name} className="w-full flex flex-col items-center">
                      <img
                        src={member.src}
                        alt={member.name}
                        className="w-full h-auto block select-none pointer-events-none"
                      />
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title={`${member.name} on LinkedIn`} className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#0077B5] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74v-8.37H5.07v8.37h2.78z" /></svg>
                        </a>
                        <a href={member.github} target="_blank" rel="noopener noreferrer" title={`${member.name} on GitHub`} className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#24292e] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                        </a>
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" title={`${member.name} on Instagram`} className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer bar pinned at the bottom — seamless pure #0A2A5E */}
            <div
              ref={footerBarRef}
              className="w-full bg-[#0A2A5E] z-30"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-2.5 sm:py-3.5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
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
