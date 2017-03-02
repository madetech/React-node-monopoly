export const UPDATE_CHANCE_CARD         = 'UPDATE_CHANCE_CARD';
export const UPDATE_CHANCE_CARD_INDEX   = 'UPDATE_CHANCE_CARD_INDEX';

export function updateCard(cardNumber, card){
    return {type: UPDATE_CHANCE_CARD, cardNumber, card: card}
}

export function updateIndex(index) {
    return {type: UPDATE_CHANCE_CARD_INDEX, index}
}