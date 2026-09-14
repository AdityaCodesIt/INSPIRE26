import { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
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

const FrameCard = ({ award, className }: { award: AwardItem, className: string }) => {
  return (
    <motion.div 
      className={`absolute pointer-events-auto group cursor-pointer ${className}`}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="stamp-card p-3 sm:p-4 bg-[#F5F0E6] shadow-2xl transition-colors duration-500 group-hover:bg-[#E8D08B] w-full h-full">
        <div className="relative w-full h-full bg-white overflow-hidden rounded-sm border border-black/10">
          
          <div className="absolute inset-0 bg-[#F5F0E6] mix-blend-color z-20 transition-opacity duration-500 group-hover:opacity-0" />
          <div className="absolute inset-0 bg-[#F5F0E6]/80 backdrop-blur-[1px] z-20 transition-opacity duration-500 flex items-center justify-center group-hover:opacity-0">
            <span className="text-[#0b4553]/70 font-bold tracking-widest uppercase text-sm drop-shadow-sm text-center px-4">
              Hover to Reveal
            </span>
          </div>

          <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full bg-[#FCF9F2]">
             <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 shrink-0 bg-white" style={{ borderColor: award.color }}>
                   <div className="scale-75 sm:scale-100">{award.icon}</div>
                </div>
                <h3 className="text-base sm:text-xl font-bold text-[#0b4553] leading-tight">{award.title}</h3>
             </div>
             
             <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-2" style={{ color: award.color }}>{award.category}</p>
             <p className="text-xs sm:text-sm text-[#0b4553]/80 leading-relaxed font-medium line-clamp-3 mb-4">{award.description}</p>
             
             <div className="mt-auto bg-[#0b4553] text-[#F9E7B7] text-[10px] sm:text-xs font-bold px-3 py-2 rounded text-center">
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
  const targetAngle = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  // A very bouncy spring so it oscillates "to and fro" when released
  const springConfig = { damping: 8, stiffness: 80, mass: 1.5 };
  const lampRotation = useSpring(targetAngle, springConfig);

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

    if (angleDeg > 75) angleDeg = 75;
    if (angleDeg < -75) angleDeg = -75;

    targetAngle.set(-angleDeg);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
    // Snap back to 0, which triggers the bouncy oscillation
    targetAngle.set(0); 
  };

  return (
    <section
      id="awards"
      className="py-16 md:py-24 relative overflow-hidden bg-cover bg-center border-t border-b border-rose-950/40 text-white scroll-mt-[65px] w-full max-w-full min-h-[90vh] flex flex-col justify-center"
      style={{
        backgroundImage: "url('/backgrounds/bg-maroon.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 z-0" style={{ backgroundImage: "url('/backgrounds/noise-texture.svg')", backgroundRepeat: 'repeat' }} />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/35 z-0" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10 w-full h-full flex flex-col md:flex-row items-center gap-12 md:gap-0 h-[600px] md:h-[700px]">
        
        {/* LEFT COLUMN - Interactive Lamp & Big Text */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start justify-center relative h-full">
          
          {/* Static Pivot Point */}
          <div ref={pivotRef} className="absolute -top-16 md:-top-24 left-1/2 -translate-x-1/2 w-4 h-4 pointer-events-none" />
          
          {/* Swinging Pendulum Assembly */}
          <motion.div 
            className="absolute -top-16 md:-top-24 flex flex-col items-center origin-top z-30 touch-none select-none"
            style={{ 
              rotate: lampRotation,
              left: '50%',
              x: '-50%' // Center on pivot
            }}
          >
            {/* Hanging Wire */}
            <div className="w-[2px] h-40 md:h-56 bg-[#1A2530] shadow-sm relative z-20">
                {/* Decorative loose wire loop */}
                <svg className="absolute -left-12 top-0 w-12 h-24 pointer-events-none opacity-50" viewBox="0 0 50 100" fill="none">
                    <path d="M 0 0 C 25 50 50 50 50 100" stroke="#1A2530" strokeWidth="2" fill="none" />
                </svg>
            </div>
            
            {/* Draggable Lamp Shade */}
            <div 
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative cursor-grab active:cursor-grabbing group flex flex-col items-center"
            >
              {/* Invisible Hitbox for easier grabbing */}
              <div className="absolute inset-[-40px] z-30 rounded-full" />
              
              <div 
                className="w-24 h-10 md:w-32 md:h-12 bg-[#E8D08B] relative flex justify-center z-20 shadow-lg group-active:scale-95 transition-transform" 
                style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }}
              >
                 <div className="absolute -top-1 w-8 h-2 bg-[#2C3E50] rounded-sm" />
              </div>
              
              {/* Glowing Bulb */}
              <div className="w-6 h-3 md:w-8 md:h-4 bg-[#FFEB3B] rounded-b-full shadow-[0_5px_15px_rgba(255,235,59,0.5)] relative z-10 -mt-1 group-active:scale-95 transition-transform" />
            </div>

            {/* Light Cone (Subtle) */}
            <div 
              className="absolute top-[100%] w-[600px] h-[800px] pointer-events-none mix-blend-screen origin-top"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 235, 59, 0.1) 0%, rgba(255, 235, 59, 0.02) 40%, transparent 100%)',
                clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
              }}
            />
          </motion.div>

          <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-black text-[#F9E7B7] drop-shadow-[0_0_15px_rgba(249,231,183,0.3)] tracking-tighter leading-none mb-2 pointer-events-none mt-[250px] md:mt-0"
          >
            15000<span className="text-[3rem] sm:text-[4rem] md:text-[5rem] text-[#F9E7B7]">+</span>
          </motion.h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 uppercase tracking-widest text-center md:text-left w-full pointer-events-none">
            Prize Pool
          </p>
          <p className="text-sm md:text-base text-white/70 mt-4 max-w-[280px] text-center md:text-left leading-relaxed pointer-events-none">
            Rewarding outstanding technical innovations and research excellence.
          </p>
        </div>

        {/* RIGHT COLUMN - Floating Picture Frames */}
        <div className="w-full md:w-2/3 relative h-full flex items-center justify-center">
            <div className="relative w-full h-full max-w-[800px] mx-auto mt-10 md:mt-0">
              <FrameCard award={awardsList[0]} className="top-[5%] left-[5%] w-[85%] sm:w-[50%] md:w-[45%] h-[200px] sm:h-[220px]" />
              <FrameCard award={awardsList[1]} className="top-[35%] right-[5%] w-[90%] sm:w-[55%] md:w-[50%] h-[240px] sm:h-[260px]" />
              <FrameCard award={awardsList[2]} className="bottom-[5%] left-[10%] w-[80%] sm:w-[45%] md:w-[45%] h-[180px] sm:h-[200px]" />
            </div>
        </div>

      </div>
    </section>
  );
};

export default PrizePoolSection;
