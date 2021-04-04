import { Server, Socket } from "socket.io";
import { readyCheckStatus, rooms } from "../core/rooms";
import { AskCheckData, CheckAcceptanceData } from "../interfaces/interfaces";
import { startGame } from "./one-night/startGame";

export const askCheck = (data: AskCheckData, ioReference: Server, socket: Socket) => {

  // I am looking for the room with the data id.
  rooms.forEach(room => {

    // If room exist
    if (room.roomId === data.roomId) {

      // add it to the status array with the room id and owner id
      readyCheckStatus.push({ roomid: room.roomId, checks: [room.owner] });
    }
  });

  // I emit the event to execute the readycheck
  ioReference.in(data.roomId).emit('readyCheck', { readyCheck: true });

  // timer is run to check if all players are ready
  timer(data.roomId, ioReference, socket)
}

export const checkAcceptance = (data: CheckAcceptanceData) => {

  // in the status array I look for the room with the data id.
  readyCheckStatus.forEach(room => {

    // if it exists
    if (room.roomid === data.roomId) {

      // I set the SID of the player I accept.
      room.checks.push(data.SID);
    }
  })
}

const timer = (roomid: string, ioReference: any, socket) => {

  // get the reference to the room and the room in status check array
  const room = rooms.find(room => room.roomId === roomid);
  const status = readyCheckStatus.find(room => room.roomid === roomid)

  // after 10 seconds
  setTimeout(() => {

    // if the number of players who accepted is different from the number of players in the room
    if (status?.checks.length !== room?.players.length) {

      // Emit failCheck
      ioReference.in(roomid)
        .emit('failCheck', { message: 'No se pudo iniciar el juego debido a que los jugadores no estan listos.' });
    } else {

      // Start Game
      console.log('Starting Game');

      startGame(roomid, ioReference, socket)
    }
  }, 10000);
}






