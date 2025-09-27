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

  // Replace the stub with this implementation inside the Pacman class
  isCollidingWithGhost(ghost) {
    const pacX = this.x;
    const pacY = this.y;
    const pacR = this.size;

    const headX = ghost.x;
    const headY = ghost.y;
    const headR = ghost.width / 2;

    const dxH = pacX - headX;
    const dyH = pacY - headY;
    const distH = Math.hypot(dxH, dyH);
    if (distH <= pacR + headR) return true;

    const bodyLeft = ghost.x - ghost.width;
    const bodyRight = ghost.x;
    const bodyTop = ghost.y - ghost.height / 2;
    const bodyBottom = ghost.y + ghost.height / 2 - ghost.width / 2;

    const closestX = Math.max(bodyLeft, Math.min(pacX, bodyRight));
    const closestY = Math.max(bodyTop, Math.min(pacY, bodyBottom));

    const dxR = pacX - closestX;
    const dyR = pacY - closestY;
    const distR = Math.hypot(dxR, dyR);
    if (distR <= pacR) return true;

    const triSize = ghost.width / 3;
    const baseY = ghost.y + ghost.height / 2 - triSize / 6;

    const pointInCircle = (px, py) => {
      const d = Math.hypot(px - pacX, py - pacY);
      return d <= pacR;
    };

    for (let i = 0; i < 3; i++) {
      const tipX =
        ghost.x -
        ghost.width +
        i * triSize +
        triSize / 2 +
        (ghost.board ? ghost.board.sinCounter(1, 8) : 0);
      const tipY = baseY;
      const leftX = tipX - triSize / 2;
      const rightX = tipX + triSize / 2;
      const baseY2 = tipY + triSize / 2;

      if (
        pointInCircle(tipX, tipY) ||
        pointInCircle(leftX, baseY2) ||
        pointInCircle(rightX, baseY2)
      ) {
        return true;
      }
    }

    return false;
  }
}
