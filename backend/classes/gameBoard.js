class GameBoard {
    constructor(rows = 3, cols = 3, moleCount = 3) {
        this.rows = rows;
        this.cols = cols;
        this.moleCount = moleCount;
        this.board = this.initializeBoard();
        this.clickedMoles = new Set(); 
    }

    initializeBoard() {
        const board = [];
        for (let i = 0; i < this.rows; i++) {
            board.push(new Array(this.cols).fill(null));
        }
        return board;
    }

    updateBoard() {
        this.clickedMoles.clear(); 

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                this.board[i][j] = 'empty';
            }
        }


        const row = Math.floor(Math.random() * this.board.length);
        const col = Math.floor(Math.random() * this.board[0].length);
        this.board[row][col] = 'mole';

        let rowCactus, colCactus;
        do {
            rowCactus = Math.floor(Math.random() * this.board.length);
            colCactus = Math.floor(Math.random() * this.board[0].length);
        } while (rowCactus === rowMole && colCactus === colMole);
        this.board[rowCactus][colCactus] = 'cactus';
        

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
