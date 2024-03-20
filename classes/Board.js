import Pacman from "./Pacman";
import Ghost from "./Ghost";
import RedGhost from "./RedGhost";
import PinkGhost from "./PinkGhost";
import BlueGhost from "./BlueGhost";
import { isolate, rand } from "../helpers";

export default class Board {
  constructor() {
    this.counter = 0;
    this.element = document.createElement("canvas");
    this.context = this.element.getContext("2d");
    this.element.width = innerWidth;
    this.element.height = innerHeight;

    this.pacman = new Pacman(this);
    this.ghosts = [
      new Ghost(this, rand(0, innerWidth), rand(0, innerHeight)),
      new BlueGhost(this, rand(0, innerWidth), rand(0, innerHeight)),
      new RedGhost(this, rand(0, innerWidth), rand(0, innerHeight)),
      new PinkGhost(this, rand(0, innerWidth), rand(0, innerHeight)),
    ].sort(() => 0.5 - Math.random());
  }

  element() {
    return this.element;
  }

  addElement() {
    document.body.appendChild(this.element);
  }

  clean() {
    isolate(this.context, (c) => {
      this.fillStyle = "rgba(21,21,21,0.1)";
      this.context.fillRect(0, 0, innerWidth, innerHeight);
    });
  }

  sinCounter(coeff = 1, scoeff) {
    return coeff * Math.sin(this.counter / scoeff);
  }

  loop() {
    requestAnimationFrame(() => {
      this.counter++;

      this.loop();
      this.clean();

      this.ghosts.forEach((ghost) => ghost.update());
      this.pacman.update();
    });
  }
}
