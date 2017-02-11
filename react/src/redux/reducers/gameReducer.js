import { ROLL_DICE } from '../actions/gameActions';


const initialState = { playerToSquare: {}, currentPlayer: 0, dice: {}, gameLog:[]};



export default function(state=initialState, action){
	switch (action.type) {
		case ROLL_DICE:
            console.log('ROLL_DICE',action);
            console.log('state',state);
			return Object.assign({},{ 
				...state, 
				dice: action.dice
			})
		default:
			return state;
	}
} 


