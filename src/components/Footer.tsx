const Footer = () => {
  return (
    <footer 
      id="contact" 

      className="w-full text-white relative z-10 font-sans bg-bottom bg-[length:100%_400%] md:bg-[length:100%_300%] lg:bg-cover"
      style={{
        backgroundImage: "url('/footer-bg.png')",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 pt-10 md:pt-12 lg:pt-16 pb-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          
          {/* Left: Branding */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center space-x-2 text-white">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8l6.2 6.2-6.2 6.2-6.2-6.2L12 5.8z"/>
              </svg>
              <span className="font-bold text-lg tracking-widest leading-none">IEEE</span>
            </div>
            <p className="text-[10px] font-semibold tracking-wider text-amber-400 uppercase">
              Vikas Viksit Bharat 2026
            </p>
          </div>

          {/* Middle: Copyright & Quick Links */}
          <div className="flex flex-col items-center text-center gap-2 text-[10px] sm:text-xs text-white/70">
            <p>&copy; 2026 IEEE Colloquium — Shree L.R. Tiwari College of Engineering.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
              <span>·</span>
              <a href="mailto:colloquium2026@slrtce.edu.in" className="hover:text-amber-400 transition-colors">Contact</a>
              <span>·</span>
              <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IEEE.org</a>
              <span>·</span>
              <a href="#themes" className="hover:text-amber-400 transition-colors">Themes</a>
            </div>
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
                  className="w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-amber-500 hover:text-black rounded-full cursor-pointer transition-all text-white font-bold text-[10px]"
                >
                  {social.icon}
                </div>
              ))}
            </div>
            <a href="#home" className="text-[10px] font-bold text-amber-400 hover:text-amber-300 transition-colors border border-amber-400/30 hover:border-amber-400 px-3 py-1.5 rounded-full">
              Top ↑
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
