import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react'; 

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-20 flex items-center justify-between px-6 sm:px-10 py-4 h-[80px] transition-all duration-300 ${
        scrolled ? 'bg-black/20 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <img
        src="src/assets/logo.png"
        alt="SIKELOR Logo"
        className="h-[70px] sm:h-[90px] object-contain"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 font-semibold text-white gap-6 relative">
        {['Home', 'Event', 'Artikel'].map((item) => (
          <li key={item} className="relative group transition duration-300 transform hover:-translate-y-1">
            <a
              href="#"
              className="after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 group-hover:after:w-full"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        className="text-white md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-black/80 backdrop-blur-md px-6 py-4 md:hidden flex flex-col space-y-4 text-white font-semibold text-base">
          {['Home', 'Event', 'Artikel'].map((item) => (
            <a
              key={item}
              href="#"
              className="transition duration-200 hover:text-gray-300"
              onClick={() => setMenuOpen(false)} // close on click
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}