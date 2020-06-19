import "./styles.css";

const board_size = 5;
const players = ["x", "o"];
const board = [];

let player1Turn = true;
let moves = 0;
let time = 10;
let bar = null;
let id = null;

if (document.readyState !== "loading") {
  console.log("Document ready, executing");
  init();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    console.log("Document ready, executing after a wait");
    init();
  });
}

function init() {
  console.log("Initializing...");
  for (let row = 0; row < board_size; row++) {
    let tr = document.createElement("TR");
    board.push([]);
    for (let col = 0; col < board_size; col++) {
      let td = document.createElement("TD");
      td.addEventListener("click", event => {
        makeMove(event.target);
        event.stopPropagation();
      });
      tr.appendChild(td);
      board[row].push(td);
    }
    document.getElementById("board").appendChild(tr);
  }
  console.log("Board initialized!");
  start_game();
}

function start_game() {
  bar = document.getElementById("progress_bar");
  id = setInterval(frame, 1000);
}

function equals(array) {
  return (
    array[0].innerHTML !== "" &&
    array.every(x => x.innerHTML === array[0].innerHTML)
  );
}

function checkWin() {
  const d1 = [];
  const d2 = [];

  for (let i = 0; i < board_size; i++) {
    if (equals(board[i])) {
      return true;
    }

    var col = [];
    for (let j = 0; j < board_size; j++) {
      col.push(board[j][i]);
    }
    if (equals(col)) {
      return true;
    }

    d1.push(board[i][i]);
    d2.push(board[board_size - i - 1][i]);
  }
  if (equals(d1) || equals(d2)) {
    return true;
  }
  return false;
}

function frame() {
  if (time === 0) {
    player1Turn = !player1Turn;
    reset_timer();
  } else {
    time--;
    bar.style.width = 32 * time + "px";
    bar.innerHTML = time + "s";
  }
}

function reset_timer() {
  clearInterval(id);
  time = 10;
  id = setInterval(frame, 1000);
  bar.style.width = "320px";
  bar.innerHTML = "10s";
  if (player1Turn) {
    bar.className = "firstplayer";
  } else {
    bar.className = "secondplayer";
  }
}

function makeMove(e) {
  if (e.innerHTML !== "") {
    return;
  }
  e.innerHTML = player1Turn ? players[0] : players[1];
  e.className = player1Turn ? "firstplayer" : "secondplayer";
  moves++;
  if (checkWin()) {
    alert("Player " + (player1Turn ? "1" : "2") + " won!");
    clearInterval(id);
  } else if (moves === board_size * board_size) {
    alert("Draw!");
    clearInterval(id);
  } else {
    player1Turn = !player1Turn;
    reset_timer();
  }
}
