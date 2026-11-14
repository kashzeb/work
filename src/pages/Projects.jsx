import { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Cover from '../components/Cover.jsx';
import { sites, siteCategories, projects } from '../data/projects.js';

const design = projects.find((p) => p.slug === 'graphic-design');
const caseFor = (cat) => projects.find((p) => p.type === cat);

// One card per live site: opens the site in a new tab.
const SiteCard = forwardRef(function SiteCard({ s, i }, ref) {
  return (
    <motion.div ref={ref} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, delay: Math.min(i, 12) * 0.03 }}>
      <a href={s.url} target="_blank" rel="noreferrer" className="pcard reg" data-cursor>
        <div className="art"><Cover pattern={s.pattern} title={s.name} domain={s.domain} /></div>
        <div className="body">
          <div className="mono dim">{s.category}</div>
          <h3>{s.name}</h3>
          <p className="mono">{s.domain} ↗</p>
        </div>
      </a>
    </motion.div>
  );
});

export default function Projects() {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? sites : sites.filter((s) => s.category === cat);
  const cs = caseFor(cat === 'Healthcare' ? 'Business profile' : cat);

  return (
    <div className="wrap">
      <div className="page-head">
        <p className="mono accent">{sites.length} live sites</p>
        <h1>Projects</h1>
        <p>Every site I have built, by category. Open a card to visit the live site.</p>
      </div>
      <div className="filters" role="toolbar" aria-label="Filter projects by category">
        {siteCategories.map((t) => (
          <button key={t} className={`chip ${t === cat ? 'on' : ''}`} onClick={() => setCat(t)} data-cursor>
            {t}{t !== 'All' && <span className="dim"> {sites.filter((s) => s.category === t).length}</span>}
          </button>
        ))}
      </div>
      <motion.div layout className="pgrid">
        <AnimatePresence mode="popLayout">
          {list.map((s, i) => <SiteCard key={s.domain} s={s} i={i} />)}
        </AnimatePresence>
      </motion.div>
      <p className="mono dim" style={{ marginTop: 32, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {cs && <Link to={`/projects/${cs.slug}`} className="accent" data-cursor>Read the {cs.title} case study →</Link>}
        <Link to={`/projects/${design.slug}`} className="accent" data-cursor>Design &amp; creative work →</Link>
      </p>
    </div>
  );
}
