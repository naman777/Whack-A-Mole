import { WebSocketServer } from 'ws';
import { CLOSE_ROOM, CREATE_ROOM, JOIN_ROOM, START_GAME, CLICK_CELL} from './classes/messages.js';
import { RoomManager } from './classes/roomManager.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

const roomManager = new RoomManager();

wss.on('connection', function connection(ws) {

    console.log("Ws connected");

    ws.on('error', console.error);

    ws.on('message', (data) => {
        const message = JSON.parse(data.toString());

        if(message.type ===  CREATE_ROOM){
            roomManager.createRoom(message.roomName, ws, message.usersName, message.email, message.mobile )
        }

        if(message.type === JOIN_ROOM){
            roomManager.joinRoom(message.roomId, ws, message.usersName, message.email, message.mobile )
        }

        if(message.type === START_GAME){
            roomManager.startGame(message.roomId, ws);
        }

        if(message.type === CLICK_CELL){
            roomManager.clickCell(message.roomId, ws, message.row, message.col);
        }

        if(message.type === CLOSE_ROOM){
            roomManager.closeRoom(message.roomId);
        }

    })

    ws.on('close', () => {
        roomManager.handleDisconnect(ws);
    });

  
});


mongoose.connect(process.env.MONGO_URL).then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));