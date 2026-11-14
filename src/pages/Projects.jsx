import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Cover from '../components/Cover.jsx';
import { projects, allTypes } from '../data/projects.js';

// Card tilts toward the cursor.
function Card({ p, i }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg)`;
  };
  const reset = () => { ref.current.style.transform = ''; };

  return (
    <motion.div layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, delay: i * 0.04 }}>
      <Link ref={ref} to={`/projects/${p.slug}`} className="pcard reg" onMouseMove={onMove} onMouseLeave={reset} data-cursor>
        <div className="art"><Cover pattern={p.pattern} title={p.title} domain={p.cover} /></div>
        <div className="body">
          <div className="mono dim">{p.type} · {p.year} {p.placeholder && <span className="tag sample" style={{ marginLeft: 8 }}>Sample</span>}</div>
          <h3>{p.title}</h3>
          <p>{p.summary}</p>
          <div className="tags">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const [tag, setTag] = useState('All');
  const list = tag === 'All' ? projects : projects.filter((p) => p.type === tag);

  return (
    <div className="wrap">
      <div className="page-head">
        <p className="mono accent">30+ live sites and apps</p>
        <h1>Projects</h1>
        <p>Case studies from freelance work and agency campaigns. Open one to see the live sites.</p>
      </div>
      <div className="filters" role="toolbar" aria-label="Filter projects">
        {allTypes.map((t) => (
          <button key={t} className={`chip ${t === tag ? 'on' : ''}`} onClick={() => setTag(t)} data-cursor>{t}</button>
        ))}
      </div>
      <motion.div layout className="pgrid">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => <Card key={p.slug} p={p} i={i} />)}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="empty">Nothing here yet.</p>}
    </div>
  );
}
