import { useEffect, useRef, useState } from 'react';
import './SiteHeader.css';
import OpeningBanner, { OpeningStrip } from './OpeningBanner';
import Navbar from './Navbar';
import { useGrandOpening } from '../hooks/useGrandOpening';

const STRIP_H = 32;

// The full grand opening banner and the navbar sit at the top of the page and
// scroll away normally. Once the banner is out of view, a slim strip pins to
// the top of the screen so the announcement follows you down the page.
export default function SiteHeader() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { active, label } = useGrandOpening();
  const [dismissed, setDismissed] = useState(false);
  const [bannerInView, setBannerInView] = useState(true);

  const showPromo = active && !dismissed;
  const showStrip = showPromo && !bannerInView;

  // Watch whether the big banner is on screen
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setBannerInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [showPromo]);

  // Jump links should land below the pinned strip while the promo is running
  useEffect(() => {
    document.documentElement.style.setProperty('--header-h', showPromo ? `${STRIP_H}px` : '0px');
  }, [showPromo]);

  return (
    <>
      {showPromo && <OpeningBanner ref={bannerRef} label={label} onDismiss={() => setDismissed(true)} />}
      <header className="site-header">
        <Navbar />
      </header>
      {showStrip && <OpeningStrip label={label} onDismiss={() => setDismissed(true)} />}
    </>
  );
}
