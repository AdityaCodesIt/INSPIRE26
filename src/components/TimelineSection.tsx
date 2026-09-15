import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Stage {
  id: number;
  stageNumber: string;
  title: string;
  coinType: 'old-coin' | 'modern-coin' | 'upi';
  date: string;
  time?: string;
  venue: string;
  isInitiallyLit: boolean;
  activationDate: string;
  summary: string;
}

const stages: Stage[] = [
  {
    id: 1,
    stageNumber: '01',
    title: 'Abstract Screening',
    coinType: 'old-coin',
    date: 'Deadline: 26 Sep 2026',
    venue: 'Online IEEE Portal',
    isInitiallyLit: true,
    activationDate: '2026-09-01T00:00:00+05:30',
    summary:
      'Initial online screening where teams submit a structured abstract and methodology PDF aligned with any of the 9 colloquium tracks and UN SDGs.',
  },
  {
    id: 2,
    stageNumber: '02',
    title: 'Internal Evaluation',
    coinType: 'modern-coin',
    date: '3 Oct 2026',
    time: '10:00 AM – 1:00 PM',
    venue: 'SLRTCE Campus, Mira-Bhayandar',
    isInitiallyLit: false,
    activationDate: '2026-10-03T10:00:00+05:30',
    summary:
      'Shortlisted teams deliver a strict 12-minute technical defense on-campus before internal academic panels, evaluated on depth, methodology, and innovation.',
  },
  {
    id: 3,
    stageNumber: '03',
    title: 'Grand Finale & Awards',
    coinType: 'upi',
    date: '3 Oct 2026',
    time: '2:00 PM – 5:30 PM',
    venue: 'Main Auditorium, SLRTCE Campus',
    isInitiallyLit: false,
    activationDate: '2026-10-03T14:00:00+05:30',
    summary:
      'The top finalists pitch before an invited panel of external industry leaders, renowned scientists, and academicians to determine the final award winners.',
  },
];

// ── Pixel Dissolve Drawer Card ─────────────────────────────────
// Materializes directionally from the circle with white and shaded pixels
// emerging first, while the card background and milestone data appear
// strictly in lockstep (preventing any premature empty card box appearance).
const PX_COLS = 12;
const PX_ROWS = 8;
const PX_STEPS = 18;
const PX_STEP_MS = 20;

export type CardPosition = 'right' | 'above' | 'left' | 'below';

const WHITE_SHADES = [
  '#FFFFFF',
  'rgba(255, 255, 255, 0.96)',
  'rgba(255, 255, 255, 0.88)',
  'rgba(240, 248, 255, 0.94)', // Ice/Alice white
  'rgba(248, 250, 252, 0.90)', // Crisp white
  'rgba(235, 245, 255, 0.92)', // Luminous cyan-white
  'rgba(226, 232, 240, 0.86)', // Silver white
  'rgba(215, 235, 255, 0.82)', // Soft ambient white
];

interface PixelData {
  distRatio: number;
  noise: number;
  shade: string;
}

function computePixelGrid(position: CardPosition): PixelData[] {
  const pixels: PixelData[] = [];
  for (let r = 0; r < PX_ROWS; r++) {
    for (let c = 0; c < PX_COLS; c++) {
      let distRatio = 0;
      if (position === 'right') {
        distRatio = c / (PX_COLS - 1);
      } else if (position === 'left') {
        distRatio = (PX_COLS - 1 - c) / (PX_COLS - 1);
      } else if (position === 'above') {
        distRatio = (PX_ROWS - 1 - r) / (PX_ROWS - 1);
      } else {
        distRatio = r / (PX_ROWS - 1);
      }
      const pseudo = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
      const noise = (pseudo - Math.floor(pseudo) - 0.5) * 0.26;
      const shadeIndex = Math.abs(Math.floor(pseudo * 100)) % WHITE_SHADES.length;
      pixels.push({
        distRatio,
        noise,
        shade: WHITE_SHADES[shadeIndex],
      });
    }
  }
  return pixels;
}

