const Footer = () => {
  return (
    <footer 
      id="contact" 
      className="w-full bg-[#071b38] text-white relative z-10 font-sans bg-cover bg-center border-t border-blue-950/50"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(7, 27, 56, 0.94), rgba(4, 15, 32, 0.98)), url('/backgrounds/bg-blue.jpg')",
      }}
    >
      {/* Top Tricolor Accent Stripe */}
      <div className="flex h-1.5 w-full">
        <div className="bg-tricolor-saffron flex-1"></div>
        <div className="bg-white flex-1"></div>
        <div className="bg-tricolor-green flex-1"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Col 1: About & College */}
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center space-x-2 text-white">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8l6.2 6.2-6.2 6.2-6.2-6.2L12 5.8z"/>
              </svg>
              <span className="font-bold text-2xl tracking-widest leading-none">IEEE</span>
            </div>
            <p className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
              Vikas Viksit Bharat 2026
            </p>
            <p className="text-xs text-white/80 leading-relaxed">
              Hosted by Shree L. R. Tiwari College of Engineering, Navi Mumbai. Empowering young minds and researchers to build a stronger tomorrow.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col items-start gap-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white border-b border-white/20 pb-1">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 text-xs text-white/80">
              <a href="#home" className="hover:text-amber-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-amber-400 transition-colors">About Colloquium</a>
              <a href="#themes" className="hover:text-amber-400 transition-colors">Themes & Tracks</a>
              <a href="#awards" className="hover:text-amber-400 transition-colors">Awards & Prize Pool</a>
              <a href="#schedule" className="hover:text-amber-400 transition-colors">Key Dates & Schedule</a>
              <a href="#register" className="hover:text-amber-400 transition-colors">Registration</a>
            </div>
          </div>

          {/* Col 3: Contact & Venue */}
          <div className="flex flex-col items-start gap-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white border-b border-white/20 pb-1">
              Event & Venue
            </h4>
            <div className="flex flex-col gap-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span className="font-semibold text-white">16–18 January 2026</span>
              </div>
              <div className="flex items-start gap-2">
                <span>📍</span>
                <span>Shree L.R. Tiwari College of Engineering, Kanakia Park, Mira Road, Maharashtra</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span>✉️</span>
                <a href="mailto:colloquium2026@slrtce.edu.in" className="hover:text-amber-400 transition-colors underline">
                  colloquium2026@slrtce.edu.in
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Social & IEEE Links */}
          <div className="flex flex-col items-start gap-3">
            <h4 className="text-sm font-bold tracking-wider uppercase text-white border-b border-white/20 pb-1">
              Connect With Us
            </h4>
            <p className="text-xs text-white/80">
              Stay updated with colloquium announcements and track notifications.
            </p>
            <div className="flex gap-2.5 mt-1">
              {[
                { label: 'LinkedIn', icon: 'in' },
                { label: 'Twitter', icon: 'X' },
                { label: 'YouTube', icon: 'YT' },
                { label: 'Instagram', icon: 'ig' }
              ].map(social => (
                <div 
                  key={social.label} 
                  title={social.label}
                  className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-amber-500 hover:text-black rounded-full cursor-pointer transition-all text-white font-bold text-xs"
                >
                  {social.icon}
                </div>
              ))}
            </div>
            <a 
              href="#register" 
              className="mt-2 bg-[#FF6B00] hover:bg-[#E65A00] text-white font-bold text-xs px-5 py-2 rounded-full transition-colors shadow-md"
            >
              Register Now →
            </a>
          </div>

        </div>

        {/* Bottom Divider & Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/60">
          <p>&copy; 2026 IEEE Colloquium — Vikas Viksit Bharat. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IEEE.org</a>
            <span>·</span>
            <a href="https://ieeexplore.ieee.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IEEE Xplore</a>
            <span>·</span>
            <a href="#home" className="hover:text-amber-400 transition-colors">Back to Top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
