import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOptions } from '../animations';
import SectionHeader from './SectionHeader';

const INFO = [
  { label: 'Location', value: 'Nashik, Maharashtra, India' },
  { label: 'Degree', value: 'B.E. Computer Engineering (2022–2025)' },
  { label: 'Opportunities', value: 'Software Engineer · Cybersecurity · Cloud & DevOps roles' },
];

export default function About() {
  return (
    <section id="about" className="py-20">
      <SectionHeader label="About Me" title="Who I am" kicker="What I enjoy working on and what drives me." />

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 items-start">
        <motion.p
          className="text-base text-[var(--text-2)] leading-[1.8]"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          I'm a <strong className="text-[var(--text)] font-semibold">Computer Engineering graduate</strong> with
          a strong interest in cybersecurity, IoT, and cloud technologies. I've worked as a{' '}
          <strong className="text-[var(--text)] font-semibold">Support Engineer Intern</strong>, managing critical
          infrastructure and resolving complex technical issues, and I've built projects like a real-time{' '}
          <strong className="text-[var(--text)] font-semibold">vehicle pollution monitoring system</strong> and
          a student digilocker web app. I enjoy designing systems that are both{' '}
          <strong className="text-[var(--text)] font-semibold">performant and secure</strong>, and I'm always
          looking for opportunities to learn and apply new technologies.
        </motion.p>

        <motion.div
          className="flex flex-col gap-2.5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {INFO.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeRight}
              className="px-4 py-3.5 rounded-xl backdrop-blur-md"
              style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)' }}
              whileHover={{
                x: 6,
                borderColor: 'rgba(108,99,255,0.35)',
                background: 'rgba(108,99,255,0.06)',
                transition: { duration: 0.2 },
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-3)] mb-1">{item.label}</div>
              <div className="text-[13px] text-[var(--text)] font-medium">{item.value}</div>
            </motion.div>
          ))}

          <motion.div
            variants={fadeRight}
            className="px-4 py-3.5 rounded-xl backdrop-blur-md"
            style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)' }}
            whileHover={{ x: 6, borderColor: 'rgba(108,99,255,0.35)', background: 'rgba(108,99,255,0.06)', transition: { duration: 0.2 } }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-3)] mb-2">Interests</div>
            <div className="flex flex-wrap gap-1.5">
              {['Cybersecurity', 'IoT & Embedded', 'Cloud & DevOps'].map((c, i) => (
                <motion.span
                  key={c}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-[#a5b4fc]"
                  style={{ background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.2)' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOptions}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
