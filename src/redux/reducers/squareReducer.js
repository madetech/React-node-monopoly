import {squares} from 'config/squareConfig';
import {Square} from './entities/Square';
import {UPDATE_SQUARE} from '../actions/squareActions';


function createSquaresGroup() {
    let groupPropertyArray = [];
    for (let i = 0; i < 40; i++) {
        let groupNumber = squares[i].groupNumber;
        if (groupNumber > 0) {
            if (!groupPropertyArray[groupNumber])
                groupPropertyArray[groupNumber] = [];
            groupPropertyArray[groupNumber].push(i);
        }
    }
    return groupPropertyArray;
}

const groupPropertyArray = createSquaresGroup();
const initialState = { squares: squares.map(square => { square.group = groupPropertyArray[square.groupNumber]; return new Square(square) }) };

export default function(state=initialState, action){
	switch (action.type) {
		case UPDATE_SQUARE:
            // console.log(action);
            // let index=-1;
            // let arr = [];
            // for(let i in state.squares) {
            //     if(i == action.squareNumber) {
            //         index = i;
            //         arr[i] = Object.assign({},action.square)
            //     } else {
            //         arr[i] = Object.assign({},state.squares[i])
            //     }
            // }
            //
            // if(index == -1) {
            //     state.squares.push(action.square);
            //     return Object.assign({}, {...state});
            // } else
            //     return Object.assign({}, {
            //         ...state,
            //         squares: Object.assign([], arr)
				// 	/*...state.playerToSquare.slice(0, index),
				// 	 Object.assign({}, action.playerToSquare),
				// 	 ...lastPart*/
            //         //]
            //     });
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