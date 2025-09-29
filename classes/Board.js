import Pacman from "./Pacman";
import Ghost from "./ghosts/Ghost";
import RedGhost from "./ghosts/RedGhost";
import PinkGhost from "./ghosts/PinkGhost";
import BlueGhost from "./ghosts/BlueGhost";
import Score from "./Score";
import { sample, shuffle, redBackground } from "../helpers";

export default class Board {
  constructor() {
    this.counter = 0;
    this.element = document.createElement("canvas");
    this.context = this.element.getContext("2d");
    this.element.width = innerWidth;
    this.element.height = innerHeight;
    this.projectiles = [];
    this.score = new Score(this);
    this.pacman = new Pacman(this);
    this.ghosts = shuffle([
      new Ghost({ board: this }),
      new BlueGhost({ board: this }),
      new RedGhost({ board: this }),
      new PinkGhost({ board: this }),
    ]);
    this.decreased = false;
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
      this.score.update();

      // take care of projectiles
      const toBeRemovedProjectiles = new Set();
      for (
        let projectileCounter = 0;
        projectileCounter < this.projectiles.length;
        projectileCounter++
      ) {
        const projectile = this.projectiles[projectileCounter];
        projectile.update();

        for (
          let ghostCounter = 0;
          ghostCounter < this.ghosts.length;
          ghostCounter++
        ) {
          const ghost = this.ghosts[ghostCounter];
          const isCollidingWithGhost = projectile.isCollidingWithGhost(ghost);
          const isGhostSmallest = ghost.size === 1;
          // smallest ghosts doge projectiles
          if (isCollidingWithGhost && !isGhostSmallest) {
            ghost.opacity -= 0.05;
            if (ghost.opacity < 0.3) {
              this.score.add(4 - ghost.size);
              this.spawn(ghost, 3);
              this.ghosts.splice(this.ghosts.indexOf(ghost), 1);
            }
          }

          if (projectile.isExpired() || isCollidingWithGhost) {
            toBeRemovedProjectiles.add(projectileCounter);
          }
        }
      }

      // remove projectiles from array in one go
      this.projectiles = this.projectiles.filter(
        (_, i) => !toBeRemovedProjectiles.has(i)
      );

      this.ghosts.forEach((ghost, ghostIndex) => {
        // pacman eats the smallest of ghosts
        const isGhostSmallest = ghost.size === 1;
        const isColliding = this.pacman.isCollidingWithGhost(ghost);
        if (isColliding && isGhostSmallest) {
          this.score.increase(4);
          this.ghosts.splice(ghostIndex, 1);
        } else if (isColliding && !isGhostSmallest) {
          this.score.decrease(ghost.size / 20);
          redBackground();
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

  randomGhosts(oldGhost, count) {
    return Array(count)
      .fill()
      .map(() => {
        const newSize = Math.max(1, oldGhost.size - 1);
        const newGhost = oldGhost.clone({ size: newSize });
        newGhost.randomLocation();
        return newGhost;
      });
  }

  spawn(oldGhost, count = 3) {
    let newGhosts = this.randomGhosts(oldGhost, count);
    while (
      newGhosts
        .map((ghost) => this.pacman.isCollidingWithGhost(ghost))
        .some(Boolean)
    ) {
      newGhosts = this.randomGhosts(oldGhost, count);
    }
    this.ghosts = [...this.ghosts, ...newGhosts];
  }
}
