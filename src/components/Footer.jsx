import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="mt-12 py-10 border-t text-center text-sm text-[var(--text-3)]"
      style={{ borderColor: 'var(--glass-border)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="font-display font-bold text-base mb-2"
        style={{ background: 'var(--grad-1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        Shivam D Suryawanshi
      </motion.div>
      <div className="mb-1">
        Built with <motion.span
          className="text-[var(--accent-3)]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          style={{ display: 'inline-block' }}
        >♥</motion.span> using React · Three.js · Tailwind CSS · Framer Motion
      </div>
      <div>© {new Date().getFullYear()} All rights reserved.</div>
    </motion.footer>
  );
}
