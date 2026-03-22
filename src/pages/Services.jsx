import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ServicesPreview from '../components/ServicesPreview';
import { CheckCircle, Search, Palette, Code2, Rocket, ArrowRight } from 'lucide-react';


const Services = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20"
    >
      <Helmet>
        <title>Services | CodeRise</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 text-balance">
          <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6">
            Architectural <span className="gradient-text">Solutions</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl italic" style={{ color: 'var(--text-alt)' }}>
            We engineer a comprehensive suite of digital solutions designed for 
            mission-critical scalability and global market dominance.
          </p>
        </div>

        <ServicesPreview />

        {/* Lifecycle of Excellence Section */}
        <div className="mt-40 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-6 tracking-tight">
              The Lifecycle of <span className="gradient-text italic">Excellence</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg opacity-60" style={{ color: 'var(--text-alt)' }}>
              A meticulously refined engineering cycle that transforms visionary ideas into industry-leading digital assets.
            </p>
          </motion.div>

          {/* Workflow Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[60%] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-primary-blue/20 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {[
              { 
                step: 'Architectural Discovery', 
                icon: <Search size={24} />, 
                delay: 0.1,
                desc: 'Deep-dive analysis to align technology with core business objectives.'
              },
              { 
                step: 'Visual Engineering', 
                icon: <Palette size={24} />, 
                delay: 0.2,
                desc: 'Crafting high-fidelity prototypes with immersive UX/UI design systems.'
              },
              { 
                step: 'Robust Development', 
                icon: <Code2 size={24} />, 
                delay: 0.3,
                desc: 'Engineering scalable, mission-critical code architectures for global performance.'
              },
              { 
                step: 'Global Deployment', 
                icon: <Rocket size={24} />, 
                delay: 0.4,
                desc: 'Strategic rollout and optimization for seamless market entry and scaling.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                whileHover={{ y: -10 }}
                className="group relative p-8 glass rounded-[2.5rem] border-white/5 hover:border-primary-blue/20 transition-all duration-500 overflow-hidden"
              >
                {/* Icon Circle */}
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:border-primary-blue/30 group-hover:bg-primary-blue/5 transition-all text-primary-blue">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-4 font-outfit tracking-tight" style={{ color: "var(--text-main)" }}>
                  {item.step}
                </h3>
                
                <p className="text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-alt)" }}>
                  {item.desc}
                </p>

                {/* Bottom Glow */}
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-blue/5 blur-[50px] group-hover:bg-primary-blue/10 transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
