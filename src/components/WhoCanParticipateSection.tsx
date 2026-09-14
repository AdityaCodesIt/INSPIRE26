import { motion } from 'framer-motion';

interface CategoryInfo {
  title: string;
  degree: string;
  teamSize: string;
  description: string;
  align?: 'left' | 'right' | 'center';
}

const ParticipantBox = ({ imgSrc, className, bgImage, info, flipImage }: { imgSrc: string, className?: string, bgImage?: string, info: CategoryInfo, flipImage?: boolean }) => {
  
  // Calculate text positioning and character shift
  const isLeft = info.align === 'left';
  const isRight = info.align === 'right';
  
  const textClass = isLeft 
    ? "absolute top-4 -left-4 md:-left-12 w-48 md:w-64 z-30 flex flex-col items-start text-left pointer-events-none" 
    : isRight 
    ? "absolute top-4 -right-4 md:-right-12 w-48 md:w-64 z-30 flex flex-col items-start text-left pointer-events-none"
    : "absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-30 flex flex-col items-center text-center pointer-events-none";

  const charShiftX = isLeft ? 30 : isRight ? -30 : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover="hover"
      variants={{ hover: { zIndex: 50 } }}
      className={`group relative flex items-center justify-center cursor-pointer ${className}`}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      {/* The stamp card background (lies down on hover) */}
      <motion.div
        variants={{
          hover: { rotateX: 65, y: 30, scale: 0.95, opacity: 0.6 }
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="absolute inset-0 stamp-card shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[#F5F0E6] p-3 sm:p-4 origin-bottom"
      >
        {/* Inner frame for the stamp card */}
        <div className="relative w-full h-full overflow-hidden border border-black/10 rounded-sm bg-[#1A202C] flex items-center justify-center">
          {/* Box Background */}
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

      {/* The Character Image (pops up out of the box) */}
      <motion.img 
        initial={{ scaleX: flipImage ? -1 : 1, scaleY: 1 }}
        variants={{
          hover: { y: -50, x: charShiftX, scaleX: flipImage ? -1.15 : 1.15, scaleY: 1.15 }
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        src={imgSrc} 
        alt="Participant Category" 
        className="relative z-20 w-full h-full object-contain p-8 sm:p-12 drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] pointer-events-none" 
      />

      {/* The Info Text */}
      <motion.div 
        variants={{
          hover: { opacity: 1, y: 0, scale: 1 }
        }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 }}
        className={textClass}
      >
        <div className="bg-[#0A2540]/95 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl w-full">
          <h3 className="text-sm sm:text-lg font-bold text-white mb-1 drop-shadow-md">{info.title}</h3>
          <p className="text-[10px] sm:text-xs text-amber-400 font-semibold mb-2 drop-shadow-sm">{info.degree}</p>
          <div className="mb-2">
            <span className="text-[9px] sm:text-[10px] text-white/90 bg-white/10 px-3 py-1 rounded-full inline-block backdrop-blur-md border border-white/10 shadow-sm">
              Team Size: {info.teamSize}
            </span>
          </div>
          <p className="text-[9px] sm:text-[10px] text-white/80 leading-relaxed line-clamp-2 sm:line-clamp-4">
            {info.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WhoCanParticipateSection = () => {
  return (
    <section
      id="eligibility"
      className="py-16 md:py-24 relative overflow-hidden bg-cover bg-center border-t border-b border-teal-950/20 w-full min-h-[90vh] flex flex-col justify-center"
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
        
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 border border-white/20 text-[#0A2540] text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
            <span>Eligibility</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0A2540] tracking-tight drop-shadow-sm">
            Who Can Participate?
          </h2>
        </motion.div>

        <div className="w-full max-w-5xl flex flex-col gap-8 md:gap-10 items-center">
          
          {/* TOP ROW: Two Small Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full max-w-4xl">
            {/* Left: Graduate Boy + Robotics BG */}
            <ParticipantBox 
              imgSrc="/images/participants/img2.png" 
              bgImage="/images/participants/bg_robotics.png"
              className="h-[300px] md:h-[350px]"
              info={{
                title: 'Postgraduate (PG) Scholars',
                degree: 'M.E. / M.Tech / M.S. / MCA',
                teamSize: 'Individual Submission',
                description: 'A platform for master’s students presenting advanced research papers, rigorous experimental studies, and algorithm implementations.',
                align: 'left'
              }}
            />
            
            {/* Right: Experimental Boy + Scientist BG */}
            <ParticipantBox 
              imgSrc="/images/participants/img3.png" 
              bgImage="/images/participants/bg_scientist.jpg"
              className="h-[300px] md:h-[350px]"
              flipImage={true}
              info={{
                title: 'Doctoral / PhD Researchers',
                degree: 'Ph.D. & Post-Doctoral Fellows',
                teamSize: 'Individual Submission',
                description: 'Academic stage for doctoral scholars presenting pioneering deep-tech models, novel frameworks, and patented ideas.',
                align: 'right'
              }}
            />
          </div>

          {/* BOTTOM ROW: One Slightly Bigger Box in Middle + Kiddo + College BG */}
          <ParticipantBox 
            imgSrc="/images/participants/img1_new.png" 
            bgImage="/images/participants/bg_college.jpg"
            className="w-full max-w-3xl h-[400px] md:h-[450px]"
            info={{
              title: 'UG & Diploma Students',
              degree: 'B.E. / B.Tech / Diploma (All Years)',
              teamSize: '2 to 4 Members',
              description: 'Designed for enthusiastic undergraduate and diploma students working on innovative concepts, working prototypes, and technical solutions to real-world challenges.',
              align: 'left'
            }}
          />
          
        </div>

      </div>
    </section>
  );
};

export default WhoCanParticipateSection;
