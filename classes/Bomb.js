import { isolate } from "../helpers";

export default class Bomb {
  constructor(board, x, y) {
    this.board = board;
    this.context = this.board.context;
    this.x = x;
    this.y = y;
    this.plantingTime = Date.now();
  }

  draw() {
    isolate(this.context, (context) => {
      context.font = "48px Arial";
      context.textAlign = "center";
      context.fillText("💣", this.x, this.y);
    });
  }

  update() {
    this.draw();
  }
}
