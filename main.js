// ============================================================
// PORTFOLIO — Shivam D Suryawanshi
// Enhanced with Three.js 3D particles + GSAP scroll animations
// ============================================================

const { useRef, useState, useEffect, useCallback } = React;
const { createRoot } = ReactDOM;

// ─── Motion shim ────────────────────────────────────────────
const motion = new Proxy({}, {
  get: (_, tag) =>
    React.forwardRef(({ children, ...rest }, ref) =>
      React.createElement(tag, { ref, ...rest }, children)
    ),
});
const AnimatePresence = ({ children }) => children;

// ─── Utility ────────────────────────────────────────────────
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ============================================================
// THREE.JS PARTICLE FIELD  (injected into #bg-canvas)
// ============================================================
function initParticles() {
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 80;

  // Build particles
  const COUNT = 1800;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);

  const palette = [
    new THREE.Color('#6c63ff'),
    new THREE.Color('#06b6d4'),
    new THREE.Color('#f472b6'),
    new THREE.Color('#a5b4fc'),
  ];

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    sizes[i] = Math.random() * 2.5 + 0.5;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    size: 1.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // Mouse influence
  let mx = 0, my = 0;
  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 0.4;
    my = (e.clientY / window.innerHeight - 0.5) * 0.4;
  });

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animate
  let frame = 0;
  (function animate() {
    requestAnimationFrame(animate);
    frame++;
    points.rotation.y = frame * 0.0006 + mx;
    points.rotation.x = frame * 0.0003 + my;
    renderer.render(scene, camera);
  })();
}

// ============================================================
// CUSTOM CURSOR
// ============================================================
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let rx = 0, ry = 0;
  const lerp = (a, b, n) => a + (b - a) * n;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  (function loop() {
    requestAnimationFrame(loop);
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
  })();
}

// ============================================================
// SCROLL-REVEAL (IntersectionObserver)
// ============================================================
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  els.forEach((el) => observer.observe(el));
}

// ============================================================
// NAV SCROLL EFFECT
// ============================================================
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const handle = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', handle, { passive: true });
  handle();
}

