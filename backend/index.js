import { WebSocketServer } from 'ws';
import { CLOSE_ROOM, CREATE_ROOM, JOIN_ROOM, START_GAME, CLICK_CELL} from './classes/messages.js';
import { RoomManager } from './classes/roomManager.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8000;

const wss = new WebSocketServer({ port: PORT });

const roomManager = new RoomManager();

wss.on('connection', function connection(ws) {


    ws.on('error', console.error);

    ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        if(message.type ===  CREATE_ROOM){
            roomManager.createRoom( ws, message.usersName)
        }

        if(message.type === JOIN_ROOM){
            roomManager.joinRoom(message.roomId, ws, message.usersName)
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

console.log(`Server started on port ${PORT}`); 