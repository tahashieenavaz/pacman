import Pacman from "./Pacman";
import Ghost from "./Ghosts/Ghost";
import RedGhost from "./Ghosts/RedGhost";
import PinkGhost from "./Ghosts/PinkGhost";
import BlueGhost from "./Ghosts/BlueGhost";
import { primes, shuffle } from "../helpers";

export default class Board {
  constructor() {
    const primeNumbers = primes();

    this.counter = 0;
    this.element = document.createElement("canvas");
    this.context = this.element.getContext("2d");
    this.element.width = innerWidth;
    this.element.height = innerHeight;

    this.pacman = new Pacman(this);
    this.ghosts = shuffle([
      new Ghost(this, primeNumbers[0]),
      new BlueGhost(this, primeNumbers[1]),
      new RedGhost(this, primeNumbers[2]),
      new PinkGhost(this, primeNumbers[3]),
    ]);
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

  isColliding() {
    return this.ghosts.some((ghost) => this.pacman.isCollidingWithGhost(ghost));
  }

  loop() {
    requestAnimationFrame(() => {
      this.counter++;

      this.loop();
      this.clean();

      this.ghosts.forEach((ghost) => ghost.update());
      this.pacman.update();
      this.isColliding();
    });
  }
}
