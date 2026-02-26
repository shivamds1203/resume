import { motion } from 'framer-motion';
import { fadeUp, flipIn, staggerContainer, viewportOptions } from '../animations';
import SectionHeader from './SectionHeader';

const PROJECTS = [
  {
    num: '01',
    title: 'Vehicle Pollution Monitoring System',
    year: '2024 – 2025',
    tags: ['Flutter', 'ESP32', 'IoT', 'Cloud', 'Razorpay API'],
    points: [
      'Engineered an IoT-based real-time emission monitoring system detecting CO, NOx, and PM2.5 levels in vehicles to combat urban air pollution.',
      'Designed embedded system architecture using ESP32 microcontrollers for sensor integration and cloud data transmission.',
      'Built a cross-platform Flutter mobile app with real-time alerts, Razorpay payments, and an admin dashboard for regulators.',
    ],
  },
  {
    num: '02',
    title: 'Student Digilocker',
    year: '2021 – 2022',
    tags: ['PHP', 'MySQL', 'HTML/CSS', 'Bootstrap'],
    points: [
      'Architected and developed a secure web-based document management system for storing and sharing academic credentials.',
      'Implemented responsive Bootstrap UI, role-based access control, and robust authentication to ensure data privacy.',
      'Designed a relational MySQL schema and documentation (DFD & UML) for maintainability and future enhancements.',
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <SectionHeader label="Projects" title="Selected work" kicker="Projects that highlight my problem-solving approach and technical range." />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
      >
        {PROJECTS.map((p) => (
          <motion.div
            key={p.title}
            variants={flipIn}
            className="rounded-[18px] p-6 backdrop-blur-md relative overflow-hidden cursor-default"
            style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', transformStyle: 'preserve-3d', perspective: 1000 }}
            whileHover={{
              y: -10,
              rotateX: -5,
              rotateY: 3,
              borderColor: 'rgba(108,99,255,0.4)',
              boxShadow: '0 28px 70px rgba(108,99,255,0.22)',
              transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
            }}
          >
            {/* Number */}
            <motion.div
              className="text-5xl font-extrabold tracking-[-0.04em] mb-2 select-none"
              style={{ background: 'var(--grad-1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', opacity: 0.18 }}
              whileHover={{ opacity: 0.35, scale: 1.05, transition: { duration: 0.2 } }}
            >
              {p.num}
            </motion.div>

            <div className="text-[16px] font-bold text-[var(--text)] mb-1">{p.title}</div>
            <div className="text-[12px] text-[var(--text-3)] mb-3">{p.year}</div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tags.map((t, i) => (
                <motion.span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-medium text-[#a5b4fc]"
                  style={{ background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.2)' }}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOptions}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.12, y: -2, background: 'rgba(108,99,255,0.22)' }}
                >
                  {t}
                </motion.span>
              ))}
            </div>

            <ul className="flex flex-col gap-2 mb-5">
              {p.points.map((pt, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2.5 text-[13px] text-[var(--text-2)] leading-relaxed"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOptions}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                  {pt}
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="text-[12px] font-medium cursor-pointer"
              style={{ color: 'var(--accent)' }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
            >
              Case study coming soon →
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
