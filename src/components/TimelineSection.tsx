import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const milestones = [
  { id: 1, title: 'Abstract Submission Opens', date: '1 Aug 2025', icon: '📄', color: '#138808' },
  { id: 2, title: 'Abstract Submission Deadline', date: '30 Oct 2025', icon: '⌛', color: '#CC0000' },
  { id: 3, title: 'Acceptance Notification', date: '15 Nov 2025', icon: '✉️', color: '#0A2A5E' },
  { id: 4, title: 'Early Bird Registration Deadline', date: '15 Dec 2025', icon: '🎟️', color: '#FF6B00' },
  { id: 5, title: 'Final Registration Deadline', date: '5 Jan 2026', icon: '❗', color: '#CC0000' },
  { id: 6, title: 'Conference Dates', date: '16 – 18 Jan 2026', icon: '🎉', color: '#8B008B' },
];

const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="schedule" className="py-24 relative overflow-hidden bg-transparent" ref={containerRef}>
      
      

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-navy mb-2">Key Dates</h2>
          <p className="text-sm text-text-muted font-sans font-medium">
            Mark your calendar and be part of the journey.
          </p>
        </motion.div>

        {/* Desktop Timeline Experience */}
        <div className="hidden lg:block relative pb-10">
          
          {/* Custom SVG Curved Path */}
          <svg className="absolute top-7 left-0 w-full h-24 -z-10" preserveAspectRatio="none" viewBox="0 0 1000 100">
             <motion.path 
               d="M 50 50 Q 150 10, 250 50 T 450 50 T 650 50 T 850 50 T 950 50" 
               className="timeline-connector"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
               transition={{ duration: 2, ease: "easeInOut" }}
             />
          </svg>

          <div className="flex justify-between items-start relative w-full">
            {milestones.map((milestone, index) => {
              
              return (
                <div 
                  key={milestone.id} 
                  className="flex flex-col items-center w-36 cursor-default"
                >
                  {/* Icon Circle */}
                  <motion.div 
                    className="timeline-node text-2xl mb-4 text-white"
                    style={{ '--node-color': milestone.color } as React.CSSProperties}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    {milestone.icon}
                  </motion.div>
                  
                  {/* Text Details */}
                  <motion.div 
                    className="text-center mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                  >
                    <p className="font-bold text-[0.8rem] text-brand-navy leading-snug mb-1">
                      {milestone.title}
                    </p>
                    <p className="text-xs font-semibold text-text-muted">
                      {milestone.date}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden mt-10 flex flex-col gap-8">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={milestone.id}
                className="flex items-center gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative">
                   {index < milestones.length - 1 && (
                     <div className="absolute top-14 left-1/2 -translate-x-1/2 w-0.5 h-12 border-l-2 border-dashed border-gray-400"></div>
                   )}
                   <div 
                     className="w-12 h-12 rounded-full flex items-center justify-center text-xl text-white shadow-[0_0_0_3px_white,0_0_0_5px_var(--node-color)] relative z-10"
                     style={{ '--node-color': milestone.color, backgroundColor: milestone.color } as React.CSSProperties}
                   >
                     {milestone.icon}
                   </div>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-navy text-sm mb-1">{milestone.title}</h4>
                  <span className="text-xs font-semibold text-text-muted">
                    {milestone.date}
                  </span>
                </div>
              </motion.div>
            ))}
        </div>
        
        {/* Decorative element */}
        <motion.div 
           className="absolute right-0 bottom-[-40px] hidden lg:block"
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <p className="font-handwriting text-2xl text-brand-navy transform -rotate-[10deg] opacity-80">
            Different Minds.<br/>A Stronger Bharat.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;
