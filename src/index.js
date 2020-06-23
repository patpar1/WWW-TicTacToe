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
  let boxes = document.getElementsByClassName("col");
  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i];
    box.addEventListener("click", event => {
      makeMove(event.target);
      event.stopPropagation();
    });
  }
  for (var x = 0; x < board_size; x++) {
    board.push([]);
    for (var j = 0; j < board_size; j++) {
      board[x].push("");
    }
  }
  console.log("Board initialized!");
  start_game();
}

function start_game() {
  bar = document.getElementById("progress_bar");
  id = setInterval(frame, 1000);
}

function equals(array) {
  return array[0] !== "" && array.every(x => x === array[0]);
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
    bar.style = "width: " + 10 * time + "%";
  }
}

function reset_timer() {
  clearInterval(id);
  time = 10;
  id = setInterval(frame, 1000);
  bar.style = "width: 100%";
}

function makeMove(e) {
  if (e.innerHTML !== "") {
    return;
  }
  e.innerHTML = player1Turn ? players[0] : players[1];
  var id = e.id;
  board[Math.floor(id / board_size)][id % board_size] = player1Turn
    ? players[0]
    : players[1];
  e.className = "col s1 " + (player1Turn ? "firstplayer" : "secondplayer");
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
