import "./styles.css";

const board_size = 5;
const players = ["x", "o"];
const board = [];

let player1Turn = true;
let moves = 0;

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
  for (var row = 0; row < board_size; row++) {
    var tr = document.createElement("TR");
    board.push([]);
    for (var col = 0; col < board_size; col++) {
      var td = document.createElement("TD");
      td.setAttribute("height", 60);
      td.setAttribute("width", 60);
      td.setAttribute("align", "center");
      td.setAttribute("valign", "center");
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

function makeMove(e) {
  if (e.innerHTML !== "") {
    return;
  }
  e.innerHTML = player1Turn ? players[0] : players[1];
  moves++;
  if (checkWin()) {
    alert("Player " + (player1Turn ? "1" : "2") + " won!");
  } else if (moves === board_size * board_size) {
    alert("Draw!");
  } else {
    player1Turn = !player1Turn;
  }
}
