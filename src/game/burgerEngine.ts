// Burger Stack — a tiny canvas game. Catch the falling ingredients on your bun,
// finish the burger with a top bun, and don't drop anything (or catch the burnt patty).

export type Part = 'bottom' | 'patty' | 'cheese' | 'lettuce' | 'tomato' | 'onion' | 'top' | 'burnt';

interface Layer { part: Part; offset: number; }
interface Faller { part: Part; x: number; y: number; vy: number; spin: number; }
interface Popup { text: string; x: number; y: number; life: number; color: string; }
interface Flyer { layers: Layer[]; x: number; y: number; vy: number; vx: number; life: number; }

export interface GameCallbacks {
  onScore: (score: number) => void;
  onLives: (lives: number) => void;
  onGameOver: (score: number, burgers: number) => void;
}

const COLORS: Record<Part, string> = {
  bottom: '#C084FC',
  top: '#C084FC',
  patty: '#FF8A4C',
  cheese: '#FFD97A',
  lettuce: '#4ADE80',
  tomato: '#FF4D6D',
  onion: '#F0ABFC',
  burnt: '#8B8B8B',
};

const HEIGHT: Record<Part, number> = {
  bottom: 20, top: 30, patty: 16, cheese: 7, lettuce: 9, tomato: 10, onion: 7, burnt: 16,
};

const START_LIVES = 3;

export class BurgerEngine {
  private ctx: CanvasRenderingContext2D;
  private cb: GameCallbacks;
  private w = 0;
  private h = 0;
  private dpr = 1;

  private raf = 0;
  private last = 0;
  private running = false;

  private playerX = 0;
  private targetX = 0;
  private keyDir = 0;

