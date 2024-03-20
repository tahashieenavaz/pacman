import { pi } from "../helpers";
import Speed from "./Speed";

export default class Movable {
  constructor() {
    this.speed = new Speed(3);
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.rotation = 0;
  }

  event() {
    addEventListener("keydown", (e) => {
      if (typeof this[`${e.key}Pressed`] === "function") {
        this[`${e.key}Pressed`]();
      }
    });
  }

  ArrowRightPressed() {
    this.rotation = 0;
    this.speed.right();
  }

  ArrowLeftPressed() {
    this.rotation = pi();
    this.speed.left();
  }

  ArrowUpPressed() {
    this.rotation = -pi(0.5);
    this.speed.up();
  }

  ArrowDownPressed() {
    this.rotation = pi(0.5);
    this.speed.down();
  }

  draw() {}

  update() {
    this.tick();
    this.draw();
  }

  tick() {
    this.x += this.speed.x;
    this.y += this.speed.y;

    this.bringBack();
  }

  bringBack() {
    if (!this.width || !this.height) {
      this.width = this.height = this.size;
    }

    if (this.x > innerWidth + this.width) {
      this.x = -this.width;
    }

    if (this.x < -this.width) {
      this.x = innerWidth + this.width;
    }

    if (this.y < -this.height) {
      this.y = innerHeight + this.height;
    }

    if (this.y > innerHeight + this.height) {
      this.y = -this.height;
    }
  }
}
