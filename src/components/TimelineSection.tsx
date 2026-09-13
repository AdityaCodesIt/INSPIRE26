import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Milestone {
  id: number;
  title: string;
  date: string;
  color: string;
  icon: React.ReactNode;
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: 'Abstract Submission Opens',
    date: '1 Aug 2025',
    color: '#10B981', // Green
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Abstract Submission Deadline',
    date: '30 Oct 2025',
    color: '#EF4444', // Orange/Red
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M4 12V4a2 2 0 0 1 2-2h8.5L20 7.5V12" />
        <circle cx="12" cy="17" r="5" />
        <polyline points="12 15 12 17 14 18" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Acceptance Notification',
    date: '15 Nov 2025',
    color: '#2563EB', // Blue
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        <path d="m16 19 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Early Bird Registration Deadline',
    date: '15 Dec 2025',
    color: '#059669', // Emerald/Green
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Final Registration Deadline',
    date: '5 Jan 2026',
    color: '#EA580C', // Orange
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Conference Dates',
    date: '16 – 18 Jan 2026',
    color: '#7C3AED', // Purple
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
];

const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section 
      id="schedule" 
      className="py-24 relative overflow-hidden bg-cover bg-center border-t border-b border-teal-950/40 text-white scroll-mt-[68px]" 
      ref={containerRef}
      style={{
        backgroundImage: "url('/backgrounds/bg-teal.jpg')",
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
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/35 z-0" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-20 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">Key Dates</h2>
          <div className="w-16 h-[3px] bg-emerald-400 rounded-full mb-3"></div>
          <p className="text-sm text-teal-100/75 font-sans font-medium">
            Mark your calendar and be part of the journey.
          </p>
        </motion.div>

        {/* Desktop Horizontal Alternating Timeline (lg and above) */}
        <div className="hidden lg:block relative w-full h-[360px] my-6">

          {/* Continuous Curved Blue Dotted Path Connecting All 6 Nodes */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none -z-0"
            viewBox="0 0 1200 360"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 20 50 L 100 50 C 190 50, 210 210, 300 210 C 390 210, 410 50, 500 50 C 590 50, 610 210, 700 210 C 790 210, 810 50, 900 50 C 990 50, 1010 210, 1100 210 L 1180 210"
              stroke="#2563EB"
              strokeWidth="3.5"
              strokeDasharray="8 10"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.9 } : { opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>

          {/* 6 Alternating Event Nodes */}
          <div className="grid grid-cols-6 w-full h-full relative z-10">
            {milestones.map((milestone, index) => {
              const isTop = index % 2 === 0; // 0, 2, 4 are Top; 1, 3, 5 are Bottom

              return (
                <div 
                  key={milestone.id} 
                  className={`flex flex-col items-center w-full px-1.5 ${
                    isTop ? 'pt-[18px]' : 'pt-[178px]'
                  }`}
                >
                  {/* Circular Event Marker Sitting Directly on the Line */}
                  <motion.div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center relative z-20 transition-all duration-300 hover:scale-110 cursor-default"
                    style={{
                      backgroundColor: milestone.color,
                      boxShadow: `0 0 0 3px white, 0 0 0 6px ${milestone.color}, 0 8px 18px rgba(0,0,0,0.14)`
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  >
                    {milestone.icon}
                  </motion.div>

                  {/* Event Details Positioned Below the Circle */}
                  <motion.div 
                    className="text-center w-full max-w-[180px] mt-3"
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.25 }}
                  >
                    <h4 className="font-bold text-[0.82rem] sm:text-[0.88rem] text-white leading-snug mb-1 font-sans">
                      {milestone.title}
                    </h4>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-950/80 border border-teal-400/30 text-[0.75rem] font-bold text-emerald-300 shadow-2xs font-sans">
                      {milestone.date}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline (< lg) */}
        <div className="lg:hidden mt-8 relative pl-6 sm:pl-8">

          {/* Vertical Blue Dotted Line */}
          <div className="absolute left-[34px] sm:left-[38px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-[#2563EB]/70"></div>

          <div className="flex flex-col gap-6 relative z-10">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                className="flex items-center gap-4 sm:gap-6 bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-lg border border-white/15 shadow-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Circular Icon */}
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: milestone.color,
                    boxShadow: `0 0 0 3px white, 0 0 0 5px ${milestone.color}, 0 4px 10px rgba(0,0,0,0.12)`
                  }}
                >
                  {milestone.icon}
                </div>

                {/* Event Details */}
                <div className="flex flex-col">
                  <h4 className="font-bold text-white text-[0.85rem] sm:text-base leading-snug mb-1 font-sans">
                    {milestone.title}
                  </h4>
                  <span className="inline-block self-start px-2 py-0.5 rounded-md bg-teal-950/80 border border-teal-400/30 text-xs font-bold text-emerald-300 shadow-2xs font-sans">
                    {milestone.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative handwritten aside */}
        <motion.div
          className="mt-12 hidden lg:flex justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="font-handwriting text-2xl text-emerald-300 transform -rotate-[6deg] opacity-90">
            Different Minds.<br />A Stronger Bharat.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default TimelineSection;
