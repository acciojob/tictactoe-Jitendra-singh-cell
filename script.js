//your JS code here. If required.
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitButton = document.getElementById('submit');
const messageDiv = document.getElementById('message');
const boardDiv = document.getElementById('board');
const cells = document.querySelectorAll('.cell');

let currentPlayer;
let player1, player2;
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

submitButton.addEventListener('click', () => {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    if (player1 && player2) {
        startGame();
    } else {
        alert("Please enter names for both players.");
    }
});

function startGame() {
    currentPlayer = player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
    boardDiv.style.display = 'grid';
    player1Input.style.display = 'none';
    player2Input.style.display = 'none';
    submitButton.style.display = 'none';

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(event) {
    const cellId = event.target.id;

    if (boardState[cellId - 1] !== '' || !gameActive) {
        return;
    }

    boardState[cellId - 1] = currentPlayer === player1 ? 'X' : 'O';
    event.target.textContent = boardState[cellId - 1];

    if (checkWin()) {
        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== '')) {
        messageDiv.textContent = `It's a draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && (boardState[a] === boardState[b] && boardState[a] === boardState[c]);
    });
}
