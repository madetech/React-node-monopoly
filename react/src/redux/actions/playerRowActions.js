export const SET_COLOR 	= 'SET_COLOR';
export const SET_NAME 	= 'SET_NAME';
export const SET_TYPE 	= 'SET_TYPE';
export const CHANGE_PLAYERS_NUMBER = 'CHANGE_PLAYERS_NUMBER';


export function setColor({player, color}){
	return {type: SET_COLOR, player:player, color: color};
}

export function setName({player, name}){
	return {type: SET_NAME, player:player, name:name};
}

export function setType({player,type}){
	return {type: SET_TYPE, player: player, type:type}; 
}

export function changePlayersCount(number){
	return {type: CHANGE_PLAYERS_NUMBER, number: number};
}