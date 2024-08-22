import { v4 as uuidv4 } from 'uuid';
import GameBoard from './gameBoard.js';

export class Room {
    constructor( socket, userName) {
        this.id = uuidv4().slice(0, 5);
        this.users = [];
        this.usersName = [];
        this.scores = [];  // Change scores to an array of objects
        this.board = new GameBoard();
        this.timer = null;
        this.gameDuration = 60; 
        this.gameInProgress = false;
        socket.send(JSON.stringify({
            type: 'room_created',
            roomName: this.name,
            roomId: this.id
        }));
        this.addUser(socket, userName);
    }

    addUser(socket, userName) {
        this.users.push(socket);
        this.usersName.push(userName);
        this.scores.push({ name: userName, points: 0 });  // Initialize user score
        
        socket.send(JSON.stringify({
            type: 'room_joined',
            roomName: this.name,
            users: this.usersName,
            roomId: this.id
        }));
            
        this.broadcastMessage(JSON.stringify({
            type: 'update_users',
            users: this.usersName
        }), socket);
    }

    removeUser(socket) {
        const index = this.users.indexOf(socket);
        if (index !== -1) {
            const userName = this.usersName[index];
            this.scores = this.scores.filter(score => score.name !== userName);  // Remove user score

            this.users.splice(index, 1);
            this.usersName.splice(index, 1);

            this.broadcastMessage(JSON.stringify({
                type: 'update_users',
                users: this.usersName
            }));
        }
    }

    broadcastMessage(message, excludeSocket) {
        this.users.forEach(user => {
            if (user !== excludeSocket) {
                user.send(message);
            }
        });
    }

    startGame() {
        this.gameInProgress = true;
        
        this.broadcastMessage(JSON.stringify({
            type: 'game_started',
        }));

        this.timer = setInterval(() => {
            this.updateBoard();
        }, 1000); 

        setTimeout(() => {
            this.endGame();
        }, this.gameDuration * 1000);
    }

    updateBoard() {
        const updatedBoard = this.board.updateBoard();

        this.broadcastMessage(JSON.stringify({
            type: 'update_board',
            board: updatedBoard
        }));
    }

    handleUserClick(socket, row, col) {
        if(this.gameInProgress){    
            const userName = this.usersName[this.users.indexOf(socket)];
            const userScore = this.scores.find(score => score.name === userName);

            if (this.board.board[row][col] === 'mole' && !this.board.isMoleClicked(row, col)) {
                this.board.markMoleAsClicked(row, col);
                userScore.points += 10;
            }
            else if(this.board.board[row][col] === 'cactus'){
                userScore.points -= 20;
            }
            else if(this.board.board[row][col] === 'empty'){
                userScore.points -= 5;
            }

            this.broadcastMessage(JSON.stringify({
                type: 'update_scores',
                scores: this.scores,
                yourScore: userScore.points
            }));
        }
    }

    endGame() {
        clearInterval(this.timer);
        this.gameInProgress = false;

        this.broadcastMessage(JSON.stringify({
            type: 'end_game',
            scores: this.scores
        }));

        this.scores.forEach(score => {
            score.points = 0;
        });

    }
}
