import { motion } from 'framer-motion';

const services = [
  {
    title: "Enterprise E-Commerce",
    desc: "High-velocity commerce engines optimized for global scale and frictionless conversion.",
    image: "/services/ecommerce.png",
  },
  {
    title: "Corporate Identity",
    desc: "Immersive digital presences that command authority and establish institutional trust.",
    image: "/services/corporate.png",
  },
  {
    title: "Elite Portfolios",
    desc: "Curated personal branding platforms engineered to showcase visionary work.",
    image: "/services/portfolio.png",
  },
  {
    title: "SaaS & Web Systems",
    desc: "Mission-critical platforms powered by high-performance, distributed MERN architecture.",
    image: "/services/saas.png",
  },
  {
    title: "Strategic MVP Launch",
    desc: "Accelerated engineering cycles to transform visionary concepts into market-ready products.",
    image: "/services/mvp.png",
  },
  {
    title: "Immersive UI/UX",
    desc: "Cinematic interfaces that harmonize sensory experience with functional precision.",
    image: "/services/uiux.png",
  },
  {
    title: "Digital Evolution",
    desc: "Legacy system modernization through cutting-edge technology and aesthetic refinement.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Bespoke Engineering",
    desc: "Tailor-made algorithmic solutions engineered for unprecedented business challenges.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black font-outfit mb-6 tracking-tighter"
          >
            Core <span className="gradient-text">Capabilities</span>
          </motion.h2>
          <p className="max-w-2xl mx-auto text-lg font-light leading-relaxed" style={{ color: 'var(--text-alt)' }}>
            We engineer bespoke digital infrastructures designed to scale with your ambition 
            and dominate the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 10,
                rotateX: -10,
                boxShadow: "0px 0px 30px rgba(37,99,235,0.4)"
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="glass p-8 rounded-3xl border border-[var(--surface-border)] hover:border-primary-blue/50 transition-colors group relative overflow-hidden flex flex-col items-center text-center"
              aria-label={`Service: ${service.title}`}
            >
              {/* Animated Image Container */}
              <motion.div 
                className="mb-6 relative w-full aspect-video overflow-hidden rounded-2xl border border-[var(--surface-border)] group-hover:border-primary-blue/30 transition-all"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-primary-blue/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-3 tracking-tight">{service.title}</h3>
              <p className="text-sm leading-relaxed font-light" style={{ color: 'var(--text-alt)' }}>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
