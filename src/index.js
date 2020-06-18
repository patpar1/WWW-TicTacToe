import "./styles.css";

let width = 5;
let height = 5;

let board = [];
let player1 = "x";
let player2 = "o";
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
  for (var row = 0; row < height; row++) {
    var tr = document.createElement("TR");
    board.push([]);
    for (var col = 0; col < width; col++) {
      var td = document.createElement("TD");
      td.setAttribute("height", 60);
      td.setAttribute("width", 60);
      td.setAttribute("align", "center");
      td.setAttribute("valign", "center");
      td.addEventListener("click", makeMove);
      tr.appendChild(td);
      board[row].push(td);
    }
    document.getElementById("board").appendChild(tr);
  }
}

function currentPlayer() {
  return player1Turn ? player1 : player2;
}

function checkWin() {
  var check;
  var count = 0;

  var row;
  var col;

  // Rows:
  for (row = 0; row < height; row++) {
    for (col = 0; col < width; col++) {
      if (
        board[row][col].innerHTML !== "" &&
        board[row][col].innerHTML === check
      ) {
        count++;
        if (count >= 5) {
          return true;
        }
      } else {
        check = board[row][col].innerHTML;
        count = 1;
      }
    }
    check = null;
  }

  check = null;

  // Columns:
  for (col = 0; col < width; col++) {
    for (row = 0; row < height; row++) {
      if (
        board[row][col].innerHTML !== "" &&
        board[row][col].innerHTML === check
      ) {
        count++;
        if (count >= 5) {
          return true;
        }
      } else {
        check = board[row][col].innerHTML;
        count = 1;
      }
    }
    check = null;
  }

  check = null;

  // Diagonals 1:
  for (row = 2; row < height - 2; row++) {
    for (col = 2; col < width - 2; col++) {
      var i;

      for (i = -2; i <= 2; i++) {
        if (
          board[row + i][col + i].innerHTML !== "" &&
          board[row + i][col + i].innerHTML === check
        ) {
          count++;
          if (count >= 5) {
            return true;
          }
        } else {
          check = board[row + i][col + i].innerHTML;
          count = 1;
        }
      }
      check = null;
    }
  }

  check = null;

  // Diagonals 2:
  for (row = 2; row < height - 2; row++) {
    for (col = 2; col < width - 2; col++) {
      for (i = -2; i <= 2; i++) {
        if (
          board[row + i][col - i].innerHTML !== "" &&
          board[row + i][col - i].innerHTML === check
        ) {
          count++;
          if (count >= 5) {
            return true;
          }
        } else {
          check = board[row + i][col - i].innerHTML;
          count = 1;
        }
      }
      check = null;
    }
  }

  return false;
}

function expandBoard(i, j) {
  var x;
  var col;
  var row;
  var tr;
  var td;

  var tHeight;
  var tWidth;

  // Top
  if (i < 3) {
    tWidth = width;
    for (x = 0; x < 3 - i; x++) {
      tr = document.createElement("TR");
      board.unshift([]);
      height++;
      for (col = 0; col < tWidth; col++) {
        td = document.createElement("TD");
        td.setAttribute("height", 60);
        td.setAttribute("width", 60);
        td.setAttribute("align", "center");
        td.setAttribute("valign", "center");
        td.addEventListener("click", makeMove);
        tr.appendChild(td);
        board[0].push(td);
      }
      document.getElementById("board").insertAdjacentElement("afterbegin", tr);
    }
  }

  // Bottom
  else if (i > height - 4) {
    tHeight = height;
    tWidth = width;
    for (x = 0; x < i - (tHeight - 3) + 1; x++) {
      tr = document.createElement("TR");
      board.push([]);
      height++;
      for (col = 0; col < tWidth; col++) {
        td = document.createElement("TD");
        td.setAttribute("height", 60);
        td.setAttribute("width", 60);
        td.setAttribute("align", "center");
        td.setAttribute("valign", "center");
        td.addEventListener("click", makeMove);
        tr.appendChild(td);
        board[board.length - 1].push(td);
      }
      document.getElementById("board").appendChild(tr);
    }
  }

  // Left
  if (j < 3) {
    tHeight = height;
    tWidth = width;
    for (x = 0; x < 3 - j; x++) {
      width++;
      for (row = 0; row < tHeight; row++) {
        td = document.createElement("TD");
        td.setAttribute("height", 60);
        td.setAttribute("width", 60);
        td.setAttribute("align", "center");
        td.setAttribute("valign", "center");
        td.addEventListener("click", makeMove);
        document
          .getElementById("board")
          .getElementsByTagName("TR")
          [row].insertAdjacentElement("afterbegin", td);
        board[row].unshift(td);
      }
    }
  }

  // Right
  else if (j > width - 4) {
    tHeight = height;
    tWidth = width;
    for (x = 0; x < j - (tWidth - 3) + 1; x++) {
      width++;
      for (row = 0; row < tHeight; row++) {
        td = document.createElement("TD");
        td.setAttribute("height", 60);
        td.setAttribute("width", 60);
        td.setAttribute("align", "center");
        td.setAttribute("valign", "center");
        td.addEventListener("click", makeMove);
        document
          .getElementById("board")
          .getElementsByTagName("TR")
          [row].appendChild(td);
        board[row].push(td);
      }
    }
  }
}

function makeMove() {
  if (this.innerHTML !== "") {
    return;
  }
  this.innerHTML = currentPlayer();
  moves++;
  if (checkWin()) {
    alert("Player " + (player1Turn ? "1" : "2") + " won!");
  } else if (moves === width * height) {
    alert("Draw!");
  } else {
    player1Turn = !player1Turn;

    var i;
    var j;

    //Expand the game board:
    for (var row = 0; row < height; row++) {
      for (var col = 0; col < width; col++) {
        if (board[row][col] === this) {
          i = row;
          j = col;
        }
      }
    }

    // expandBoard(i, j);
  }
}
