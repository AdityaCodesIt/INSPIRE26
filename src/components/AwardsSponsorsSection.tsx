import { motion } from 'framer-motion';

const AwardsSponsorsSection = () => {
  return (
    <section id="awards" className="relative w-full py-8 md:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 min-h-[500px]">
        {/* Left Panel: Awards */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="bg-[#1B4A4A] w-full text-white py-8 sm:py-12 px-6 lg:px-12 relative rounded-3xl shadow-2xl border-2 border-dashed border-[#C8B89A]/30 flex flex-col justify-center">
            <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide mb-1 font-sans">AWARDS & PRIZE POOL</h2>
            <p className="font-sans text-sm italic opacity-90 text-white">Recognizing Ideas. Rewarding Impact.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 sm:mb-12">
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

        {/* Right Panel: Sponsors */}
        <div className="w-full lg:w-1/2 bg-transparent py-8 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-12 flex flex-col justify-center">
           <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-10 text-center lg:text-left"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-bg-dark-teal tracking-wide mb-1 font-sans uppercase">OUR SPONSORS</h2>
            <p className="font-handwriting text-2xl opacity-90 text-text-muted">Powered by Visionary Partners</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
            {[
              'Title Sponsor', 'Gold Sponsor', 'Silver Sponsor', 
              'Technology Partner', 'Knowledge Partner', 'Outreach Partner'
            ].map((sponsor, i) => (
              <motion.div 
                key={i} 
                className="sponsor-box"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="w-10 h-10 bg-[#F0F0F0] rounded-sm mb-1 flex items-center justify-center text-[0.6rem] text-[#CCC]">Logo</div>
                <p className="text-center">{sponsor}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.p 
            className="text-center text-xs opacity-70 tracking-[0.2em] font-medium text-text-dark mt-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Inspire <span className="text-brand-orange font-bold mx-2">+</span> Support <span className="text-brand-orange font-bold mx-2">+</span> Build the Future
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AwardsSponsorsSection;
