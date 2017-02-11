
import { SET_PLAYERS_NUMBER } from '../actions/setupActions';

const initialState = { playersNumber : 4 , minPNumber: 2, maxPNumber: 8};

export default function(state=initialState, action){
	switch (action.type) {
		case SET_PLAYERS_NUMBER:
			return Object.assign({...state, playersNumber: action.number });
		default:
			return state;
	}
} 