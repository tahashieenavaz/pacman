import { oneOf } from "../helpers";

export default class Speed {
  constructor(base = 1) {
    this.x = 0;
    this.y = 0;
    this.base = base;
  }

  zero() {
    this.set(0, 0);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  right() {
    this.set(this.base, 0);
  }

  left() {
    this.set(-this.base, 0);
  }

  up() {
    this.set(0, -this.base);
  }

  down() {
    this.set(0, this.base);
  }

  random() {
    const option = oneOf(["left", "up", "down", "right"]);
    return this[option]();
  }
}
