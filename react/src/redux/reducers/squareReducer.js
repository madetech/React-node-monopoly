import {squares} from 'config/squareConfig';
import {Square} from './entities/Square';
import {UPDATE_SQUARE} from '../actions/squareActions';


const initialState = { squares: squares.map(square => new Square(square) ) };


export default function(state=initialState, action){
	switch (action.type) {
		case UPDATE_SQUARE:
			return Object.assign({},{
					...state,
					squares:[	
						...state.squares.slice(0, action.squareNumber),
			    		Object.assign({}, {...state.squares[action.squareNumber], ...action.square}),
			    		...state.squares.slice(action.squareNumber + 1)
  					]
				});
		default:
			return state;
	}
} 