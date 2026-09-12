import { motion } from 'framer-motion';

const themes = [
  { id: 'ai', title: 'AI / ML', icon: '🧠', color: 'bg-[#1E3A8A]' },
  { id: 'iot', title: 'IoT', icon: '🛰️', color: 'bg-[#0F172A]' },
  { id: 'health', title: 'Healthcare & MedTech', icon: '🩺', color: 'bg-[#9F1239]' },
  { id: 'sus', title: 'Sustainability', icon: '🌍', color: 'bg-tricolor-green' },
  { id: 'cyber', title: 'Cybersecurity', icon: '🛡️', color: 'bg-[#1E40AF]' },
  { id: 'auto', title: 'Automation', icon: '⚙️', color: 'bg-brand-orange' },
  { id: 'fintech', title: 'FinTech', icon: '🪙', color: 'bg-[#D97706]' },
  { id: 'block', title: 'Blockchain', icon: '🔗', color: 'bg-[#2563EB]' },
  { id: 'emerge', title: 'Emerging Technologies', icon: '✨', color: 'bg-[#5B21B6]' },
];

const ThemeStamp = ({ theme, index }: { theme: typeof themes[0], index: number }) => {
  const rotation = index % 2 === 0 ? 3 : -3;
  
  return (
    <motion.div
      className="relative group cursor-pointer w-[140px] justify-self-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        y: -4,
        rotate: 0,
        scale: 1.05,
        boxShadow: "4px 4px 12px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 }
      }}
      style={{ rotate: rotation }}
    >
      <div className="stamp-card w-full flex flex-col h-[150px] !p-1">
        <div className="flex-grow relative overflow-hidden flex flex-col bg-white">
          
          {/* Inner Image/Color placeholder */}
          <div className={`${theme.color} w-full h-[65%] flex items-center justify-center relative`}>
            {/* Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] opacity-30 mix-blend-overlay"></div>
            
            {/* Icon */}
            <div className="text-3xl filter drop-shadow-md relative z-10">
              {theme.icon}
            </div>
          </div>
          
          {/* Title area */}
          <div className="h-[35%] bg-bg-cream flex items-center justify-center text-center p-1">
            <h4 className="font-semibold text-brand-navy text-[0.7rem] leading-tight font-sans">{theme.title}</h4>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

const ThemesSection = () => {
  return (
    <section id="themes" className="py-24 relative overflow-hidden bg-transparent">
      
      

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-navy mb-2">Themes & Tracks</h2>
            <div className="w-16 h-[3px] bg-tricolor-saffron rounded-full mb-3"></div>
            <p className="text-sm text-text-muted font-sans">
              Explore multidisciplinary domains that drive innovation for a Viksit Bharat.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex flex-col items-end"
          >
            <span className="font-handwriting text-2xl text-brand-navy transform -rotate-3 mb-0">Explore. Build.</span>
            <span className="font-handwriting text-3xl text-brand-orange transform -rotate-2">Make an Impact.</span>
          </motion.div>
        </div>

        {/* Stamps Grid - 5 cards top, 4 cards bottom */}
        <div className="flex flex-col gap-6 lg:gap-8 items-center">
           {/* Row 1 */}
           <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-10 w-full place-items-center">
              {themes.slice(0, 5).map((theme, index) => (
                <ThemeStamp key={theme.id} theme={theme} index={index} />
              ))}
           </div>
           
           {/* Row 2 */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 w-full place-items-center md:px-12 relative">
              {themes.slice(5).map((theme, index) => (
                <ThemeStamp key={theme.id} theme={theme} index={index + 5} />
              ))}
              
              {/* Call to action stamp placeholder (Handwritten aside) */}
              <motion.div
                className="hidden lg:block absolute right-[-80px] top-4 transform rotate-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <p className="font-handwriting text-2xl text-brand-navy leading-tight">
                  Ideas<br/>that build<br/>a better<br/>tomorrow <span className="text-brand-orange text-3xl ml-1">↗</span>
                </p>
              </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ThemesSection;
