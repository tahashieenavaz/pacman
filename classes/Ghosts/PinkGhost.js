import Ghost from "./Ghost";

export default class PinkGhost extends Ghost {
  constructor(board, prime) {
    super(board);
    this.prime = prime;
    this.color = "#eb91be";
  }
}
