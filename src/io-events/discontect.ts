import { rooms } from "../core/rooms";
import { RoomSchema } from "../interfaces/interfaces";

const disconnect = (socketId: string, ioReference: any) => {

  let roomId: string | null = null;

  rooms.forEach(room => {
    room.players.forEach((player, i) => {
      if (player.socketId === socketId) {
        player.isOnline = false
        roomId = room.roomId;
      }
    })
  })

  if (!roomId) {
    return;
  }

  const room: RoomSchema = rooms.find(room => room.roomId === roomId)!;

  ioReference.in(roomId).emit('updatedRoom', { room });
}

export {
  disconnect
}
