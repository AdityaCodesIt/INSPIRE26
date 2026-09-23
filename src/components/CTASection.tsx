import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="relative text-white w-full max-w-full py-16 sm:py-20 flex flex-col items-center justify-center">
      <div id="register" className="absolute top-0 pointer-events-none scroll-mt-[65px]" />

      {/* Main Title & Action */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center py-6">
        <motion.div
          className="mb-6 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="font-sans text-lg md:text-xl font-medium text-amber-200/95 mb-2">Be a Part of</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            Inspire 2026
          </h2>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="https://registration-page-vercel.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
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
    </section>
  );
};

export default CTASection;
