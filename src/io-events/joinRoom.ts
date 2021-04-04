import { nanoid } from 'nanoid';
import { Server, Socket } from "socket.io";
import { visibleRoom } from '../core/middlewares/visibleRoom';
import { rooms } from "../core/rooms";
import { joinRoomData, PlayerRoomSchema } from '../interfaces/interfaces';

export const joinRoom = (socket: Socket, data: joinRoomData, ioReference: Server) => {

  socket.join(data.roomId)

  const player: PlayerRoomSchema = { id: nanoid(5), name: data.player, socketId: socket.id, isOnline: true }

  if (rooms.length === 0) {
    socket.emit('roomError', { type: 'joinRoom', message: 'No existen salas, puedes crear una.' });
    return;
  }

  let roomIndex: number = -1;

  rooms.forEach((room, i) => {
    if (room.roomId === data.roomId) {
      roomIndex = i;
    }
  })

  if (roomIndex >= 0) {
    rooms[roomIndex].players.push(player);
  } else {
    socket.emit('roomError', { type: 'joinRoom', message: `No existen salas con el id: ${data.roomId}` });
    return;
  }

  socket.emit('SID', player.id)
  ioReference.in(data.roomId).emit('updatedRoom', { room: visibleRoom(data.roomId) });
}
