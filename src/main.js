const { getRandomRol } = require('./Classes/Rol');
const createPlayer = require('./Players/Players');

const room = [];


room.push(createPlayer({ name: 'Reinaldo', rol: getRandomRol() }))
room.push(createPlayer({ name: 'Alex', rol: getRandomRol() }))
room.push(createPlayer({ name: 'Fran', rol: getRandomRol() }))


// console.log(room);

room.forEach(player => {
  if (player.rol.id === 'doppelganger') {
  /*   console.log(player); */
    console.log(player.rol.actionDescription);
    player.rol.action.doAction(room[0], room[1]);
  };
});
