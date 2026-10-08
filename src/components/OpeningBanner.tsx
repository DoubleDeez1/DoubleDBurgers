import { useEffect, useState } from 'react';
import { PartyPopper, X } from 'lucide-react';
import './OpeningBanner.css';
import { SITE, scrollTo } from '../siteConfig';

const hideFrom = new Date(SITE.grandOpening.hideFrom).getTime();

// Today's date in Sydney as YYYY-MM-DD, regardless of the visitor's timezone
const sydneyToday = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Sydney' }).format(new Date());

function countdownLabel() {
  const days = Math.round(
    (Date.parse(SITE.grandOpening.date) - Date.parse(sydneyToday())) / 86_400_000,
  );
  if (days <= 0) return "It's today!";
  if (days === 1) return 'Tomorrow!';
  return `${days} days to go`;
}

const SPARKS = Array.from({ length: 14 }, (_, i) => i);

export default function OpeningBanner() {
  const [now, setNow] = useState(() => Date.now());
  const [dismissed, setDismissed] = useState(false);

  // Re-check every minute so the countdown ticks over and the banner
  // vanishes at midnight even if the page is left open
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (dismissed || now >= hideFrom) return null;

  return (
    <div className="opening" role="region" aria-label="Grand opening announcement">
      <div className="opening__sparks" aria-hidden="true">
        {SPARKS.map(i => <span key={i} style={{ '--i': i } as React.CSSProperties} />)}
      </div>

      <button className="opening__body" onClick={() => scrollTo('#visit')}>
        <PartyPopper size={20} className="opening__pop opening__pop--left" />
        <span className="opening__title">Grand Opening</span>
        <span className="opening__date">Friday 16 October</span>
        <span className="opening__chip">{countdownLabel()}</span>
        <PartyPopper size={20} className="opening__pop opening__pop--right" />
      </button>

      <button className="opening__close" onClick={() => setDismissed(true)} aria-label="Hide announcement">
        <X size={16} />
      </button>
    </div>
  );
}
