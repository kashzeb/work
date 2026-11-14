import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { profile } from '../data/profile.js';
import { experience } from '../data/experience.js';
import { education, certifications } from '../data/education.js';
import { skillGroups } from '../data/skills.js';
import { projects } from '../data/projects.js';

const SECTIONS = [
  ['profile', 'Profile'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['education', 'Education'],
];

function useSpy() {
  const [active, setActive] = useState('profile');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    SECTIONS.forEach(([id]) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

function Job({ job, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <article className={`job ${open ? 'open' : ''}`}>
      <button className="job-head" onClick={() => setOpen(!open)} aria-expanded={open} data-cursor>
        <div>
          <h3>{job.role} {job.placeholder && <span className="tag sample">Sample</span>}</h3>
          <p className="co">{job.company}</p>
        </div>
        <span className="when mono">{job.start} — {job.end}</span>
      </button>
      <p style={{ marginTop: 12 }}>{job.summary}</p>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="more" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div>
              <ul>{job.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              <div className="stack">{job.stack.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="toggle" onClick={() => setOpen(!open)}>{open ? '− Less' : '+ Details'}</button>
    </article>
  );
}

function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <div className="timeline" ref={ref}>
      <div className="track"><motion.div className="fill" style={{ scaleY }} /></div>
      {experience.map((j, i) => <Job key={j.id} job={j} defaultOpen={i === 0} />)}
    </div>
  );
}

function Skills() {
  const [hot, setHot] = useState(null);
  const used = hot ? projects.filter((p) => p.tags.includes(hot)) : [];
  const hint = !hot ? 'Hover a skill to see where it was used' : used.length ? `Used in: ${used.map((p) => p.title).join(' · ')}` : 'Used across my career work, see Experience';
  return (
    <>
      <div className="skillgroups">
        {skillGroups.map((g) => (
          <div className="sg" key={g.name}>
            <h4 className="mono">{g.name}</h4>
            <div className="sg-items">
              {g.items.map((s) => (
                <span
                  key={s.n}
                  className={`skill ${hot === s.n ? 'hot' : ''} ${hot && hot !== s.n ? 'fade' : ''}`}
                  onMouseEnter={() => setHot(s.n)}
                  onMouseLeave={() => setHot(null)}
                  data-cursor
                >
                  {s.n}{s.learning && <span className="learn">learning</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="skill-hint" aria-live="polite">{hint}</p>
    </>
  );
}

export default function Resume() {
  const active = useSpy();
  return (
    <div className="wrap">
      <div className="page-head">
        <p className="mono accent">Curriculum vitae</p>
        <h1>Resume</h1>
      </div>
      <nav className="toc-mobile" aria-label="Resume sections">
        {SECTIONS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>
        ))}
        <a className="btn solid" href={profile.resumePdf} download>PDF ↓</a>
      </nav>
      <div className="resume">
        <aside className="toc">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} data-cursor>{label}</a>
          ))}
          <a className="btn solid" href={profile.resumePdf} download data-cursor>Download PDF ↓</a>
        </aside>

        <div>
          <section id="profile" className="rsec">
            <h2><small>01</small>Profile</h2>
            <p className="lead" style={{ fontSize: 'clamp(20px,2.4vw,30px)', lineHeight: 1.3, letterSpacing: '-0.02em', fontWeight: 600 }}>{profile.summary}</p>
            <p className="mono dim" style={{ marginTop: 24 }}>{profile.name} · {profile.role} · {profile.location} · {profile.email}</p>
          </section>

          <section id="experience" className="rsec">
            <h2><small>02</small>Experience</h2>
            <Timeline />
          </section>

          <section id="skills" className="rsec">
            <h2><small>03</small>Skills</h2>
            <Skills />
          </section>

          <section id="education" className="rsec">
            <h2><small>04</small>Education</h2>
            <div className="edu">
              {education.map((e) => (
                <div className="edu-row" key={e.id}>
                  <span className="mono accent">{e.year}</span>
                  <div><h3>{e.title}</h3><p>{e.place}</p><p>{e.note}</p></div>
                </div>
              ))}
              {certifications.map((c) => (
                <div className="edu-row" key={c.id}>
                  <span className="mono accent">{c.year}</span>
                  <div><h3>{c.href ? <a href={c.href} target="_blank" rel="noreferrer">{c.title} ↗</a> : c.title}</h3><p>{c.place}</p></div>
                </div>
              ))}
              {certifications.length === 0 && <p className="todo no-print">Add courses and certifications in src/data/education.js</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
