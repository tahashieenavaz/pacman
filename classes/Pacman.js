import Movable from "./Movable";

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
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.rotation);
    this.context.beginPath();
    this.context.arc(0, 0, this.r, -angle, angle, true);
    this.context.lineTo(0, 0);
    this.context.fillStyle = "#ffeb3b";
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }
}
