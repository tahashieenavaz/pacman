import { isolate, pi } from "../helpers";

export default class Bomb {
  constructor(board, x, y) {
    this.board = board;
    this.context = this.board.context;
    this.x = x;
    this.y = y;
    this.plantingTime = Date.now();
  }
  alpha() {
    const difference = (Date.now() - this.plantingTime) / 50;
    return (1 + Math.sin(difference)) / 2;
  }

  draw() {
    isolate(this.context, (context) => {
      context.beginPath();
      context.setLineDash([5, 5]);
      context.arc(this.x, this.y - 10, 150, 0, pi(2));
      context.strokeStyle = "red";
      context.lineWidth = 2;
      context.stroke();
      context.closePath();

      context.globalAlpha = this.alpha();
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
    return Date.now() - this.plantingTime > 1000;
  }
}
