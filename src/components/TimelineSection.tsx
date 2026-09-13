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
  
  // Default to the first live milestone, or the first milestone overall
  const defaultNode = milestones.find(m => m.isLive)?.id || milestones[0].id;
  const [activeNode, setActiveNode] = useState<number>(defaultNode);

  const activeMilestone = milestones.find(m => m.id === activeNode) || milestones[0];

  return (
    <section 
      id="schedule" 
      className="py-24 relative overflow-hidden bg-cover bg-center border-t border-b border-teal-950/40 text-white" 
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
          className="mb-12 lg:mb-16 max-w-xl text-center md:text-left mx-auto md:mx-0"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">Key Dates</h2>
          <div className="w-16 h-[3px] bg-emerald-400 rounded-full mb-3 mx-auto md:mx-0"></div>
          <p className="text-sm text-teal-100/75 font-sans font-medium">
            The journey of VIKAS 2026. Hover over any stage for details.
          </p>
        </motion.div>

        {/* Two Column Layout for Desktop, Single Column for Mobile */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-stretch relative">
          
          {/* Left Side: Information Box (Hidden on Mobile) */}
          <div className="hidden md:flex w-full md:w-[45%] flex-col justify-start sticky top-32 h-fit">
            <motion.div 
              key={activeNode}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`p-8 lg:p-12 rounded-2xl border shadow-2xl backdrop-blur-md relative overflow-hidden ${
                activeMilestone.isLive 
                  ? 'bg-emerald-950/40 border-emerald-500/40 ring-1 ring-emerald-500/20' 
                  : 'bg-black/40 border-white/10'
              }`}
            >
              {/* Large Background Icon */}
              <div className="absolute -right-12 -bottom-12 opacity-10 w-64 h-64 pointer-events-none" style={{ color: activeMilestone.color }}>
                {activeMilestone.icon}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg shrink-0"
                    style={{ backgroundColor: activeMilestone.color }}
                  >
                    {activeMilestone.icon}
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full border text-[0.8rem] font-bold shadow-2xs font-sans mb-2 ${
                      activeMilestone.isLive 
                        ? 'bg-teal-950 border-teal-400/30 text-emerald-300' 
                        : 'bg-gray-800 border-gray-600/30 text-gray-400'
                    }`}>
                      {activeMilestone.date}
                    </span>
                    {activeMilestone.isLive && (
                      <span className="ml-3 bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded animate-pulse">
                        Live Now
                      </span>
                    )}
                  </div>
                </div>

                <h3 className={`text-2xl lg:text-3xl font-bold mb-4 font-sans ${activeMilestone.isLive ? 'text-white' : 'text-gray-200'}`}>
                  {activeMilestone.title}
                </h3>
                
                <p className="text-base lg:text-lg text-teal-50/90 leading-relaxed font-sans">
                  {activeMilestone.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Staggered Vertical Timeline */}
          <div className="w-full md:w-[55%] relative mt-8 md:mt-0 px-2 sm:px-4 md:px-0">
            {/* Mobile Left Line */}
            <div className="md:hidden absolute left-[31px] sm:left-[39px] top-8 bottom-8 w-0.5 border-l-[3px] border-dotted border-gray-500/50 z-0"></div>

            <div className="flex flex-col gap-10 md:gap-14 relative z-10">
              {milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={milestone.id}
                    className={`flex flex-col md:flex-row items-center w-full relative group cursor-pointer ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    onMouseEnter={() => setActiveNode(milestone.id)}
                    onClick={() => setActiveNode(milestone.id)}
                  >
                    {/* Box Container (Desktop) - Takes up 45% */}
                    <div className="hidden md:flex w-[45%] flex-col relative z-20">
                      
                      {/* Diagonal Stripe connecting to the next box (Desktop) */}
                      {index < milestones.length - 1 && (
                        <svg 
                          className="absolute top-1/2 pointer-events-none -z-10 overflow-visible" 
                          style={{ 
                            width: '22.22%', // Exactly bridges the 10% gap between 45% and 55%
                            height: 'calc(100% + 3.5rem)', // Box height + gap-14
                            [isEven ? 'left' : 'right']: '100%' 
                          }} 
                          preserveAspectRatio="none"
                        >
                          <line 
                            x1={isEven ? "0" : "100%"} 
                            y1="0" 
                            x2={isEven ? "100%" : "0"} 
                            y2="100%" 
                            stroke="#10B981" 
                            strokeWidth="3" 
                            strokeDasharray="6 6"
                            className="opacity-50"
                          />
                        </svg>
                      )}

                      <div className={`p-4 lg:p-5 rounded-xl border shadow-lg transition-all duration-300 transform ${
                        activeNode === milestone.id ? 'scale-[1.03] z-20' : 'hover:scale-[1.01] z-10'
                      } ${
                        milestone.isLive 
                          ? (activeNode === milestone.id ? 'bg-emerald-900/30 border-emerald-400/50 ring-1 ring-emerald-500/30' : 'bg-emerald-950/20 border-emerald-500/30')
                          : (activeNode === milestone.id ? 'bg-white/15 border-white/30' : 'bg-black/20 border-gray-700/50')
                      } backdrop-blur-md`}>
                        <div className="flex justify-between items-start w-full mb-2">
                          <span className={`inline-block px-2 py-0.5 rounded-md border text-[0.65rem] lg:text-[0.7rem] font-bold font-sans ${milestone.isLive ? 'bg-teal-950/80 border-teal-400/30 text-emerald-300' : 'bg-gray-800/80 border-gray-600/30 text-gray-400'}`}>
                            {milestone.date}
                          </span>
                          {milestone.isLive && (
                            <span className="bg-emerald-500 text-white text-[8px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded animate-pulse">
                              Live
                            </span>
                          )}
                        </div>
                        <h4 className={`font-bold text-sm lg:text-base leading-snug font-sans transition-colors ${activeNode === milestone.id ? 'text-white' : (milestone.isLive ? 'text-white/90' : 'text-gray-400 group-hover:text-gray-200')}`}>
                          {milestone.title}
                        </h4>
                      </div>

                      {/* Desktop Icon - Attached to the inner edge of the box */}
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 z-30 ${
                          isEven ? '-right-5 lg:-right-6' : '-left-5 lg:-left-6'
                        } ${activeNode === milestone.id ? 'scale-110 shadow-lg' : 'opacity-80 group-hover:opacity-100'}`}
                        style={{
                          backgroundColor: milestone.color,
                          boxShadow: activeNode === milestone.id ? `0 0 0 4px #031813, 0 0 0 5px ${milestone.color}` : `0 0 0 3px #031813, 0 0 0 2px ${milestone.color}`
                        }}
                      >
                        {milestone.icon}
                      </div>
                    </div>

                    {/* Empty Space to push box to alternating side */}
                    <div className="hidden md:block w-[55%]"></div>

                    {/* Mobile Layout (Original style) */}
                    <div className="md:hidden flex flex-row items-start w-full pl-[45px] sm:pl-[55px] relative">
                       {/* Mobile Icon */}
                       <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 absolute left-2 sm:left-4 transition-all duration-300 ${activeNode === milestone.id ? 'scale-110 shadow-lg' : 'opacity-80 group-hover:opacity-100'}`}
                          style={{
                            backgroundColor: milestone.color,
                            boxShadow: activeNode === milestone.id ? `0 0 0 4px #031813, 0 0 0 5px ${milestone.color}` : `0 0 0 3px #031813, 0 0 0 2px ${milestone.color}`
                          }}
                        >
                          {milestone.icon}
                        </div>
                        
                        {/* Mobile Box */}
                        <div className={`flex flex-col gap-2 p-4 w-full rounded-xl border shadow-lg transition-all duration-300 ${
                          milestone.isLive 
                            ? (activeNode === milestone.id ? 'bg-emerald-900/30 border-emerald-400/50 ring-1 ring-emerald-500/30' : 'bg-emerald-950/20 border-emerald-500/30')
                            : (activeNode === milestone.id ? 'bg-white/15 border-white/30' : 'bg-black/20 border-gray-700/50')
                        } backdrop-blur-md`}>
                          
                          <div className="flex justify-between items-start w-full mb-1">
                            <span className={`inline-block px-2 py-0.5 rounded-md border text-[0.65rem] font-bold font-sans ${milestone.isLive ? 'bg-teal-950/80 border-teal-400/30 text-emerald-300' : 'bg-gray-800/80 border-gray-600/30 text-gray-400'}`}>
                              {milestone.date}
                            </span>
                            {milestone.isLive && (
                              <span className="bg-emerald-500 text-white text-[8px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded animate-pulse">
                                Live
                              </span>
                            )}
                          </div>
                          <h4 className={`font-bold text-sm leading-snug font-sans transition-colors ${activeNode === milestone.id ? 'text-white' : (milestone.isLive ? 'text-white/90' : 'text-gray-400 group-hover:text-gray-200')}`}>
                            {milestone.title}
                          </h4>

                          {/* Expandable Info on Mobile Only */}
                          <div className="overflow-hidden transition-all duration-300" style={{ height: activeNode === milestone.id ? 'auto' : 0, opacity: activeNode === milestone.id ? 1 : 0, marginTop: activeNode === milestone.id ? '8px' : 0 }}>
                            <p className="text-xs text-teal-50 bg-teal-950/60 p-2.5 rounded-lg border border-teal-800/50 leading-relaxed shadow-inner">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                    </div>
                    
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
