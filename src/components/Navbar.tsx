import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', id: 'home', href: '#home' },
    { name: 'About', id: 'about', href: '#about' },
    { name: 'Tracks', id: 'tracks', href: '#tracks' },
    { name: 'Prize Pool', id: 'awards', href: '#awards' },
    { name: 'Schedule', id: 'schedule', href: '#schedule' },
    { name: 'Contact', id: 'contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // offset for navbar height

      // Find the current section
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.getElementById(navLinks[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="w-full z-50 pt-2 pb-6 px-4 md:px-8 flex justify-between items-center fixed top-0"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Background Layer with Multiply Blend */}
        <div 
          className="absolute inset-0 -z-10 bg-[url('/navbar-bg.png')] bg-[length:100%_100%] bg-no-repeat mix-blend-multiply"
        />
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-2 text-white shrink-0">
          <div className="flex flex-col">
            <span className="font-bold text-2xl tracking-widest leading-none mb-1 flex items-center">
               <svg viewBox="0 0 24 24" className="w-8 h-8 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 12l10 10 10-10L12 2zm0 3.8l6.2 6.2-6.2 6.2-6.2-6.2L12 5.8z"/></svg>
               IEEE
            </span>
            <span className="text-[0.6rem] tracking-[0.02em] text-white/90 italic leading-none font-sans">Advancing Technology<br/>for Humanity</span>
          </div>
        </div>

        {/* Center: Main Navigation */}
        <nav className="hidden xl:flex space-x-2 items-center font-sans font-bold text-[0.8rem] tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors px-3 py-1.5 rounded-full ${
                activeSection === link.id 
                  ? 'bg-white text-brand-navy' 
                  : 'text-white/95 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Utility Links & Button */}
        <div className="hidden lg:flex flex-col items-end justify-center space-y-1.5 shrink-0">
          <div className="flex items-center text-[0.65rem] text-white/90 font-medium tracking-wide">
            <a href="#" className="hover:text-white px-2 border-r border-white/40">IEEE.org</a>
            <a href="#" className="hover:text-white px-2 border-r border-white/40">IEEE Xplore</a>
            <a href="#" className="hover:text-white px-2 border-r border-white/40">Volunteer</a>
            <a href="#" className="hover:text-white pl-2">Student Zone</a>
          </div>
          <a href="#register" className="bg-[#FF6B00] hover:bg-[#E65A00] text-white font-bold text-sm px-6 py-2 rounded-full transition-colors shadow-md">
            Register Now →
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="xl:hidden p-2 text-[#F4EFE6]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            className="absolute top-full left-0 w-full bg-brand-navy text-white shadow-xl flex flex-col items-center py-8 space-y-4 xl:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-lg transition-colors px-4 py-2 rounded-md ${
                  activeSection === link.id ? 'bg-white text-brand-navy font-bold' : 'hover:text-tricolor-saffron'
                }`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveSection(link.id);
                }}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#register" 
              className="btn-primary mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register Now →
            </a>
          </motion.div>
        )}
      </motion.header>
    </>
  );
};

export default Navbar;
