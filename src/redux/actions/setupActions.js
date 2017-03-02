export const SET_PLAYERS_NUMBER = 'SET_PLAYERS_NUMBER';

export function setPlayersNumber(number){
	return {type: SET_PLAYERS_NUMBER, number: number};
}