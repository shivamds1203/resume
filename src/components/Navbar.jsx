import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { buttonTap } from '../animations';

const LINKS = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['education', 'Education'],
  ['contact', 'Contact'],
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      // update active section
      const sections = LINKS.map(([id]) => document.getElementById(id)).filter(Boolean);
      const current = sections.findLast(el => el.getBoundingClientRect().top <= 120);
      setActive(current?.id ?? '');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[rgba(3,4,10,0.82)] backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
          : ''
        }`}
    >
      <div className="max-w-[1140px] mx-auto px-6 py-[18px] flex items-center justify-between gap-4">
        {/* Brand */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col gap-[3px] text-left"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <span
            className="font-display text-[15px] font-bold tracking-[0.01em]"
            style={{ background: 'var(--grad-1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
          >
            Shivam D Suryawanshi
          </span>
          <span className="text-[11px] text-[var(--text-3)] tracking-[0.05em]">
            Software Engineer · Cybersecurity &amp; Cloud
          </span>
        </motion.button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(([id, label]) => (
            <motion.button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-[0.02em] transition-colors duration-200"
              style={{ color: active === id ? 'var(--text)' : 'var(--text-2)' }}
              whileHover={{ color: 'var(--text)', backgroundColor: 'var(--glass)' }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {label}
              {active === id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: 'var(--accent)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}

          <motion.button
            className="ml-2 px-5 py-2 rounded-full text-[13px] font-semibold text-white tracking-[0.03em]"
            style={{ background: 'var(--grad-1)', boxShadow: '0 0 20px var(--accent-glow)' }}
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.06, boxShadow: '0 0 36px rgba(108,99,255,0.55)' }}
            whileTap={{ scale: 0.93, rotateX: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            Hire Me
          </motion.button>
        </nav>

        {/* Hamburger */}
        <motion.button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block w-5 h-[2px] bg-[var(--text-2)] rounded-full origin-center"
              animate={{
                rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: menuOpen ? (i === 0 ? 7 : i === 2 ? -7 : 0) : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </motion.button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden overflow-hidden px-6 pb-5 flex flex-col gap-1 border-t border-white/[0.06] bg-[rgba(3,4,10,0.95)] backdrop-blur-2xl"
        >
          {LINKS.map(([id, label], i) => (
            <motion.button
              key={id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="nav-link text-left px-3 py-[10px]"
              whileTap={{ scale: 0.95, x: 6 }}
              onClick={() => { scrollTo(id); setMenuOpen(false); }}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
