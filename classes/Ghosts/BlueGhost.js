import Ghost from "./Ghost";

export default class BlueGhost extends Ghost {
  constructor(board, prime) {
    super(board);
    this.prime = prime;
  }

  updateColor() {
    this.color = `rgb(87, 191, 204, ${this.opacity})`;
  }
}
