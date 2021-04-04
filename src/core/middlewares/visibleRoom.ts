import { rooms, shadowRooms } from '../rooms';
import { PlayerRoomSchema, RoomSchema } from '../../interfaces/interfaces';

export const visibleRoom = (roomId: string, creation?: boolean) => {

  let unVisibleRoom = rooms.find((room: RoomSchema) => room.roomId === roomId);

  if (unVisibleRoom && !creation) {
    if (unVisibleRoom.playing) {
      unVisibleRoom = shadowRooms.find((room: RoomSchema) => room.roomId = roomId);
    }
  }

  if (unVisibleRoom) {

    let room: VisibleRoom = {
      roomId: unVisibleRoom.roomId,
      roomName: unVisibleRoom.roomName,
      owner: unVisibleRoom.owner,
      phase: unVisibleRoom.phase,
      playing: unVisibleRoom.playing,
      players: unVisibleRoom.players,
      rol: null,
      rolsInplay: unVisibleRoom.rolsInPlay || null,
      isShadowed: unVisibleRoom.isShadowed,
    };

    return room;
  }

}

interface VisibleRoom {
  roomId: string;
  roomName: string;
  owner: string;
  phase: string;
  playing: boolean;
  players: Array<PlayerRoomSchema>,
  rol: any;
  rolsInplay: Array<string>;
  isShadowed: boolean;
}
