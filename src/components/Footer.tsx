import { Phone, Mail, MapPin } from 'lucide-react';
import './Footer.css';
import InstagramIcon from './InstagramIcon';
import logo from '../assets/logo-white.png';
import { SITE, mapsUrl, instagramUrl } from '../siteConfig';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src={logo} alt="" className="footer__logo" width={80} height={80} />
        <div className="footer__contact-list">
          <a href={mapsUrl} target="_blank" rel="noopener" className="footer__contact-item">
            <MapPin size={16} /> {SITE.address.street}, {SITE.address.suburb}
          </a>
          <a href={SITE.phoneHref} className="footer__contact-item">
            <Phone size={16} /> {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="footer__contact-item">
            <Mail size={16} /> {SITE.email}
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener" className="footer__contact-item">
            <InstagramIcon size={16} /> @{SITE.instagram.handle}
          </a>
        </div>
        <p className="footer__bottom">&copy; {year} {SITE.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
