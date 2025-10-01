import "./style.css";
import Board from "./classes/Board";

const board = new Board();
const section = document.querySelector("section");

function startGame() {
  section.remove();
  board.playAudio("start");
  board.addElement();

  // render the first frame
  board.loop(true);

  // start sound is 4000
  // setTimeout(() => board.loop(), 4000);
  board.loop();

  window.removeEventListener("keydown", startGame);
}

// press any key to start
window.addEventListener("keydown", startGame);
