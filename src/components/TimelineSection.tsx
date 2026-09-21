import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

interface Stage {
  id: number;
  numeral: string;
  title: string;
  date: string;
  time?: string;
  venue?: string;
  note?: string;
  summary: string;
  positionClasses: string;
}

const stages: Stage[] = [
  {
    id: 1,
    numeral: '1',
    title: 'Registration & Idea Submission',
    date: 'Deadline: 26 Sep 2026',
    venue: 'Online IEEE Portal',
    summary:
      'Initial submission of structured project idea, abstract, and methodology PDF aligned with any of the 9 tracks and UN SDGs.',
    positionClasses:
      'lg:top-[6.4vw] lg:left-[8%] xl:left-[11%] 2xl:left-[10%]',
  },
  {
    id: 2,
    numeral: '2',
    title: 'PPT Evaluation Result',
    date: 'Deadline: 28 Sep 2026',
    venue: 'Online Review Portal',
    summary:
      'Official declaration of PPT evaluation results and technical review scores for shortlisted teams advancing to on-campus defense.',
    positionClasses:
      'lg:top-[30.4vw] lg:left-[44%] xl:left-[46%] 2xl:left-[48%]',
  },
  {
    id: 3,
    numeral: '3',
    title: 'Payment Confirmation',
    date: 'Deadline: 30 Sep 2026',
    note: 'Payment only for selected teams',
    venue: 'Online Payment Gateway',
    summary:
      'Final registration fee submission and slot confirmation exclusively for qualified teams for on-campus presentation.',
    positionClasses:
      'lg:top-[57.6vw] lg:left-[2%] xl:left-[5%] 2xl:left-[4%]',
  },
  {
    id: 4,
    numeral: '4',
    title: 'Internal Evaluation',
    date: '03 October 2026',
    time: '9:00 AM – 5:00 PM',
    venue: 'SLRTCE Campus, Mira-Bhayandar',
    summary:
      'Shortlisted teams deliver a strict 12-minute technical defense on-campus before expert academic review panels.',
    positionClasses:
      'lg:top-[72vw] lg:left-[64%] xl:left-[66%] 2xl:left-[68%]',
  },
  {
    id: 5,
    numeral: '5',
    title: 'Grand Finale & Awards',
    date: '03 October 2026',
    time: '2:00 PM – 5:30 PM',
    venue: 'Main Auditorium, SLRTCE Campus',
    summary:
      'Top finalist teams pitch live before an invited panel of external industry leaders, scientists, and academicians.',
    positionClasses:
      'lg:top-[92.8vw] lg:left-[12%] xl:left-[16%] 2xl:left-[14%]',
  },
];

// Production SVG path starting at Stage 1 and terminating cleanly beside Stage 5 (red marked position)
const HACKSPIRE_DESKTOP_PATH =
  'M38 -145C38 -80 22 -20 9.001 4C9.001 4 -15.155 65.5 50.5 133.5C116.155 201.5 229.557 204.076 294.5 296.5C352.121 378.5 348.348 441.21 440.5 512C550.5 596.5 710.501 479.853 862.001 535C955 568.5 1010 720 1040 820C1080 955 1120 1100 1184.5 1180C1225 1250 1250 1320 1255 1395';

