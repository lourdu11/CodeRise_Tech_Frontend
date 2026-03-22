import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';

import { Helmet } from 'react-helmet-async';
import { Target, Eye, Users, Award, Linkedin, Github, Instagram, Globe, MessageSquare, X } from 'lucide-react';



const team = [
  {
    name: "Lourdu Xavier",
    role: "Founder & CEO",
    skills: ["Leadership", "Decision Making", "MERN Stack Developer", "Devops","AI Integration"],
    image: "https://ik.imagekit.io/Lourdu/CodeRise/lourdu.jpeg",
    bio: "Founder and full-stack engineer focused on building scalable MERN stack applications, AI-powered solutions, and cloud deployments. Driven by innovation, fast delivery, and creating impactful digital experiences for clients and startups.",
    socials: { linkedin: "https://www.linkedin.com/in/coderisetech", github: "https://github.com/coderisetech2026-ship-it", instagram: "https://www.instagram.com/coderise_tech", portfolio: "#" }

  },
  {
    name: "Kirubalan",
    role: "Co-Founder & CTO",

    skills: ["LAMP Stack Developer", "Scalability","API Development","Hacker","System & Network Troubleshooting"],
    image: "https://ik.imagekit.io/Lourdu/CodeRise/WhatsApp%20Image%202026-03-20%20at%2017.38.10.jpeg",
    bio: "Co-Founder and software engineer focused on LAMP stack development, AI integration, and scalable architectures. Dedicated to building high-performance applications and driving technical innovation within the organization.",
    socials: { linkedin: "https://www.linkedin.com/in/coderisetech", github: "https://github.com/coderisetech2026-ship-it", instagram: "https://www.instagram.com/coderise_tech", portfolio: "#" }

  },
  {
    name: "Makeshwaran ",
    role: "COO",

    skills: ["HTML","CSS","JAVASCRIPT","BOOTSTRAP","PHP","MySQL"],
    image: "https://ik.imagekit.io/Lourdu/CodeRise/makesh.jpeg",
bio: "Frontend developer focused on creating responsive and interactive web interfaces using HTML, CSS, JavaScript, and Bootstrap. Passionate about delivering smooth user experiences and modern UI designs.",
    socials: { linkedin: "https://www.linkedin.com/in/coderisetech", github: "https://github.com/coderisetech2026-ship-it", instagram: "https://www.instagram.com/coderise_tech", portfolio: "#" }

  },

  {
    name: "Jaisuvisane",
    role: "Senior MERN Stack Developer",

    skills: ["MERN Stack Developer", "AI Integration", "REST API","UI/UX Designer"],
    image: "https://ik.imagekit.io/Lourdu/CodeRise/WhatsApp%20Image%202026-03-20%20at%2018.52.08.jpeg",
    bio: "Senior MERN Stack Developer specializing in building scalable full-stack applications using MongoDB, Express.js, React, and Node.js. Experienced in developing efficient APIs and integrating modern technologies to deliver high-performance solutions.",
    socials: { linkedin: "https://www.linkedin.com/in/coderisetech", github: "https://github.com/coderisetech2026-ship-it", instagram: "https://www.instagram.com/coderise_tech", portfolio: "#" }

  },
  {
    name: "Antobendict",
    role: "Client Relationship Manager",

    skills: ["Communication", "Client Handling", "Relationship Building", "Coordination"],
    image: "" ,
   bio: "Client Relationship Manager focused on building strong client connections and ensuring smooth communication. Skilled in understanding client needs, coordinating with teams, and delivering a seamless experience.",
    socials: { linkedin: "https://www.linkedin.com/in/coderisetech", github: "https://github.com/coderisetech2026-ship-it", instagram: "https://www.instagram.com/coderise_tech", portfolio: "#" }

  },
  {
    name: "Jaisuvisane",
    role: "Chief Marketing Officer",

    skills: ["Communication", "Team Coordination", "Problem Solving", "Time Management"],
    image: "https://ik.imagekit.io/Lourdu/CodeRise/WhatsApp%20Image%202026-03-20%20at%2015.47.25.jpeg",
    bio: "Operations & Support Executive responsible for managing day-to-day activities and ensuring smooth workflow. Focused on effective communication, team coordination, and providing reliable support for operations.",
    socials: { linkedin: "https://www.linkedin.com/in/coderisetech", github: "https://github.com/coderisetech2026-ship-it", instagram: "https://www.instagram.com/coderise_tech", portfolio: "#" }

  },
  
];


