import "./style.css";
import Board from "./classes/Board";

const board = new Board();

function startGame() {
  board.play("start");
  board.addElement();
  board.loop(true);

  // start sound is 4000
  setTimeout(() => board.loop(), 4000);

  window.removeEventListener("keydown", startGame);
}

// press any key to start
window.addEventListener("keydown", startGame);
