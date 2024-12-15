import { Room } from "..";

export function broadcastToRoom(room: Room, message: any) {
    room.users.forEach(user => {
        user.socket.send(JSON.stringify(message));
    });
}