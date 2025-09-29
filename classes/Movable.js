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

  isCollidingWithGhostHead(ghost) {
    const headX = ghost.x - ghost.width / 2;
    const headY = ghost.y;
    const dx = headX - this.x;
    const dy = headY - this.y;
    const d = Math.hypot(dx, dy);
    return d < this.size + ghost.width / 2;
  }

  isCollidingWithGhostBody(ghost) {
    const bodyX = ghost.x - ghost.width;
    const bodyY = ghost.y;
    const closestX = Math.max(bodyX, Math.min(this.x, ghost.x));
    const closestY = Math.max(bodyY, Math.min(this.y, bodyY + ghost.height));
    const dx = this.x - closestX;
    const dy = this.y - closestY;
    const d = Math.hypot(dx, dy);

    return d < ghost.size;
  }

  isCollidingWithGhost(ghost) {
    return (
      this.isCollidingWithGhostHead(ghost) ||
      this.isCollidingWithGhostBody(ghost)
    );
  }

  event() {
    window.addEventListener("keydown", (e) => {
      const code = e.code;
      if (typeof this[`${code}Pressed`] === "function") {
        this[`${code}Pressed`]();
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
