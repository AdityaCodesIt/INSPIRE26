import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Stage {
  id: number;
  stageNumber: string;
  title: string;
  coinType: 'old-coin' | 'ppt' | 'upi' | 'modern-coin' | 'trophy';
  date: string;
  time?: string;
  venue: string;
  isInitiallyLit: boolean;
  activationDate: string;
  summary: string;
  note?: string;
}

const stages: Stage[] = [
  {
    id: 1,
    stageNumber: '01',
    title: 'Registration & Idea Submission',
    coinType: 'old-coin',
    date: 'Deadline: 26 Sep 2026',
    venue: 'Online IEEE Portal',
    isInitiallyLit: true,
    activationDate: '2026-09-01T00:00:00+05:30',
    summary:
      'Initial registration where teams submit their project idea, structured abstract, and methodology PDF aligned with any of the 9 colloquium tracks and UN SDGs.',
  },
  {
    id: 2,
    stageNumber: '02',
    title: 'PPT Evaluation Result',
    coinType: 'ppt',
    date: 'Deadline: 28 Sep 2026',
    venue: 'Online Review Portal',
    isInitiallyLit: false,
    activationDate: '2026-09-27T00:00:00+05:30',
    summary:
      'Official declaration of PPT evaluation results and technical review scores for shortlisted teams qualified for the next round.',
  },
  {
    id: 3,
    stageNumber: '03',
    title: 'Payment',
    coinType: 'upi',
    date: 'Deadline: 30 Sep 2026',
    note: 'Payment only for selected teams',
    time: '(Payment only for selected teams)',
    venue: 'Online Payment Gateway',
    isInitiallyLit: false,
    activationDate: '2026-09-29T00:00:00+05:30',
    summary:
      'Final participation fee submission and slot confirmation exclusively for shortlisted finalist teams qualified for the on-campus colloquium rounds.',
  },
  {
    id: 4,
    stageNumber: '04',
    title: 'Internal Evaluation',
    coinType: 'modern-coin',
    date: '3 Oct 2026',
    time: 'Tentative Event Timing: 9:00 AM – 5:00 PM',
    venue: 'SLRTCE Campus, Mira-Bhayandar',
    isInitiallyLit: false,
    activationDate: '2026-10-03T09:00:00+05:30',
    summary:
      'Shortlisted teams deliver a strict 12-minute technical defense on-campus before internal academic panels, evaluated on depth, methodology, and innovation.',
  },
  {
    id: 5,
    stageNumber: '05',
    title: 'Grand Finale & Awards',
    coinType: 'trophy',
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

export type CardPosition = 'right' | 'above' | 'left' | 'below' | 'inline';

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
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(145);

  useEffect(() => {
    if (contentRef.current) {
      const h = contentRef.current.scrollHeight;
      if (h > 0) setContentHeight(h);
    }
  }, [children, mounted]);

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
          // Allow full 140ms for the final white trails at the coin to finish fading out
          timerRef.current = setTimeout(() => {
            setMounted(false);
          }, 140);
        }
      };
      timerRef.current = setTimeout(tick, 0);
    }

    return clearTimer;
  }, [isVisible, mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return null;

  // Mobile / inline accordion drawer mode:
  // Height is perfectly synchronized with progress and contentHeight, so white trails wave in full view
  // When fully open, overflow is visible to allow the full 36px blue drop shadow and arrow to render cleanly
  if (position === 'inline') {
    const inlineClip = getClipPath('inline', progress);
    const isFullyOpen = progress >= 1 && isVisible;
    const computedHeight = isFullyOpen ? 'auto' : `${Math.round(progress * contentHeight)}px`;
    const computedMargin = `${Math.round(progress * 10)}px`;

    return (
      <div
        className={`relative w-full z-30 pointer-events-auto select-none px-3 -mx-3 pb-3 -mb-3 ${
          isFullyOpen ? 'overflow-visible' : 'overflow-hidden'
        }`}
        style={{
          height: computedHeight,
          marginTop: computedMargin,
        }}
      >
        <div ref={contentRef} className="relative w-full pt-2">
          {/* Drawer Arrow pointing to circle – unclipped, with drop shadow pointing to coin */}
          <div
            className="absolute -top-1.5 left-6 w-0 h-0 border-x-[7px] border-x-transparent border-b-[8px] border-b-[#102C82] drop-shadow-sm z-20 pointer-events-none"
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
              clipPath: inlineClip,
              WebkitClipPath: inlineClip,
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
        </div>
      </div>
    );
  }

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
// Node Centers:
// Node 1: (110, 170)  -> left-[11%] top-[21.25%]
// Node 2: (295, 400)  -> left-[29.5%] top-[50%]
// Node 3: (485, 185)  -> left-[48.5%] top-[23.125%]
// Node 4: (680, 415)  -> left-[68%] top-[51.875%]
// Node 5: (875, 625)  -> left-[87.5%] top-[78.125%]

const ENTRY_PATH = "M 40 170 L 110 170";
const PATH_SEGMENT_1 = "M 110 170 C 205 170, 200 400, 295 400";
const PATH_SEGMENT_2 = "M 295 400 C 390 400, 390 185, 485 185";
const PATH_SEGMENT_3 = "M 485 185 C 585 185, 580 415, 680 415";
const PATH_SEGMENT_4 = "M 680 415 C 780 415, 775 625, 875 625";
const EXIT_PATH = "M 875 625 L 960 625";

const FULL_ROADMAP_PATH =
  "M 40 170 L 110 170 " +
  "C 205 170, 200 400, 295 400 " +
  "C 390 400, 390 185, 485 185 " +
  "C 585 185, 580 415, 680 415 " +
  "C 780 415, 775 625, 875 625 " +
  "L 960 625";

const renderCoinVisual = (stage: Stage, isLit: boolean) => {
  if (isLit) {
    if (stage.coinType === 'old-coin') {
      return (
        <img
          src="/timeline/old-indian-coin.jpg"
          alt="Old Coin of India"
          className="w-full h-full object-cover rounded-full"
        />
      );
    }
    if (stage.coinType === 'ppt') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#FFF8E7] to-[#FFE8B2] flex flex-col items-center justify-center p-2 rounded-full shadow-inner">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <path d="M7 8h4" />
            <path d="M7 12h8" />
            <polyline points="15 7 17 9 15 11" />
          </svg>
          <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-amber-900/90 mt-0.5 font-mono">PPT DECK</span>
        </div>
      );
    }
    if (stage.coinType === 'upi') {
      return (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-2.5 rounded-full">
          <img
            src="/timeline/upi-logo.svg"
            alt="UPI Payment Logo"
            className="w-[85%] h-auto object-contain my-auto drop-shadow-sm"
          />
        </div>
      );
    }
    if (stage.coinType === 'modern-coin') {
      return (
        <div className="w-full h-full bg-white flex items-center justify-center p-1 rounded-full">
          <img
            src="/timeline/Indian_20_Rupee_coin_Reverse.png"
            alt="Modern Coin of India"
            className="w-full h-full object-contain p-0.5 rounded-full"
          />
        </div>
      );
    }
    if (stage.coinType === 'trophy') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 flex flex-col items-center justify-center p-2 rounded-full shadow-inner border border-amber-300">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-amber-800 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.78 2.72 3.23 3.32V19H8v2h8v-2h-2.62v-2.74c1.45-.6 2.6-1.82 3.23-3.32C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
          </svg>
          <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-amber-950 mt-0.5 font-mono">AWARDS</span>
        </div>
      );
    }
  }

  // Locked stage: Metallic background with faint silhouette and lock icon
  return (
    <div className="relative w-full h-full bg-[#2E2D2A] flex items-center justify-center rounded-full overflow-hidden">
      {stage.coinType === 'old-coin' && (
        <img
          src="/timeline/old-indian-coin.jpg"
          alt="Old Coin"
          className="w-full h-full object-cover rounded-full opacity-25"
        />
      )}
      {stage.coinType === 'ppt' && (
        <div className="w-full h-full flex flex-col items-center justify-center opacity-25 p-2">
          <svg className="w-8 h-8 sm:w-9 sm:h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
      )}
      {stage.coinType === 'upi' && (
        <img
          src="/timeline/upi-logo.svg"
          alt="UPI Logo"
          className="w-[85%] h-auto object-contain opacity-25"
        />
      )}
      {stage.coinType === 'modern-coin' && (
        <img
          src="/timeline/Indian_20_Rupee_coin_Reverse.png"
          alt="Modern Coin"
          className="w-full h-full object-contain p-1 rounded-full opacity-25"
        />
      )}
      {stage.coinType === 'trophy' && (
        <div className="w-full h-full flex flex-col items-center justify-center opacity-25 p-2">
          <svg className="w-8 h-8 sm:w-9 sm:h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.78 2.72 3.23 3.32V19H8v2h8v-2h-2.62v-2.74c1.45-.6 2.6-1.82 3.23-3.32C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
          </svg>
        </div>
      )}

      {/* Centered Lock Icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-white/60 drop-shadow"
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
  );
};

const TimelineSection = () => {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const sectionRef = useRef<HTMLElement>(null);

  // Automatically check date every 15 seconds so stages unlock live on the exact date/time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Hovered stage for floating tooltip / mobile active stage
  const [hoveredStageId, setHoveredStageId] = useState<number | null>(null);

  // Auto-hover Stage 1 on phone/mobile when navigating towards the timeline section
  useEffect(() => {
    const checkIsMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024;

    const el = sectionRef.current || document.getElementById('schedule');
    if (!el) return;

    // IntersectionObserver to detect when user navigates/scrolls towards the timeline section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && checkIsMobile()) {
            setHoveredStageId(1);
          }
        });
      },
      {
        rootMargin: '80px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    observer.observe(el);

    // Also trigger if navigating via hash link (#schedule)
    const handleHash = () => {
      if (window.location.hash === '#schedule' && checkIsMobile()) {
        setHoveredStageId(1);
      }
    };
    window.addEventListener('hashchange', handleHash);

    // Initial check on mount if section is already in view on mobile
    if (checkIsMobile()) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setHoveredStageId(1);
      }
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  // Helper to check if a node is currently illuminated (unlocked only if date passed or initially lit)
  const isStageLighted = (stage: Stage) => {
    if (stage.isInitiallyLit) return true;
    const actDate = new Date(stage.activationDate);
    if (currentTime >= actDate) return true;
    return false;
  };

  return (
    <section
      ref={sectionRef}
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

      {/* Archival Typography Watermark: TIMELINE TO INSPIRE 2026. */}
      <div className="absolute left-6 sm:left-12 lg:left-20 bottom-2 sm:bottom-4 lg:bottom-5 select-none pointer-events-none z-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.2rem] xl:text-[5.8rem] font-black font-serif text-[#0A2A5E]/[0.035] uppercase tracking-tighter leading-[0.88]">
          TIMELINE <br />
          <span className="text-[#FF6B00]/[0.10] italic font-serif">TO INSPIRE</span> <br />
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
              The colloquium will be conducted through progressive stages, providing a seamless selection process from registration & idea submission to PPT evaluation results, payment confirmation, internal evaluation, and external expert evaluation.
            </p>
          </motion.div>
        </div>

        {/* DESKTOP LENGTHWISE DOTTED CANVAS (>= 1024px) */}
        <div className="hidden lg:block relative w-full max-w-[1300px] xl:max-w-[1360px] mx-auto h-[740px] sm:h-[800px] lg:h-[860px] xl:h-[900px] select-none my-6">

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
            {/* Base Full Dashed Path connecting all 5 milestones */}
            <path
              d={FULL_ROADMAP_PATH}
              stroke="rgba(10, 42, 94, 0.35)"
              strokeWidth="5"
              strokeDasharray="16 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            {/* Glowing underlay & active stroke for Stage 1 */}
            {isStageLighted(stages[0]) && (
              <>
                <path
                  d={`${ENTRY_PATH} ${PATH_SEGMENT_1}`}
                  stroke="#FF6B00"
                  strokeWidth="12"
                  strokeDasharray="16 12"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity="0.30"
                  style={{ filter: 'blur(4px)' }}
                />
                <path
                  d={`${ENTRY_PATH} ${PATH_SEGMENT_1}`}
                  stroke="#FF6B00"
                  strokeWidth="5"
                  strokeDasharray="16 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </>
            )}

            {/* Glowing underlay & active stroke for Stage 2 */}
            {isStageLighted(stages[1]) && (
              <>
                <path
                  d={PATH_SEGMENT_2}
                  stroke="#F59E0B"
                  strokeWidth="12"
                  strokeDasharray="16 12"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity="0.30"
                  style={{ filter: 'blur(4px)' }}
                />
                <path
                  d={PATH_SEGMENT_2}
                  stroke="#F59E0B"
                  strokeWidth="5"
                  strokeDasharray="16 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </>
            )}

            {/* Glowing underlay & active stroke for Stage 3 */}
            {isStageLighted(stages[2]) && (
              <>
                <path
                  d={PATH_SEGMENT_3}
                  stroke="#10B981"
                  strokeWidth="12"
                  strokeDasharray="16 12"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity="0.30"
                  style={{ filter: 'blur(4px)' }}
                />
                <path
                  d={PATH_SEGMENT_3}
                  stroke="#10B981"
                  strokeWidth="5"
                  strokeDasharray="16 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </>
            )}

            {/* Glowing underlay & active stroke for Stage 4 */}
            {isStageLighted(stages[3]) && (
              <>
                <path
                  d={PATH_SEGMENT_4}
                  stroke="#0284C7"
                  strokeWidth="12"
                  strokeDasharray="16 12"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity="0.30"
                  style={{ filter: 'blur(4px)' }}
                />
                <path
                  d={PATH_SEGMENT_4}
                  stroke="#0284C7"
                  strokeWidth="5"
                  strokeDasharray="16 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </>
            )}

            {/* Glowing underlay & active stroke for Stage 5 */}
            {isStageLighted(stages[4]) && (
              <>
                <path
                  d={EXIT_PATH}
                  stroke="#F59E0B"
                  strokeWidth="12"
                  strokeDasharray="16 12"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  opacity="0.30"
                  style={{ filter: 'blur(4px)' }}
                />
                <path
                  d={EXIT_PATH}
                  stroke="#F59E0B"
                  strokeWidth="5"
                  strokeDasharray="16 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </>
            )}
          </svg>

          {/* POINT 1: Stage 01 - Registration & Idea Submission at (11%, 21.25%) */}
          <div
            className="absolute left-[11%] top-[21.25%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
            onMouseEnter={() => setHoveredStageId(1)}
            onMouseLeave={() => setHoveredStageId(null)}
          >
            <div className="relative">
              {isStageLighted(stages[0]) && (
                <>
                  <div className="absolute -inset-3 rounded-full bg-orange-500/25 blur-lg animate-pulse" />
                  <div className="absolute -inset-1.5 rounded-full border-2 border-orange-500/40 animate-ping opacity-25 pointer-events-none" />
                </>
              )}

              <motion.div
                className={`w-24 h-24 sm:w-26 sm:h-26 xl:w-28 xl:h-28 rounded-full border-4 transition-all duration-300 relative overflow-hidden flex items-center justify-center bg-[#F9E7B7] shadow-xl ${
                  isStageLighted(stages[0])
                    ? 'border-[#FF6B00] shadow-[0_0_28px_rgba(255,107,0,0.5)] scale-105'
                    : 'border-[#4A4740] bg-[#2E2D2A] shadow-lg'
                }`}
                whileHover={{ scale: 1.08, rotate: 3 }}
              >
                {renderCoinVisual(stages[0], isStageLighted(stages[0]))}
              </motion.div>

              <PixelRevealCard isVisible={hoveredStageId === 1} position="right">
                <div className="p-4 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wider">
                      Stage 01 • Registration
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

            <div className="mt-3 text-center max-w-[200px]">
              <h4 className="font-bold text-[#0A2A5E] text-base sm:text-lg font-sans leading-tight">
                {stages[0].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#0A2A5E]/75 font-sans mt-1 font-medium">
                {stages[0].date}
              </p>
            </div>
          </div>

          {/* POINT 2: Stage 02 - PPT Evaluation Result at (29.5%, 50%) */}
          <div
            className="absolute left-[29.5%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
            onMouseEnter={() => setHoveredStageId(2)}
            onMouseLeave={() => setHoveredStageId(null)}
          >
            <div className="relative">
              {isStageLighted(stages[1]) && (
                <div className="absolute -inset-3 rounded-full bg-amber-500/25 blur-lg animate-pulse" />
              )}

              <motion.div
                className={`w-24 h-24 sm:w-26 sm:h-26 xl:w-28 xl:h-28 rounded-full border-4 transition-all duration-300 relative overflow-hidden flex items-center justify-center shadow-xl ${
                  isStageLighted(stages[1])
                    ? 'border-amber-500 shadow-[0_0_28px_rgba(245,158,11,0.5)] scale-105 bg-white'
                    : 'border-[#4A4740] bg-[#2E2D2A] shadow-lg'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {renderCoinVisual(stages[1], isStageLighted(stages[1]))}
              </motion.div>

              <PixelRevealCard isVisible={hoveredStageId === 2} position="above">
                <div className="p-4 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wider">
                      Stage 02 • Result
                    </span>
                    <span className="text-[10px] text-blue-200/80 font-semibold font-mono">28 Sep 2026</span>
                  </div>
                  <h5 className="font-bold text-sm text-white mb-1">
                    {stages[1].title}
                  </h5>
                  <p className="text-xs text-blue-100/90 leading-relaxed font-sans mb-2">
                    {stages[1].summary}
                  </p>
                  <div className="pt-2 border-t border-amber-400/20 flex items-center gap-1.5 text-[11px] font-medium text-amber-200">
                    <svg className="w-3.5 h-3.5 text-amber-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>Results announced: <strong>28 Sep 2026</strong></span>
                  </div>
                </div>
              </PixelRevealCard>
            </div>

            <div className="mt-3 text-center max-w-[200px]">
              <h4 className="font-bold text-[#0A2A5E] text-base sm:text-lg font-sans leading-tight">
                {stages[1].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#0A2A5E]/75 font-sans mt-1 font-medium">
                {stages[1].date}
              </p>
            </div>
          </div>

          {/* POINT 3: Stage 03 - Payment at (48.5%, 23.125%) */}
          <div
            className="absolute left-[48.5%] top-[23.125%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
            onMouseEnter={() => setHoveredStageId(3)}
            onMouseLeave={() => setHoveredStageId(null)}
          >
            <div className="relative">
              {isStageLighted(stages[2]) && (
                <div className="absolute -inset-3 rounded-full bg-emerald-500/25 blur-lg animate-pulse" />
              )}

              <motion.div
                className={`w-24 h-24 sm:w-26 sm:h-26 xl:w-28 xl:h-28 rounded-full border-4 transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center shadow-xl ${
                  isStageLighted(stages[2])
                    ? 'border-emerald-600 bg-white shadow-[0_0_28px_rgba(16,185,129,0.45)] scale-105'
                    : 'border-[#4A4740] bg-[#2E2D2A] shadow-lg'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {renderCoinVisual(stages[2], isStageLighted(stages[2]))}
              </motion.div>

              <PixelRevealCard isVisible={hoveredStageId === 3} position="right">
                <div className="p-4 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-emerald-300 bg-emerald-400/15 px-2 py-0.5 rounded-full border border-emerald-400/30 uppercase tracking-wider">
                      Stage 03 • Payment
                    </span>
                    <span className="text-[10px] text-blue-200/80 font-semibold font-mono">30 Sep 2026</span>
                  </div>
                  <h5 className="font-bold text-sm text-white mb-1">
                    {stages[2].title}
                  </h5>
                  <p className="text-xs text-blue-100/90 leading-relaxed font-sans mb-2.5">
                    {stages[2].summary}
                  </p>
                  <div className="pt-2 border-t border-emerald-400/25 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-200">
                    <svg className="w-3.5 h-3.5 text-emerald-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>Payment only for selected teams</span>
                  </div>
                </div>
              </PixelRevealCard>
            </div>

            <div className="mt-3 text-center max-w-[210px]">
              <h4 className="font-bold text-[#0A2A5E] text-base sm:text-lg font-sans leading-tight">
                {stages[2].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#0A2A5E]/75 font-sans mt-1 font-medium">
                {stages[2].date}
              </p>
              <div className="mt-1.5">
                <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-500/20 border border-emerald-600/35 px-2.5 py-0.5 rounded-full shadow-xs">
                  Only for Selected Teams
                </span>
              </div>
            </div>
          </div>

          {/* POINT 4: Stage 04 - Internal Evaluation at (68%, 51.875%) */}
          <div
            className="absolute left-[68%] top-[51.875%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
            onMouseEnter={() => setHoveredStageId(4)}
            onMouseLeave={() => setHoveredStageId(null)}
          >
            <div className="relative">
              {isStageLighted(stages[3]) && (
                <div className="absolute -inset-3 rounded-full bg-blue-500/25 blur-lg animate-pulse" />
              )}

              <motion.div
                className={`w-24 h-24 sm:w-26 sm:h-26 xl:w-28 xl:h-28 rounded-full border-4 transition-all duration-300 relative overflow-hidden flex items-center justify-center shadow-xl ${
                  isStageLighted(stages[3])
                    ? 'border-[#0A2A5E] shadow-[0_0_28px_rgba(10,42,94,0.4)] scale-105 bg-white'
                    : 'border-[#4A4740] bg-[#2E2D2A] shadow-lg'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {renderCoinVisual(stages[3], isStageLighted(stages[3]))}
              </motion.div>

              <PixelRevealCard isVisible={hoveredStageId === 4} position="above">
                <div className="p-4 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-cyan-300 bg-cyan-400/15 px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wider">
                      Stage 04 • On-Campus
                    </span>
                    <span className="text-[10px] text-blue-200/80 font-semibold font-mono">3 Oct 2026</span>
                  </div>
                  <h5 className="font-bold text-sm text-white mb-1">
                    {stages[3].title}
                  </h5>
                  <p className="text-xs text-blue-100/90 leading-relaxed font-sans mb-2.5">
                    {stages[3].summary}
                  </p>
                  <div className="pt-2 border-t border-cyan-400/20 flex items-center gap-1.5 text-[11px] font-medium text-cyan-200">
                    <svg className="w-3.5 h-3.5 text-cyan-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Tentative Event Timing: <strong className="text-white font-semibold">9:00 AM – 5:00 PM</strong></span>
                  </div>
                </div>
              </PixelRevealCard>
            </div>

            <div className="mt-3 text-center max-w-[200px]">
              <h4 className="font-bold text-[#0A2A5E] text-base sm:text-lg font-sans leading-tight">
                {stages[3].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#0A2A5E]/75 font-sans mt-1 font-medium">
                {stages[3].date}
              </p>
            </div>
          </div>

          {/* POINT 5: Stage 05 - Grand Finale & Awards at (87.5%, 78.125%) */}
          <div
            className="absolute left-[87.5%] top-[78.125%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer group"
            onMouseEnter={() => setHoveredStageId(5)}
            onMouseLeave={() => setHoveredStageId(null)}
          >
            <div className="relative">
              {isStageLighted(stages[4]) && (
                <div className="absolute -inset-3 rounded-full bg-amber-500/25 blur-lg animate-pulse" />
              )}

              <motion.div
                className={`w-24 h-24 sm:w-26 sm:h-26 xl:w-28 xl:h-28 rounded-full border-4 transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center shadow-xl ${
                  isStageLighted(stages[4])
                    ? 'border-amber-500 shadow-[0_0_28px_rgba(245,158,11,0.5)] scale-105 bg-white'
                    : 'border-[#4A4740] bg-[#2E2D2A] shadow-lg'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {renderCoinVisual(stages[4], isStageLighted(stages[4]))}
              </motion.div>

              <PixelRevealCard isVisible={hoveredStageId === 5} position="left">
                <div className="p-4 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-400/15 px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wider">
                      Stage 05 • Grand Finale
                    </span>
                    <span className="text-[10px] text-blue-200/80 font-semibold font-mono">3 Oct 2026</span>
                  </div>
                  <h5 className="font-bold text-sm text-white mb-1">
                    {stages[4].title}
                  </h5>
                  <p className="text-xs text-blue-100/90 leading-relaxed font-sans mb-2.5">
                    {stages[4].summary}
                  </p>
                  <div className="pt-2 border-t border-amber-400/20 flex items-center gap-1.5 text-[11px] font-medium text-amber-200">
                    <svg className="w-3.5 h-3.5 text-amber-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Event Timing: <strong className="text-white font-semibold">2:00 PM – 5:30 PM</strong> • Auditorium</span>
                  </div>
                </div>
              </PixelRevealCard>
            </div>

            <div className="mt-3 text-center max-w-[200px]">
              <h4 className="font-bold text-[#0A2A5E] text-base sm:text-lg font-sans leading-tight">
                {stages[4].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#0A2A5E]/75 font-sans mt-1 font-medium">
                {stages[4].date}
              </p>
            </div>
          </div>

        </div>

        {/* MOBILE & TABLET LAYOUT (< 1024px) */}
        <div className="lg:hidden flex flex-col gap-7 sm:gap-9 my-6 relative">
          {/* Vertical Connecting Dashed Line - Perfectly centered through nodes */}
          <div className="absolute left-[27px] sm:left-[31px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-[#0A2A5E]/35 z-0" />

          {stages.map((stage) => {
            const lighted = isStageLighted(stage);
            const isHovered = hoveredStageId === stage.id;

            return (
              <div
                key={stage.id}
                className="flex items-start gap-3.5 sm:gap-6 relative z-10 cursor-pointer group select-none py-1"
                onClick={() => setHoveredStageId(hoveredStageId === stage.id ? null : stage.id)}
              >
                {/* Coin Node with generous touch target padding */}
                <div className="relative shrink-0">
                  <div className="absolute -inset-3 sm:-inset-4 z-20 cursor-pointer" />
                  {lighted && (
                    <>
                      <div className="absolute -inset-2 rounded-full bg-orange-500/25 blur-md animate-pulse pointer-events-none" />
                      <div className="absolute -inset-1 rounded-full border-2 border-orange-500/40 animate-ping opacity-25 pointer-events-none" />
                    </>
                  )}

                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2.5 sm:border-3 transition-all duration-300 relative overflow-hidden flex items-center justify-center ${
                      lighted
                        ? 'border-[#FF6B00] shadow-[0_0_16px_rgba(255,107,0,0.45)] bg-white'
                        : 'border-[#4A4740] bg-[#2E2D2A] shadow-md'
                    } ${isHovered ? 'scale-105' : 'scale-100'}`}
                  >
                    {renderCoinVisual(stage, lighted)}
                  </div>
                </div>

                {/* Text Header & Pixel Reveal Card */}
                <div className="flex-grow pt-1 min-w-0">
                  <h4 className="font-bold text-[#0A2A5E] text-base sm:text-lg font-sans">
                    {stage.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#0A2A5E]/80 mt-0.5 font-medium">
                    {stage.date}
                  </p>
                  {stage.note && (
                    <div className="mt-1">
                      <span className="inline-block text-[10px] font-semibold text-emerald-800 bg-emerald-500/20 border border-emerald-600/35 px-2 py-0.5 rounded-full">
                        {stage.note}
                      </span>
                    </div>
                  )}

                  {/* Pixel Reveal Drawer Card (Exact same pixel dissolve as desktop!) */}
                  <PixelRevealCard isVisible={hoveredStageId === stage.id} position="inline">
                    <div className="p-4 text-left" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                            stage.id === 1
                              ? 'text-amber-300 bg-amber-400/15 border-amber-400/30'
                              : stage.id === 2
                              ? 'text-amber-300 bg-amber-400/15 border-amber-400/30'
                              : stage.id === 3
                              ? 'text-emerald-300 bg-emerald-400/15 border-emerald-400/30'
                              : stage.id === 4
                              ? 'text-cyan-300 bg-cyan-400/15 border-cyan-400/30'
                              : 'text-amber-300 bg-amber-400/15 border-amber-400/30'
                          }`}
                        >
                          {stage.id === 1
                            ? 'Stage 01 • Registration'
                            : stage.id === 2
                            ? 'Stage 02 • Result'
                            : stage.id === 3
                            ? 'Stage 03 • Payment'
                            : stage.id === 4
                            ? 'Stage 04 • On-Campus'
                            : 'Stage 05 • Grand Finale'}
                        </span>
                        <span className="text-[10px] text-blue-200/80 font-semibold font-mono">
                          {stage.id === 1
                            ? '26 Sep 2026'
                            : stage.id === 2
                            ? '28 Sep 2026'
                            : stage.id === 3
                            ? '30 Sep 2026'
                            : '3 Oct 2026'}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-white mb-1 font-sans">
                        {stage.title}
                      </h5>
                      <p className="text-xs text-blue-100/90 leading-relaxed font-sans mb-2">
                        {stage.summary}
                      </p>
                      {stage.id === 3 && (
                        <div className="pt-2 border-t border-emerald-400/25 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-200">
                          <svg className="w-3.5 h-3.5 text-emerald-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          <span>Payment only for selected teams</span>
                        </div>
                      )}
                      {stage.id === 4 && (
                        <div className="pt-2 border-t border-cyan-400/20 flex items-center gap-1.5 text-[11px] font-medium text-cyan-200">
                          <svg className="w-3.5 h-3.5 text-cyan-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>Tentative Event Timing: <strong className="text-white font-semibold">9:00 AM – 5:00 PM</strong></span>
                        </div>
                      )}
                      {stage.id === 5 && (
                        <div className="pt-2 border-t border-amber-400/20 flex items-center gap-1.5 text-[11px] font-medium text-amber-200">
                          <svg className="w-3.5 h-3.5 text-amber-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>Event Timing: <strong className="text-white font-semibold">2:00 PM – 5:30 PM</strong> • Auditorium</span>
                        </div>
                      )}
                    </div>
                  </PixelRevealCard>
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
