import Ghost from "./Ghost";

export default class PinkGhost extends Ghost {
  constructor(board, x, y) {
    super(board, x, y);

    this.color = "#eb91be";
  }
}
