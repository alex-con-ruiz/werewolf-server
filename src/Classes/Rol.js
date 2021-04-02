const dopplegangerAction = require('../Actions/rolAction')

const PRIORITIES = {
  
}

class Rol {
  constructor(id, rolName, phase, priority, action, actionDescription, team) {
    this.id = id;
    this.rolName = rolName;
    this.phase = phase;
    this.priority = priority;
    this.action = action;
    this.actionDescription = actionDescription;
    this.team = team;
    this.priority = PRIORITIES[id]
  }
}



const PHASES = {
  NIGHT: 'Night',
  DAY: 'Day',
  DAWN: 'Dawn'
}

const TEAMS = {
  WEREWOLF: 'Werewolf',
  VILLAGERS: 'Villagers',
  TANNERS: 'Tanners'
}

const Roles = {
  investigator: new Rol('investigator', 'Investigator', PHASES.NIGHT, 1, null, dopplegangerAction.description, TEAMS.VILLAGER),
  doppelganger: new Rol('doppelganger', 'doppelganger', PHASES.DAWN, 1, dopplegangerAction, dopplegangerAction.description, null),
  werewolf: {
    id: 'werewolf',
    rolName: 'Werewolf',
    phase: 'Night',
    action: 'accion',
    actionDescription: 'Puede ver a los otros hombres lobos, si esta solo roba puede ver una carta del centro',
    team: 'Werewolf'
  },
  villager: {
    id: 'villager',
    rolName: 'Villager',
    phase: null,
    action: null,
    actionDescription: 'Los aldeanos no hacen nada.',
    team: null
  },
  sentinel: {
    id: 'sentinel',
    rolName: 'Sentinel',
    phase: 'Night',
    action: null,
    actionDescription: 'Coloca un escudo escudo sobre otro jugador, la carta no se puede observar, intercambiar o mover.',
    team: null
  },
  sleepywolf: {
    id: 'sleepywolf',
    rolName: 'Sleepy Wolf',
    phase: 'Night',
    action: null,
    actionDescription: 'Revela a los demas hombre lobos que el es uno.',
    team: 'Werewolf'
  },
  alphawolf: {
    id: 'alphawolf',
    rolName: 'Alpha Wolf',
    phase: 'Night',
    action: null,
    actionDescription: 'Puede convertir a alguien en hombre lobo.',
    team: 'Werewolf'
  },
  mysticwolf: {
    id: 'mysticwolf',
    rolName: 'Mystic Wolf',
    phase: 'Night',
    action: null,
    actionDescription: 'Puede ver la carta de otro jugador.',
    team: 'Werewolf'
  },
  minion: {
    id: 'minion',
    rolName: 'Minion',
    phase: 'Night',
    action: null,
    actionDescription: 'Sabe quienes son los otros hombres lobo.',
    team: 'Werewolf'
  },
  apprenticetanner: {
    id: 'apprenticetanner',
    rolName: 'Apprentice Tanner',
    phase: 'Night',
    action: null,
    actionDescription: 'Aprendiz de curtidor sabe quien es el Curtidor.',
    team: 'Tanner'
  },
  mason: {
    id: 'mason',
    rolName: 'Mason',
    phase: 'Night',
    action: null,
    actionDescription: 'Conoce a los otros masones.',
    team: 'Villagers'
  },
  seer: {
    id: 'seer',
    rolName: 'Seer',
    phase: 'Night',
    action: null,
    actionDescription: 'Puede ver la carta de otro jugador o 2 cartas del centro.',
    team: 'Villagers'
  },
  apprenticeseer: {
    id: 'apprenticeseer',
    rolName: 'Seer Apprentice',
    phase: 'Night',
    action: null,
    actionDescription: 'Puede ver una carta del centro.',
    team: 'Villagers'
  },
}

exports.assingRol = (rolId) => {
  return Roles[rolId];
}

let rolesId = [...Object.keys(Roles)];

exports.getRandomRol = () => {

  let id;

  id = rolesId[Math.floor(Math.random() * rolesId.length)];

  rolesId = rolesId.filter(rolId => rolId !== id);

  return id;
}

