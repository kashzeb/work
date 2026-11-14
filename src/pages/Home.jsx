import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DotField from '../components/DotField.jsx';
import Counter from '../components/Counter.jsx';
import Cover from '../components/Cover.jsx';
import { profile } from '../data/profile.js';
import { projects } from '../data/projects.js';
import { skillGroups } from '../data/skills.js';

const rise = (i) => ({
  initial: { y: '105%' },
  animate: { y: 0 },
  transition: { duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

function ProjectIndex() {
  const [hover, setHover] = useState(null);
  const box = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (box.current) box.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 110}px)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div className="plist" onMouseLeave={() => setHover(null)}>
        {projects.map((p, i) => (
          <Link key={p.slug} to={`/projects/${p.slug}`} className="prow" onMouseEnter={() => setHover(p)} data-cursor>
            <span className="mono dim">{String(i + 1).padStart(2, '0')}</span>
            <h3>{p.title} {p.placeholder && <span className="tag sample">Sample</span>}</h3>
            <span className="tags">{p.tags.slice(0, 2).map((t) => <span key={t} className="tag">{t}</span>)}</span>
            <span className="mono dim yr">{p.year}</span>
            <span className="arrow">→</span>
          </Link>
        ))}
      </div>
      <div ref={box} className="preview" style={{ opacity: hover ? 1 : 0, transition: 'opacity .2s' }}>
        {hover && <Cover pattern={hover.pattern} title={hover.title} domain={hover.cover} />}
      </div>
    </>
  );
}

export default function Home() {
  const skills = skillGroups.flatMap((g) => g.items.map((i) => i.n));
  const loop = [...skills, ...skills];

  return (
    <>
      <section className="hero">
        <DotField />
        <div className="wrap">
          <div className="hero-top mono dim">
            <span><span className="dot" />{profile.availability}</span>
            <span>{profile.location}</span>
          </div>
          <h1 aria-label={profile.name}>
            <span className="line"><motion.span {...rise(0)}>Kashif</motion.span></span>
            <span className="line"><motion.span {...rise(1)}>Khan<em>.</em></motion.span></span>
          </h1>
          <div className="hero-foot">
            <p><b>{profile.role}.</b> {profile.summary}</p>
            <div className="hero-cta">
              <Link to="/projects" className="btn solid" data-cursor>Selected work →</Link>
              <Link to="/resume" className="btn" data-cursor>Resume</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="stats">
        {profile.stats.map((s) => (
          <div className="stat" key={s.label}>
            <Counter to={s.value} suffix={s.suffix} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Selected work</h2>
            <Link to="/projects" className="mono accent" data-cursor>All projects →</Link>
          </div>
          <ProjectIndex />
        </div>
      </section>

      <div className="marquee" aria-label="Skills">
        <div className="marquee-track">
          {loop.map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="mono accent">About</p>
          </div>
          <div>
            <p className="lead">{profile.about[0]}</p>
            {profile.about.slice(1).map((t) => <p key={t}>{t}</p>)}
            <div style={{ marginTop: 32 }}>
              <Link to="/resume" className="btn" data-cursor>Full resume →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