  private stack: Layer[] = [];
  private fallers: Faller[] = [];
  private popups: Popup[] = [];
  private flyers: Flyer[] = [];
  private spawnTimer = 0;
  private elapsed = 0;
  private score = 0;
  private lives = START_LIVES;
  private burgers = 0;
  private shake = 0;

  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, cb: GameCallbacks) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');
    this.ctx = ctx;
    this.cb = cb;
    this.stack = [{ part: 'bottom', offset: 0 }];
    this.resize();
    this.drawFrame();
  }

  /* ---------- sizing & input ---------- */

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = rect.width;
    this.h = rect.height;
    this.canvas.width = Math.round(rect.width * this.dpr);
    this.canvas.height = Math.round(rect.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (!this.playerX) this.playerX = this.targetX = this.w / 2;
    this.playerX = this.clampX(this.playerX);
    this.targetX = this.clampX(this.targetX);
    if (!this.running) this.drawFrame();
  }

  pointerTo(clientX: number) {
    const rect = this.canvas.getBoundingClientRect();
    this.targetX = this.clampX(clientX - rect.left);
  }

  setKeyDir(dir: number) {
    this.keyDir = dir;
  }

  private get bunW() {
    return Math.min(130, Math.max(90, this.w * 0.24));
  }

  private get baseY() {
    return this.h - 34;
  }

  private clampX(x: number) {
    const half = this.bunW / 2;
    return Math.max(half, Math.min(this.w - half, x));
  }

  /* ---------- lifecycle ---------- */

  start() {
    this.stack = [{ part: 'bottom', offset: 0 }];
    this.fallers = [];
    this.popups = [];
    this.flyers = [];
    this.spawnTimer = 0.6;
    this.elapsed = 0;
    this.score = 0;
    this.lives = START_LIVES;
    this.burgers = 0;
    this.playerX = this.targetX = this.w / 2;
    this.cb.onScore(0);
    this.cb.onLives(this.lives);
    this.running = true;
    this.last = performance.now();
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  pause() {
    if (!this.running) return;
    this.stop();
    this.paused = true;
  }

  resume() {
    if (!this.paused) return;
    this.paused = false;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  private paused = false;

  private tick = (now: number) => {
    if (!this.running) return;
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    this.update(dt);
    this.drawFrame();
    if (this.running) this.raf = requestAnimationFrame(this.tick);
  };

  /* ---------- game logic ---------- */

  private stackHeight() {
    return this.stack.reduce((sum, l) => sum + HEIGHT[l.part], 0);
  }

  private pickPart(): Part {
    const fillings = this.stack.length - 1;
    const tooTall = this.stackHeight() > this.h * 0.42;
    const weights: [Part, number][] = [
      ['patty', 3],
      ['cheese', 2.5],
      ['lettuce', 2],
      ['tomato', 2],
      ['onion', 1.5],
      ['top', tooTall ? 12 : fillings < 2 ? 0 : 0.8 + fillings * 0.35],
      ['burnt', Math.min(2.2, 0.6 + this.elapsed / 40)],
    ];
    const total = weights.reduce((s, [, wgt]) => s + wgt, 0);
    let r = Math.random() * total;
    for (const [part, wgt] of weights) {
      if ((r -= wgt) <= 0) return part;
    }
    return 'patty';
  }

  private spawn() {
    const margin = this.bunW * 0.5;
    const speedUp = Math.min(this.elapsed * 3.2, 230);
    this.fallers.push({
      part: this.pickPart(),
      x: margin + Math.random() * (this.w - margin * 2),
      y: -30,
      vy: 150 + speedUp + Math.random() * 40,
      spin: (Math.random() - 0.5) * 0.6,
    });
  }

  private popup(text: string, x: number, y: number, color: string) {
    this.popups.push({ text, x, y, life: 1, color });
  }

  private loseLife(x: number) {
    this.lives -= 1;
    this.shake = 0.3;
    this.cb.onLives(this.lives);
    this.popup('Dropped!', x, this.h - 80, '#FF4D6D');
    if (this.lives <= 0) {
      this.running = false;
      cancelAnimationFrame(this.raf);
      this.drawFrame();
      this.cb.onGameOver(this.score, this.burgers);
    }
  }

  private update(dt: number) {
    this.elapsed += dt;

    // Player movement: keyboard nudges the target, then ease toward it
    if (this.keyDir) this.targetX = this.clampX(this.targetX + this.keyDir * 620 * dt);
    this.playerX += (this.targetX - this.playerX) * Math.min(1, dt * 16);

    // Spawning gets faster over time
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawn();
      this.spawnTimer = Math.max(0.42, 1.1 - this.elapsed / 70) * (0.75 + Math.random() * 0.5);
    }

    const catchY = this.baseY - this.stackHeight();
    const half = this.bunW / 2;

    for (let i = this.fallers.length - 1; i >= 0; i--) {
      const f = this.fallers[i];
      const prevBottom = f.y + HEIGHT[f.part] / 2;
      f.y += f.vy * dt;
      const bottom = f.y + HEIGHT[f.part] / 2;

      // Landed on the top of the stack?
      if (prevBottom <= catchY && bottom >= catchY) {
        const dx = f.x - this.playerX;
        if (Math.abs(dx) < half * 1.05) {
          this.fallers.splice(i, 1);
          this.catchPart(f.part, dx);
          continue;
        }
      }

      // Fell off the bottom
      if (f.y > this.h + 40) {
        this.fallers.splice(i, 1);
        if (f.part !== 'burnt' && this.running) this.loseLife(f.x);
        if (!this.running) return;
      }
    }

    // Popups and finished burgers flying off
    for (let i = this.popups.length - 1; i >= 0; i--) {
      const p = this.popups[i];
      p.life -= dt * 0.9;
      p.y -= 40 * dt;
      if (p.life <= 0) this.popups.splice(i, 1);
    }
    for (let i = this.flyers.length - 1; i >= 0; i--) {
      const fl = this.flyers[i];
      fl.vy -= 900 * dt;
      fl.y += fl.vy * dt;
      fl.x += fl.vx * dt;
      fl.life -= dt;
      if (fl.life <= 0) this.flyers.splice(i, 1);
    }
    if (this.shake > 0) this.shake -= dt;
  }

  private catchPart(part: Part, dx: number) {
    const x = this.playerX + dx;
    const topY = this.baseY - this.stackHeight();

    if (part === 'burnt') {
      this.popup('Burnt!', x, topY - 20, '#9CA3AF');
      this.loseLife(x);
      return;
    }

    // Keep the stack a bit wobbly: store where it landed, but pull toward center
    const offset = Math.max(-this.bunW * 0.3, Math.min(this.bunW * 0.3, dx * 0.6));
    this.stack.push({ part, offset });

    if (part === 'top') {
      const fillings = this.stack.slice(1, -1);
      const patties = fillings.filter(l => l.part === 'patty').length;
      const cheese = fillings.filter(l => l.part === 'cheese').length;
      let points = 50 + fillings.length * 25;
      let label = `Order up! +${points}`;
      if (patties >= 2 && cheese >= 2) {
        points *= 2;
        label = `DOUBLE D! +${points}`;
      }
      this.score += points;
      this.burgers += 1;
      this.popup(label, this.playerX, topY - 30, patties >= 2 && cheese >= 2 ? '#FFD97A' : '#D9A6FF');
      this.flyers.push({
        layers: this.stack,
        x: this.playerX,
        y: this.baseY,
        vy: -520,
        vx: (Math.random() < 0.5 ? -1 : 1) * 180,
        life: 1.6,
      });
      this.stack = [{ part: 'bottom', offset: 0 }];
    } else {
      this.score += 10;
      this.popup('+10', x, topY - 14, COLORS[part]);
    }
    this.cb.onScore(this.score);
  }

  /* ---------- drawing ---------- */

  private drawFrame() {
    const { ctx, w, h } = this;
    ctx.save();
    ctx.clearRect(0, 0, w, h);

    if (this.shake > 0) {
      const s = this.shake * 18;
      ctx.translate((Math.random() - 0.5) * s, (Math.random() - 0.5) * s);
    }

    this.drawBackground();

    for (const f of this.fallers) {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(Math.sin(this.elapsed * 3 + f.x) * f.spin);
      this.drawPart(f.part, 0, 0, this.bunW * 0.92);
      ctx.restore();
    }

    for (const fl of this.flyers) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, fl.life));
      this.drawStack(fl.layers, fl.x, fl.y);
      ctx.restore();
    }

    if (this.stack.length) this.drawStack(this.stack, this.playerX, this.baseY);

    // Plate
    ctx.save();
    ctx.strokeStyle = 'rgba(217, 166, 255, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(this.playerX, this.baseY + 6, this.bunW * 0.68, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    for (const p of this.popups) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.font = `400 ${p.text.length > 6 ? 30 : 24}px "Bebas Neue", Impact, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 14;
      ctx.fillText(p.text, p.x, p.y);
      ctx.restore();
    }

    ctx.restore();
  }

  private drawBackground() {
    const { ctx, w, h } = this;
    const g = ctx.createRadialGradient(w / 2, h * 0.35, 0, w / 2, h * 0.35, Math.max(w, h) * 0.7);
    g.addColorStop(0, 'rgba(168, 85, 247, 0.16)');
    g.addColorStop(1, 'rgba(5, 5, 7, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Floor line
    ctx.strokeStyle = 'rgba(255, 217, 122, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, this.baseY + 16);
    ctx.lineTo(w, this.baseY + 16);
    ctx.stroke();
  }

  private drawStack(layers: Layer[], x: number, baseY: number) {
    let y = baseY;
    for (const layer of layers) {
      const lh = HEIGHT[layer.part];
      y -= lh;
      this.drawPart(layer.part, x + layer.offset, y + lh / 2, this.bunW);
    }
  }

  private neon(color: string, fillAlpha = 0.28) {
    const { ctx } = this;
    ctx.strokeStyle = color;
    ctx.fillStyle = hexToRgba(color, fillAlpha);
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
  }

  private drawPart(part: Part, cx: number, cy: number, width: number) {
    const { ctx } = this;
    const hh = HEIGHT[part];
    const left = cx - width / 2;
    const top = cy - hh / 2;
    ctx.save();
    this.neon(COLORS[part]);

    switch (part) {
      case 'bottom': {
        roundRect(ctx, left, top, width, hh, [4, 4, 10, 10]);
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'top': {
        ctx.beginPath();
        ctx.moveTo(left, cy + hh / 2);
        ctx.ellipse(cx, cy + hh / 2, width / 2, hh, 0, Math.PI, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Sesame seeds
        ctx.shadowBlur = 6;
        ctx.fillStyle = '#FFD97A';
        ctx.shadowColor = '#FFD97A';
        for (const [sx, sy] of [[-0.25, 0.1], [0, -0.25], [0.25, 0.1], [-0.08, 0.3], [0.12, 0.35]]) {
          ctx.beginPath();
          ctx.ellipse(cx + sx * width * 0.7, cy + sy * hh, 3, 1.6, 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
      case 'patty':
      case 'burnt': {
        roundRect(ctx, left + 3, top, width - 6, hh, 7);
        ctx.fill();
        ctx.stroke();
        if (part === 'burnt') {
          // Little smoke wisps
          ctx.strokeStyle = 'rgba(200,200,200,0.6)';
          ctx.shadowBlur = 4;
          ctx.lineWidth = 2;
          for (const ox of [-0.2, 0.05, 0.25]) {
            ctx.beginPath();
            ctx.moveTo(cx + ox * width, top - 3);
            ctx.quadraticCurveTo(cx + ox * width - 6, top - 10, cx + ox * width, top - 16);
            ctx.stroke();
          }
          ctx.fillStyle = '#E5E7EB';
          ctx.font = '600 11px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('BURNT', cx, cy + 1);
        }
        break;
      }
      case 'cheese': {
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(left + width, top);
        ctx.lineTo(left + width, top + hh);
        ctx.lineTo(cx + width * 0.22, top + hh);
        ctx.lineTo(cx + width * 0.12, top + hh + 9);
        ctx.lineTo(cx + width * 0.02, top + hh);
        ctx.lineTo(cx - width * 0.28, top + hh);
        ctx.lineTo(cx - width * 0.36, top + hh + 7);
        ctx.lineTo(cx - width * 0.44, top + hh);
        ctx.lineTo(left, top + hh);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      }
      case 'lettuce': {
        ctx.beginPath();
        const waves = 7;
        ctx.moveTo(left - 4, cy);
        for (let i = 0; i <= waves; i++) {
          const x1 = left - 4 + ((width + 8) / waves) * (i - 0.5);
          const x2 = left - 4 + ((width + 8) / waves) * i;
          ctx.quadraticCurveTo(x1, i % 2 ? cy + hh * 0.9 : cy - hh * 0.9, x2, cy);
        }
        ctx.stroke();
        break;
      }
      case 'tomato': {
        const tw = width * 0.42;
        for (const ox of [-0.24, 0.24]) {
          ctx.beginPath();
          ctx.ellipse(cx + ox * width, cy, tw / 2, hh / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        break;
      }
      case 'onion': {
        ctx.fillStyle = 'transparent';
        for (const ox of [-0.28, 0, 0.28]) {
          ctx.beginPath();
          ctx.ellipse(cx + ox * width, cy, width * 0.15, hh / 2, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        break;
      }
    }
    ctx.restore();
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number,
  r: number | number[],
) {
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.rect(x, y, w, h);
  }
}

function hexToRgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
