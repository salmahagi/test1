// Initial state of the board
let board = {
    player1: [4, 4, 4, 4, 4, 4],
    player2: [4, 4, 4, 4, 4, 4],
    player1Store: 0,
    player2Store: 0,
    currentPlayer: 1,
    gameOver: false
};

// Update the HTML to reflect the board state
function updateBoard() {
    // Update player pits
    for (let i = 0; i < 6; i++) {
        document.querySelector(`.pit[data-player="1"][data-index="${i}"]`).textContent = board.player1[i];
        document.querySelector(`.pit[data-player="2"][data-index="${i}"]`).textContent = board.player2[i];
    }

    // Update stores
    document.getElementById('player1Store').textContent = board.player1Store;
    document.getElementById('player2Store').textContent = board.player2Store;

    // Update status
    if (!board.gameOver) {
        document.getElementById('status').textContent = `Player ${board.currentPlayer}'s turn.`;
    }
}

// Check if the game is over
function checkGameOver() {
    const sumPlayer1 = board.player1.reduce((a, b) => a + b, 0);
    const sumPlayer2 = board.player2.reduce((a, b) => a + b, 0);

    if (sumPlayer1 === 0 || sumPlayer2 === 0) {
        board.gameOver = true;
        board.player1Store += sumPlayer1;
        board.player2Store += sumPlayer2;

        let winner = board.player1Store > board.player2Store ? 1 : 2;
        if (board.player1Store === board.player2Store) {
            document.getElementById('status').textContent = "It's a draw!";
        } else {
            document.getElementById('status').textContent = `Player ${winner} wins!`;
        }
    }
}

// Handle the player's move
function makeMove(player, index) {
    if (board.gameOver) return;

    const pits = player === 1 ? board.player1 : board.player2;
    let stones = pits[index];
    pits[index] = 0;
    let i = index;

    while (stones > 0) {
        i = (i + 1) % 6;
        pits[i]++;
        stones--;
    }

    checkGameOver();
    board.currentPlayer = board.currentPlayer === 1 ? 2 : 1;
    updateBoard();
}

// Setup event listeners for the pits
document.querySelectorAll('.pit').forEach(pit => {
    pit.addEventListener('click', function() {
        const player = Number(this.getAttribute('data-player'));
        const index = Number(this.getAttribute('data-index'));
        if (player === board.currentPlayer) {
            makeMove(player, index);
        }
    });
});

// Restart the game
document.getElementById('restart').addEventListener('click', function() {
    board = {
        player1: [4, 4, 4, 4, 4, 4],
        player2: [4, 4, 4, 4, 4, 4],
        player1Store: 0,
        player2Store: 0,
        currentPlayer: 1,
        gameOver: false
    };
    updateBoard();
});

// Initialize the game
updateBoard();
