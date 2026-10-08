import { lazy, Suspense, useState } from 'react';
import { Hamburger } from 'lucide-react';
import './Menu.css';
import { MENU } from '../menu';

// Easter egg: only downloaded when someone finds the tiny burger
const BurgerGame = lazy(() => import('./BurgerGame'));

export default function Menu() {
  const [gameOpen, setGameOpen] = useState(false);

  return (
    <section id="menu" className="menu">
      <div className="container">
        <h2 className="section-title">
          The <span className="accent">Menu</span>
          <button
            className="menu__egg"
            onClick={() => setGameOpen(true)}
            aria-label="Play a secret burger game"
            title="?"
          >
            <Hamburger size={14} />
          </button>
        </h2>
        <p className="section-subtitle">Smashed, stacked and made fresh. Prices coming soon.</p>

        <div className="menu__grid">
          {MENU.map((column, ci) => (
            <div key={ci} className="menu__card">
              {column.map(group => (
                <div key={group.title} className="menu__group">
                  <h3 className="menu__heading">{group.title}</h3>
                  <ul>
                    {group.items.map((item, i) => (
                      <li key={i} className="menu__item">
                        <span className="menu__name">{item.name}</span>
                        <span className="menu__dots" />
                        <span className="menu__price">{item.price || 'TBA'}</span>
                        {item.description && <p className="menu__desc">{item.description}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {gameOpen && (
        <Suspense fallback={null}>
          <BurgerGame onClose={() => setGameOpen(false)} />
        </Suspense>
      )}
    </section>
  );
}
