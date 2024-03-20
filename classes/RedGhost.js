import Ghost from "./Ghost";

export default class RedGhost extends Ghost {
  constructor(board, x, y) {
    super(board, x, y);

    this.color = "#e40d19";
  }
}
