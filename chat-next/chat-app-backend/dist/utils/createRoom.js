"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = createRoom;
const generateRandomCode_1 = require("../helpers/generateRandomCode");
function createRoom(rooms, user) {
    const roomId = (0, generateRandomCode_1.generateRoomCode)();
    const room = { id: roomId, users: [user] };
    rooms.push(room);
    user.room = roomId;
    user.socket.send(JSON.stringify({ type: 'roomCreated', payload: { roomId } }));
}
