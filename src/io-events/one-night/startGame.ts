import { Server, Socket } from "socket.io";
import { visibleRoom } from "../../core/middlewares/visibleRoom";
import { getRandomConfig } from "../../core/rols";
import { rooms } from "../../core/rooms";
import { RoomSchema } from '../../interfaces/interfaces';
import { genereteShadowRoom } from '../../core/middlewares/generateShadowRoom';

const _ = require('lodash');


export const startGame = (roomid: string, io: Server, socket: Socket) => {
  const room: RoomSchema | undefined = rooms.find(room => room.roomId === roomid);

  if (room) {
    const playerQuantity: number | undefined = room?.players.length;

    if (playerQuantity) {
      const playersId = room.players.map(player => _.get(player, 'id'))
      const playersSocketId = room.players.map(player => _.get(player, 'socketId'))

      let rols = getRandomConfig(3)

      let middleCards: any[] = [];

      while (rols.length > playerQuantity) {
        middleCards.push(rols.pop())
      }

      rols.forEach((rol, i) => {
        rol.playerId = playersId[i]
        rol.socketId = playersSocketId[i]
      });

      room.phase = 'DAWN';
      room.playing = true;
      room.rols = rols;
      room.rolsInPlay = rols.map((rol) => _.get(rol, 'id'));
      room.cardsOnTable = middleCards;

      genereteShadowRoom(roomid)

      io.in(roomid).emit('updatedRoom', { room: visibleRoom(roomid) });

      playersSocketId.forEach((socketId) => {
        const hisRol = rols.find(rol => rol.socketId === socketId);
        io.to(socketId).emit('yourRol', hisRol)
      })
    }
  }
}
