const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-6 md:py-8 mt-12 relative z-10 font-sans">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
        
        {/* Logo & Copyright */}
        <div className="flex flex-col items-center lg:items-start gap-2">
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8l6.2 6.2-6.2 6.2-6.2-6.2L12 5.8z"/>
            </svg>
            <span className="font-bold text-xl tracking-widest leading-none">IEEE</span>
          </div>
          <p className="text-[0.6rem] tracking-[0.1em] text-white/80 uppercase">Advancing Technology for Humanity</p>
          <p className="text-xs text-white/60 mt-2">&copy; 2026 IEEE Colloquium. All Rights Reserved.</p>
        </div>

        {/* Links (Horizontal) */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/90 font-medium">
          <a href="#about" className="hover:text-tricolor-saffron transition-colors">About</a>
          <a href="#themes" className="hover:text-tricolor-saffron transition-colors">Themes</a>
          <a href="#schedule" className="hover:text-tricolor-saffron transition-colors">Schedule</a>
          <a href="#register" className="hover:text-tricolor-saffron transition-colors">Registration</a>
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col items-center lg:items-end gap-3">
          <a href="mailto:colloquium2026@slrtce.edu.in" className="text-xs text-white/90 hover:text-white transition-colors">
            ✉ colloquium2026@slrtce.edu.in
          </a>
          <div className="flex gap-3">
            {['in', 'X', 'YT', 'ig'].map(social => (
              <div key={social} className="w-7 h-7 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full cursor-pointer transition-colors text-white font-bold text-[0.65rem]">
                {social}
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
