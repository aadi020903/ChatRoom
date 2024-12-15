"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveRoom = leaveRoom;
const broadcastMessage_1 = require("../helpers/broadcastMessage");
function leaveRoom(rooms, user) {
    if (!user.room)
        return;
    const room = rooms.find(r => r.id === user.room);
    if (room) {
        const index = room.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            room.users.splice(index, 1);
        }
        (0, broadcastMessage_1.broadcastToRoom)(room, { type: 'userLeft', payload: { userId: user.id } });
        if (room.users.length === 0) {
            const roomIndex = rooms.findIndex(r => r.id === room.id);
            if (roomIndex !== -1) {
                rooms.splice(roomIndex, 1);
            }
        }
    }
    user.room = null;
}
