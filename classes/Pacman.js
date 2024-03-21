import Movable from "./Movable";
import { isolate, pi, distance } from "../helpers";

export default class Pacman extends Movable {
  constructor(board) {
    super();

    this.board = board;
    this.context = board.context;
    this.x = 100;
    this.y = 100;
    this.size = 35;
    this.fraction = 10;

    this.event();
  }

  isCollidingWithGhost(ghost) {
    const d = distance(this.x, this.y, ghost.x, ghost.y);

    isolate(this.context, (c) => {
      c.fillStyle = "red";
      c.arc(ghost.x - ghost.width / 2, ghost.y, 40, 0, pi(2));
      c.fill();
    });

    console.log(d);

    if (d < this.r + ghost.average) {
      console.log("Yes");
      return true;
    }
    return false;
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
