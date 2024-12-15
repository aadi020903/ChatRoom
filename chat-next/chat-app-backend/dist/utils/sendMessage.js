"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = sendMessage;
const broadcastMessage_1 = require("../helpers/broadcastMessage");
function sendMessage(rooms, user, message) {
    if (!user.room)
        return;
    const room = rooms.find(r => r.id === user.room);
    if (room) {
        (0, broadcastMessage_1.broadcastToRoom)(room, {
            type: 'chat',
            payload: {
                username: user.username,
                message: message
            }
        });
    }
}
