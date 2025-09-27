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

  isColliding() {
    return this.ghosts.some((ghost) => this.pacman.isCollidingWithGhost(ghost));
  }

  loop() {
    requestAnimationFrame(() => {
      this.counter++;

      this.loop();
      this.clean();

      // take care of projectiles
      this.projectiles.forEach((projectile) => {
        projectile.update();
        let projectileTjBeRemoved = false;

        this.ghosts.forEach((ghost) => {
          if (ghost.isCircleCollidingWithHead(projectile)) {
            ghost.opacity = ghost.opacity - 0.1;
            if (ghost.opacity <= 0.5) {
              this.ghosts.splice(this.ghosts.indexOf(ghost), 1);
              for (let i = 0; i < 3; i++) {
                const ghostSize = ghost.width / 25 - 1;
                const newGhost = ghost.clone({ size: ghostSize * 25 });
                this.ghosts.push(newGhost);
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

      this.ghosts.forEach((ghost) => {
        // pacman eats the smallest of ghosts
        if (this.pacman.isCollidingWithGhost(ghost) && ghost.width == 25) {
          this.ghosts.splice(this.ghosts.indexOf(ghost), 1);
          return;
        }
        ghost.update();
      });

      // randomize movement of 1/3 of ghosts
      if (this.counter % 100 === 0) {
        sample(this.ghosts, Math.ceil(this.ghosts.length / 3)).forEach(
          (ghost) => ghost.speed.random()
        );
      }

      this.pacman.update();
    });
  }
}
