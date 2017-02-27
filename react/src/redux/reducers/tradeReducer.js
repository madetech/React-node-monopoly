import { SHOW_WINDOW, HIDE_WINDOW, 
		SET_SECOND_PLAYER, SET_BID_ONE, 
		SET_BID_TWO, RESET_STATE, 
		SET_PROPOSE_MODE, SET_ACCEPT_MODE,
    	SET_SELECTION_ONE, SET_SELECTION_TWO} from '../actions/tradeActions';

const initialState = {
	show: false,
	secondPlayer: -1,
	bidOne: 0,
	bidTwo: 0,
	proposeMode: true,
	acceptMode: false,
	selectionOne: {},
	selectionTwo: {}
};

export default function(state = initialState, action){
	switch (action.type) {
		case SHOW_WINDOW:
			return Object.assign({...state, show: true });
		case HIDE_WINDOW:
			return Object.assign({...state, show: false });
		case SET_SECOND_PLAYER: 
			return Object.assign({...state, secondPlayer: action.secondPlayer});
		case SET_BID_ONE: 
			return Object.assign({...state, bidOne: action.amount});
		case SET_BID_TWO:
			return Object.assign({...state, bidTwo: action.amount});
        case SET_SELECTION_ONE:
            return Object.assign({...state, selectionOne: action.data});
        case SET_SELECTION_TWO:
            return Object.assign({...state, selectionTwo: action.data});
        case RESET_STATE:
			return Object.assign({...initialState});
		case SET_ACCEPT_MODE: 
			return Object.assign({...state, acceptMode: true, proposeMode: false});
		case SET_PROPOSE_MODE: 
			return Object.assign({...state, acceptMode: false, proposeMode: true});
		default:
			return state;
	}
} 