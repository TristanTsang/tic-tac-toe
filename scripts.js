function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

game = (function () {
  const players = [new Player("Player 1", "X"), new Player("Player 2", "O")];

  const gameBoard = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];
  let moveCounter = 0;
  let currentPlayer = players[0];
  let gameOver = false;

  const makeMove = function (x, y) {
    if (x > 2 || y > 2 || x < 0 || y < 0) {
      console.log("Out of Bounds!");
      return;
    }
    if (gameBoard[x][y] != "_") {
      console.log("Tile isn't empty!");
      return;
    }
    if (gameOver) {
      console.log("Game is over!");
      return;
    }
    if (moveCounter >= 9) {
      console.log("Game is over!");
      return;
    }

    gameBoard[x][y] = currentPlayer.marker;
    moveCounter++;
    checkGameOver(x, y);

    if (gameOver) {
      console.log("GAME OVER!!!");
    } else {
      if (currentPlayer == players[0]) currentPlayer = players[1];
      else currentPlayer = players[0];
    }

    return gameBoard;
  };

  const checkGameOver = function (x, y) {
    if (
      gameBoard[x][0] == gameBoard[x][1] &&
      gameBoard[x][0] == gameBoard[x][2]
    ) {
      gameOver = true;
    } else if (
      gameBoard[0][y] == gameBoard[1][y] &&
      gameBoard[0][y] == gameBoard[2][y]
    ) {
      gameOver = true;
    } else if (gameBoard[1][1] != "_") {
      if (
        gameBoard[0][0] == gameBoard[1][1] &&
        gameBoard[0][0] == gameBoard[2][2]
      )
        gameOver = true;
      else if (
        gameBoard[2][0] == gameBoard[1][1] &&
        gameBoard[2][0] == gameBoard[0][2]
      )
        gameOver = true;
    }
  };

  const getCurrentPlayer = function () {
    return currentPlayer;
  };
  const isGameOver = function () {
    return gameOver;
  };
  const getMoveCounter = function () {
    return moveCounter;
  };

  return { gameBoard, makeMove, isGameOver, getMoveCounter, getCurrentPlayer };
})();

const gameBoard = document.querySelector(".gameboard");
const body = document.body;

function createBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.dataset.row = i;
      div.dataset.col = j;
      div.addEventListener("click", handleClick);
      gameBoard.appendChild(div);
    }
  }
  const div = document.createElement("h2");
  div.classList.add("message");
  div.textContent =
    game.getCurrentPlayer().name +
    "'s turn | Marker: " +
    game.getCurrentPlayer().marker;
  body.appendChild(div);
}

function handleClick(event) {
  const cell = event.target;
  const message = document.querySelector(".message");
  if (game.makeMove(cell.dataset.row, cell.dataset.col) == null) return;
  cell.textContent = game.gameBoard[cell.dataset.row][cell.dataset.col];

  message.textContent =
    game.getCurrentPlayer().name +
    "'s turn | Marker: " +
    game.getCurrentPlayer().marker;
  if (game.isGameOver()) {
    console.log("PLAYER WINS");
    message.textContent = game.getCurrentPlayer().name + " wins!";
  } else if (game.getMoveCounter() >= 9) {
    message.textContent = "The game is a tie!";
  }
}

createBoard();
