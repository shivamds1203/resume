import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOptions } from '../animations';
import SectionHeader from './SectionHeader';

const CONTACTS = [
  { icon: '✉️', label: 'Email', value: 'shivamsuryanshi7682@gmail.com', href: 'mailto:shivamsuryanshi7682@gmail.com' },
  { icon: '📞', label: 'Phone', value: '+91 90495 47814', href: 'tel:+919049547814' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <SectionHeader label="Contact" title="Let's work together" kicker="Reach out for roles, collaborations, or just to say hi." />

      <div className="max-w-2xl">
        <motion.p
          className="text-base text-[var(--text-2)] leading-[1.8] mb-8"
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={viewportOptions}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          I'm actively looking for software engineering and cybersecurity opportunities
          where I can apply my skills in IoT, cloud, and full-stack development.
          If you think I could be a great fit for your team or project,
          I'd love to connect and hear about it.
        </motion.p>

        <motion.div
          className="flex flex-col gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {CONTACTS.map((c) => (
            <motion.div key={c.label} variants={fadeUp}>
              <a
                href={c.href}
                className="contact-link flex items-center gap-4 px-5 py-4 rounded-[18px] backdrop-blur-md"
                style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', display: 'flex' }}
              >
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.2)' }}
                  whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                >
                  {c.icon}
                </motion.div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-3)] mb-0.5">{c.label}</div>
                  <div className="text-[14px] font-semibold text-[var(--text)]">{c.value}</div>
                </div>
                <span className="contact-arrow">↗</span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
