// Room Creation
export interface CreateRoomData {
  name: string;
  player: string;
}

export interface RoomSchema {
  roomId: string;
  roomName: string;
  owner: string;
  readyCheck: boolean;
  playing: boolean;
  phase: string;
  rols: any;
  rolsInPlay: any;
  cardsOnTable: any[];
  players: PlayerRoomSchema[];
  isShadowed: boolean;
}

export interface RolSchema {
  SID: string;
  rolId: string;
  rolName: string;
  action: string | null;
  actionDescription: string;
  flavor: string;
}

export interface PlayerRoomSchema {
  id: string;
  name: string;
  socketId: string;
  isOnline: boolean;
}


// join Room
export interface joinRoomData {
  roomId: string;
  player: string;
}

export interface reJoinRoomData extends joinRoomData {
  SID: string;
}


// ReadyCheck Data

export interface AskCheckData {
  roomId: string;
}

export interface CheckAcceptanceData {
  roomId: string;
  SID: string;
}