const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);

  const [desktopMarker, setDesktopMarker] = useState<{ x: number; y: number }>({ x: 38, y: -145 });
  const [mobileMarkerY, setMobileMarkerY] = useState<number>(0);
  const [scrollFraction, setScrollFraction] = useState<number>(0);

  // Responsive scroll tracking calibrated to viewport progression
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 30%', 'end 85%'],
  });

  // Smooth responsive spring for real-time bidirectional tracking
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 28,
    restDelta: 0.001,
  });

  // Calculate waypoint marker positions along the SVG path
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    setScrollFraction(clamped);

    // Desktop marker calculation
    if (desktopPathRef.current) {
      try {
        const total = desktopPathRef.current.getTotalLength();
        if (total > 0) {
          const pt = desktopPathRef.current.getPointAtLength(clamped * total);
          setDesktopMarker({ x: pt.x, y: pt.y });
        }
      } catch {}
    }

    // Mobile vertical marker
    setMobileMarkerY(clamped * 940);
  });

  // Initial waypoint calculation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (desktopPathRef.current) {
        try {
          const pt = desktopPathRef.current.getPointAtLength(0);
          setDesktopMarker({ x: pt.x, y: pt.y });
        } catch {}
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Bidirectional active milestone calculation: activates when scrolling down, reverses when scrolling up
  const isStageActive = (index: number) => {
    if (index === 0) return scrollFraction > 0.005; // Active inside schedule section, dims when scrolled above

    // Desktop: strictly track marker Y position along the curve
    if (desktopMarker && typeof desktopMarker.y === 'number') {
      const yThresholds = [0, 220, 480, 880, 1260];
      return desktopMarker.y >= yThresholds[index];
    }

    // Mobile vertical scroll progression
    const scrollThresholds = [0, 0.20, 0.40, 0.65, 0.85];
    return scrollFraction >= scrollThresholds[index];
  };

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative z-10 flex w-full flex-col items-center overflow-x-clip border-t border-b border-orange-900/15 text-brand-navy scroll-mt-[65px] px-5 pt-[10vh] pb-16 sm:px-[6vw] sm:pt-[14vh] sm:pb-24 bg-[#FAF6EE]"
      style={{
        backgroundImage: "url('/paper-texture-clean.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Tactile Fine Grain Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50 z-0"
        style={{
          backgroundImage: "url('/backgrounds/noise-texture.svg')",
          backgroundRepeat: 'repeat',
        }}
      />
      {/* Subtle Vignette for Depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/5 via-transparent to-black/10 z-0" />



      {/* Archival Typography Watermark: ORGANIZED BY IEEE SLRTCE STUDENT BRANCH */}
      <div className="absolute right-4 sm:right-8 lg:right-12 xl:right-16 top-6 sm:top-10 lg:top-12 select-none pointer-events-none z-0 text-right">
        <h3 className="text-4xl sm:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-black font-serif uppercase tracking-tight leading-[0.88] select-none text-right">
          <span className="text-[#0A2A5E]/[0.06] block tracking-tighter">ORGANIZED BY</span>
          <span className="text-[#C26510]/[0.18] italic block font-serif my-1 tracking-tight">IEEE SLRTCE</span>
          <span className="text-[#0A2A5E]/[0.06] block tracking-tight text-xl sm:text-2xl lg:text-[2.6rem] xl:text-[3.2rem] mt-2">STUDENT BRANCH</span>
        </h3>
      </div>

      {/* Top Left Header Section (Restored exactly to original) */}
      <div className="w-full max-w-[82rem] mb-6 lg:mb-10 relative z-10 self-start text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
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

      {/* Main Roadmap Container - Sized to end cleanly right after Stage 5, eliminating dead space */}
      <div className="relative mt-[4vh] w-full max-w-[82rem] lg:mt-0 lg:h-[105vw] xl:h-[101vw] 2xl:h-[97vw]">
        
        {/* ========================================================================= */}
        {/* DESKTOP SVG SERPENTINE PATH                                               */}
        {/* ========================================================================= */}
        <div
          className="pointer-events-none absolute top-[14.4vw] left-[0%] right-[28%] hidden h-[140.8vw] lg:block"
          aria-hidden="true"
        >
          <svg
            viewBox="-40 -40 1320 2400"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient
                id="timeline-gradient-active"
                x1="200"
                y1="0"
                x2="1000"
                y2="1400"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#CDB3FC" />
                <stop offset="0.45" stopColor="#7B35F8" />
                <stop offset="1" stopColor="#CDB3FC" />
              </linearGradient>
            </defs>

            {/* Inactive Dashed Base Path: bold dash - space - dash */}
            <path
              d={HACKSPIRE_DESKTOP_PATH}
              stroke="#A8A8A8"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeDasharray="16 18"
              fill="none"
            />

            {/* Active Solid Gradient Path Driven by Scroll */}
            <motion.path
              ref={desktopPathRef}
              d={HACKSPIRE_DESKTOP_PATH}
              stroke="url(#timeline-gradient-active)"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: smoothProgress }}
            />

            {/* Initial Start Point Anchor Node */}
            <circle
              cx="38"
              cy="-145"
              r="6"
              fill="white"
              stroke="#7B35F8"
              strokeWidth="2.5"
              style={{ filter: 'drop-shadow(0 0 6px #CDB3FC)' }}
            />

            {/* Final Destination Terminal Node at Stage 5 */}
            <circle
              cx="1255"
              cy="1395"
              r="6"
              fill="white"
              stroke="#7B35F8"
              strokeWidth="2.5"
              style={{ filter: 'drop-shadow(0 0 6px #CDB3FC)' }}
            />

            {/* Leading Bullseye Waypoint Marker */}
            {desktopMarker && (
              <g
                style={{ opacity: 1 }}
                transform={`translate(${desktopMarker.x}, ${desktopMarker.y})`}
              >
                <circle
                  r="10"
                  fill="white"
                  stroke="#7B35F8"
                  strokeWidth="3"
                  style={{ filter: 'drop-shadow(0 0 12px #CDB3FC)' }}
                />
                <circle r="3.5" fill="#7B35F8" />
              </g>
            )}
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VERTICAL TIMELINE LINE                                             */}
        {/* ========================================================================= */}
        <div
          className="pointer-events-none absolute top-2 bottom-2 left-[1.15rem] w-6 lg:hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 1000"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
            fill="none"
          >
            <path
              d="M12 0 L12 940"
              stroke="#A8A8A8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8 10"
              fill="none"
            />
            <motion.path
              d="M12 0 L12 940"
              stroke="#7B35F8"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: smoothProgress }}
            />
            <g
              style={{ opacity: 1 }}
              transform={`translate(12, ${mobileMarkerY})`}
            >
              <circle
                r="6"
                fill="white"
                stroke="#7B35F8"
                strokeWidth="2.5"
                style={{ filter: 'drop-shadow(0 0 8px #CDB3FC)' }}
              />
            </g>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* MILESTONES (Positioned Away from Line with Reduced Description Size)      */}
        {/* ========================================================================= */}
        <div className="relative z-20 mt-10 flex flex-col items-center gap-10 lg:mt-0 lg:block lg:h-full lg:gap-0">
          {stages.map((stage, idx) => {
            const active = isStageActive(idx);

            return (
              <div
                key={stage.id}
                className={`relative z-20 flex w-full max-w-[24rem] items-start pl-10 sm:max-w-[28rem] lg:absolute lg:max-w-[26rem] lg:pl-0 xl:max-w-[29rem] 2xl:max-w-[32rem] transition-all duration-700 ease-out ${
                  stage.positionClasses
                }`}
                style={{
                  opacity: active ? 1 : 0.35,
                  transform: active ? 'translate(0px, 0px)' : 'translate(0px, 24px)',
                }}
              >
                {/* Mobile Waypoint Dot Node */}
                <span
                  className="absolute top-5 left-0 z-10 flex h-6 w-6 -translate-x-0.5 items-center justify-center lg:hidden"
                  aria-hidden="true"
                >
                  <span
                    className="h-3 w-3 rounded-full border-2 bg-white transition-all duration-300"
                    style={{
                      borderColor: active ? '#7B35F8' : '#D4D4D4',
                      boxShadow: active ? '0 0 10px #CDB3FC' : 'none',
                    }}
                  />
                </span>

                {/* Numeral */}
                <div className="shrink-0 self-start">
                  <h3
                    className="font-sans text-[3.8rem] leading-[1.05] tracking-[0.02em] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7rem] xl:text-[8.5rem] 2xl:text-[10rem] transition-colors duration-500 select-none"
                    style={{ color: active ? 'rgb(17, 17, 17)' : '#ADADAD' }}
                  >
                    {stage.numeral}
                  </h3>
                </div>

                {/* Milestone Text Box */}
                <div className="flex flex-col px-2 pt-1.5 sm:px-4 lg:py-2 flex-1 min-w-0">
                  {/* Stage Title */}
                  <h4
                    className={`pt-1 font-sans text-base font-medium leading-snug sm:text-xl sm:leading-8 lg:pt-0 lg:text-2xl xl:text-3xl 2xl:text-4xl transition-colors duration-500 ${
                      active ? 'text-[#7B35F8]' : 'text-[#7B35F8]/45'
                    }`}
                  >
                    {stage.title}
                  </h4>

                  {/* Gradient Underline matching HackSpire */}
                  <div
                    className="mt-1.5 h-0.5 w-[min(65vw,16rem)] bg-gradient-to-r from-[#7B35F8] via-[#CDB3FC] to-transparent sm:w-[min(50vw,18rem)] lg:w-[17rem] xl:w-[19rem]"
                    aria-hidden="true"
                  />

                  {/* Date, Timing & Badges */}
                  <div className="mt-1.5 flex flex-col gap-1 sm:gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-secondary text-sm font-bold tracking-wide text-black/85 sm:text-base xl:text-lg">
                        {stage.date}
                      </p>

                      {stage.note && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                          {stage.note}
                        </span>
                      )}

                      {stage.time && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-purple-50 text-[#7B35F8] border border-[#CDB3FC]">
                          {stage.time}
                        </span>
                      )}
                    </div>

                    {stage.venue && (
                      <div className="text-[11px] sm:text-xs font-medium text-[#0A2A5E]/80 flex items-center gap-1">
                        <svg className="w-3 h-3 shrink-0 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{stage.venue}</span>
                      </div>
                    )}

                    {/* Description Paragraph (Safely contained without right edge overflow) */}
                    <p className="font-sans text-xs sm:text-sm text-black/70 font-normal leading-relaxed max-w-[280px] sm:max-w-[320px] lg:max-w-[310px] xl:max-w-[340px] 2xl:max-w-[370px]">
                      {stage.summary}
                    </p>
                  </div>
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
