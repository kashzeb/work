import { useEffect, useRef } from 'react';

// Grid of dots that push away from the cursor and spring back.
export default function DotField() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const GAP = 34, R = 150;
    let w, h, dots = [], mouse = { x: -999, y: -999 }, raf;
    let base = '235,232,223', hotRgb = '255,90,31', baseA = 0.16;
    const readTheme = () => {
      const root = document.documentElement;
      const light = root.getAttribute('data-theme') === 'light';
      const cs = getComputedStyle(root);
      const pick = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
      base = pick('--base-rgb', light ? '22,21,15' : '235,232,223');
      hotRgb = pick('--hot-rgb', light ? '224,68,12' : '255,90,31');
      baseA = light ? 0.22 : 0.16;
    };
    readTheme();
    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-palette'] });

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < h; y += GAP)
        for (let x = GAP / 2; x < w; x += GAP) dots.push({ ox: x, oy: y, x, y });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.ox - mouse.x, dy = d.oy - mouse.y;
        const dist = Math.hypot(dx, dy);
        let tx = d.ox, ty = d.oy, near = 0;
        if (dist < R) {
          const f = (1 - dist / R) ** 2;
          tx += (dx / (dist || 1)) * f * 38;
          ty += (dy / (dist || 1)) * f * 38;
          near = f;
        }
        d.x += (tx - d.x) * 0.14;
        d.y += (ty - d.y) * 0.14;
        ctx.fillStyle = near > 0.05 ? `rgba(${hotRgb},${0.35 + near * 0.65})` : `rgba(${base},${baseA})`;
        ctx.fillRect(d.x - 1, d.y - 1, 2 + near * 2, 2 + near * 2);
      }
      raf = requestAnimationFrame(draw);
    };

    const move = (e) => { const r = c.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const leave = () => { mouse = { x: -999, y: -999 }; };

    build();
    if (reduce) { draw(); cancelAnimationFrame(raf); } else { draw(); }
    window.addEventListener('resize', build);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', build);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
