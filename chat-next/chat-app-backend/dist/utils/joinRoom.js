"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRoom = joinRoom;
const broadcastMessage_1 = require("../helpers/broadcastMessage");
function joinRoom(rooms, user, username, roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
        if (!room.users.some(u => u.id === user.id)) {
            room.users.push(user);
        }
        user.room = roomId;
        user.username = username;
        user.socket.send(JSON.stringify({ type: 'roomJoined', payload: { roomId, username } }));
        (0, broadcastMessage_1.broadcastToRoom)(room, { type: 'userJoined', payload: { username: user.username } });
    }
    else {
        user.socket.send(JSON.stringify({ type: 'error', payload: { message: 'Room not found' } }));
    }
}
