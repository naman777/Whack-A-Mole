import { Room } from "./room.js";

export class RoomManager {
    constructor() {
        this.rooms = [];
        this.socketAdminRoomMap = new Map();
        this.socketRoomMap = new Map();
    }

    async createRoom( socket, usersName ) {
        const room = new Room( socket, usersName);
        this.rooms.push(room);
        this.socketAdminRoomMap.set(socket, room.id);
    }

    async joinRoom(roomId, socket, usersName) {

        const room = this.rooms.find((room) => room.id === roomId);
        if (room) {
            room.addUser(socket, usersName);
            this.socketRoomMap.set(socket, room.id);
        } else {
            socket.send("Invalid Room Id");
        }
    }

    startGame(roomId, socket){
        const room = this.rooms.find((room) => room.id === roomId);
        if (room) {
            room.startGame();
            socket.send("game_started");
        } else {
            socket.send("Invalid Room Id");
        }
    }

    clickCell(roomId, socket, row, col){
        const room = this.rooms.find((room) => room.id === roomId);
        if (room) {
            room.handleUserClick(socket, row, col);
        }
        else{
            socket.send("Invalid Room Id");
        }
    }


    closeRoom(roomId) {
        const roomIndex = this.rooms.findIndex((room) => room.id === roomId);
        if (roomIndex !== -1) {
            this.rooms.splice(roomIndex, 1);
        } else {
            console.log("Room not found");
        }
    }

    handleDisconnect(socket) {
        const roomIdAdmin = this.socketAdminRoomMap.get(socket);
        if (roomIdAdmin) {
            this.closeRoom(roomIdAdmin);
            this.socketAdminRoomMap.delete(socket);
        }

        const roomId = this.socketRoomMap.get(socket);
        if (roomId) {
            this.socketRoomMap.delete(socket);
            const room = this.rooms.find((room) => room.id === roomId);
            if (room) {
                room.removeUser(socket);
            }
        }
    }
}
