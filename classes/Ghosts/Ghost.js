import { isolate, pi, triangle, oneOf, primes } from "../../helpers";
import Movable from "../Movable";
import Repository from "../Repository";

export default class Ghost extends Movable {
  constructor(board, prime) {
    super();

    const ghostCount = Repository.incrementGhost();

    this.prime = prime;
    this.board = board;
    this.context = this.board.context;
    this.width = 3 * 25;
    this.height = this.width * 1.2;
    this.average = (this.width + this.height) / 2;
    this.x = innerWidth / 2 - this.width * 2 + this.width * ghostCount;
    this.y = innerHeight / 2;

    this.color = "#fab234";
    this.health = 100;

    this.speed.random();
  }

  rectangle() {
    return [
      [this.x - this.width, this.y - this.height / 2],
      [this.x, this.y + this.height / 2],
    ];
  }

  update() {
    super.update();
    if (this.board.counter % this.prime === 0) {
      this.speed.random();
      this.prime = oneOf(primes());
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

      // triangles which move due to the sinCounter
      const triangleSize = this.width / 3;
      for (let i = 0; i < 3; i++) {
        triangle(
          c,
          -this.width +
            i * triangleSize +
            triangleSize / 2 +
            this.board.sinCounter(1, 8),
          this.height / 2 - triangleSize / 6,
          triangleSize
        );
      }

      // outer white part of eyes
      c.beginPath();
      c.fillStyle = "white";
      c.arc(-this.width / 4, 0, this.width / 8, 0, pi(2));
      c.arc(-this.width + this.width / 4, 0, this.width / 8, 0, pi(2));
      c.fill();
      c.closePath();

      // inner black part of eyes
      c.beginPath();
      c.fillStyle = "black";
      c.arc(-this.width / 4, 0, this.width / 16, 0, pi(2));
      c.arc(-this.width + this.width / 4, 0, this.width / 16, 0, pi(2));
      c.fill();
      c.closePath();
    });
  }
}
