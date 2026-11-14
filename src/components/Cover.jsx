import { useState } from 'react';

// Generated cover art for projects without screenshots. Swap for <img> once you have real images.
const initials = (t) => t.split(' ').map((w) => w[0]).join('').slice(0, 2);

const patterns = [
  // concentric squares
  <g key="0" fill="none" stroke="currentColor" strokeWidth="1">{[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={160 - i * 24} y={110 - i * 18} width={i * 48 + 20} height={i * 36 + 20} opacity={1 - i * 0.14} />)}</g>,
  // diagonal hatch
  <g key="1" stroke="currentColor" strokeWidth="1" opacity=".8">{Array.from({ length: 26 }, (_, i) => <line key={i} x1={i * 16 - 60} y1="400" x2={i * 16 + 140} y2="0" />)}</g>,
  // bar chart
  <g key="2" fill="currentColor">{[40, 90, 60, 130, 100, 170, 140].map((h, i) => <rect key={i} x={30 + i * 40} y={260 - h} width="22" height={h} opacity={0.4 + i * 0.09} />)}</g>,
  // arcs
  <g key="3" fill="none" stroke="currentColor" strokeWidth="1">{[1, 2, 3, 4, 5, 6].map((i) => <circle key={i} cx="300" cy="260" r={i * 38} opacity={1 - i * 0.12} />)}</g>,
];

export const shot = (domain) => `/screens/${domain}.jpg`;

export default function Cover({ pattern = 0, title = '', domain }) {
  const [failed, setFailed] = useState(false);
  if (domain && !failed) {
    return (
      <div className="cover has-img">
        <img src={shot(domain)} alt={`${domain} homepage`} loading="lazy" onError={() => setFailed(true)} />
      </div>
    );
  }
  return (
    <div className="cover">
      <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id={`g${pattern}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" style={{ stroke: 'var(--line)' }} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="260" fill={`url(#g${pattern})`} />
        {patterns[pattern % patterns.length]}
      </svg>
      <span className="initials">{initials(title)}</span>
    </div>
  );
}
