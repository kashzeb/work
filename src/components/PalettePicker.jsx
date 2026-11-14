import { useEffect, useRef, useState } from 'react';

// Visitors can restyle the whole site: pick a colour palette and a typeface. Choice is remembered.
export const palettes = [
  { id: 'v1', name: 'Cobalt Lime', sw: ['#030407', '#1558c9', '#d4ff24'] },
  { id: 'v2', name: 'Moss Emerald', sw: ['#000000', '#6d8f63', '#39ff88'] },
  { id: 'v3', name: 'Powder Peach', sw: ['#8db9f0', '#e9e8f8', '#f5b69e'] },
  { id: 'v4', name: 'Periwinkle Wasabi', sw: ['#9b8cf0', '#141020', '#c6ff24'] },
  { id: 'v5', name: 'Forest Crimson', sw: ['#171717', '#06110c', '#a31c1b'] },
  { id: 'v6', name: 'Lemon Lavender', sw: ['#fff21a', '#171717', '#a66bff'] },
  { id: 'v7', name: 'Pink Chartreuse', sw: ['#0b0b0b', '#ff2da8', '#d4ff3f'] },
  { id: 'v8', name: 'Royal Tomato', sw: ['#20309a', '#ffffff', '#bb232b'] },
  { id: 'v9', name: 'Cerulean Rose', sw: ['#0a0a0a', '#007ba7', '#ff2d95'] },
  { id: 'v10', name: 'Teal Lime', sw: ['#0b3048', '#f2f0e9', '#b9f12f'] },
];
const fonts = [
  { id: 'f2', name: 'Sora', sample: 'Aa' },
  { id: 'f4', name: 'Chakra Petch', sample: 'Aa' },
];

const get = (k, d, ok) => { try { const v = localStorage.getItem(k); return v && ok.includes(v) ? v : d; } catch { return d; } };
const set = (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } };

export default function PalettePicker() {
  const [open, setOpen] = useState(false);
  const [pal, setPal] = useState(() => get('palette', 'v1', palettes.map((p) => p.id)));
  const [font, setFont] = useState(() => get('font', 'f2', fonts.map((f) => f.id)));
  const box = useRef(null);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute('data-palette', pal);
    el.setAttribute('data-font', font);
    set('palette', pal);
    set('font', font);
  }, [pal, font]);

  // keep the browser UI colour in step with palette and light/dark mode
  useEffect(() => {
    const sync = () => {
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta && bg) meta.setAttribute('content', bg);
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-palette'] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const away = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', away);
    window.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', away); window.removeEventListener('keydown', esc); };
  }, [open]);

  const cur = palettes.find((p) => p.id === pal);

  return (
    <div className="pp" ref={box}>
      <button className="theme-btn pp-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="pp-panel" aria-label="Change colours and font" title="Change colours and font" data-cursor>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-1.8 0-1.4-1.2-1.6-1.2-2.8 0-.9.7-1.4 1.6-1.4H17a4 4 0 0 0 4-4C21 6.7 17 3 12 3z" />
          <circle cx="7.5" cy="11" r="1" fill="currentColor" /><circle cx="10" cy="7.5" r="1" fill="currentColor" /><circle cx="14.5" cy="7.5" r="1" fill="currentColor" />
        </svg>
      </button>

      {open && (
        <div id="pp-panel" className="pp-panel" role="dialog" aria-label="Customise the look">
          <div className="pp-head">
            <span className="mono">Colour: {cur?.name}</span>
          </div>
          <div className="pp-grid">
            {palettes.map((p) => (
              <button key={p.id} className="pp-card" aria-pressed={pal === p.id} onClick={() => setPal(p.id)}>
                <span className="pp-sw">{p.sw.map((c) => <i key={c} style={{ background: c }} />)}</span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
          <div className="pp-head"><span className="mono">Typeface</span></div>
          <div className="pp-fonts">
            {fonts.map((f) => (
              <button key={f.id} className={`pp-font ${f.id}`} aria-pressed={font === f.id} onClick={() => setFont(f.id)}>
                <b>{f.sample}</b> {f.name}
              </button>
            ))}
          </div>
          <p className="pp-note mono">Light / dark: use the sun or moon button.</p>
        </div>
      )}
    </div>
  );
}
