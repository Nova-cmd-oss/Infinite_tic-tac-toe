const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let board = Array(9).fill("");
let gameOver = false;
let moves = [];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  moves.push({ index: index, player: currentPlayer });

  // Remove old highlight if any
  document.querySelectorAll(".cell").forEach(cell => {
    cell.classList.remove("next-to-vanish");
  });


  // Remove oldest move if more than 6
  if (moves.length > 6) {
    const removed = moves.shift();
    board[removed.index] = "";
    const cell = cells[removed.index];
    cell.textContent = "";
    cell.classList.remove("next-to-vanish");
  }

  // Highlight oldest cell if 5 moves made
  if (moves.length >= 5) {
    const oldest = moves[0];
    cells[oldest.index].classList.add("next-to-vanish");
  }

  if (checkWin()) {
    alert(`${currentPlayer} wins!`);
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
  ];

  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[b] === board[c]
    );
  });
}

function resetGame() {
  board = Array(9).fill("");
  gameOver = false;
  moves = [];
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("next-to-vanish");
  });
}

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

resetBtn.addEventListener("click", resetGame);
