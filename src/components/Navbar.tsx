import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import './Navbar.css';
import logo from '../assets/logo-neon.png';
import { SITE, scrollTo } from '../siteConfig';

const links = [
  { label: 'Menu', href: '#menu' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'Catering', href: '#catering' },
  { label: 'Find Us', href: '#visit' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    scrollTo(href);
  };

  return (
    <nav className={`navbar ${mobileOpen ? 'navbar--open' : ''}`}>
      <div className="navbar__inner container">
        <a href="#" className="navbar__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src={logo} alt="" className="navbar__logo-img" width={44} height={44} />
          <span className="navbar__logo-name">Double D's</span>
        </a>

        <ul className="navbar__links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => { e.preventDefault(); handleNav(l.href); }}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href={SITE.phoneHref} className="navbar__phone">
          <Phone size={16} />
          <span>{SITE.phone}</span>
        </a>

        <button
          className="navbar__toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <ul>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => { e.preventDefault(); handleNav(l.href); }}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href={SITE.phoneHref} className="btn btn-primary">
          <Phone size={18} />
          Call {SITE.phone}
        </a>
      </div>
    </nav>
  );
}
