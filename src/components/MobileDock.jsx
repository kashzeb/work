import { profile } from '../data/profile.js';

// Phone-only bar pinned to the bottom of every screen: resume download and contact popup.
export default function MobileDock({ onContact }) {
  return (
    <div className="dock" role="region" aria-label="Quick actions">
      <a className="btn" href={profile.resumePdf} download>Download Resume ↓</a>
      <button type="button" className="btn solid" onClick={onContact} aria-haspopup="dialog">Get in touch</button>
    </div>
  );
}
