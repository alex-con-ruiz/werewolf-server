import { Server, Socket } from 'socket.io';
import { visibleRoom } from '../core/middlewares/visibleRoom';
import { rooms, shadowRooms } from '../core/rooms';
import { reJoinRoomData } from '../interfaces/interfaces';
import { joinRoom } from "./joinRoom";

export const rejoin = (socket: Socket, ioReference: Server, data: reJoinRoomData) => {

  let continueJoin = false;

  rooms.forEach(room => {
    if (room.roomId === data.roomId) {
      room.players.forEach(player => {
        if (player.id === data.SID) {
          player.isOnline = true;
          player.socketId = socket.id;
          continueJoin = true;
        }
      })
    }
  })

  shadowRooms.forEach(room => {
    if (room.roomId === data.roomId) {
      room.players.forEach(player => {
        if (player.id === data.SID) {
          player.isOnline = true;
          player.socketId = socket.id;
          continueJoin = true;
        }
      })
    }
  })

  if (!continueJoin) {
    joinRoom(socket, data, ioReference);
    return;
  }

  socket.join(data.roomId)

  ioReference.in(data.roomId).emit('updatedRoom', { room: visibleRoom(data.roomId) });
}

