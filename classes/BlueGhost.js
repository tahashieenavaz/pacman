import Ghost from "./Ghost";

export default class BlueGhost extends Ghost {
  constructor(board) {
    super(board);
    this.color = "#57bfcc";
  }
}
