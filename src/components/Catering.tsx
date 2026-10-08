import { Cake, Briefcase, Gem, PartyPopper, MessageSquare, ClipboardList, Truck, Phone, Mail } from 'lucide-react';
import './Catering.css';
import { SITE } from '../siteConfig';

const events = [
  { icon: Cake, title: 'Birthdays & Parties', text: 'Backyard bashes, milestone birthdays and everything in between.' },
  { icon: Briefcase, title: 'Corporate Events', text: 'Staff lunches, end-of-year parties and client days your team will actually talk about.' },
  { icon: Gem, title: 'Weddings', text: 'A late-night burger run your guests will remember, served right on site.' },
  { icon: PartyPopper, title: 'Markets & Festivals', text: 'Community events, school fetes, sports days and pop-ups.' },
];

const steps = [
  { icon: MessageSquare, title: 'Get in touch', text: 'Tell us the date, location and roughly how many people are coming.' },
  { icon: ClipboardList, title: 'Pick your menu', text: "We'll put together a menu and quote that suits your crowd and budget." },
  { icon: Truck, title: 'We roll up', text: 'The truck arrives, we set up, cook fresh on the spot and clean up after.' },
];

const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent('Catering enquiry')}&body=${encodeURIComponent(
  'Hi Double D\'s,\n\nI\'d like to enquire about catering.\n\nDate:\nLocation:\nNumber of guests:\nType of event:\n\nThanks!',
)}`;

export default function Catering() {
  return (
    <section id="catering" className="catering">
      <div className="container">
        <h2 className="section-title">Book the <span className="accent">Truck</span></h2>
        <p className="section-subtitle">
          Bring Double D's to your next event. Fresh smashed burgers, cooked on site, for any crowd.
        </p>

        <div className="catering__events">
          {events.map(({ icon: Icon, title, text }) => (
            <div key={title} className="catering__event">
              <Icon size={28} className="catering__icon" />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <h3 className="catering__how-title">How it works</h3>
        <ol className="catering__steps">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="catering__step">
              <span className="catering__step-num">{i + 1}</span>
              <div>
                <h4><Icon size={18} /> {title}</h4>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="catering__cta">
          <p>Ready to book or just want a quote?</p>
          <div className="btn-row">
            <a href={mailto} className="btn btn-primary">
              <Mail size={18} />
              Email an Enquiry
            </a>
            <a href={SITE.phoneHref} className="btn btn-outline">
              <Phone size={18} />
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
