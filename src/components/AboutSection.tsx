import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative z-10 w-full max-w-full min-h-[calc(100vh-65px)] flex items-center justify-center py-10 sm:py-18 md:py-28 lg:py-36 px-2.5 sm:px-6 md:px-10 bg-cover bg-center overflow-hidden border-t border-b border-amber-950/20 scroll-mt-[65px]"
      style={{
        backgroundImage: "url('/backgrounds/bg-gold.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Subtle Warm Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/35 z-0" />

      {/* Main Ticket Container Wrapper - Increased Size with Physical Stub Notches */}
      <motion.div
        className="w-full max-w-[1420px] xl:max-w-[1500px] 2xl:max-w-[1580px] mx-auto relative z-10"
        style={{
          filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.45)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* The Authentic VIKAS 2026 Colloquium Landscape Ticket with True Transparent Edge Cutouts */}
        <div className="ticket-border w-full rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#F2F6FA] relative">

          {/* ========================================================================= */}
          {/* 1. TOP HEADER BAR: Solid Crisp Matte Navy (No Glow / Glare)                 */}
          {/* ========================================================================= */}
          <div className="bg-[#0A233F] text-white px-4 sm:px-10 md:px-12 py-3.5 sm:py-5 flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-[#0A233F] z-20">

            {/* Left: VIKAS Brand & Year */}
            <div className="flex items-center">
              {/* Bold Futuristic Rounded VIKAS Logo */}
              <span className="font-black text-2xl sm:text-4xl md:text-[2.85rem] tracking-[0.08em] text-white uppercase font-sans select-none leading-none">
                VIKAS
              </span>

              {/* Year */}
              <span className="text-xl sm:text-2xl md:text-[1.8rem] font-bold text-white ml-3.5 sm:ml-5 tracking-normal font-sans leading-none">
                2026
              </span>

              {/* Horizontal Divider Line */}
              <div className="hidden sm:block w-24 md:w-44 lg:w-56 h-[1.5px] bg-white/40 ml-5 sm:ml-7 rounded-full" />
            </div>

            {/* Right: Subtitle Pillars */}
            <div className="flex items-center text-[0.66rem] sm:text-[0.76rem] md:text-[0.82rem] font-sans font-semibold tracking-[0.24em] text-white/90 uppercase select-none">
              <span>RESEARCH</span>
              <span className="mx-2.5 sm:mx-3.5 text-white/50">/</span>
              <span>INNOVATION</span>
              <span className="mx-2.5 sm:mx-3.5 text-white/50">/</span>
              <span>SUSTAINABILITY</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. TICKET BODY: Original Color with Pure Monochromatic Paper Texture        */}
          {/* ========================================================================= */}
          <div className="relative bg-[#F2F6FA] text-[#0A2540] overflow-hidden">

            {/* Clean Paper Fiber Texture (Grayscale to keep 100% original color) */}
            <div
              className="absolute inset-0 bg-repeat opacity-80 mix-blend-multiply pointer-events-none z-0 grayscale"
              style={{
                backgroundImage: "url('/paper-texture-clean.jpg')",
                backgroundSize: '380px',
              }}
            />

            {/* Paper Micro-Grain Noise (Neutral) */}
            <div
              className="absolute inset-0 bg-repeat opacity-50 mix-blend-overlay pointer-events-none z-0"
              style={{
                backgroundImage: "url('/backgrounds/noise-texture.svg')",
              }}
            />

            {/* India Map Watermark in Black (Subtle, barely visible watermark) */}
            <div 
              className="absolute inset-0 m-auto w-full h-full max-w-[650px] max-h-[92%] bg-contain bg-center bg-no-repeat opacity-[0.045] mix-blend-multiply pointer-events-none z-0 select-none" 
              style={{
                backgroundImage: "url('/india-map-black.png')",
              }}
            />

            {/* Content Flex / Grid Container with generous ticket padding */}
            <div className="relative z-10 flex flex-col lg:flex-row items-stretch">

              {/* ------------------------------------------------------------------- */}
              {/* COLUMN 1: Colloquium Intro & VIKAS Acronym Breakdown (~41% width)    */}
              {/* ------------------------------------------------------------------- */}
              <div className="w-full lg:w-[41%] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-start">
                <div>
                  {/* Title - Enlarged & Top-Aligned */}
                  <h3 className="font-sans font-extrabold text-[#0A2540] text-xl sm:text-2xl md:text-[1.65rem] lg:text-[1.82rem] leading-tight tracking-tight">
                    VIKAS 2026 – A Research &amp; Idea Colloquium
                  </h3>

                  {/* Description Paragraph */}
                  <p className="font-sans text-[#334E68] text-xs sm:text-[0.88rem] md:text-[0.96rem] leading-relaxed mt-3 sm:mt-4 text-justify">
                    An academic, research, and innovation-oriented platform designed to encourage students to explore research, develop innovative ideas, and present technology-driven solutions to real-world problems.
                  </p>
                </div>

                {/* Acronym Section */}
                <div className="mt-4 sm:mt-5 md:mt-6">
                  {/* Thin Hairline Divider */}
                  <div className="w-full h-[1px] bg-[#0A2540]/20 my-3.5 sm:my-4 md:my-5" />

                  {/* Subtitle */}
                  <p className="font-sans font-black text-xs sm:text-[0.88rem] md:text-[0.98rem] text-[#0A2540] tracking-[0.16em] uppercase mb-3 sm:mb-4">
                    VIKAS2026 REPRESENTS
                  </p>

                  {/* 5-Column Acronym Row with prominent letters */}
                  <div className="grid grid-cols-5 divide-x divide-[#0A2540]/20 text-center items-start">
                    {/* V */}
                    <div className="px-0.5 sm:px-1 flex flex-col items-center">
                      <span className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] text-[#0A2540] leading-none mb-2 sm:mb-3 md:mb-4 select-none">
                        V
                      </span>
                      <span className="font-sans text-[7.5px] min-[360px]:text-[8.5px] min-[390px]:text-[9.5px] sm:text-[0.65rem] md:text-[0.76rem] font-medium text-[#334E68] leading-tight tracking-tight sm:tracking-normal">
                        Viksit Bharat<br />@2047
                      </span>
                    </div>

                    {/* I */}
                    <div className="px-0.5 sm:px-1 flex flex-col items-center">
                      <span className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] text-[#0A2540] leading-none mb-2 sm:mb-3 md:mb-4 select-none">
                        I
                      </span>
                      <span className="font-sans text-[7.5px] min-[360px]:text-[8.5px] min-[390px]:text-[9.5px] sm:text-[0.65rem] md:text-[0.76rem] font-medium text-[#334E68] leading-tight tracking-tight sm:tracking-normal whitespace-nowrap sm:whitespace-normal break-normal text-center w-full">
                        Innovation
                      </span>
                    </div>

                    {/* K */}
                    <div className="px-0.5 sm:px-1 flex flex-col items-center">
                      <span className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] text-[#0A2540] leading-none mb-2 sm:mb-3 md:mb-4 select-none">
                        K
                      </span>
                      <span className="font-sans text-[7.5px] min-[360px]:text-[8.5px] min-[390px]:text-[9.5px] sm:text-[0.65rem] md:text-[0.76rem] font-medium text-[#334E68] leading-tight tracking-tight sm:tracking-normal whitespace-nowrap sm:whitespace-normal break-normal text-center w-full">
                        Knowledge
                      </span>
                    </div>

                    {/* A */}
                    <div className="px-0.5 sm:px-1 flex flex-col items-center">
                      <span className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] text-[#0A2540] leading-none mb-2 sm:mb-3 md:mb-4 select-none">
                        A
                      </span>
                      <span className="font-sans text-[7.5px] min-[360px]:text-[8.5px] min-[390px]:text-[9.5px] sm:text-[0.65rem] md:text-[0.76rem] font-medium text-[#334E68] leading-tight tracking-tight sm:tracking-normal whitespace-nowrap sm:whitespace-normal break-normal text-center w-full">
                        Advancement
                      </span>
                    </div>

                    {/* S */}
                    <div className="px-0.5 sm:px-1 flex flex-col items-center">
                      <span className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] text-[#0A2540] leading-none mb-2 sm:mb-3 md:mb-4 select-none">
                        S
                      </span>
                      <span className="font-sans text-[7.5px] min-[360px]:text-[8.5px] min-[390px]:text-[9.5px] sm:text-[0.65rem] md:text-[0.76rem] font-medium text-[#334E68] leading-tight tracking-tight sm:tracking-normal whitespace-nowrap sm:whitespace-normal break-normal text-center w-full">
                        Sustainability
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical Dashed Perforation Line 1 */}
              <div className="hidden lg:block w-0 border-r-2 border-dashed border-[#0A2540]/30 self-stretch my-0" />
              <div className="block lg:hidden border-b-2 border-dashed border-[#0A2540]/30 w-full mx-0" />

              {/* ------------------------------------------------------------------- */}
              {/* COLUMN 2: 4 Pillars (What to Present, Focus, Aspects, Vision) (~37%) */}
              {/* ------------------------------------------------------------------- */}
              <div className="w-full lg:w-[37%] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-between space-y-4.5 sm:space-y-5.5">

                {/* 1. What to Present */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  {/* Presentation / Chart Whiteboard Icon */}
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#0A2540] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="13" rx="1" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="16" x2="12" y2="21" />
                    <path d="M7 10l3-3 2 2 4-4" />
                  </svg>
                  <div>
                    <h4 className="font-sans font-bold text-[#0A2540] text-[0.76rem] sm:text-[0.82rem] md:text-[0.86rem] tracking-wider uppercase">
                      WHAT TO PRESENT
                    </h4>
                    <p className="font-sans text-[#334E68] text-[0.76rem] sm:text-[0.82rem] md:text-[0.86rem] leading-snug mt-0.5">
                      Research work, innovative concepts, prototypes, problem statements and technology-based solutions.
                    </p>
                  </div>
                </div>

                {/* 2. Focus Areas */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  {/* Target / Bullseye Icon */}
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#0A2540] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  <div>
                    <h4 className="font-sans font-bold text-[#0A2540] text-[0.76rem] sm:text-[0.82rem] md:text-[0.86rem] tracking-wider uppercase">
                      FOCUS AREAS
                    </h4>
                    <p className="font-sans text-[#334E68] text-[0.76rem] sm:text-[0.82rem] md:text-[0.86rem] leading-snug mt-0.5">
                      Emerging technologies &amp; interdisciplinary research aligned with UN SDGs and the vision of a technologically advanced, innovative, inclusive and sustainable India.
                    </p>
                  </div>
                </div>

                {/* 3. Key Aspects Evaluated */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  {/* Star Outline Icon */}
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#0A2540] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <div>
                    <h4 className="font-sans font-bold text-[#0A2540] text-[0.76rem] sm:text-[0.82rem] md:text-[0.86rem] tracking-wider uppercase">
                      KEY ASPECTS EVALUATED
                    </h4>
                    <p className="font-sans text-[#334E68] text-[0.76rem] sm:text-[0.82rem] md:text-[0.86rem] leading-snug mt-0.5">
                      Technical knowledge, innovation, feasibility, societal impact, sustainability, advancement and effective communication.
                    </p>
                  </div>
                </div>

                {/* 4. Vision */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  {/* Lightbulb Icon */}
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#0A2540] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <line x1="12" y1="2" x2="12" y2="4" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="19.78" y1="4.22" x2="18.36" y2="5.64" />
                  </svg>
                  <div>
                    <h4 className="font-sans font-bold text-[#0A2540] text-[0.76rem] sm:text-[0.82rem] md:text-[0.86rem] tracking-wider uppercase">
                      VISION
                    </h4>
                    <p className="font-sans text-[#334E68] text-[0.76rem] sm:text-[0.82rem] md:text-[0.86rem] leading-snug mt-0.5">
                      Empowering innovators to transform knowledge into impactful solutions, driving sustainable progress and an inclusive Viksit Bharat @2047.
                    </p>
                  </div>
                </div>

              </div>

              {/* Vertical Dashed Perforation Line 2 */}
              <div className="hidden lg:block w-0 border-r-2 border-dashed border-[#0A2540]/30 self-stretch my-0" />
              <div className="block lg:hidden border-b-2 border-dashed border-[#0A2540]/30 w-full mx-0" />

              {/* ------------------------------------------------------------------- */}
              {/* COLUMN 3: Ticket Stub Details & QR Code (~22% width)                 */}
              {/* ------------------------------------------------------------------- */}
              <div className="w-full lg:w-[22%] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-between space-y-4 relative overflow-hidden">

                {/* Meta Information Fields */}
                <div className="space-y-4">
                  {/* Ticket No */}
                  <div>
                    <span className="block font-sans text-[0.66rem] sm:text-[0.72rem] font-bold text-[#627D98] tracking-widest uppercase">
                      TICKET NO.
                    </span>
                    <span className="block font-sans font-black text-sm sm:text-base md:text-[1.05rem] text-[#0A2540] tracking-wider mt-0.5">
                      #VKS2026
                    </span>
                  </div>

                  {/* Destination */}
                  <div>
                    <span className="block font-sans text-[0.66rem] sm:text-[0.72rem] font-bold text-[#627D98] tracking-widest uppercase">
                      DESTINATION
                    </span>
                    <span className="block font-sans font-black text-xs sm:text-[0.88rem] md:text-[0.94rem] text-[#0A2540] tracking-wide mt-0.5 uppercase">
                      SLRTCE; MIRA-BHAYANDAR
                    </span>
                  </div>

                  {/* Event */}
                  <div>
                    <span className="block font-sans text-[0.66rem] sm:text-[0.72rem] font-bold text-[#627D98] tracking-widest uppercase">
                      EVENT
                    </span>
                    <span className="block font-sans font-black text-xs sm:text-[0.88rem] md:text-[0.94rem] text-[#0A2540] tracking-wide mt-0.5 uppercase">
                      VIKAS – VIKSIT BHARAT
                    </span>
                  </div>

                  {/* Date */}
                  <div>
                    <span className="block font-sans text-[0.66rem] sm:text-[0.72rem] font-bold text-[#627D98] tracking-widest uppercase">
                      DATE
                    </span>
                    <span className="block font-sans font-black text-xs sm:text-[0.88rem] md:text-[0.94rem] text-[#0A2540] tracking-wide mt-0.5 uppercase">
                      25 – 26 JAN 2026
                    </span>
                  </div>
                </div>

                {/* QR Code & Footer Callout */}
                <div className="pt-3 border-t border-[#0A2540]/15">
                  <div className="flex items-center gap-3.5">
                    {/* SVG Rendered Precise QR Code */}
                    <div className="w-16 h-16 sm:w-18 sm:h-18 bg-white p-1.5 rounded-lg border border-[#0A2540]/25 shadow-sm flex-shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full text-[#0A2540]" viewBox="0 0 33 33" fill="currentColor">
                        {/* Top-Left Corner Finder */}
                        <rect x="2" y="2" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" />
                        <rect x="4.5" y="4.5" width="4" height="4" />
                        {/* Top-Right Corner Finder */}
                        <rect x="22" y="2" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" />
                        <rect x="24.5" y="4.5" width="4" height="4" />
                        {/* Bottom-Left Corner Finder */}
                        <rect x="2" y="22" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" />
                        <rect x="4.5" y="24.5" width="4" height="4" />
                        {/* Timing Lines & Data Bits */}
                        <rect x="13" y="4" width="2" height="2" />
                        <rect x="17" y="4" width="2" height="2" />
                        <rect x="13" y="8" width="2" height="2" />
                        <rect x="17" y="8" width="2" height="2" />
                        <rect x="4" y="13" width="2" height="2" />
                        <rect x="8" y="13" width="2" height="2" />
                        <rect x="4" y="17" width="2" height="2" />
                        <rect x="8" y="17" width="2" height="2" />
                        <rect x="13" y="13" width="3" height="3" />
                        <rect x="18" y="14" width="2" height="2" />
                        <rect x="14" y="18" width="2" height="2" />
                        <rect x="17" y="18" width="3" height="3" />
                        <rect x="23" y="13" width="2" height="2" />
                        <rect x="27" y="15" width="3" height="2" />
                        <rect x="24" y="18" width="2" height="2" />
                        <rect x="28" y="19" width="2" height="2" />
                        <rect x="13" y="24" width="3" height="2" />
                        <rect x="18" y="24" width="2" height="3" />
                        <rect x="14" y="28" width="2" height="2" />
                        <rect x="18" y="28" width="3" height="2" />
                        <rect x="23" y="23" width="3" height="3" />
                        <rect x="28" y="24" width="2" height="2" />
                        <rect x="24" y="27" width="2" height="3" />
                        <rect x="27" y="28" width="3" height="2" />
                      </svg>
                    </div>

                    {/* Scan Callout */}
                    <div className="flex flex-col justify-center">
                      <span className="font-sans font-extrabold text-[0.66rem] sm:text-[0.72rem] text-[#0A2540] tracking-widest uppercase leading-tight">
                        SCAN FOR EVENT DETAILS
                      </span>
                    </div>
                  </div>

                  {/* Impact Tagline */}
                  <p className="font-sans font-black text-[0.7rem] sm:text-[0.76rem] text-[#0A2540] tracking-[0.22em] uppercase mt-3 text-left">
                    IDEAS CONNECT IMPACT
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
