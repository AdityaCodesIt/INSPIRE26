const Footer = () => {
  return (
    <footer 
      id="contact" 
      className="w-full text-white relative z-10 font-sans bg-[#0A2A5E] scroll-mt-[65px]"
    >
      {/* Torn Paper Deckle Edge — hangs above footer, torn fringe pointing UP */}
      <div
        className="absolute left-0 w-full max-w-full overflow-visible pointer-events-none z-30"
        style={{ bottom: 'calc(100% - 2px)' }}
      >
        <svg
          viewBox="0 0 1440 45"
          preserveAspectRatio="none"
          className="w-full h-6 sm:h-7 md:h-8 block"
          style={{
            filter: 'drop-shadow(0 -2px 3px rgba(10, 42, 94, 0.18))'
          }}
        >
          <defs>
            <filter id="footer-torn-roughness" x="-2%" y="-15%" width="104%" height="150%">
              <feTurbulence type="fractalNoise" baseFrequency="0.14 0.22" numOctaves="5" seed="47" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            </filter>
          </defs>

          {/* Layer 1: Cream paper core fringe (torn fibers extending upward) */}
          <path
            d="M 0,45 L 0,26 L 20,23 L 32,25.5 L 44,27 L 56,24.5 L 68,26.5 L 80,22.5 L 92,25.5 L 104,27.5 L 116,25 L 128,26.5 L 140,24.5 L 152,19.5 L 164,14.5 L 176,19.5 L 184,15.5 L 196,19.5 L 208,23 L 220,26.5 L 232,28.5 L 244,27.5 L 256,24.5 L 268,20.5 L 280,13.5 L 292,18 L 300,14.5 L 312,17.5 L 324,22.5 L 336,25.5 L 348,27.5 L 360,26 L 372,24.5 L 384,20.5 L 396,17.5 L 408,22 L 420,25.5 L 432,27 L 444,26.5 L 456,23.5 L 468,19.5 L 480,14.5 L 492,9.5 L 504,14.5 L 512,10.5 L 524,15 L 536,20 L 548,24 L 560,26.5 L 572,25.5 L 584,21.5 L 596,18 L 608,22.5 L 620,20 L 632,23 L 644,26.5 L 656,28 L 668,25.5 L 680,27.5 L 692,26.5 L 704,23.5 L 716,19.5 L 728,13 L 740,17.5 L 748,14.5 L 760,17 L 772,22 L 784,26.5 L 796,24.5 L 808,27.5 L 820,29.5 L 832,28 L 844,24.5 L 856,26.5 L 868,25 L 880,27.5 L 892,26.5 L 904,23.5 L 916,19.5 L 928,14 L 938,9.5 L 950,15 L 958,11.5 L 970,16.5 L 982,21.5 L 995,25 L 1008,27.5 L 1020,26.5 L 1032,24.5 L 1045,18.5 L 1058,22 L 1070,26.5 L 1082,24.5 L 1095,27 L 1108,26 L 1120,23.5 L 1132,18.5 L 1140,15 L 1152,19.5 L 1165,15.5 L 1178,20 L 1190,25.5 L 1202,27.5 L 1215,23 L 1228,26 L 1240,24.5 L 1252,18 L 1264,12 L 1275,16.5 L 1282,12.5 L 1295,16.5 L 1308,23 L 1320,26.5 L 1334,26 L 1345,20.5 L 1358,18 L 1370,23 L 1386,25.5 L 1395,22 L 1410,26 L 1422,23.5 L 1440,26 L 1440,45 Z"
            fill="#F8E7BE"
            opacity="0.95"
            filter="url(#footer-torn-roughness)"
          />

          {/* Layer 2: Main Navy Paper fill — flush to bottom */}
          <path
            d="M 0,45 L 0,29 L 20,26.5 L 32,28.5 L 44,30 L 56,27.5 L 68,29 L 80,26 L 92,28.5 L 104,30 L 116,28 L 128,29 L 140,27.5 L 152,23 L 164,18 L 176,22.5 L 184,19 L 196,23 L 208,26 L 220,29 L 232,31 L 244,30 L 256,27.5 L 268,24 L 280,17 L 292,21 L 300,18 L 312,21 L 324,25.5 L 336,28.5 L 348,30 L 360,29 L 372,27.5 L 384,24 L 396,21 L 408,25 L 420,28 L 432,29.5 L 444,29 L 456,26.5 L 468,23 L 480,18 L 492,13 L 504,18 L 512,14 L 524,18.5 L 536,23 L 548,27 L 560,29 L 572,28 L 584,25 L 596,21.5 L 608,25.5 L 620,23.5 L 632,26 L 644,29 L 656,30.5 L 668,28.5 L 680,30 L 692,29 L 704,26.5 L 716,23 L 728,16.5 L 740,20.5 L 748,18 L 760,20.5 L 772,25 L 784,29 L 796,27.5 L 808,30 L 820,32 L 832,30.5 L 844,27.5 L 856,29 L 868,28 L 880,30 L 892,29 L 904,26.5 L 916,23 L 928,17.5 L 938,13 L 950,18.5 L 958,15 L 970,20 L 982,24.5 L 995,28 L 1008,30 L 1020,29 L 1032,27.5 L 1045,22 L 1058,25 L 1070,29 L 1082,27.5 L 1095,29.5 L 1108,29 L 1120,26.5 L 1132,22 L 1140,18.5 L 1152,23 L 1165,19 L 1178,23.5 L 1190,28 L 1202,30 L 1215,26 L 1228,28.5 L 1240,27.5 L 1252,21.5 L 1264,15.5 L 1275,20 L 1282,16 L 1295,20 L 1308,26 L 1320,29 L 1334,29 L 1345,24 L 1358,21.5 L 1370,26 L 1386,28 L 1395,25.5 L 1410,29 L 1422,27 L 1440,29 L 1440,45 Z"
            fill="#0A2A5E"
            filter="url(#footer-torn-roughness)"
          />

          {/* Layer 3: Dark bevel stroke along the torn fracture line */}
          <path
            d="M 0,29 L 20,26.5 L 32,28.5 L 44,30 L 56,27.5 L 68,29 L 80,26 L 92,28.5 L 104,30 L 116,28 L 128,29 L 140,27.5 L 152,23 L 164,18 L 176,22.5 L 184,19 L 196,23 L 208,26 L 220,29 L 232,31 L 244,30 L 256,27.5 L 268,24 L 280,17 L 292,21 L 300,18 L 312,21 L 324,25.5 L 336,28.5 L 348,30 L 360,29 L 372,27.5 L 384,24 L 396,21 L 408,25 L 420,28 L 432,29.5 L 444,29 L 456,26.5 L 468,23 L 480,18 L 492,13 L 504,18 L 512,14 L 524,18.5 L 536,23 L 548,27 L 560,29 L 572,28 L 584,25 L 596,21.5 L 608,25.5 L 620,23.5 L 632,26 L 644,29 L 656,30.5 L 668,28.5 L 680,30 L 692,29 L 704,26.5 L 716,23 L 728,16.5 L 740,20.5 L 748,18 L 760,20.5 L 772,25 L 784,29 L 796,27.5 L 808,30 L 820,32 L 832,30.5 L 844,27.5 L 856,29 L 868,28 L 880,30 L 892,29 L 904,26.5 L 916,23 L 928,17.5 L 938,13 L 950,18.5 L 958,15 L 970,20 L 982,24.5 L 995,28 L 1008,30 L 1020,29 L 1032,27.5 L 1045,22 L 1058,25 L 1070,29 L 1082,27.5 L 1095,29.5 L 1108,29 L 1120,26.5 L 1132,22 L 1140,18.5 L 1152,23 L 1165,19 L 1178,23.5 L 1190,28 L 1202,30 L 1215,26 L 1228,28.5 L 1240,27.5 L 1252,21.5 L 1264,15.5 L 1275,20 L 1282,16 L 1295,20 L 1308,26 L 1320,29 L 1334,29 L 1345,24 L 1358,21.5 L 1370,26 L 1386,28 L 1395,25.5 L 1410,29 L 1422,27 L 1440,29"
            stroke="#061B3B"
            strokeWidth="0.65"
            fill="none"
            filter="url(#footer-torn-roughness)"
          />

          {/* Layer 4: White cotton fibers */}
          <path
            d="M 152,23 L 164,18.5 M 280,17 L 292,21.5 M 492,13 L 504,18.5 M 728,16.5 L 740,21 M 938,13 L 950,19 M 1264,15.5 L 1275,20.5 M 384,24 L 396,21.5 M 584,25 L 596,22 M 1132,22 L 1140,19"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="0.8"
            fill="none"
            filter="url(#footer-torn-roughness)"
          />

          {/* Layer 5: Subtle highlight ridges */}
          <path
            d="M 80,26 L 56,27.5 M 232,31 L 208,26 M 432,29.5 L 408,25 M 656,30.5 L 632,26 M 880,30 L 856,29 M 1070,29 L 1045,22 M 1320,29 L 1295,20"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="0.75"
            fill="none"
            filter="url(#footer-torn-roughness)"
          />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          
          {/* Left: Branding — Logos matching navbar */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center space-x-2.5">
              <img
                src="/slrtce-logo.png"
                alt="SLRTCE Logo"
                className="h-8 sm:h-10 w-auto object-contain"
              />
              <div className="h-6 sm:h-8 w-px bg-white/30" />
              <img
                src="/ieee-slrtce-logo.png"
                alt="IEEE SLRTCE Student Branch Logo"
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
            <p className="text-[10px] font-semibold tracking-wider text-amber-400 uppercase">
              Vikas Viksit Bharat 2026
            </p>
          </div>

          {/* Middle: Copyright & Quick Links */}
          <div className="flex flex-col items-center text-center gap-2 text-[10px] sm:text-xs text-white/70">
            <p>&copy; VIKAS 2026 — IEEE SLRTCE STUDENT BRANCH.</p>
          </div>

          {/* Right: Social & Actions */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {[
                { label: 'LinkedIn', icon: 'in' },
                { label: 'Twitter', icon: 'X' },
                { label: 'Instagram', icon: 'ig' }
              ].map(social => (
                <div 
                  key={social.label} 
                  title={social.label}
                  className="w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-[#FF6B00] hover:text-white rounded-full cursor-pointer transition-all text-white font-bold text-[10px]"
                >
                  {social.icon}
                </div>
              ))}
            </div>
            <a href="#home" className="text-[10px] font-bold text-white bg-[#FF6B00] hover:bg-[#E65A00] transition-all px-3.5 py-1.5 rounded-full shadow-sm hover:shadow active:scale-95">
              Top ↑
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;

