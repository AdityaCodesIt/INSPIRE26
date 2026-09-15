import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const CTASection = () => {
  return (
    <section 
      className="relative overflow-hidden bg-cover bg-center border-t border-amber-950/40 text-white w-full max-w-full h-full min-h-screen flex flex-col justify-between pt-16 pb-20"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(20, 15, 10, 0.35), rgba(5, 5, 5, 0.65)), url('/cta-college-bg.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      <div id="register" className="absolute top-0 pointer-events-none scroll-mt-[65px]" />
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

      {/* Top balance spacer */}
      <div className="hidden md:block w-full h-4" />

      {/* Main Title & Action */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center my-auto py-6">
        <motion.div
          className="mb-6 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="font-sans text-lg md:text-xl font-medium text-amber-200/95 mb-2">Be a Part of</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            Vikas 2026
          </h2>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="#register-form"
          className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold z-20 shadow-2xl px-12 py-3.5 rounded-full text-base tracking-wide transition-all transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register Now <span className="ml-2 font-normal">→</span>
        </motion.a>
      </div>

      {/* Bottom Row: Contact (Left) & Address (Right) */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 relative z-10 pb-16 sm:pb-20 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-left">
          
          {/* Left Bottom: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start max-w-md"
          >
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-300 font-bold mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              Contact
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white/95">
              IEEE SLRTCE Student Branch
            </p>
            <div className="flex flex-col gap-1 text-xs text-amber-100/80 mt-1">
              <a href="mailto:contact@vikas2026.org" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <Mail className="w-3 h-3 text-amber-400 shrink-0" />
                <span>contact@vikas2026.org</span>
              </a>
              <a href="tel:+919876543210" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                <Phone className="w-3 h-3 text-amber-400 shrink-0" />
                <span>+91 98765 43210</span>
              </a>
            </div>
          </motion.div>

          {/* Right Bottom: Address */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start sm:items-end sm:text-right max-w-md"
          >
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-amber-300 font-bold mb-1.5 flex items-center gap-1.5 sm:flex-row-reverse">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Address
            </span>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
              Shree L. R. Tiwari Educational Campus,<br />
              Mira Road-East, THANE-401107
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
