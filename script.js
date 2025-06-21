const board = document.getElementById("board");
const resetBtn = document.getElementById("resetBtn");
let turn = "X";
let moves = [];
let gameState = Array(9).fill(""); // ["", "", "", "", "", "", "", "", ""]
let gameOver = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];


// Create 9 cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  board.appendChild(cell);
}

// Add click logic
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    if (gameOver) return;
    
    const index = cell.dataset.index;

    if (cell.innerText !== "") return;

    cell.innerText = turn;
    moves.push({ index, player: turn });

    // Remove oldest move if more than 3
    if (moves.length > 6) {
      const oldest = moves.shift();
      const oldCell = document.querySelector(`.cell[data-index="${oldest.index}"]`);
      oldCell.innerText = "";
    }

    // Switch turn
    turn = turn === "X" ? "O" : "X";
  });
});

// Reset button logic
resetBtn.addEventListener("click", () => {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.innerText = "";
  });
  turn = "X";
  moves = [];
});