function getClipPath(position: CardPosition, progress: number): string {
  if (progress <= 0) {
    if (position === 'right') return 'inset(0 100% 0 0 round 12px)';
    if (position === 'left') return 'inset(0 0 0 100% round 12px)';
    if (position === 'above') return 'inset(100% 0 0 0 round 12px)';
    return 'inset(0 0 100% 0 round 12px)';
  }
  if (progress >= 1) {
    return 'none';
  }
  const remaining = Math.round((1 - progress) * 1000) / 10;
  if (position === 'right') {
    return `inset(0 ${remaining}% 0 0 round 12px)`;
  } else if (position === 'left') {
    return `inset(0 0 0 ${remaining}% round 12px)`;
  } else if (position === 'above') {
    return `inset(${remaining}% 0 0 0 round 12px)`;
  } else {
    return `inset(0 0 ${remaining}% 0 round 12px)`;
  }
}

interface PixelRevealCardProps {
  isVisible: boolean;
  children: React.ReactNode;
  position?: CardPosition;
}

const PixelRevealCard: React.FC<PixelRevealCardProps> = ({
  isVisible,
  children,
  position = 'right',
}) => {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const stepRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pixelGrid = useMemo(() => computePixelGrid(position), [position]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearTimer();

    if (isVisible) {
      setMounted(true);

      const tick = () => {
        stepRef.current = Math.min(stepRef.current + 1, PX_STEPS);
        const cur = stepRef.current / PX_STEPS;
        setProgress(cur);

        if (stepRef.current < PX_STEPS) {
          timerRef.current = setTimeout(tick, PX_STEP_MS);
        }
      };
      timerRef.current = setTimeout(tick, 16);
    } else if (mounted) {
      const tick = () => {
        stepRef.current = Math.max(stepRef.current - 1, 0);
        const cur = stepRef.current / PX_STEPS;
        setProgress(cur);

        if (stepRef.current > 0) {
          timerRef.current = setTimeout(tick, PX_STEP_MS);
        } else {
          setMounted(false);
        }
      };
      timerRef.current = setTimeout(tick, 0);
    }

    return clearTimer;
  }, [isVisible, mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return null;

  let posClass = '';
  let drawerSlideInitial = { opacity: 0, x: 0, y: 0 };
  let drawerSlideAnimate = { opacity: 1, x: 0, y: 0 };
  let bridgeClass = '';
  let arrowClass = '';

  if (position === 'right') {
    posClass = 'left-[calc(100%+16px)] top-1/2 -translate-y-1/2';
    drawerSlideInitial = { opacity: 0, x: -28, y: 0 };
    drawerSlideAnimate = { opacity: 1, x: 0, y: 0 };
    bridgeClass = 'before:content-[""] before:absolute before:-left-5 before:top-0 before:bottom-0 before:w-6';
    arrowClass = 'absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[7px] border-y-transparent border-r-[8px] border-r-[#102C82] drop-shadow-sm z-20 pointer-events-none';
  } else if (position === 'left') {
    posClass = 'right-[calc(100%+16px)] top-1/2 -translate-y-1/2';
    drawerSlideInitial = { opacity: 0, x: 28, y: 0 };
    drawerSlideAnimate = { opacity: 1, x: 0, y: 0 };
    bridgeClass = 'before:content-[""] before:absolute before:-right-5 before:top-0 before:bottom-0 before:w-6';
    arrowClass = 'absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[7px] border-y-transparent border-l-[8px] border-l-[#102C82] drop-shadow-sm z-20 pointer-events-none';
  } else if (position === 'above') {
    posClass = 'bottom-[calc(100%+16px)] left-1/2 -translate-x-1/2';
    drawerSlideInitial = { opacity: 0, x: 0, y: 28 };
    drawerSlideAnimate = { opacity: 1, x: 0, y: 0 };
    bridgeClass = 'before:content-[""] before:absolute before:-bottom-5 before:left-0 before:right-0 before:h-6';
    arrowClass = 'absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[7px] border-x-transparent border-t-[8px] border-t-[#102C82] drop-shadow-sm z-20 pointer-events-none';
  } else {
    // 'below'
    posClass = 'top-[calc(100%+16px)] left-1/2 -translate-x-1/2';
    drawerSlideInitial = { opacity: 0, x: 0, y: -28 };
    drawerSlideAnimate = { opacity: 1, x: 0, y: 0 };
    bridgeClass = 'before:content-[""] before:absolute before:-top-5 before:left-0 before:right-0 before:h-6';
    arrowClass = 'absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[7px] border-x-transparent border-b-[8px] border-b-[#102C82] drop-shadow-sm z-20 pointer-events-none';
  }

  const currentClip = getClipPath(position, progress);

  return (
    <div className={`absolute ${posClass} z-50 pointer-events-auto select-none`}>
      <motion.div
        className={`relative w-72 sm:w-80 ${bridgeClass}`}
        initial={drawerSlideInitial}
        animate={drawerSlideAnimate}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Drawer Arrow pointing to circle – appears as drawer emerges */}
        <div
          className={arrowClass}
          style={{
            opacity: progress > 0.2 ? 1 : 0,
            transition: 'opacity 150ms ease-out',
          }}
        />

        {/* Dark Royal Blue Card container:
            Deep, regal royal blue gradient with vibrant blue highlight */}
        <div
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0B1D51] via-[#102C82] to-[#0A1845] text-white border border-[#4169E1]/35 shadow-[0_16px_36px_rgba(10,25,78,0.5),0_0_20px_rgba(65,105,225,0.2),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-xl transition-shadow duration-300"
          style={{
            clipPath: currentClip,
            WebkitClipPath: currentClip,
          }}
        >
          {/* Actual milestone data */}
          <div className="relative z-0">
            {children}
          </div>
        </div>

        {/* White and Shaded Pixel Frontier:
            Starts appearing at the circle with bright white and shades of white pixels
            that lead the reveal and dissolve into the card data */}
        <div
          className="absolute inset-0 z-20 pointer-events-none rounded-xl overflow-hidden"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${PX_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${PX_ROWS}, 1fr)`,
            padding: '2px',
            gap: '1px',
          }}
        >
          {pixelGrid.map((pixel, i) => {
            const threshold = pixel.distRatio + pixel.noise;
            // Active when wave reaches this pixel
            const isWhiteActive =
              progress > 0.02 &&
              progress < 0.98 &&
              progress >= threshold - 0.12 &&
              progress < threshold + 0.18;

            return (
              <div
                key={i}
                style={{
                  backgroundColor: isWhiteActive ? pixel.shade : 'transparent',
                  opacity: isWhiteActive ? 1 : 0,
                  transform: isWhiteActive ? 'scale(0.96)' : 'scale(0.7)',
                  boxShadow: isWhiteActive
                    ? '0 0 10px rgba(255, 255, 255, 0.95), inset 0 0 4px rgba(255, 255, 255, 0.8)'
                    : 'none',
                  borderRadius: '2px',
                  transition: isWhiteActive
                    ? 'opacity 50ms ease-out, transform 50ms ease-out'
                    : 'opacity 140ms ease-out, transform 140ms ease-out',
                }}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};


// Exact mathematical curve stretched lengthwise and vertically (1000 x 800 coordinate space)
// Segment 1: Circle 1 (200, 120) -> Loop around Left (40) -> Enter Circle 2 (500, 400)
const PATH_SEGMENT_1 =
  "M 145 120 " +
  "C 65 120, 40 200, 40 300 " +
  "C 40 400, 120 400, 260 400 " +
  "L 500 400";

// Segment 2: Circle 2 (500, 400) -> Horizontal Right -> Loop around Right (960) -> Enter Circle 3 (800, 680)
const PATH_SEGMENT_2 =
  "M 500 400 " +
  "L 740 400 " +
  "C 880 400, 960 430, 960 515 " +
  "C 960 615, 930 680, 850 680 " +
  "L 800 680";

const TimelineSection = () => {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  // Automatically check date every 15 seconds so stages unlock live on the exact date/time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Hovered stage for floating tooltip
  const [hoveredStageId, setHoveredStageId] = useState<number | null>(null);

  // Helper to check if a node is currently illuminated (unlocked only if date passed or initially lit)
  const isStageLighted = (stage: Stage) => {
    if (stage.isInitiallyLit) return true;
    const actDate = new Date(stage.activationDate);
    if (currentTime >= actDate) return true;
    return false;
  };

  return (
    <section
      id="schedule"
      className="py-16 md:py-24 relative overflow-hidden bg-cover bg-center border-t border-b border-orange-900/15 text-brand-navy scroll-mt-[65px] w-full max-w-full min-h-[calc(100vh-65px)] flex flex-col justify-center bg-[#F9E7B7]"
      style={{
        backgroundImage: "url('/paper-texture-clean.jpg')",
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
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/20 z-0" />

      {/* Archival Typography Watermark: TIMELINE TO VIKAS 2026. */}
      <div className="absolute left-6 sm:left-12 lg:left-20 bottom-2 sm:bottom-4 lg:bottom-5 select-none pointer-events-none z-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.2rem] xl:text-[5.8rem] font-black font-serif text-[#0A2A5E]/[0.035] uppercase tracking-tighter leading-[0.88]">
          TIMELINE <br />
          <span className="text-[#FF6B00]/[0.10] italic font-serif">TO VIKAS</span> <br />
          2026.
        </h1>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10 w-full">

        {/* Top Left Header Section */}
        <div className="max-w-3xl mb-8 lg:mb-10 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A2A5E] tracking-tight font-sans">
              Key Dates
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full my-3" />
            <p className="text-sm sm:text-base text-[#0A2A5E]/85 font-sans leading-relaxed font-medium">
              The colloquium will be conducted through three major stages, providing a progressive selection process from abstract screening to internal evaluation and finally external expert evaluation
            </p>
          </motion.div>
        </div>

        {/* DESKTOP LENGTHWISE DOTTED CANVAS (>= 1024px) */}
        <div className="hidden lg:block relative w-full max-w-[1300px] xl:max-w-[1360px] mx-auto h-[700px] sm:h-[760px] lg:h-[820px] xl:h-[880px] select-none my-6">

          {/* Archival Typography Watermark: ORGANIZED BY IEEE SLRTCE STUDENT BRANCH */}
          <div className="absolute -right-2 lg:-right-4 xl:-right-6 -top-2 lg:-top-4 xl:-top-6 select-none pointer-events-none z-0 text-right">
            <h3 className="text-5xl lg:text-[4.8rem] xl:text-[5.8rem] font-black font-display uppercase tracking-tight leading-[0.88] select-none text-right">
              <span className="text-[#0A2A5E]/[0.06] block tracking-tighter">ORGANIZED BY</span>
              <span className="text-[#C26510]/[0.18] italic block font-display my-1 tracking-tight">IEEE SLRTCE</span>
              <span className="text-[#0A2A5E]/[0.06] block tracking-tight text-2xl sm:text-3xl lg:text-[3rem] xl:text-[3.6rem] mt-2.5 lg:mt-3.5">STUDENT BRANCH</span>
            </h3>
          </div>

          {/* Exact Dashed SVG Roadmap Path ("line gap line gap") */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
            viewBox="0 0 1000 800"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Glowing underlay for active Stage 1 dashed path */}
            {isStageLighted(stages[0]) && (
              <path
                d={PATH_SEGMENT_1}
                stroke="#FF6B00"
                strokeWidth="12"
                strokeDasharray="16 12"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity="0.30"
                style={{ filter: 'blur(4px)' }}
              />
            )}

            {/* Segment 1: Circle 1 (20%, 15%) -> Loop Left (4%) -> Horizontal through Circle 2 (50%, 50%) */}
            <path
              d={PATH_SEGMENT_1}
              stroke={isStageLighted(stages[0]) ? "#FF6B00" : "rgba(10, 42, 94, 0.4)"}
              strokeWidth="5"
              strokeDasharray="16 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Glowing underlay for active Stage 2 dashed path */}
            {isStageLighted(stages[1]) && (
              <path
                d={PATH_SEGMENT_2}
                stroke="#0A2A5E"
                strokeWidth="12"
                strokeDasharray="16 12"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity="0.30"
                style={{ filter: 'blur(4px)' }}
              />
            )}

            {/* Segment 2: Circle 2 (50%, 50%) -> Horizontal Right -> Loop Right (96%) -> Enter Circle 3 (80%, 85%) */}
            <path
              d={PATH_SEGMENT_2}
              stroke={isStageLighted(stages[1]) ? "#0A2A5E" : "rgba(10, 42, 94, 0.35)"}
              strokeWidth="5"
              strokeDasharray="16 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* POINT 1: Old Coin of India at (20%, 15%) */}
          <div
            className="absolute left-[20%] top-[15%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
            onMouseEnter={() => setHoveredStageId(1)}
            onMouseLeave={() => setHoveredStageId(null)}
          >
            <div className="relative">
              {/* Lighting Aura */}
              {isStageLighted(stages[0]) && (
                <>
                  <div className="absolute -inset-3 rounded-full bg-orange-500/25 blur-lg animate-pulse" />
                  <div className="absolute -inset-1.5 rounded-full border-2 border-orange-500/40 animate-ping opacity-25 pointer-events-none" />
                </>
              )}

              {/* Coin Container */}
              <motion.div
                className={`w-26 h-26 sm:w-28 sm:h-28 xl:w-30 xl:h-30 rounded-full border-4 transition-all duration-300 relative overflow-hidden flex items-center justify-center bg-[#F9E7B7] shadow-xl ${isStageLighted(stages[0])
                  ? 'border-[#FF6B00] shadow-[0_0_28px_rgba(255,107,0,0.5)] scale-105'
                  : 'border-[#4A4740] bg-[#2E2D2A] shadow-lg'
                  }`}
                whileHover={{ scale: 1.08, rotate: 3 }}
              >
                <img
                  src="/timeline/old-indian-coin.jpg"
                  alt="Old Coin of India"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>

              {/* Floating Hover Info Card – Pixel Dissolve Drawer (Opens Right) */}
              <PixelRevealCard isVisible={hoveredStageId === 1} position="right">
                <div className="p-4 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wider">
                      Stage 01 • Online
                    </span>
                    <span className="text-[10px] text-blue-200/80 font-semibold font-mono">26 Sep 2026</span>
                  </div>
                  <h5 className="font-bold text-sm text-white mb-1">
                    {stages[0].title}
                  </h5>
                  <p className="text-xs text-blue-100/90 leading-relaxed font-sans">
                    {stages[0].summary}
                  </p>
                </div>
              </PixelRevealCard>
            </div>

            {/* Clean Label: Milestone Title & Date Only */}
            <div className="mt-3 text-center max-w-[210px]">
              <h4 className="font-bold text-[#0A2A5E] text-base sm:text-lg font-sans leading-tight">
                {stages[0].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#0A2A5E]/75 font-sans mt-1 font-medium">
                {stages[0].date}
              </p>
            </div>
          </div>

          {/* POINT 2: Modern 2010–2020 Coin at (50%, 50%) */}
          <div
            className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
            onMouseEnter={() => setHoveredStageId(2)}
            onMouseLeave={() => setHoveredStageId(null)}
          >
            <div className="relative">
              {isStageLighted(stages[1]) && (
                <div className="absolute -inset-3 rounded-full bg-blue-500/25 blur-lg animate-pulse" />
              )}

              {/* Coin Container */}
              <motion.div
                className={`w-26 h-26 sm:w-28 sm:h-28 xl:w-30 xl:h-30 rounded-full border-4 transition-all duration-300 relative overflow-hidden flex items-center justify-center shadow-xl ${isStageLighted(stages[1])
                  ? 'border-[#0A2A5E] shadow-[0_0_28px_rgba(10,42,94,0.4)] scale-105 brightness-100 opacity-100 bg-white'
                  : 'border-[#4A4740] bg-[#2E2D2A] shadow-lg'
                  }`}
                whileHover={{ scale: 1.05 }}
              >
                {isStageLighted(stages[1]) ? (
                  <img
                    src="/timeline/modern-coin-2011.png"
                    alt="Coin from 2010-2020"
                    className="w-full h-full object-contain p-1 rounded-full"
                  />
                ) : (
                  <div className="relative w-full h-full bg-[#2E2D2A] flex items-center justify-center">
                    <img
                      src="/timeline/Indian_20_Rupee_coin_Reverse.png"
                      alt="Coin from 2010-2020"
                      className="w-full h-full object-contain p-1 rounded-full opacity-25"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg
                        className="w-7 h-7 text-white/60"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Floating Hover Info Card – Pixel Dissolve Drawer (Hovers Above) */}
              <PixelRevealCard isVisible={hoveredStageId === 2} position="above">
                <div className="p-4 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-cyan-300 bg-cyan-400/15 px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wider">
                      Stage 02 • On-Campus
                    </span>
                    <span className="text-[10px] text-blue-200/80 font-semibold font-mono">3 Oct 2026</span>
                  </div>
                  <h5 className="font-bold text-sm text-white mb-1">
                    {stages[1].title}
                  </h5>
                  <p className="text-xs text-blue-100/90 leading-relaxed font-sans">
                    {stages[1].summary}
                  </p>
                </div>
              </PixelRevealCard>
            </div>

            {/* Clean Label: Title and Date Only */}
            <div className="mt-3 text-center max-w-[210px]">
              <h4 className="font-bold text-[#0A2A5E] text-base sm:text-lg font-sans leading-tight">
                {stages[1].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#0A2A5E]/75 font-sans mt-1 font-medium">
                {stages[1].date}
              </p>
            </div>
          </div>

          {/* POINT 3: UPI Symbol at (80%, 85%) */}
          <div
            className="absolute left-[80%] top-[85%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
            onMouseEnter={() => setHoveredStageId(3)}
            onMouseLeave={() => setHoveredStageId(null)}
          >
            <div className="relative">
              {isStageLighted(stages[2]) && (
                <div className="absolute -inset-3 rounded-full bg-emerald-500/25 blur-lg animate-pulse" />
              )}

              {/* UPI Medallion Container */}
              <motion.div
                className={`w-26 h-26 sm:w-28 sm:h-28 xl:w-30 xl:h-30 rounded-full border-4 transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center shadow-xl ${isStageLighted(stages[2])
                  ? 'border-emerald-600 bg-white shadow-[0_0_28px_rgba(13,148,136,0.45)] scale-105 brightness-100 opacity-100 p-2.5'
                  : 'border-[#4A4740] bg-[#2E2D2A] shadow-lg p-0'
                  }`}
                whileHover={{ scale: 1.05 }}
              >
                {isStageLighted(stages[2]) ? (
                  <img
                    src="/timeline/upi-logo.svg"
                    alt="UPI Symbol"
                    className="w-[85%] h-auto object-contain my-auto drop-shadow-sm"
                  />
                ) : (
                  <div className="relative w-full h-full bg-[#2E2D2A] flex items-center justify-center">
                    <img
                      src="/timeline/upi-logo.svg"
                      alt="UPI Symbol"
                      className="w-[85%] h-auto object-contain my-auto opacity-25"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg
                        className="w-7 h-7 text-white/60"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Floating Hover Info Card – Pixel Dissolve Drawer (Opens Left) */}
              <PixelRevealCard isVisible={hoveredStageId === 3} position="left">
                <div className="p-4 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-emerald-300 bg-emerald-400/15 px-2 py-0.5 rounded-full border border-emerald-400/30 uppercase tracking-wider">
                      Stage 03 • Grand Finale
                    </span>
                    <span className="text-[10px] text-blue-200/80 font-semibold font-mono">3 Oct 2026</span>
                  </div>
                  <h5 className="font-bold text-sm text-white mb-1">
                    {stages[2].title}
                  </h5>
                  <p className="text-xs text-blue-100/90 leading-relaxed font-sans">
                    {stages[2].summary}
                  </p>
                </div>
              </PixelRevealCard>
            </div>

            {/* Clean Label: Title and Date Only */}
            <div className="mt-3 text-center max-w-[210px]">
              <h4 className="font-bold text-[#0A2A5E] text-base sm:text-lg font-sans leading-tight">
                {stages[2].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#0A2A5E]/75 font-sans mt-1 font-medium">
                {stages[2].date}
              </p>
            </div>
          </div>

        </div>

        {/* MOBILE & TABLET LAYOUT (< 1024px) */}
        <div className="lg:hidden flex flex-col gap-10 my-6 relative">
          {/* Vertical Connecting Dashed Line */}
          <div className="absolute left-[35px] top-8 bottom-8 w-0.5 border-l-2 border-dashed border-[#0A2A5E]/35 z-0" />

          {stages.map((stage) => {
            const lighted = isStageLighted(stage);
            return (
              <div
                key={stage.id}
                className="flex items-start gap-4 sm:gap-6 relative z-10 cursor-pointer"
                onClick={() => setHoveredStageId(hoveredStageId === stage.id ? null : stage.id)}
              >
                {/* Coin Node */}
                <div className="relative shrink-0">
                  <div
                    className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full border-3.5 transition-all duration-300 relative overflow-hidden flex items-center justify-center ${lighted
                      ? 'border-[#FF6B00] shadow-[0_0_18px_rgba(255,107,0,0.5)] scale-105 bg-white'
                      : 'border-[#4A4740] bg-[#2E2D2A] shadow-md'
                      }`}
                  >
                    {lighted ? (
                      <>
                        {stage.coinType === 'old-coin' && (
                          <img
                            src="/timeline/old-indian-coin.jpg"
                            alt="Old Coin"
                            className="w-full h-full object-cover rounded-full"
                          />
                        )}
                        {stage.coinType === 'modern-coin' && (
                          <img
                            src="/timeline/modern-coin-2011.png"
                            alt="2010-2020 Coin"
                            className="w-full h-full object-contain p-1 rounded-full"
                          />
                        )}
                        {stage.coinType === 'upi' && (
                          <div className="w-full h-full bg-white flex items-center justify-center p-2 rounded-full">
                            <img
                              src="/timeline/upi-logo.svg"
                              alt="UPI Logo"
                              className="w-[85%] h-auto object-contain"
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="relative w-full h-full bg-[#2E2D2A] flex items-center justify-center">
                        {stage.coinType === 'old-coin' && (
                          <img
                            src="/timeline/old-indian-coin.jpg"
                            alt="Old Coin"
                            className="w-full h-full object-cover rounded-full opacity-25"
                          />
                        )}
                        {stage.coinType === 'modern-coin' && (
                          <img
                            src="/timeline/modern-coin-2011.png"
                            alt="2010-2020 Coin"
                            className="w-full h-full object-contain p-1 rounded-full opacity-25"
                          />
                        )}
                        {stage.coinType === 'upi' && (
                          <div className="w-full h-full flex items-center justify-center p-1 rounded-full">
                            <img
                              src="/timeline/upi-logo.svg"
                              alt="UPI Logo"
                              className="w-[85%] h-auto object-contain opacity-25"
                            />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <svg
                            className="w-5 h-5 text-white/60"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="5" y="11" width="14" height="10" rx="2" />
                            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Header */}
                <div className="flex-grow pt-1">
                  <h4 className="font-bold text-[#0A2A5E] text-base sm:text-lg font-sans">
                    {stage.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#0A2A5E]/80 mt-0.5 font-medium">
                    {stage.date}
                  </p>

                  {/* Expandable summary on mobile tap */}
                  {hoveredStageId === stage.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2.5 p-3 rounded-xl bg-[#0A2A5E] text-white text-xs leading-relaxed"
                    >
                      {stage.summary}
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
