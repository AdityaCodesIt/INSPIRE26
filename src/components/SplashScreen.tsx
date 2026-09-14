import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after animation completes (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Give time for exit animation
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Letter animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15 + 0.3,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    }),
  };

  const text = "VIKAS".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cover bg-center overflow-hidden bg-[#F5EDCF]"
          style={{ backgroundImage: "url('/hero-heritage-bg.jpg')" }}
        >
          {/* Subtle light overlay to ensure text contrast if image is busy */}
          <div className="absolute inset-0 bg-white/30" />

          {/* Text Animation */}
          <div className="relative z-10 flex space-x-2 md:space-x-6">
            {text.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="text-7xl md:text-9xl lg:text-[10rem] font-black text-[#0A2540] tracking-widest drop-shadow-sm"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="relative z-10 mt-6 md:mt-10 text-teal-800 tracking-[0.3em] md:tracking-[0.5em] text-xs md:text-lg uppercase font-bold drop-shadow-sm"
          >
            A Research & Idea Colloquium
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
