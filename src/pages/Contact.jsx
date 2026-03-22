import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, MessageSquare, Smartphone, CheckCircle2, Zap } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', projectType: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const { activeTheme } = useTheme();
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMouseMove = (e) => {
    if (!formRef.current) return;
    const { left, top, width, height } = formRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const rotateX = (y - 0.5) * 10;
    const rotateY = (x - 0.5) * -10;
    formRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!formRef.current) return;
    formRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      const res = await axios.post('/api/contact', formData);
      if (res.status === 201) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
      }
    } catch (err) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.response?.data?.message || 'Something went wrong. Please try again.' 
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="pt-32 pb-20 relative overflow-hidden"
    >
      <Helmet>
        <title>Contact Us | CodeRise</title>
      </Helmet>

      {/* Floating Background Motifs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div 
          animate={{ y: [0, -50, 0], x: [0, 30, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[10%]"
        >
          <Mail size={120} className="text-primary-blue/30" strokeWidth={0.5} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 60, 0], x: [0, -40, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-[10%]"
        >
          <MessageSquare size={100} className="text-primary-purple/30" strokeWidth={0.5} />
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/5 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-outfit mb-8"
            >
              Let's <span className="gradient-text">Connect</span>
            </motion.h1>
            <p className="text-xl mb-12 leading-relaxed max-w-lg" style={{ color: 'var(--text-alt)' }}>
              Have a visionary project? Or just want to say hi? Reach out and 
              let's build the future together.
            </p>

            <div className="space-y-8">
              {[
                { icon: <Mail />, title: "Email Us", val: "coderisetech2026@gmail.com", link: "mailto:coderisetech2026@gmail.com", color: "text-primary-blue" },
                { icon: <Phone />, title: "Call Us", val: "+91 9344881275", link: "tel:+919344881275", color: "text-primary-purple" },
                { icon: <MapPin />, title: "Visit Us", val: "Remote-first ", link: "https://maps.google.com/?q=Silicon+Valley", color: "text-accent-cyan" }
              ].map((info, idx) => (
                <motion.a 
                  key={idx}
                  href={info.link}
                  target={info.link.startsWith('http') ? "_blank" : "_self"}
                  rel={info.link.startsWith('http') ? "noopener noreferrer" : ""}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-6 group cursor-pointer"
                >
                  <div className={`p-4 glass rounded-[1.5rem] ${info.color} group-hover:scale-110 transition-transform`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{info.title}</h3>
                    <p style={{ color: 'var(--text-alt)' }} className="group-hover:text-primary-blue transition-colors">{info.val}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form with 3D Tilt */}
          <motion.div 
            variants={itemVariants}
            ref={formRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass p-10 rounded-[3.5rem] border-[var(--surface-border)] shadow-2xl transition-transform duration-200 ease-out relative overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <AnimatePresence mode="wait">
              {!status.success ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-widest ml-1" style={{ color: 'var(--text-alt)' }}>Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-blue focus:ring-4 ring-primary-blue/10 transition-all font-medium" 
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-widest ml-1" style={{ color: 'var(--text-alt)' }}>Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-blue focus:ring-4 ring-primary-blue/10 transition-all font-medium" 
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-widest ml-1" style={{ color: 'var(--text-alt)' }}>Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-blue focus:ring-4 ring-primary-blue/10 transition-all font-medium" 
                        placeholder="+91 00000 00000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-widest ml-1" style={{ color: 'var(--text-alt)' }}>Project Type</label>
                      <div className="relative">
                        <select 
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          required
                          className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-purple transition-all text-inherit appearance-none font-medium pr-10"
                        >
                          <option value="" disabled className="bg-[var(--bg-color)]">Select Type</option>
                          <option value="E-commerce" className="bg-[var(--bg-color)]">E-commerce</option>
                          <option value="Web App" className="bg-[var(--bg-color)]">Web Application</option>
                          <option value="Portfolio" className="bg-[var(--bg-color)]">Photography / Portfolio</option>
                          <option value="MVP Startups" className="bg-[var(--bg-color)]">MVP Development</option>
                          <option value="Other" className="bg-[var(--bg-color)]">Other Services</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest ml-1" style={{ color: 'var(--text-alt)' }}>Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4" 
                      className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-blue transition-all resize-none font-medium h-32" 
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={status.loading}
                    className="w-full gradient-bg py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:glow-glow transition-all disabled:opacity-50 text-white shadow-xl"
                  >
                    {status.loading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <Smartphone size={20} />
                      </motion.div>
                    ) : (
                      <>
                        Send Message <Send size={20} />
                      </>
                    )}
                  </motion.button>

                  {status.error && (
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-center font-bold text-sm bg-red-400/10 p-4 rounded-xl">
                      {status.error}
                    </motion.p>
                  )}
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center relative"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  {/* Cinematic Success Glow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 2.5] }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-primary-blue/20 rounded-full blur-[100px] pointer-events-none"
                  />

                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                    className="w-24 h-24 bg-gradient-main rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(37,99,235,0.4)]"
                  >
                    <CheckCircle2 size={56} className="text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-bold mb-4 font-outfit"
                  >
                    Transmission <span className="gradient-text">Received</span>
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-xs mx-auto text-lg mb-10 leading-relaxed"
                    style={{ color: 'var(--text-alt)' }}
                  >
                    Your vision has been successfully beamed to our collective. 
                    Expect a response within 24 standard hours.
                  </motion.p>
                  
                  <motion.button 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={() => setStatus({ ...status, success: false })}
                    className="px-10 py-4 glass rounded-2xl font-bold hover:bg-white/10 transition-all border-white/10 flex items-center gap-2 group"
                  >
                    Beam Another <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-40 mb-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6">Frequently Asked <span className="gradient-text">Questions</span></h2>
            <p style={{ color: 'var(--text-alt)' }} className="max-w-xl mx-auto italic">Common questions about our services and process</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { q: "What type of projects do you work on?", a: "We don't just build websites; we architect digital universes. From high-conversion e-commerce engines to complex AI-driven SaaS platforms, we specialize in projects that require both technical muscle and aesthetic soul." },
              { q: "How long does it take to complete a project?", a: "Precision takes time. While a high-impact MVP can be launched in 4-6 weeks, more mission-critical systems are meticulously crafted over 3-5 months. We prioritize velocity without ever sacrificing the 'wow' factor." },
              { q: "Do you provide ongoing support after launch?", a: "Launch is just the beginning. We offer 'Mission Control' support packages—ensuring your platform stays secure, lightning-fast, and evolves with the ever-changing tech landscape long after deployment." },
              { q: "What is your pricing structure?", a: "Value-driven investment. Our pricing reflects the high-level engineering and bespoke design we bring to the table. We provide transparent, fixed-price blueprints after a deep-dive discovery session into your vision." },
              { q: "How do you handle revisions and feedback?", a: "Symphonic Collaboration. Our process is iterative and transparent. You'll have backstage access to the design and development phases, with dedicated cycles to refine every pixel until it resonates perfectly with your brand." }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-primary-blue/20 transition-all group"
              >
                <h4 className="text-xl font-bold mb-4 group-hover:text-primary-blue transition-colors flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary-blue rounded-full"></span>
                  {faq.q}
                </h4>
                <p style={{ color: 'var(--text-alt)' }} className="leading-relaxed text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Brainstorming Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-32 p-12 md:p-20 glass rounded-[4rem] overflow-hidden border-[var(--surface-border)] relative group text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-transparent to-primary-purple/5 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block p-4 glass rounded-full mb-8 text-primary-purple"
            >
              <Zap size={40} />
            </motion.div>
            <h3 className="text-3xl md:text-5xl font-black font-outfit mb-6">Got an <span className="gradient-text italic">Idea?</span></h3>
            <p className="max-w-2xl mx-auto text-lg mb-10" style={{ color: 'var(--text-alt)' }}>
              We don't just execute; we innovate. If you have a skeletal concept, we'll give it a heart, a soul, and a cinematic digital body.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-primary-blue">Strategic Planning</span>
              <span className="px-6 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-primary-purple">Architectural Design</span>
              <span className="px-6 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-accent-cyan">Rapid Prototyping</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
