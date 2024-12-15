import { Room, User } from "..";
import { broadcastToRoom } from "../helpers/broadcastMessage";

export function sendMessage(rooms: Room[], user: User, message: string) {
    if (!user.room) return;

    const room = rooms.find(r => r.id === user.room);
    if (room) {
        broadcastToRoom(room, {
            type: 'chat',
            payload: {
                username: user.username,
                message: message
            }
        });
    }
}