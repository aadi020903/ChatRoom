require('dotenv').config()

import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { createRoom } from './utils/createRoom';
import { joinRoom } from './utils/joinRoom';
import { sendMessage } from './utils/sendMessage';
import { leaveRoom } from './utils/leaveRoom';
import { sendRoomInfo } from './utils/sendRoomInfo';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

export interface User {
    id: string;
    username: string;
    socket: WebSocket;
    room: string | null;
}

export interface Room {
    id: string;
    users: User[];
}

const rooms: Room[] = [];
const users: User[] = [];

wss.on('connection', (socket: WebSocket) => {
    const user: User = { id: uuidv4(), username: 'guest', socket, room: null };
    users.push(user);

    socket.on('message', (message: string) => {
        const data = JSON.parse(message);

        switch (data.type) {
            case 'create':
                createRoom(rooms, user);
                break;
            case 'join':
                joinRoom(rooms, user, data.payload.username, data.payload.roomId);
                break;
            case 'chat':
                sendMessage(rooms, user, data.payload.message);
                break;
            case 'rooms':
                sendRoomInfo(user, rooms)
                break;
            default:
                console.log('Unknown message type:', data.type);
        }
    });

    socket.on('close', () => {
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users.splice(index, 1);
        }
        if (user.room) {
            leaveRoom(rooms, user);
        }
    });
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});