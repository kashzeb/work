import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';
import PalettePicker from './PalettePicker.jsx';
import { profile } from '../data/profile.js';

const LINKS = [
  ['/', 'Home', true],
  ['/projects', 'Projects', false],
  ['/resume', 'Resume', false],
];

function useClock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: profile.timezone }).format(new Date());
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Nav({ onPalette, onContact }) {
  const time = useClock();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  // lock page scroll and allow Esc while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <header className={`nav ${open ? 'is-open' : ''}`}>
      <div className="wrap">
        <Link to="/" className="logo" data-cursor>
          <i /> kashif.khan
        </Link>

        <nav className="nav-links" aria-label="Main">
          {LINKS.map(([to, label, end]) => (
            <NavLink key={to} to={to} end={end} data-cursor>{label}</NavLink>
          ))}
        </nav>

        <div className="nav-meta">
          <span className="mono clock">Mumbai {time} IST</span>
          <button className="kbd" onClick={onPalette} data-cursor aria-label="Open command palette">Ctrl K</button>
          <button className="btn solid nav-cta" onClick={onContact} aria-haspopup="dialog" data-cursor>Get in touch</button>
          <PalettePicker />
          <ThemeToggle />
          <button
            className="burger"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" aria-hidden={!open}>
        <nav aria-label="Mobile">
          {LINKS.map(([to, label, end], i) => (
            <NavLink key={to} to={to} end={end} tabIndex={open ? 0 : -1} style={{ transitionDelay: open ? `${0.08 + i * 0.06}s` : '0s' }}>
              <span className="mono dim">0{i + 1}</span>{label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-foot mono">
          <span><span className="dot" />{profile.availability}</span>
          <button type="button" className="btn solid" onClick={() => { setOpen(false); onContact(); }} tabIndex={open ? 0 : -1}>Get in touch →</button>
          <span className="clock">Mumbai {time} IST</span>
        </div>
      </div>
    </header>
  );
}
