import Ghost from "./Ghost";

export default class RedGhost extends Ghost {
  constructor(board, prime) {
    super(board);
    this.prime = prime;
    this.color = "#e40d19";
  }
}
