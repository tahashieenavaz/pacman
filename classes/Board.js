import Pacman from "./Pacman";
import Ghost from "./Ghosts/Ghost";
import RedGhost from "./Ghosts/RedGhost";
import PinkGhost from "./Ghosts/PinkGhost";
import BlueGhost from "./Ghosts/BlueGhost";
import { primes, shuffle, oneOf } from "../helpers";

export default class Board {
  constructor() {
    const primeNumbers = primes();

    this.counter = 0;
    this.element = document.createElement("canvas");
    this.context = this.element.getContext("2d");
    this.element.width = innerWidth;
    this.element.height = innerHeight;

    this.projectiles = [];
    this.pacman = new Pacman(this);
    this.ghosts = shuffle([
      new Ghost({ board: this, prime: primeNumbers[0] }),
      new BlueGhost({ board: this, prime: primeNumbers[1] }),
      new RedGhost({ board: this, prime: primeNumbers[4] }),
      new PinkGhost({ board: this, prime: primeNumbers[10] }),
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

      this.projectiles.forEach((projectile) => {
        projectile.update();
        let projectileTjBeRemoved = false;

        this.ghosts.forEach((ghost) => {
          if (ghost.isCircleCollidingWithHead(projectile)) {
            ghost.opacity = ghost.opacity - 0.1;
            if (ghost.opacity <= 0.5) {
              this.ghosts.splice(this.ghosts.indexOf(ghost), 1);
              for (let i = 0; i < 2; i++) {
                const size = oneOf([1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4]);
                this.ghosts.push(ghost.clone({ board: this, size: size * 25 }));
              }
            }
            projectileTjBeRemoved = true;
          }
        });

        if (projectile.shouldBeRemoved() || projectileTjBeRemoved) {
          this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
          return;
        }
      });

      this.ghosts.forEach((ghost) => ghost.update());
      this.pacman.update();
    });
  }
}
