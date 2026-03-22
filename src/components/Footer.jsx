import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Instagram, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  ArrowRight, 
  Send, 
  Github, 

  Shield,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="relative z-10 mt-32">
      {/* 1. Big CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden group border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/10 via-transparent to-primary-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-24 -right-24 w-64 h-64 bg-primary-blue/20 rounded-full blur-[100px]"
          ></motion.div>

          <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-8 relative z-10 leading-tight" style={{ color: "var(--text-main)" }}>
            Ready to architect the <br />
            <span className="gradient-text italic">next breakthrough?</span>
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="px-10 py-5 bg-gradient-main rounded-2xl text-white font-bold text-lg flex items-center gap-3 mx-auto relative z-10 shadow-xl shadow-primary-blue/20 hover:glow-glow transition-all"
          >
            Initiate Collaboration <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>

      <div className="glass border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* 2. Brand & Newsletter */}
            <div className="lg:col-span-5">
              <Link to="/" className="mb-8 block">
                <Logo className="text-4xl" />
              </Link>
              <p className="text-lg mb-10 max-w-md italic" style={{ color: "var(--text-alt)" }}>
                Synthesizing visionary concepts with elite-level digital engineering. 
                Full-stack supremacy for the modern age.
              </p>
              
              <div className="relative max-w-sm">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-50">Join the Collective Registry</h4>
                <form onSubmit={handleSubscribe} className="relative group">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary-blue/50 transition-all pr-16"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary-blue rounded-xl text-white hover:bg-primary-blue/80 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </form>
                <AnimatePresence>
                  {subscribed && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="absolute -bottom-10 left-0 flex items-center gap-2 text-green-400"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                      <span className="text-xs font-black tracking-[0.1em] uppercase">Transmission Received. Welcome to the Collective.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Cinematic background pulse on success */}
                <AnimatePresence>
                  {subscribed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.2, 0] }}
                      className="absolute inset-0 bg-primary-blue/30 blur-[50px] pointer-events-none rounded-2xl"
                      transition={{ duration: 1.5 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 3. Navigation Links */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-lg font-bold mb-8 font-outfit" style={{ color: "var(--text-main)" }}>Navigation</h3>
                <ul className="space-y-4">
                  {['Home', 'About', 'Services', 'Projects', 'Tech', 'Contact'].map((item) => (
                    <li key={item}>
                      <Link 
                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                        className="transition-all flex items-center gap-2 group"
                        style={{ color: "var(--text-alt)" }}
                      >
                        <span className="w-0 group-hover:w-2 h-[1px] bg-primary-blue transition-all"></span>
                        <span className="group-hover:text-primary-blue transition-colors">{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-8 font-outfit" style={{ color: "var(--text-main)" }}>Resources</h3>
                <ul className="space-y-4">
                  {[
                    { label: 'Documentation', href: '#' },
                    { label: 'Privacy Policy', href: '#' },
                    { label: 'Terms of Service', href: '#' },
                    { label: 'Media Kit', href: '#' }
                  ].map((item) => (
                    <li key={item.label}>
                      <a 
                        href={item.href} 
                        className="transition-all hover:text-primary-blue"
                        style={{ color: "var(--text-alt)" }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h3 className="text-lg font-bold mb-8 font-outfit" style={{ color: "var(--text-main)" }}>Connect</h3>
                <div className="grid grid-cols-4 md:grid-cols-2 gap-4">
                  {[
                    { icon: Linkedin, color: 'hover:text-blue-400', theme: 'var(--text-alt)', href: "https://www.linkedin.com/in/coderisetech" },
                    { icon: Github, color: 'hover:text-purple-400', theme: 'var(--text-alt)', href: "https://github.com/coderisetech2026-ship-it" },
                    { icon: Instagram, color: 'hover:text-pink-400', theme: 'var(--text-alt)', href: "https://www.instagram.com/coderise_tech" },
                    { icon: MessageCircle, color: 'hover:text-green-500', theme: 'var(--text-alt)', href: "https://wa.me/919344881275?text=Hello%20CodeRise!%20I'd%20like%20to%20collaborate." }
                  ].map((social, i) => (


                    <a 
                      key={i}
                      href={social.href}
                      className={`w-12 h-12 glass rounded-2xl flex items-center justify-center transition-all hover:scale-110 ${social.color}`}
                      style={{ color: "var(--text-alt)" }}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Bottom Bar */}
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <p className="text-sm opacity-40">
                © {new Date().getFullYear()} CodeRise Architectural Collective.
              </p>
              <div className="hidden md:flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-green-400/60">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
                Architectural Systems: Operational
              </div>
            </div>

            <div className="flex gap-8 text-xs font-medium opacity-40">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Cookies</a>
            </div>

            <div className="flex items-center gap-2">
              <Logo isFooter={true} className="text-xl md:text-2xl opacity-60 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
