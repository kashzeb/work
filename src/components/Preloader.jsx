import { useEffect, useState } from 'react';

// Counter + progress bar, then a curtain lift. Plays once per browser session.
// Driven by timers and CSS transitions so it also runs in throttled tabs.
const MIN_MS = 1500;

export default function Preloader() {
  const skip = (() => {
    try { return sessionStorage.getItem('preloaded') || window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
  })();
  const [phase, setPhase] = useState(skip ? 'gone' : 'run'); // run -> out -> gone
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (phase !== 'run') return;
    document.body.style.overflow = 'hidden';
    const t0 = Date.now();
    let fontsReady = false;
    document.fonts?.ready.then(() => { fontsReady = true; }) ?? (fontsReady = true);

    const id = setInterval(() => {
      const p = Math.min((Date.now() - t0) / MIN_MS, 1);
      const eased = 1 - (1 - p) ** 2.4;
      // hold at 96% until web fonts are loaded so the page never flashes unstyled text
      setPct(Math.round(Math.min(eased * 100, fontsReady ? 100 : 96)));
      if (p >= 1 && fontsReady) {
        clearInterval(id);
        setPct(100);
        setTimeout(() => setPhase('out'), 250);
      }
    }, 40);
    return () => { clearInterval(id); };
  }, [phase]);

  useEffect(() => {
    if (phase === 'out') {
      document.body.style.overflow = '';
      try { sessionStorage.setItem('preloaded', '1'); } catch { /* ignore */ }
      const t = setTimeout(() => setPhase('gone'), 900);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === 'gone') return null;

  return (
    <div className={`preloader ${phase === 'out' ? 'out' : ''}`} role="status" aria-label="Loading">
      <div className="pre-top mono">
        <span>kashif.khan</span>
        <span>Senior Front-End Developer</span>
      </div>
      <div className="pre-mid">
        <span className="pre-count">{String(pct).padStart(3, '0')}</span>
        <span className="pre-pct">%</span>
      </div>
      <div className="pre-bottom">
        <div className="pre-bar"><i style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <div className="pre-meta mono">
          <span>Loading portfolio</span>
          <button onClick={() => setPhase('out')}>Skip ›</button>
        </div>
      </div>
    </div>
  );
}
