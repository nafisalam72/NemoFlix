import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/search?type=movie' },
    { name: 'Anime', path: '/search?type=anime' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-primary text-3xl font-bold tracking-tighter">Nemo<span className="text-white">Flix</span></Link>
        
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-gray-300'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/search" className="text-gray-300 hover:text-primary transition-colors">
            <Search size={20} />
          </Link>
        </nav>

        <button 
          className="md:hidden text-white" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-dark/95 backdrop-blur-lg border-b border-gray-800 md:hidden py-4 px-4 flex flex-col gap-4"
        >
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-gray-300 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/search" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-primary transition-colors"
          >
            <Search size={20} /> Search
          </Link>
        </motion.div>
      )}
    </header>
  );
}
