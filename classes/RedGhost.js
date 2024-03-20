import Ghost from "./Ghost";

export default class RedGhost extends Ghost {
  constructor(board) {
    super(board);
    this.color = "#e40d19";
  }
}
