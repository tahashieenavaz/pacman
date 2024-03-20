import { isolate, pi, triangle } from "../helpers";
import Movable from "./Movable";

export default class Ghost extends Movable {
  constructor(board) {
    super();
    this.board = board;
    this.context = this.board.context;
    this.x = 200;
    this.y = 100;
    this.width = 3 * 25;
    this.height = this.width * 1.2;
  }

  draw() {
    isolate(this.context, (c) => {
      c.translate(this.x, this.y);

      // head
      c.fillStyle = "red";
      c.arc(-this.width / 2, 0, this.width / 2, 0, pi(), true);
      c.fill();

      //body
      c.fillRect(-this.width, 0, this.width, this.height - this.width / 2);

      c.fillStyle = "#151515";

      // triangles
      const tsize = this.width / 3;
      for (let i = 0; i < 3; i++) {
        triangle(
          c,
          -this.width + i * tsize + tsize / 2,
          this.height / 2 - tsize / 6,
          tsize
        );
      }

      // eyes
      c.beginPath();
      c.fillStyle = "white";
      c.arc(-this.width / 4, 0, this.width / 8, 0, pi(2));
      c.arc(-this.width + this.width / 4, 0, this.width / 8, 0, pi(2));
      c.fill();
      c.closePath();
    });
  }
}
