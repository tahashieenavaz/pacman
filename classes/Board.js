import Pacman from "./Pacman";
import Ghost from "./ghosts/Ghost";
import RedGhost from "./ghosts/RedGhost";
import PinkGhost from "./ghosts/PinkGhost";
import BlueGhost from "./ghosts/BlueGhost";
import { sample, shuffle, oneOf } from "../helpers";

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
      // new Ghost({ board: this }),
      new BlueGhost({ board: this }),
      // new RedGhost({ board: this }),
      // new PinkGhost({ board: this }),
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
              if (Math.random() < 0.6) {
                for (let i = 0; i < 2; i++) {
                  const size = oneOf([1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4]);
                  this.ghosts.push(
                    ghost.clone({ board: this, size: size * 25 })
                  );
                }
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
      // if (this.counter % 100 === 0) {
      //   sample(this.ghosts, Math.ceil(this.ghosts.length / 3)).forEach(
      //     (ghost) => ghost.speed.random()
      //   );
      // }
      this.pacman.update();
    });
  }
}
