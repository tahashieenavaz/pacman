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

  EnterPressed() {
    this.speed.x = 0;
    this.speed.y = 0;
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
