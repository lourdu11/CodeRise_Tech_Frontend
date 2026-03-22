import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, Sun, Moon, Monitor } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeIcons = {
    dark: <Moon size={20} />,
    light: <Sun size={20} />,
    default: <Monitor size={20} />
  };

  const cycleTheme = () => {
    const modes = ['dark', 'light', 'default'];
    const currentIndex = modes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % modes.length;
    setTheme(modes[nextIndex]);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Tech', path: '/tech' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo className="" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative group px-1 py-2 text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-primary-blue' : 'text-text-alt hover:text-text-main'}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-main transform ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform origin-left`}></span>
                </Link>
              ))}
              
              {/* Theme Toggle Button */}
              <button
                onClick={cycleTheme}
                className="p-2 glass rounded-xl hover:bg-white/10 transition-all duration-300 text-text-alt hover:text-text-main group relative"
                title={`Switch to ${theme === 'dark' ? 'Light' : theme === 'light' ? 'System' : 'Dark'} Mode`}
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {themeIcons[theme]}
                </motion.div>
              </button>

              <Link to="/contact">
                <button className="gradient-bg px-6 py-2 rounded-full font-semibold text-white hover:glow-glow transition-all duration-300 transform hover:scale-105">
                  Start Project
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={cycleTheme}
              className="p-2 glass rounded-xl text-text-alt"
            >
              {themeIcons[theme]}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-alt hover:text-text-main focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass absolute top-full left-0 w-full border-t border-[var(--surface-border)]"
          >
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 text-center">
              {navLinks.map((link) => {
                const isActive = link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-4 text-base font-bold transition-all rounded-xl mx-2 ${
                      isActive 
                        ? 'bg-primary-blue/10 text-primary-blue scale-[1.02] shadow-inner' 
                        : 'text-text-alt hover:text-text-main hover:bg-white/5'
                    }`}
                    style={{
                      color: isActive ? 'var(--primary-blue, #2563eb)' : 'var(--text-alt)'
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="py-4">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <button className="gradient-bg px-8 py-3 rounded-full font-semibold w-2/3">
                    Start Project
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
