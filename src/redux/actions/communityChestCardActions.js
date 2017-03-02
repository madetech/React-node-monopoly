export const UPDATE_COMMUNITY_CHEST_CARD            = 'UPDATE_COMMUNITY_CHEST_CARD';
export const UPDATE_COMMUNITY_CHEST_CARD_INDEX      = 'UPDATE_COMMUNITY_CHEST_CARD_INDEX';

export function updateCard(cardNumber, card){
    return {type: UPDATE_COMMUNITY_CHEST_CARD, cardNumber, card: card}
}

export function updateIndex(index) {
    return {type: UPDATE_COMMUNITY_CHEST_CARD_INDEX, index}
}
