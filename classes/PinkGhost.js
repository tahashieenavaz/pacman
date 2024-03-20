import Ghost from "./Ghost";

export default class PinkGhost extends Ghost {
  constructor(board) {
    super(board);
    this.color = "#eb91be";
  }
}
