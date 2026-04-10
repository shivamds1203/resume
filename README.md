# Shivam D Suryawanshi — Portfolio

Personal portfolio website built with **React 18**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

🌐 **Live:** [shivam-suryawanshi.netlify.app](https://resume-shivam.vercel.app/) <!-- update when deployed -->

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| 3D Background | Three.js |

## ✨ Features

- **3D scroll animations** — sections animate in with depth, rotation, and spring physics
- **Interactive cards** — hover tilt with `rotateX / rotateY` perspective effect
- **Three.js particle field** — mouse-reactive 3D particle background
- **Custom cursor** — smooth lerp-interpolated dot + ring cursor
- **Responsive** — mobile-first, hamburger nav with animated menu
- **Active nav indicator** — shared layout animation highlights current section

## 📁 Project Structure

```
src/
├── animations.js          # Shared Framer Motion variants
├── App.jsx                # Root component
├── main.jsx               # Entry point
├── index.css              # Global styles + Tailwind directives
├── hooks/
│   ├── useScrollReveal.js
│   └── useCardTilt.js
└── components/
    ├── ParticleBackground.jsx
    ├── CustomCursor.jsx
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── About.jsx
    ├── Skills.jsx
    ├── Experience.jsx
    ├── Projects.jsx
    ├── Education.jsx
    ├── Contact.jsx
    └── Footer.jsx
```

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev        # → http://localhost:5173

# Production build
npm run build
```

## 👤 About Me

**Shivam D Suryawanshi** — Computer Engineering graduate from Nashik, India.  
Passionate about cybersecurity, IoT, cloud, and full-stack development.

- 📧 shivamsuryanshi7682@gmail.com
- 📞 +91 90495 47814
- 🔗 [LinkedIn](https://www.linkedin.com/in/shivam-suryawanshi-a984922a3)

---

© 2025 Shivam D Suryawanshi. All rights reserved.
