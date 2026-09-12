import { motion } from 'framer-motion';

const AwardsFAQSection = () => {
  return (
    <section id="awards" className="relative flex flex-col lg:flex-row">

      {/* Left Panel: Awards */}
      <div className="lg:w-1/2 p-4 md:p-8 flex items-center justify-center">
        <div 
          className="bg-[#0b4553] w-full text-white pt-10 pb-6 px-2 lg:px-6 relative rounded-sm shadow-2xl overflow-hidden flex flex-col justify-center bg-cover bg-center bg-no-repeat border-[2px] border-white/10"
          style={{ backgroundImage: "url('/award-bg.jpg')" }}
        >
          {/* Dark overlay to ensure text contrast if needed */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-multiply"></div>

          <div className="relative z-10 flex flex-col items-center w-full">
            {/* Heading on Brush Stroke */}
            <div className="relative inline-block mb-1 mt-2">
              <svg className="absolute inset-0 w-[110%] h-[150%] -left-[5%] -top-[25%] text-[#F9E7B7] drop-shadow-sm" preserveAspectRatio="none" viewBox="0 0 200 40">
                <path fill="currentColor" d="M 5,20 C 15,10 50,5 100,5 C 150,5 185,10 195,20 C 190,35 150,38 100,38 C 50,38 10,35 5,20 Z" filter="url(#rough-edge)" />
                <defs>
                  <filter id="rough-edge">
                    <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>
              <h2 className="relative z-10 text-lg md:text-2xl font-bold tracking-wider font-sans text-[#0b4553] uppercase italic px-4 py-1">
                AWARDS & PRIZE POOL
              </h2>
            </div>
            
            <p className="relative z-10 font-sans text-xs md:text-base italic opacity-95 text-white mb-8 mt-3 tracking-wide text-center">
              Recognizing Ideas. Rewarding Impact.
            </p>

            {/* Awards Grid */}
            <div className="relative z-10 flex flex-row items-start justify-center w-full max-w-2xl mx-auto divide-x divide-white/20 mb-8">
              {[
                { title: 'Best Research\nPaper', icon: <path d="M19,2H5C3.89,2 3,2.89 3,4V6C3,8.21 4.79,10 7,10C7.54,12.8 10.03,15 13,15V19H9V21H15V19H11V15C13.97,15 16.46,12.8 17,10C19.21,10 21,8.21 21,6V4C21,2.89 20.11,2 19,2M7,8C5.9,8 5,7.1 5,6V4H7V8M19,6C19,7.1 18.1,8 17,8V4H19V6Z"/> },
                { title: 'Best Innovation\nAward', icon: <path d="M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 7.76,14.74C8.36,15.22 8.5,15.5 8.5,16V17H15.5V16C15.5,15.5 15.64,15.22 16.24,14.74C17.81,13.47 19,11.38 19,9A7,7 0 0,0 12,2M8.5,20V19H15.5V20A2,2 0 0,1 13.5,22H10.5A2,2 0 0,1 8.5,20Z"/> },
                { title: 'People\'s Choice\nAward', icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/> },
                { title: 'Special Mention\n(UNSDG Alignment)', icon: <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/> },
              ].map((award, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-1 sm:px-2 text-center">
                  <div className="relative w-14 h-14 sm:w-20 sm:h-20 mb-2 flex items-center justify-center">
                    {/* Laurel Wreath */}
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="absolute inset-0 w-full h-full text-[#F6D056] opacity-90 scale-[1.1]">
                      <path d="M25,85 Q10,55 30,15" />
                      <path d="M75,85 Q90,55 70,15" />
                      <path d="M25,85 Q35,80 29,70 Q20,75 25,85" fill="currentColor" stroke="none" />
                      <path d="M22,65 Q32,60 26,50 Q17,55 22,65" fill="currentColor" stroke="none" />
                      <path d="M21,45 Q31,40 25,30 Q16,35 21,45" fill="currentColor" stroke="none" />
                      <path d="M25,25 Q35,20 29,10 Q20,15 25,25" fill="currentColor" stroke="none" />
                      
                      <path d="M75,85 Q65,80 71,70 Q80,75 75,85" fill="currentColor" stroke="none" />
                      <path d="M78,65 Q68,60 74,50 Q83,55 78,65" fill="currentColor" stroke="none" />
                      <path d="M79,45 Q69,40 75,30 Q84,35 79,45" fill="currentColor" stroke="none" />
                      <path d="M75,25 Q65,20 71,10 Q80,15 75,25" fill="currentColor" stroke="none" />
                    </svg>
                    {/* Inner Icon */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-10 sm:h-10 text-[#F6D056] relative z-10 mt-1 drop-shadow-md">
                      {award.icon}
                    </svg>
                  </div>
                  <p className="font-sans text-[0.55rem] sm:text-[0.75rem] md:text-sm font-semibold text-white whitespace-pre-line leading-tight">
                    {award.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Banner */}
            <div className="relative inline-block mt-4 mb-2">
              <svg className="absolute inset-0 w-[110%] h-[150%] -left-[5%] -top-[25%] text-[#F9E7B7] drop-shadow-md" preserveAspectRatio="none" viewBox="0 0 200 40">
                <path fill="currentColor" d="M 5,20 C 15,10 50,8 100,8 C 150,8 185,10 195,20 C 190,32 150,34 100,34 C 50,34 10,32 5,20 Z" filter="url(#rough-edge2)" />
                <defs>
                  <filter id="rough-edge2">
                    <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>
              <div className="relative z-10 flex items-center justify-center gap-2 px-4 py-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-6 md:h-6 text-[#0b4553]">
                  <path d="M19,2H5C3.89,2 3,2.89 3,4V6C3,8.21 4.79,10 7,10C7.54,12.8 10.03,15 13,15V19H9V21H15V19H11V15C13.97,15 16.46,12.8 17,10C19.21,10 21,8.21 21,6V4C21,2.89 20.11,2 19,2M7,8C5.9,8 5,7.1 5,6V4H7V8M19,6C19,7.1 18.1,8 17,8V4H19V6Z"/>
                </svg>
                <span className="text-xs md:text-lg font-bold tracking-wide font-sans text-[#0b4553]">
                  Attractive Cash Prizes & Awards
                </span>
              </div>
            </div>
          </div>
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
