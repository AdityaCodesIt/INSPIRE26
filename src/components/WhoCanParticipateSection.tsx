import { useState } from 'react';
import { motion } from 'framer-motion';

interface CategoryInfo {
  title: string;
  degree: string;
  teamSize: string;
  description: string;
  align?: 'left' | 'right' | 'center';
}

const ParticipantBox = ({ imgSrc, className, bgImage, info, flipImage, imgClassName, flipOnHover }: { imgSrc: string, className?: string, bgImage?: string, info: CategoryInfo, flipImage?: boolean, imgClassName?: string, flipOnHover?: boolean }) => {
  const [isToggled, setIsToggled] = useState(false);

  // Calculate text positioning and character shift
  const isLeft = info.align === 'left';
  const isRight = info.align === 'right';
  
  const textClass = isLeft 
    ? "absolute top-2 sm:top-4 left-2 sm:-left-12 lg:-left-28 w-52 sm:w-64 lg:w-72 z-30 flex flex-col items-start text-left pointer-events-none" 
    : isRight 
    ? "absolute top-2 sm:top-4 right-2 sm:-right-12 lg:-right-28 w-52 sm:w-64 lg:w-72 z-30 flex flex-col items-start text-left pointer-events-none"
    : "absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-30 flex flex-col items-center text-center pointer-events-none";

  const charShiftX = isLeft ? 50 : isRight ? -50 : 0;
  
  const hoverScaleX = flipImage 
    ? (flipOnHover ? 1.15 : -1.15) 
    : (flipOnHover ? -1.15 : 1.15);

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div 
        initial="initial"
        animate={isToggled ? "hover" : "initial"}
        whileHover="hover"
        variants={{
          initial: { zIndex: 10 },
          hover: { zIndex: 50 }
        }}
        onClick={() => setIsToggled((prev) => !prev)}
        className={`group relative flex items-center justify-center cursor-pointer select-none ${className}`}
        style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      >
        {/* The stamp card background (lies down on hover/tap) */}
        <motion.div
          variants={{
            initial: { rotateX: 0, y: 0, scale: 1, opacity: 1 },
            hover: { rotateX: 65, y: 30, scale: 0.95, opacity: 0.6 }
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="absolute inset-0 stamp-card shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[#F5F0E6] p-2.5 sm:p-4 origin-bottom"
        >
          {/* Inner frame for the stamp card */}
          <div className="relative w-full h-full overflow-hidden border border-black/10 rounded-sm bg-[#1A202C] flex items-center justify-center">
            {bgImage && (
              <div 
                className="absolute inset-0 opacity-60 bg-cover bg-center brightness-105"
                style={{ backgroundImage: `url('${bgImage}')` }}
              />
            )}
            
            {/* Subtle Glow inside the box */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
          </div>
        </motion.div>

        {/* The Character Image (pops up out of the box on hover/tap) */}
        <motion.img 
          variants={{
            initial: { y: 0, x: 0, scaleX: flipImage ? -1 : 1, scaleY: 1 },
            hover: { y: -50, x: charShiftX, scaleX: hoverScaleX, scaleY: 1.15 }
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          src={imgSrc} 
          alt={info.title} 
          className={`relative z-20 drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] pointer-events-none ${imgClassName || 'w-full h-full object-contain p-6 sm:p-12'}`} 
        />

        {/* Info Text (Revealed on hover/tap) */}
        <motion.div 
          variants={{
            initial: { opacity: 0, y: 20, scale: 0.95, pointerEvents: 'none' },
            hover: { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' }
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }}
          className={textClass}
        >
          <div className="p-2 sm:p-4 w-full">
            <h3 className="text-sm sm:text-xl font-extrabold text-[#F5EDCF] mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">{info.title}</h3>
            <p className="text-[10px] sm:text-sm text-amber-300 font-bold mb-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">{info.degree}</p>
            <div className="mb-2">
              <span className="text-[9px] sm:text-xs text-[#F5EDCF] bg-black/25 px-2.5 py-0.5 rounded-full inline-block font-semibold border border-white/15 shadow-sm backdrop-blur-xs">
                Team Size: {info.teamSize}
              </span>
            </div>
            <p className="text-[9px] sm:text-[11px] text-[#F5EDCF] opacity-95 leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
              {info.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const WhoCanParticipateSection = () => {
  return (
    <section
      id="eligibility"
      className="py-12 md:py-24 relative overflow-hidden bg-cover bg-center border-t border-b border-teal-950/20 w-full min-h-[90vh] flex flex-col justify-center"
      style={{
        backgroundImage: "url('/backgrounds/bg-sage.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Tactile Fine Grain Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-55 z-0"
        style={{
          backgroundImage: "url('/backgrounds/noise-texture.svg')",
          backgroundRepeat: 'repeat',
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/30 z-0" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 w-full flex flex-col items-center">
        
        {/* Top Left Header Section */}
        <div className="max-w-3xl mb-8 md:mb-14 relative z-20 self-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#0A2540] tracking-tight drop-shadow-sm mb-2">
              Who Can Participate?
            </h2>
            <div className="w-16 sm:w-20 h-1 sm:h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-3" />
            <p className="text-xs sm:text-base text-[#0A2540]/80 font-sans leading-relaxed font-medium">
              Review our eligibility criteria below to find the right category for you and your team.{' '}
              <span className="md:hidden">Tap on any card to view details.</span>
              <span className="hidden md:inline">Hover on card to see more detail.</span>
            </p>
          </motion.div>
        </div>

        <div className="w-full max-w-5xl flex flex-col gap-6 md:gap-10 items-center">
          
          {/* ROW 1: UG & Diploma Students (Moved to Row 1 as requested) */}
          <div className="flex flex-col items-center w-full">
            <ParticipantBox 
              imgSrc="/images/participants/ug_new_character.png" 
              bgImage="/images/participants/ug_new_bg.png"
              className="w-full max-w-3xl h-[280px] sm:h-[350px] md:h-[420px]"
              info={{
                title: 'UG & Diploma Students',
                degree: 'B.E. / B.Tech / Diploma (All Years)',
                teamSize: '2 to 4 Members',
                description: 'Designed for enthusiastic undergraduate and diploma students working on innovative concepts, working prototypes, and technical solutions to real-world challenges.',
                align: 'left'
              }}
            />
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-cinzel font-black text-[#0A2540] tracking-[0.14em] uppercase text-center drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
            >
              UG / Diploma
            </motion.h3>
          </div>

          {/* ROW 2: Two Boxes (PG & PPG) (Moved to Row 2 as requested) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 w-full max-w-5xl mt-2 sm:mt-4">
            {/* Left: Postgraduate (PG) */}
            <div className="flex flex-col items-center w-full">
              <ParticipantBox 
                imgSrc="/images/participants/pg_new_character.png" 
                bgImage="/images/participants/pg_new_bg.png"
                className="w-full h-[250px] sm:h-[300px] md:h-[350px]"
                info={{
                  title: 'Postgraduate (PG) Scholars',
                  degree: 'M.E. / M.Tech / M.S. / MCA',
                  teamSize: 'Individual Submission',
                  description: 'A platform for master’s students presenting advanced research papers, rigorous experimental studies, and algorithm implementations.',
                  align: 'left'
                }}
              />
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-cinzel font-black text-[#0A2540] tracking-[0.16em] uppercase text-center drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
              >
                PG
              </motion.h3>
            </div>
            
            {/* Right: Doctoral / PhD Researchers (PPG) */}
            <div className="flex flex-col items-center w-full">
              <ParticipantBox 
                imgSrc="/images/participants/ppg_new_character.png" 
                bgImage="/images/participants/bg_new_scientist.png"
                className="w-full h-[250px] sm:h-[300px] md:h-[350px]"
                flipImage={false}
                imgClassName="absolute bottom-2 right-0 w-[55%] sm:w-[45%] h-auto max-h-[75%] object-contain"
                info={{
                  title: 'Doctoral / PhD Researchers',
                  degree: 'Ph.D. & Post-Doctoral Fellows',
                  teamSize: 'Individual Submission',
                  description: 'Academic stage for doctoral scholars presenting pioneering deep-tech models, novel frameworks, and patented ideas.',
                  align: 'right'
                }}
              />
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-cinzel font-black text-[#0A2540] tracking-[0.16em] uppercase text-center drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
              >
                PPG
              </motion.h3>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default WhoCanParticipateSection;
