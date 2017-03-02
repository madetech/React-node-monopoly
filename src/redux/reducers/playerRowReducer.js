
import { SET_COLOR, SET_NAME,
	SET_TYPE, CHANGE_PLAYERS_NUMBER,
	UPDATE_PLAYER, ELIMINATE_PLAYER } from '../actions/playerRowActions';

import {colors} from 'config/playerConfig';
import {Player} from './entities/Player';

const initialState = { players: changePlayerNumber([], 4) };

function changePlayerNumber(players, number){
	if(players.length < Number(number)){
		for(let i = players.length ; i < Number(number); i ++){
			let p = new Player('Player '+i, colors[i], 1);
			p.id = i;
			players.push(p);
		}
	} else { 
		let prevLength = players.length;
		players.splice(Number(number), prevLength-number);
	}	

	return players;
}
	

export default function(state=initialState, action){
	switch (action.type) {
		case SET_COLOR:
			state.players[action.player].color=action.color;
			return {
					...state,
					players:[	
						...state.players.slice(0, action.player),
			    		Object.assign({}, state.players[action.player]),
			    		...state.players.slice(action.player + 1)
  					]
				}
		case SET_NAME:
			state.players[action.player].name=action.name;
			return {
					...state,
					players:[	
						...state.players.slice(0, action.player),
			    		Object.assign({}, state.players[action.player]),
			    		...state.players.slice(action.player + 1)
  					]
				}
		case SET_TYPE:
			state.players[action.player].type=action.type;
			return {
					...state,
					players:[	
						...state.players.slice(0, action.player),
			    		Object.assign({}, state.players[action.player]),
			    		...state.players.slice(action.player + 1)
  					]
				}
		case CHANGE_PLAYERS_NUMBER:
			state.players=changePlayerNumber(state.players,action.number);
			return Object.assign({...state});

		case UPDATE_PLAYER:
            let index=-1;
            let arr = [];
            for(let i in state.players) {
<<<<<<< HEAD:src/redux/reducers/playerRowReducer.js
                if(i == action.player) {
                    index = i;
                    arr[i] = Object.assign({},action.entity);
=======
                if(state.players[i].player == action.player) {
                    index = i;
                    arr[i] = Object.assign({},action.player)
>>>>>>> 0d6c6226f9b058493cde3ec406db9949e1d3de76:react/src/redux/reducers/playerRowReducer.js
                } else {
                    arr[i] = Object.assign({},state.players[i])
                }
            }
<<<<<<< HEAD:src/redux/reducers/playerRowReducer.js
			return Object.assign({},{ ...state, players:Object.assign([], arr)});
        case ELIMINATE_PLAYER:
            let arr2 = [];
            for(let i in state.players)
                if (state.players[i].id != action.index) {
                    arr2[i] = Object.assign({}, state.players[i]);
                }
            return Object.assign({ ...state, players: Object.assign([], arr2)});
=======
			return Object.assign({},{
					...state,
					players:Object.assign([], arr)
						// ...state.players.slice(0, action.player),
			    		// Object.assign({}, {...state.players[action.player], ...action.entity}),
			    		// ...state.players.slice(action.player + 1)
  					// ]
				});
>>>>>>> 0d6c6226f9b058493cde3ec406db9949e1d3de76:react/src/redux/reducers/playerRowReducer.js
		default:
			return state;
	}
} 