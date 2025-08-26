class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.gameStatus = document.getElementById('game-status');
        this.restartBtn = document.getElementById('restart-btn');
        
        this.addEventListeners();
        this.updateGameStatus();
    }
    
    addEventListeners() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        
        this.restartBtn.addEventListener('click', () => this.restartGame());
        
        // Keyboard support for restart
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' || e.key === 'R') {
                this.restartGame();
            }
        });
    }
    
    handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.getAttribute('data-index'));
        
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(index);
    }
    
    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.updateBoard();
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
            this.updateGameStatus();
        }
    }
    
    updateBoard() {
        this.cells.forEach((cell, index) => {
            if (this.board[index] !== '') {
                cell.classList.add(this.board[index].toLowerCase());
                cell.textContent = this.board[index];
            }
        });
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    checkWin() {
        return this.winningCombinations.some(combination => {
            return combination.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        const winningCombination = this.winningCombinations.find(combination => {
            return combination.every(index => this.board[index] === this.currentPlayer);
        });
        
        // Highlight winning cells
        winningCombination.forEach(index => {
            this.cells[index].classList.add('winning');
        });
        
        this.gameStatus.textContent = `Player ${this.currentPlayer} Wins! 🎉`;
        this.gameStatus.style.color = this.currentPlayer === 'X' ? '#FFA500' : '#800080';
        this.gameStatus.style.fontWeight = 'bold';
    }
    
    handleDraw() {
        this.gameActive = false;
        this.gameStatus.textContent = "It's a Draw! 🤝";
        this.gameStatus.style.color = '#666';
    }
    
    updateGameStatus() {
        this.gameStatus.textContent = `Player ${this.currentPlayer}'s Turn`;
        this.gameStatus.style.color = this.currentPlayer === 'X' ? '#FFA500' : '#800080';
        this.gameStatus.style.fontWeight = '600';
    }
    
    restartGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        // Clear board visually
        this.cells.forEach(cell => {
            cell.className = 'cell';
            cell.textContent = '';
        });
        
        this.updateGameStatus();
        
        // Add restart animation
        this.gameStatus.style.animation = 'none';
        setTimeout(() => {
            this.gameStatus.style.animation = 'fadeIn 0.5s ease-in';
        }, 10);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true});

// Prevent zoom on double-tap for better mobile experience
document.addEventListener('dblclick', function(e) {
    e.preventDefault();
}, { passive: false });

// Add vibration feedback for mobile (if supported)
function vibrate() {
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

// Export for potential future extensions
window.TicTacToe = TicTacToe;
