export const ROLL_DICE					= 'ROLL_DICE';
export const ADD_ALERT					= 'ADD_ALERT';
export const SET_NEXT_BUTTON  			= 'SET_NEXT_BUTTON';
export const SET_LANDED					= 'SET_LANDED';
export const SET_P_S					= 'SET_P_S';
export const UPDATE_P_S 				= 'UPDATE_P_S';
export const UPDATE_P_C 				= 'UPDATE_P_C';
export const SET_LANDED_USE_CARD		= 'SET_LANDED_USE_CARD';
export const CHANCE_J_CARD				= 'CHANCE_J_CARD';
export const COMMUNITY_CHANCE_J_CARD 	= 'COMMUNITY_CHANCE_J_CARD';

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

export function setLandedUseCard(landed) {
    return {type: SET_LANDED_USE_CARD, landed:landed};
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

export function updateChanceJailCard(owner) {
	return {type: CHANCE_J_CARD, owner: owner}
}

export function updateComunityChanceJailCard(owner) {
    return {type: COMMUNITY_CHANCE_J_CARD, owner: owner}
}