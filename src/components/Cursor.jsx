import { useEffect, useRef } from 'react';

// Small ring and dot that follow the mouse. Hidden on touch devices via CSS.
export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      dot.current.style.transform = `translate(${x}px, ${y}px)`;
      const hot = e.target.closest?.('[data-cursor], a, button');
      ring.current.classList.toggle('big', !!hot);
    };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  return (<><div ref={ring} className="cur-ring" /><div ref={dot} className="cur-dot" /></>);
}
