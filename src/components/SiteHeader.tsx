import { useEffect, useRef } from 'react';
import './SiteHeader.css';
import OpeningBanner from './OpeningBanner';
import Navbar from './Navbar';

// Banner + navbar stick to the top together. The header's live height is
// shared as --header-h so jump links land just below it.
export default function SiteHeader() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty('--header-h', `${el.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <header ref={ref} className="site-header">
      <OpeningBanner />
      <Navbar />
    </header>
  );
}
