const _ = require('lodash');

const configByplayers = {
  3: [
    ['robber', 'minion', 'doppleganger', 'alphawolf', 'mysticwolf', 'witch'],
    ['robber', 'tanner', 'doppleganger', 'alphawolf', 'witch', 'sleepywolf'],
    ['werewolf', 'werewolf', 'robber', 'tanner', 'drunk', 'doppleganger']
  ]
}

const rols = {
  witch: {
    id: 'witch',
    rolName: 'Witch',
    phase: 'Night',
    action: 'accion',
    actionDescription: 'Puede ver a los otros hombres lobos, si esta solo roba puede ver una carta del centro',
    team: 'Villagers'
  },
  drunk: {
    id: 'drunk',
    rolName: 'Drunk',
    phase: 'Night',
    action: 'accion',
    actionDescription: 'Puede ver a los otros hombres lobos, si esta solo roba puede ver una carta del centro',
    team: 'Villagers'
  },
  robber: {
    id: 'robber',
    rolName: 'Robber',
    phase: 'Night',
    action: 'accion',
    actionDescription: 'Puede ver a los otros hombres lobos, si esta solo roba puede ver una carta del centro',
    team: 'Villagers'
  },
  werewolf: {
    id: 'werewolf',
    rolName: 'Werewolf',
    phase: 'Night',
    action: 'accion',
    actionDescription: 'Puede ver a los otros hombres lobos, si esta solo roba puede ver una carta del centro',
    team: 'Werewolf'
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
  doppleganger: {
    id: 'doppleganger',
    rolName: 'Doppleganger',
    phase: 'dawn',
    action: 'id',
    actionDescription: '',
    team: ''
  },
  tanner: {
    id: 'tanner',
    rolName: 'tanner',
    phase: 'Night',
    action: null,
    actionDescription: 'Aprendiz de curtidor sabe quien es el Curtidor.',
    team: 'Tanner'
  },
  minion: {
    id: 'minion',
    rolName: 'Minion',
    phase: 'Night',
    action: null,
    actionDescription: 'Sabe quienes son los otros hombres lobo.',
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

export const getRandomConfig = (numberPlayers: number) => {

  const randonConfig = _.sampleSize(configByplayers[numberPlayers], 1)[0];
  const shuffledConfig = _.shuffle(randonConfig);
  const obtainedRols = shuffledConfig.map((rol: string) => rols[rol])

  return obtainedRols
}