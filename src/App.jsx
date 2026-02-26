import { AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function Orbs() {
  return (
    <>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </>
  );
}

function Divider() {
  return <div className="section-divider" />;
}

export default function App() {
  return (
    <AnimatePresence>
      <ParticleBackground />
      <CustomCursor />
      <Orbs />
      <Navbar />

      <main className="relative z-10 max-w-[1140px] mx-auto px-6 pb-20" style={{ perspective: 1400 }}>
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Education />
        <Divider />
        <Contact />
        <Footer />
      </main>
    </AnimatePresence>
  );
}
