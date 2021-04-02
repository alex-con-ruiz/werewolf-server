interface CreateRoomData {
  name: string;
  player: string;
}

interface RoomSchema {
  roomId: string;
  roomName: string;
  owner: string;
  cardsOnTable: any[];
  players: PlayerRoomSchema[];
  config?: RoomConfiguration
}

export interface PlayerRoomSchema {
  id: string;
  name: string;
  socketId: string;
  isOnline: boolean;
}

interface RoomConfiguration {

}

interface joinRoomData {
  roomId: string;
  player: string;
}

export {
  CreateRoomData,
  RoomSchema,
  joinRoomData
}