import { isolate, pi, triangle } from "../helpers";
import Movable from "./Movable";
import Repository from "./Repository";

export default class Ghost extends Movable {
  constructor(board, prime) {
    super();

    const ghostCount = Repository.incrementGhost();

    this.prime = prime;
    this.board = board;
    this.context = this.board.context;
    this.width = 3 * 25;
    this.height = this.width * 1.2;
    this.x = innerWidth / 2 - this.width * 2 + this.width * ghostCount;
    this.y = innerHeight / 2;

    this.color = "#fab234";
  }

  update() {
    super.update();

    if (this.board.counter % this.prime === 0) {
      this.speed.random();
    }
  }
  draw() {
    isolate(this.context, (c) => {
      c.translate(this.x, this.y);

      // head
      c.fillStyle = this.color;
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
          -this.width + i * tsize + tsize / 2 + this.board.sinCounter(1, 8),
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

      c.beginPath();
      c.fillStyle = "black";
      c.arc(-this.width / 4, 0, this.width / 16, 0, pi(2));
      c.arc(-this.width + this.width / 4, 0, this.width / 16, 0, pi(2));
      c.fill();
      c.closePath();
    });
  }
}
