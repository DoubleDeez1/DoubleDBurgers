import { useEffect, useRef, useState } from 'react';
import { X, Heart, Trophy, Play, RotateCcw } from 'lucide-react';
import './BurgerGame.css';
import { BurgerEngine } from '../game/burgerEngine';

const BEST_KEY = 'dd-burger-best';

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(score: number) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    /* storage unavailable — best score just won't persist */
  }
}

type Phase = 'ready' | 'playing' | 'over';

export default function BurgerGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<BurgerEngine | null>(null);
  const [phase, setPhase] = useState<Phase>('ready');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [best, setBest] = useState(readBest);
  const bestRef = useRef(best);
  const [burgers, setBurgers] = useState(0);
  const [newBest, setNewBest] = useState(false);

  // Create the engine once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new BurgerEngine(canvas, {
      onScore: setScore,
      onLives: setLives,
      onGameOver: (finalScore, made) => {
        setBurgers(made);
        setPhase('over');
        if (finalScore > bestRef.current) {
          bestRef.current = finalScore;
          saveBest(finalScore);
          setBest(finalScore);
          setNewBest(true);
        }
      },
    });
    engineRef.current = engine;

    const onResize = () => engine.resize();
    const onVisibility = () => (document.hidden ? engine.pause() : engine.resume());
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      engine.stop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Keyboard controls, Escape to close, lock page scroll
  useEffect(() => {
    const dirFor = (key: string) =>
      key === 'ArrowLeft' || key === 'a' || key === 'A' ? -1
        : key === 'ArrowRight' || key === 'd' || key === 'D' ? 1 : 0;
    const held = new Set<number>();
    const onDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      const d = dirFor(e.key);
      if (d) { e.preventDefault(); held.add(d); engineRef.current?.setKeyDir(d); }
    };
    const onUp = (e: KeyboardEvent) => {
      const d = dirFor(e.key);
      if (!d) return;
      held.delete(d);
      engineRef.current?.setKeyDir(held.size ? [...held][held.size - 1] : 0);
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const start = () => {
    setNewBest(false);
    setPhase('playing');
    engineRef.current?.start();
  };

  const onPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    engineRef.current?.pointerTo(e.clientX);
  };

  return (
    <div className="bgame" role="dialog" aria-modal="true" aria-label="Burger Stack mini game">
      <div className="bgame__frame">
        <div className="bgame__hud">
          <span className="bgame__score">{score}</span>
          <span className="bgame__lives" aria-label={`${lives} lives left`}>
            {Array.from({ length: 3 }, (_, i) => (
              <Heart key={i} size={18} className={i < lives ? 'is-full' : ''} />
            ))}
          </span>
          <span className="bgame__best"><Trophy size={15} /> {best}</span>
          <button className="bgame__close" onClick={onClose} aria-label="Close game">
            <X size={22} />
          </button>
        </div>

        <canvas
          ref={canvasRef}
          className="bgame__canvas"
          onPointerMove={onPointer}
          onPointerDown={onPointer}
        />

        {phase === 'ready' && (
          <div className="bgame__overlay">
            <h2 className="bgame__title">Burger <span className="accent">Stack</span></h2>
            <ul className="bgame__rules">
              <li>Move your bun to catch the falling ingredients.</li>
              <li>Catch a <strong>top bun</strong> to finish the burger and score big.</li>
              <li>2+ patties and 2+ cheese = <strong className="accent-text">DOUBLE D</strong> bonus.</li>
              <li>Don't drop anything, and avoid the burnt patty.</li>
            </ul>
            <p className="bgame__controls">Drag / move mouse, or use ← → keys</p>
            <button className="btn btn-primary" onClick={start}>
              <Play size={18} /> Play
            </button>
          </div>
        )}

        {phase === 'over' && (
          <div className="bgame__overlay">
            <h2 className="bgame__title">Kitchen <span className="accent">Closed</span></h2>
            <p className="bgame__final">{score}</p>
            <p className="bgame__summary">
              {burgers} burger{burgers === 1 ? '' : 's'} served
              {newBest && <><br /><span className="accent-text">New best score!</span></>}
            </p>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={start}>
                <RotateCcw size={18} /> Play Again
              </button>
              <button className="btn btn-outline" onClick={onClose}>Back to Menu</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
