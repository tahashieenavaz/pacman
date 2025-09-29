import { isolate, pi, oneOf, rand } from "../../helpers";
import Movable from "../Movable";
import Speed from "../Speed";

export default class Ghost extends Movable {
  constructor({ board, size = 4 }) {
    super();
    this.size = size;

    this.board = board;
    this.context = this.board.context;
    this.width = size * 25;
    this.height = this.width * 0.7;
    this.average = (this.width + this.height) / 2;
    this.x = innerWidth / 2 - this.width * 2 + this.width;
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

  drawBodyPath(c) {
    // the loop alternates between these two
    const heights = [0.8 * this.height, this.height];
    const triangles = 4;
    c.beginPath();
    c.moveTo(-this.width, 0);
    c.lineTo(-this.width, this.height);
    for (let i = 0; i < triangles * 2; i++) {
      const solidLineBase =
        -this.width + ((i + 1) * this.width) / (triangles * 2);
      const noise = Math.sin(Date.now() / 200);
      if (i === triangles * 2 - 1) {
        c.lineTo(solidLineBase, heights[i % 2]);
      } else {
        c.lineTo(solidLineBase + noise, heights[i % 2]);
      }
    }
    c.lineTo(0, 0);
    c.closePath();
  }

  drawBodyBase(c) {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(-this.width, 0, this.width, this.height);
    c.closePath();
    c.fill();
  }

  drawBody(c) {
    c.save();
    this.drawBodyPath(c);
    c.clip();
    this.drawBodyBase(c);
    c.restore();
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
      this.drawEyes(c);
    });
  }

  clone(config = {}) {
    config["board"] = this.board;
    return new this.constructor(config);
  }

  randomLocation() {
    this.x = rand(0, window.innerWidth);
    this.y = rand(0, window.innerHeight);
  }
}
