import { oneOf } from "../helpers";

export default class Speed {
  constructor(base = 1) {
    this.x = 0;
    this.y = 0;
    this.base = base;
    this.direction = "stationary";
  }

  zero() {
    this.set(0, 0);
  }

  stationary() {
    this.zero();
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  right() {
    this.set(this.base, 0);
    this.direction = "right";
  }

  left() {
    this.set(-this.base, 0);
    this.direction = "left";
  }

  up() {
    this.set(0, -this.base);
    this.direction = "up";
  }

  down() {
    this.set(0, this.base);
    this.direction = "down";
  }

  random() {
    const directions = ["left", "up", "down", "right"];
    const options = directions.filter((item) => item != this.direction);
    const direction = oneOf(options);
    this.direction = direction;
    return this[direction]();
  }
}
