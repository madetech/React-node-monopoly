import {chanceCards} from 'config/chanceCardConfig';
import {Card} from './entities/Card';
import {UPDATE_CHANCE_CARD, UPDATE_CHANCE_CARD_INDEX} from '../actions/chanceCardActions';

function getCards() {
    return chanceCards.map(card => { return new Card(card.text, card.action) });
}

function shuffleCard() {
    let deck = [];
    for (let i = 0; i < 16; i++)
        deck[i] = i;
    return deck.sort(function() {return Math.random() - 0.5;});
}

let cardsResult = getCards();
let cardsShuffle = shuffleCard();

const initialState = { cards: cardsResult, deck: cardsShuffle, index: 0  };

export default function(state=initialState, action) {
    switch (action.type) {
        case UPDATE_CHANCE_CARD:
            return {};
        case UPDATE_CHANCE_CARD_INDEX:
            return Object.assign({ ...state, index: action.index });
        default:
            return state;
    }
}