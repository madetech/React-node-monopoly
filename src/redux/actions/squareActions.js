export const UPDATE_SQUARE = 'UPDATE_SQUARE';

export function updateSquare (squareNumber, square){
	return {type: UPDATE_SQUARE, squareNumber, square: square}
}
