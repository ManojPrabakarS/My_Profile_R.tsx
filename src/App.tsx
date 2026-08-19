import { FormEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Send,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import { portfolio } from '@/data/portfolio';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem('manoj-theme');
    if (saved === 'light') setDarkMode(false);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', !darkMode);
    window.localStorage.setItem('manoj-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    if (!name || !email || !message || !email.includes('@')) {
      setFormError('Please complete all fields with a valid email address.');
      setSent(false);
      return;
    }
    setFormError('');
    setSent(true);
    window.location.href = `mailto:${portfolio.email}?subject=Hello Manoj Prabakar, I am ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    event.currentTarget.reset();
  };

  return (
    <div className="app-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#top" className="brand" aria-label="Manoj Prabakar home">
          MP<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle color theme">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={darkMode ? 'moon' : 'sun'} initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }}>
                {darkMode ? <Moon size={16} /> : <Sun size={16} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a className="header-contact desktop-only" href="#contact">Let&apos;s talk <ArrowUpRight size={15} /></a>
          <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="hero page-section">
          <div className="hero-grid" />
          <div className="orb orb-one" /><div className="orb orb-two" />
          <motion.div className="hero-content" variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="eyebrow"><span className="status-dot" /> {portfolio.availability}</motion.div>
            <motion.h1 variants={fadeUp}>Digital craft,<br /><em>built with purpose.</em></motion.h1>
            <motion.p variants={fadeUp} className="hero-intro">I&apos;m <strong>{portfolio.name}</strong>, a {portfolio.role} who turns ideas into clear, capable, and quietly memorable web experiences.</motion.p>
            <motion.div variants={fadeUp} className="hero-actions">
              <a href="#projects" className="button button-primary">View my work <ArrowDownRight size={17} /></a>
              <button className="button button-ghost" onClick={() => window.print()}>Download resume <ArrowDownRight size={17} /></button>
            </motion.div>
          </motion.div>
          <motion.div className="hero-aside" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
            <div className="code-card"><span>01</span><Code2 size={20} /><p>Available for<br /><strong>good work.</strong></p></div>
            <div className="scroll-note"><span /> Scroll to explore</div>
          </motion.div>
          <div className="hero-footer"><span>Based in Chennai, India</span><span>© 2026 — Portfolio</span></div>
        </section>

        <section id="about" className="page-section section-pad">
          <div className="section-head"><SectionLabel number="01" >A little about me</SectionLabel><span className="section-line" /></div>
          <div className="about-layout">
            <motion.div className="portrait-card" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="portrait-pattern" /><div className="portrait-initials">MP</div><div className="portrait-caption">Always learning<br />Always making</div>
            </motion.div>
            <motion.div className="about-copy" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.p variants={fadeUp} className="lead">I believe the best interfaces don&apos;t ask for attention — they <em>earn trust.</em></motion.p>
              <motion.p variants={fadeUp}>{portfolio.about}</motion.p>
              <motion.div variants={fadeUp} className="stats-grid">{portfolio.stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</motion.div>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="page-section section-pad section-tint">
          <div className="section-head"><SectionLabel number="02">The toolkit</SectionLabel><span className="section-line" /></div>
          <div className="skills-intro"><h2>Things I work<br /><em>well with.</em></h2><p>A practical toolkit built through shipping, learning, and asking better questions.</p></div>
          <div className="skills-grid">{portfolio.skills.map((group, index) => <motion.div className="skill-group" key={group.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}><span className="skill-index">0{index + 1}</span><h3>{group.category}</h3><div className="skill-pills">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div></motion.div>)}</div>
        </section>

        <section id="experience" className="page-section section-pad">
          <div className="section-head"><SectionLabel number="03">Where I&apos;ve been</SectionLabel><span className="section-line" /></div>
          <motion.div className="experience-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="experience-date">{portfolio.experience[0].date}</div><div className="timeline-dot" /><div className="experience-content"><p className="kicker">Experience</p><h2>{portfolio.experience[0].role}</h2><h3>{portfolio.experience[0].company}</h3><ul>{portfolio.experience[0].points.map((point) => <li key={point}>{point}</li>)}</ul></div>
          </motion.div>
          <div className="education-row"><div><p className="kicker">Also learning</p><h2>Education</h2></div><div className="education-list">{portfolio.education.map((item) => <div className="education-item" key={item.degree}><span>{item.year}</span><div><strong>{item.degree}</strong><p>{item.school}</p></div></div>)}</div></div>
        </section>

        <section id="projects" className="page-section section-pad section-tint">
          <div className="section-head"><SectionLabel number="04">Selected work</SectionLabel><span className="section-line" /></div>
          <div className="projects-heading"><h2>Built with purpose,<br /><em>not just pixels.</em></h2><a href="https://github.com" className="text-link">View GitHub <ArrowUpRight size={16} /></a></div>
          <div className="projects-grid">{portfolio.projects.map((project, index) => <motion.article className={`project-card ${project.accent}`} key={project.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.12 }} whileHover={{ y: -8 }}><div className="project-visual"><span className="project-number">{project.number}</span><Sparkles size={19} /><div className="visual-window"><div /><div /><div /></div></div><div className="project-body"><p className="kicker">{project.type}</p><h3>{project.title}</h3><p>{project.description}</p><div className="project-bottom"><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={project.github} aria-label={`View ${project.title} on GitHub`}><Github size={18} /></a></div></div></motion.article>)}</div>
        </section>

        <section id="contact" className="page-section section-pad contact-section">
          <div className="section-head"><SectionLabel number="05">Start a conversation</SectionLabel><span className="section-line" /></div>
          <div className="contact-layout"><div><h2>Have a good idea?<br /><em>Let&apos;s make it real.</em></h2><p>Whether you&apos;re building something new or making something better, I&apos;d love to hear about it.</p><div className="contact-links"><a href={`mailto:${portfolio.email}`}><Mail size={16} /> {portfolio.email}</a><a href={portfolio.linkedin}><Linkedin size={16} /> LinkedIn</a></div></div><form onSubmit={handleContact} className="contact-form"><label>Name<input name="name" type="text" placeholder="Your name" /></label><label>Email<input name="email" type="email" placeholder="you@example.com" /></label><label>Message<textarea name="message" rows={4} placeholder="Tell me a little about your project..." /></label>{formError && <p className="form-message error">{formError}</p>}{sent && <p className="form-message success"><Check size={15} /> Your email draft is ready to send.</p>}<button className="button button-primary submit-button" type="submit">Send message <Send size={16} /></button></form></div>
        </section>
      </main>

      <footer className="site-footer"><a href="#top" className="brand">MP<span>.</span></a><p>Designed & built with care by Manoj Prabakar.</p><div className="footer-right"><a href={portfolio.linkedin}><Linkedin size={17} /></a><a href="https://github.com"><Github size={17} /></a><a href="#top" aria-label="Back to top"><ArrowUpRight size={17} /></a></div></footer>
    </div>
  );
}

export default App;
