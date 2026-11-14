import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects.js';
import { profile } from '../data/profile.js';

export default function CommandPalette({ open, onClose, onContact }) {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef(null);

  const items = useMemo(() => {
    const base = [
      { label: 'Home', hint: 'page', run: () => nav('/') },
      { label: 'All projects', hint: 'page', run: () => nav('/projects') },
      { label: 'Resume', hint: 'page', run: () => nav('/resume') },
      { label: 'Download resume (PDF)', hint: 'action', run: () => { window.open(profile.resumePdf, "_blank"); } },
      { label: 'Copy email address', hint: 'action', run: () => navigator.clipboard?.writeText(profile.email) },
      { label: 'Get in touch (call, WhatsApp, email)', hint: 'action', run: () => onContact() },
      ...profile.socials.map((s) => ({ label: s.label, hint: 'link', run: () => window.open(s.href, '_blank') })),
      ...projects.map((p) => ({ label: p.title, hint: 'project', run: () => nav(`/projects/${p.slug}`) })),
    ];
    const s = q.trim().toLowerCase();
    return s ? base.filter((i) => i.label.toLowerCase().includes(s)) : base;
  }, [q, nav, onContact]);

  useEffect(() => { if (open) { setQ(''); setSel(0); setTimeout(() => input.current?.focus(), 0); } }, [open]);
  useEffect(() => setSel(0), [q]);

  if (!open) return null;

  const run = (i) => { if (i) { i.run(); onClose(); } };
  const onKey = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, items.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    if (e.key === 'Enter') run(items[sel]);
  };

  return (
    <div className="pal-back" onMouseDown={onClose}>
      <div className="pal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label="Command palette">
        <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder="Jump to a page, project or action..." />
        <ul>
          {items.length === 0 && <li className="none">No matches</li>}
          {items.map((i, idx) => (
            <li key={i.label + idx} className={idx === sel ? 'sel' : ''} onMouseEnter={() => setSel(idx)} onClick={() => run(i)}>
              <span>{i.label}</span><span>{i.hint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
