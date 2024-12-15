"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const uuid_1 = require("uuid");
const createRoom_1 = require("./utils/createRoom");
const joinRoom_1 = require("./utils/joinRoom");
const sendMessage_1 = require("./utils/sendMessage");
const leaveRoom_1 = require("./utils/leaveRoom");
const sendRoomInfo_1 = require("./utils/sendRoomInfo");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
const rooms = [];
const users = [];
wss.on('connection', (socket) => {
    const user = { id: (0, uuid_1.v4)(), username: 'guest', socket, room: null };
    users.push(user);
    socket.on('message', (message) => {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'create':
                (0, createRoom_1.createRoom)(rooms, user);
                break;
            case 'join':
                (0, joinRoom_1.joinRoom)(rooms, user, data.payload.username, data.payload.roomId);
                break;
            case 'chat':
                (0, sendMessage_1.sendMessage)(rooms, user, data.payload.message);
                break;
            case 'rooms':
                (0, sendRoomInfo_1.sendRoomInfo)(user, rooms);
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
            (0, leaveRoom_1.leaveRoom)(rooms, user);
        }
    });
});
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
