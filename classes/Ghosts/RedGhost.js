import Ghost from "./Ghost";

export default class RedGhost extends Ghost {
  constructor(board, prime) {
    super(board);
    this.prime = prime;
  }

  updateColor() {
    this.color = `rgb(228, 13, 25, ${this.opacity})`;
  }
}
