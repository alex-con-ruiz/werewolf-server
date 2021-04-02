const { assingRol } = require('../../Classes/Rol');

const createPlayer = (data) => {
  const playerData = {
    playerName: data.name,
    rol: assingRol(data.rol),
    status: {
      shield: false,
      artefacto: null,
      marcas: null,
      isAlive: true,
    }
  }

  return playerData
}


module.exports = createPlayer;