import { isolate } from "../helpers";

export default class Score {
  constructor(board) {
    this.value = 0;
    this.board = board;
    this.context = this.board.context;
  }

  draw() {
    isolate(this.context, (context) => {
      context.fillStyle = "white";
      context.font = "30px Arial";
      context.textAlign = "left";
      context.textBaseline = "bottom";
      context.fillText(`Score: ${parseInt(this.value)}`, 20, innerHeight - 20);
    });
  }

  update() {
    this.draw();
  }

  add(increase = 1) {
    this.value += increase;
  }

  increase(increase = 1) {
    return this.add(increase);
  }

  decrease(decrease = 1) {
    this.value -= decrease;
  }
}
