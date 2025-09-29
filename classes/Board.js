import Pacman from "./Pacman";
import Ghost from "./ghosts/Ghost";
import RedGhost from "./ghosts/RedGhost";
import PinkGhost from "./ghosts/PinkGhost";
import BlueGhost from "./ghosts/BlueGhost";
import { sample, shuffle } from "../helpers";

export default class Board {
  constructor() {
    this.counter = 0;
    this.element = document.createElement("canvas");
    this.context = this.element.getContext("2d");
    this.element.width = innerWidth;
    this.element.height = innerHeight;

    this.projectiles = [];
    this.pacman = new Pacman(this);
    this.ghosts = shuffle([
      new Ghost({ board: this }),
      new BlueGhost({ board: this }),
      new RedGhost({ board: this }),
      new PinkGhost({ board: this }),
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

  loop() {
    requestAnimationFrame(() => {
      this.counter++;

      this.loop();
      this.clean();

      // take care of projectiles
      this.projectiles.forEach((projectile) => {
        projectile.update();
        let projectileRemovalFlag = false;
        if (projectile.shouldBeRemoved() || projectileRemovalFlag) {
          this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
          return;
        }
      });

      this.ghosts.forEach((ghost) => {
        // TODO: pacman eats the smallest of ghosts

        if (this.pacman.isCollidingWithGhost(ghost)) {
          ghost.speed.zero();
        }

        ghost.update();
      });

      // randomize movement of 1/3 of ghosts every 100 tick
      if (this.counter % 100 === 0) {
        sample(this.ghosts, Math.ceil(this.ghosts.length / 3)).forEach(
          (ghost) => ghost.speed.random()
        );
      }

      this.pacman.update();
    });
  }
}
