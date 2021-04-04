import { nanoid } from "nanoid";
import { rooms } from "../core/rooms";
import { CreateRoomData, PlayerRoomSchema, RoomSchema } from '../interfaces/interfaces';
import { visibleRoom } from '../core/middlewares/visibleRoom';
import { Socket } from "socket.io";

export const createRoom = (socket: Socket, data: CreateRoomData) => {

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
    readyCheck: false,
    playing: false,
    phase: '',
    cardsOnTable: [],
    rols: [],
    players: [player],
    rolsInPlay: [],
    isShadowed: false
  }

  rooms.push(room)

  if (room) {
    socket.emit('SID', player.id)
    socket.emit('updatedRoom', { room: visibleRoom(ROOM_ID, true) });
  }
}
