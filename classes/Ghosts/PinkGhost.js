import Ghost from "./Ghost";

export default class PinkGhost extends Ghost {
  constructor(board) {
    super(board);
  }

  updateColor() {
    this.color = `rgb(235, 145, 190, ${this.opacity})`;
  }
}
