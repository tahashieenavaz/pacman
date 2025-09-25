import { isolate, pi, triangle, oneOf, primes } from "../../helpers";
import Movable from "../Movable";
import Repository from "../Repository";
import Speed from "../Speed";

export default class Ghost extends Movable {
  constructor({ board, prime = null, size = 3 * 25 }) {
    const ghostCount = Repository.incrementGhost();
    if (!prime) {
      prime = oneOf(primes());
    }
    super();

    this.prime = prime;
    this.board = board;
    this.context = this.board.context;
    this.width = size;
    this.height = this.width * 1.2;
    this.average = (this.width + this.height) / 2;
    this.x = innerWidth / 2 - this.width * 2 + this.width * ghostCount;
    this.y = innerHeight / 2;
    this.opacity = 1;
    this.color = `rgba(250, 178, 52, ${this.opacity})`;

    this.speed = new Speed(oneOf([2, 3, 4, 5]));
    this.speed.random();
  }

  isCircleCollidingWithHead(movableCircle) {
    const dx = this.x - movableCircle.x;
    const dy = this.y - movableCircle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < movableCircle.size + this.width / 2;
  }

  rectangle() {
    return [
      [this.x - this.width, this.y - this.height / 2],
      [this.x, this.y + this.height / 2],
    ];
  }

  updateColor() {
    this.color = `rgba(250, 178, 52, ${this.opacity})`;
  }

  update() {
    this.updateColor();
    super.update();
  }

  drawHead(c) {
    c.fillStyle = this.color;
    c.arc(-this.width / 2, 0, this.width / 2, 0, pi(), true);
    c.fill();
  }

  drawBody(c) {
    c.fillRect(-this.width, 0, this.width, this.height - this.width / 2);
  }

  drawTail(c) {
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
  }

  drawEyes(c) {
    this.drawInnerEyes(c);
    this.drawOuterEyes(c);
  }

  drawOuterEyes(c) {
    c.beginPath();
    c.fillStyle = "black";
    c.arc(-this.width / 4, 0, this.width / 16, 0, pi(2));
    c.arc(-this.width + this.width / 4, 0, this.width / 16, 0, pi(2));
    c.fill();
    c.closePath();
  }

  drawInnerEyes(c) {
    c.beginPath();
    c.fillStyle = "white";
    c.arc(-this.width / 4, 0, this.width / 8, 0, pi(2));
    c.arc(-this.width + this.width / 4, 0, this.width / 8, 0, pi(2));
    c.fill();
    c.closePath();
  }

  draw() {
    isolate(this.context, (c) => {
      c.translate(this.x, this.y);

      this.drawHead(c);
      this.drawBody(c);
      this.drawTail(c);
      this.drawEyes(c);
    });
  }

  clone(config) {
    return new this.constructor(config);
  }
}
