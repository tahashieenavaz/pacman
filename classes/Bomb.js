import { isolate, pi } from "../helpers";

export default class Bomb {
  constructor(board, x, y) {
    this.board = board;
    this.context = this.board.context;
    this.x = x;
    this.y = y;
    this.plantingTime = Date.now();

    this.bigSize = 0;
    this.smallSize = 0;
  }

  draw() {
    isolate(this.context, (context) => {
      context.beginPath();
      context.fillStyle = "#f9b64e";
      context.arc(this.x, this.y, this.bigSize, 0, pi(2));
      context.fill();
      context.closePath();

      context.beginPath();
      context.fillStyle = "#cb353d";
      context.arc(this.x, this.y, this.smallSize, 0, pi(2));
      context.fill();
      context.closePath();

      context.beginPath();
      context.font = "48px Arial";
      context.textAlign = "center";
      context.fillText("💣", this.x, this.y);
      context.closePath();
    });
  }

  update() {
    this.draw();
  }

  shouldDetonate() {
    return Date.now() - this.plantingTime > 100;
  }
}
