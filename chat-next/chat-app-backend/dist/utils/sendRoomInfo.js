"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRoomInfo = void 0;
const sendRoomInfo = (user, rooms) => {
    user.socket.send(JSON.stringify({
        type: 'rooms',
        payload: {
            rooms: rooms
        }
    }));
};
exports.sendRoomInfo = sendRoomInfo;
