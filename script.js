

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const aiModeButton = document.getElementById('ai-mode');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let aiMode = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    updateCell(cell, index);
    checkForWinner();
    if (aiMode && isGameActive) {
        setTimeout(aiMove, 500);
    }
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        isGameActive = false;
        message.textContent = `${currentPlayer} wins!`;
    } else if (!board.includes('')) {
        isGameActive = false;
        message.textContent = 'Draw!';
    } else {
        changePlayer();
        if (!aiMode) {
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function aiMove() {
    const availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const aiCell = document.querySelector(`.cell[data-index='${randomIndex}']`);

    updateCell(aiCell, randomIndex);
    checkForWinner();
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

function toggleAIMode() {
    aiMode = !aiMode;
    aiModeButton.textContent = aiMode ? 'Play Against Human' : 'Play Against AI';
    restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
aiModeButton.addEventListener('click', toggleAIMode);

message.textContent = `Player ${currentPlayer}'s turn`;
