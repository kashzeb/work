import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { profile } from '../data/profile.js';

const icons = {
  call: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  whatsapp: <><path d="M3 21l1.6-4.8A9 9 0 1 1 8 19.5z" /><path d="M9 9c0 3 3 6 6 6l1-2-2-1-1 .8c-.8-.4-1.6-1.2-2-2l.8-1-1-2z" /></>,
  email: <><rect x="3" y="5" width="18" height="14" /><path d="M3 6l9 7 9-7" /></>,
};

// Portal to <body>: the page wrapper is transformed, which would otherwise trap a fixed overlay.
export default function ContactModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = prev; };
  }, [open, onClose]);

  if (!open) return null;

  const options = [
    { id: 'call', label: 'Call', value: profile.phone, href: `tel:${profile.phoneTel}` },
    { id: 'whatsapp', label: 'WhatsApp', value: profile.phone, href: profile.whatsapp, external: true },
    { id: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  ];

  return createPortal(
    <div className="cm-back" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cm" role="dialog" aria-modal="true" aria-label="Get in touch">
        <div className="cm-head">
          <div>
            <p className="mono accent">Get in touch</p>
            <h3>How would you like to connect?</h3>
          </div>
          <button className="cm-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="cm-list">
          {options.map((o) => (
            <a key={o.id} className="cm-opt" href={o.href} {...(o.external ? { target: '_blank', rel: 'noreferrer' } : {})} data-cursor>
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">{icons[o.id]}</svg>
              <span><b>{o.label}</b><small className="mono">{o.value}</small></span>
              <span className="arrow">→</span>
            </a>
          ))}
        </div>
        <p className="mono dim cm-foot">{profile.availability}</p>
      </div>
    </div>,
    document.body
  );
}
