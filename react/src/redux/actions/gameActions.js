export const ROLL_DICE	= 'ROLL_DICE';

export function rollDice(dice){
	console.log('rollDice',dice);
	return {type: ROLL_DICE, dice:dice};
}
