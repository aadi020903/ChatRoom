import { Room, User } from "..";
import { broadcastToRoom } from "../helpers/broadcastMessage";

export function joinRoom(rooms: Room[], user: User, username: string, roomId: string) {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
        if (!room.users.some(u => u.id === user.id)) {
            room.users.push(user);
        }
        user.room = roomId;
        user.username = username;
        user.socket.send(JSON.stringify({ type: 'roomJoined', payload: { roomId, username } }));
        broadcastToRoom(room, { type: 'userJoined', payload: { username: user.username } });
    } else {
        user.socket.send(JSON.stringify({ type: 'error', payload: { message: 'Room not found' } }));
    }
}