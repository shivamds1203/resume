import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, buttonTap, viewportOptions } from '../animations';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

function Badge({ color, children }) {
  const colors = {
    blue: { bg: 'rgba(108,99,255,0.2)', border: 'rgba(108,99,255,0.3)', text: '#a5b4fc' },
    cyan: { bg: 'rgba(6,182,212,0.15)', border: 'rgba(6,182,212,0.3)', text: '#67e8f9' },
    pink: { bg: 'rgba(244,114,182,0.15)', border: 'rgba(244,114,182,0.3)', text: '#f9a8d4' },
    green: { bg: 'rgba(6,214,160,0.12)', border: 'rgba(6,214,160,0.25)', text: '#6ee7b7' },
  }[color];
  return (
    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-[0.04em]"
      style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}>
      {children}
    </span>
  );
}

function FloatingCard({ className, style, children, delay = 0 }) {
  return (
    <motion.div
      className={`float-card ${className}`}
      initial={{ opacity: 0, y: 30, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, rotateX: -4, rotateY: 4, y: -6, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
      style={{ perspective: 800, ...style }}
    >
      {children}
    </motion.div>
  );
}

function HeroCards() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="cards-scene">
        <FloatingCard className="float-card-main" delay={0.3}>
          <div className="w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-[15px] text-white mb-3"
            style={{ background: 'var(--grad-1)', boxShadow: '0 8px 24px var(--accent-glow)' }}>
            SD
          </div>
          <div className="text-sm font-bold text-[var(--text)] mb-1">Support Engineer</div>
          <div className="text-xs text-[var(--text-2)] mb-3">Cybersecurity · Netleap IT</div>
          <div className="flex flex-wrap gap-1.5">
            <Badge color="blue">95% FCR</Badge>
            <Badge color="cyan">50+ customers</Badge>
            <Badge color="green">Network Infra</Badge>
          </div>
        </FloatingCard>

        <FloatingCard className="float-card-secondary" delay={0.5}>
          <div className="text-xs font-bold text-[var(--accent-3)] uppercase tracking-[0.1em] mb-1.5">🚗 IoT Project</div>
          <div className="text-xs text-[var(--text-2)] leading-relaxed mb-2.5">
            Real-time vehicle emission monitoring with ESP32, Flutter &amp; cloud backend.
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Badge color="pink">Flutter</Badge>
            <Badge color="blue">ESP32</Badge>
            <Badge color="cyan">Cloud</Badge>
          </div>
        </FloatingCard>

        <FloatingCard className="float-card-chips" delay={0.7}>
          <div className="text-[11px] font-bold text-[var(--accent-2)] uppercase tracking-[0.1em] mb-2">⚡ Toolbox</div>
          <div className="flex flex-wrap gap-1">
            {['Python', 'Java', 'C++', 'Flutter', 'AWS', 'Azure'].map((s, i) => (
              <motion.span key={s}
                className="px-2 py-0.5 rounded-full text-[11px] font-medium text-[#6ee7b7]"
                style={{ background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.2)' }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.06 }}
                whileHover={{ scale: 1.15, y: -2 }}
              >{s}</motion.span>
            ))}
          </div>
        </FloatingCard>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-36 pb-20 min-h-screen"
      style={{ perspective: 1200 }}>
      {/* Left */}
      <motion.div
        className="flex flex-col"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] text-[#06d6a0] mb-5 w-fit"
          style={{ background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.25)' }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="w-[7px] h-[7px] rounded-full bg-[#06d6a0]"
            style={{ animation: 'pulse-dot 1.8s infinite' }} />
          Available for work
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display font-extrabold leading-[1.08] tracking-[-0.02em] text-[var(--text)] mb-5"
          style={{ fontSize: 'clamp(38px, 5vw, 62px)' }}
        >
          I build{' '}
          <span className="gradient-text">friendly,<br />reliable software</span>.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base text-[var(--text-2)] leading-[1.75] max-w-[36rem] mb-9"
        >
          Computer Engineering graduate with expertise in cybersecurity support,
          IoT systems, and full-stack web applications. I focus on building
          simple, human-friendly experiences backed by solid engineering.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-9">
          <motion.button
            className="btn-primary"
            onClick={() => scrollTo('projects')}
            whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(108,99,255,0.6), 0 8px 32px rgba(0,0,0,0.4)' }}
            whileTap={{ scale: 0.93, rotateX: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            View Projects ↗
          </motion.button>
          <motion.button
            className="btn-ghost"
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.04, borderColor: 'rgba(108,99,255,0.5)' }}
            whileTap={{ scale: 0.94, rotateX: 6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            Contact Me
          </motion.button>

          {/* LinkedIn icon button */}
          <motion.a
            href="https://www.linkedin.com/in/shivam-suryawanshi-a984922a3"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(10,102,194,0.15)', border: '1px solid rgba(10,102,194,0.35)', color: '#60a5fa' }}
            whileHover={{
              scale: 1.15,
              background: 'rgba(10,102,194,0.30)',
              borderColor: 'rgba(10,102,194,0.7)',
              boxShadow: '0 0 24px rgba(10,102,194,0.45)',
              y: -3,
            }}
            whileTap={{ scale: 0.9, rotateX: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            {/* Official LinkedIn "in" SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </motion.a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center gap-3 text-[13px] text-[var(--text-3)]"
        >
          <span>📍 Nashik, India</span>
          <span className="w-1 h-1 rounded-full bg-[var(--text-3)]" />
          <span>B.E. Computer Engineering · 2022–2025</span>
          <span className="w-1 h-1 rounded-full bg-[var(--text-3)]" />
          <span>Cybersecurity · IoT · Cloud · Web</span>
        </motion.div>
      </motion.div>

      <HeroCards />
    </section>
  );
}
