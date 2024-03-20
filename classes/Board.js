import Pacman from "./Pacman";
import Ghost from "./Ghost";

export default class Board {
  constructor() {
    this.counter = 0;
    this.element = document.createElement("canvas");
    this.context = this.element.getContext("2d");
    this.element.width = innerWidth;
    this.element.height = innerHeight;

    this.pacman = new Pacman(this);
    this.ghosts = Array(4)
      .fill()
      .map(() => new Ghost());
  }

  element() {
    return this.element;
  }

  addElement() {
    document.body.appendChild(this.element);
  }

  clean() {
    this.context.clearRect(0, 0, innerWidth, innerHeight);
  }

  sinCounter(coeff = 1, scoeff) {
    return coeff * Math.sin(this.counter / scoeff);
  }

  loop() {
    requestAnimationFrame(() => {
      this.counter++;
      this.loop();
      this.clean();
      this.pacman.tick();
      this.pacman.draw();
    });
  }
}
