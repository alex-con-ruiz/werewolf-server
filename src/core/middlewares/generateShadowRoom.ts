import { rooms, shadowRooms } from '../rooms';

export const genereteShadowRoom = (roomId: string) => {
  const toClone = rooms.find((room) => room.roomId === roomId);

  if (toClone) {
    toClone.isShadowed = true;
  }

  const clonedRoom = { ...toClone };

  if (clonedRoom) {
    shadowRooms.forEach((room) => {
      if (room.roomId === roomId) {
        room = clonedRoom
        return;
      }
    });

    shadowRooms.push(clonedRoom);
  }
}
