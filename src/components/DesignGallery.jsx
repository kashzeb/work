import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import data from '../data/design.json';

const { cats, items } = data;

function Lightbox({ list, index, onClose, onStep }) {
  const it = list[index];

  useEffect(() => {
    const key = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onStep(1);
      else if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = prev; };
  }, [onClose, onStep]);

  return createPortal(
    <div className="lb" role="dialog" aria-modal="true" aria-label={`${it.client}: ${it.title}`} onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label="Close">×</button>
      {list.length > 1 && <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); onStep(-1); }} aria-label="Previous">←</button>}
      <figure onClick={(e) => e.stopPropagation()}>
        {it.type === 'video'
          ? <video key={it.id} src={it.video} poster={it.thumb} controls autoPlay playsInline />
          : <img key={it.id} src={it.full} alt={`${it.client}: ${it.title}`} />}
        <figcaption className="mono">
          <span><b>{it.client}</b> · {it.title}</span>
          {it.pdf && <a href={it.pdf} target="_blank" rel="noreferrer">Open full PDF ↗</a>}
          <span className="dim">{index + 1} / {list.length}</span>
        </figcaption>
      </figure>
      {list.length > 1 && <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); onStep(1); }} aria-label="Next">→</button>}
    </div>,
    document.body
  );
}

export default function DesignGallery() {
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(-1);
  const list = cat === 'All' ? items : items.filter((i) => i.cat === cat);
  const close = useCallback(() => setOpen(-1), []);
  const step = useCallback((d) => setOpen((i) => (i < 0 ? i : (i + d + list.length) % list.length)), [list.length]);

  return (
    <div className="dg-wrap">
      <span className="mono accent">Selected work · {items.length} pieces</span>
      <div className="filters" role="toolbar" aria-label="Filter design work" style={{ marginTop: 16 }}>
        {['All', ...cats].map((c) => (
          <button key={c} className={`chip ${c === cat ? 'on' : ''}`} onClick={() => { setCat(c); setOpen(-1); }} data-cursor>
            {c}{c !== 'All' && <span className="dim"> {items.filter((i) => i.cat === c).length}</span>}
          </button>
        ))}
      </div>
      <div className="dg">
        {list.map((it, i) => (
          <button key={it.id} className={`dg-item ${it.type}`} onClick={() => setOpen(i)} aria-label={`${it.client}: ${it.title}`} data-cursor>
            <img src={it.thumb} width={it.w} height={it.h} alt="" loading="lazy" />
            {it.type === 'video' && <span className="dg-play" aria-hidden="true">▶</span>}
            <span className="dg-cap mono"><b>{it.client}</b>{it.title}</span>
          </button>
        ))}
      </div>
      {open >= 0 && list[open] && <Lightbox list={list} index={open} onClose={close} onStep={step} />}
    </div>
  );
}
