import { motion } from 'framer-motion';
import { scaleIn, staggerContainer, viewportOptions } from '../animations';
import SectionHeader from './SectionHeader';

const EDU = [
  {
    degree: 'Bachelor of Engineering in Computer Engineering',
    school: 'Shatabdi Institute of Engineering and Research',
    meta: 'Dec 2022 – Jun 2025 · GPA: 6.69 / 10',
  },
  {
    degree: 'Diploma in Computer Engineering',
    school: 'Guru Gobind Singh Polytechnic',
    meta: 'Aug 2019 – Jul 2022 · 79.31%',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-20">
      <SectionHeader label="Education" title="Academic background" kicker="Formal education in Computer Engineering." />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {EDU.map((e) => (
          <motion.div
            key={e.degree}
            variants={scaleIn}
            className="rounded-[18px] p-6 backdrop-blur-md"
            style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', transformStyle: 'preserve-3d' }}
            whileHover={{
              y: -8,
              rotateX: -4,
              borderColor: 'rgba(108,99,255,0.35)',
              boxShadow: '0 20px 50px rgba(108,99,255,0.18)',
              transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
            }}
          >
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-base mb-4"
              style={{ background: 'rgba(108,99,255,0.15)' }}
              whileHover={{ rotate: [0, -15, 15, 0], transition: { duration: 0.5 } }}
            >
              🎓
            </motion.div>
            <div className="text-[15px] font-bold text-[var(--text)] mb-1">{e.degree}</div>
            <div className="text-[13px] font-semibold mb-1" style={{ color: 'var(--accent)' }}>{e.school}</div>
            <div className="text-[12px] text-[var(--text-3)]">{e.meta}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="px-5 py-3 rounded-xl text-[13px] text-[var(--text-2)]"
        style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOptions}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ x: 4, borderColor: 'rgba(108,99,255,0.3)', transition: { duration: 0.2 } }}
      >
        SSC · St Francis High School · Aug 2018 – Jun 2019 · 75%
      </motion.div>
    </section>
  );
}
