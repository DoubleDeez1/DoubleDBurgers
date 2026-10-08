import { useEffect, useRef, useState } from 'react';
import './SiteHeader.css';
import OpeningBanner, { OpeningStrip } from './OpeningBanner';
import Navbar from './Navbar';
import { useGrandOpening } from '../hooks/useGrandOpening';

// Full grand opening banner sits at the top of the page. Once it scrolls out
// of view, a slim strip appears under the sticky navbar so the announcement
// follows you down the page. The sticky header's height (including the strip)
// is shared as --header-h so jump links land just below it.
export default function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
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

  // Share the sticky header height (navbar + strip when showing)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const root = document.documentElement;
    const update = () => {
      const strip = el.querySelector<HTMLElement>('.opening-strip');
      root.style.setProperty('--header-h', `${el.offsetHeight + (strip?.offsetHeight ?? 0)}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [showStrip]);

  return (
    <>
      {showPromo && <OpeningBanner ref={bannerRef} label={label} onDismiss={() => setDismissed(true)} />}
      <header ref={headerRef} className="site-header">
        <Navbar />
        {showStrip && <OpeningStrip label={label} onDismiss={() => setDismissed(true)} />}
      </header>
    </>
  );
}
