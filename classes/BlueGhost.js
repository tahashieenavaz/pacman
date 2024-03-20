import Ghost from "./Ghost";

export default class BlueGhost extends Ghost {
  constructor(board, x, y) {
    super(board, x, y);

    this.color = "#57bfcc";
  }
}
