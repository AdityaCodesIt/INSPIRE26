import { motion } from 'framer-motion';
import { Users, GraduationCap, Award, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';

interface CategoryCard {
  title: string;
  badge: string;
  degree: string;
  teamSize: string;
  description: string;
  disciplines: string;
  color: string;
  accentBg: string;
  icon: React.ReactNode;
  highlights: string[];
}

const categories: CategoryCard[] = [
  {
    title: 'UG & Diploma Students',
    badge: 'Team Collaboration',
    degree: 'B.E. / B.Tech / Diploma (All Years)',
    teamSize: '2 to 4 Members',
    description: 'Designed for enthusiastic undergraduate and diploma students working on innovative concepts, working prototypes, and technical solutions to real-world challenges.',
    disciplines: 'All Engineering, Computing, and Allied Polytechnic disciplines',
    color: '#FF6B00',
    accentBg: 'rgba(255, 107, 0, 0.08)',
    icon: <Users className="w-6 h-6 text-[#FF6B00]" />,
    highlights: [
      'Encouraged interdisciplinary teams',
      'Proof-of-concepts & working prototypes',
      'Mentorship & live presentation evaluation',
    ],
  },
  {
    title: 'Postgraduate (PG) Scholars',
    badge: 'Individual Research',
    degree: 'M.E. / M.Tech / M.S. / MCA',
    teamSize: 'Individual Submission',
    description: 'A platform for master’s students presenting advanced research papers, rigorous experimental studies, algorithm implementations, and applied domain solutions.',
    disciplines: 'Advanced Technical, Computing, and Systems Research',
    color: '#0A2540',
    accentBg: 'rgba(10, 37, 64, 0.06)',
    icon: <GraduationCap className="w-6 h-6 text-[#0A2540]" />,
    highlights: [
      'Evaluated on technical novelty & rigor',
      'Theoretical models & methodology benchmarking',
      'Feedback from senior academic jury',
    ],
  },
  {
    title: 'Doctoral / PhD Researchers',
    badge: 'Individual Track',
    degree: 'Ph.D. & Post-Doctoral Fellows',
    teamSize: 'Individual Submission',
    description: 'Dedicated academic stage for doctoral scholars presenting pioneering deep-tech models, novel frameworks, patented ideas, and contributions to national development goals.',
    disciplines: 'Doctoral Research in Applied & Fundamental Sciences',
    color: '#059669',
    accentBg: 'rgba(5, 150, 105, 0.08)',
    icon: <BookOpen className="w-6 h-6 text-[#059669]" />,
    highlights: [
      'High-impact domain research',
      'Alignment with Viksit Bharat @2047 & UN SDGs',
      'Networking with distinguished researchers',
    ],
  },
];

const perks = [
  {
    icon: <Award className="w-5 h-5 text-[#FF6B00]" />,
    title: 'Official IEEE Certificate',
    desc: 'Authorized certificate of presentation & participation for all presenting teams.',
  },
  {
    icon: <Sparkles className="w-5 h-5 text-amber-500]" />,
    title: 'Cash Rewards & Laurels',
    desc: 'Compete for Best Paper, Best Innovation, People’s Choice, and UN SDG awards.',
  },
  {
    icon: <Users className="w-5 h-5 text-blue-600" />,
    title: 'Expert Panel Interaction',
    desc: 'Direct interaction and critical feedback from renowned academic and industry evaluators.',
  },
  {
    icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
    title: 'Publication Pathway',
    desc: 'Selected top papers receive recommendation for further journal and conference submission.',
  },
];

const WhoCanParticipateSection = () => {
  return (
    <section
      id="eligibility"
      className="py-16 md:py-24 relative overflow-hidden bg-cover bg-center border-t border-b border-teal-950/20 scroll-mt-[65px] w-full max-w-full min-h-[calc(100vh-65px)] flex flex-col justify-center"
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

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A2540]/10 border border-[#0A2540]/20 text-[#0A2540] text-xs sm:text-sm font-bold tracking-widest uppercase mb-3.5 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4 text-[#FF6B00]" />
            <span>ELIGIBILITY & PARTICIPATION TIERS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2540] tracking-tight font-sans">
            Who Can Participate?
          </h2>

          <p className="mt-3.5 text-sm sm:text-base md:text-lg text-[#334E68] leading-relaxed">
            VIKAS 2026 welcomes students, researchers, and innovators from all recognized academic institutions. Participants are evaluated in dedicated peer categories to ensure fair competition.
          </p>
        </motion.div>

        {/* 3 Participant Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl bg-[#FCFBF8] border border-[#E2D9C8] p-6 sm:p-7 shadow-[0_12px_30px_rgba(10,37,64,0.08)] flex flex-col justify-between overflow-hidden group transition-all"
            >
              {/* Subtle Corner Badge Accent */}
              <div
                className="absolute -top-10 -right-10 w-24 h-24 rounded-full pointer-events-none opacity-40 group-hover:scale-125 transition-transform duration-500"
                style={{ backgroundColor: cat.color }}
              />

              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border border-black/5"
                    style={{ backgroundColor: cat.accentBg }}
                  >
                    {cat.icon}
                  </div>
                  <span
                    className="text-[0.7rem] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border"
                    style={{
                      color: cat.color,
                      borderColor: `${cat.color}40`,
                      backgroundColor: cat.accentBg,
                    }}
                  >
                    {cat.badge}
                  </span>
                </div>

                {/* Title and Degree */}
                <h3 className="text-xl sm:text-2xl font-black text-[#0A2540] tracking-tight mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-[0.8rem] font-bold text-[#FF6B00] mb-3">
                  {cat.degree}
                </p>

                {/* Team Size Tag */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0A2540]/5 text-[#0A2540] text-xs font-bold mb-4">
                  <Users className="w-3.5 h-3.5" />
                  <span>Team Size: {cat.teamSize}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#486581] leading-relaxed mb-4 text-justify">
                  {cat.description}
                </p>

                {/* Disciplines */}
                <div className="bg-white/80 rounded-lg p-2.5 border border-[#E2D9C8]/60 mb-5">
                  <span className="block text-[0.68rem] uppercase font-bold text-[#627D98] tracking-wider mb-0.5">
                    ELIGIBLE DISCIPLINES
                  </span>
                  <span className="text-xs text-[#102A43] font-medium leading-tight block">
                    {cat.disciplines}
                  </span>
                </div>

                {/* Bullet Highlights */}
                <ul className="space-y-2 border-t border-[#E2D9C8]/60 pt-4">
                  {cat.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#334E68]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Note */}
              <div className="mt-6 pt-3.5 border-t border-dashed border-[#0A2540]/15 text-[0.72rem] text-[#627D98] italic">
                * Separate rubric & jury evaluation for this category
              </div>
            </motion.div>
          ))}
        </div>

        {/* Participant Benefits Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl bg-[#0A233F] text-white p-6 sm:p-8 md:p-10 shadow-2xl border border-white/10 relative overflow-hidden"
        >
          {/* Subtle watermark badge */}
          <div className="absolute right-0 bottom-0 opacity-5 translate-x-8 translate-y-8 pointer-events-none">
            <Award className="w-64 h-64 text-white" />
          </div>

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase block mb-1">
                VALUE FOR EVERY PARTICIPANT
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                What Every Registered Team Receives
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {perks.map((perk, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 flex flex-col items-start backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/10 mb-3">{perk.icon}</div>
                  <h4 className="font-bold text-white text-sm sm:text-base mb-1">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoCanParticipateSection;
