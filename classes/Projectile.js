import Movable from "./Movable";
import { isolate, pi } from "../helpers";

export default class Projectile extends Movable {
  constructor(pacman, factor = 4) {
    super();

    this.board = pacman.board;
    this.factor = factor;
    this.speed.x = pacman.speed.x * this.factor;
    this.speed.y = pacman.speed.y * this.factor;
    this.size = 10;

    this.x = pacman.x;
    this.y = pacman.y;
    this.shootingTime = Date.now();

    this.context = this.board.context;
  }

  draw() {
    isolate(this.context, (context) => {
      context.arc(this.x, this.y, this.size, 0, pi(2));
      context.fillStyle = `rgba(255, 255, 255, 1)`;
      context.fill();
    });
  }

  opacity() {
    const currentTime = Date.now();
    const difference = currentTime - this.shootingTime;
    return 1 - difference / 500;
  }
}
