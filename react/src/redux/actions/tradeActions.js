export const SHOW_WINDOW 		= 'SHOW_WINDOW';
export const HIDE_WINDOW 		= 'HIDE_WINDOW';
export const SET_SECOND_PLAYER 	= 'SET_SECOND_PLAYER';
export const SET_BID_ONE 		= 'SET_BID_ONE';
export const SET_BID_TWO 		= 'SET_BID_TWO';
export const RESET_STATE 		= 'RESET_STATE';
export const SET_PROPOSE_MODE 	= 'SET_PROPOSE_MODE';
export const SET_ACCEPT_MODE 	= 'SET_ACCEPT_MODE';


export function showWindow(){
	console.log('show trade window');
	return { type: SHOW_WINDOW }
}

export function hideWindow(){
	return { type: HIDE_WINDOW }
}

export function setSecondPlayer(player){
	return { type: SET_SECOND_PLAYER, secondPlayer: player }
}

export function setBidOne(data) {
	return {type:SET_BID_ONE, amount: data.amount}
}

export function setBidTwo(data) {
	return {type:SET_BID_TWO, amount: data.amount}
}

export function setAcceptMode(){
	return { type: SET_ACCEPT_MODE }
}

export function setProposeMode(){
	return { type: SET_PROPOSE_MODE }
}

export function resetState(){
	return { type: RESET_STATE }
}