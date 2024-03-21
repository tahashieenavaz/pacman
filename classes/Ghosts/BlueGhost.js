import Ghost from "./Ghost";

export default class BlueGhost extends Ghost {
  constructor(board, prime) {
    super(board);
    this.prime = prime;
    this.color = "#57bfcc";
  }
}
