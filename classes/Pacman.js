import Movable from "./Movable";
import { isolate } from "../helpers";

export default class Pacman extends Movable {
  constructor(board) {
    super();

    this.board = board;
    this.context = board.context;
    this.x = innerWidth / 2;
    this.y = innerHeight / 2;
    this.r = 20;
    this.fraction = 10;

    this.event();
  }

  draw() {
    const angle = Math.PI / this.fraction + this.board.sinCounter(0.2, 8);
    isolate(this.context, (c) => {
      c.translate(this.x, this.y);
      c.rotate(this.rotation);
      c.arc(0, 0, this.r, -angle, angle, true);
      c.lineTo(0, 0);
      c.fillStyle = "#ffeb3b";
      c.fill();
    });
  }
}
