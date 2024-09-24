// Declare variables
let options = ["", "", "", "", "", "", "", "", ""];
let winsConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let currentPlayer = "X";
let running = true;

// Take DOM
let cells = document.querySelectorAll(".square");
let playerTurn = document.querySelector(".player__turn");
let restartBtn = document.querySelector("button");

initizlizationGame();

function initizlizationGame() {
  cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
  });
  restartBtn.addEventListener("click", restartGame);
}

function changePlayer() {
  
  if(currentPlayer == "X"){
    currentPlayer = "O";
    return;
  }
  
  if(currentPlayer == "O"){
    currentPlayer = "X";
    return;
  }
  
}

function cellClicked() {
  
  let cellIndex = this.getAttribute("cell-index");

  // If area not empty or game not running
  if(this.textContent != "" || !running)
    return;

  updateCell(this, cellIndex);
  checkWin();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function checkWin() {

  let playerWon = false;

  for (let i = 0; i < winsConditions.length; i++) {

    // Take sub arrays on array wins
    let condition = winsConditions[i];

    // Looking for player values ​​by coordinates
    let cellA = options[condition[0]];
    let cellB = options[condition[1]];
    let cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }

    if (cellA == cellB && cellA == cellC && cellB == cellB) {

      // Change color on win row
      cells[condition[0]].style.color = "#97FF45";
      cells[condition[1]].style.color = "#97FF45";
      cells[condition[2]].style.color = "#97FF45";
      playerWon = true;
      break;
    }

  }

  // End game
  if(playerWon){
    playerTurn.textContent = `${currentPlayer}'s win!`;
    running = false;
  }
  // If game not end
  else{
    changePlayer();
    playerTurn.textContent = `${currentPlayer}'s turn`;
  }

  // If nobody wins
  if(!options.includes("") && !playerWon){
    playerTurn.textContent = `Draw!`;
    running = false;
  }

}

function restartGame() {

  // Choose X player
  currentPlayer = "X"
  playerTurn.textContent = `${currentPlayer}'s turn`;

  // Clear all oprions
  options.fill("");

  // Clear area play
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.color = "#1D1D1D";
  });

  running = true;
}