// ============================================================
// MOUSE-TILT ON PROJECT CARDS
// ============================================================
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card, .skill-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -8;
      const rotY = ((x - cx) / cx) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
      // spotlight
      card.style.setProperty('--mx', `${(x / rect.width * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(y / rect.height * 100).toFixed(1)}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ============================================================
// GLOBAL INIT after DOM ready
// ============================================================
function initAll() {
  initParticles();
  initCursor();
  initNavScroll();
  setTimeout(() => {
    initScrollReveal();
    initCardTilt();
  }, 300);
}

// ============================================================
// COMPONENTS
// ============================================================

// ─── Navbar ──────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    ['about', 'About'],
    ['skills', 'Skills'],
    ['experience', 'Experience'],
    ['projects', 'Projects'],
    ['education', 'Education'],
    ['contact', 'Contact'],
  ];

  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-name">Shivam D Suryawanshi</div>
          <div className="brand-tag">Software Engineer · Cybersecurity &amp; Cloud</div>
        </div>

        <nav className="nav-links">
          {links.map(([id, label]) => (
            <button key={id} className="nav-link" onClick={() => scrollToId(id)}>
              {label}
            </button>
          ))}
          <button className="nav-cta" onClick={() => scrollToId('contact')}>
            Hire Me
          </button>
        </nav>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : '' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : '' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          padding: '12px 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(3,4,10,0.95)',
          backdropFilter: 'blur(24px)',
        }}>
          {links.map(([id, label]) => (
            <button
              key={id}
              className="nav-link"
              style={{ textAlign: 'left', padding: '10px 12px' }}
              onClick={() => { scrollToId(id); setMenuOpen(false); }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

// ─── Hero Section ─────────────────────────────────────────────
const HeroCards = () => (
  <div className="hero-right">
    <div className="cards-scene">
      {/* Main card */}
      <div className="float-card float-card-main">
        <div className="card-avatar">SD</div>
        <div className="card-role">Support Engineer</div>
        <div className="card-org">Cybersecurity · Netleap IT</div>
        <div className="card-badges">
          <span className="badge badge-blue">95% FCR</span>
          <span className="badge badge-cyan">50+ customers</span>
          <span className="badge badge-green">Network Infra</span>
        </div>
      </div>

      {/* Project card */}
      <div className="float-card float-card-secondary">
        <div className="card-project-name">🚗 IoT Project</div>
        <div className="card-project-desc">
          Real-time vehicle emission monitoring with ESP32, Flutter &amp; cloud backend.
        </div>
        <div className="card-badges">
          <span className="badge badge-pink">Flutter</span>
          <span className="badge badge-blue">ESP32</span>
          <span className="badge badge-cyan">Cloud</span>
        </div>
      </div>

      {/* Skills card */}
      <div className="float-card float-card-chips">
        <div className="card-chips-label">⚡ Toolbox</div>
        <div className="chip-cloud">
          <span className="chip-skill">Python</span>
          <span className="chip-skill">Java</span>
          <span className="chip-skill">C++</span>
          <span className="chip-skill">Flutter</span>
          <span className="chip-skill">AWS</span>
          <span className="chip-skill">Azure</span>
        </div>
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section className="hero">
    <div className="hero-left">
      <div className="status-badge reveal">
        <span className="status-pulse" />
        Available for work
      </div>

      <h1 className="hero-title reveal reveal-delay-1">
        I build{' '}
        <span className="gradient-text">friendly,<br />reliable software</span>.
      </h1>

      <p className="hero-subtitle reveal reveal-delay-2">
        Computer Engineering graduate with expertise in cybersecurity support,
        IoT systems, and full-stack web applications. I focus on building
        simple, human-friendly experiences backed by solid engineering.
      </p>

      <div className="hero-actions reveal reveal-delay-3">
        <button className="btn-primary" onClick={() => scrollToId('projects')}>
          View Projects ↗
        </button>
        <button className="btn-ghost" onClick={() => scrollToId('contact')}>
          Contact Me
        </button>
      </div>

      <div className="hero-meta reveal reveal-delay-4">
        <span>📍 Nashik, India</span>
        <span className="hero-meta-dot" />
        <span>B.E. Computer Engineering · 2022–2025</span>
        <span className="hero-meta-dot" />
        <span>Cybersecurity · IoT · Cloud · Web</span>
      </div>
    </div>

    <HeroCards />
  </section>
);

// ─── Section wrapper ──────────────────────────────────────────
const SectionHeader = ({ label, title, kicker }) => (
  <div>
    <div className="section-label reveal">{label}</div>
    <h2 className="section-title reveal reveal-delay-1">{title}</h2>
    {kicker && <p className="section-kicker reveal reveal-delay-2">{kicker}</p>}
  </div>
);

// ─── About Section ────────────────────────────────────────────
const About = () => (
  <section id="about" className="section">
    <SectionHeader
      label="About Me"
      title="Who I am"
      kicker="What I enjoy working on and what drives me."
    />
    <div className="about-layout">
      <p className="about-text reveal">
        I'm a <strong>Computer Engineering graduate</strong> with a strong interest in
        cybersecurity, IoT, and cloud technologies. I've worked as a
        <strong> Support Engineer Intern</strong>, managing critical infrastructure and
        resolving complex technical issues, and I've built projects like a
        real-time <strong>vehicle pollution monitoring system</strong> and a student
        digilocker web app. I enjoy designing systems that are both
        <strong> performant and secure</strong>, and I'm always looking for opportunities to
        learn and apply new technologies.
      </p>
      <div className="about-grid">
        {[
          { label: 'Location', value: 'Nashik, Maharashtra, India' },
          { label: 'Degree', value: 'B.E. Computer Engineering (2022–2025)' },
          { label: 'Opportunities', value: 'Software Engineer · Cybersecurity · Cloud & DevOps roles' },
        ].map((item, i) => (
          <div key={item.label} className={`about-item reveal reveal-delay-${i + 1}`}>
            <div className="about-label">{item.label}</div>
            <div className="about-value">{item.value}</div>
          </div>
        ))}
        <div className="about-item reveal reveal-delay-4">
          <div className="about-label">Interests</div>
          <div className="interest-chips">
            {['Cybersecurity', 'IoT & Embedded', 'Cloud & DevOps'].map((c) => (
              <span key={c} className="interest-chip">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Skills Section ───────────────────────────────────────────
const SKILLS = [
  {
    icon: '💻',
    iconBg: 'rgba(108,99,255,0.15)',
    title: 'Languages',
    subtitle: 'Writing clean, maintainable code.',
    pills: ['Python', 'Java', 'C++'],
    pillClass: 'pill-purple',
  },
  {
    icon: '🗄️',
    iconBg: 'rgba(6,182,212,0.15)',
    title: 'Databases & Tools',
    subtitle: 'Data persistence and collaboration.',
    pills: ['MySQL', 'Oracle', 'Git', 'Google Colab', 'Agile'],
    pillClass: 'pill-cyan',
  },
  {
    icon: '⚙️',
    iconBg: 'rgba(244,114,182,0.15)',
    title: 'Frameworks & Tech',
    subtitle: 'Building full-stack experiences.',
    pills: ['Flutter', 'Selenium', 'MS-Excel', 'Bootstrap'],
    pillClass: 'pill-pink',
  },
  {
    icon: '☁️',
    iconBg: 'rgba(6,214,160,0.15)',
    title: 'Cloud & Security',
    subtitle: 'Deploying and protecting applications.',
    pills: ['AWS', 'Microsoft Azure', 'Cybersecurity', 'Auth Systems'],
    pillClass: 'pill-green',
  },
];

const Skills = () => (
  <section id="skills" className="section">
    <SectionHeader
      label="Technical Skills"
      title="What I work with"
      kicker="Technologies I use to build and secure systems."
    />
    <div className="skills-grid">
      {SKILLS.map((s, i) => (
        <div
          key={s.title}
          className={`skill-card reveal reveal-delay-${(i % 2) + 1}`}
        >
          <div className="skill-card-icon" style={{ background: s.iconBg }}>
            {s.icon}
          </div>
          <div className="skill-card-title">{s.title}</div>
          <div className="skill-card-subtitle">{s.subtitle}</div>
          <div className="skill-pills">
            {s.pills.map((p) => (
              <span key={p} className={`skill-pill ${s.pillClass}`}>{p}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

// ─── Experience Section ───────────────────────────────────────
const Experience = () => (
  <section id="experience" className="section">
    <SectionHeader
      label="Experience"
      title="Where I've worked"
      kicker="Hands-on roles where I've applied my skills in the real world."
    />
    <div className="timeline-wrapper">
      <div className="timeline-item reveal">
        <div className="timeline-card">
          <div className="timeline-role">Support Engineer Intern – Cybersecurity</div>
          <div className="timeline-company">Netleap IT Training and Solution</div>
          <div className="timeline-meta">Dec 2023 – Jan 2024 · Nashik, India</div>
          <ul className="timeline-list">
            <li>
              Delivered technical support to 50+ customers via phone and email,
              resolving hardware and software issues with <strong>95% first‑call resolution</strong>.
            </li>
            <li>
              Configured and maintained critical network infrastructure including
              DNS, DHCP, FTP, and Active Directory, improving security compliance by <strong>30%</strong>.
            </li>
            <li>
              Automated deployment tasks and applied systematic troubleshooting
              to reduce deployment time by <strong>40%</strong>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// ─── Projects Section ─────────────────────────────────────────
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

const Projects = () => (
  <section id="projects" className="section">
    <SectionHeader
      label="Projects"
      title="Selected work"
      kicker="Projects that highlight my problem-solving approach and technical range."
    />
    <div className="projects-grid">
      {PROJECTS.map((p, i) => (
        <div key={p.title} className={`project-card reveal reveal-delay-${i + 1}`}>
          <div className="project-number">{p.num}</div>
          <div className="project-title">{p.title}</div>
          <div className="project-year">{p.year}</div>
          <div className="project-tags">
            {p.tags.map((t) => (
              <span key={t} className="project-tag">{t}</span>
            ))}
          </div>
          <ul className="project-list">
            {p.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
          <div className="project-cta">
            Case study coming soon →
          </div>
        </div>
      ))}
    </div>
  </section>
);

// ─── Education Section ────────────────────────────────────────
const Education = () => (
  <section id="education" className="section">
    <SectionHeader
      label="Education"
      title="Academic background"
      kicker="Formal education in Computer Engineering."
    />
    <div className="edu-grid">
      {[
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
      ].map((e, i) => (
        <div key={e.degree} className={`edu-card reveal reveal-delay-${i + 1}`}>
          <div className="edu-degree">{e.degree}</div>
          <div className="edu-school">{e.school}</div>
          <div className="edu-meta">{e.meta}</div>
        </div>
      ))}
    </div>
    <div className="edu-extra reveal reveal-delay-3">
      SSC · St Francis High School · Aug 2018 – Jun 2019 · 75%
    </div>
  </section>
);

// ─── Contact Section ──────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="section">
    <SectionHeader
      label="Contact"
      title="Let's work together"
      kicker="Reach out for roles, collaborations, or just to say hi."
    />
    <div className="contact-wrapper">
      <p className="contact-text reveal">
        I'm actively looking for software engineering and cybersecurity opportunities
        where I can apply my skills in IoT, cloud, and full-stack development.
        If you think I could be a great fit for your team or project,
        I'd love to connect and hear about it.
      </p>

      <div className="contact-links">
        {[
          { icon: '✉️', label: 'Email', value: 'shivamsuryanshi7682@gmail.com', href: 'mailto:shivamsuryanshi7682@gmail.com' },
          { icon: '📞', label: 'Phone', value: '+91 90495 47814', href: 'tel:+919049547814' },
        ].map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            className={`contact-link reveal reveal-delay-${i + 1}`}
          >
            <div className="contact-link-icon">{c.icon}</div>
            <div className="contact-link-info">
              <div className="contact-link-label">{c.label}</div>
              <div className="contact-link-value">{c.value}</div>
            </div>
            <span className="contact-arrow">↗</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────
const Footer = () => (
  <footer className="footer">
    <div className="footer-brand">Shivam D Suryawanshi</div>
    <div className="footer-built">
      Built with <span>♥</span> using React · Three.js · CSS
    </div>
    <div>© {new Date().getFullYear()} All rights reserved.</div>
  </footer>
);

// ─── Atmospheric background orbs ──────────────────────────────
const Orbs = () => (
  <>
    <div className="orb orb-1" />
    <div className="orb orb-2" />
    <div className="orb orb-3" />
  </>
);

// ============================================================
// APP ROOT
// ============================================================
const App = () => {
  useEffect(() => {
    // Small delay so DOM is fully painted before we attach JS behaviour
    const t = setTimeout(initAll, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Orbs />
      <Navbar />
      <main className="page">
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

// Mount
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AnimatePresence>
      <App />
    </AnimatePresence>
  </React.StrictMode>
);
