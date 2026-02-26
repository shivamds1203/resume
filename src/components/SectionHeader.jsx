import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOptions } from '../animations';

export default function SectionHeader({ label, title, kicker }) {
  return (
    <motion.div
      className="mb-12"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
    >
      <motion.div
        variants={fadeUp}
        className="section-label inline-flex items-center text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)] mb-3"
      >
        {label}
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="font-display font-extrabold tracking-[-0.02em] text-[var(--text)] mb-2"
        style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
      >
        {title}
      </motion.h2>
      {kicker && (
        <motion.p variants={fadeUp} className="text-[15px] text-[var(--text-2)] max-w-[36rem]">
          {kicker}
        </motion.p>
      )}
    </motion.div>
  );
}
