import * as easing from './easing';

export class Tween {
  constructor(settings) {
    const {
      from,
      to,
      duration,
      delay,
      easing,
      onStart,
      onUpdate,
      onFinish
    } = settings;

    for (let key in from) {
      if (to[key] === undefined) {
        to[key] = from[key];
      }
    }
    for (let key in to) {
      if (from[key] === undefined) {
        from[key] = to[key];
      }
    }

    this.from = from;
    this.to = to;
    this.duration = duration || 500;
    this.delay = delay || 0;
    this.easing = easing || 'linear';
    this.onStart = onStart;
    this.onUpdate = onUpdate || function () { };
    this.onFinish = onFinish;
    this.startTime = Date.now() + this.delay;
    this.started = false;
    this.finished = false;
    this.timer = null;
    this.keys = {};
  }

  update() {
    this.time = Date.now();
    // delay some time
    if (this.time < this.startTime) {
      return;
    }
    if (this.finished) {
      return;
    }
    // finish animation
    if (this.elapsed === this.duration) {
      if (!this.finished) {
        this.finished = true;
        this.onFinish && this.onFinish(this.keys);
      }
      return;
    }
    this.elapsed = this.time - this.startTime;
    this.elapsed = this.elapsed > this.duration ? this.duration : this.elapsed;
    for (let key in this.to) {
      this.keys[key] = this.from[key] + (this.to[key] - this.from[key]) * easing[this.easing](this.elapsed / this.duration);
    }
    if (!this.started) {
      this.onStart && this.onStart(this.keys);
      this.started = true;
    }
    this.onUpdate(this.keys);
  }

  start() {
    this.startTime = Date.now() + this.delay;
    const tick = () => {
      this.update();
      this.timer = requestAnimationFrame(tick);
      if (this.finished) {
        cancelAnimationFrame(this.timer);
        this.timer = null;
      }
    };
    tick();
  }

  stop() {
    cancelAnimationFrame(this.timer);
    this.timer = null;
  }
}
