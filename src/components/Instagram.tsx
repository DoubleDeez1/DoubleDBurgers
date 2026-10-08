import { useEffect, useRef } from 'react';
import './Instagram.css';
import InstagramIcon from './InstagramIcon';
import { SITE, instagramUrl } from '../siteConfig';

const BEHOLD_SCRIPT = 'https://w.behold.so/widget.js';

export default function Instagram() {
  const feedRef = useRef<HTMLDivElement>(null);
  const feedId = SITE.instagram.beholdFeedId;

  // Load the Behold widget once and mount it with our feed ID
  useEffect(() => {
    const host = feedRef.current;
    if (!feedId || !host) return;

    if (!document.querySelector(`script[src="${BEHOLD_SCRIPT}"]`)) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = BEHOLD_SCRIPT;
      document.head.appendChild(script);
    }

    const widget = document.createElement('behold-widget');
    widget.setAttribute('feed-id', feedId);
    host.appendChild(widget);
    return () => { widget.remove(); };
  }, [feedId]);

  return (
    <section id="instagram" className="instagram">
      <div className="container">
        <h2 className="section-title">Fresh off the <span className="accent">Grill</span></h2>
        <p className="section-subtitle">
          Straight from our Instagram{' '}
          <a href={instagramUrl} target="_blank" rel="noopener" className="instagram__handle">
            @{SITE.instagram.handle}
          </a>
        </p>

        {feedId ? (
          <div ref={feedRef} className="instagram__feed" />
        ) : (
          <div className="instagram__grid">
            {Array.from({ length: 6 }, (_, i) => (
              <a key={i} href={instagramUrl} target="_blank" rel="noopener" className="instagram__tile" aria-label="Open our Instagram">
                {i === 0 ? <span className="instagram__tile-label">Follow us</span> : <InstagramIcon size={40} />}
              </a>
            ))}
          </div>
        )}

        <div className="btn-row instagram__cta">
          <a href={instagramUrl} target="_blank" rel="noopener" className="btn btn-primary">
            <InstagramIcon size={18} />
            See More on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
