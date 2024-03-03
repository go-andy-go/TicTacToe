const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let currentPlayer = 'X';

function printBoard() {
  console.log('  0 1 2');
  for (let i = 0; i < board.length; i++) {
    console.log(i + ' ' + board[i].join(' '));
  }
}

function checkWin() {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== ' ' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return true;
    }
    if (board[0][i] !== ' ' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return true;
    }
  }
  if (board[0][0] !== ' ' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return true;
  }
  if (board[0][2] !== ' ' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return true;
  }
  return false;
}

function isBoardFull() {
  for (let row of board) {
    for (let cell of row) {
      if (cell === ' ') {
        return false;
      }
    }
  }
  return true;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function playTurn(row, col) {
  if (row < 0 || row > 2 || col < 0 || col > 2 || board[row][col] !== ' ') {
    console.log('Invalid move! Try again.');
    return;
  }
  board[row][col] = currentPlayer;
  if (checkWin()) {
    console.log(currentPlayer + ' wins!');
    rl.close();
  } else if (isBoardFull()) {
    console.log('It\'s a draw!');
    rl.close();
  } else {
    switchPlayer();
    printBoard();
    rl.question(currentPlayer + '\'s turn. Enter row and column (e.g., 0 0): ', (input) => {
      const [row, col] = input.split(' ').map(Number);
      playTurn(row, col);
    });
  }
}

printBoard();
rl.question(currentPlayer + '\'s turn. Enter row and column (e.g., 0 0): ', (input) => {
  const [row, col] = input.split(' ').map(Number);
  playTurn(row, col);
});