import { motion } from 'framer-motion';
import { fadeLeft, staggerContainer, viewportOptions } from '../animations';
import SectionHeader from './SectionHeader';

const bullets = [
  'Delivered technical support to 50+ customers via phone and email, resolving hardware and software issues with <strong>95% first‑call resolution</strong>.',
  'Configured and maintained critical network infrastructure including DNS, DHCP, FTP, and Active Directory, improving security compliance by <strong>30%</strong>.',
  'Automated deployment tasks and applied systematic troubleshooting to reduce deployment time by <strong>40%</strong>.',
];

export default function Experience() {
  return (
    <section id="experience" className="py-20">
      <SectionHeader label="Experience" title="Where I've worked" kicker="Hands-on roles where I've applied my skills in the real world." />

      <div className="timeline-wrapper">
        <motion.div
          className="timeline-item"
          initial={{ opacity: 0, x: -40, rotateY: -12 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={viewportOptions}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="rounded-[18px] p-6 backdrop-blur-md"
            style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', transformStyle: 'preserve-3d' }}
            whileHover={{
              y: -6,
              rotateX: -2,
              borderColor: 'rgba(108,99,255,0.35)',
              boxShadow: '0 20px 50px rgba(108,99,255,0.18)',
              transition: { duration: 0.3 },
            }}
          >
            <div className="text-[15px] font-bold text-[var(--text)] mb-1">Support Engineer Intern – Cybersecurity</div>
            <div className="text-[13px] font-semibold mb-1"
              style={{ background: 'var(--grad-1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              Netleap IT Training and Solution
            </div>
            <div className="text-[12px] text-[var(--text-3)] mb-4">Dec 2023 – Jan 2024 · Nashik, India</div>

            <motion.ul
              className="flex flex-col gap-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
            >
              {bullets.map((pt, i) => (
                <motion.li
                  key={i}
                  variants={fadeLeft}
                  className="flex items-start gap-2.5 text-[13px] text-[var(--text-2)] leading-relaxed"
                >
                  <motion.span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'var(--accent)' }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={viewportOptions}
                    transition={{ delay: i * 0.12, type: 'spring', stiffness: 400 }}
                  />
                  <span dangerouslySetInnerHTML={{ __html: pt }} />
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
