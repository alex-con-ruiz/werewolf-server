import { nanoid } from "nanoid";
import { rooms } from "../core/rooms";
import { CreateRoomData, RoomSchema, PlayerRoomSchema } from '../interfaces/interfaces';

const createRoom = (socket: any, data: CreateRoomData) => {

  const ROOM_ID: string = nanoid(4);

  socket.join(ROOM_ID)

  const player: PlayerRoomSchema = { id: nanoid(5), name: data.player, socketId: socket.id, isOnline: true }

  if (data.name.length < 5) {
    socket.emit('roomError', { type: 'createRoom', message: 'El nombre debe tener al menos 5 caracteres.' });
    return;
  }

  const room: RoomSchema = {
    roomId: ROOM_ID,
    roomName: data.name,
    owner: player.id,
    cardsOnTable: [],
    players: [player]
  }
  rooms.push(room)

  if (room) {
    socket.emit('SID', player.id)
    socket.emit('updatedRoom', { room });
  }
}

export {
  createRoom
}