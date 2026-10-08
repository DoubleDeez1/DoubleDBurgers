import InstagramIcon from './InstagramIcon';
import ShootingBurger from './ShootingBurger';
import './Hero.css';
import logo from '../assets/logo-neon.png';
import { SITE, instagramUrl, scrollTo } from '../siteConfig';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <ShootingBurger />
      <img className="hero__logo" src={logo} alt="Double D's Burgers neon logo" width={1080} height={1080} />
      <p className="hero__tag">
        {SITE.tagline} <span className="accent">{SITE.taglineAccent}</span>
      </p>
      <div className="btn-row">
        <a href="#menu" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollTo('#menu'); }}>
          See the Menu
        </a>
        <a href={instagramUrl} className="btn btn-outline" target="_blank" rel="noopener">
          <InstagramIcon size={18} />
          Follow Us
        </a>
      </div>
    </section>
  );
}
