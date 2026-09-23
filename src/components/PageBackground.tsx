import React from 'react';
import { motion } from 'framer-motion';

const PageBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-theme-ivory">
      {/* Texture Layer */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/handmade-paper.png')" }}></div>

      {/* Subtle Watercolor Edges - Placeholders */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-64 opacity-15 md:blur-3xl"
        style={{
          background: 'linear-gradient(to top, #1F4287, transparent)'
        }}
      />

      {/* Edge decorative monuments placeholder */}
      <div className="absolute bottom-10 left-10 opacity-[0.05] grayscale w-48 h-48 rounded-full bg-theme-navy/10 md:blur-xl"></div>
      <div className="absolute top-40 right-10 opacity-[0.05] grayscale w-64 h-64 rounded-full bg-theme-saffron/10 md:blur-xl"></div>
    </div>
  );
};

export default PageBackground;
