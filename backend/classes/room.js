import { v4 as uuidv4 } from 'uuid';
import GameBoard from './gameBoard.js';
import Leaderboard from '../db/leaderboard.js';

export class Room {
    constructor(roomName, socket, userName) {
        this.id = uuidv4();
        this.name = roomName;
        this.users = [];
        this.usersName = [];
        this.scores = {};
        this.board = new GameBoard();
        this.timer = null;
        this.gameDuration = 60; 
        this.gameInProgress = false;

        this.addUser(socket, userName);
    }

    addUser(socket, userName) {
        this.users.push(socket);
        this.usersName.push(userName);
        this.scores[userName] = 0; 

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
            delete this.scores[userName]; 

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
        }))

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
            if (this.board.board[row][col] === 'mole' && !this.board.isMoleClicked(row, col)) {
                this.board.markMoleAsClicked(row, col);
                this.scores[userName] += 10;
            }
            else if(this.board.board[row][col] === 'cactus'){
                this.scores[userName] -= 20;
            }
            else if(this.board.board[row][col] === 'empty'){
                this.scores[userName] -= 5;
            }

            this.broadcastMessage(JSON.stringify({
                type: 'update_scores',
                scores: this.scores,
                yourScore: this.scores[userName]
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

        this.usersName.forEach(async (userName) => {
            const score = this.scores[userName];
    
            const user = new Leaderboard({ name: userName,
                score: score
            });

            await user.save();
    
        })
    }
}
