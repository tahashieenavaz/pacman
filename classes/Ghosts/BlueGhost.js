import Ghost from "./Ghost";

export default class BlueGhost extends Ghost {
  constructor(board) {
    super(board);
  }

  updateColor() {
    this.color = `rgb(87, 191, 204, ${this.opacity})`;
  }
}
