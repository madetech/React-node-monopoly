export const ROLL_DICE			= 'ROLL_DICE';
export const ADD_ALERT			= 'ADD_ALERT';
export const SET_NEXT_BUTTON  	= 'SET_NEXT_BUTTON'; 
export const SET_LANDED			= 'SET_LANDED';
export const SET_P_S			= 'SET_P_S';
export const UPDATE_P_S 		= 'UPDATE_P_S';
export const UPDATE_P_C 		= 'UPDATE_P_C';

export function rollDice(dice){
	return {type: ROLL_DICE, dice:dice};
}

export function addAlert(message) {
	return {type: ADD_ALERT, message:message};
}

export function setNextButton(nextButton) {
	return {type: SET_NEXT_BUTTON, nextButton:nextButton};
}

export function setLanded(landed) {
	return {type: SET_LANDED, landed:landed};
}

export function setPlayerToSquare(playerToSquare){
    return {type: SET_P_S, playerToSquare: playerToSquare}
}

export function updatePlayerToSquare(playerToSquare){
	return {type: UPDATE_P_S, playerToSquare: playerToSquare};
}

export function updatePlayerCurrent(currentPlayer){
    return {type: UPDATE_P_C, currentPlayer: currentPlayer};
}