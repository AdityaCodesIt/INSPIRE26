import { motion } from 'framer-motion';

const AwardsFAQSection = () => {
  return (
    <section id="awards" className="relative flex flex-col lg:flex-row min-h-[500px]">
      
      {/* Left Panel: Awards */}
      <div className="lg:w-1/2 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-[#1B4A4A] w-full text-white py-12 px-6 lg:px-12 relative rounded-3xl shadow-2xl border-2 border-dashed border-[#C8B89A]/30 flex flex-col justify-center h-full">
          <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-wide mb-1 font-sans text-bg-cream">AWARDS & PRIZE POOL</h2>
          <p className="font-sans text-sm italic opacity-90 text-white">Recognizing Ideas. Rewarding Impact.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { title: 'Best Research Paper', icon: '🏆' },
            { title: 'Best Innovation Award', icon: '💡' },
            { title: 'People\'s Choice Award', icon: '👥' },
            { title: 'Special Mention (UNSDG)', icon: '⭐' },
          ].map((award, i) => (
            <motion.div 
              key={i}
              className="award-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="icon">{award.icon}</div>
              <p className="title leading-tight">{award.title}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="bg-accent-gold text-text-dark font-bold py-3 px-8 rounded-sm text-center inline-flex items-center justify-center w-full max-w-sm mx-auto shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="text-[1.1rem] tracking-wide">Attractive Cash Prizes & Awards</span>
        </motion.div>
        </div>
      </div>

      {/* Right Panel: FAQ */}
      <div className="lg:w-1/2 bg-transparent py-12 px-6 lg:px-16 flex flex-col justify-start overflow-y-auto" style={{ maxHeight: '800px' }}>
         <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center lg:text-left"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-bg-dark-teal tracking-wide mb-1 font-sans uppercase">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="font-handwriting text-2xl opacity-90 text-text-muted">Your queries, answered</p>
        </motion.div>

        <div className="flex flex-col gap-4 pb-12">
          {[
            { q: "What is VIKAS 2026?", a: "An IEEE SLRTCE research colloquium aligning student innovation with Viksit Bharat @2047 and the UN SDGs." },
            { q: "Who can participate?", a: "PPG (PhD), PG (ME/M.Tech), and UG & Diploma students, evaluated as separate categories." },
            { q: "Team size?", a: "PPG & PG: individual only. UG & Diploma: 2–4 members." },
            { q: "Online or offline?", a: "Round 1 (abstract) is online; Rounds 2–3 are on-campus, 3 Oct 2026." },
            { q: "What is submitted in Round 1?", a: "A structured abstract plus a presentation PDF: problem statement, proposed solution, track, and UNSDG alignment." }
          ].map((faq, i) => (
            <motion.div 
              key={i}
              className="p-5 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <h3 className="font-bold text-brand-navy mb-2 text-sm md:text-base">{faq.q}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default AwardsFAQSection;
