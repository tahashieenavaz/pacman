import Movable from "./Movable";
import { isolate, pi } from "../helpers";

export default class Projectile extends Movable {
  constructor(pacman, factor = 4) {
    super();

    this.board = pacman.board;
    this.factor = factor;

    this.speed.base = 10;
    this.speed[pacman.speed.direction]();

    this.size = 5;

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

  shouldBeRemoved() {
    const currentTime = Date.now();
    const difference = currentTime - this.shootingTime;
    return difference > 1000;
  }
}
