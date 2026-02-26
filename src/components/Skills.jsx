import { motion } from 'framer-motion';
import { scaleIn, staggerContainer, viewportOptions } from '../animations';
import SectionHeader from './SectionHeader';

const SKILLS = [
  {
    icon: '💻', iconBg: 'rgba(108,99,255,0.15)',
    title: 'Languages', subtitle: 'Writing clean, maintainable code.',
    pills: ['Python', 'Java', 'C++'],
    pillStyle: { background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.25)', color: '#a5b4fc' },
  },
  {
    icon: '🗄️', iconBg: 'rgba(6,182,212,0.15)',
    title: 'Databases & Tools', subtitle: 'Data persistence and collaboration.',
    pills: ['MySQL', 'Oracle', 'Git', 'Google Colab', 'Agile'],
    pillStyle: { background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)', color: '#67e8f9' },
  },
  {
    icon: '⚙️', iconBg: 'rgba(244,114,182,0.15)',
    title: 'Frameworks & Tech', subtitle: 'Building full-stack experiences.',
    pills: ['Flutter', 'Selenium', 'MS-Excel', 'Bootstrap'],
    pillStyle: { background: 'rgba(244,114,182,0.12)', border: '1px solid rgba(244,114,182,0.25)', color: '#f9a8d4' },
  },
  {
    icon: '☁️', iconBg: 'rgba(6,214,160,0.15)',
    title: 'Cloud & Security', subtitle: 'Deploying and protecting applications.',
    pills: ['AWS', 'Microsoft Azure', 'Cybersecurity', 'Auth Systems'],
    pillStyle: { background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.2)', color: '#6ee7b7' },
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <SectionHeader label="Technical Skills" title="What I work with" kicker="Technologies I use to build and secure systems." />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {SKILLS.map((s) => (
          <motion.div
            key={s.title}
            variants={scaleIn}
            className="skill-card relative overflow-hidden rounded-[18px] p-6 backdrop-blur-md cursor-default"
            style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', transformStyle: 'preserve-3d' }}
            whileHover={{
              y: -10,
              rotateX: -4,
              rotateY: 3,
              borderColor: 'rgba(108,99,255,0.4)',
              boxShadow: '0 24px 60px rgba(108,99,255,0.22), 0 0 0 1px rgba(108,99,255,0.1) inset',
              transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
            }}
          >
            <motion.div
              className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center text-xl mb-3.5"
              style={{ background: s.iconBg }}
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
            >
              {s.icon}
            </motion.div>
            <div className="font-display text-base font-bold text-[var(--text)] mb-1">{s.title}</div>
            <div className="text-xs text-[var(--text-2)] mb-3">{s.subtitle}</div>
            <div className="flex flex-wrap gap-1.5">
              {s.pills.map((p, i) => (
                <motion.span
                  key={p}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium"
                  style={s.pillStyle}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOptions}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.12, y: -2 }}
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
