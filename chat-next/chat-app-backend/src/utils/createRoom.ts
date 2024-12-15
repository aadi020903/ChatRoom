import { Room, User } from "..";
import { generateRoomCode } from "../helpers/generateRandomCode";

export function createRoom(rooms: Room[], user: User) {
    const roomId = generateRoomCode();
    const room: Room = { id: roomId, users: [user] };
    rooms.push(room);
    user.room = roomId;
    user.socket.send(JSON.stringify({ type: 'roomCreated', payload: { roomId } }));
}