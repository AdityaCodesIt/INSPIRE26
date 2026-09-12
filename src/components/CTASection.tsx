import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section id="register" className="relative pt-24 pb-0 overflow-hidden bg-transparent">

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">

        {/* Main Title */}
        <motion.div
          className="mb-6 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="font-sans text-lg md:text-xl font-medium text-text-dark mb-2">Be a Part of</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-navy leading-tight">
            Vikas<br />Viksit Bharat
          </h2>
        </motion.div>

        {/* Supporting Line */}
        <motion.p
          className="text-base md:text-lg font-sans font-medium text-text-dark mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Present <span className="text-brand-orange mx-2 font-bold">|</span> Participate <span className="text-brand-orange mx-2 font-bold">|</span> Network <span className="text-brand-orange mx-2 font-bold">|</span> Build Together
        </motion.p>

        {/* Event Details Box */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6 p-4 px-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-brand-navy text-2xl">📅</span>
            <p className="font-semibold text-brand-navy font-sans text-sm md:text-base">16–18 Jan 2026</p>
          </div>

          <div className="hidden sm:block w-2 h-2 rounded-full bg-brand-orange"></div>

          <div className="flex items-center gap-3">
            <span className="text-brand-navy text-2xl">📍</span>
            <p className="font-semibold text-brand-navy font-sans text-sm md:text-base">Shree L.R. Tiwari College</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="#register-form"
          className="btn-primary z-20 shadow-lg px-10"
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
