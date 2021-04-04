import { RoomSchema } from "../interfaces/interfaces";

export const rooms: RoomSchema[] = [];
export const shadowRooms: any[] = [];

export const readyCheckStatus: readyCheckStatus[] = []
interface readyCheckStatus {
  roomid: string;
  checks: string[];
}
