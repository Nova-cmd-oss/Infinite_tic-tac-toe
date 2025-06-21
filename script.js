const board = document.getElementById("board");
const resetBtn = document.getElementById("resetBtn");
let turn = "X";
let moves = [];
let gameState = Array(9).fill(""); // ["", "", "", "", "", "", "", "", ""]
let gameOver = false;
// let blockedIndex = null;


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

    const index = +cell.dataset.index;

    // if (cell.innerText !== "") return;
    if (gameState[index] !== "" /* || index === blockedIndex */) return;

    // marking the place here
    cell.innerText = turn;
    gameState[index] = turn;
    moves.push({ index, player: turn });

    //checking for a winner before removing the oldest move
    const winner = checkWinner();
    if (winner) {
        alert(`${winner} wins!`);
        gameOver = true;
        return;
    }

    // Remove oldest move if more than 6 moves are made
    if (moves.length >= 6) {

    //     if (blockedIndex !== null) {
    //         document.querySelector(`.cell[data-index="${blockedIndex}"]`)?.classList.remove("blocked");
    // }

        const oldest = moves.shift();
        const oldIndex = +oldest.index;
        gameState[oldIndex] = ""; // Updates the internal state
        const oldCell = document.querySelector(`.cell[data-index="${oldest.index}"]`);
        oldCell.innerText = "";
        // oldCell.classList.add("blocked");
        // blockedIndex = oldIndex;
    } else {
        // if no move was removed we will unblock any previously blocked cell
        // if (blockedIndex !== null) {
            // document.querySelector(`.cell[data-index="${blockedIndex}"]`)?.classList.remove("blocked");
            blockedIndex = null;
        // }
    }

    // Switch turn
    turn = turn === "X" ? "O" : "X";
  });
});

// Function to check for a winner

function checkWinner() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
    ) {
        return gameState[a]; // X or O
    }
  }
  return null;
}

// Reset button logic
resetBtn.addEventListener("click", () => {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.innerText = "";
    // cell.classList.remove("blocked");
  });
    turn = "X";
    moves = [];
    gameState = Array(9).fill("");
    gameOver = false;
    // blockedIndex = null;
});
