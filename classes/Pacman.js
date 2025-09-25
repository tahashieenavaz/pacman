import Movable from "./Movable";
import Projectile from "./Projectile";
import Speed from "./Speed";
import { isolate, pi } from "../helpers";

export default class Pacman extends Movable {
  constructor(board) {
    super();

    this.board = board;
    this.context = board.context;
    this.x = 100;
    this.y = 100;
    this.size = 35;
    this.fraction = 10;
    this.speed = new Speed(6);

    this.event();
  }

  isCollidingWithGhost(ghost) {
    return false;
  }

  stick() {
    this.speed.zero();
    window.addEventListener("mousemove", (e) => {
      this.x = e.x;
      this.y = e.y;
    });
  }

  // used for launching projectiles
  SpacePressed() {
    const projectile = new Projectile(this);
    this.board.projectiles.push(projectile);
  }

  draw() {
    const angle = pi() / this.fraction + this.board.sinCounter(0.2, 8);

    isolate(this.context, (c) => {
      c.translate(this.x, this.y);
      c.rotate(this.rotation);
      c.arc(0, 0, this.size, -angle, angle, true);
      c.lineTo(0, 0);
      c.fillStyle = "#ffeb3b";
      c.fill();
    });
  }
}
