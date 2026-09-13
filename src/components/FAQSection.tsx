import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageSquare, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'General',
    question: 'What is VIKAS 2026 – A Research & Idea Colloquium?',
    answer: 'VIKAS 2026 is an IEEE SLRTCE national research colloquium designed to encourage student researchers and innovators to explore engineering solutions, present prototypes, and align their work with Viksit Bharat @2047 and the United Nations Sustainable Development Goals (UN SDGs).',
  },
  {
    category: 'Eligibility',
    question: 'Who can participate in VIKAS 2026?',
    answer: 'The colloquium is open to: (1) Undergraduate (UG) and Diploma engineering students, (2) Postgraduate (PG) students (M.E. / M.Tech / M.S. / MCA), and (3) Doctoral (PhD) scholars. Each category is evaluated independently by academic jury panels.',
  },
  {
    category: 'Eligibility',
    question: 'What are the team size restrictions?',
    answer: 'For Undergraduate (UG) & Diploma students, teams must consist of 2 to 4 members. For Postgraduate (PG) and Doctoral (PhD) scholars, submissions are individual only.',
  },
  {
    category: 'Eligibility',
    question: 'Can teams have members from different departments or colleges?',
    answer: 'Yes! Interdisciplinary teams (combining students from computer science, electrical, mechanical, AI, etc.) as well as cross-institutional teams are strongly encouraged to present comprehensive, multidimensional solutions.',
  },
  {
    category: 'Submission',
    question: 'What needs to be submitted for Round 1?',
    answer: 'For Round 1 (Online Screening), teams must submit a structured abstract along with a concise presentation PDF outlining: (1) Problem Statement, (2) Proposed Solution / Methodology, (3) Relevant Colloquium Track, and (4) Alignment with UN SDGs / Viksit Bharat @2047.',
  },
  {
    category: 'Submission',
    question: 'Is the event conducted online or offline on campus?',
    answer: 'Round 1 (Abstract Screening) is completely online. Shortlisted teams will be invited for Round 2 (Poster / Prototype Presentation) and Round 3 (Grand Final Jury Pitch), which will be held in-person at the SLRTCE campus in Mira-Bhayandar, Mumbai.',
  },
  {
    category: 'Evaluation',
    question: 'What key aspects are evaluated by the jury?',
    answer: 'Submissions are assessed on: (1) Technical Rigor & Novelty, (2) Practical Feasibility & Prototype Quality, (3) Societal Impact & Relevance to UN SDGs, (4) Clarity of Presentation & Live Q&A Defense.',
  },
  {
    category: 'Certification',
    question: 'Will all participants receive certificates?',
    answer: 'Yes, all registered teams who submit and present their work will receive an authorized IEEE SLRTCE Certificate of Participation / Presentation. Winners receive prestigious Cash Prizes, Trophies, and IEEE Certificates of Merit.',
  },
];

const categories = ['All', 'General', 'Eligibility', 'Submission', 'Evaluation', 'Certification'];

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-16 md:py-24 relative overflow-hidden bg-cover bg-center border-t border-b border-indigo-950/30 text-white scroll-mt-[65px] w-full max-w-full min-h-[calc(100vh-65px)] flex flex-col justify-center"
      style={{
        backgroundImage: "url('/backgrounds/bg-purple.jpg')",
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
      {/* Subtle Vignette for Depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/40 z-0" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 backdrop-blur-sm">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
            Got Questions? We Have Answers.
          </h2>

          <p className="font-handwriting text-2xl sm:text-3xl text-amber-300 mt-2">
            Everything you need to know about VIKAS 2026
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                activeCategory === cat
                  ? 'bg-amber-400 text-[#0A2540] shadow-md scale-105'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="rounded-xl bg-[#0A2540]/70 border border-white/15 overflow-hidden backdrop-blur-md shadow-lg transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="font-sans font-bold text-sm sm:text-base md:text-[1.05rem] text-white leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-300 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-white/10 text-xs sm:text-sm text-white/85 leading-relaxed pl-10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mt-12 p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">
                Have more specific queries?
              </h4>
              <p className="text-xs text-white/70">
                Reach out directly to the IEEE SLRTCE Organizing Committee.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="shrink-0 bg-white/20 hover:bg-white/30 text-white border border-white/30 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5"
          >
            <span>Contact Committee</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
