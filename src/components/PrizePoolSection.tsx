import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useInView } from 'framer-motion';
import { Star, Trophy, FileText } from 'lucide-react';

interface AwardItem {
  title: string;
  category: string;
  reward: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  criteria: string[];
}

const awardsList: AwardItem[] = [
  {
    title: '1st Position',
    category: 'Winner',
    reward: 'Certificate + Cash Prize + Trophy',
    description: 'Awarded to the top team demonstrating exceptional technical knowledge, innovation, and sustainability impact.',
    color: '#FFD700',
    icon: <Trophy className="w-8 h-8 text-[#FFD700]" />,
    criteria: ['Highest overall score', 'Exceptional presentation'],
  },
  {
    title: '2nd Position',
    category: 'Runner Up',
    reward: 'Certificate + Cash Prize + Trophy',
    description: 'Awarded to the second best team with an outstanding project and strong societal viability.',
    color: '#C0C0C0',
    icon: <Star className="w-8 h-8 text-[#C0C0C0]" />,
    criteria: ['Strong technical methodology', 'Excellent presentation'],
  },
  {
    title: 'Consolation Award',
    category: 'Special Recognition',
    reward: 'Certificate + Trophy',
    description: 'Given to a team for a standout effort, honorable mention, or unique approach to a problem statement.',
    color: '#CD7F32',
    icon: <FileText className="w-8 h-8 text-[#CD7F32]" />,
    criteria: ['Unique approach', 'Special mention'],
  }
];

