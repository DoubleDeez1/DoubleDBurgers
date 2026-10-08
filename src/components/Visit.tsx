import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import './Visit.css';
import { SITE, mapsUrl, directionsUrl, mapEmbedUrl } from '../siteConfig';

export default function Visit() {
  return (
    <section id="visit" className="visit">
      <div className="container">
        <h2 className="section-title">Come <span className="accent">Find Us</span></h2>
        <p className="section-subtitle">We're a food truck, so keep an eye on our Instagram for where we're parked next.</p>

        <div className="visit__grid">
          <div className="visit__card">
            <MapPin size={26} className="visit__icon" />
            <h3>Where</h3>
            <a href={mapsUrl} target="_blank" rel="noopener">
              {SITE.address.street}<br />{SITE.address.suburb}
            </a>
          </div>
          <div className="visit__card">
            <Phone size={26} className="visit__icon" />
            <h3>Contact</h3>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="visit__email">
              <Mail size={14} /> {SITE.email}
            </a>
          </div>
        </div>

        <div className="visit__map">
          <iframe
            title={`Map to ${SITE.name}, ${SITE.address.street}, ${SITE.address.suburb}`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="btn-row visit__actions">
          <a href={directionsUrl} target="_blank" rel="noopener" className="btn btn-primary">
            <Navigation size={18} />
            Get Directions
          </a>
          <a href={SITE.phoneHref} className="btn btn-outline">
            <Phone size={18} />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
