import { motion } from 'framer-motion';
import { Trophy, Sparkles, Star, Globe2, Lightbulb, FileText, CheckCircle } from 'lucide-react';

interface AwardItem {
  title: string;
  category: string;
  reward: string;
  description: string;
  color: string;
  borderColor: string;
  icon: React.ReactNode;
  criteria: string[];
}

const awardsList: AwardItem[] = [
  {
    title: 'Best Research Paper Award',
    category: 'Academic Rigor & Originality',
    reward: 'Cash Prize + Memento + IEEE Certificate of Merit',
    description: 'Conferred upon the submission demonstrating the highest level of scholarly depth, research methodology, rigorous experimentation, and academic novelty.',
    color: '#F6D056',
    borderColor: 'rgba(246, 208, 86, 0.4)',
    icon: <FileText className="w-8 h-8 text-[#F6D056]" />,
    criteria: [
      'Original research methodology',
      'Literature benchmarking & depth',
      'Robust statistical or experimental data',
    ],
  },
  {
    title: 'Best Innovation Award',
    category: 'Product & Prototype Feasibility',
    reward: 'Cash Prize + Trophy + IEEE Certificate of Merit',
    description: 'Awarded to the most groundbreaking working model, hardware prototype, or software system demonstrating tangible engineering ingenuity and market feasibility.',
    color: '#FF6B00',
    borderColor: 'rgba(255, 107, 0, 0.4)',
    icon: <Lightbulb className="w-8 h-8 text-[#FF6B00]" />,
    criteria: [
      'Working proof-of-concept or prototype',
      'Commercial or societal viability',
      'Original problem-solving architecture',
    ],
  },
  {
    title: 'People’s Choice Award',
    category: 'Peer Voting & Audience Resonance',
    reward: 'Cash Prize + Citation + IEEE Certificate',
    description: 'Determined through interactive audience and peer appreciation based on live presentation clarity, charismatic communication, and relatable real-world impact.',
    color: '#38BDF8',
    borderColor: 'rgba(56, 189, 248, 0.4)',
    icon: <Star className="w-8 h-8 text-[#38BDF8]" />,
    criteria: [
      'Engaging presentation & storytelling',
      'High peer & attendee voting score',
      'Clarity of concept communication',
    ],
  },
  {
    title: 'Special Mention (UNSDG Alignment)',
    category: 'Sustainability & Viksit Bharat @2047',
    reward: 'Cash Prize + Special Plaque + IEEE Certificate',
    description: 'Recognizes exceptional technological solutions aimed directly at advancing the United Nations Sustainable Development Goals and India’s Vision 2047 milestones.',
    color: '#34D399',
    borderColor: 'rgba(52, 211, 153, 0.4)',
    icon: <Globe2 className="w-8 h-8 text-[#34D399]" />,
    criteria: [
      'Direct mapping to UN SDG indicators',
      'Contribution to national growth mission',
      'Measurable sustainability outcomes',
    ],
  },
];

const PrizePoolSection = () => {
  return (
    <section
      id="awards"
      className="py-16 md:py-24 relative overflow-hidden bg-cover bg-center border-t border-b border-rose-950/40 text-white scroll-mt-[65px] w-full max-w-full min-h-[calc(100vh-65px)] flex flex-col justify-center"
      style={{
        backgroundImage: "url('/backgrounds/bg-maroon.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
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

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Brush Stroke Title Badge */}
          <div className="relative inline-block mb-3">
            <svg
              className="absolute inset-0 w-[110%] h-[150%] -left-[5%] -top-[25%] text-[#F9E7B7] drop-shadow-sm"
              preserveAspectRatio="none"
              viewBox="0 0 200 40"
            >
              <path
                fill="currentColor"
                d="M 5,20 C 15,10 50,5 100,5 C 150,5 185,10 195,20 C 190,35 150,38 100,38 C 50,38 10,35 5,20 Z"
                filter="url(#prize-rough-edge)"
              />
              <defs>
                <filter id="prize-rough-edge">
                  <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
            </svg>
            <h2 className="relative z-10 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider font-sans text-[#0b4553] uppercase italic px-6 py-1.5">
              AWARDS &amp; PRIZE POOL
            </h2>
          </div>

          <p className="font-handwriting text-2xl sm:text-3xl text-[#F9E7B7] mb-3">
            Recognizing Ideas. Rewarding Impact.
          </p>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
            VIKAS 2026 honors technical excellence, novel thinking, and socially impactful innovations across four distinguished laurel tracks with cash prizes, trophies, and IEEE certification.
          </p>
        </motion.div>

        {/* 4 Award Laurel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {awardsList.map((award, idx) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl bg-[#0b4553]/90 border border-white/15 p-6 shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-md group"
              style={{
                borderColor: award.borderColor,
              }}
            >
              {/* Background Glow */}
              <div
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: award.color }}
              />

              <div>
                {/* Professional Icon Badge */}
                <div className="relative w-16 h-16 mb-6 flex items-center justify-center mx-auto">
                  {/* Outer glowing ring */}
                  <div 
                    className="absolute inset-0 rounded-full border border-white/20 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)]"
                    style={{ backgroundColor: `${award.color}15` }}
                  />
                  {/* Inner ring */}
                  <div 
                    className="absolute inset-[3px] rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm"
                  >
                    <div className="relative z-10 scale-[1.1]">{award.icon}</div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white text-center tracking-tight mb-1.5">
                  {award.title}
                </h3>

                {/* Category Badge */}
                <p
                  className="text-xs font-semibold text-center uppercase tracking-wider mb-4"
                  style={{ color: award.color }}
                >
                  {award.category}
                </p>

                {/* Reward Callout Box */}
                <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center mb-4">
                  <span className="block text-[0.68rem] uppercase font-bold text-white/60 tracking-wider mb-1">
                    WINNER RECOGNITION
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#F9E7B7] block leading-snug">
                    {award.reward}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-white/80 leading-relaxed mb-4 text-justify">
                  {award.description}
                </p>

                {/* Evaluation Criteria */}
                <div className="space-y-1.5 border-t border-white/15 pt-3">
                  <span className="block text-[0.68rem] uppercase font-bold text-white/60 tracking-wider mb-1">
                    KEY CRITERIA
                  </span>
                  {award.criteria.map((c, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-white/90">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom IEEE Accreditation */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[0.7rem] text-white/60">
                <span>IEEE SLRTCE Colloquium</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight Cash Prize Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl bg-gradient-to-r from-[#F9E7B7] via-[#FFF3D6] to-[#F9E7B7] text-[#0b4553] p-6 sm:p-8 shadow-2xl border-2 border-white/40 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0b4553] text-[#F9E7B7] flex items-center justify-center shrink-0 shadow-md">
              <Trophy className="w-8 h-8 sm:w-9 sm:h-9 text-[#F9E7B7]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0b4553]">
                Attractive Cash Prizes &amp; National Laurels
              </h3>
              <p className="text-xs sm:text-sm text-[#0b4553]/80 font-medium mt-0.5">
                All awards include certified IEEE mementos and publication assistance for high-ranking papers.
              </p>
            </div>
          </div>

          <a
            href="#register"
            className="shrink-0 bg-[#0b4553] hover:bg-[#07323c] text-white font-bold text-sm px-6 py-3 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Submit Paper &amp; Compete →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PrizePoolSection;
