import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Milestone {
  id: number;
  title: string;
  date: string;
  description: string;
  isLive: boolean;
  color: string;
  icon: React.ReactNode;
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: 'Abstract Submission & Screening',
    date: '26 Sep 2026 (Tentative)',
    description: 'Teams submit an abstract + PDF in one of 9 tracks; entries are screened.',
    isLive: true,
    color: '#10B981', // Live color (Emerald)
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Internal Evaluation Round',
    date: '3 Oct 2026 (Tentative)',
    description: 'Shortlisted participants present within a strict 12-minute window.',
    isLive: false,
    color: '#6B7280', // Grey
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="14" x="3" y="3" rx="2" ry="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'External Grand Finale & Awards',
    date: '3 Oct 2026 (Tentative)',
    description: 'Finalists present and defend their work before an external expert panel.',
    isLive: false,
    color: '#6B7280', // Grey
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
];

const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

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
          className="mb-16 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">Key Dates</h2>
          <div className="w-16 h-[3px] bg-emerald-400 rounded-full mb-3"></div>
          <p className="text-sm text-teal-100/75 font-sans font-medium">
            The journey of VIKAS 2026. Hover over any stage for details.
          </p>
        </motion.div>

        {/* Desktop Horizontal Timeline (md and above) */}
        <div className="hidden md:block relative w-full h-[280px] my-6">

          {/* Straight Dotted Path Connecting All 3 Nodes */}
          <svg
            className="absolute inset-0 w-full h-[150px] pointer-events-none -z-0"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="16%" y1="75px" x2="84%" y2="75px"
              stroke="#4B5563"
              strokeWidth="4"
              strokeDasharray="8 8"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>

          {/* 3 Event Nodes */}
          <div className="flex justify-between items-start w-full h-full relative z-10 px-4 lg:px-12">
            {milestones.map((milestone, index) => {
              return (
                <div 
                  key={milestone.id} 
                  className="flex flex-col items-center w-[30%] relative"
                  onMouseEnter={() => setHoveredNode(milestone.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Circular Event Marker */}
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center relative z-20 transition-all duration-300 cursor-pointer mt-[43px] ${milestone.isLive ? 'ring-4 ring-emerald-400/30' : 'hover:brightness-125'}`}
                    style={{
                      backgroundColor: milestone.color,
                      boxShadow: `0 0 0 4px #031813, 0 0 0 6px ${milestone.color}, 0 8px 18px rgba(0,0,0,0.3)`
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    {milestone.icon}
                  </motion.div>

                  {/* Event Details */}
                  <motion.div 
                    className="text-center w-full mt-6 flex flex-col items-center relative"
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  >
                    {milestone.isLive && (
                      <span className="absolute -top-[90px] bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded shadow-lg animate-bounce z-30 pointer-events-none">
                        Live Now
                      </span>
                    )}
                    <h4 className={`font-bold text-[0.95rem] leading-snug mb-2 font-sans transition-colors ${milestone.isLive ? 'text-white' : 'text-gray-400'}`}>
                      {milestone.title}
                    </h4>
                    <span className={`inline-block px-3 py-1 rounded-full border text-[0.8rem] font-bold shadow-2xs font-sans ${milestone.isLive ? 'bg-teal-950/80 border-teal-400/30 text-emerald-300' : 'bg-gray-800/80 border-gray-600/30 text-gray-400'}`}>
                      {milestone.date}
                    </span>
                  </motion.div>

                  {/* Hover Information Tooltip */}
                  <motion.div
                    className="absolute top-[160px] bg-white text-slate-900 p-4 rounded-xl shadow-2xl w-[280px] text-sm font-medium text-center z-50 pointer-events-none border border-slate-200"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={hoveredNode === milestone.id ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {milestone.description}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline (< md) */}
        <div className="md:hidden mt-8 relative pl-8">
          {/* Vertical Dotted Line */}
          <div className="absolute left-[39px] top-6 bottom-6 w-0.5 border-l-[3px] border-dotted border-gray-600"></div>

          <div className="flex flex-col gap-8 relative z-10">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onMouseEnter={() => setHoveredNode(milestone.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setHoveredNode(hoveredNode === milestone.id ? null : milestone.id)}
              >
                <div className={`flex flex-col gap-3 p-5 rounded-xl border shadow-lg transition-all ${
                  milestone.isLive 
                    ? 'bg-white/10 backdrop-blur-md border-emerald-400/30 ring-1 ring-emerald-500/20' 
                    : 'bg-black/20 backdrop-blur-md border-gray-700/50'
                }`}>
                  
                  <div className="flex items-center gap-4 relative">
                    {/* Circular Icon */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 absolute -left-8"
                      style={{
                        backgroundColor: milestone.color,
                        boxShadow: `0 0 0 4px #031813, 0 0 0 4px ${milestone.color}`
                      }}
                    >
                      {milestone.icon}
                    </div>

                    <div className="flex flex-col pl-6 w-full">
                      <div className="flex justify-between items-start w-full">
                        <span className={`inline-block px-2 py-0.5 rounded-md border text-xs font-bold font-sans mb-1.5 ${milestone.isLive ? 'bg-teal-950 border-teal-400/30 text-emerald-300' : 'bg-gray-800 border-gray-600/30 text-gray-400'}`}>
                          {milestone.date}
                        </span>
                        {milestone.isLive && (
                          <span className="bg-emerald-500 text-white text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded animate-pulse">
                            Live
                          </span>
                        )}
                      </div>
                      <h4 className={`font-bold text-[0.95rem] leading-snug font-sans ${milestone.isLive ? 'text-white' : 'text-gray-400'}`}>
                        {milestone.title}
                      </h4>
                    </div>
                  </div>

                  {/* Expandable Info on Mobile (Click/Hover) */}
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={hoveredNode === milestone.id ? { height: 'auto', opacity: 1, marginTop: 8 } : { height: 0, opacity: 0, marginTop: 0 }}
                  >
                    <p className="text-sm text-teal-50 bg-teal-950/60 p-3.5 rounded-lg border border-teal-800/50 leading-relaxed shadow-inner">
                      {milestone.description}
                    </p>
                  </motion.div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
