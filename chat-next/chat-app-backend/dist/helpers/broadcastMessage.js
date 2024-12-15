"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastToRoom = broadcastToRoom;
function broadcastToRoom(room, message) {
    room.users.forEach(user => {
        user.socket.send(JSON.stringify(message));
    });
}
