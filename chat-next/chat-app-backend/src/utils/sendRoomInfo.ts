import { Room, User } from ".."

export const sendRoomInfo = (user: User, rooms: Room[]) => {
    user.socket.send(JSON.stringify({
        type: 'rooms',
        payload: {
            rooms: rooms
        }
    }))
}