const FrameCard = ({ 
  award, 
  className,
  rotation = 0,
}: { 
  award: AwardItem, 
  className: string,
  rotation?: number,
}) => {
  return (
    <motion.div 
      className={`absolute pointer-events-auto group cursor-pointer ${className}`}
      initial={{ rotate: rotation }}
      animate={{ rotate: rotation }}
      whileHover={{ 
        scale: 1.07, 
        rotate: 0, 
        zIndex: 50,
        transition: { type: 'spring', stiffness: 350, damping: 20 }
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      <div className="stamp-card p-3 sm:p-4 bg-[#F5F0E6] shadow-[0_16px_36px_rgba(0,0,0,0.55)] transition-all duration-300 group-hover:bg-[#E8D08B] group-hover:shadow-[0_24px_50px_rgba(0,0,0,0.8)] w-full h-full border border-[#D4C5A9]/50">
        <div className="relative w-full h-full bg-white overflow-hidden rounded-sm border border-black/10">
          
          <div className="absolute inset-0 bg-[#F5F0E6] mix-blend-color z-20 transition-opacity duration-500 group-hover:opacity-0" />
          <div className="absolute inset-0 bg-[#F5F0E6]/80 backdrop-blur-[1px] z-20 transition-opacity duration-500 flex items-center justify-center group-hover:opacity-0">
            <span className="text-[#0b4553]/70 font-bold tracking-widest uppercase text-xs sm:text-sm drop-shadow-sm text-center px-4">
              Hover to Reveal
            </span>
          </div>

          <div className="relative z-10 p-4 sm:p-6 flex flex-col h-full bg-[#FCF9F2]">
             <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 shrink-0 bg-white shadow-sm" style={{ borderColor: award.color }}>
                   <div className="scale-75 sm:scale-100">{award.icon}</div>
                </div>
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-[#0b4553] leading-tight">{award.title}</h3>
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider mt-0.5" style={{ color: award.color }}>{award.category}</p>
                </div>
             </div>
             
             <p className="text-xs sm:text-sm text-[#0b4553]/80 leading-relaxed font-medium line-clamp-3 mb-3">{award.description}</p>
             
             <div className="mt-auto bg-[#0b4553] text-[#F9E7B7] text-[10px] sm:text-xs font-bold px-3 py-2 rounded text-center shadow-inner tracking-wide">
               {award.reward}
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const PrizePoolSection = () => {
  const pivotRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const targetAngle = useMotionValue(70);
  const [isDragging, setIsDragging] = useState(false);
  const hasSwung = useRef(false);

  // Pendulum spring physics — very low damping for slow, graceful, realistic oscillation
  const springConfig = { damping: 3, stiffness: 30, mass: 3 };
  const lampRotation = useSpring(targetAngle, springConfig);

  // Detect when section scrolls into view
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Trigger pendulum swing from 70° when section comes into viewport
  useEffect(() => {
    if (isInView && !hasSwung.current) {
      hasSwung.current = true;
      lampRotation.jump(70);
      targetAngle.jump(70);
      const timer = setTimeout(() => {
        targetAngle.set(0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !pivotRef.current) return;
    const pRect = pivotRef.current.getBoundingClientRect();
    const pivotX = pRect.left + pRect.width / 2;
    const pivotY = pRect.top + pRect.height / 2;
    
    const dx = e.clientX - pivotX;
    const dy = e.clientY - pivotY;

    let angleDeg = (Math.atan2(dx, dy) * 180) / Math.PI;

    if (angleDeg > 60) angleDeg = 60;
    if (angleDeg < -60) angleDeg = -60;

    targetAngle.set(-angleDeg);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
    // Snap back to 0, which triggers the bouncy pendulum oscillation
    targetAngle.set(0); 
  };

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="py-16 md:py-24 relative overflow-hidden bg-cover bg-center border-t border-b border-rose-950/40 text-white scroll-mt-[65px] w-full max-w-full min-h-[90vh] flex flex-col justify-center"
      style={{
        backgroundImage: "url('/backgrounds/bg-maroon.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 z-0" style={{ backgroundImage: "url('/backgrounds/noise-texture.svg')", backgroundRepeat: 'repeat' }} />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/35 z-0" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10 w-full h-full flex flex-col md:flex-row items-center gap-12 md:gap-0 min-h-[820px] md:h-[720px]">
        
        {/* LEFT HALF - Interactive Lamp & Prize Pool Typography */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center relative h-full">
          
          {/* Static Pivot Point: Shifted so it hangs in the half of the half (25% mark / center of left half) */}
          <div ref={pivotRef} className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2 w-4 h-4 pointer-events-none" />
          
          {/* Swinging Pendulum Assembly */}
          <motion.div 
            className="absolute -top-16 md:-top-20 flex flex-col items-center origin-top z-30 touch-none select-none"
            style={{ 
              rotate: lampRotation,
              left: '50%',
              x: '-50%' // Center on pivot
            }}
          >
            {/* Hanging Wire - slightly thicker and proportional */}
            <div className="w-[3px] h-44 md:h-56 bg-[#1A2530] shadow-sm relative z-20">
                {/* Decorative loose wire loop */}
                <svg className="absolute -left-14 top-2 w-14 h-28 pointer-events-none opacity-50" viewBox="0 0 50 100" fill="none">
                    <path d="M 0 0 C 25 50 50 50 50 100" stroke="#1A2530" strokeWidth="2.5" fill="none" />
                </svg>
            </div>
            
            {/* Draggable Lamp Shade - increased size */}
            <div 
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative cursor-grab active:cursor-grabbing group flex flex-col items-center"
            >
              {/* Hitbox for easier grabbing */}
              <div className="absolute inset-[-45px] z-30 rounded-full" />
              
              {/* Lamp Shade Body */}
              <div 
                className="w-32 h-14 md:w-44 md:h-16 bg-[#E8D08B] relative flex justify-center z-20 shadow-2xl group-active:scale-95 transition-transform" 
                style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }}
              >
                 <div className="absolute -top-1.5 w-12 h-3 md:w-14 md:h-3.5 bg-[#2C3E50] rounded-sm" />
              </div>
              
              {/* Glowing Bulb - enlarged with rich ambient glow */}
              <div className="w-8 h-4 md:w-12 md:h-6 bg-[#FFEB3B] rounded-b-full shadow-[0_6px_25px_rgba(255,235,59,0.7),0_0_50px_rgba(255,235,59,0.4)] relative z-10 -mt-1 group-active:scale-95 transition-transform" />
            </div>

            {/* Light Cone (Warm ambient illumination) */}
            <div 
              className="absolute top-[100%] w-[750px] md:w-[950px] h-[850px] md:h-[1050px] pointer-events-none mix-blend-screen origin-top"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 235, 59, 0.16) 0%, rgba(255, 235, 59, 0.04) 40%, transparent 100%)',
                clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
              }}
            />
          </motion.div>

          {/* Prize Pool Title Typography */}
          <div className="relative z-10 max-w-[340px] md:max-w-[420px] text-center md:text-left mt-[240px] md:mt-0">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[4rem] sm:text-[5rem] md:text-[5.5rem] lg:text-[6.5rem] font-black text-[#F9E7B7] drop-shadow-[0_0_15px_rgba(249,231,183,0.3)] tracking-tighter leading-none mb-2 pointer-events-none"
            >
              15000<span className="text-[3rem] sm:text-[4rem] md:text-[4.5rem] text-[#F9E7B7]">+</span>
            </motion.h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 uppercase tracking-widest text-center md:text-left w-full pointer-events-none">
              Prize Pool
            </p>
            <p className="text-sm md:text-base text-white/70 mt-4 max-w-[290px] text-center md:text-left leading-relaxed pointer-events-none">
              Rewarding outstanding technical innovations and research excellence.
            </p>
          </div>
        </div>

        {/* RIGHT HALF - Thrown Stamp Cards Shifted to Extreme Right */}
        <div className="w-full md:w-1/2 relative h-[520px] md:h-full flex items-center justify-end overflow-visible">
            <div className="relative w-full h-full max-w-[480px] sm:max-w-[520px] md:max-w-[560px] mr-0 md:-mr-4 lg:-mr-8">
              {/* Stamp 1: Winner / 1st Position - Top Extreme Right, thrown with tilt */}
              <FrameCard 
                award={awardsList[0]} 
                rotation={-7}
                className="top-[4%] right-[3%] sm:right-[5%] md:right-[2%] w-[88%] sm:w-[320px] md:w-[340px] h-[210px] sm:h-[220px] z-20" 
              />
              
              {/* Stamp 2: Runner Up / 2nd Position - Middle Extreme Right, thrown with opposite tilt & overlapping */}
              <FrameCard 
                award={awardsList[1]} 
                rotation={9}
                className="top-[34%] sm:top-[33%] right-[1%] sm:right-[2%] md:right-[-2%] w-[90%] sm:w-[335px] md:w-[355px] h-[230px] sm:h-[240px] z-30" 
              />
              
              {/* Stamp 3: Consolation Award - Bottom Extreme Right, thrown with tilt */}
              <FrameCard 
                award={awardsList[2]} 
                rotation={-12}
                className="bottom-[4%] right-[5%] sm:right-[8%] md:right-[4%] w-[84%] sm:w-[295px] md:w-[315px] h-[195px] sm:h-[205px] z-10" 
              />
            </div>
        </div>

      </div>
    </section>
  );
};

export default PrizePoolSection;