const About = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const timelineHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] } 
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-32 pb-20 relative overflow-hidden"
    >
      {/* Floating Background Motifs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div 
          animate={{ 
            y: [0, -100, 0],
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[5%] text-primary-blue/20"
        >
          <Award size={150} strokeWidth={0.5} />
        </motion.div>
        <motion.div 
          animate={{ 
            y: [0, 80, 0],
            x: [0, 50, 0],
            rotate: [0, -45, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] text-primary-purple/20"
        >
          <Target size={120} strokeWidth={0.5} />
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-blue/5 rounded-full blur-[150px]" />
      </div>

      <Helmet>
        <title>About Us | CodeRise</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 relative z-10">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold font-outfit mb-6"
          >
            The Architects of <span className="gradient-text">CodeRise</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-xl italic" 
            style={{ color: 'var(--text-alt)' }}
          >
            "We don't just develop software; we architect the future."
          </motion.p>
        </div>

        {/* Mission & Vision */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass p-10 rounded-3xl border-primary-blue/20"
          >
            <Target className="text-primary-blue mb-6" size={48} />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="leading-relaxed text-lg" style={{ color: 'var(--text-alt)' }}>
              To empower visionaries with elite digital infrastructure that
              harmonizes aesthetic brilliance with technical supremacy.
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="glass p-10 rounded-3xl border-primary-purple/20"
          >
            <Eye className="text-primary-purple mb-6" size={48} />
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="leading-relaxed text-lg" style={{ color: 'var(--text-alt)' }}>
              To establish the global standard for digital excellence, where every
              interaction is an experience and every deployment is a masterpiece.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        {/* <div className="mb-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Projects Delivered", value: "50+", icon: Award, color: "text-primary-blue" },
              { label: "Lines of Code", value: "1M+", icon: Users, color: "text-primary-purple" },
              { label: "Global Clients", value: "25+", icon: Globe, color: "text-primary-blue" },
              { label: "Innovation Awards", value: "12", icon: Target, color: "text-primary-purple" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl text-center group hover:border-primary-blue/30 transition-colors"
              >
                <stat.icon className={`${stat.color} mb-4 mx-auto group-hover:scale-110 transition-transform`} size={32} />
                <h4 className="text-4xl font-bold mb-2 font-outfit">{stat.value}</h4>
                <p className="text-sm font-medium opacity-60 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div> */}

        <motion.div 
          className="mb-32 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <h2 className="text-4xl font-bold font-outfit text-center mb-16">Our Core <span className="gradient-text">Values</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Uncompromising Innovation", desc: "We don't follow trends; we define them through radical experimentation and engineering mastery.", icon: "🚀" },
              { title: "Strategic Transparency", desc: "Clear, honest communication and an open architectural process are the bedrock of our partnerships.", icon: "💎" },
              { title: "Cinematic Precision", desc: "Every pixel is deliberate, every interaction is curated, and every line of code is optimized for maximum impact.", icon: "🎬" }
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass p-8 rounded-[2rem] border-white/5 hover:border-primary-blue/20 transition-all"
              >
                <div className="text-4xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-alt)' }}>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="mb-32 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <h2 className="text-4xl font-bold font-outfit text-center mb-16">Meet the <span className="gradient-text">Visionaries</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => {
              const cardRef = React.useRef(null);

              const handleMouseMove = (e) => {
                const card = cardRef.current;
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;
                const rotateX = (y - 0.5) * 20;
                const rotateY = (x - 0.5) * -20;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
              };

              const handleMouseLeave = () => {
                cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
              };

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="glass p-8 rounded-[2.5rem] text-center border-[var(--surface-border)] transition-all duration-200 ease-out group hover:shadow-2xl hover:shadow-primary-blue/10"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative inline-block mb-6" style={{ transform: 'translateZ(60px)' }}>
                    <div className="absolute inset-0 bg-gradient-main rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative z-10 p-1 rounded-full bg-gradient-to-b from-white/20 to-transparent">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>

                    {/* Social Hover Overlay */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20">
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} className="p-2 glass rounded-full hover:text-primary-blue transition-colors">
                          <Linkedin size={16} />
                        </a>
                      )}
                      {member.socials.github && (
                        <a href={member.socials.github} className="p-2 glass rounded-full hover:text-primary-purple transition-colors">
                          <Github size={16} />
                        </a>
                      )}
                      {member.socials.instagram && (
                        <a href={member.socials.instagram} className="p-2 glass rounded-full hover:text-primary-purple transition-colors">
                          <Instagram size={16} />
                        </a>
                      )}
                      {member.socials.portfolio && (
                        <a href={member.socials.portfolio} className="p-2 glass rounded-full hover:text-primary-blue transition-colors">
                          <Globe size={16} />
                        </a>
                      )}


                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-1" style={{ transform: 'translateZ(40px)' }}>{member.name}</h3>
                  <p className="text-primary-blue font-medium mb-6 uppercase tracking-wider text-sm" style={{ transform: 'translateZ(30px)' }}>{member.role}</p>

                  <div className="flex flex-wrap justify-center gap-2 mb-6" style={{ transform: 'translateZ(20px)' }}>
                    {member.skills.map((skill, i) => (
                      <span key={i} className="text-[10px] px-3 py-1 glass rounded-full font-medium" style={{ color: 'var(--text-alt)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMember(member)}
                    className="w-full py-3 glass rounded-xl text-sm font-bold hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    <MessageSquare size={16} />
                    View Bio
                  </motion.button>

                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="mb-20 relative z-10">
          <h2 className="text-4xl font-bold font-outfit text-center mb-20">Our <span className="gradient-text">Journey</span></h2>
          <div className="relative border-l border-white/10 ml-4 md:ml-0 md:flex md:flex-col md:items-center">
            {/* Animated Scroll Line */}
            <motion.div 
              style={{ scaleY: timelineHeight }}
              className="absolute top-0 left-[-1px] md:left-1/2 w-[1px] h-full bg-gradient-to-b from-primary-blue to-primary-purple origin-top z-0"
            />

            {[
              { year: "2026", title: "The New Evolution", desc: "Starting our most ambitious chapter yet, redefining the digital experience for the modern world." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mb-20 md:w-1/2 md:mr-auto md:pr-10 text-left md:text-right"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
                  className="absolute top-0 w-4 h-4 bg-primary-blue rounded-full -left-[21px] md:left-auto md:right-[-9px] ring-4 ring-primary-blue/20 z-10"
                />
                <span className="text-primary-blue font-bold text-xl mb-2 block">{item.year}</span>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-alt)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bio Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full glass rounded-[3rem] p-8 md:p-12 relative overflow-hidden border-white/10"
              >
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-6 right-6 p-2 glass rounded-full hover:bg-white/10 transition-colors z-10"
                >
                  <X size={20} />
                </button>

                <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden border-2 border-primary-blue/30 shrink-0">
                    <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold font-outfit mb-2">{selectedMember.name}</h3>
                    <p className="text-primary-blue font-bold uppercase tracking-widest text-sm mb-6">{selectedMember.role}</p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                      {selectedMember.skills.map((skill, i) => (
                        <span key={i} className="text-xs px-4 py-2 glass rounded-full font-medium border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-lg leading-relaxed italic mb-8" style={{ color: 'var(--text-alt)' }}>
                      "{selectedMember.bio}"
                    </p>

                    <div className="flex justify-center md:justify-start gap-4">
                      {selectedMember.socials.linkedin && (
                        <a href={selectedMember.socials.linkedin} className="p-3 glass rounded-xl hover:text-primary-blue transition-colors">
                          <Linkedin size={20} />
                        </a>
                      )}
                      {selectedMember.socials.github && (
                        <a href={selectedMember.socials.github} className="p-3 glass rounded-xl hover:text-primary-purple transition-colors">
                          <Github size={20} />
                        </a>
                      )}
                      {selectedMember.socials.instagram && (
                        <a href={selectedMember.socials.instagram} className="p-3 glass rounded-xl hover:text-primary-purple transition-colors">
                          <Instagram size={20} />
                        </a>
                      )}
                      {selectedMember.socials.portfolio && (
                        <a href={selectedMember.socials.portfolio} className="p-3 glass rounded-xl hover:text-primary-blue transition-colors">
                          <Globe size={20} />
                        </a>
                      )}


                    </div>

                  </div>
                </div>

                {/* Decorative Glow */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary-blue/10 rounded-full blur-[100px] pointer-events-none" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default About;

