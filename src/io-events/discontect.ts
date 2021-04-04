import { Server } from "socket.io";
import { visibleRoom } from '../core/middlewares/visibleRoom';
import { rooms } from "../core/rooms";

export const disconnect = (socketId: string, ioReference: Server) => {

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

  ioReference.in(roomId).emit('updatedRoom', { room: visibleRoom(roomId) });
}
