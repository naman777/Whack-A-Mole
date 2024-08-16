class GameBoard {
    constructor(rows = 3, cols = 3, moleCount = 1) {  // Only one mole is needed
        this.rows = rows;
        this.cols = cols;
        this.moleCount = moleCount;
        this.board = this.initializeBoard();
        this.clickedMoles = new Set(); 
        this.prevMolePosition = null;
        this.prevCactusPositions = [];
    }

    initializeBoard() {
        const board = [];
        for (let i = 0; i < this.rows; i++) {
            board.push(new Array(this.cols).fill('empty'));
        }
        return board;
    }

    getRandomPosition(excludePositions) {
        let row, col;
        do {
            row = Math.floor(Math.random() * this.rows);
            col = Math.floor(Math.random() * this.cols);
        } while (excludePositions.some(pos => pos.row === row && pos.col === col));
        return { row, col };
    }

    updateBoard() {
        this.clickedMoles.clear(); 

        // Reset the board
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.board[i][j] = 'empty';
            }
        }

        // Mole new position
        const excludePositions = this.prevCactusPositions.slice();
        if (this.prevMolePosition) {
            excludePositions.push(this.prevMolePosition);
        }
        const molePosition = this.getRandomPosition(excludePositions);
        this.board[molePosition.row][molePosition.col] = 'mole';
        this.prevMolePosition = molePosition;

        // Cacti new positions
        const cactusPositions = [];
        for (let i = 0; i < 2; i++) {
            const cactusPosition = this.getRandomPosition([molePosition, ...cactusPositions]);
            this.board[cactusPosition.row][cactusPosition.col] = 'cactus';
            cactusPositions.push(cactusPosition);
        }
        this.prevCactusPositions = cactusPositions;

        return this.board;
    }

    markMoleAsClicked(row, col) {
        this.clickedMoles.add(`${row}-${col}`);
    }

    isMoleClicked(row, col) {
        return this.clickedMoles.has(`${row}-${col}`);
    }
}

export default GameBoard;
