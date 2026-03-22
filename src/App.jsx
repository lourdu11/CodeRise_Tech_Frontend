import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Tech from './pages/Tech';
import Contact from './pages/Contact';
import CustomCursor from './components/CustomCursor';
import BackgroundAnimation from './components/BackgroundAnimation';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProjectDetails from './pages/ProjectDetails';
import NotFound from './pages/NotFound';
import LinkedInRedirect from './components/LinkedInRedirect';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const validAdminRoutes = ['/admin', '/admin/dashboard'];
  const isAdminRoute = validAdminRoutes.includes(location.pathname);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen transition-colors duration-300 overflow-x-hidden" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-main)' }}>
      {loading && <LoadingScreen />}
        {/* Phase 15: Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-main z-[100] origin-left"
          style={{ scaleX }}
        />
        <CustomCursor />
        <BackgroundAnimation />
        <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/linkedin" element={<LinkedInRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdminRoute && <Footer />}
      </div>
  );
}

export default App;
