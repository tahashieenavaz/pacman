import Speed from "./Speed";

export default class Movable {
  constructor() {
    this.speed = new Speed(4);
    this.x = 0;
    this.y = 0;
    this.r = 0;
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
    this.rotation = Math.PI;
    this.speed.left();
  }

  ArrowUpPressed() {
    this.rotation = -Math.PI / 2;
    this.speed.up();
  }

  ArrowDownPressed() {
    this.rotation = Math.PI / 2;
    this.speed.down();
  }

  tick() {
    this.x += this.speed.x;
    this.y += this.speed.y;

    this.bringBack();
  }

  bringBack() {
    if (this.x > innerWidth + this.r) {
      this.x = -this.r;
    }

    if (this.x < -this.r) {
      this.x = innerWidth + this.r;
    }

    if (this.y < -this.r) {
      this.y = innerHeight + this.r;
    }

    if (this.y > innerHeight + this.r) {
      this.y = -this.r;
    }
  }
}
