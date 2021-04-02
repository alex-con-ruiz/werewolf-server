class Action {
  constructor(action, description) {
    this.description = description;
    this.doAction = action;
  }
}

const dopplegangerAction = new Action((self, target) => {
  if (target.status.shield) {
    console.log('No puedes tiene escudo.');
    return;
  }

  if (self.shield) {
    console.log('No puedes ejecutar una accion tienes un escudo.')
    return;
  }

  const swap = self.rol;

  self.rol = target.rol;
  target.rol = swap;

  console.log(`${self.playerName} cambio rol con ${target.playerName}`);
  const inmediateActions = ['werewolf']

  if (inmediateActions.includes(self.rol.id)) {
    console.log(self.rol.action);
  }
}, 'Observa la carta de otro jugador y se convierte en ese rol.');


module.exports = dopplegangerAction;