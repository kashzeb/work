import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Cover, { shot } from '../components/Cover.jsx';
import DesignGallery from '../components/DesignGallery.jsx';
import { projects } from '../data/projects.js';

// Thumbnail of a live site; shows nothing but the label if the image is missing.
function Shot({ domain }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return <img src={shot(domain)} alt={`${domain} homepage`} loading="lazy" onError={() => setOk(false)} />;
}
export default function ProjectDetail() {
  const { slug } = useParams();
  const idx = projects.findIndex((p) => p.slug === slug);
  const p = projects[idx];

  if (!p) {
    return (
      <div className="wrap page-head">
        <h1>Not found</h1>
        <p><Link to="/projects" className="accent">← Back to projects</Link></p>
      </div>
    );
  }
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="wrap">
      <div className="page-head">
        <Link to="/projects" className="mono dim" data-cursor>← All projects</Link>
        <h1 style={{ marginTop: 24 }}>{p.title}</h1>
        <p>{p.summary} {p.placeholder && <span className="tag sample">Sample entry</span>}</p>
      </div>

      <dl className="case-meta">
        <div><dt className="mono">Client</dt><dd>{p.client}</dd></div>
        <div><dt className="mono">Type</dt><dd>{p.type}</dd></div>
        <div><dt className="mono">Year</dt><dd>{p.year}</dd></div>
        <div><dt className="mono">Stack</dt><dd>{p.tags.join(', ')}</dd></div>
      </dl>

      <div className="case-hero"><Cover pattern={p.pattern} title={p.title} domain={p.cover} /></div>

      <div className="case-block"><span className="mono accent">Problem</span><p>{p.problem}</p></div>
      <div className="case-block"><span className="mono accent">Solution</span><p>{p.solution}</p></div>
      <div className="case-block"><span className="mono accent">Result</span><p>{p.result}</p></div>

      {p.slug === 'graphic-design' && <DesignGallery />}

      {p.links.length > 0 && (
        <div className="case-block">
          <span className="mono accent">Live sites</span>
          <div className="shots">
            {p.links.map((l) => (
              <a key={l.href} className="shot reg" href={l.href} target="_blank" rel="noreferrer" data-cursor>
                <Shot domain={l.label} />
                <span className="mono">{l.label} ↗</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <Link to={`/projects/${next.slug}`} className="next" data-cursor>
        <p className="mono dim">Next project</p>
        <h3>{next.title} →</h3>
      </Link>
    </div>
  );
}
