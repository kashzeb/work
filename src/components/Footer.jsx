import { Link } from 'react-router-dom';
import { profile } from '../data/profile.js';

export default function Footer({ onContact }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <p className="mono dim" style={{ marginBottom: 24 }}>
          <span className="dot" />
          {profile.availability}
        </p>
        <h2>
          <button type="button" onClick={onContact} aria-haspopup="dialog" data-cursor>Let's build<br />something<span className="accent">.</span></button>
        </h2>
        <div className="footer-row mono">
          <button type="button" className="link" onClick={onContact} aria-haspopup="dialog">{profile.email}</button>
          <nav>
            <Link to="/projects">Projects</Link>
            <Link to="/resume">Resume</Link>
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </nav>
          <span>© {new Date().getFullYear()} {profile.name}</span>
        </div>
      </div>
    </footer>
  );
}
