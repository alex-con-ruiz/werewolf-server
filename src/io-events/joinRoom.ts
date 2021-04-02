import { rooms } from "../core/rooms"
import { joinRoomData, PlayerRoomSchema } from '../interfaces/interfaces';
import { nanoid } from 'nanoid';

const joinRoom = (socket: any, data: joinRoomData, ioReference: any) => {

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

  const room = rooms.find(room => room.roomId === data.roomId)!;

  socket.emit('SID', player.id)
  ioReference.in(data.roomId).emit('updatedRoom', { room });
}

export {
  joinRoom
}