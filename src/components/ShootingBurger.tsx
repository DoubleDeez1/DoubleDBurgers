import { useEffect, useRef, useState } from 'react';
import './ShootingBurger.css';
import burgerImg from '../assets/shooting-burger.webp';

interface Flight {
  id: number;
  top: number;      // % from top of the hero where it starts
  angle: number;    // degrees, slight downward slope
  duration: number; // seconds to cross
  size: number;     // px
  flip: boolean;    // right-to-left instead of left-to-right
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

// A little burger that streaks across the hero like a shooting star,
// every 6 to 13 seconds. Skipped entirely for visitors who prefer reduced motion.
export default function ShootingBurger() {
  const [flight, setFlight] = useState<Flight | null>(null);
  const firstRef = useRef(true); // first flight comes quickly, later ones are spaced out
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (reduced || flight) return;
    const delay = firstRef.current ? 2500 : rand(6000, 13000);
    const t = window.setTimeout(() => {
      firstRef.current = false;
      setFlight({
        id: Date.now(),
        top: rand(4, 32),
        angle: rand(8, 18),
        duration: rand(2.2, 3.2),
        size: rand(46, 66),
        flip: Math.random() < 0.35,
      });
    }, delay);
    return () => window.clearTimeout(t);
  }, [flight, reduced]);

  if (!flight) return null;

  return (
    <div
      key={flight.id}
      className={`shooting ${flight.flip ? 'shooting--flip' : ''}`}
      style={{
        '--top': `${flight.top}%`,
        '--angle': `${flight.flip ? -flight.angle : flight.angle}deg`,
        '--dur': `${flight.duration}s`,
        '--size': `${flight.size}px`,
      } as React.CSSProperties}
      aria-hidden="true"
    >
      <div className="shooting__mover" onAnimationEnd={() => setFlight(null)}>
        <span className="shooting__tail" />
        <img className="shooting__burger" src={burgerImg} alt="" />
      </div>
    </div>
  );
}
