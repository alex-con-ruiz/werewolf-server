import { rooms } from "../core/rooms";
import { RoomSchema } from "../interfaces/interfaces";
import { joinRoom } from "./joinRoom";

const rejoin = (socket: any, ioReference: any, data: any) => {

  let continueJoin = false;

  console.log(data);
  

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

  if (!continueJoin) {
    joinRoom(socket, data, ioReference);
    return;
  }

  socket.join(data.roomId)

  const room: RoomSchema = rooms.find(room => room.roomId === data.roomId)!;
  ioReference.in(data.roomId).emit('updatedRoom', { room });
}






export {
  rejoin
}
