import type { Ref } from 'react';
import { PartyPopper, X } from 'lucide-react';
import './OpeningBanner.css';
import { scrollTo } from '../siteConfig';

const SPARKS = Array.from({ length: 14 }, (_, i) => i);

interface Props {
  label: string;
  onDismiss: () => void;
  ref?: Ref<HTMLDivElement>;
}

// The full banner at the very top of the page
export default function OpeningBanner({ label, onDismiss, ref }: Props) {
  return (
    <div ref={ref} className="opening" role="region" aria-label="Grand opening announcement">
      <div className="opening__sparks" aria-hidden="true">
        {SPARKS.map(i => <span key={i} style={{ '--i': i } as React.CSSProperties} />)}
      </div>

      <button className="opening__body" onClick={() => scrollTo('#visit')}>
        <PartyPopper size={20} className="opening__pop opening__pop--left" />
        <span className="opening__title">Grand Opening</span>
        <span className="opening__date opening__date--long">Friday 16 October</span>
        <span className="opening__date opening__date--short">Fri 16 Oct</span>
        <span className="opening__chip">{label}</span>
        <PartyPopper size={20} className="opening__pop opening__pop--right" />
      </button>

      <button className="opening__close" onClick={onDismiss} aria-label="Hide announcement">
        <X size={16} />
      </button>
    </div>
  );
}

// Slim version that rides under the navbar once the full banner has scrolled away
export function OpeningStrip({ label, onDismiss }: Omit<Props, 'ref'>) {
  return (
    <div className="opening-strip" role="region" aria-label="Grand opening reminder">
      <button className="opening-strip__body" onClick={() => scrollTo('#visit')}>
        <PartyPopper size={14} />
        <span className="opening-strip__title">Grand Opening</span>
        <span className="opening-strip__sep" aria-hidden="true">·</span>
        <span>Fri 16 Oct</span>
        <span className="opening-strip__chip">{label}</span>
      </button>
      <button className="opening-strip__close" onClick={onDismiss} aria-label="Hide announcement">
        <X size={14} />
      </button>
    </div>
  );
}
