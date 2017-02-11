import {squares} from 'config/squareConfig';
import {Square} from './entities/Square';


const initialState = { squares: squares.map(square => new Square(square) ) };


export default function(state=initialState, action){
	switch (action.type) {
		default:
			return state;
	}
} 