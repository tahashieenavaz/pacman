import Ghost from "./Ghost";

export default class PinkGhost extends Ghost {
  constructor(board, prime) {
    super(board);
    this.prime = prime;
  }

  updateColor() {
    this.color = `rgb(235, 145, 190, ${this.opacity})`;
  }
}
